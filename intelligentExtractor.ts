import type { Program, ItineraryItem, CustomQuoteParams, SupportedSite, SupportedCity, LocalizedString } from './types';
import { knowledgeBase } from './knowledgeBase';
import type { Language } from './contexts/LanguageContext';';

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
// 🧠 نظام ذكي محسن لاستخراج البيانات من البرامج الـ10 الموجودة
export class IntelligentDataExtractor {
    private programs: Program[];

    constructor() {
        this.programs = knowledgeBase.packages;
    }

    // 🎯 دالة رئيسية جديدة لإنشاء برنامج مخصص محسن
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

    // 📊 حساب توزيع الأيام بشكل ذكي
    private calculateDaysDistribution(duration: number, cities: string[]): { [city: string]: number } {
        const availableDays = duration - 2; // استبعاد يوم الوصول والمغادرة
        const distribution: { [city: string]: number } = {};
        
        // القاهرة دائماً لها الأولوية
        if (cities.includes('cairo')) {
            distribution.cairo = Math.max(2, Math.ceil(availableDays * 0.4));
        }
        
        // توزيع باقي الأيام
        let remainingDays = availableDays - (distribution.cairo || 0);
        
        for (const city of cities) {
            if (city === 'cairo') continue;
            
            if (remainingDays > 0) {
                const cityDays = Math.max(1, Math.ceil(remainingDays * 0.3));
                distribution[city] = cityDays;
                remainingDays -= cityDays;
            }
        }
        
        // أي أيام متبقية تذهب للقاهرة
        if (remainingDays > 0) {
            distribution.cairo = (distribution.cairo || 0) + remainingDays;
        }
        
        console.log('[Enhanced] Days distribution:', distribution);
        return distribution;
    }

    // 🗺️ إنشاء برنامج يومي محسن
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
        
        // أيام المدن
        for (const [city, days] of Object.entries(daysDistribution)) {
            if (days > 0) {
                const cityDays = this.createCityDays(city, days, specificSites[city] || [], language, currentDay);
                itinerary.push(...cityDays);
                currentDay += days;
            }
        }
        
        // يوم المغادرة
        itinerary.push(this.createDepartureDay(totalDuration, language));
        
        return itinerary;
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
        activities.es = [...activities[language]];
        activities.en = [...activities[language]];
        activities.ar = [...activities[language]];
        
