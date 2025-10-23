import type { Program, ItineraryItem, CustomQuoteParams, SupportedSite, SupportedCity, LocalizedString } from './types';
import { knowledgeBase } from './knowledgeBase';
import type { Language } from './contexts/LanguageContext';

// 🗺️ خريطة المواقع المتاحة
const AVAILABLE_SITES = {
    cairo: [
        'citadelOfSaladin',
        'sultanHassanMosque',
        'elSeheimyHouse',
        'mohamedAliPalace',
        'marysTree',
        'senusretIObelisk',
        'egyptianMuseum',
        'egyptianMuseumAudioGuide',
        'islamicArtMuseum',
        'copticMuseum',
        'royalCarriagesMuseum',
        'gayerAndersonMuseum',
        'baronEmpainPalace',
        'alMuizzStreet',
        'manialPalace',
        'nilometer',
        'gizaPyramidsAndSphinx',
        'pyramidOfKeopsInterior',
        'pyramidOfKhafrenInterior',
        'pyramidOfMicerinoInterior',
        'tombOfMeresankh',
        'saqqaraComplexAndImhotepMuseum',
        'nobleTombsOfTheNewKingdom',
        'southTombSaqqara',
        'saqqaraCombinedTicket',
        'citadelAndAlabasterMosque',
        'khanElKhalili',
        'saqqara',
        'stepPyramidOfZoser',
        'serapeum',
        'tombOfMereruka',
        'dashurArchaeologicalZone',
        'memphisMitRahina',
        'egyptianCivilizationMuseum',
        'grandEgyptianMuseum'
    ],
    luxor: [
        'karnakTemple',
        'mutTemple',
        'luxorTemple',
        'valleyOfTheKings',
        'tombOfSetiI',
        'tombOfAy',
        'hatshepsutTemple',
        'deirElMedina',
        'tombOfPashed',
        'tombOfRamose',
        'ramesseumTemple',
        'abdelQurnaHill',
        'carterHouse',
        'tombOfMennaAndNakht',
        'tombsOfUserhatAndKhaemwaset',
        'alAsasif',
        'esnaTemple',
        'tombOfRamsesVI',
        'valleyOfTheQueens',
        'tombOfNefertari',
        'elKhokhaNecropolis',
        'tombsOfRoyAndShuroy',
        'qurnaMerai',
        'sheikhAbdelQurna',
        'mummificationMuseum',
        'luxorMuseum'
    ],
    aswan: [
        'philaeTemple',
        'edfuTemple',
        'komOmboTemple',
        'qubbetElHawa',
        'unfinishedObelisk',
        'kalabshaTemple',
        'elKab',
        'nubianMuseum',
        'highDam'
    ],
    alexandria: [
        'qaitbayCitadel',
        'komElShoqafaCatacombs',
        'komElDikkaRomanTheater',
        'pompeysPillar',
        'alexandriaNationalMuseum',
        'royalJewelryMuseum',
        'graecoRomanMuseum',
        'rosettaRuins'
    ],
    abuSimbel: [
        'abuSimbelTemples',
        'sunFestivalAbuSimbel'
    ],
    // Other cities with their respective sites
    hurghada: [],
    sharmElSheikh: [],
    dahab: [],
    marsaAlam: [],
    siwa: [],
    bahariya: [],
    farafra: [],
    dakhla: [],
    kharga: []
};

// 🧠 نظام ذكي محسن لاستخراج البيانات من البرامج الـ10 الموجودة
export class IntelligentDataExtractor {
    private programs: Program[];

    constructor() {
        this.programs = knowledgeBase.packages;
    }

    // 🎯 إنشاء برنامج مخصص محسن مع دعم ترتيب المدن والكروز
    createEnhancedCustomProgram(request: {
        duration: number;
        travelers: number;
        cities: string[];
        specificSites?: { [city: string]: SupportedSite[] };
        season: 'summer' | 'winter';
        category: 'gold' | 'diamond';
        language: Language;
    }): Program {
        const { duration, travelers, cities, specificSites = {}, season, category, language } = request;
        
        console.log('[Enhanced] Creating custom program for:', { duration, cities, specificSites });
        
        // حساب توزيع الأيام
        const daysDistribution = this.calculateDaysDistribution(duration, cities);
        
        // إنشاء البرنامج اليومي
        const itinerary = this.createEnhancedItinerary(daysDistribution, specificSites, language, duration);
        
        // إنشاء أماكن الإقامة
        const accommodations = this.createEnhancedAccommodations(daysDistribution, category, language);
        
        // إنشاء البرنامج النهائي
        const program: Program = {
            id: `enhanced-custom-${Date.now()}`,
            isCustom: true,
            name: this.createEnhancedProgramName(duration, cities, language),
            icon: "🗺️",
            duration: { days: duration, nights: duration - 1 },
            priceFrom: 0,
            categories: [category],
            startCity: { es: "El Cairo", en: "Cairo", ar: "القاهرة" },
            briefDescription: this.createEnhancedBriefDescription(duration, cities, language),
            generalDescription: this.createEnhancedGeneralDescription(duration, cities, language),
            itinerary: itinerary,
            itineraryOptions: [{
                name: { es: "Itinerario Principal", en: "Main Itinerary", ar: "البرنامج الرئيسي" },
                itinerary: itinerary
            }],
            accommodations: accommodations,
            servicesIncluded: this.createEnhancedServicesIncluded(daysDistribution, category, language),
            servicesExcluded: knowledgeBase.defaults.servicesExcluded,
            importantNotes: knowledgeBase.defaults.importantNotes,
            quoteParams: {
                travelers,
                duration,
                season,
                category,
                itineraryPlan: {
                    nights: this.convertDaysToNights(daysDistribution),
                    sites: this.extractAllSitesFromItinerary(itinerary, language),
                    flightSectors: this.calculateFlightSectors(daysDistribution)
                }
            }
        };

        return program;
    }

