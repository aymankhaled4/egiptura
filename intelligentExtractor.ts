import type { Program, ItineraryItem, CustomQuoteParams, SupportedSite, SupportedCity, LocalizedString } from './types';
import { normalizeSiteKey } from './siteAliases';
import { knowledgeBase } from './services/knowledgeBase';
import type { Language } from './contexts/LanguageContext';

// 🧠 نظام ذكي لاستخراج البيانات من البرامج الـ10 الموجودة
export class IntelligentDataExtractor {
    private programs: Program[];

    constructor() {
        this.programs = knowledgeBase.packages;
    }

    private validateCustomProgramName(proposedName: string): boolean {
    const readyProgramNames = this.programs.map(p => 
        p.name.en.toLowerCase().trim()
    );
    
    const proposedLower = proposedName.toLowerCase().trim();
    
    // التحقق من عدم استخدام أسماء البرامج الجاهزة
    const isReadyProgramName = readyProgramNames.some(readyName => 
        proposedLower.includes(readyName) || readyName.includes(proposedLower)
    );
    
    // التحقق من استخدام التنسيق الصحيح
    const hasCorrectFormat = /custom\s+\d+\s*-\s*day/i.test(proposedLower);
    
    return !isReadyProgramName && hasCorrectFormat;
}

    findMatchingReadyProgram(request: {
        duration: number;
        destinations: string[];
        language: Language;
    }): Program | null {
        const { duration, destinations, language } = request;
        
        for (const program of this.programs) {
            if (this.doesProgramMatchRequest(program, duration, destinations)) {
                return program;
            }
        }
        
        return null;
    }

    // ✅ التحقق من تطابق البرنامج مع الطلب
    private doesProgramMatchRequest(program: Program, duration: number, destinations: string[]): boolean {
        // التحقق من المدة
        if (program.duration.days !== duration) {
            return false;
        }

        // استخراج المدن من البرنامج
        const programCities = this.extractCitiesFromProgram(program);
        const requestCities = destinations.map(d => d.toLowerCase());

        // التحقق من تطابق المدن الرئيسية
        const hasAllCities = requestCities.every(city => 
            programCities.some(programCity => programCity.includes(city))
        );

        return hasAllCities;
    }

    // 🏙️ استخراج المدن من البرنامج
    private extractCitiesFromProgram(program: Program): string[] {
        const cities = new Set<string>();
        const itinerary = this.getProgramItinerary(program);

        itinerary.forEach(day => {
            const text = `${day.title?.en || ''} ${Object.values(day.activities).flat().join(' ')}`.toLowerCase();
            
            if (text.includes('cairo') || text.includes('القاهرة')) cities.add('cairo');
            if (text.includes('luxor') || text.includes('الأقصر')) cities.add('luxor');
            if (text.includes('aswan') || text.includes('أسوان')) cities.add('aswan');
            if (text.includes('alexandria') || text.includes('الإسكندرية')) cities.add('alexandria');
            if (text.includes('cruise') || text.includes('كروز') || text.includes('nile')) cities.add('cruise');
        });

        return Array.from(cities);
    }


    // 🔍 استخراج البيانات المتعلقة بمدينة معينة
    extractCityData(city: string, language: Language = 'en'): {
        itinerary: ItineraryItem[];
        accommodations: { gold: string; diamond: string };
        sites: SupportedSite[];
    } {
        const cityLower = city.toLowerCase();
        const results = {
            itinerary: [] as ItineraryItem[],
            accommodations: { gold: '', diamond: '' },
            sites: [] as SupportedSite[]
        };

        // البحث في جميع البرامج عن البيانات المتعلقة بالمدينة
        for (const program of this.programs) {
            // استخراج الـ itinerary المتعلق بالمدينة
            const programItinerary = this.getProgramItinerary(program);
            const cityItinerary = this.filterItineraryByCity(programItinerary, cityLower, language);
            results.itinerary.push(...cityItinerary);

            // استخراج أماكن الإقامة
            if (program.accommodations) {
                const cityAccommodations = this.extractCityAccommodations(program, cityLower);
                if (cityAccommodations.gold) results.accommodations.gold = cityAccommodations.gold;
                if (cityAccommodations.diamond) results.accommodations.diamond = cityAccommodations.diamond;
            }

            // استخراج المواقع
            const citySites = this.extractCitySites(programItinerary, cityLower, language);
            results.sites.push(...citySites);
        }

        // إزالة التكرارات
        results.itinerary = this.removeDuplicateItineraryItems(results.itinerary);
        results.sites = [...new Set(results.sites)];

        return results;
    }

    // 🏨 استخراج أماكن الإقامة لمدينة معينة
    private extractCityAccommodations(program: Program, city: string): { gold: string; diamond: string } {
        const result = { gold: '', diamond: '' };

        if (!program.accommodations) return result;

        // البحث في فئة Gold
        if (program.accommodations.gold) {
            for (const acc of program.accommodations.gold) {
                if (this.isCityMatch(acc.city, city)) {
                    result.gold = acc.hotel[this.getLanguageKey(acc.hotel)] || acc.hotel.en || '';
                    break;
                }
            }
        }

        // البحث في فئة Diamond
        if (program.accommodations.diamond) {
            for (const acc of program.accommodations.diamond) {
                if (this.isCityMatch(acc.city, city)) {
                    result.diamond = acc.hotel[this.getLanguageKey(acc.hotel)] || acc.hotel.en || '';
                    break;
                }
            }
        }

        return result;
    }

    // 🗺️ استخراج المواقع السياحية لمدينة معينة
    private extractCitySites(itinerary: ItineraryItem[], city: string, language: Language): SupportedSite[] {
        const sites: SupportedSite[] = [];
        const cityKeywords = this.getCityKeywords(city);

        for (const day of itinerary) {
            // معالجة آمنة للأنشطة
            let activities: string[] = [];
            if (day.activities) {
                if (Array.isArray(day.activities)) {
                    activities = day.activities;
                } else if (typeof day.activities === 'object') {
                    activities = day.activities[language] || day.activities.en || [];
                }
            }
            
            for (const activity of activities) {
                const activityLower = activity.toLowerCase();
                
                // البحث عن المواقع السياحية المعروفة
                if (this.containsKeywords(activityLower, ['pyramid', 'pirámide', 'هرم']) && 
                    this.containsKeywords(activityLower, ['giza', 'guiza', 'الجيزة'])) {
                    sites.push('gizaPyramidsAndSphinx');
                }
                if (this.containsKeywords(activityLower, ['sphinx', 'esfinge', 'أبو الهول'])) {
                    sites.push('gizaPyramidsAndSphinx');
                }
                if (this.containsKeywords(activityLower, ['museum', 'museo', 'متحف']) && 
                    this.containsKeywords(activityLower, ['egyptian', 'egipcio', 'مصري'])) {
                    sites.push('egyptianMuseum');
                }
                if (this.containsKeywords(activityLower, ['karnak', 'الكرنك'])) {
                    sites.push('karnakTemple');
                }
                if (this.containsKeywords(activityLower, ['luxor temple', 'templo de luxor', 'معبد الأقصر'])) {
                    sites.push('luxorTemple');
                }
                if (this.containsKeywords(activityLower, ['valley of the kings', 'valle de los reyes', 'وادي الملوك'])) {
                    sites.push('valleyOfTheKings');
                }
                if (this.containsKeywords(activityLower, ['hatshepsut', 'حتشبسوت'])) {
                    sites.push('hatshepsutTemple');
                }
                if (this.containsKeywords(activityLower, ['abu simbel', 'أبو سمبل'])) {
                    sites.push('abuSimbelTemples');
                }
                if (this.containsKeywords(activityLower, ['philae', 'فيلة'])) {
                    sites.push('philaeTemple');
                }
                if (this.containsKeywords(activityLower, ['kom ombo', 'كوم أمبو'])) {
                    sites.push('komOmboTemple');
                }
                if (this.containsKeywords(activityLower, ['edfu', 'إدفو'])) {
                    sites.push('edfuTemple');
                }
                if (this.containsKeywords(activityLower, ['khan el khalili', 'خان الخليلي'])) {
                    sites.push('khanElKhalili');
                }
                if (this.containsKeywords(activityLower, ['citadel', 'ciudadela', 'قلعة'])) {
                    sites.push('qaitbayCitadel');
                }
                if (this.containsKeywords(activityLower, ['alexandria', 'alejandría', 'الإسكندرية'])) {
                    sites.push('alexandriaNationalMuseum');
                }
            }
        }

        return [...new Set(sites)];
    }

