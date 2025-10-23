import type { Program, ItineraryItem, CustomQuoteParams, SupportedSite, SupportedCity, LocalizedString } from './types';
import { knowledgeBase } from './services/knowledgeBase';
import type { Language } from './contexts/LanguageContext';

// 🔥 النظام المرن الجديد - واجهات البيانات

interface DayPlan {
    days: string; // "1-2" or "3"
    city?: string;
    sites?: string[]; // أماكن محددة
    type?: 'cruise' | 'city';
    nights?: number; // للكروز
    startCity?: 'luxor' | 'aswan';
    direction?: 'luxor-to-aswan' | 'aswan-to-luxor';
    departureDay?: 'saturday' | 'monday' | 'wednesday' | 'friday';
}

interface FlexibleCustomRequest {
    travelers: number;
    duration: number;
    dayByDay: DayPlan[];
    season: 'summer' | 'winter';
    category: 'gold' | 'diamond';
    language: Language;
}

// 🗺️ خريطة المواقع المتاحة
const AVAILABLE_SITES = {
    cairo: [
        'gizaPyramidsAndSphinx', 'egyptianMuseum', 'khanElKhalili', 
        'citadelOfSaladin', 'saqqara', 'copticMuseum'
    ],
    luxor: [
        'karnakTemple', 'luxorTemple', 'valleyOfTheKings', 
        'hatshepsutTemple', 'ramesseumTemple'
    ],
    aswan: [
        'philaeTemple', 'highDam', 'abuSimbelTemples', 'unfinishedObelisk'
    ],
    alexandria: [
        'qaitbayCitadel', 'alexandriaNationalMuseum', 'komElShoqafaCatacombs', 'pompeysPillar'
    ],
    edfu: ['edfuTemple'],
    komOmbo: ['komOmboTemple']
};

// 🚢 قواعد الكروز
const CRUISE_RULES = {
    3: {
        startCity: 'aswan',
        departureDays: ['wednesday', 'friday'],
        direction: 'aswan-to-luxor'
    },
    4: {
        startCity: 'luxor',
        departureDays: ['saturday', 'monday'],
        direction: 'luxor-to-aswan'
    }
};