    // 📊 حساب توزيع الأيام بشكل ذكي مع دعم ترتيب المدن
    private calculateDaysDistribution(duration: number, cities: string[]): { [city: string]: number } {
        const availableDays = duration - 2; // استبعاد يوم الوصول والمغادرة
        const distribution: { [city: string]: number } = {};
        
        // تحديد نوع الكروز المطلوب
        const hasLuxor = cities.includes('luxor');
        const hasAswan = cities.includes('aswan');
        const hasCruise = hasLuxor && hasAswan;
        
        // حساب أيام الكروز
        let cruiseDays = 0;
        if (hasCruise) {
            // 4 ليالي من الأقصر (5 أيام)
            cruiseDays = 5;
        }
        
        // حساب الأيام المتاحة للمدن الأخرى
        const remainingDays = availableDays - cruiseDays;
        
        // توزيع الأيام حسب ترتيب المدن في الطلب
        let daysLeft = remainingDays;
        
        for (const city of cities) {
            if (city === 'luxor' || city === 'aswan') continue; // سيتم التعامل معها في الكروز
            
            if (daysLeft > 0) {
                // القاهرة تحصل على 3-4 أيام، باقي المدن على 2-3 أيام
                const cityDays = city === 'cairo' 
                    ? Math.min(4, Math.max(3, Math.ceil(daysLeft * 0.4)))
                    : Math.min(3, Math.max(2, Math.ceil(daysLeft * 0.3)));
                
                distribution[city] = cityDays;
                daysLeft -= cityDays;
            }
        }
        
        // إضافة أيام الكروز
        if (hasCruise) {
            distribution.cruise = cruiseDays;
        }
        
        // أي أيام متبقية تذهب للقاهرة
        if (daysLeft > 0) {
            distribution.cairo = (distribution.cairo || 0) + daysLeft;
        }
        
        console.log('[Enhanced] Days distribution:', distribution);
        return distribution;
    }

    // 🗺️ إنشاء برنامج يومي محسن مع دعم ترتيب المدن والكروز
    private createEnhancedItinerary(
        daysDistribution: { [city: string]: number },
        specificSites: { [city: string]: SupportedSite[] },
        language: Language,
        totalDuration: number
    ): ItineraryItem[] {
        const itinerary: ItineraryItem[] = [];
        let currentDay = 1;
        
        // يوم الوصول
        itinerary.push(this.createArrivalDay(language));
        currentDay++;
        
        // ترتيب المدن حسب الطلب: القاهرة → الإسكندرية → الكروز
        const orderedCities = this.getOrderedCities(daysDistribution);
        
        for (const city of orderedCities) {
            const days = daysDistribution[city];
            if (days > 0) {
                if (city === 'cruise') {
                    // إنشاء أيام الكروز
                    const cruiseDays = this.createCruiseDays(specificSites, language, currentDay);
                    itinerary.push(...cruiseDays);
                    currentDay += days;
                } else {
                    // إنشاء أيام المدن العادية
                    const cityDays = this.createCityDays(city, days, specificSites[city] || [], language, currentDay);
                    itinerary.push(...cityDays);
                    currentDay += days;
                }
            }
        }
        
        // يوم المغادرة
        itinerary.push(this.createDepartureDay(totalDuration, language));
        
        return itinerary;
    }

    // 🗺️ ترتيب المدن حسب الطلب المطلوب
    private getOrderedCities(daysDistribution: { [city: string]: number }): string[] {
        const cities = Object.keys(daysDistribution).filter(city => daysDistribution[city] > 0);
        
        // ترتيب مخصص: القاهرة → الإسكندرية → الكروز
        const orderedCities: string[] = [];
        
        // إضافة القاهرة أولاً
        if (cities.includes('cairo')) {
            orderedCities.push('cairo');
        }
        
        // إضافة الإسكندرية ثانياً
        if (cities.includes('alexandria')) {
            orderedCities.push('alexandria');
        }
        
        // إضافة الكروز أخيراً
        if (cities.includes('cruise')) {
            orderedCities.push('cruise');
        }
        
        // إضافة أي مدن أخرى
        for (const city of cities) {
            if (!orderedCities.includes(city)) {
                orderedCities.push(city);
            }
        }
        
        return orderedCities;
    }

    // ⛵ إنشاء أيام الكروز مع المسار الصحيح
    private createCruiseDays(
        specificSites: { [city: string]: SupportedSite[] },
        language: Language,
        startDay: number
    ): ItineraryItem[] {
        const cruiseDays: ItineraryItem[] = [];
        
        // اليوم 1: الأقصر (معبد الأقصر + الكرنك + وادي الملوك + حتشبسوت + ممنون)
        cruiseDays.push({
            day: startDay,
            title: this.getCruiseDayTitle('luxor', 1, language),
            activities: this.getCruiseDayActivities('luxor', specificSites.luxor || [], language)
        });
        
        // اليوم 2: إدفو
        cruiseDays.push({
            day: startDay + 1,
            title: this.getCruiseDayTitle('edfu', 2, language),
            activities: this.getCruiseDayActivities('edfu', [], language)
        });
        
        // اليوم 3: كوم أمبو
        cruiseDays.push({
            day: startDay + 2,
            title: this.getCruiseDayTitle('komOmbo', 3, language),
            activities: this.getCruiseDayActivities('komOmbo', [], language)
        });
        
        // اليوم 4: أسوان (معبد فيلة)
        cruiseDays.push({
            day: startDay + 3,
            title: this.getCruiseDayTitle('aswan', 4, language),
            activities: this.getCruiseDayActivities('aswan', specificSites.aswan || [], language)
        });
        
        return cruiseDays;
    }

    // ⛵ عنوان يوم الكروز
    private getCruiseDayTitle(city: string, dayNumber: number, language: Language): LocalizedString {
        const cityNames = {
            luxor: { es: "Luxor", en: "Luxor", ar: "الأقصر" },
            edfu: { es: "Edfu", en: "Edfu", ar: "إدفو" },
            komOmbo: { es: "Kom Ombo", en: "Kom Ombo", ar: "كوم أمبو" },
            aswan: { es: "Asuán", en: "Aswan", ar: "أسوان" }
        };
        
        const cityName = cityNames[city as keyof typeof cityNames] || { es: city, en: city, ar: city };
        
        return {
            es: `Crucero por el Nilo - ${cityName.es}`,
            en: `Nile Cruise - ${cityName.en}`,
            ar: `رحلة نيلية - ${cityName.ar}`
        };
    }