    // 📅 تصفية الـ itinerary حسب المدينة
    private filterItineraryByCity(itinerary: ItineraryItem[], city: string, language: Language): ItineraryItem[] {
        const cityKeywords = this.getCityKeywords(city);
        const filtered: ItineraryItem[] = [];

        for (const day of itinerary) {
            // معالجة آمنة للأنشطة
            let activities: string[] = [];
            if (day.activities) {
                if (Array.isArray(day.activities)) {
                    activities = day.activities;
                } else if (typeof day.activities === 'object') {
                    activities = day.activities[language] || day.activities.en || [];
                }
            }
            
            // معالجة آمنة للعنوان
            const title = day.title?.[language] || day.title?.en || '';
            
            // التحقق من وجود المدينة في العنوان أو الأنشطة
            const hasCityReference = cityKeywords.some(keyword => 
                title.toLowerCase().includes(keyword) || 
                activities.some(activity => activity.toLowerCase().includes(keyword))
            );

            if (hasCityReference) {
                filtered.push(day);
            }
        }

        return filtered;
    }

    // 🏙️ الحصول على كلمات مفتاحية للمدينة
    private getCityKeywords(city: string): string[] {
        const cityMap: { [key: string]: string[] } = {
            'cairo': ['cairo', 'el cairo', 'القاهرة', 'القاهره'],
            'luxor': ['luxor', 'الأقصر', 'الاقصر'],
            'aswan': ['aswan', 'asuan', 'أسوان', 'اسوان'],
            'alexandria': ['alexandria', 'alejandría', 'الإسكندرية', 'الاسكندرية'],
            'abu simbel': ['abu simbel', 'أبو سمبل', 'ابو سمبل'],
            'red sea': ['red sea', 'mar rojo', 'البحر الأحمر', 'البحر الاحمر', 'hurghada', 'شرم الشيخ'],
            'cruise': ['cruise', 'crucero', 'كروز', 'نيل', 'nile']
        };

        return cityMap[city.toLowerCase()] || [city.toLowerCase()];
    }

    // 🔍 التحقق من وجود كلمات مفتاحية في النص
    private containsKeywords(text: string, keywords: string[]): boolean {
        return keywords.some(keyword => text.includes(keyword.toLowerCase()));
    }

    // 🏨 التحقق من مطابقة المدينة
    private isCityMatch(cityObj: LocalizedString, targetCity: string): boolean {
        const cityKeywords = this.getCityKeywords(targetCity);
        const cityValues = Object.values(cityObj).map(v => v.toLowerCase());
        
        return cityKeywords.some(keyword => 
            cityValues.some(value => value.includes(keyword))
        );
    }

    // 📋 الحصول على مفتاح اللغة
    private getLanguageKey(obj: LocalizedString): keyof LocalizedString {
        return 'en' as keyof LocalizedString; // افتراضي
    }

    // 📅 الحصول على itinerary البرنامج
    private getProgramItinerary(program: Program): ItineraryItem[] {
        if (program.itineraryOptions && program.itineraryOptions.length > 0) {
            return program.itineraryOptions[0].itinerary;
        } else if (program.itinerary) {
            return program.itinerary;
        }
        return [];
    }