// 🧠 نظام ذكي لاستخراج البيانات من البرامج الـ10 الموجودةجودة
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
        }
        
        return days;
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
    language: Language
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
    
    // إضافة أيام القاهرة أولاً
    if (nightsDistribution.cairo > 0) {
        const cairoDays = this.getCairoDays(duration, language);
        const daysToAdd = Math.min(nightsDistribution.cairo, cairoDays.length, duration - currentDay - 1);
        
        console.log(`[itinerary] Adding ${daysToAdd} Cairo days`);
        for (let i = 0; i < daysToAdd; i++) {
            customItinerary.push({
                ...cairoDays[i],
                day: currentDay++
            });
        }
    }
    
    // إضافة أيام الكروز
    if (nightsDistribution.cruise > 0) {
        const cruiseDays = this.getCruiseDays(duration, language);
        const daysToAdd = Math.min(nightsDistribution.cruise, cruiseDays.length, duration - currentDay - 1);
        
        console.log(`[itinerary] Adding ${daysToAdd} Cruise days from ${cruiseDays.length} available`);
        for (let i = 0; i < daysToAdd; i++) {
            customItinerary.push({
                ...cruiseDays[i],
                day: currentDay++
            });
        }
    }
    
    // إضافة أيام الأقصر
    if (nightsDistribution.luxor > 0) {
        const luxorDays = this.getLuxorDays(language);
        const daysToAdd = Math.min(nightsDistribution.luxor, luxorDays.length, duration - currentDay - 1);
        
        console.log(`[itinerary] Adding ${daysToAdd} Luxor days`);
        for (let i = 0; i < daysToAdd; i++) {
            customItinerary.push({
                ...luxorDays[i],
                day: currentDay++
            });
        }
    }
    
    // إضافة أيام أسوان
    if (nightsDistribution.aswan > 0) {
        const aswanDays = this.getAswanDays(language);
        const daysToAdd = Math.min(nightsDistribution.aswan, aswanDays.length, duration - currentDay - 1);
        
        console.log(`[itinerary] Adding ${daysToAdd} Aswan days`);
        for (let i = 0; i < daysToAdd; i++) {
            customItinerary.push({
                ...aswanDays[i],
                day: currentDay++
            });
        }
    }
    
    // إضافة أيام الإسكندرية
    if (nightsDistribution.alexandria > 0) {
        const alexandriaDays = this.getAlexandriaDays(language);
        const daysToAdd = Math.min(nightsDistribution.alexandria, alexandriaDays.length, duration - currentDay - 1);
        
        console.log(`[itinerary] Adding ${daysToAdd} Alexandria days`);
        for (let i = 0; i < daysToAdd; i++) {
            customItinerary.push({
                ...alexandriaDays[i],
                day: currentDay++
            });
        }
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
            distribution.cruis    // 🎯 إنشاء برنامج مخصص مرن بناءً على اختيارات العميل
    createFlexibleCustomProgram(request: FlexibleCustomRequest): Program {
        const { travelers, duration, dayByDay, season, category, language } = request;
        
        // تحليل الطلب المرن
        const analyzedRequest = this.analyzeFlexibleRequest(dayByDay, duration);
        
        // إنشاء البرنامج اليومي المرن
        const flexibleItinerary = this.createFlexibleItinerary(analyzedRequest, language);
        
        // حساب توزيع الليالي
        const nightsDistribution = this.calculateFlexibleNightsDistribution(analyzedRequest);
        
        // إنشاء أماكن الإقامة
        const accommodations = this.createCustomAccommodations(
            nightsDistribution, 
            category,
            language
        );

        // إنشاء البرنامج النهائي
        const program: Program = {
            id: `flexible-custom-${Date.now()}`,
            isCustom: true,
            name: this.createFlexibleProgramName(analyzedRequest, language),
            icon: "🗺️",
            duration: { days: duration, nights: duration - 1 },
            priceFrom: 0,
            categories: [category],
            startCity: { es: "El Cairo", en: "Cairo", ar: "القاهرة" },
            ...(analyzedRequest.hasCruise && { cruiseNights: analyzedRequest.cruiseNights }),
            briefDescription: this.createFlexibleBriefDescription(analyzedRequest, language),
            generalDescription: this.createFlexibleGeneralDescription(analyzedRequest, language),
            itinerary: flexibleItinerary,
            itineraryOptions: [
                {
                    name: { es: "Itinerario Personalizado", en: "Custom Itinerary", ar: "البرنامج المخصص" },
                    itinerary: flexibleItinerary
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
                    sites: this.extractSitesFromFlexibleItinerary(flexibleItinerary, language),
                    flightSectors: analyzedRequest.hasCruise ? 2 : 0,
                }
            }
        };

        return program;
    }

    // 🧠 تحليل الطلب المرن
    private analyzeFlexibleRequest(dayByDay: DayPlan[], duration: number): {
        cities: string[];
        sites: { [city: string]: string[] };
        hasCruise: boolean;
        cruiseNights: number;
        cruiseDirection: string;
        cruiseStartCity: string;
        cruiseDepartureDay: string;
    } {
        const cities: string[] = [];
        const sites: { [city: string]: string[] } = {};
        let hasCruise = false;
        let cruiseNights = 0;
        let cruiseDirection = '';
        let cruiseStartCity = '';
        let cruiseDepartureDay = '';

        for (const dayPlan of dayByDay) {
            if (dayPlan.type === 'cruise') {
                hasCruise = true;
                cruiseNights = dayPlan.nights || 3;
                cruiseDirection = dayPlan.direction || 'luxor-to-aswan';
                cruiseStartCity = dayPlan.startCity || 'luxor';
                cruiseDepartureDay = dayPlan.departureDay || 'saturday';
            } else if (dayPlan.city) {
                const city = dayPlan.city.toLowerCase();
                if (!cities.includes(city)) {
                    cities.push(city);
                }
                
                if (dayPlan.sites && dayPlan.sites.length > 0) {
                    sites[city] = dayPlan.sites;
                } else {
                    // إذا لم يحدد العميل مواقع محددة، نستخدم المواقع الافتراضية للمدينة
                    sites[city] = AVAILABLE_SITES[city as keyof typeof AVAILABLE_SITES] || [];
                }
            }
        }

        return {
            cities,
            sites,
            hasCruise,
            cruiseNights,
            cruiseDirection,
            cruiseStartCity,
            cruiseDepartureDay
        };
    }

    // 🎯 إنشاء برنامج مخصص ذكي (الطريقة القديمة - للتوافق مع الكود الموجود)
    createCustomProgram(request: {
        duration: number;
        travelers: number;
        destinations: string[];
        season: 'summer' | 'winter';
        category: 'gold' | 'diamond';
        language: Language;
    }): Program {ibution.cairo;
        
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
    }): Program {
        const { duration, travelers, destinations, season, category, language } = request;
        const totalNights = duration - 1;

        // حساب توزيع الليالي
        const nightsDistribution = this.calculateNightsDistribution(duration, destinations);

        // إنشاء البرنامج اليومي المفصل
        const customItinerary = this.createCustomItinerary(
            duration, 
            destinations, 
            nightsDistribution,
            language
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
            en: `This custo    // 🔄 تحويل توزيع الليالي
    private convertNightsDistribution(nightsDistribution: any): { [key: string]: number } {
        const result: { [key: string]: number } = {};
        for (const [city, nights] of Object.entries(nightsDistribution)) {
            if (typeof nights === 'number' && nights > 0) {
                result[city] = nights;
            }
        }
        return result;
    }

    // 🗺️ إنشاء البرنامج اليومي المرن
    private createFlexibleItinerary(analyzedRequest: any, language: Language): ItineraryItem[] {
        const itinerary: ItineraryItem[] = [];
        let currentDay = 1;

        // يوم الوصول
        itinerary.push(this.createArrivalDay(language));

        // إضافة أيام المدن حسب اختيار العميل
        for (const city of analyzedRequest.cities) {
            const citySites = analyzedRequest.sites[city] || [];
            const cityDays = this.createCityDaysWithSpecificSites(city, citySites, language);
            
            for (const day of cityDays) {
                itinerary.push({
                    ...day,
                    day: ++currentDay
                });
            }
        }

        // إضافة أيام الكروز إذا كان مطلوباً
        if (analyzedRequest.hasCruise) {
            const cruiseDays = this.createCruiseDaysWithRules(
                analyzedRequest.cruiseNights,
                analyzedRequest.cruiseDirection,
                analyzedRequest.cruiseStartCity,
                language
            );
            
            for (const day of cruiseDays) {
                itinerary.push({
                    ...day,
                    day: ++currentDay
                });
            }
        }

        // يوم المغادرة
        itinerary.push(this.createDepartureDay(currentDay + 1, language));

        return itinerary;
    }

    // 🏛️ إنشاء أيام المدينة مع مواقع محددة
    private createCityDaysWithSpecificSites(city: string, sites: string[], language: Language): ItineraryItem[] {
        const days: ItineraryItem[] = [];
        
        switch (city.toLowerCase()) {
            case 'cairo':
                days.push(...this.createCairoDaysWithSites(sites, language));
                break;
            case 'luxor':
                days.push(...this.createLuxorDaysWithSites(sites, language));
                break;
            case 'aswan':
                days.push(...this.createAswanDaysWithSites(sites, language));
                break;
            case 'alexandria':
                days.push(...this.createAlexandriaDaysWithSites(sites, language));
                break;
        }

        return days;
    }

    // 🏛️ إنشاء أيام القاهرة مع مواقع محددة
    private createCairoDaysWithSites(sites: string[], language: Language): ItineraryItem[] {
        const days: ItineraryItem[] = [];
        
        // تجميع المواقع حسب الأيام
        const sitesPerDay = this.groupSitesByDay(sites, 'cairo');
        
        for (let i = 0; i < sitesPerDay.length; i++) {
            const daySites = sitesPerDay[i];
            const dayTitle = this.getDayTitleForSites(daySites, 'cairo', language);
            const activities = this.generateActivitiesForSites(daySites, 'cairo', language);
            
            days.push({
                day: i + 1,
                title: dayTitle,
                activities: activities
            });
        }

        return days;
    }

    // 🏛️ إنشاء أيام الأقصر مع مواقع محددة
    private createLuxorDaysWithSites(sites: string[], language: Language): ItineraryItem[] {
        const days: ItineraryItem[] = [];
        
        const sitesPerDay = this.groupSitesByDay(sites, 'luxor');
        
        for (let i = 0; i < sitesPerDay.length; i++) {
            const daySites = sitesPerDay[i];
            const dayTitle = this.getDayTitleForSites(daySites, 'luxor', language);
            const activities = this.generateActivitiesForSites(daySites, 'luxor', language);
            
            days.push({
                day: i + 1,
                title: dayTitle,
                activities: activities
            });
        }

        return days;
    }

    // 🏛️ إنشاء أيام أسوان مع مواقع محددة
    private createAswanDaysWithSites(sites: string[], language: Language): ItineraryItem[] {
        const days: ItineraryItem[] = [];
        
        const sitesPerDay = this.groupSitesByDay(sites, 'aswan');
        
        for (let i = 0; i < sitesPerDay.length; i++) {
            const daySites = sitesPerDay[i];
            const dayTitle = this.getDayTitleForSites(daySites, 'aswan', language);
            const activities = this.generateActivitiesForSites(daySites, 'aswan', language);
            
            days.push({
                day: i + 1,
                title: dayTitle,
                activities: activities
            });
        }

        return days;
    }

    // 🏛️ إنشاء أيام الإسكندرية مع مواقع محددة
    private createAlexandriaDaysWithSites(sites: string[], language: Language): ItineraryItem[] {
        const days: ItineraryItem[] = [];
        
        const sitesPerDay = this.groupSitesByDay(sites, 'alexandria');
        
        for (let i = 0; i < sitesPerDay.length; i++) {
            const daySites = sitesPerDay[i];
            const dayTitle = this.getDayTitleForSites(daySites, 'alexandria', language);
            const activities = this.generateActivitiesForSites(daySites, 'alexandria', language);
            
            days.push({
                day: i + 1,
                title: dayTitle,
                activities: activities
            });
        }

        return days;
    }

    // 🚢 إنشاء أيام الكروز مع القواعد
    private createCruiseDaysWithRules(nights: number, direction: string, startCity: string, language: Language): ItineraryItem[] {
        const days: ItineraryItem[] = [];
        
        if (direction === 'luxor-to-aswan') {
            // الأقصر إلى أسوان
            days.push(this.createCruiseDay('luxor', 'karnakTemple', 'luxorTemple', language));
            days.push(this.createCruiseDay('edfu', 'edfuTemple', language));
            days.push(this.createCruiseDay('komOmbo', 'komOmboTemple', language));
            days.push(this.createCruiseDay('aswan', 'philaeTemple', 'highDam', language));
        } else {
            // أسوان إلى الأقصر
            days.push(this.createCruiseDay('aswan', 'philaeTemple', 'highDam', language));
            days.push(this.createCruiseDay('komOmbo', 'komOmboTemple', language));
            days.push(this.createCruiseDay('edfu', 'edfuTemple', language));
            days.push(this.createCruiseDay('luxor', 'valleyOfTheKings', 'hatshepsutTemple', language));
        }

        return days.slice(0, nights);
    }

    // 🚢 إنشاء يوم كروز واحد
    private createCruiseDay(city: string, ...sites: string[]): ItineraryItem {
        return {
            day: 1,
            title: {
                es: `Crucero - ${this.getCityName(city, 'es')}`,
                en: `Cruise - ${this.getCityName(city, 'en')}`,
                ar: `كروز - ${this.getCityName(city, 'ar')}`
            },
            activities: {
                es: this.generateCruiseActivities(city, sites, 'es'),
                en: this.generateCruiseActivities(city, sites, 'en'),
                ar: this.generateCruiseActivities(city, sites, 'ar')
            }
        };
    }

    // 📅 تجميع المواقع حسب الأيام
    private groupSitesByDay(sites: string[], city: string): string[][] {
        const maxSitesPerDay = this.getMaxSitesPerDay(city);
        const groups: string[][] = [];
        
        for (let i = 0; i < sites.length; i += maxSitesPerDay) {
            groups.push(sites.slice(i, i + maxSitesPerDay));
        }
        
        return groups;
    }

    // 📊 الحصول على الحد الأقصى للمواقع في اليوم الواحد
    private getMaxSitesPerDay(city: string): number {
        const limits = {
            'cairo': 3,
            'luxor': 4,
            'aswan': 3,
            'alexandria': 4
        };
        
        return limits[city as keyof typeof limits] || 3;
    }

    // 🏷️ الحصول على عنوان اليوم للمواقع
    private getDayTitleForSites(sites: string[], city: string, language: Language): LocalizedString {
        const siteNames = sites.map(site => this.getSiteName(site, language)).join(' & ');
        const cityName = this.getCityName(city, language);
        
        return {
            es: `${cityName} - ${siteNames}`,
            en: `${cityName} - ${siteNames}`,
            ar: `${cityName} - ${siteNames}`
        };
    }

    // 🎯 إنشاء الأنشطة للمواقع المحددة
    private generateActivitiesForSites(sites: string[], city: string, language: Language): { es: string[]; en: string[]; ar: string[] } {
        const activities = {
            es: [] as string[],
            en: [] as string[],
            ar: [] as string[]
        };

        // إضافة أنشطة أساسية
        activities[language].push(this.getBasicActivity('breakfast', language));
        
        // إضافة أنشطة لكل موقع
        for (const site of sites) {
            const siteActivities = this.getSiteActivities(site, language);
            activities[language].push(...siteActivities);
        }
        
        // إضافة أنشطة ختامية
        activities[language].push(this.getBasicActivity('lunch', language));
        activities[language].push(this.getBasicActivity('free_time', language));
        activities[language].push(this.getBasicActivity('dinner', language));

        // نسخ الأنشطة للغات الأخرى
        activities.es = [...activities[language]];
        activities.en = [...activities[language]];
        activities.ar = [...activities[language]];

        return activities;
    }

    // 🚢 إنشاء أنشطة الكروز
    private generateCruiseActivities(city: string, sites: string[], language: Language): string[] {
        const activities = [];
        
        activities.push(this.getBasicActivity('cruise_breakfast', language));
        
        for (const site of sites) {
            const siteActivities = this.getSiteActivities(site, language);
            activities.push(...siteActivities);
        }
        
        activities.push(this.getBasicActivity('cruise_lunch', language));
        activities.push(this.getBasicActivity('cruise_sailing', language));
        activities.push(this.getBasicActivity('cruise_dinner', language));
        
        return activities;
    }

    // 🏷️ الحصول على اسم الموقع
    private getSiteName(site: string, language: Language): string {
        const siteNames = {
            'gizaPyramidsAndSphinx': {
                es: 'Pirámides de Giza y Esfinge',
                en: 'Giza Pyramids and Sphinx',
                ar: 'أهرامات الجيزة وأبو الهول'
            },
            'egyptianMuseum': {
                es: 'Museo Egipcio',
                en: 'Egyptian Museum',
                ar: 'المتحف المصري'
            },
            'karnakTemple': {
                es: 'Templo de Karnak',
                en: 'Karnak Temple',
                ar: 'معبد الكرنك'
            },
            'luxorTemple': {
                es: 'Templo de Luxor',
                en: 'Luxor Temple',
                ar: 'معبد الأقصر'
            },
            'valleyOfTheKings': {
                es: 'Valle de los Reyes',
                en: 'Valley of the Kings',
                ar: 'وادي الملوك'
            },
            'hatshepsutTemple': {
                es: 'Templo de Hatshepsut',
                en: 'Hatshepsut Temple',
                ar: 'معبد حتشبسوت'
            },
            'philaeTemple': {
                es: 'Templo de Philae',
                en: 'Philae Temple',
                ar: 'معبد فيلة'
            },
            'edfuTemple': {
                es: 'Templo de Edfu',
                en: 'Edfu Temple',
                ar: 'معبد إدفو'
            },
            'komOmboTemple': {
                es: 'Templo de Kom Ombo',
                en: 'Kom Ombo Temple',
                ar: 'معبد كوم أمبو'
            }
        };

        return siteNames[site as keyof typeof siteNames]?.[language] || site;
    }

    // 🏙️ الحصول على اسم المدينة
    private getCityName(city: string, language: Language): string {
        const cityNames = {
            'cairo': {
                es: 'El Cairo',
                en: 'Cairo',
                ar: 'القاهرة'
            },
            'luxor': {
                es: 'Luxor',
                en: 'Luxor',
                ar: 'الأقصر'
            },
            'aswan': {
                es: 'Asuán',
                en: 'Aswan',
                ar: 'أسوان'
            },
            'alexandria': {
                es: 'Alejandría',
                en: 'Alexandria',
                ar: 'الإسكندرية'
            }
        };

        return cityNames[city as keyof typeof cityNames]?.[language] || city;
    }

    // 🎯 الحصول على أنشطة الموقع
    private getSiteActivities(site: string, language: Language): string[] {
        const siteActivities = {
            'gizaPyramidsAndSphinx': {
                es: [
                    'Visita a la Meseta de Giza',
                    'Exploración de las Grandes Pirámides',
                    'Foto con la Gran Esfinge'
                ],
                en: [
                    'Visit to Giza Plateau',
                    'Exploration of the Great Pyramids',
                    'Photo with the Great Sphinx'
                ],
                ar: [
                    'زيارة هضبة الجيزة',
                    'استكشاف الأهرامات العظيمة',
                    'التقاط الصور مع أبو الهول'
                ]
            },
            'egyptianMuseum': {
                es: [
                    'Visita al Museo Egipcio',
                    'Exploración de las salas de antigüedades',
                    'Admiración del tesoro de Tutankamón'
                ],
                en: [
                    'Visit to Egyptian Museum',
                    'Exploration of antiquities halls',
                    'Admiration of Tutankhamun\'s treasure'
                ],
                ar: [
                    'زيارة المتحف المصري',
                    'استكشاف قاعات الآثار',
                    'الإعجاب بكنوز توت عنخ آمون'
                ]
            },
            'karnakTemple': {
                es: [
                    'Visita al Templo de Karnak',
                    'Exploración del Gran Patio',
                    'Admiración de la Sala Hipóstila'
                ],
                en: [
                    'Visit to Karnak Temple',
                    'Exploration of the Great Court',
                    'Admiration of the Hypostyle Hall'
                ],
                ar: [
                    'زيارة معبد الكرنك',
                    'استكشاف الفناء الكبير',
                    'الإعجاب بقاعة الأعمدة'
                ]
            }
        };

        return siteActivities[site as keyof typeof siteActivities]?.[language] || [
            `Visita a ${this.getSiteName(site, language)}`
        ];
    }

    // 🍽️ الحصول على الأنشطة الأساسية
    private getBasicActivity(type: string, language: Language): string {
        const activities = {
            'breakfast': {
                es: 'Desayuno en el hotel',
                en: 'Breakfast at hotel',
                ar: 'الإفطار في الفندق'
            },
            'lunch': {
                es: 'Almuerzo en restaurante local',
                en: 'Lunch at local restaurant',
                ar: 'الغداء في مطعم محلي'
            },
            'dinner': {
                es: 'Cena y alojamiento',
                en: 'Dinner and accommodation',
                ar: 'العشاء والإقامة'
            },
            'free_time': {
                es: 'Tiempo libre',
                en: 'Free time',
                ar: 'وقت حر'
            },
            'cruise_breakfast': {
                es: 'Desayuno a bordo',
                en: 'Breakfast on board',
                ar: 'الإفطار على متن السفينة'
            },
            'cruise_lunch': {
                es: 'Almuerzo a bordo',
                en: 'Lunch on board',
                ar: 'الغداء على متن السفينة'
            },
            'cruise_dinner': {
                es: 'Cena a bordo',
                en: 'Dinner on board',
                ar: 'العشاء على متن السفينة'
            },
            'cruise_sailing': {
                es: 'Navegación por el Nilo',
                en: 'Nile sailing',
                ar: 'الإبحار في النيل'
            }
        };

        return activities[type as keyof typeof activities]?.[language] || type;
    }

    // 📊 حساب توزيع الليالي المرن
    private calculateFlexibleNightsDistribution(analyzedRequest: any): any {
        const distribution: any = {
            cairo: 0,
            luxor: 0,
            aswan: 0,
            alexandria: 0,
            cruise: 0
        };

        // حساب الليالي لكل مدينة
        for (const city of analyzedRequest.cities) {
            const cityDays = this.getCityDaysFromSites(analyzedRequest.sites[city] || []);
            distribution[city] = cityDays;
        }

        // إضافة ليالي الكروز
        if (analyzedRequest.hasCruise) {
            distribution.cruise = analyzedRequest.cruiseNights;
        }

        return distribution;
    }

    // 📊 حساب عدد أيام المدينة من المواقع
    private getCityDaysFromSites(sites: string[]): number {
        if (sites.length === 0) return 1;
        
        const maxSitesPerDay = 3; // متوسط المواقع في اليوم
        return Math.ceil(sites.length / maxSitesPerDay);
    }

    // 🏷️ إنشاء اسم البرنامج المرن
    private createFlexibleProgramName(analyzedRequest: any, language: Language): LocalizedString {
        const cityNames = analyzedRequest.cities.map((city: string) => 
            this.getCityName(city, language)
        ).join(' & ');

        const duration = analyzedRequest.cities.length + (analyzedRequest.hasCruise ? analyzedRequest.cruiseNights : 0) + 2;

        return {
            es: `Viaje Personalizado de ${duration} Días - ${cityNames}`,
            en: `Custom ${duration}-Day Journey - ${cityNames}`,
            ar: `رحلة مخصصة لمدة ${duration} أيام - ${cityNames}`
        };
    }

    // 📝 إنشاء الوصف المختصر المرن
    private createFlexibleBriefDescription(analyzedRequest: any, language: Language): LocalizedString {
        const cityNames = analyzedRequest.cities.map((city: string) => 
            this.getCityName(city, language)
        ).join(' & ');

        return {
            es: `Un viaje personalizado explorando ${cityNames} según tus preferencias`,
            en: `A custom journey exploring ${cityNames} according to your preferences`,
            ar: `رحلة مخصصة لاستكشاف ${cityNames} حسب تفضيلاتك`
        };
    }

    // 📝 إنشاء الوصف العام المرن
    private createFlexibleGeneralDescription(analyzedRequest: any, language: Language): LocalizedString {
        const cityNames = analyzedRequest.cities.map((city: string) => 
            this.getCityName(city, language)
        ).join(' & ');

        return {
            es: `Este itinerario ha sido diseñado especialmente para ti, visitando ${cityNames} con los sitios que más te interesan. Cada detalle ha sido personalizado para crear una experiencia única.`,
            en: `This itinerary has been specially designed for you, visiting ${cityNames} with the sites that interest you most. Every detail has been personalized to create a unique experience.`,
            ar: `هذا المسار مصمم خصيصًا لك، لزيارة ${cityNames} مع المواقع التي تهمك أكثر. تم تخصيص كل تفصيل لخلق تجربة فريدة.`
        };
    }

    // 🗺️ استخراج المواقع من البرنامج المرن
    private extractSitesFromFlexibleItinerary(itinerary: ItineraryItem[], language: Language): SupportedSite[] {
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
        if (activitiesText.includes('philae') || activitiesText.includes('فيلة')) {
            sites.push('philaeTemple');
        }
        if (activitiesText.includes('edfu') || activitiesText.includes('إدفو')) {
            sites.push('edfuTemple');
        }
        if (activitiesText.includes('kom ombo') || activitiesText.includes('كوم أمبو')) {
            sites.push('komOmboTemple');
        }

        return [...new Set(sites)];
    }

    // 📅 إنشاء يوم الوصول
    private createArrivalDay(language: Language): ItineraryItem {
        return {
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
                    'Traslado privado al hotel',
                    'Check-in en el hotel y tiempo libre',
                    'Cena de bienvenida (opcional)'
                ],
                en: [
                    'Arrival at Cairo International Airport',
                    'Airport assistance by our representative',
                    'Private transfer to hotel',
                    'Hotel check-in and free time',
                    'Welcome dinner (optional)'
                ],
                ar: [
                    'الوصول إلى مطار القاهرة الدولي',
                    'المساعدة في المطار من قبل ممثلنا',
                    'انتقال خاص إلى الفندق',
                    'تسجيل الوصول في الفندق والوقت الحر',
                    'عشاء ترحيبي (اختياري)'
                ]
            }
        };
    }

    // 📅 إنشاء يوم المغادرة
    private createDepartureDay(day: number, language: Language): ItineraryItem {
        return {
            day: day,
            title: {
                es: 'Salida de El Cairo - Hasta Pronto',
                en: 'Departure from Cairo - See You Soon',
                ar: 'المغادرة من القاهرة - إلى اللقاء'
            },
            activities: {
                es: [
                    'Desayuno en el hotel',
                    'Tiempo libre para últimas compras',
                    'Check-out del hotel',
                    'Traslado al aeropuerto',
                    'Despedida y fin de nuestros servicios'
                ],
                en: [
                    'Breakfast at the hotel',
                    'Free time for last-minute shopping',
                    'Hotel check-out',
                    'Transfer to airport',
                    'Farewell and end of our services'
                ],
                ar: [
                    'الإفطار في الفندق',
                    'وقت حر للتسوق الأخير',
                    'تسجيل الخروج من الفندق',
                    'الانتقال إلى المطار',
                    'الوداع ونهاية خدماتنا'
                ]
            }
        };
    }
}createSe// 🚀 تصدير الدالة الرئيسية
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

// 📚 مثال شامل على الاستخدام
/*
// إنشاء رحلة مخصصة مرنة
const customRequest = createFlexibleRequest(
    4, // عدد المسافرين
    7, // مدة الرحلة
    [
        // يومين في القاهرة مع مواقع محددة
        createDayPlan('2', 'cairo', ['gizaPyramidsAndSphinx', 'egyptianMuseum', 'khanElKhalili']),
        
        // 3 أيام كروز من الأقصر إلى أسوان
        createDayPlan('3', undefined, undefined, 'cruise', 3, 'luxor', 'luxor-to-aswan', 'saturday'),
        
        // يوم في أسوان مع مواقع محددة
        createDayPlan('1', 'aswan', ['philaeTemple', 'highDam'])
    ],
    'winter', // الموسم
    'diamond', // الفئة
    'en' // اللغة
);

// إنشاء البرنامج
const program = createFlexibleCustomProgram(customRequest);

// أو استخدام الأمثلة الجاهزة
const cairoProgram = createFlexibleCustomProgram(FlexibleExamples.cairoOnly(2, 'ar'));
const cruiseProgram = createFlexibleCustomProgram(FlexibleExamples.cruise4Nights(4, 'es'));
*/

// 🚀 تصدير الدالة المرنة الجديدة
export function createFlexibleCustomProgram(request: FlexibleCustomRequest): Program {
    const extractor = new IntelligentDataExtractor();
    return extractor.createFlexibleCustomProgram(request);
}

// 🚀 دالة مساعدة لإنشاء طلب مرن بسهولة
export function createFlexibleRequest(
    travelers: number,
    duration: number,
    dayByDay: DayPlan[],
    season: 'summer' | 'winter',
    category: 'gold' | 'diamond',
    language: Language
): FlexibleCustomRequest {
    return {
        travelers,
        duration,
        dayByDay,
        season,
        category,
        language
    };
}

// 🚀 دالة مساعدة لإنشاء خطة يومية بسهولة
export function createDayPlan(
    days: string,
    city?: string,
    sites?: string[],
    type?: 'cruise' | 'city',
    nights?: number,
    startCity?: 'luxor' | 'aswan',
    direction?: 'luxor-to-aswan' | 'aswan-to-luxor',
    departureDay?: 'saturday' | 'monday' | 'wednesday' | 'friday'
): DayPlan {
    return {
        days,
        city,
        sites,
        type,
        nights,
        startCity,
        direction,
        departureDay
    };
}

// 🚀 أمثلة على الاستخدام
export const FlexibleExamples = {
    // مثال 1: رحلة القاهرة مع مواقع محددة
    cairoOnly: (travelers: number, language: Language = 'en'): FlexibleCustomRequest => {
        return createFlexibleRequest(
            travelers,
            4,
            [
                createDayPlan('2', 'cairo', ['gizaPyramidsAndSphinx', 'egyptianMuseum']),
                createDayPlan('1', 'cairo', ['khanElKhalili', 'citadelOfSaladin'])
            ],
            'winter',
            'gold',
            language
        );
    },

    // مثال 2: رحلة الأقصر مع مواقع محددة
    luxorOnly: (travelers: number, language: Language = 'en'): FlexibleCustomRequest => {
        return createFlexibleRequest(
            travelers,
            3,
            [
                createDayPlan('2', 'luxor', ['karnakTemple', 'luxorTemple', 'valleyOfTheKings', 'hatshepsutTemple'])
            ],
            'winter',
            'gold',
            language
        );
    },

    // مثال 3: رحلة كروز 4 ليالي من الأقصر إلى أسوان
    cruise4Nights: (travelers: number, language: Language = 'en'): FlexibleCustomRequest => {
        return createFlexibleRequest(
            travelers,
            6,
            [
                createDayPlan('1', 'cairo', ['gizaPyramidsAndSphinx']),
                createDayPlan('4', undefined, undefined, 'cruise', 4, 'luxor', 'luxor-to-aswan', 'saturday')
            ],
            'winter',
            'diamond',
            language
        );
    },

    // مثال 4: رحلة كروز 3 ليالي من أسوان إلى الأقصر
    cruise3Nights: (travelers: number, language: Language = 'en'): FlexibleCustomRequest => {
        return createFlexibleRequest(
            travelers,
            5,
            [
                createDayPlan('1', 'cairo', ['egyptianMuseum']),
                createDayPlan('3', undefined, undefined, 'cruise', 3, 'aswan', 'aswan-to-luxor', 'wednesday')
            ],
            'winter',
            'gold',
            language
        );
    },

    // مثال 5: رحلة مرنة مع عدة مدن
    multiCity: (travelers: number, language: Language = 'en'): FlexibleCustomRequest => {
        return createFlexibleRequest(
            travelers,
            8,
            [
                createDayPlan('2', 'cairo', ['gizaPyramidsAndSphinx', 'egyptianMuseum']),
                createDayPlan('1', 'alexandria', ['qaitbayCitadel', 'alexandriaNationalMuseum']),
                createDayPlan('3', undefined, undefined, 'cruise', 3, 'luxor', 'luxor-to-aswan', 'saturday'),
                createDayPlan('1', 'aswan', ['philaeTemple', 'highDam'])
            ],
            'winter',
            'diamond',
            language
        );
    }
};s] of Object.entries(nightsDistribution)) {
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