    // ⛵ أنشطة يوم الكروز
    private getCruiseDayActivities(city: string, sites: SupportedSite[], language: Language): { es: string[]; en: string[]; ar: string[] } {
        const activities: { es: string[]; en: string[]; ar: string[] } = { es: [], en: [], ar: [] };
        
        if (city === 'luxor') {
            activities[language].push(
                this.getSiteActivity('luxorTemple', language) || 'زيارة معبد الأقصر',
                this.getSiteActivity('karnakTemple', language) || 'زيارة معبد الكرنك',
                this.getSiteActivity('valleyOfTheKings', language) || 'زيارة وادي الملوك',
                this.getSiteActivity('hatshepsutTemple', language) || 'زيارة معبد حتشبسوت',
                this.getSiteActivity('colossiOfMemnon', language) || 'زيارة تمثالي ممنون'
            );
        } else if (city === 'edfu') {
            activities[language].push('زيارة معبد إدفو المخصص للإله حورس');
        } else if (city === 'komOmbo') {
            activities[language].push('زيارة معبد كوم أمبو المخصص للإله سوبك وحورس');
        } else if (city === 'aswan') {
            activities[language].push(
                this.getSiteActivity('philaeTemple', language) || 'زيارة معبد فيلة المخصص للإلهة إيزيس'
            );
        }
        
        return activities;
    }

    // 🏙️ إنشاء أيام مدينة محددة
    private createCityDays(
        city: string, 
        days: number, 
        specificSites: SupportedSite[], 
        language: Language, 
        startDay: number
    ): ItineraryItem[] {
        const cityDays: ItineraryItem[] = [];
        
        // الحصول على البيانات من البرامج الجاهزة
        const cityData = this.extractCityData(city, language);
        
        // إنشاء أيام مخصصة بناءً على المواقع المحددة
        for (let i = 0; i < days; i++) {
            const dayNumber = startDay + i;
            const sitesForDay = this.selectSitesForDay(specificSites, i, days);
            
            const dayTitle = this.createDayTitle(city, i + 1, days, language);
            const dayActivities = this.createDayActivities(city, sitesForDay, language);
            
            cityDays.push({
                day: dayNumber,
                title: dayTitle,
                activities: dayActivities
            });
        }
        
        return cityDays;
    }

    // 🎯 اختيار المواقع لكل يوم
    private selectSitesForDay(specificSites: SupportedSite[], dayIndex: number, totalDays: number): SupportedSite[] {
        if (specificSites.length === 0) return [];
        
        // توزيع المواقع على الأيام
        const sitesPerDay = Math.ceil(specificSites.length / totalDays);
        const startIndex = dayIndex * sitesPerDay;
        const endIndex = Math.min(startIndex + sitesPerDay, specificSites.length);
        
        return specificSites.slice(startIndex, endIndex);
    }

    // 📝 إنشاء عنوان اليوم
    private createDayTitle(city: string, dayInCity: number, totalDaysInCity: number, language: Language): LocalizedString {
        const cityNames = this.getCityLocalizedName(city);
        const cityName = cityNames[language] || cityNames.en;
        
        if (totalDaysInCity === 1) {
            return {
                es: `Explorando ${cityName}`,
                en: `Exploring ${cityName}`,
                ar: `استكشاف ${cityName}`
            };
        } else {
            return {
                es: `${cityName} - Día ${dayInCity}`,
                en: `${cityName} - Day ${dayInCity}`,
                ar: `${cityName} - اليوم ${dayInCity}`
            };
        }
    }

    // 🎯 إنشاء أنشطة اليوم
    private createDayActivities(city: string, sites: SupportedSite[], language: Language): { es: string[]; en: string[]; ar: string[] } {
        const activities: { es: string[]; en: string[]; ar: string[] } = { es: [], en: [], ar: [] };
        
        // إضافة الأنشطة الأساسية
        activities[language].push(this.getCityArrivalActivity(city, language));
        
        // إضافة أنشطة المواقع المحددة
        for (const site of sites) {
            const siteActivity = this.getSiteActivity(site, language);
            if (siteActivity) {
                activities[language].push(siteActivity);
            }
        }
        
        // إضافة الأنشطة النهائية
        activities[language].push(this.getCityDepartureActivity(city, language));
        
        // ملء باقي اللغات
        this.fillOtherLanguages(activities, language);
        
        return activities;
    }

    // 🏨 إنشاء أماكن الإقامة المحسنة مع دعم الكروز
    private createEnhancedAccommodations(
        daysDistribution: { [city: string]: number },
        category: 'gold' | 'diamond',
        language: Language
    ): { gold: any[]; diamond: any[] } {
        const accommodations = { gold: [] as any[], diamond: [] as any[] };
        
        for (const [city, days] of Object.entries(daysDistribution)) {
            if (days > 0) {
                if (city === 'cruise') {
                    // إضافة الكروز
                    const cruiseInfo = this.getCruiseInfo(category, language);
                    accommodations[category].push(cruiseInfo);
                } else {
                    // إضافة الفنادق العادية
                    const cityName = this.getCityLocalizedName(city);
                    const hotel = this.getBestHotelForCity(city, category, language);
                    
                    accommodations[category].push({
                        city: cityName,
                        hotel: hotel,
                        nights: days - 1
                    });
                }
            }
        }
        
        return accommodations;
    }

