import type { Program, ItineraryItem, CustomQuoteParams, SupportedSite, SupportedCity, LocalizedString } from './types';
import { knowledgeBase } from './knowledgeBase';
import type { Language } from './contexts/LanguageContext';

// 🧠 نظام ذكي لاستخراج البيانات من البرامج الـ10 الموجودة
export class IntelligentDataExtractor {
    private programs: Program[];

    constructor() {
        this.programs = knowledgeBase.packages;
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
            const activities = day.activities[language] || day.activities.en || [];
            
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
                if (this.containsKeywords(activityLower, ['philae', 'fila', 'فيلة'])) {
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
                    sites.push('citadel');
                }
                if (this.containsKeywords(activityLower, ['alexandria', 'alejandría', 'الإسكندرية'])) {
                    sites.push('alexandriaLibrary');
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
            const activities = day.activities[language] || day.activities.en || [];
            const title = day.title[language] || day.title.en || '';
            
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
            const key = `${item.day}-${item.title.en}`;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
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

        // استخراج البيانات لكل وجهة
        const extractedData: { [city: string]: any } = {};
        const allSites: SupportedSite[] = [];
        const allItinerary: ItineraryItem[] = [];

        for (const destination of destinations) {
            const cityData = this.extractCityData(destination, language);
            extractedData[destination] = cityData;
            allSites.push(...cityData.sites);
            allItinerary.push(...cityData.itinerary);
        }

        // إنشاء الـ itinerary المخصص
        const customItinerary = this.createCustomItinerary(
            allItinerary, 
            duration, 
            destinations, 
            nightsDistribution,
            language
        );

        // إنشاء أماكن الإقامة
        const accommodations = this.createCustomAccommodations(
            extractedData, 
            nightsDistribution, 
            category
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
                    sites: [...new Set(allSites)],
                    flightSectors: nightsDistribution.cruise > 0 ? 2 : 0,
                }
            }
        };