    // 🗑️ إزالة التكرارات من الـ itinerary
    private removeDuplicateItineraryItems(items: ItineraryItem[]): ItineraryItem[] {
        const seen = new Set<string>();
        return items.filter(item => {
            const titleKey = item.title?.en ?? item.title?.es ?? item.title?.ar ?? 'untitled';
            const key = `${item.day}-${titleKey}`;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }

    // 🏨 استخراج الفنادق من جميع البرامج
    private extractHotelsFromAllPrograms(): { city: string; category: 'gold' | 'diamond'; hotel: LocalizedString }[] {
        const hotels: { city: string; category: 'gold' | 'diamond'; hotel: LocalizedString }[] = [];

        for (const program of this.programs) {
            if (program.accommodations) {
                // استخراج فنادق فئة Gold
                if (program.accommodations.gold) {
                    program.accommodations.gold.forEach(acc => {
                        const cityKey = this.detectCityFromAccommodation(acc);
                        if (cityKey) {
                            hotels.push({
                                city: cityKey,
                                category: 'gold',
                                hotel: acc.hotel
                            });
                        }
                    });
                }

                // استخراج فنادق فئة Diamond
                if (program.accommodations.diamond) {
                    program.accommodations.diamond.forEach(acc => {
                        const cityKey = this.detectCityFromAccommodation(acc);
                        if (cityKey) {
                            hotels.push({
                                city: cityKey,
                                category: 'diamond',
                                hotel: acc.hotel
                            });
                        }
                    });
                }
            }
        }

        return hotels;
    }

    // 🏙️ الكشف عن المدينة من بيانات الإقامة
    private detectCityFromAccommodation(acc: any): string {
        const cityName = acc.city.en?.toLowerCase() || '';
        
        if (cityName.includes('cairo') || cityName.includes('القاهرة')) return 'cairo';
        if (cityName.includes('luxor') || cityName.includes('الأقصر')) return 'luxor';
        if (cityName.includes('aswan') || cityName.includes('أسوان')) return 'aswan';
        if (cityName.includes('alexandria') || cityName.includes('الإسكندرية')) return 'alexandria';
        
        return '';
    }

    // 🏨 البحث عن فندق للمدينة
    private findHotelForCity(city: string, category: 'gold' | 'diamond', allHotels: any[]): any {
        const availableHotels = allHotels.filter(h => 
            h.city === city && h.category === category
        );
        
        if (availableHotels.length > 0) {
            // إرجاع فندق عشوائي من المتاح
            return availableHotels[Math.floor(Math.random() * availableHotels.length)];
        }
        
        return null;
    }

    // 🏨 فندق افتراضي للمدينة
    private getDefaultHotelForCity(city: string, category: 'gold' | 'diamond', language: Language): LocalizedString {
        const defaultHotels = {
            cairo: {
                gold: {
                    es: 'Hotel Steigenberger El Tahrir',
                    en: 'Steigenberger Hotel El Tahrir', 
                    ar: 'فندق شتيجنبرجر التحرير'
                },
                diamond: {
                    es: 'Hotel Marriott Mena House',
                    en: 'Marriott Mena House Hotel',
                    ar: 'فندق ماريوت مينا هاوس'
                }
            },
            luxor: {
                gold: {
                    es: 'Hotel Sofitel Winter Palace',
                    en: 'Sofitel Winter Palace Hotel',
                    ar: 'فندق سوفيتيل قصر الشتاء'
                },
                diamond: {
                    es: 'Hotel Al Moudira',
                    en: 'Al Moudira Hotel',
                    ar: 'فندق المديرة'
                }
            },
            aswan: {
                gold: {
                    es: 'Hotel Sofitel Legend Old Cataract',
                    en: 'Sofitel Legend Old Cataract Hotel',
                    ar: 'فندق سوفيتيل ليجند أولد كاتاراكت'
                },
                diamond: {
                    es: 'Hotel Basma',
                    en: 'Basma Hotel',
                    ar: 'فندق بسمة'
                }
            }
        };

        const cityHotels = defaultHotels[city as keyof typeof defaultHotels];
        if (cityHotels) {
            return {
                es: cityHotels[category].es,
                en: cityHotels[category].en,
                ar: cityHotels[category].ar
            };
        }

        // فندق افتراضي عام
        return {
            es: `Hotel en ${city}`,
            en: `Hotel in ${city}`,
            ar: `فندق في ${city}`
        };
    }

    // 🏨 إنشاء أماكن الإقامة المخصصة - إصلاح كامل
    private createCustomAccommodations(
        nightsDistribution: any,
        category: 'gold' | 'diamond',
        language: Language
    ): { gold: any[]; diamond: any[] } {
        const accommodations = { gold: [] as any[], diamond: [] as any[] };

        // البحث عن فنادق من البرامج الجاهزة لكل مدينة
        const allHotels = this.extractHotelsFromAllPrograms();

        for (const [city, nights] of Object.entries(nightsDistribution)) {
            if (typeof nights === 'number' && nights > 0 && city !== 'cruise') {
                const cityName = this.getCityLocalizedName(city);
                
                // البحث عن فندق مناسب من البرامج الجاهزة
                const hotelForCity = this.findHotelForCity(city, category, allHotels);
                
                if (hotelForCity) {
                    accommodations[category].push({
                        city: cityName,
                        hotel: hotelForCity.hotel
                    });
                } else {
                    // استخدام فندق افتراضي إذا لم يتم العثور على فندق
                    accommodations[category].push({
                        city: cityName,
                        hotel: this.getDefaultHotelForCity(city, category, language)
                    });
                }
            }
        }

        // إضافة الإقامة في الكروز إذا كانت موجودة
        if (nightsDistribution.cruise > 0) {
            accommodations[category].push({
                city: { es: 'Crucero por el Nilo', en: 'Nile Cruise', ar: 'رحلة نيلية' },
                hotel: { es: 'Nave de Lujo', en: 'Luxury Cruise Ship', ar: 'سفينة نيلية فاخرة' }
            });
        }

        return accommodations;
    }

    // 🏛️ أيام القاهرة المفصلة
    private getCairoDays(totalDuration: number, language: Language): ItineraryItem[] {
        const cairoDays: ItineraryItem[] = [];

        // يوم الأهرامات
        cairoDays.push({
            day: 2, // سيتم تعديله لاحقاً
            title: {
                es: 'Las Pirámides de Giza y la Esfinge',
                en: 'The Pyramids of Giza and the Sphinx',
                ar: 'أهرامات الجيزة وأبو الهول'
            },
            activities: {
                es: [
                    'Desayuno en el hotel',
                    'Visita a la Meseta de Giza para ver las Grandes Pirámides',
                    'Exploración de la Pirámide de Keops (exterior)',
                    'Visita a la Pirámide de Kefrén y la Pirámide de Micerinos',
                    'Foto con la Gran Esfinge y el Templo del Valle',
                    'Almuerzo en restaurante local con vistas a las pirámides',
                    'Opcional: Paseo en camello alrededor de las pirámides',
                    'Visita al Templo del Valle del Rey Kefrén',
                    'Regreso al hotel y tiempo libre',
                    'Cena y alojamiento'
                ],
                en: [
                    'Breakfast at the hotel',
                    'Visit to the Giza Plateau to see the Great Pyramids',
                    'Exploration of the Pyramid of Khufu (exterior)',
                    'Visit to the Pyramid of Khafre and Pyramid of Menkaure',
                    'Photo with the Great Sphinx and Valley Temple',
                    'Lunch at local restaurant with pyramid views',
                    'Optional: Camel ride around the pyramids',
                    'Visit to the Valley Temple of King Khafre',
                    'Return to hotel and free time',
                    'Dinner and accommodation'
                ],
                ar: [
                    'الإفطار في الفندق',
                    'زيارة هضبة الجيزة لمشاهدة الأهرامات العظيمة',
                    'استكشاف هرم خوفو (من الخارج)',
                    'زيارة هرم خفرع وهرم منقرع',
                    'التقاط الصور مع أبو الهول ومعبد الوادي',
                    'غداء في مطعم محلي بإطلالة على الأهرامات',
                    'اختياري: رحلة جمل حول الأهرامات',
                    'زيارة معبد الوادي للملك خفرع',
                    'العودة إلى الفندق والوقت الحر',
                    'العشاء والإقامة'
                ]
            }
        });

        // يوم المتحف المصري والقاهرة الإسلامية
        cairoDays.push({
            day: 3,
            title: {
                es: 'Museo Egipcio y Cairo Histórico',
                en: 'Egyptian Museum and Historic Cairo',
                ar: 'المتحف المصري والقاهرة التاريخية'
            },
            activities: {
                es: [
                    'Desayuno en el hotel',
                    'Visita al Museo Egipcio de Antigüedades',
                    'Exploración de la Sala de las Momias Reales',
                    'Admiración del Tesoro de Tutankamón',
                    'Almuerzo en restaurante tradicional egipcio',
                    'Visita a la Ciudadela de Saladino y la Mezquita de Mohamed Ali',
                    'Recorrido por el Bazar Khan el Khalili',
                    'Tiempo libre para compras de artesanías',
                    'Visita a la Mezquita de Alabastro',
                    'Regreso al hotel, cena y alojamiento'
                ],
                en: [
                    'Breakfast at the hotel',
                    'Visit to the Egyptian Museum of Antiquities',
                    'Exploration of the Royal Mummies Room',
                    'Admiration of the Treasure of Tutankhamun',
                    'Lunch at traditional Egyptian restaurant',
                    'Visit to the Citadel of Saladin and Mohamed Ali Mosque',
                    'Tour of Khan el Khalili Bazaar',
                    'Free time for handicraft shopping',
                    'Visit to the Alabaster Mosque',
                    'Return to hotel, dinner and accommodation'
                ],
                ar: [
                    'الإفطار في الفندق',
                    'زيارة المتحف المصري للآثار',
                    'استكشاف قاعة المومياوات الملكية',
                    'الإعجاب بكنوز توت عنخ آمون',
                    'غداء في مطعم مصري تقليدي',
                    'زيارة قلعة صلاح الدين ومسجد محمد علي',
                    'جولة في خان الخليلي',
                    'وقت حر للتسوق للحرف اليدوية',
                    'زيارة مسجد المرمر',
                    'العودة إلى الفندق، العشاء والإقامة'
                ]
            }
        });

        return cairoDays;
    }

    // 🏛️ أيام الأقصر المفصلة
    private getLuxorDays(language: Language): ItineraryItem[] {
        return [{
            day: 1,
            title: {
                es: 'Valle de los Reyes y Templo de Hatshepsut',
                en: 'Valley of the Kings and Hatshepsut Temple',
                ar: 'وادي الملوك ومعبد حتشبسوت'
            },
            activities: {
                es: [
                    'Desayuno temprano',
                    'Cruce del Nilo hacia la orilla occidental',
                    'Visita al Valle de los Reyes (3 tumbas incluidas)',
                    'Exploración del Templo de Hatshepsut en Deir el-Bahari',
                    'Foto en los Colosos de Memnón',
                    'Almuerzo en restaurante local',
                    'Visita al Templo de Medinet Habu',
                    'Regreso al hotel/crucero',
                    'Cena y espectáculo de luz y sonido opcional'
                ],
                en: [
                    'Early breakfast',
                    'Crossing the Nile to the west bank',
                    'Visit to Valley of the Kings (3 tombs included)',
                    'Exploration of Hatshepsut Temple at Deir el-Bahari',
                    'Photo at the Colossi of Memnon',
                    'Lunch at local restaurant',
                    'Visit to Medinet Habu Temple',
                    'Return to hotel/cruise',
                    'Dinner and optional sound and light show'
                ],
                ar: [
                    'الإفطار المبكر',
                    'عبور النيل إلى الضفة الغربية',
                    'زيارة وادي الملوك (3 مقابر مشمولة)',
                    'استكشاف معبد حتشبسوت في الدير البحري',
                    'التقاط الصور عند تمثالي ممنون',
                    'غداء في مطعم محلي',
                    'زيارة معبد مدينة هابو',
                    'العودة إلى الفندق/الكروز',
                    'العشاء وعرض الصوت والضوء اختياري'
                ]
            }
        }];
    }

    // 🏛️ أيام أسوان المفصلة
    private getAswanDays(language: Language): ItineraryItem[] {
        return [{
            day: 1,
            title: {
                es: 'Presa de Asuán y Templo de Philae',
                en: 'Aswan Dam and Philae Temple',
                ar: 'سد أسوان ومعبد فيلة'
            },
            activities: {
                es: [
                    'Desayuno en el hotel/crucero',
                    'Visita a la Presa Alta de Asuán',
                    'Recorrido por el Obelisco Inacabado',
                    'Paseo en faluca alrededor de las Islas Elefantina',
                    'Almuerzo con vistas al Nilo',
                    'Visita al Templo de Philae dedicado a la diosa Isis',
                    'Paseo en barco hacia la Isla de Agilkia',
                    'Tiempo libre en el mercado de especias de Asuán',
                    'Cena y alojamiento'
                ],
                en: [
                    'Breakfast at hotel/cruise',
                    'Visit to the Aswan High Dam',
                    'Tour of the Unfinished Obelisk',
                    'Feluccas ride around Elephantine Island',
                    'Lunch with Nile views',
                    'Visit to Philae Temple dedicated to goddess Isis',
                    'Boat ride to Agilkia Island',
                    'Free time at Aswan spice market',
                    'Dinner and accommodation'
                ],
                ar: [
                    'الإفطار في الفندق/الكروز',
                    'زيارة السد العالي في أسوان',
                    'جولة في المسلة الناقصة',
                    'رحلة فلوكة حول جزيرة الفنتين',
                    'غداء بإطلالة على النيل',
                    'زيارة معبد فيلة المخصص للإلهة إيزيس',
                    'رحلة بالقارب إلى جزيرة أجيليكيا',
                    'وقت حر في سوق التوابل بأسوان',
                    'العشاء والإقامة'
                ]
            }
        }];
    }

    // 🏛️ أيام الإسكندرية المفصلة
    private getAlexandriaDays(language: Language): ItineraryItem[] {
        return [{
            day: 1,
            title: {
                es: 'Alejandría Histórica y la Costa Mediterránea',
                en: 'Historic Alexandria and Mediterranean Coast',
                ar: 'الإسكندرية التاريخية والساحل المتوسطي'
            },
            activities: {
                es: [
                    'Desayuno temprano y salida hacia Alejandría',
                    'Visita a la Ciudadela de Qaitbay',
                    'Exploración de la Nueva Biblioteca de Alejandría',
                    'Almuerzo de mariscos frescos en el puerto',
                    'Visita a las Catacumbas de Kom el Shoqafa',
                    'Paseo por el Palacio de Montazah y sus jardines',
                    'Tiempo libre en la Corniche de Alejandría',
                    'Regreso a El Cairo',
                    'Cena y alojamiento'
                ],
                en: [
                    'Early breakfast and departure to Alexandria',
                    'Visit to Qaitbay Citadel',
                    'Exploration of the New Alexandria Library',
                    'Fresh seafood lunch at the harbor',
                    'Visit to Kom el Shoqafa Catacombs',
                    'Walk through Montazah Palace and gardens',
                    'Free time at Alexandria Corniche',
                    'Return to Cairo',
                    'Dinner and accommodation'
                ],
                ar: [
                    'الإفطار المبكر والانطلاق إلى الإسكندرية',
                    'زيارة قلعة قايتباي',
                    'استكشاف مكتبة الإسكندرية الجديدة',
                    'غداء مأكولات بحرية طازجة في الميناء',
                    'زيارة катаكومبات كوم الشقافة',
                    'نزهة في قصر المنتزه وحدائقه',
                    'وقت حر في كورنيش الإسكندرية',
                    'العودة إلى القاهرة',
                    'العشاء والإقامة'
                ]
            }
        }];
    }

    // 🏖️ أيام الغردقة
    private getHurghadaDays(language: Language): ItineraryItem[] {
        return [{
            day: 1,
            title: { es: 'Hurghada – Mar Rojo y Relax', en: 'Hurghada – Red Sea & Relaxation', ar: 'الغردقة – البحر الأحمر والاسترخاء' },
            activities: {
                es: [
                    'Desayuno en el hotel',
                    'Día libre en la playa del Mar Rojo',
                    'Opcional: Excursión de snorkel en barco',
                    'Opcional: Safari en el desierto al atardecer',
                    'Cena y alojamiento'
                ],
                en: [
                    'Breakfast at the hotel',
                    'Leisure day on the Red Sea beach',
                    'Optional: Boat snorkeling excursion',
                    'Optional: Sunset desert safari',
                    'Dinner and accommodation'
                ],
                ar: [
                    'الإفطار في الفندق',
                    'يوم حر على شاطئ البحر الأحمر',
                    'اختياري: رحلة سنوركل بالقارب',
                    'اختياري: سفاري صحراء وقت الغروب',
                    'العشاء والإقامة'
                ]
            }
        }];
    }

    // 🌊 أيام شرم الشيخ
    private getSharmElSheikhDays(language: Language): ItineraryItem[] {
        return [{
            day: 1,
            title: { es: 'Sharm el-Sheij – Mar Rojo y Ocio', en: 'Sharm El-Sheikh – Red Sea & Leisure', ar: 'شرم الشيخ – البحر الأحمر والترفيه' },
            activities: {
                es: [
                    'Desayuno en el hotel',
                    'Día libre para disfrutar de la playa y la piscina',
                    'Opcional: Parque Nacional Ras Mohammed (snorkel)',
                    'Opcional: Cena beduina bajo las estrellas',
                    'Alojamiento'
                ],
                en: [
                    'Breakfast at the hotel',
                    'Free day to enjoy beach and pool',
                    'Optional: Ras Mohammed National Park (snorkeling)',
                    'Optional: Bedouin dinner under the stars',
                    'Accommodation'
                ],
                ar: [
                    'الإفطار في الفندق',
                    'يوم حر للاستمتاع بالشاطئ والمسبح',
                    'اختياري: محمية رأس محمد (سنوركل)',
                    'اختياري: عشاء بدوي تحت النجوم',
                    'الإقامة'
                ]
            }
        }];
    }

    // ⛰️ أيام سانت كاترين
    private getSaintCatherineDays(language: Language): ItineraryItem[] {
        return [{
            day: 1,
            title: { es: 'Santa Catalina – Sinaí y Monasterio', en: 'Saint Catherine – Sinai & Monastery', ar: 'سانت كاترين – جبل سيناء والدير' },
            activities: {
                es: [
                    'Salida de madrugada para ascenso opcional al Monte Sinaí',
                    'Amanecer sobre el desierto',
                    'Visita al Monasterio de Santa Catalina',
                    'Regreso y tiempo libre',
                    'Alojamiento'
                ],
                en: [
                    'Early departure for optional Mount Sinai ascent',
                    'Sunrise over the desert',
                    'Visit to Saint Catherine Monastery',
                    'Return and free time',
                    'Accommodation'
                ],
                ar: [
                    'مغادرة مبكرة لصعود اختياري إلى جبل سيناء',
                    'مشاهدة شروق الشمس فوق الصحراء',
                    'زيارة دير سانت كاترين',
                    'العودة ووقت حر',
                    'الإقامة'
                ]
            }
        }];
    }

    // 🏜️ أيام سيوة
    private getSiwaDays(language: Language): ItineraryItem[] {
        return [{
            day: 1,
            title: { es: 'Siwa – Oasis y Cultura Local', en: 'Siwa – Oasis & Local Culture', ar: 'سيوة – الواحة والثقافة المحلية' },
            activities: {
                es: [
                    'Desayuno',
                    'Paseo por la fortaleza de Shali (exterior)',
                    'Tiempo en la fuente de Cleopatra',
                    'Atardecer en el Gran Mar de Arena',
                    'Cena y alojamiento'
                ],
                en: [
                    'Breakfast',
                    'Walk around Shali Fortress (exterior)',
                    'Time at Cleopatra Spring',
                    'Sunset in the Great Sand Sea',
                    'Dinner and accommodation'
                ],
                ar: [
                    'الإفطار',
                    'نزهة حول قلعة شالي (من الخارج)',
                    'الاستمتاع بعين كليوباترا',
                    'غروب الشمس في بحر الرمال العظيم',
                    'العشاء والإقامة'
                ]
            }
        }];
    }

    // 🏖️ أيام مرسى مطروح
    private getMatrouhDays(language: Language): ItineraryItem[] {
        return [{
            day: 1,
            title: { es: 'Mersa Matruh – Playas del Mediterráneo', en: 'Marsa Matrouh – Mediterranean Beaches', ar: 'مرسى مطروح – شواطئ البحر المتوسط' },
            activities: {
                es: [
                    'Desayuno en el hotel',
                    'Día libre en playas de aguas turquesa',
                    'Opcional: Calas y bahías cercanas',
                    'Cena y alojamiento'
                ],
                en: [
                    'Breakfast at the hotel',
                    'Free day on turquoise-water beaches',
                    'Optional: Nearby coves and bays',
                    'Dinner and accommodation'
                ],
                ar: [
                    'الإفطار في الفندق',
                    'يوم حر على الشواطئ ذات المياه الفيروزية',
                    'اختياري: الخلجان والخلجان القريبة',
                    'العشاء والإقامة'
                ]
            }
        }];
    }

    // 🏛️ أيام أبو سمبل
    private getAbuSimbelDays(language: Language): ItineraryItem[] {
        return [{
            day: 1,
            title: { es: 'Abu Simbel – Templos de Ramsés II', en: 'Abu Simbel – Temples of Ramses II', ar: 'أبو سمبل – معابد رمسيس الثاني' },
            activities: {
                es: [
                    'Salida de madrugada hacia Abu Simbel',
                    'Visita a los templos de Ramsés II y Nefertari',
                    'Tiempo para fotos y contemplación',
                    'Regreso y tarde libre'
                ],
                en: [
                    'Early departure to Abu Simbel',
                    'Visit the Temples of Ramses II and Nefertari',
                    'Time for photos and contemplation',
                    'Return and free afternoon'
                ],
                ar: [
                    'مغادرة مبكرة إلى أبو سمبل',
                    'زيارة معابد رمسيس الثاني ونفرتاري',
                    'وقت لالتقاط الصور والتأمل',
                    'العودة وبعد الظهر حر'
                ]
            }
        }];
    }

    // 🚢 أيام الكروز المفصلة
   // 🚢 أيام الكروز المفصلة
    private getCruiseDays(totalDuration: number, language: Language): ItineraryItem[] {
        const cruiseDays: ItineraryItem[] = [];
        
        // يوم 1: صعود الكروز والإبحار
        cruiseDays.push({
            day: 1,
            title: {
                es: 'Embarque en el Crucero y Templo de Edfu',
                en: 'Cruise Boarding and Edfu Temple',
                ar: 'الصعود إلى الكروز ومعبد إدفو'
            },
            activities: {
                es: [
                    'Traslado al puerto para embarque en el crucero',
                    'Bienvenida a bordo y asignación de cabinas',
                    'Almuerzo buffet en el crucero',
                    'Visita al Templo de Edfu, el mejor preservado de Egipto',
                    'Navegación hacia Kom Ombo',
                    'Cena a bordo',
                    'Relajación en la cubierta bajo las estrellas'
                ],
                en: [
                    'Transfer to port for cruise boarding',
                    'Welcome aboard and cabin assignment',
                    'Buffet lunch on the cruise',
                    'Visit to Edfu Temple, the best preserved in Egypt',
                    'Sailing towards Kom Ombo',
                    'Dinner on board',
                    'Relaxation on deck under the stars'
                ],
                ar: [
                    'الانتقال إلى الميناء للصعود إلى الكروز',
                    'الترحيب على متن السفينة وتخصيص الكبائن',
                    'غداء بوفيه على الكروز',
                    'زيارة معبد إدفو، الأفضل حفظاً في مصر',
                    'الإبحار نحو كوم أمبو',
                    'العشاء على متن السفينة',
                    'الاسترخاء على سطح السفينة تحت النجوم'
                ]
            }
        });
        
        // يوم 2: كوم أمبو والإبحار
        cruiseDays.push({
            day: 2,
            title: {
                es: 'Templo de Kom Ombo y Navegación',
                en: 'Kom Ombo Temple and Sailing',
                ar: 'معبد كوم أمبو والإبحار'
            },
            activities: {
                es: [
                    'Desayuno a bordo',
                    'Visita al Templo de Kom Ombo dedicado a Sobek y Horus',
                    'Navegación por el Nilo disfrutando de vistas panorámicas',
                    'Almuerzo buffet a bordo',
                    'Tarde de relax en la piscina del crucero',
                    'Charla sobre la historia del Antiguo Egipto',
                    'Cena temática egipcia',
                    'Espectáculo de música y danza tradicional'
                ],
                en: [
                    'Breakfast on board',
                    'Visit to Kom Ombo Temple dedicated to Sobek and Horus',
                    'Nile sailing enjoying panoramic views',
                    'Buffet lunch on board',
                    'Relaxing afternoon at cruise pool',
                    'Lecture on Ancient Egyptian history',
                    'Egyptian themed dinner',
                    'Traditional music and dance show'
                ],
                ar: [
                    'الإفطار على متن السفينة',
                    'زيارة معبد كوم أمبو المخصص لسوبك وحورس',
                    'الإبحار في النيل والاستمتاع بمناظر بانورامية',
                    'غداء بوفيه على متن الكروز',
                    'بعد الظهر للاسترخاء في مسبح الكروز',
                    'محاضرة عن تاريخ مصر القديمة',
                    'عشاء على الطريقة المصرية',
                    'عرض موسيقي ورقص تقليدي'
                ]
            }
        });
        
        // يوم 3: وصول أسوان
        cruiseDays.push({
            day: 3,
            title: {
                es: 'Llegada a Asuán y Templo de Philae',
                en: 'Arrival in Aswan and Philae Temple',
                ar: 'الوصول إلى أسوان ومعبد فيلة'
            },
            activities: {
                es: [
                    'Desayuno a bordo',
                    'Llegada a Asuán',
                    'Visita a la Presa Alta de Asuán',
                    'Paseo en faluca alrededor de las Islas',
                    'Almuerzo a bordo',
                    'Visita al Templo de Philae dedicado a la diosa Isis',
                    'Tiempo libre en el mercado de especias',
                    'Cena y alojamiento en el crucero'
                ],
                en: [
                    'Breakfast on board',
                    'Arrival in Aswan',
                    'Visit to Aswan High Dam',
                    'Felucca ride around the Islands',
                    'Lunch on board',
                    'Visit to Philae Temple dedicated to goddess Isis',
                    'Free time at spice market',
                    'Dinner and accommodation on cruise'
                ],
                ar: [
                    'الإفطار على متن السفينة',
                    'الوصول إلى أسوان',
                    'زيارة السد العالي في أسوان',
                    'رحلة فلوكة حول الجزر',
                    'الغداء على متن السفينة',
                    'زيارة معبد فيلة المخصص للإلهة إيزيس',
                    'وقت حر في سوق التوابل',
                    'العشاء والإقامة على الكروز'
                ]
            }
        });
        
        // يوم 4: أبو سمبل (اختياري للكروز الطويل)
        if (totalDuration >= 10) {
            cruiseDays.push({
                day: 4,
                title: {
                    es: 'Excursión a Abu Simbel',
                    en: 'Abu Simbel Excursion',
                    ar: 'رحلة إلى أبو سمبل'
                },
                activities: {
                    es: [
                        'Salida temprana hacia Abu Simbel',
                        'Visita a los Templos de Ramsés II y Nefertari',
                        'Desayuno tipo box',
                        'Regreso a Asuán',
                        'Almuerzo a bordo del crucero',
                        'Tarde libre para descansar',
                        'Cena de despedida en el crucero',
                        'Desembarque'
                    ],
                    en: [
                        'Early departure to Abu Simbel',
                        'Visit to Ramses II and Nefertari Temples',
                        'Box breakfast',
                        'Return to Aswan',
                        'Lunch on board',
                        'Free afternoon to rest',
                        'Farewell dinner on cruise',
                        'Disembarkation'
                    ],
                    ar: [
                        'مغادرة مبكرة إلى أبو سمبل',
                        'زيارة معابد رمسيس الثاني ونفرتاري',
                        'إفطار خفيف',
                        'العودة إلى أسوان',
                        'الغداء على متن السفينة',
                        'بعد الظهر حر للراحة',
                        'عشاء الوداع على الكروز',
                        'النزول من السفينة'
                    ]
                }
            });
        }
        
        return cruiseDays;
    }

    // 🗺️ الحصول على أيام مفصلة لكل وجهة
    private getDaysForDestination(destination: string, totalDuration: number, language: Language): ItineraryItem[] {
        const days: ItineraryItem[] = [];
        
        switch (destination.toLowerCase()) {
            case 'cairo':
                days.push(...this.getCairoDays(totalDuration, language));
                break;
            case 'luxor':
                days.push(...this.getLuxorDays(language));
                break;
            case 'aswan':
                days.push(...this.getAswanDays(language));
                break;
            case 'alexandria':
                days.push(...this.getAlexandriaDays(language));
                break;
            case 'cruise':
                days.push(...this.getCruiseDays(totalDuration, language));
                break;
            case 'hurghada':
                days.push(...this.getHurghadaDays(language));
                break;
            case 'sharmelsheikh':
            case 'sharm el sheikh':
                days.push(...this.getSharmElSheikhDays(language));
                break;
            case 'saintcatherine':
            case 'saint catherine':
                days.push(...this.getSaintCatherineDays(language));
                break;
            case 'siwa':
                days.push(...this.getSiwaDays(language));
                break;
            case 'matrouh':
            case 'marsa matrouh':
                days.push(...this.getMatrouhDays(language));
                break;
            case 'abusimbel':
            case 'abu simbel':
                days.push(...this.getAbuSimbelDays(language));
                break;
        }
        
        return days;
    }

    // 🧱 إنشاء سرد يومي لكل مدينة اعتمادًا على باقاتنا (Dynamic narrative from packages)
    private buildCityItineraryFromPackages(city: string, count: number, language: Language): ItineraryItem[] {
        if (count <= 0) return [];

        const cityData = this.extractCityData(city, language);

        const arrivalKeywords = ['arrival', 'llegada', 'الوصول'];
        const departureKeywords = ['departure', 'salida', 'المغادرة'];
        const freeDayKeywords = ['free', 'libre', 'حر'];

        const isNonTouringDay = (title: string, activities: string[]): boolean => {
            const t = (title || '').toLowerCase();
            const a = (activities || []).join(' ').toLowerCase();
            const has = (kw: string[]) => kw.some(k => t.includes(k) || a.includes(k));
            return has(arrivalKeywords) || has(departureKeywords) || has(freeDayKeywords);
        };

        const normalized: ItineraryItem[] = [];
        for (const item of cityData.itinerary) {
            const localTitle = item.title?.[language] || item.title?.en || '';
            let acts: string[] = [];
            if (Array.isArray((item as any).activities)) {
                acts = (item as any).activities as string[];
            } else if (typeof (item as any).activities === 'object' && (item as any).activities) {
                acts = (item as any).activities[language] || (item as any).activities.en || [];
            }

            if (isNonTouringDay(localTitle, acts)) continue;

            const activitiesObj = Array.isArray((item as any).activities)
                ? { es: acts, en: acts, ar: acts }
                : (item as any).activities;

            normalized.push({
                day: (item as any).day ?? 0, // سيتم ضبطه عند الإدراج النهائي
                title: item.title,
                activities: activitiesObj,
            } as ItineraryItem);
        }

        return normalized.slice(0, Math.max(0, count));
    }

    // 🧩 بناء أيام مخصصة تحتوي فقط على المواقع التي اختارها العميل (Site-only days)
    private buildSiteOnlyDays(
        city: string,
        daysToAdd: number,
        sitesRaw: string[] | undefined,
        language: Language
    ): ItineraryItem[] {
        if (!sitesRaw || sitesRaw.length === 0 || daysToAdd <= 0) return [];

        const cityName = this.getCityLocalizedName(city);
        const localizedCity = cityName?.[language] || cityName?.en || city;

        // قسم المواقع على عدد الأيام المطلوب بالتساوي
        const chunkSize = Math.max(1, Math.ceil(sitesRaw.length / daysToAdd));
        const chunks: string[][] = [];
        for (let i = 0; i < sitesRaw.length; i += chunkSize) {
            chunks.push(sitesRaw.slice(i, i + chunkSize));
        }
        while (chunks.length < daysToAdd) chunks.push([]);

        const mkTitle = (dayIndex: number): LocalizedString => ({
            es: `${localizedCity} – Visitas Personalizadas (${dayIndex})`,
            en: `${localizedCity} – Personalized Visits (${dayIndex})`,
            ar: `${localizedCity} – زيارات مخصصة (${dayIndex})`,
        });

        const mkActivities = (sites: string[]): { es: string[]; en: string[]; ar?: string[] } => ({
            es: sites.map(s => `Visita: ${s}`),
            en: sites.map(s => `Visit: ${s}`),
            ar: sites.map(s => `زيارة: ${s}`),
        });

        return chunks.slice(0, daysToAdd).map((sites, idx) => ({
            day: 0, // سيتم ضبطه لاحقاً
            title: mkTitle(idx + 1),
            activities: mkActivities(sites)
        }));
    }

    // 📝 إنشاء الـ itinerary المخصص بالتفاصيل الكاملة
    // private createCustomItinerary(
    //     duration: number,
    //     destinations: string[],
    //     nightsDistribution: any,
    //     language: Language
    // ): ItineraryItem[] {
    //     const customItinerary: ItineraryItem[] = [];
        
    //     // يوم الوصول - تفاصيل كاملة
    //     customItinerary.push({
    //         day: 1,
    //         title: {
    //             es: 'Llegada a El Cairo - Bienvenida a Egipto',
    //             en: 'Arrival in Cairo - Welcome to Egypt', 
    //             ar: 'الوصول إلى القاهرة - مرحباً بكم في مصر'
    //         },
    //         activities: {
    //             es: [
    //                 'Llegada al aeropuerto internacional de El Cairo',
    //                 'Asistencia en el aeropuerto por nuestro representante',
    //                 'Traslado privado al hotel en vehículo con aire acondicionado',
    //                 'Check-in en el hotel y tiempo libre para descansar',
    //                 'Reunión informativa con nuestro guía para revisar el itinerario',
    //                 'Cena de bienvenida (opcional)'
    //             ],
    //             en: [
    //                 'Arrival at Cairo International Airport',
    //                 'Airport assistance by our representative', 
    //                 'Private transfer to hotel in air-conditioned vehicle',
    //                 'Hotel check-in and free time to rest',
    //                 'Information meeting with our guide to review itinerary',
    //                 'Welcome dinner (optional)'
    //             ],
    //             ar: [
    //                 'الوصول إلى مطار القاهرة الدولي',
    //                 'المساعدة في المطار من قبل ممثلنا',
    //                 'انتقال خاص إلى الفندق في مركبة مكيفة',
    //                 'تسجيل الوصول في الفندق والوقت الحر للراحة',
    //                 'اجتماع إعلامي مع مرشدنا لمراجعة البرنامج',
    //                 'عشاء ترحيبي (اختياري)'
    //             ]
    //         }
    //     });

    //     // إنشاء الأيام الأساسية بناءً على الوجهات
    //     let currentDay = 2;
        
    //     for (const destination of destinations) {
    //         const daysForDestination = this.getDaysForDestination(destination, duration, language);
            
    //         for (const day of daysForDestination) {
    //             if (currentDay <= duration - 1) {
    //                 customItinerary.push({
    //                     ...day,
    //                     day: currentDay++
    //                 });
    //             }
    //         }
    //     }

    //     // يوم المغادرة - تفاصيل كاملة
    //     customItinerary.push({
    //         day: duration,
    //         title: {
    //             es: 'Salida de El Cairo - Hasta Pronto',
    //             en: 'Departure from Cairo - See You Soon',
    //             ar: 'المغادرة من القاهرة - إلى اللقاء'
    //         },
    //         activities: {
    //             es: [
    //                 'Desayuno en el hotel',
    //                 'Tiempo libre para últimas compras o actividades personales',
    //                 'Check-out del hotel según horario establecido',
    //                 'Traslado al aeropuerto internacional de El Cairo',
    //                 'Asistencia con el check-in y facturación de equipaje',
    //                 'Despedida y fin de nuestros servicios'
    //             ],
    //             en: [
    //                 'Breakfast at the hotel',
    //                 'Free time for last-minute shopping or personal activities',
    //                 'Hotel check-out according to schedule',
    //                 'Transfer to Cairo International Airport', 
    //                 'Assistance with check-in and baggage drop',
    //                 'Farewell and end of our services'
    //             ],
    //             ar: [
    //                 'الإفطار في الفندق',
    //                 'وقت حر للتسوق أو الأنشطة الشخصية',
    //                 'تسجيل الخروج من الفندق حسب الجدول',
    //                 'الانتقال إلى مطار القاهرة الدولي',
    //                 'المساعدة في تسجيل الوصول وإيداع الأمتعة',
    //                 'الوداع ونهاية خدماتنا'
    //             ]
    //         }
    //     });

    //     return customItinerary;
    // }

    private createCustomItinerary(
    duration: number,
    destinations: string[],
    nightsDistribution: any,
    language: Language,
    clientPlan?: {
        perCityDays?: Record<string, number>;
        perCitySitesRaw?: Record<string, string[]>;
    }
): ItineraryItem[] {
    const customItinerary: ItineraryItem[] = [];
    
    // يوم الوصول
    customItinerary.push({
        day: 1,
        title: {
            es: 'Llegada a El Cairo - Bienvenida a Egipto',
            en: 'Arrival in Cairo - Welcome to Egypt', 
            ar: 'الوصول إلى القاهرة - مرحباً بكم في مصر'
        },
        activities: {
            es: [
                'Llegada al aeropuerto internacional de El Cairo',
                'Asistencia en el aeropuerto por nuestro representante',
                'Traslado privado al hotel en vehículo con aire acondicionado',
                'Check-in en el hotel y tiempo libre para descansar',
                'Reunión informativa con nuestro guía para revisar el itinerario',
                'Cena de bienvenida (opcional)'
            ],
            en: [
                'Arrival at Cairo International Airport',
                'Airport assistance by our representative', 
                'Private transfer to hotel in air-conditioned vehicle',
                'Hotel check-in and free time to rest',
                'Information meeting with our guide to review itinerary',
                'Welcome dinner (optional)'
            ],
            ar: [
                'الوصول إلى مطار القاهرة الدولي',
                'المساعدة في المطار من قبل ممثلنا',
                'انتقال خاص إلى الفندق في مركبة مكيفة',
                'تسجيل الوصول في الفندق والوقت الحر للراحة',
                'اجتماع إعلامي مع مرشدنا لمراجعة البرنامج',
                'عشاء ترحيبي (اختياري)'
            ]
        }
    });

    let currentDay = 2;
    
    console.log('[itinerary] Starting itinerary creation');
    console.log('[itinerary] Duration:', duration, 'Current day:', currentDay);
    console.log('[itinerary] Nights distribution:', nightsDistribution);

    // ابنِ الأيام حسب ترتيب اختيارات العميل، بسرد من الباقات إن وُجد
    const normalizeCity = (d: string): string => {
        const s = d.toLowerCase();
        if (s.includes('cruise') || s.includes('nile')) return 'cruise';
        if (s.includes('cairo') || s.includes('القاهرة') || s.includes('القاهره')) return 'cairo';
        if (s.includes('luxor') || s.includes('الأقصر') || s.includes('الاقصر')) return 'luxor';
        if (s.includes('aswan') || s.includes('أسوان') || s.includes('اسوان')) return 'aswan';
        if (s.includes('alexandria') || s.includes('الإسكندرية') || s.includes('الاسكندرية')) return 'alexandria';
        if (s.includes('hurghada') || s.includes('الغردقة')) return 'hurghada';
        if (s.includes('sharm') || s.includes('شرم')) return 'sharm el sheikh';
        if (s.includes('catherine') || s.includes('كاترين')) return 'saint catherine';
        if (s.includes('siwa') || s.includes('سيوة')) return 'siwa';
        if (s.includes('matrouh') || s.includes('مطروح') || s.includes('مرسى')) return 'matrouh';
        if (s.includes('abu simbel') || s.includes('ابو سمبل') || s.includes('أبو سمبل')) return 'abu simbel';
        return s;
    };

    // دمج توزيع الأيام الذكي مع التوزيع الذي حدده العميل (إن وجد)
    const effectiveDays: Record<string, number> = { ...nightsDistribution, ...(clientPlan?.perCityDays || {}) };

    for (const rawDestination of destinations) {
        const city = normalizeCity(rawDestination);
        const availableDaysForCity = Math.max(0, (effectiveDays[city] ?? 0));
        if (availableDaysForCity <= 0) continue;

        const remainingSlots = Math.max(0, (duration - currentDay - 1)); // اترك يوم المغادرة
        if (remainingSlots <= 0) break;

        const daysToAdd = Math.min(availableDaysForCity, remainingSlots);

        let cityDays: ItineraryItem[] = [];

        // إذا حدّد العميل مواقع بعينها لهذه المدينة، أنشئ أياماً تحتوي فقط على هذه المواقع
        const clientSitesRaw = clientPlan?.perCitySitesRaw?.[city];
        if (clientSitesRaw && clientSitesRaw.length > 0) {
            cityDays = this.buildSiteOnlyDays(city, daysToAdd, clientSitesRaw, language);
        } else {
            // جرّب السرد من الباقات أولاً
            cityDays = this.buildCityItineraryFromPackages(city, daysToAdd, language);

            // إن لم تكفِ العناصر، كمل بقوالب fallback
            if (cityDays.length < daysToAdd) {
                const fallbackDays = this.getDaysForDestination(city, duration, language);
                const needed = daysToAdd - cityDays.length;
                cityDays = [
                    ...cityDays,
                    ...fallbackDays.slice(0, needed)
                ];
            }
        }

        for (const d of cityDays) {
            customItinerary.push({
                ...d,
                day: currentDay++
            });
            if (currentDay >= duration) break; // لا تتجاوز اليوم الأخير
        }

        if (currentDay >= duration) break;
    }
    
    // ملء الأيام الفارغة بأيام حرة
    while (currentDay < duration) {
        console.log(`[itinerary] Adding free day at position ${currentDay}`);
        customItinerary.push({
            day: currentDay++,
            title: {
                es: 'Día Libre',
                en: 'Free Day',
                ar: 'يوم حر'
            },
            activities: {
                es: ['Tiempo libre para actividades personales', 'Tours opcionales disponibles'],
                en: ['Free time for personal activities', 'Optional tours available'],
                ar: ['وقت حر للأنشطة الشخصية', 'جولات اختيارية متاحة']
            }
        });
    }

    // يوم المغادرة
    customItinerary.push({
        day: duration,
        title: {
            es: 'Salida de El Cairo - Hasta Pronto',
            en: 'Departure from Cairo - See You Soon',
            ar: 'المغادرة من القاهرة - إلى اللقاء'
        },
        activities: {
            es: [
                'Desayuno en el hotel',
                'Tiempo libre para últimas compras o actividades personales',
                'Check-out del hotel según horario establecido',
                'Traslado al aeropuerto internacional de El Cairo',
                'Asistencia con el check-in y facturación de equipaje',
                'Despedida y fin de nuestros servicios'
            ],
            en: [
                'Breakfast at the hotel',
                'Free time for last-minute shopping or personal activities',
                'Hotel check-out according to schedule',
                'Transfer to Cairo International Airport', 
                'Assistance with check-in and baggage drop',
                'Farewell and end of our services'
            ],
            ar: [
                'الإفطار في الفندق',
                'وقت حر للتسوق أو الأنشطة الشخصية',
                'تسجيل الخروج من الفندق حسب الجدول',
                'الانتقال إلى مطار القاهرة الدولي',
                'المساعدة في تسجيل الوصول وإيداع الأمتعة',
                'الوداع ونهاية خدماتنا'
            ]
        }
    });

    console.log(`[itinerary] Final itinerary has ${customItinerary.length} days (expected ${duration})`);
    return customItinerary;
}

    // 🏙️ الحصول على الاسم المحلي للمدينة
    private getCityLocalizedName(city: string): LocalizedString {
        const cityNames: { [key: string]: LocalizedString } = {
            'cairo': { es: 'El Cairo', en: 'Cairo', ar: 'القاهرة' },
            'luxor': { es: 'Luxor', en: 'Luxor', ar: 'الأقصر' },
            'aswan': { es: 'Asuán', en: 'Aswan', ar: 'أسوان' },
            'alexandria': { es: 'Alejandría', en: 'Alexandria', ar: 'الإسكندرية' },
            'cruise': { es: 'Crucero por el Nilo', en: 'Nile Cruise', ar: 'رحلة نيلية' }
        };

        return cityNames[city] || { es: city, en: city, ar: city };
    }

    // 📊 حساب توزيع الليالي
    // 📊 حساب توزيع الأيام (مش الليالي!)
private calculateNightsDistribution(duration: number, destinations: string[]): {
    cairo: number;
    luxor: number;
    aswan: number;
    alexandria: number;
    cruise: number;
} {
    // عدد الأيام المتاحة (بدون يوم الوصول والمغادرة)
    const availableDays = duration - 2;
    
    const hasCruise = destinations.some(d => d.toLowerCase().includes('cruise') || d.toLowerCase().includes('nile'));
    const hasLuxor = destinations.some(d => d.toLowerCase().includes('luxor'));
    const hasAswan = destinations.some(d => d.toLowerCase().includes('aswan'));
    const hasAlexandria = destinations.some(d => d.toLowerCase().includes('alexandria'));

    let distribution = {
        cairo: 0,
        luxor: 0,
        aswan: 0,
        alexandria: 0,
        cruise: 0
    };

    console.log(`[distribution] Total duration: ${duration}, Available days: ${availableDays}`);

    if (hasCruise) {
        // توزيع ذكي للكروز حسب المدة
        if (duration >= 10) {
            // برنامج طويل: 4 أيام كروز
            distribution.cruise = 4;
            distribution.cairo = Math.max(2, availableDays - 4);
            
            if (hasAlexandria && availableDays > 6) {
                distribution.alexandria = 1;
                distribution.cairo = availableDays - 5;
            }
        } else if (duration >= 8) {
            // برنامج متوسط: 3 أيام كروز
            distribution.cruise = 3;
            distribution.cairo = Math.max(2, availableDays - 3);
            
            if (hasAlexandria && availableDays > 5) {
                distribution.alexandria = 1;
                distribution.cairo = availableDays - 4;
            }
        } else if (duration >= 6) {
            // برنامج 6 أيام: 2 قاهرة + 2 كروز
            distribution.cairo = 2;
            distribution.cruise = 2;
        } else if (duration >= 5) {
            // برنامج 5 أيام: 2 قاهرة + 1 كروز
            distribution.cairo = 2;
            distribution.cruise = 1;
        } else {
            // برنامج قصير جداً
            distribution.cairo = Math.max(1, availableDays - 1);
            distribution.cruise = 1;
        }
    } else {
        // بدون كروز - توزيع على المدن
        let remainingDays = availableDays;
        
        // القاهرة دائماً لها الأولوية
        distribution.cairo = Math.max(2, Math.ceil(remainingDays * 0.4));
        remainingDays -= distribution.cairo;
        
        if (hasLuxor && remainingDays > 0) {
            distribution.luxor = Math.max(1, Math.ceil(remainingDays * 0.4));
            remainingDays -= distribution.luxor;
        }
        
        if (hasAswan && remainingDays > 0) {
            distribution.aswan = Math.max(1, Math.ceil(remainingDays * 0.5));
            remainingDays -= distribution.aswan;
        }
        
        if (hasAlexandria && remainingDays > 0) {
            distribution.alexandria = Math.max(1, remainingDays);
            remainingDays = 0;
        }
        
        // أي أيام متبقية تروح للقاهرة
        if (remainingDays > 0) {
            distribution.cairo += remainingDays;
        }
    }

    console.log('[distribution] Final distribution (DAYS not nights):', distribution);
    console.log('[distribution] Total days allocated:', 
        distribution.cairo + distribution.luxor + distribution.aswan + distribution.alexandria + distribution.cruise);
    
    return distribution;
}

    // 🎯 إنشاء برنامج مخصص ذكي
    createCustomProgram(request: {
        duration: number;
        travelers: number;
        destinations: string[];
        season: 'summer' | 'winter';
        category: 'gold' | 'diamond';
        language: Language;
        clientPlan?: {
            perCityDays?: Record<string, number>;
            perCitySitesRaw?: Record<string, string[]>;
        }
    }): Program {
        const { duration, travelers, destinations, season, category, language, clientPlan } = request;
        const totalNights = duration - 1;

        // حساب توزيع الليالي
        const nightsDistribution = this.calculateNightsDistribution(duration, destinations);

        // إنشاء البرنامج اليومي المفصل
        const customItinerary = this.createCustomItinerary(
            duration, 
            destinations, 
            nightsDistribution,
            language,
            clientPlan
        );

        // إنشاء أماكن الإقامة المفصلة
        const accommodations = this.createCustomAccommodations(
            nightsDistribution, 
            category,
            language
        );

        // إنشاء البرنامج النهائي
        const program: Program = {
            id: `custom-${Date.now()}`,
            isCustom: true,
            name: this.createCustomProgramName(duration, destinations, language),
            icon: "🗺️",
            duration: { days: duration, nights: totalNights },
            priceFrom: 0,
            categories: [category],
            startCity: { es: "El Cairo", en: "Cairo", ar: "القاهرة" },
            ...(nightsDistribution.cruise > 0 && { cruiseNights: nightsDistribution.cruise }),
            briefDescription: this.createBriefDescription(duration, destinations, language),
            generalDescription: this.createGeneralDescription(duration, destinations, language),
            itinerary: customItinerary,
            itineraryOptions: [
                {
                    name: { es: "Itinerario Principal", en: "Main Itinerary", ar: "البرنامج الرئيسي" },
                    itinerary: customItinerary
                }
            ],
            accommodations: accommodations,
            servicesIncluded: this.createServicesIncluded(nightsDistribution, category, language),
            servicesExcluded: knowledgeBase.defaults.servicesExcluded,
            importantNotes: knowledgeBase.defaults.importantNotes,
            quoteParams: {
                travelers,
                duration,
                season,
                category,
                itineraryPlan: {
                    nights: this.convertNightsDistribution(nightsDistribution),
                    sites: this.extractSitesFromItinerary(customItinerary, language),
                    flightSectors: nightsDistribution.cruise > 0 ? 2 : 0,
                }
            }
        };

        return program;
    }

    // 🗺️ استخراج المواقع من الـ itinerary
    private extractSitesFromItinerary(itinerary: ItineraryItem[], language: Language): SupportedSite[] {
        const sites: SupportedSite[] = [];
        const allActivities = itinerary.flatMap(day => {
            if (!day.activities) return [];
            if (Array.isArray(day.activities)) return day.activities;
            if (typeof day.activities === 'object') {
                return day.activities[language] || day.activities.en || [];
            }
            return [];
        });

        const activitiesText = allActivities.join(' ').toLowerCase();

        // التعرف على المواقع من النص
        if (activitiesText.includes('pyramid') || activitiesText.includes('pirámide') || activitiesText.includes('هرم')) {
            sites.push('gizaPyramidsAndSphinx');
        }
        if (activitiesText.includes('sphinx') || activitiesText.includes('esfinge') || activitiesText.includes('أبو الهول')) {
            sites.push('gizaPyramidsAndSphinx');
        }
        if (activitiesText.includes('museum') || activitiesText.includes('museo') || activitiesText.includes('متحف')) {
            sites.push('egyptianMuseum');
        }
        if (activitiesText.includes('karnak') || activitiesText.includes('الكرنك')) {
            sites.push('karnakTemple');
        }
        if (activitiesText.includes('luxor temple') || activitiesText.includes('templo de luxor') || activitiesText.includes('معبد الأقصر')) {
            sites.push('luxorTemple');
        }
        if (activitiesText.includes('valley of the kings') || activitiesText.includes('valle de los reyes') || activitiesText.includes('وادي الملوك')) {
            sites.push('valleyOfTheKings');
        }
        if (activitiesText.includes('hatshepsut') || activitiesText.includes('حتشبسوت')) {
            sites.push('hatshepsutTemple');
        }
        if (activitiesText.includes('abu simbel') || activitiesText.includes('أبو سمبل')) {
            sites.push('abuSimbelTemples');
        }
        if (activitiesText.includes('philae') || activitiesText.includes('فيلة')) {
            sites.push('philaeTemple');
        }
        if (activitiesText.includes('kom ombo') || activitiesText.includes('كوم أمبو')) {
            sites.push('komOmboTemple');
        }
        if (activitiesText.includes('edfu') || activitiesText.includes('إدفو')) {
            sites.push('edfuTemple');
        }
        if (activitiesText.includes('khan el khalili') || activitiesText.includes('خان الخليلي')) {
            sites.push('khanElKhalili');
        }
        if (activitiesText.includes('citadel') || activitiesText.includes('ciudadela') || activitiesText.includes('قلعة')) {
            sites.push('qaitbayCitadel');
        }
        if (activitiesText.includes('alexandria') || activitiesText.includes('alejandría') || activitiesText.includes('الإسكندرية')) {
            sites.push('alexandriaNationalMuseum');
        }

        return [...new Set(sites)];
    }

    // 📝 إنشاء اسم البرنامج المخصص
    private createCustomProgramName(duration: number, destinations: string[], language: Language): LocalizedString {
        const cityNames = destinations.map(city => this.getCityLocalizedName(city));
        const cityList = cityNames.map(city => city?.[language] || city?.en || city?.es || city?.ar || city).join(' & ');

        const baseName = {
            en: `Custom ${duration}-Day ${cityList} Journey`,
            es: `Viaje Personalizado de ${duration} Días - ${cityList}`,
            ar: `رحلة مخصصة لمدة ${duration} أيام - ${cityList}`
        };

        // التحقق من أن الاسم لا يتطابق مع برنامج جاهز
        if (!this.validateCustomProgramName(baseName.en)) {
            // استخدام اسم بديل آمن
            return {
                en: `Personalized ${duration}-Day Egypt Experience`,
                es: `Experiencia Egipta Personalizada de ${duration} Días`,
                ar: `تجربة مصرية مخصصة لمدة ${duration} أيام`
            };
        }

        return baseName;
    }

    // 📝 إنشاء الوصف المختصر
    private createBriefDescription(duration: number, destinations: string[], language: Language): LocalizedString {
        const cityNames = destinations.map(city => this.getCityLocalizedName(city));
        const cityList = cityNames.map(city => city?.[language] || city?.en || city?.es || city?.ar || city).join(' & ');

        return {
            es: `Un viaje personalizado de ${duration} días explorando ${cityList}`,
            en: `A custom ${duration}-day journey exploring ${cityList}`,
            ar: `رحلة مخصصة لمدة ${duration} أيام لاستكشاف ${cityList}`
        };
    }

    // 📝 إنشاء الوصف العام
    private createGeneralDescription(duration: number, destinations: string[], language: Language): LocalizedString {
        const cityNames = destinations.map(city => this.getCityLocalizedName(city));
        const cityList = cityNames.map(city => city?.[language] || city?.en || city?.es || city?.ar || city).join(' & ');

        return {
            es: `Este itinerario personalizado de ${duration} días ha sido diseñado especialmente para ti, combinando lo mejor de ${cityList}. Cada detalle ha sido cuidadosamente seleccionado para crear una experiencia inolvidable.`,
            en: `This custom ${duration}-day itinerary has been specially designed for you, combining the best of ${cityList}. Every detail has been carefully selected to create an unforgettable experience.`,
            ar: `هذا المسار المخصص لمدة ${duration} أيام مصمم خصيصًا لك، يجمع بين أفضل ما في ${cityList}. تم اختيار كل تفصيل بعناية لخلق تجربة لا تُنسى.`
        };
    }

    // 🏨 إنشاء الخدمات المضمنة
    private createServicesIncluded(
        nightsDistribution: any,
        category: 'gold' | 'diamond',
        language: Language
    ): { es: string[]; en: string[]; ar: string[] } {
        const baseServices = knowledgeBase.defaults.servicesIncluded[language] || [];
        const services = [...baseServices];

        // إضافة خدمات الإقامة
        for (const [city, nights] of Object.entries(nightsDistribution)) {
            if (typeof nights === 'number' && nights > 0) {
                const cityName = this.getCityLocalizedName(city)?.[language] || this.getCityLocalizedName(city)?.en || city;
                if (language === 'es') {
                    services.push(`${nights} noches en ${cityName}`);
                } else if (language === 'en') {
                    services.push(`${nights} nights in ${cityName}`);
                } else {
                    services.push(`${nights} ليالي في ${cityName}`);
                }
            }
        }

        return {
            es: services,
            en: services,
            ar: services
        };
    }

    // 🔄 تحويل توزيع الليالي
    private convertNightsDistribution(nightsDistribution: any): { [key: string]: number } {
        const result: { [key: string]: number } = {};
        for (const [city, nights] of Object.entries(nightsDistribution)) {
            if (typeof nights === 'number' && nights > 0) {
                result[city] = nights;
            }
        }
        return result;
    }
}

// 🚀 تصدير الدالة الرئيسية
export function createIntelligentCustomProgram(request: {
    duration: number;
    travelers: number;
    destinations: string[];
    season: 'summer' | 'winter';
    category: 'gold' | 'diamond';
    language: Language;
}): Program {
    const extractor = new IntelligentDataExtractor();
    return extractor.createCustomProgram(request);
}