    // ⛵ معلومات الكروز
    private getCruiseInfo(category: 'gold' | 'diamond', language: Language): any {
        const cruiseNames = {
            gold: {
                es: "Crucero Dorado del Nilo",
                en: "Golden Nile Cruise",
                ar: "كروز نيل ذهبي"
            },
            diamond: {
                es: "Crucero Diamante del Nilo",
                en: "Diamond Nile Cruise", 
                ar: "كروز نيل ماسي"
            }
        };
        
        return {
            type: 'cruise',
            name: cruiseNames[category],
            nights: 4,
            route: {
                es: "Luxor a Asuán",
                en: "Luxor to Aswan",
                ar: "من الأقصر إلى أسوان"
            },
            departureDays: {
                es: "Sábado y Lunes",
                en: "Saturday and Monday",
                ar: "السبت والاثنين"
            }
        };
    }

    // 🏨 الحصول على أفضل فندق للمدينة
    private getBestHotelForCity(city: string, category: 'gold' | 'diamond', language: Language): LocalizedString {
        // البحث في البرامج الجاهزة أولاً
        for (const program of this.programs) {
            if (program.accommodations?.[category]) {
                for (const acc of program.accommodations[category]) {
                    if (this.isCityMatch(acc.city, city)) {
                        return acc.hotel;
                    }
                }
            }
        }
        
        // استخدام الفنادق الافتراضية
        return this.getDefaultHotelForCity(city, category, language);
    }

    // 📝 إنشاء اسم البرنامج المحسن
    private createEnhancedProgramName(duration: number, cities: string[], language: Language): LocalizedString {
        const cityNames = cities.map(city => this.getCityLocalizedName(city));
        const cityList = cityNames.map(city => city[language] || city.en).join(' & ');
        
        return {
            es: `Viaje Personalizado de ${duration} Días - ${cityList}`,
            en: `Custom ${duration}-Day Journey - ${cityList}`,
            ar: `رحلة مخصصة لمدة ${duration} أيام - ${cityList}`
        };
    }

    // 📝 إنشاء وصف مختصر محسن
    private createEnhancedBriefDescription(duration: number, cities: string[], language: Language): LocalizedString {
        const cityCount = cities.length;
        const cityNames = cities.map(city => this.getCityLocalizedName(city));
        const cityList = cityNames.map(city => city[language] || city.en).join(', ');
        
        return {
            es: `Descubre ${cityCount} ciudades en ${duration} días: ${cityList}`,
            en: `Discover ${cityCount} cities in ${duration} days: ${cityList}`,
            ar: `اكتشف ${cityCount} مدن في ${duration} أيام: ${cityList}`
        };
    }

    // 📝 إنشاء وصف عام محسن
    private createEnhancedGeneralDescription(duration: number, cities: string[], language: Language): LocalizedString {
        const cityCount = cities.length;
        const cityNames = cities.map(city => this.getCityLocalizedName(city));
        const cityList = cityNames.map(city => city[language] || city.en).join(', ');
        
        return {
            es: `Una experiencia única de ${duration} días visitando las ciudades más fascinantes de Egipto: ${cityList}. Incluye alojamiento de lujo, guías expertos y todas las entradas a monumentos históricos.`,
            en: `A unique ${duration}-day experience visiting Egypt's most fascinating cities: ${cityList}. Includes luxury accommodation, expert guides, and all entrance fees to historical monuments.`,
            ar: `تجربة فريدة لمدة ${duration} أيام لزيارة أكثر المدن المصرية سحراً: ${cityList}. تشمل الإقامة الفاخرة والمرشدين الخبراء وجميع رسوم دخول المعالم التاريخية.`
        };
    }

    // 🎯 إنشاء الخدمات المشمولة محسنة
    private createEnhancedServicesIncluded(
        daysDistribution: { [city: string]: number },
        category: 'gold' | 'diamond',
        language: Language
    ): LocalizedString[] {
        const services: LocalizedString[] = [];
        
        // الخدمات الأساسية
        services.push({
            es: `Alojamiento en hoteles de categoría ${category === 'gold' ? 'dorada' : 'diamante'}`,
            en: `Accommodation in ${category} category hotels`,
            ar: `الإقامة في فنادق فئة ${category === 'gold' ? 'ذهبية' : 'ماسية'}`
        });
        
        // إضافة الكروز إذا كان موجوداً
        if (daysDistribution.cruise) {
            services.push({
                es: "Crucero por el Nilo de 4 noches (Luxor a Asuán)",
                en: "4-night Nile cruise (Luxor to Aswan)",
                ar: "رحلة نيلية لمدة 4 ليالي (من الأقصر إلى أسوان)"
            });
        }
        
        // الخدمات الإضافية
        services.push(
            {
                es: "Guía egiptólogo profesional",
                en: "Professional Egyptologist guide",
                ar: "مرشد مصريات محترف"
            },
            {
                es: "Todas las entradas a monumentos",
                en: "All entrance fees to monuments",
                ar: "جميع رسوم دخول المعالم"
            },
            {
                es: "Todas las comidas según se especifique",
                en: "All meals as specified",
                ar: "جميع الوجبات حسب المحدد"
            },
            {
                es: "Traslados al aeropuerto",
                en: "Airport transfers",
                ar: "الانتقالات من وإلى المطار"
            },
            {
                es: "Vehículo privado con aire acondicionado",
                en: "Private air-conditioned vehicle",
                ar: "مركبة خاصة مكيفة"
            },
            {
                es: "Todos los impuestos y cargos por servicio",
                en: "All taxes and service charges",
                ar: "جميع الضرائب ورسوم الخدمة"
            }
        );
        
        return services;
    }