        return activities;
    }

    // 🏨 إنشاء أماكن الإقامة محسنة
    private createEnhancedAccommodations(
        daysDistribution: { [city: string]: number },
        category: 'gold' | 'diamond',
        language: Language
    ): { gold: any[]; diamond: any[] } {
        const accommodations = { gold: [] as any[], diamond: [] as any[] };
        
        for (const [city, days] of Object.entries(daysDistribution)) {
            if (days > 0 && city !== 'cruise') {
                const cityName = this.getCityLocalizedName(city);
                const hotel = this.getBestHotelForCity(city, category, language);
                
                accommodations[category].push({
                    city: cityName,
                    hotel: hotel
                });
            }
        }
        
        return accommodations;
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

    // 📝 إنشاء الوصف المختصر المحسن
    private createEnhancedBriefDescription(duration: number, cities: string[], language: Language): LocalizedString {
        const cityNames = cities.map(city => this.getCityLocalizedName(city));
        const cityList = cityNames.map(city => city[language] || city.en).join(' & ');
        
        return {
            es: `Un viaje personalizado de ${duration} días explorando ${cityList} con itinerario مخصص حسب رغباتك`,
            en: `A custom ${duration}-day journey exploring ${cityList} with a personalized itinerary tailored to your preferences`,
            ar: `رحلة مخصصة لمدة ${duration} أيام لاستكشاف ${cityList} مع برنامج يومي مخصص حسب تفضيلاتك`
        };
    }

    // 📝 إنشاء الوصف العام المحسن
    private createEnhancedGeneralDescription(duration: number, cities: string[], language: Language): LocalizedString {
        const cityNames = cities.map(city => this.getCityLocalizedName(city));
        const cityList = cityNames.map(city => city[language] || city.en).join(' & ');
        
        return {
            es: `Este itinerario personalizado de ${duration} días ha sido diseñado especialmente para ti, combinando lo mejor de ${cityList}. Cada detalle ha sido cuidadosamente seleccionado de nuestros programas الجاهزة لخلق تجربة لا تُنسى تناسب تفضيلاتك تماماً.`,
            en: `This custom ${duration}-day itinerary has been specially designed for you, combining the best of ${cityList}. Every detail has been carefully selected from our ready-made programs to create an unforgettable experience that perfectly matches your preferences.`,
            ar: `هذا المسار المخصص لمدة ${duration} أيام مصمم خصيصًا لك، يجمع بين أفضل ما في ${cityList}. تم اختيار كل تفصيل بعناية من برامجنا الجاهزة لخلق تجربة لا تُنسى تناسب تفضيلاتك تماماً.`
        };
    }

    // 🎯 إنشاء الخدمات المضمنة المحسنة
    private createEnhancedServicesIncluded(
        daysDistribution: { [city: string]: number },
        category: 'gold' | 'diamond',
        language: Language
    ): { es: string[]; en: string[]; ar: string[] } {
        const baseServices = knowledgeBase.defaults.servicesIncluded[language] || [];
        const services = [...baseServices];
        
        // إضافة خدمات الإقامة
        for (const [city, days] of Object.entries(daysDistribution)) {
            if (days > 0) {
                const cityName = this.getCityLocalizedName(city)[language] || this.getCityLocalizedName(city).en;
                const nights = days;
                
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

    // 🔄 تحويل توزيع الأيام إلى ليالي
    private convertDaysToNights(daysDistribution: { [city: string]: number }): { [key: string]: number } {
        const result: { [key: string]: number } = {};
        for (const [city, days] of Object.entries(daysDistribution)) {
            if (days > 0) {
                result[city] = days;
            }
        }
        return result;
    }

    // 🛫 حساب قطاعات الطيران
    private calculateFlightSectors(daysDistribution: { [city: string]: number }): number {
        const cities = Object.keys(daysDistribution).filter(city => city !== 'cairo');
        return cities.length > 0 ? cities.length * 2 : 0; // ذهاب وإياب لكل مدينة
    }

    // 🎯 استخراج جميع المواقع من البرنامج اليومي
    private extractAllSitesFromItinerary(itinerary: ItineraryItem[], language: Language): SupportedSite[] {
        const sites: SupportedSite[] = [];
        
        for (const day of itinerary) {
            if (day.activities) {
                const activities = day.activities[language] || day.activities.en || [];
                const activitiesText = activities.join(' ').toLowerCase();
                
                // استخراج المواقع من النص
                for (const site of Object.values(AVAILABLE_SITES).flat()) {
                    if (this.isSiteMentionedInText(site, activitiesText)) {
                        sites.push(site as SupportedSite);
                    }
                }
            }
        }
        
        return [...new Set(sites)];
    }

    // 🔍 التحقق من ذكر الموقع في النص
    private isSiteMentionedInText(site: string, text: string): boolean {
        const siteKeywords = this.getSiteKeywords(site);
        return siteKeywords.some(keyword => text.includes(keyword.toLowerCase()));
    }

    // 🏷️ الحصول على الكلمات المفتاحية للموقع
    private getSiteKeywords(site: string): string[] {
        const keywordsMap: { [key: string]: string[] } = {
            'gizaPyramidsAndSphinx': ['pyramid', 'pirámide', 'هرم', 'sphinx', 'esfinge', 'أبو الهول'],
            'egyptianMuseum': ['museum', 'museo', 'متحف', 'egyptian', 'egipcio', 'مصري'],
            'karnakTemple': ['karnak', 'الكرنك'],
            'luxorTemple': ['luxor temple', 'templo de luxor', 'معبد الأقصر'],
            'valleyOfTheKings': ['valley of the kings', 'valle de los reyes', 'وادي الملوك'],
            'hatshepsutTemple': ['hatshepsut', 'حتشبسوت'],
            'abuSimbelTemples': ['abu simbel', 'أبو سمبل'],
            'philaeTemple': ['philae', 'فيلة'],
            'komOmboTemple': ['kom ombo', 'كوم أمبو'],
            'edfuTemple': ['edfu', 'إدفو'],
            'khanElKhalili': ['khan el khalili', 'خان الخليلي'],
            'qaitbayCitadel': ['citadel', 'ciudadela', 'قلعة', 'qaitbay'],
            'alexandriaNationalMuseum': ['alexandria', 'alejandría', 'الإسكندرية', 'museum', 'museo', 'متحف']
        };
        
        return keywordsMap[site] || [site];
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

    // 🎯 الحصول على أنشطة الوصول للمدينة
    private getCityArrivalActivity(city: string, language: Language): string {
        const cityName = this.getCityLocalizedName(city)[language] || this.getCityLocalizedName(city).en;
        
        const activities = {
            es: `Llegada a ${cityName} y traslado al hotel`,
            en: `Arrival in ${cityName} and transfer to hotel`,
            ar: `الوصول إلى ${cityName} والانتقال إلى الفندق`
        };
        
        return activities[language];
    }

    // 🎯 الحصول على أنشطة المغادرة من المدينة
    private getCityDepartureActivity(city: string, language: Language): string {
        const cityName = this.getCityLocalizedName(city)[language] || this.getCityLocalizedName(city).en;
        
        const activities = {
            es: `Tiempo libre en ${cityName} y preparación para el siguiente destino`,
            en: `Free time in ${cityName} and preparation for next destination`,
            ar: `وقت حر في ${cityName} والاستعداد للوجهة التالية`
        };
        
        return activities[language];
    }

    // 🎯 الحصول على نشاط الموقع
    private getSiteActivity(site: SupportedSite, language: Language): string {
        const siteActivities: { [key: string]: { es: string; en: string; ar: string } } = {
            'gizaPyramidsAndSphinx': {
                es: 'Visita a las Pirámides de Giza y la Esfinge',
                en: 'Visit to the Pyramids of Giza and the Sphinx',
                ar: 'زيارة أهرامات الجيزة وأبو الهول'
            },
            'egyptianMuseum': {
                es: 'Exploración del Museo Egipcio y sus tesoros',
                en: 'Exploration of the Egyptian Museum and its treasures',
                ar: 'استكشاف المتحف المصري وكنوزه'
            },
            'karnakTemple': {
                es: 'Visita al majestuoso Templo de Karnak',
                en: 'Visit to the majestic Karnak Temple',
                ar: 'زيارة معبد الكرنك المهيب'
            },
            'valleyOfTheKings': {
                es: 'Exploración del Valle de los Reyes',
                en: 'Exploration of the Valley of the Kings',
                ar: 'استكشاف وادي الملوك'
            }
        };
        
        const activity = siteActivities[site];
        return activity ? activity[language] : `Visita a ${site}`;
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
            },
            alexandria: {
                gold: {
                    es: 'Hotel Four Seasons Alexandria',
                    en: 'Four Seasons Hotel Alexandria',
                    ar: 'فندق فور سيزونز الإسكندرية'
                },
                diamond: {
                    es: 'Hotel Cecil Alexandria',
                    en: 'Cecil Hotel Alexandria',
                    ar: 'فندق سيسيل الإسكندرية'
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

    // 🎯 إنشاء يوم الوصول
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
        };
    }

    // 🎯 إنشاء يوم المغادرة
    private createDepartureDay(totalDuration: number, language: Language): ItineraryItem {
        return {
            day: totalDuration,
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
        };
    }

    // 🔍 التحقق من مطابقة المدينة
    private isCityMatch(cityObj: LocalizedString, targetCity: string): boolean {
        const cityKeywords = this.getCityKeywords(targetCity);
        const cityValues = Object.values(cityObj).map(v => v.toLowerCase());
        
        return cityKeywords.some(keyword =>
            cityValues.some(value => value.includes(keyword))
        );
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

    // 🎯 دالة للعثور على برنامج جاهز مطابق
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

    // 📅 الحصول على itinerary البرنامج
    private getProgramItinerary(program: Program): ItineraryItem[] {
        if (program.itineraryOptions && program.itineraryOptions.length > 0) {
            return program.itineraryOptions[0].itinerary;
        } else if (program.itinerary) {
            return program.itinerary;
        }
        return [];
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

    // 🔍 التحقق من وجود كلمات مفتاحية في النص
    private containsKeywords(text: string, keywords: string[]): boolean {
        return keywords.some(keyword => text.includes(keyword.toLowerCase()));
    }

    // 📋 الحصول على مفتاح اللغة
    private getLanguageKey(obj: LocalizedString): keyof LocalizedString {
        return 'en' as keyof LocalizedString; // افتراضي
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

    // 🎯 إنشاء برنامج مخصص ذكي (النظام القديم المحسن)
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

    // ✅ التحقق من صحة اسم البرنامج المخصص
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

    // 🏛️ إنشاء البرنامج اليومي المخصص
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

// 🚀 تصدير الدالة المحسنة الجديدة
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
} private programs: Program[];

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