        return program;
    }

    // 📊 حساب توزيع الليالي
    private calculateNightsDistribution(duration: number, destinations: string[]): {
        cairo: number;
        luxor: number;
        aswan: number;
        alexandria: number;
        cruise: number;
    } {
        const totalNights = duration - 1;
        const hasCruise = destinations.includes('cruise') || destinations.includes('nile');
        const hasLuxor = destinations.includes('luxor');
        const hasAswan = destinations.includes('aswan');
        const hasAlexandria = destinations.includes('alexandria');

        let distribution = {
            cairo: 0,
            luxor: 0,
            aswan: 0,
            alexandria: 0,
            cruise: 0
        };

        if (hasCruise) {
            if (duration >= 8) {
                distribution.cruise = 4;
                distribution.cairo = totalNights - 4;
            } else if (duration >= 5) {
                distribution.cruise = 3;
                distribution.cairo = totalNights - 3;
            } else {
                distribution.cruise = Math.max(1, totalNights - 2);
                distribution.cairo = totalNights - distribution.cruise;
            }
        } else {
            distribution.cairo = totalNights;
        }

        return distribution;
    }

    // 🏨 إنشاء أماكن الإقامة المخصصة
    private createCustomAccommodations(
        extractedData: { [city: string]: any },
        nightsDistribution: any,
        category: 'gold' | 'diamond'
    ): { gold: any[]; diamond: any[] } {
        const accommodations = { gold: [] as any[], diamond: [] as any[] };

        for (const [city, data] of Object.entries(extractedData)) {
            const nights = nightsDistribution[city] || 0;
            if (nights > 0 && data.accommodations) {
                const cityName = this.getCityLocalizedName(city);
                const hotelName = data.accommodations[category] || data.accommodations.gold || '';

                if (hotelName) {
                    accommodations[category].push({
                        city: cityName,
                        hotel: {
                            es: hotelName,
                            en: hotelName,
                            ar: hotelName
                        }
                    });
                }
            }
        }

        return accommodations;
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

    // 📝 إنشاء الـ itinerary المخصص
    private createCustomItinerary(
        allItinerary: ItineraryItem[],
        duration: number,
        destinations: string[],
        nightsDistribution: any,
        language: Language
    ): ItineraryItem[] {
        const customItinerary: ItineraryItem[] = [];
        let currentDay = 1;

        // يوم الوصول
        customItinerary.push({
            day: currentDay++,
            title: {
                es: 'Llegada a El Cairo',
                en: 'Arrival in Cairo',
                ar: 'الوصول إلى القاهرة'
            },
            activities: {
                es: ['Asistencia en el aeropuerto y traslado al hotel'],
                en: ['Airport assistance and transfer to hotel'],
                ar: ['المساعدة في المطار والانتقال إلى الفندق']
            }
        });

        // الأيام الوسطى
        for (let i = 0; i < duration - 2; i++) {
            const dayItinerary = this.selectBestDayItinerary(allItinerary, destinations, i, language);
            if (dayItinerary) {
                customItinerary.push({
                    ...dayItinerary,
                    day: currentDay++
                });
            }
        }

        // يوم المغادرة
        customItinerary.push({
            day: currentDay++,
            title: {
                es: 'Salida de El Cairo',
                en: 'Departure from Cairo',
                ar: 'المغادرة من القاهرة'
            },
            activities: {
                es: ['Traslado al aeropuerto para el vuelo de regreso'],
                en: ['Transfer to airport for return flight'],
                ar: ['الانتقال إلى المطار لرحلة العودة']
            }
        });

        return customItinerary;
    }

    // 🎯 اختيار أفضل يوم من الـ itinerary
    private selectBestDayItinerary(
        allItinerary: ItineraryItem[],
        destinations: string[],
        dayIndex: number,
        language: Language
    ): ItineraryItem | null {
        // ترتيب الـ itinerary حسب الأهمية
        const sortedItinerary = allItinerary.sort((a, b) => {
            const aImportance = this.calculateDayImportance(a, language);
            const bImportance = this.calculateDayImportance(b, language);
            return bImportance - aImportance;
        });

        return sortedItinerary[dayIndex] || null;
    }

    // ⭐ حساب أهمية اليوم
    private calculateDayImportance(day: ItineraryItem, language: Language): number {
        let importance = 0;
        const activities = day.activities[language] || day.activities.en || [];
        const activityText = activities.join(' ').toLowerCase();

        // إعطاء نقاط للمواقع المهمة
        if (this.containsKeywords(activityText, ['pyramid', 'pirámide', 'هرم'])) importance += 10;
        if (this.containsKeywords(activityText, ['sphinx', 'esfinge', 'أبو الهول'])) importance += 10;
        if (this.containsKeywords(activityText, ['museum', 'museo', 'متحف'])) importance += 8;
        if (this.containsKeywords(activityText, ['valley of the kings', 'valle de los reyes', 'وادي الملوك'])) importance += 9;
        if (this.containsKeywords(activityText, ['karnak', 'الكرنك'])) importance += 8;
        if (this.containsKeywords(activityText, ['abu simbel', 'أبو سمبل'])) importance += 9;

        return importance;
    }

    // 📝 إنشاء اسم البرنامج المخصص
    private createCustomProgramName(duration: number, destinations: string[], language: Language): LocalizedString {
        const cityNames = destinations.map(city => this.getCityLocalizedName(city));
        const cityList = cityNames.map(city => city[language]).join(' & ');

        return {
            es: `Viaje Personalizado de ${duration} Días - ${cityList}`,
            en: `Custom ${duration}-Day Journey - ${cityList}`,
            ar: `رحلة مخصصة لمدة ${duration} أيام - ${cityList}`
        };
    }

    // 📝 إنشاء الوصف المختصر
    private createBriefDescription(duration: number, destinations: string[], language: Language): LocalizedString {
        const cityNames = destinations.map(city => this.getCityLocalizedName(city));
        const cityList = cityNames.map(city => city[language]).join(' & ');

        return {
            es: `Un viaje personalizado de ${duration} días explorando ${cityList}`,
            en: `A custom ${duration}-day journey exploring ${cityList}`,
            ar: `رحلة مخصصة لمدة ${duration} أيام لاستكشاف ${cityList}`
        };
    }

    // 📝 إنشاء الوصف العام
    private createGeneralDescription(duration: number, destinations: string[], language: Language): LocalizedString {
        const cityNames = destinations.map(city => this.getCityLocalizedName(city));
        const cityList = cityNames.map(city => city[language]).join(' & ');

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
    ): LocalizedString {
        const services = [...knowledgeBase.defaults.servicesIncluded[language]];

        // إضافة خدمات الإقامة
        for (const [city, nights] of Object.entries(nightsDistribution)) {
            if (nights > 0) {
                const cityName = this.getCityLocalizedName(city)[language];
                services.push(`${nights} noches en ${cityName}`);
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
            if (nights > 0) {
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