    // 🎯 إنشاء أنشطة الموقع
    private getSiteActivity(site: SupportedSite, language: Language): string | null {
        const siteActivities = {
            gizaPyramidsAndSphinx: {
                es: "Visitar las Pirámides de Giza y la Gran Esfinge",
                en: "Visit Giza Pyramids and Great Sphinx",
                ar: "زيارة أهرامات الجيزة والهرم الأكبر"
            },
            egyptianMuseum: {
                es: "Visitar el Museo Egipcio",
                en: "Visit Egyptian Museum",
                ar: "زيارة المتحف المصري"
            },
            khanElKhalili: {
                es: "Explorar el Bazar Khan El Khalili",
                en: "Explore Khan El Khalili Bazaar",
                ar: "استكشاف خان الخليلي"
            },
            qaitbayCitadel: {
                es: "Visitar la Ciudadela de Qaitbay",
                en: "Visit Qaitbay Citadel",
                ar: "زيارة قلعة قايتباي"
            },
            alexandriaNationalMuseum: {
                es: "Visitar el Museo Nacional de Alejandría",
                en: "Visit Alexandria National Museum",
                ar: "زيارة المتحف القومي بالإسكندرية"
            },
            luxorTemple: {
                es: "Visitar el Templo de Luxor",
                en: "Visit Luxor Temple",
                ar: "زيارة معبد الأقصر"
            },
            karnakTemple: {
                es: "Visitar el Templo de Karnak",
                en: "Visit Karnak Temple",
                ar: "زيارة معبد الكرنك"
            },
            valleyOfTheKings: {
                es: "Explorar el Valle de los Reyes",
                en: "Explore Valley of the Kings",
                ar: "استكشاف وادي الملوك"
            },
            hatshepsutTemple: {
                es: "Visitar el Templo de Hatshepsut",
                en: "Visit Hatshepsut Temple",
                ar: "زيارة معبد حتشبسوت"
            },
            colossiOfMemnon: {
                es: "Ver los Colosos de Memnón",
                en: "See Colossi of Memnon",
                ar: "مشاهدة تمثالي ممنون"
            },
            philaeTemple: {
                es: "Visitar el Templo de Philae",
                en: "Visit Philae Temple",
                ar: "زيارة معبد فيلة"
            }
        };
        
        return siteActivities[site]?.[language] || null;
    }

    // 🏙️ أنشطة الوصول للمدينة
    private getCityArrivalActivity(city: string, language: Language): string {
        const activities = {
            cairo: {
                es: "Llegada a El Cairo y traslado al hotel",
                en: "Arrival in Cairo and transfer to hotel",
                ar: "الوصول إلى القاهرة والانتقال إلى الفندق"
            },
            alexandria: {
                es: "Traslado a Alejandría",
                en: "Transfer to Alexandria",
                ar: "الانتقال إلى الإسكندرية"
            },
            luxor: {
                es: "Traslado a Luxor",
                en: "Transfer to Luxor",
                ar: "الانتقال إلى الأقصر"
            },
            aswan: {
                es: "Traslado a Asuán",
                en: "Transfer to Aswan",
                ar: "الانتقال إلى أسوان"
            }
        };
        
        return activities[city as keyof typeof activities]?.[language] || "Transfer to city";
    }

    // 🏙️ أنشطة المغادرة من المدينة
    private getCityDepartureActivity(city: string, language: Language): string {
        const activities = {
            cairo: {
                es: "Tiempo libre en El Cairo",
                en: "Free time in Cairo",
                ar: "وقت حر في القاهرة"
            },
            alexandria: {
                es: "Tiempo libre en Alejandría",
                en: "Free time in Alexandria",
                ar: "وقت حر في الإسكندرية"
            },
            luxor: {
                es: "Tiempo libre en Luxor",
                en: "Free time in Luxor",
                ar: "وقت حر في الأقصر"
            },
            aswan: {
                es: "Tiempo libre en Asuán",
                en: "Free time in Aswan",
                ar: "وقت حر في أسوان"
            }
        };
        
        return activities[city as keyof typeof activities]?.[language] || "Free time in city";
    }

    // 🌍 الحصول على اسم المدينة باللغات المختلفة
    private getCityLocalizedName(city: string): LocalizedString {
        const cityNames = {
            cairo: { es: "El Cairo", en: "Cairo", ar: "القاهرة" },
            alexandria: { es: "Alejandría", en: "Alexandria", ar: "الإسكندرية" },
            luxor: { es: "Luxor", en: "Luxor", ar: "الأقصر" },
            aswan: { es: "Asuán", en: "Aswan", ar: "أسوان" },
            abuSimbel: { es: "Abu Simbel", en: "Abu Simbel", ar: "أبو سمبل" },
            hurghada: { es: "Hurghada", en: "Hurghada", ar: "الغردقة" },
            sharmElSheikh: { es: "Sharm El Sheikh", en: "Sharm El Sheikh", ar: "شرم الشيخ" }
        };
        
        return cityNames[city as keyof typeof cityNames] || { es: city, en: city, ar: city };
    }

    // 🏨 الحصول على فندق افتراضي للمدينة
    private getDefaultHotelForCity(city: string, category: 'gold' | 'diamond', language: Language): LocalizedString {
        const hotels = {
            cairo: {
                gold: { es: "Hotel Dorado de El Cairo", en: "Cairo Gold Hotel", ar: "فندق القاهرة الذهبي" },
                diamond: { es: "Hotel Diamante de El Cairo", en: "Cairo Diamond Hotel", ar: "فندق القاهرة الماسي" }
            },
            alexandria: {
                gold: { es: "Hotel Dorado de Alejandría", en: "Alexandria Gold Hotel", ar: "فندق الإسكندرية الذهبي" },
                diamond: { es: "Hotel Diamante de Alejandría", en: "Alexandria Diamond Hotel", ar: "فندق الإسكندرية الماسي" }
            },
            luxor: {
                gold: { es: "Hotel Dorado de Luxor", en: "Luxor Gold Hotel", ar: "فندق الأقصر الذهبي" },
                diamond: { es: "Hotel Diamante de Luxor", en: "Luxor Diamond Hotel", ar: "فندق الأقصر الماسي" }
            },
            aswan: {
                gold: { es: "Hotel Dorado de Asuán", en: "Aswan Gold Hotel", ar: "فندق أسوان الذهبي" },
                diamond: { es: "Hotel Diamante de Asuán", en: "Aswan Diamond Hotel", ar: "فندق أسوان الماسي" }
            }
        };
        
        return hotels[city as keyof typeof hotels]?.[category] || { es: "Hotel", en: "Hotel", ar: "فندق" };
    }

    // 🔍 التحقق من تطابق المدينة
    private isCityMatch(accCity: LocalizedString, city: string): boolean {
        const cityNames = this.getCityLocalizedName(city);
        return accCity.en === cityNames.en || accCity.es === cityNames.es || accCity.ar === cityNames.ar;
    }

    // 📊 استخراج بيانات المدينة
    private extractCityData(city: string, language: Language): any {
        // البحث في البرامج الجاهزة عن بيانات المدينة
        for (const program of this.programs) {
            if (program.itinerary) {
                for (const day of program.itinerary) {
                    if (this.isCityInItinerary(day, city)) {
                        return {
                            name: this.getCityLocalizedName(city),
                            activities: day.activities
                        };
                    }
                }
            }
        }
        
        return {
            name: this.getCityLocalizedName(city),
            activities: { [language]: [] }
        };
    }

    // 🔍 التحقق من وجود المدينة في البرنامج اليومي
    private isCityInItinerary(day: ItineraryItem, city: string): boolean {
        const cityNames = this.getCityLocalizedName(city);
        const title = day.title;
        
        return title.en.includes(cityNames.en) || 
               title.es.includes(cityNames.es) || 
               title.ar.includes(cityNames.ar);
    }

    // 🌐 ملء باقي اللغات
    private fillOtherLanguages(activities: { es: string[]; en: string[]; ar: string[] }, language: Language): void {
        const languages: Language[] = ['es', 'en', 'ar'];
        
        for (const lang of languages) {
            if (lang !== language && activities[lang].length === 0) {
                activities[lang] = [...activities[language]];
            }
        }
    }

    // 📊 تحويل الأيام إلى ليالي
    private convertDaysToNights(daysDistribution: { [city: string]: number }): { [city: string]: number } {
        const nights: { [city: string]: number } = {};
        
        for (const [city, days] of Object.entries(daysDistribution)) {
            nights[city] = Math.max(0, days - 1);
        }
        
        return nights;
    }

    // 🛫 حساب قطاعات الطيران
    private calculateFlightSectors(daysDistribution: { [city: string]: number }): string[] {
        const sectors: string[] = [];
        
        // إضافة القطاعات حسب المدن
        if (daysDistribution.cairo) {
            sectors.push('Cairo');
        }
        if (daysDistribution.alexandria) {
            sectors.push('Alexandria');
        }
        if (daysDistribution.luxor) {
            sectors.push('Luxor');
        }
        if (daysDistribution.aswan) {
            sectors.push('Aswan');
        }
        
        return sectors;
    }

    // 🎯 استخراج جميع المواقع من البرنامج اليومي
    private extractAllSitesFromItinerary(itinerary: ItineraryItem[], language: Language): string[] {
        const sites: string[] = [];
        
        for (const day of itinerary) {
            if (day.activities && day.activities[language]) {
                sites.push(...day.activities[language]);
            }
        }
        
        return sites;
    }

    // 🏠 إنشاء يوم الوصول
    private createArrivalDay(language: Language): ItineraryItem {
        return {
            day: 1,
            title: {
                es: "Llegada a El Cairo",
                en: "Arrival in Cairo",
                ar: "الوصول إلى القاهرة"
            },
            activities: {
                es: ["Recogida en aeropuerto y traslado al hotel", "Registro en hotel", "Tiempo libre"],
                en: ["Airport pickup and transfer to hotel", "Hotel check-in", "Free time"],
                ar: ["استقبال من المطار والانتقال إلى الفندق", "تسجيل الوصول في الفندق", "وقت حر"]
            }
        };
    }

    // 🛫 إنشاء يوم المغادرة
    private createDepartureDay(totalDuration: number, language: Language): ItineraryItem {
        return {
            day: totalDuration,
            title: {
                es: "Salida",
                en: "Departure",
                ar: "المغادرة"
            },
            activities: {
                es: ["Check-out del hotel", "Traslado al aeropuerto", "Vuelo de regreso"],
                en: ["Hotel check-out", "Transfer to airport", "Return flight"],
                ar: ["تسجيل الخروج من الفندق", "الانتقال إلى المطار", "رحلة العودة"]
            }
        };
    }

    // 🎯 إنشاء برنامج مخصص ذكي (النظام القديم)
    createIntelligentCustomProgram(request: {
        duration: number;
        travelers: number;
        destinations: string[];
        season: 'summer' | 'winter';
        category: 'gold' | 'diamond';
        language: Language;
    }): Program {
        const { duration, travelers, destinations, season, category, language } = request;
        
        console.log('[Intelligent] Creating custom program for:', { duration, destinations });
        
        // البحث عن برنامج مشابه
        const similarProgram = this.findSimilarProgram(duration, destinations, season, category);
        
        if (similarProgram) {
            console.log('[Intelligent] Found similar program:', similarProgram.id);
            return this.adaptProgram(similarProgram, duration, travelers, language);
        }
        
        // إنشاء برنامج جديد
        console.log('[Intelligent] Creating new program');
        return this.createNewProgram(duration, travelers, destinations, season, category, language);
    }

    // 🔍 البحث عن برنامج مشابه
    private findSimilarProgram(
        duration: number,
        destinations: string[],
        season: 'summer' | 'winter',
        category: 'gold' | 'diamond'
    ): Program | null {
        for (const program of this.programs) {
            if (program.duration.days === duration && 
                program.categories.includes(category) &&
                this.hasMatchingDestinations(program, destinations)) {
                return program;
            }
        }
        
        return null;
    }

    // 🔍 التحقق من تطابق الوجهات
    private hasMatchingDestinations(program: Program, destinations: string[]): boolean {
        if (!program.itinerary) return false;
        
        const programDestinations = new Set<string>();
        
        for (const day of program.itinerary) {
            const title = day.title;
            if (title.en.includes('Cairo')) programDestinations.add('cairo');
            if (title.en.includes('Alexandria')) programDestinations.add('alexandria');
            if (title.en.includes('Luxor')) programDestinations.add('luxor');
            if (title.en.includes('Aswan')) programDestinations.add('aswan');
        }
        
        return destinations.every(dest => programDestinations.has(dest));
    }

    // 🔄 تكييف البرنامج
    private adaptProgram(program: Program, duration: number, travelers: number, language: Language): Program {
        return {
            ...program,
            id: `custom-${Date.now()}`,
            isCustom: true,
            name: this.createCustomProgramName(duration, language),
            duration: { days: duration, nights: duration - 1 },
            quoteParams: {
                travelers,
                duration,
                season: program.quoteParams?.season || 'summer',
                category: program.quoteParams?.category || 'gold',
                itineraryPlan: {
                    nights: this.convertDaysToNights({ [program.startCity.en.toLowerCase()]: duration }),
                    sites: this.extractAllSitesFromItinerary(program.itinerary || [], language),
                    flightSectors: [program.startCity.en]
                }
            }
        };
    }

    // 🆕 إنشاء برنامج جديد
    private createNewProgram(
        duration: number,
        travelers: number,
        destinations: string[],
        season: 'summer' | 'winter',
        category: 'gold' | 'diamond',
        language: Language
    ): Program {
        const itinerary = this.createBasicItinerary(destinations, language);
        const accommodations = this.createBasicAccommodations(destinations, category, language);
        
        return {
            id: `custom-${Date.now()}`,
            isCustom: true,
            name: this.createCustomProgramName(duration, language),
            icon: "🗺️",
            duration: { days: duration, nights: duration - 1 },
            priceFrom: 0,
            categories: [category],
            startCity: { es: "El Cairo", en: "Cairo", ar: "القاهرة" },
            briefDescription: this.createCustomBriefDescription(duration, destinations, language),
            generalDescription: this.createCustomGeneralDescription(duration, destinations, language),
            itinerary: itinerary,
            itineraryOptions: [{
                name: { es: "Itinerario Principal", en: "Main Itinerary", ar: "البرنامج الرئيسي" },
                itinerary: itinerary
            }],
            accommodations: accommodations,
            servicesIncluded: this.createCustomServicesIncluded(category, language),
            servicesExcluded: knowledgeBase.defaults.servicesExcluded,
            importantNotes: knowledgeBase.defaults.importantNotes,
            quoteParams: {
                travelers,
                duration,
                season,
                category,
                itineraryPlan: {
                    nights: this.convertDaysToNights({ [destinations[0]]: duration }),
                    sites: this.extractAllSitesFromItinerary(itinerary, language),
                    flightSectors: destinations
                }
            }
        };
    }

    // 📝 إنشاء اسم البرنامج المخصص
    private createCustomProgramName(duration: number, language: Language): LocalizedString {
        return {
            es: `Viaje Personalizado de ${duration} Días`,
            en: `Custom ${duration}-Day Journey`,
            ar: `رحلة مخصصة لمدة ${duration} أيام`
        };
    }

    // 📝 إنشاء وصف مختصر مخصص
    private createCustomBriefDescription(duration: number, destinations: string[], language: Language): LocalizedString {
        const destinationNames = destinations.map(dest => this.getCityLocalizedName(dest));
        const destinationList = destinationNames.map(city => city[language] || city.en).join(', ');
        
        return {
            es: `Descubre Egipto en ${duration} días: ${destinationList}`,
            en: `Discover Egypt in ${duration} days: ${destinationList}`,
            ar: `اكتشف مصر في ${duration} أيام: ${destinationList}`
        };
    }

    // 📝 إنشاء وصف عام مخصص
    private createCustomGeneralDescription(duration: number, destinations: string[], language: Language): LocalizedString {
        const destinationNames = destinations.map(dest => this.getCityLocalizedName(dest));
        const destinationList = destinationNames.map(city => city[language] || city.en).join(', ');
        
        return {
            es: `Una experiencia única de ${duration} días visitando ${destinationList}. Incluye alojamiento de lujo, guías expertos y todas las entradas.`,
            en: `A unique ${duration}-day experience visiting ${destinationList}. Includes luxury accommodation, expert guides, and all entrance fees.`,
            ar: `تجربة فريدة لمدة ${duration} أيام لزيارة ${destinationList}. تشمل الإقامة الفاخرة والمرشدين الخبراء وجميع رسوم الدخول.`
        };
    }

    // 🎯 إنشاء الخدمات المشمولة مخصصة
    private createCustomServicesIncluded(category: 'gold' | 'diamond', language: Language): LocalizedString[] {
        return [
            {
                es: `Alojamiento en hoteles de categoría ${category === 'gold' ? 'dorada' : 'diamante'}`,
                en: `Accommodation in ${category} category hotels`,
                ar: `الإقامة في فنادق فئة ${category === 'gold' ? 'ذهبية' : 'ماسية'}`
            },
            {
                es: "Guía egiptólogo profesional",
                en: "Professional Egyptologist guide",
                ar: "مرشد مصريات محترف"
            },
            {
                es: "Todas las entradas a monumentos",
                en: "All entrance fees to monuments",
                ar: "جميع رسوم دخول المعالم"
            },
            {
                es: "Todas las comidas según se especifique",
                en: "All meals as specified",
                ar: "جميع الوجبات حسب المحدد"
            },
            {
                es: "Traslados al aeropuerto",
                en: "Airport transfers",
                ar: "الانتقالات من وإلى المطار"
            },
            {
                es: "Vehículo privado con aire acondicionado",
                en: "Private air-conditioned vehicle",
                ar: "مركبة خاصة مكيفة"
            },
            {
                es: "Todos los impuestos y cargos por servicio",
                en: "All taxes and service charges",
                ar: "جميع الضرائب ورسوم الخدمة"
            }
        ];
    }

    // 🗺️ إنشاء برنامج يومي أساسي
    private createBasicItinerary(destinations: string[], language: Language): ItineraryItem[] {
        const itinerary: ItineraryItem[] = [];
        let currentDay = 1;
        
        // يوم الوصول
        itinerary.push(this.createArrivalDay(language));
        currentDay++;
        
        // أيام الوجهات
        for (const destination of destinations) {
            const cityName = this.getCityLocalizedName(destination);
            itinerary.push({
                day: currentDay,
                title: {
                    es: `Explorando ${cityName.es}`,
                    en: `Exploring ${cityName.en}`,
                    ar: `استكشاف ${cityName.ar}`
                },
                activities: {
                    es: [`Visitar los principales atractivos de ${cityName.es}`],
                    en: [`Visit main attractions of ${cityName.en}`],
                    ar: [`زيارة المعالم الرئيسية في ${cityName.ar}`]
                }
            });
            currentDay++;
        }
        
        // يوم المغادرة
        itinerary.push(this.createDepartureDay(currentDay, language));
        
        return itinerary;
    }

    // 🏨 إنشاء أماكن الإقامة أساسية
    private createBasicAccommodations(destinations: string[], category: 'gold' | 'diamond', language: Language): { gold: any[]; diamond: any[] } {
        const accommodations = { gold: [] as any[], diamond: [] as any[] };
        
        for (const destination of destinations) {
            const cityName = this.getCityLocalizedName(destination);
            const hotel = this.getDefaultHotelForCity(destination, category, language);
            
            accommodations[category].push({
                city: cityName,
                hotel: hotel
            });
        }
        
        return accommodations;
    }

    // 🔍 البحث عن برامج مطابقة
    findMatchingPrograms(criteria: {
        duration?: number;
        destinations?: string[];
        season?: 'summer' | 'winter';
        category?: 'gold' | 'diamond';
        maxPrice?: number;
    }): Program[] {
        return this.programs.filter(program => {
            if (criteria.duration && program.duration.days !== criteria.duration) return false;
            if (criteria.season && !program.quoteParams?.season) return false;
            if (criteria.category && !program.categories.includes(criteria.category)) return false;
            if (criteria.maxPrice && program.priceFrom > criteria.maxPrice) return false;
            if (criteria.destinations && !this.hasMatchingDestinations(program, criteria.destinations)) return false;
            
            return true;
        });
    }

    // 📊 تحليل البرامج
    analyzePrograms(): {
        totalPrograms: number;
        averageDuration: number;
        categories: { [key: string]: number };
        destinations: { [key: string]: number };
    } {
        const analysis = {
            totalPrograms: this.programs.length,
            averageDuration: 0,
            categories: {} as { [key: string]: number },
            destinations: {} as { [key: string]: number }
        };
        
        let totalDays = 0;
        
        for (const program of this.programs) {
            totalDays += program.duration.days;
            
            // تحليل الفئات
            for (const category of program.categories) {
                analysis.categories[category] = (analysis.categories[category] || 0) + 1;
            }
            
            // تحليل الوجهات
            if (program.itinerary) {
                for (const day of program.itinerary) {
                    const title = day.title.en.toLowerCase();
                    if (title.includes('cairo')) analysis.destinations.cairo = (analysis.destinations.cairo || 0) + 1;
                    if (title.includes('alexandria')) analysis.destinations.alexandria = (analysis.destinations.alexandria || 0) + 1;
                    if (title.includes('luxor')) analysis.destinations.luxor = (analysis.destinations.luxor || 0) + 1;
                    if (title.includes('aswan')) analysis.destinations.aswan = (analysis.destinations.aswan || 0) + 1;
                }
            }
        }
        
        analysis.averageDuration = totalDays / this.programs.length;
        
        return analysis;
    }

    // 🎯 الحصول على توصيات
    getRecommendations(userPreferences: {
        duration: number;
        budget: number;
        interests: string[];
        season: 'summer' | 'winter';
    }): Program[] {
        const recommendations: Program[] = [];
        
        for (const program of this.programs) {
            let score = 0;
            
            // تحليل المدة
            if (Math.abs(program.duration.days - userPreferences.duration) <= 2) {
                score += 10;
            }
            
            // تحليل الميزانية
            if (program.priceFrom <= userPreferences.budget) {
                score += 15;
            }
            
            // تحليل الاهتمامات
            if (program.itinerary) {
                for (const day of program.itinerary) {
                    for (const interest of userPreferences.interests) {
                        if (day.activities.en.some(activity => 
                            activity.toLowerCase().includes(interest.toLowerCase())
                        )) {
                            score += 5;
                        }
                    }
                }
            }
            
            // تحليل الموسم
            if (program.quoteParams?.season === userPreferences.season) {
                score += 8;
            }
            
            if (score >= 20) {
                recommendations.push(program);
            }
        }
        
        return recommendations.sort((a, b) => {
            const scoreA = this.calculateRecommendationScore(a, userPreferences);
            const scoreB = this.calculateRecommendationScore(b, userPreferences);
            return scoreB - scoreA;
        });
    }

    // 📊 حساب نقاط التوصية
    private calculateRecommendationScore(program: Program, preferences: any): number {
        let score = 0;
        
        if (Math.abs(program.duration.days - preferences.duration) <= 2) score += 10;
        if (program.priceFrom <= preferences.budget) score += 15;
        if (program.quoteParams?.season === preferences.season) score += 8;
        
        return score;
    }
}

// 🚀 تصدير الدوال الرئيسية
export function createIntelligentCustomProgram(request: {
    duration: number;
    travelers: number;
    destinations: string[];
    season: 'summer' | 'winter';
    category: 'gold' | 'diamond';
    language: Language;
}): Program {
    const extractor = new IntelligentDataExtractor();
    return extractor.createIntelligentCustomProgram(request);
}

export function createEnhancedCustomProgram(request: {
    duration: number;
    travelers: number;
    cities: string[];
    specificSites?: { [city: string]: SupportedSite[] };
    season: 'summer' | 'winter';
    category: 'gold' | 'diamond';
    language: Language;
}): Program {
    const extractor = new IntelligentDataExtractor();
    return extractor.createEnhancedCustomProgram(request);
}