import type { Program, ItineraryItem, CustomQuoteParams, SupportedSite, SupportedCity, LocalizedString, TransportService } from './types';
import { knowledgeBase } from './services/knowledgeBase';
import type { Language } from './contexts/LanguageContext';
import { calculateRealPricing } from './services/pricingService';

interface ExtractedCityDay {
    programId: string | number;
    programName: LocalizedString;
    day: ItineraryItem;
    originalDayNumber: number;
}

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

export class IntelligentDataExtractor {
    private programs: Program[];

    constructor() {
        this.programs = knowledgeBase.packages;
    }

    private detectCityFromDay(day: ItineraryItem): SupportedCity | 'cruise' | null {
        const titleEn = day.title.en.toLowerCase();
        const titleEs = day.title.es.toLowerCase();
        const titleAr = day.title.ar;

        // البحث في العنوان
        const cityKeywords = {
            cairo: ['cairo', 'el cairo', 'القاهرة', 'giza', 'guiza', 'الجيزة', 'saqqara', 'سقارة', 'memphis', 'ممفيس'],
            alexandria: ['alexandria', 'alejandría', 'الإسكندرية'],
            luxor: ['luxor', 'الأقصر', 'valley of the kings', 'وادي الملوك', 'karnak', 'الكرنك'],
            aswan: ['aswan', 'asuán', 'أسوان', 'philae', 'فيلة'],
            abuSimbel: ['abu simbel', 'أبو سمبل'],
            cruise: ['cruise', 'crucero', 'نيلية', 'edfu', 'إدفو', 'kom ombo', 'كوم أمبو']
        };

        for (const [city, keywords] of Object.entries(cityKeywords)) {
            for (const keyword of keywords) {
                if (titleEn.includes(keyword) || titleEs.includes(keyword) || titleAr.includes(keyword)) {
                    return city as SupportedCity | 'cruise';
                }
            }
        }

        // البحث في الأنشطة
        const activities = [
            ...(day.activities.en || []),
            ...(day.activities.es || []),
            ...(day.activities.ar || [])
        ].join(' ').toLowerCase();

        for (const [city, keywords] of Object.entries(cityKeywords)) {
            for (const keyword of keywords) {
                if (activities.includes(keyword)) {
                    return city as SupportedCity | 'cruise';
                }
            }
        }

        return null;
    }

    public extractCityDaysFromPrograms(city: SupportedCity): ExtractedCityDay[] {
        const cityDays: ExtractedCityDay[] = [];

        for (const program of this.programs) {
            if (!program.itinerary) continue;

            // إذا كان البرنامج له itineraryOptions (زي البرنامج 1)
            if (program.itineraryOptions && program.itineraryOptions.length > 0) {
                // ناخد أول option بس (أو نختار الأنسب)
                const itinerary = program.itineraryOptions[0].itinerary;
                this.extractDaysFromItinerary(itinerary, program, city, cityDays);
            } else {
                // البرامج العادية
                this.extractDaysFromItinerary(program.itinerary, program, city, cityDays);
            }
        }

        console.log(`[Extract] Found ${cityDays.length} days for ${city}`);

        return cityDays;
    }

    private extractDaysFromItinerary(
        itinerary: ItineraryItem[],
        program: Program,
        city: SupportedCity,
        cityDays: ExtractedCityDay[]
    ): void {
        for (const day of itinerary) {
            const detectedCity = this.detectCityFromDay(day);

            if (detectedCity === city) {
                // استبعاد أيام الوصول والمغادرة
                const isArrival = this.isArrivalDay(day);
                const isDeparture = this.isDepartureDay(day);

                if (!isArrival && !isDeparture) {
                    cityDays.push({
                        programId: program.id,
                        programName: program.name,
                        day: day,
                        originalDayNumber: day.day
                    });
                }
            }
        }
    }


    private isArrivalDay(day: ItineraryItem): boolean {
        const activities = [
            ...(day.activities.en || []),
            ...(day.activities.es || []),
            ...(day.activities.ar || [])
        ].join(' ').toLowerCase();

        const arrivalKeywords = [
            'arrival', 'llegada', 'وصول',
            'welcome', 'bienvenida', 'ترحيب',
            'airport reception', 'recepción', 'استقبال'
        ];

        return arrivalKeywords.some(keyword => activities.includes(keyword));
    }

    /**
     * 🛫 هل اليوم ده يوم مغادرة؟
     */
    private isDepartureDay(day: ItineraryItem): boolean {
        const activities = [
            ...(day.activities.en || []),
            ...(day.activities.es || []),
            ...(day.activities.ar || [])
        ].join(' ').toLowerCase();

        const departureKeywords = [
            'departure', 'salida', 'مغادرة',
            'farewell', 'despedida', 'وداع',
            'end of', 'fin de', 'نهاية'
        ];

        return departureKeywords.some(keyword => activities.includes(keyword));
    }

    /**
 * ⭐ اختيار أحسن X أيام من المدينة (بدون تكرار)
 */
    public selectBestCityDays(
        city: SupportedCity,
        requestedDays: number,
        language: Language
    ): ItineraryItem[] {
        console.log(`[Select] Selecting ${requestedDays} best days for ${city}`);

        const allCityDays = this.extractCityDaysFromPrograms(city);

        if (allCityDays.length === 0) {
            console.warn(`[Select] No days found for ${city}`);
            return []; // ✅ بدل ما نرجع array فاضي، نرجع fallback
        }

        const rankedDays = this.rankDaysByImportance(allCityDays, language);
        const selectedDays = this.selectDiverseDays(rankedDays, requestedDays, language);

        // ✅ Validation: تأكد إن عندنا أيام كافية
        if (selectedDays.length < requestedDays) {
            console.warn(`[Select] Only found ${selectedDays.length} days, requested ${requestedDays}`);
        }

        return this.renumberDays(selectedDays);
    }

    /**
     * 🎯 ترتيب الأيام حسب الأهمية والتنوع
     */
    private rankDaysByImportance(
        days: ExtractedCityDay[],
        language: Language
    ): ExtractedCityDay[] {
        return days.sort((a, b) => {
            const scoreA = this.calculateDayScore(a, language);
            const scoreB = this.calculateDayScore(b, language);
            return scoreB - scoreA; // ترتيب تنازلي
        });
    }

    /**
     * 📊 حساب أهمية اليوم (كلما زاد الرقم = أهم)
     */
    private calculateDayScore(day: ExtractedCityDay, language: Language): number {
        let score = 0;
        const activities = day.day.activities[language] || [];

        // عدد الأنشطة (كل نشاط = 10 نقاط)
        score += activities.length * 10;

        // أهمية المزارات (المزارات المشهورة = نقاط أعلى)
        const importantSites = [
            'pyramid', 'pirámide', 'هرم',
            'sphinx', 'esfinge', 'أبو الهول',
            'museum', 'museo', 'متحف',
            'temple', 'templo', 'معبد',
            'valley', 'valle', 'وادي',
            'karnak', 'كرنك',
            'luxor', 'أقصر'
        ];

        const activitiesText = activities.join(' ').toLowerCase();
        importantSites.forEach(site => {
            if (activitiesText.includes(site)) {
                score += 20;
            }
        });

        return score;
    }

    /**
     * 🎨 اختيار أيام متنوعة (بدون تكرار المزارات)
     */
    private selectDiverseDays(
        rankedDays: ExtractedCityDay[],
        requestedDays: number,
        language: Language
    ): ItineraryItem[] {
        const selectedDays: ItineraryItem[] = [];
        const usedSites = new Set<string>();

        for (const dayData of rankedDays) {
            if (selectedDays.length >= requestedDays) break;

            const activities = dayData.day.activities[language] || [];
            const activitiesText = activities.join(' ').toLowerCase();

            // استخراج المزارات من النص
            const sites = this.extractSitesFromText(activitiesText);

            // هل فيه تكرار كبير؟
            const overlap = sites.filter(site => usedSites.has(site)).length;
            const overlapRatio = sites.length > 0 ? overlap / sites.length : 0;

            // لو التكرار أقل من 50%، ناخد اليوم ده
            if (overlapRatio < 0.5) {
                selectedDays.push(dayData.day);
                sites.forEach(site => usedSites.add(site));
            }
        }

        // لو محتاجين أيام أكتر، ناخد من الباقي
        if (selectedDays.length < requestedDays) {
            for (const dayData of rankedDays) {
                if (selectedDays.length >= requestedDays) break;
                if (!selectedDays.includes(dayData.day)) {
                    selectedDays.push(dayData.day);
                }
            }
        }

        return selectedDays;
    }

    /**
     * 🔍 استخراج أسماء المزارات من النص
     */
    private extractSitesFromText(text: string): string[] {
        const siteKeywords = [
            'pyramid', 'pirámide', 'هرم',
            'sphinx', 'esfinge', 'أبو الهول',
            'museum', 'museo', 'متحف',
            'saqqara', 'سقارة',
            'karnak', 'كرنك',
            'luxor', 'أقصر',
            'valley', 'valle', 'وادي',
            'temple', 'templo', 'معبد',
            'philae', 'فيلة',
            'edfu', 'إدفو',
            'kom ombo', 'كوم أمبو',
            'hatshepsut', 'حتشبسوت',
            'khan', 'خان',
            'citadel', 'ciudadela', 'قلعة'
        ];

        return siteKeywords.filter(keyword => text.includes(keyword));
    }

    /**
     * 🔢 إعادة ترقيم الأيام (1، 2، 3...)
     */
    private renumberDays(days: ItineraryItem[]): ItineraryItem[] {
        return days.map((day, index) => ({
            ...day,
            day: index + 1
        }));
    }

    // 🎯 إنشاء برنامج مخصص محسّن مع دعم ترتيب المدن والكروز
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

        // 1️⃣ حساب توزيع الأيام
        const daysDistribution = this.calculateDaysDistribution(duration, cities);

        // 2️⃣ إنشاء البرنامج اليومي المحسّن
        const itinerary = this.createEnhancedItinerary(daysDistribution, specificSites, language, duration);

        // 3️⃣ إنشاء أماكن الإقامة المحسّنة (بالفنادق الحقيقية)
        const accommodations = this.createEnhancedAccommodations(daysDistribution, category, language);

        // 4️⃣ إنشاء البرنامج النهائي
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

    // 🤖 إنشاء برنامج تلقائي بناءً على المواقع المتاحة
    createAutoProgram(request: {
        duration: number;
        travelers: number;
        cities: string[];
        season: 'summer' | 'winter';
        category: 'gold' | 'diamond';
        language: Language;
    }): Program {
        const { duration, travelers, cities, season, category, language } = request;

        console.log('[Auto] Creating auto program for:', { duration, cities });

        // إنشاء مواقع تلقائية لكل مدينة
        const autoSites: { [city: string]: SupportedSite[] } = {};

        for (const city of cities) {
            const availableSites = this.getAvailableSitesForCity(city);
            // اختيار أفضل 3-5 مواقع لكل مدينة
            const sitesPerCity = Math.min(5, Math.max(3, Math.ceil(availableSites.length * 0.6)));
            autoSites[city] = availableSites.slice(0, sitesPerCity);
        }

        // استخدام النظام المحسن مع المواقع التلقائية
        return this.createEnhancedCustomProgram({
            duration,
            travelers,
            cities,
            specificSites: autoSites,
            season,
            category,
            language
        });
    }

    // 📊 حساب توزيع الأيام بشكل ذكي مع دعم ترتيب المدن
    private calculateDaysDistribution(duration: number, cities: string[]): { [city: string]: number } {
        const availableDays = duration - 2; // 8 - 2 = 6 أيام فعلية
        const distribution: { [city: string]: number } = {};

        const hasLuxor = cities.includes('luxor');
        const hasAswan = cities.includes('aswan');
        const hasCruise = hasLuxor && hasAswan;

        let cruiseDays = 0;
        if (hasCruise) {
            cruiseDays = 5; // 4 ليالي كروز
        }

        const remainingDays = availableDays - cruiseDays;

        // ✅ المدن بدون كروز
        const citiesWithoutCruise = cities.filter(c => c !== 'luxor' && c !== 'aswan');

        if (citiesWithoutCruise.length > 0) {
            // توزيع متساوي
            const daysPerCity = Math.floor(remainingDays / citiesWithoutCruise.length);
            const extraDays = remainingDays % citiesWithoutCruise.length;

            citiesWithoutCruise.forEach((city, index) => {
                distribution[city] = daysPerCity + (index < extraDays ? 1 : 0);
            });
        }

        if (hasCruise) {
            distribution.cruise = cruiseDays;
        }

        console.log('[Enhanced] Days distribution:', distribution);
        return distribution;
    }

    // 🗺️ إنشاء برنامج يومي محسّن مع دعم ترتيب المدن والكروز

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
                    // ✅ إنشاء أيام الكروز بالمزارات الحقيقية
                    const cruiseDays = this.createCruiseDaysWithRealSites(specificSites, language, currentDay);
                    itinerary.push(...cruiseDays);
                    currentDay += days;
                } else {
                    // ✅ إنشاء أيام المدن بالمزارات الحقيقية
                    const cityDays = this.createCityDaysWithRealSites(
                        city,
                        days,
                        specificSites[city] || [],
                        language,
                        currentDay
                    );
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

    // 🗺️ الحصول على المواقع المتاحة للمدينة
    private getAvailableSitesForCity(city: string): SupportedSite[] {
        const cityKey = city.toLowerCase() as keyof typeof AVAILABLE_SITES;
        return AVAILABLE_SITES[cityKey] || [];
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

    // ⛵ إنشاء أيام الكروز بالمزارات الحقيقية
    private createCruiseDaysWithRealSites(
        specificSites: { [city: string]: SupportedSite[] },
        language: Language,
        startDay: number
    ): ItineraryItem[] {
        const cruiseDays: ItineraryItem[] = [];

        // ✅ استخدام الأيام الحقيقية من البرامج للكروز
        const luxorDays = this.selectBestCityDays('luxor', 2, language);
        const aswanDays = this.selectBestCityDays('aswan', 1, language);

        if (luxorDays.length > 0) {
            // يوم 1: الأقصر
            cruiseDays.push({
                ...luxorDays[0],
                day: startDay,
                title: this.getCruiseDayTitle('luxor', 1, language)
            });
        }

        // يوم 2: إدفو
        cruiseDays.push({
            day: startDay + 1,
            title: this.getCruiseDayTitle('edfu', 2, language),
            activities: this.getCruiseDayActivities('edfu', [], language)
        });

        // يوم 3: كوم أمبو
        cruiseDays.push({
            day: startDay + 2,
            title: this.getCruiseDayTitle('komOmbo', 3, language),
            activities: this.getCruiseDayActivities('komOmbo', [], language)
        });

        if (aswanDays.length > 0) {
            // يوم 4: أسوان
            cruiseDays.push({
                ...aswanDays[0],
                day: startDay + 3,
                title: this.getCruiseDayTitle('aswan', 4, language)
            });
        }

        // إذا الكروز 3 ليالي فقط، نحذف يوم
        if (cruiseDays.length > 4) {
            cruiseDays.splice(2, 1); // نحذف كوم أمبو أو إدفو
        }

        return cruiseDays.slice(0, 4); // max 4 أيام (3 ليالي)
    }

    // 🙏️ إنشاء أيام مدينة محددة بالمزارات الحقيقية
    private createCityDaysWithRealSites(
        city: string,
        days: number,
        specificSites: SupportedSite[],
        language: Language,
        startDay: number
    ): ItineraryItem[] {
        const cityDays: ItineraryItem[] = [];

        // ✅ استخدام الأيام الحقيقية من البرامج
        const realCityDays = this.selectBestCityDays(city as SupportedCity, days, language);

        if (realCityDays.length >= days) {
            // ✅ لو لاقينا أيام كفاية
            realCityDays.forEach((day, index) => {
                cityDays.push({
                    ...day,
                    day: startDay + index
                });
            });
        } else {
            // ⚠️ لو مفيش أيام كفاية، نستخدم اللي موجود + نضيف fallback
            console.warn(`[Extract] Only found ${realCityDays.length}/${days} days for ${city}, using fallback`);

            // استخدم اللي موجود
            realCityDays.forEach((day, index) => {
                cityDays.push({
                    ...day,
                    day: startDay + index
                });
            });

            // أضف أيام fallback للباقي
            for (let i = realCityDays.length; i < days; i++) {
                cityDays.push(this.createFallbackDay(
                    city,
                    i + 1,
                    days,
                    specificSites,
                    language,
                    startDay + i
                ));
            }
        }

        return cityDays;
    }

    private createFallbackDay(
        city: string,
        dayInCity: number,
        totalDaysInCity: number,
        specificSites: SupportedSite[],
        language: Language,
        dayNumber: number
    ): ItineraryItem {
        const availableSites = this.getAvailableSitesForCity(city);
        const sitesForThisDay = availableSites.slice((dayInCity - 1) * 3, dayInCity * 3);

        const activities: { es: string[]; en: string[]; ar: string[] } = {
            es: [],
            en: [],
            ar: []
        };

        // إضافة نشاط الوصول
        if (dayInCity === 1) {
            activities[language].push(this.getCityArrivalActivity(city, language));
        }

        // إضافة المزارات
        for (const site of sitesForThisDay) {
            const activity = this.getSiteActivity(site, language);
            if (activity) {
                activities[language].push(activity);
            }
        }

        // إضافة نشاط الختام
        if (dayInCity === totalDaysInCity) {
            activities[language].push(this.getCityDepartureActivity(city, language));
        }

        // ملء اللغات الأخرى
        this.fillOtherLanguages(activities, language);

        return {
            day: dayNumber,
            title: this.createDayTitle(city, dayInCity, totalDaysInCity, language),
            activities: activities
        };
    }

    // ⛵ معلومات الكروز
    // ⛵ معلومات الكروز الحقيقية
    private getCruiseInfo(category: 'gold' | 'diamond', language: Language): any {
        const cruiseNames = {
            gold: {
                es: "Le Fayan II",
                en: "Le Fayan II",
                ar: "لو فايان 2"
            },
            diamond: {
                es: "Royal Signature",
                en: "Royal Signature",
                ar: "رويال سيغنتشر"
            }
        };

        return {
            type: 'cruise',
            name: cruiseNames[category],
            nights: 4,
            route: {
                es: "Luxor → Edfu → Kom Ombo → Asuán",
                en: "Luxor → Edfu → Kom Ombo → Aswan",
                ar: "الأقصر ← إدفو ← كوم أمبو ← أسوان"
            },
            departureDays: {
                es: "Sábado y Lunes desde Luxor / Miércoles y Viernes desde Asuán",
                en: "Saturday and Monday from Luxor / Wednesday and Friday from Aswan",
                ar: "السبت والاثنين من الأقصر / الأربعاء والجمعة من أسوان"
            }
        };
    }

    // 🏨 الحصول على أفضل فندق للمدينة

    private getBestHotelForCity(city: string, category: 'gold' | 'diamond', language: Language): LocalizedString {
        // 1️⃣ البحث في البرامج الجاهزة أولاً
        for (const program of this.programs) {
            if (program.accommodations?.[category]) {
                for (const acc of program.accommodations[category]) {
                    if (this.isCityMatch(acc.city, city)) {
                        return acc.hotel;
                    }
                }
            }
        }

        // 2️⃣ استخدام الفنادق الافتراضية
        return this.getDefaultHotelForCity(city, category, language);
    }

    // 📝 إنشاء اسم البرنامج المحسن
    private createEnhancedProgramName(duration: number, cities: string[], language: Language): LocalizedString {
        const cityNames = cities.map(city => this.getCityLocalizedName(city));
        const cityList = cityNames.map(city => city[language] || city.en).join(' & ');

        return {
            es: `Egipto en ${duration} Días - ${cityList}`,
            en: `Egypt in ${duration} Days - ${cityList}`,
            ar: `مصر في ${duration} أيام - ${cityList}`
        };
    }

    // 📝 إنشاء وصف مختصر محسن
    private createEnhancedBriefDescription(duration: number, cities: string[], language: Language): LocalizedString {
        const cityCount = cities.length;
        const cityNames = cities.map(city => this.getCityLocalizedName(city));
        const cityList = cityNames.map(city => city[language] || city.en).join(', ');

        return {
            es: `Una experiencia única de ${duration} días explorando ${cityList}. Descubre la historia y el encanto de Egipto a través de visitas guiadas, momentos libres y paisajes inolvidables. Perfecto para quienes buscan una mezcla de cultura, descanso y descubrimiento.`,

            en: `A unique ${duration}-day experience exploring ${cityList}. Discover Egypt's history and charm through guided tours, free moments, and unforgettable scenery. Ideal for those seeking a blend of culture, relaxation, and exploration.`,

            ar: `تجربة فريدة لمدة ${duration} أيام تستكشف خلالها ${cityList}. اكتشف تاريخ مصر وسحرها من خلال الجولات المنظمة واللحظات الحرة والمناظر التي لا تُنسى. مناسبة لمن يبحث عن مزيج من الثقافة والاسترخاء والاستكشاف.`
        };

    }

    // 📝 إنشاء وصف عام محسن
    private createEnhancedGeneralDescription(duration: number, cities: string[], language: Language): LocalizedString {
        const cityNames = cities.map(city => this.getCityLocalizedName(city));
        const cityList = cityNames.map(city => city[language] || city.en).join(', ');

        return {
            es: `Una escapada fascinante a la esencia de Egipto. Durante ${duration} días, explorarás lugares emblemáticos como ${cityList}. Desde la cálida bienvenida en el aeropuerto hasta la comodidad de un hotel seleccionado, vivirás una experiencia completa que combina historia, cultura y hospitalidad egipcia. Descubre monumentos antiguos, pasea por bazares tradicionales y disfruta de momentos libres para elegir entre visitas opcionales o relajarte a tu ritmo. Una aventura que concluye con una visión más profunda del alma de Egipto.`,

            en: `A fascinating journey to the essence of Egypt. Over ${duration} days, you'll explore iconic destinations such as ${cityList}. From the warm airport welcome to the comfort of a handpicked hotel, this experience blends history, culture, and Egyptian hospitality. Discover ancient landmarks, wander through traditional bazaars, and enjoy free time to choose between optional visits or simply relaxing. An adventure that ends with a deeper connection to the spirit of Egypt.`,

            ar: `رحلة شيقة إلى جوهر مصر. على مدى ${duration} أيام، ستستكشف وجهات بارزة مثل ${cityList}. من الترحيب الدافئ في المطار إلى راحة فندق مختار بعناية، ستعيش تجربة تجمع بين التاريخ والثقافة والضيافة المصرية. ستتعرف على المعالم الأثرية القديمة، وتتجول في الأسواق التقليدية، وتستمتع بوقت حر لاختيار بين جولات اختيارية أو الاسترخاء. مغامرة تنتهي بفهم أعمق لروح مصر.`
        };
    }


    // 🎯 إنشاء الخدمات المشمولة محسنة
    private createEnhancedServicesIncluded(
        daysDistribution: { [city: string]: number },
        category: 'gold' | 'diamond',
        language: Language
    ): { es: string[]; en: string[]; ar?: string[] } {
        const services: { es: string[]; en: string[]; ar?: string[] } = {
            es: [],
            en: [],
            ar: []
        };

        // الخدمات الأساسية
        services.es.push(`Alojamiento en hoteles de categoría ${category === 'gold' ? 'dorada' : 'diamante'}`);
        services.en.push(`Accommodation in ${category} category hotels`);
        services.ar!.push(`الإقامة في فنادق فئة ${category === 'gold' ? 'ذهبية' : 'ماسية'}`);

        // إضافة الكروز إذا كان موجوداً
        if (daysDistribution.cruise) {
            services.es.push("Crucero por el Nilo de 4 noches (Luxor a Asuán)");
            services.en.push("4-night Nile cruise (Luxor to Aswan)");
            services.ar!.push("رحلة نيلية لمدة 4 ليالي (من الأقصر إلى أسوان)");
        }

        // الخدمات الإضافية
        services.es.push(
            "Asistencia a la llegada al Aeropuerto Internacional de El Cairo para trámites de visa y aduanas.",
            "Traslados privados de lujo entre todos los destinos y aeropuertos.",
            "Visitas según se menciona en el itinerario."
        );

        services.en.push(
            "Assistance upon arrival at Cairo International Airport for visa and customs procedures.",
            "Private luxury transfers between all destinations and airports.",
            "Visits as mentioned in the itinerary."
        );

        services.ar!.push(
            "المساعدة عند الوصول إلى مطار القاهرة الدولي لإجراءات التأشيرة والجمارك.",
            "انتقالات خاصة فاخرة بين جميع الوجهات والمطارات.",
            "الزيارات كما هو مذكور في البرنامج."
        );

        return services;
    }

    // 🎯 إنشاء أنشطة الموقع
    private getSiteActivity(site: SupportedSite, language: Language): string | null {
        const siteActivities: Partial<Record<SupportedSite, { es: string; en: string; ar: string }>> = {
            // القاهرة
            gizaPyramidsAndSphinx: {
                es: "Visitar las Pirámides de Giza y la Gran Esfinge",
                en: "Visit Giza Pyramids and Great Sphinx",
                ar: "زيارة أهرامات الجيزة وأبو الهول"
            },
            pyramidOfKeopsInterior: {
                es: "Entrada interior de la Pirámide de Keops",
                en: "Interior of Khufu Pyramid",
                ar: "الدخول لداخل هرم خوفو"
            },
            egyptianMuseum: {
                es: "Visitar el Museo Egipcio",
                en: "Visit Egyptian Museum",
                ar: "زيارة المتحف المصري"
            },
            grandEgyptianMuseum: {
                es: "Visitar el Gran Museo Egipcio",
                en: "Visit Grand Egyptian Museum",
                ar: "زيارة المتحف المصري الكبير"
            },
            saqqara: {
                es: "Explorar Saqqara",
                en: "Explore Saqqara",
                ar: "استكشاف سقارة"
            },
            stepPyramidOfZoser: {
                es: "Visitar la Pirámide Escalonada de Zoser",
                en: "Visit Step Pyramid of Djoser",
                ar: "زيارة هرم زوسر المدرج"
            },
            citadelOfSaladin: {
                es: "Visitar la Ciudadela de Saladino",
                en: "Visit Citadel of Saladin",
                ar: "زيارة قلعة صلاح الدين"
            },
            sultanHassanMosque: {
                es: "Visitar la Mezquita del Sultán Hassan",
                en: "Visit Sultan Hassan Mosque",
                ar: "زيارة مسجد السلطان حسن"
            },
            khanElKhalili: {
                es: "Explorar el Bazar Khan El Khalili",
                en: "Explore Khan El Khalili Bazaar",
                ar: "استكشاف خان الخليلي"
            },
            islamicArtMuseum: {
                es: "Visitar el Museo de Arte Islámico",
                en: "Visit Islamic Art Museum",
                ar: "زيارة متحف الفن الإسلامي"
            },
            copticMuseum: {
                es: "Visitar el Museo Copto",
                en: "Visit Coptic Museum",
                ar: "زيارة المتحف القبطي"
            },

            // الأقصر
            karnakTemple: {
                es: "Visitar el Templo de Karnak",
                en: "Visit Karnak Temple",
                ar: "زيارة معبد الكرنك"
            },
            luxorTemple: {
                es: "Visitar el Templo de Luxor",
                en: "Visit Luxor Temple",
                ar: "زيارة معبد الأقصر"
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
            valleyOfTheQueens: {
                es: "Visitar el Valle de las Reinas",
                en: "Visit Valley of the Queens",
                ar: "زيارة وادي الملكات"
            },
            deirElMedina: {
                es: "Explorar Deir El Medina",
                en: "Explore Deir El Medina",
                ar: "استكشاف دير المدينة"
            },
            ramesseumTemple: {
                es: "Visitar el Templo de Ramsés II",
                en: "Visit Ramesseum Temple",
                ar: "زيارة معبد الرامسيوم"
            },

            // أسوان
            philaeTemple: {
                es: "Visitar el Templo de Philae",
                en: "Visit Philae Temple",
                ar: "زيارة معبد فيلة"
            },
            highDam: {
                es: "Visitar la Presa Alta",
                en: "Visit High Dam",
                ar: "زيارة السد العالي"
            },
            unfinishedObelisk: {
                es: "Ver el Obelisco Inacabado",
                en: "See Unfinished Obelisk",
                ar: "مشاهدة المسلة الناقصة"
            },

            // الكروز
            edfuTemple: {
                es: "Visitar el Templo de Edfu",
                en: "Visit Edfu Temple",
                ar: "زيارة معبد إدفو"
            },
            komOmboTemple: {
                es: "Visitar el Templo de Kom Ombo",
                en: "Visit Kom Ombo Temple",
                ar: "زيارة معبد كوم أمبو"
            },

            // أبو سمبل
            abuSimbelTemples: {
                es: "Visitar los Templos de Abu Simbel",
                en: "Visit Abu Simbel Temples",
                ar: "زيارة معابد أبو سمبل"
            },

            // الإسكندرية
            qaitbayCitadel: {
                es: "Visitar la Ciudadela de Qaitbay",
                en: "Visit Qaitbay Citadel",
                ar: "زيارة قلعة قايتباي"
            },
            komElShoqafaCatacombs: {
                es: "Explorar las Catacumbas de Kom El Shoqafa",
                en: "Explore Kom El Shoqafa Catacombs",
                ar: "استكشاف مقابر كوم الشقافة"
            },
            alexandriaNationalMuseum: {
                es: "Visitar el Museo Nacional de Alejandría",
                en: "Visit Alexandria National Museum",
                ar: "زيارة المتحف القومي بالإسكندرية"
            },
            pompeysPillar: {
                es: "Ver la Columna de Pompeyo",
                en: "See Pompey's Pillar",
                ar: "مشاهدة عمود بومبي"
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
                gold: {
                    es: "Helnan Dreamland",
                    en: "Helnan Dreamland",
                    ar: "هيلنان دريم لاند"
                },
                diamond: {
                    es: "Fairmont Nile City",
                    en: "Fairmont Nile City",
                    ar: "فيرمونت نايل سيتي"
                }
            },
            alexandria: {
                gold: {
                    es: "Helnan Mamoura",
                    en: "Helnan Mamoura",
                    ar: "هيلنان مامورا أو ما يعادله"
                },
                diamond: {
                    es: "Helnan Mamoura",
                    en: "Helnan Mamoura",
                    ar: "هيلنان مامورا"
                }
            },
            luxor: {
                gold: {
                    es: "Steigenberger Resort Achti",
                    en: "Steigenberger Resort Achti",
                    ar: "شتايجنبرجر أختي"
                },
                diamond: {
                    es: "Steigenberger Resort Achti",
                    en: "Steigenberger Resort Achti",
                    ar: "شتايجنبرجر أختي"
                }
            },
            aswan: {
                gold: {
                    es: "Hotel en Asuán",
                    en: "Aswan Hotel",
                    ar: "فندق في أسوان"
                },
                diamond: {
                    es: "Hotel en Asuán",
                    en: "Aswan Hotel",
                    ar: "فندق في أسوان"
                }
            },
            hurghada: {
                gold: {
                    es: "Hilton Hurghada Plaza",
                    en: "Hilton Hurghada Plaza",
                    ar: "هيلتون الغردقة بلازا"
                },
                diamond: {
                    es: "Hilton Hurghada Plaza",
                    en: "Hilton Hurghada Plaza",
                    ar: "هيلتون الغردقة بلازا"
                }
            },
            matrouh: {
                gold: {
                    es: "Jaz Almaza Beach Resort",
                    en: "Jaz Almaza Beach Resort",
                    ar: "جاز ألماظة بيتش ريزورت أو ما يعادله"
                },
                diamond: {
                    es: "Jaz Almaza Beach Resort",
                    en: "Jaz Almaza Beach Resort",
                    ar: "جاز ألماظة بيتش ريزورت"
                }
            },
            siwa: {
                gold: {
                    es: "Siwa Shali Resort",
                    en: "Siwa Shali Resort",
                    ar: "سيوة شالي ريزورت"
                },
                diamond: {
                    es: "Siwa Shali Resort",
                    en: "Siwa Shali Resort",
                    ar: "سيوة شالي ريزورت"
                }
            },
            abusimbel: {
                gold: {
                    es: "Eskaleh Eco-Lodge",
                    en: "Eskaleh Eco-Lodge",
                    ar: "إسكاليه إيكو لودج"
                },
                diamond: {
                    es: "Seti Abu Simbel Lake Resort",
                    en: "Seti Abu Simbel Lake Resort",
                    ar: "ستي أبو سمبل ليك ريزورت"
                }
            }
        };

        return hotels[city as keyof typeof hotels]?.[category] || {
            es: "Hotel disponible",
            en: "Available Hotel",
            ar: "فندق متاح"
        };
    }

    // 🔍 التحقق من تطابق المدينة
    private isCityMatch(accCity: LocalizedString, city: string): boolean {
        const cityNames = this.getCityLocalizedName(city);
        return accCity.en === cityNames.en || accCity.es === cityNames.es || accCity.ar === cityNames.ar;
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
    private convertDaysToNights(daysDistribution: { [city: string]: number }): Partial<Record<SupportedCity, number>> {
        const nights: Partial<Record<SupportedCity, number>> = {};

        for (const [city, days] of Object.entries(daysDistribution)) {
            if (city === 'cruise') {
                // الكروز لا يحتاج ليالي منفصلة
                continue;
            }
            nights[city as SupportedCity] = Math.max(0, days - 1);
        }

        return nights;
    }

    // 🛫 حساب قطاعات الطيران
    private calculateFlightSectors(daysDistribution: { [city: string]: number }): number {
        let sectors = 0;

        // إضافة القطاعات حسب المدن
        if (daysDistribution.cairo) {
            sectors++;
        }
        if (daysDistribution.alexandria) {
            sectors++;
        }
        if (daysDistribution.luxor) {
            sectors++;
        }
        if (daysDistribution.aswan) {
            sectors++;
        }
        if (daysDistribution.cruise) {
            sectors++;
        }

        return sectors;
    }

    // 🎯 استخراج جميع المواقع من البرنامج اليومي
    private extractAllSitesFromItinerary(itinerary: ItineraryItem[], language: Language): SupportedSite[] {
        const sites: SupportedSite[] = [];

        for (const day of itinerary) {
            if (day.activities && day.activities[language]) {
                // تحويل النصوص إلى SupportedSite
                for (const activity of day.activities[language]) {
                    const site = this.convertActivityToSite(activity);
                    if (site && !sites.includes(site)) {
                        sites.push(site);
                    }
                }
            }
        }

        return sites;
    }

    // 🔄 تحويل النشاط إلى SupportedSite
    private convertActivityToSite(activity: string): SupportedSite | null {
        const activityToSiteMap: { [key: string]: SupportedSite } = {
            'زيارة أهرامات الجيزة والهرم الأكبر': 'gizaPyramidsAndSphinx',
            'زيارة المتحف المصري': 'egyptianMuseum',
            'استكشاف خان الخليلي': 'khanElKhalili',
            'زيارة قلعة قايتباي': 'qaitbayCitadel',
            'زيارة المتحف القومي بالإسكندرية': 'alexandriaNationalMuseum',
            'زيارة معبد الأقصر': 'luxorTemple',
            'زيارة معبد الكرنك': 'karnakTemple',
            'استكشاف وادي الملوك': 'valleyOfTheKings',
            'زيارة معبد حتشبسوت': 'hatshepsutTemple',
            'زيارة معبد فيلة': 'philaeTemple',
            'زيارة معبد إدفو المخصص للإله حورس': 'edfuTemple',
            'زيارة معبد كوم أمبو المخصص للإله سوبك وحورس': 'komOmboTemple',
            'زيارة معبد فيلة المخصص للإلهة إيزيس': 'philaeTemple',
            'Visit Giza Pyramids and Great Sphinx': 'gizaPyramidsAndSphinx',
            'Visit Egyptian Museum': 'egyptianMuseum',
            'Explore Khan El Khalili Bazaar': 'khanElKhalili',
            'Visit Qaitbay Citadel': 'qaitbayCitadel',
            'Visit Alexandria National Museum': 'alexandriaNationalMuseum',
            'Visit Luxor Temple': 'luxorTemple',
            'Visit Karnak Temple': 'karnakTemple',
            'Explore Valley of the Kings': 'valleyOfTheKings',
            'Visit Hatshepsut Temple': 'hatshepsutTemple',
            'Visit Philae Temple': 'philaeTemple',
            'Visitar las Pirámides de Giza y la Gran Esfinge': 'gizaPyramidsAndSphinx',
            'Visitar el Museo Egipcio': 'egyptianMuseum',
            'Explorar el Bazar Khan El Khalili': 'khanElKhalili',
            'Visitar la Ciudadela de Qaitbay': 'qaitbayCitadel',
            'Visitar el Museo Nacional de Alejandría': 'alexandriaNationalMuseum',
            'Visitar el Templo de Luxor': 'luxorTemple',
            'Visitar el Templo de Karnak': 'karnakTemple',
            'Explorar el Valle de los Reyes': 'valleyOfTheKings',
            'Visitar el Templo de Hatshepsut': 'hatshepsutTemple',
            'Visitar el Templo de Philae': 'philaeTemple'
        };

        return activityToSiteMap[activity] || null;
    }

    // 🏠 إنشاء يوم الوصول
    private createArrivalDay(language: Language): ItineraryItem {
        return {
            day: 1,
            title: {
                "es": "Llegada a El Cairo – Una Gran Bienvenida",
                "en": "Arrival in Cairo – A Grand Welcome",
                "ar": "الوصول إلى القاهرة – ترحيب حار"
            },
            activities: {
                es: [
                    "A su llegada al Aeropuerto Internacional de El Cairo, disfrute de una cálida bienvenida.",
                    "Nuestro equipo estará esperando para ayudarle con los trámites de visa y aduanas, garantizando un proceso rápido y sin problemas.",
                    "Relájese con refrescos antes de ser trasladado a su hotel.",
                    "Un lujoso vehículo privado lo llevará a su hotel, donde será recibido con un servicio de check-in personalizado.",
                    "En su elegante habitación, podrá relajarse después del viaje y disfrutar de una tranquila primera noche en El Cairo."
                ],
                en: [
                    "Upon your arrival at Cairo International Airport, enjoy a warm welcome.",
                    "Our team will be waiting to assist you with visa and customs procedures, ensuring a fast and smooth process.",
                    "Relax with refreshments before being transferred to your hotel.",
                    "A luxurious private vehicle will take you to your hotel, where you will be welcomed with personalized check-in service.",
                    "In your elegant room, you can unwind after the journey and enjoy a peaceful first night in Cairo."
                ],
                ar: [
                    "عند وصولك إلى مطار القاهرة الدولي، استمتع بترحيب حار.",
                    "سيكون فريقنا في انتظارك لمساعدتك في إجراءات التأشيرة والجمارك، مما يضمن عملية سريعة وسلسة.",
                    "استرخِ مع المشروبات المنعشة قبل نقللك إلى فندقك.",
                    "ستنقلك سيارة فاخرة خاصة إلى فندقك، حيث سيتم استقبالك بخدمة تسجيل وصول شخصية.",
                    "في غرفتك الأنيقة، يمكنك الاسترخاء بعد الرحلة والاستمتاع بليلة أولى هادئة في القاهرة."
                ]
            }
        };
    }

    // 🛫 إنشاء يوم المغادرة
    private createDepartureDay(totalDuration: number, language: Language): ItineraryItem {
        return {
            day: totalDuration,
            title: {
                es: "Despedida de El Cairo",
                en: "Farewell to Cairo",
                ar: "وداع القاهرة"
            },
            activities: {
                es: [
                    "Después de un delicioso desayuno bufé en su hotel, será trasladado en un vehículo privado al Aeropuerto Internacional de El Cairo.",
                    "Nuestro equipo se asegurará de que su partida sea tan fluida como su llegada, asistiéndole en cada paso del camino para garantizar un viaje a casa sin complicaciones.",
                    "Fin de nuestros servicios."
                ],
                en: [
                    "After a delicious buffet breakfast at your hotel, you will be transferred in a private vehicle to Cairo International Airport.",
                    "Our team will ensure that your departure is as smooth as your arrival, assisting you every step of the way to guarantee a hassle-free journey home.",
                    "End of our services."
                ],
                ar: [
                    "بعد إفطار بوفيه لذيذ في فندقك، سيتم نقلك بسيارة خاصة إلى مطار القاهرة الدولي.",
                    "سيتأكد فريقنا من أن مغادرتك سلسة مثل وصولك، مساعدتك في كل خطوة على الطريق لضمان رحلة عودة خالية من المتاعب.",
                    "نهاية خدماتنا."
                ]
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

        console.log('[Intelligent] Creating custom program:', { duration, destinations });

        // ✅ استخدام النظام المحسّن مباشرة
        return this.createEnhancedCustomProgram({
            duration,
            travelers,
            cities: destinations,
            season,
            category,
            language
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

    // 🗺️ الحصول على المواقع المتاحة للمدن
    getAvailableSitesForCities(cities: string[]): { [city: string]: SupportedSite[] } {
        const result: { [city: string]: SupportedSite[] } = {};

        for (const city of cities) {
            result[city] = this.getAvailableSitesForCity(city);
        }

        return result;
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

    public convertProgramToQuoteParams(program: Program): CustomQuoteParams {
        console.log('[Pricing] Converting program to quote params:', program.id);

        // ✅ استخراج الليالي من accommodations
        const nights: Partial<Record<SupportedCity, number>> = {};

        if (program.accommodations && program.quoteParams?.category) {
            const category = program.quoteParams.category;
            const accs = program.accommodations[category];

            if (accs && Array.isArray(accs)) {
                for (const acc of accs) {
                    // ✅ التعامل مع cruise
                    if ((acc as any).type === 'cruise') {
                        nights.cruise = (acc as any).nights || 4;
                    } else {
                        // ✅ تحديد المدينة من city
                        const city = this.getCityFromAccommodation(acc.city);
                        if (city) {
                            // ✅ حساب الليالي من duration البرنامج وتوزيع الأيام
                            // لو مفيش nights، نحسبها من itinerary
                            const nightsInCity = (acc as any).nights || this.calculateNightsFromItinerary(program, city);
                            nights[city] = nightsInCity;
                        }
                    }
                }
            }
        }

        // ✅ Fallback: لو مفيش accommodations، نستخرج من itinerary
        if (Object.keys(nights).length === 0 && program.itinerary) {
            const cityNights = this.extractNightsFromItinerary(program.itinerary);
            Object.assign(nights, cityNights);
        }

        // ✅ استخراج المزارات من الـ itinerary
        const sites: SupportedSite[] = [];
        const sitesGroupedByDay: any[] = [];

        if (program.itinerary) {
            program.itinerary.forEach((day, index) => {
                const daySites: SupportedSite[] = [];

                // استخراج المزارات من activities
                if (day.activities) {
                    const activities = day.activities.en || day.activities.es || day.activities.ar || [];

                    activities.forEach(activity => {
                        const site = this.convertActivityToSite(activity);
                        if (site) {
                            daySites.push(site);
                            if (!sites.includes(site)) {
                                sites.push(site);
                            }
                        }
                    });
                }

                // تحديد المدينة من عنوان اليوم
                const city = this.detectCityFromDay(day);

                sitesGroupedByDay.push({
                    day: day.day,
                    city: city || undefined,
                    sites: daySites
                });
            });
        }

        // ✅ حساب قطاعات الطيران
        const flightSectors = this.calculateFlightSectors(
            Object.keys(nights).reduce((acc, city) => {
                acc[city] = nights[city as SupportedCity] || 0;
                return acc;
            }, {} as { [city: string]: number })
        );

        // ✅ حساب خدمات النقل
        const transportServices = this.generateTransportServices(program, nights);

        // ✅ حساب أيام المرشد (كل يوم فيه مزارات)
        const guidedDays = sitesGroupedByDay.filter(d => d.sites.length > 0).length;

        return {
            travelers: program.quoteParams?.travelers || 2,
            duration: program.duration.days,
            season: program.quoteParams?.season || 'winter',
            category: program.quoteParams?.category || 'gold',
            itineraryPlan: {
                nights,
                sites,
                sitesGroupedByDay,
                flightSectors
            },
            transportServices,
            guidedDays,
            cairoArrivalRepresentative: true,
            cairoDepartureRepresentative: true,
            optionalLunches: Math.max(0, program.duration.days - 2) // كل الأيام ما عدا الوصول والمغادرة
        };
    }


    private getCityFromAccommodation(cityName: LocalizedString): SupportedCity | null {
        const name = (cityName.en || cityName.es || cityName.ar || '').toLowerCase();

        const cityMap: Record<string, SupportedCity> = {
            'cairo': 'cairo',
            'el cairo': 'cairo',
            'القاهرة': 'cairo',
            'alexandria': 'alexandria',
            'alejandría': 'alexandria',
            'الإسكندرية': 'alexandria',
            'luxor': 'luxor',
            'الأقصر': 'luxor',
            'aswan': 'aswan',
            'asuán': 'aswan',
            'أسوان': 'aswan',
            'hurghada': 'hurghada',
            'الغردقة': 'hurghada',
            'sharm': 'sharmElSheikh',
            'شرم': 'sharmElSheikh'
        };

        for (const [key, city] of Object.entries(cityMap)) {
            if (name.includes(key)) {
                return city;
            }
        }

        return null;
    }

    private calculateNightsFromItinerary(program: Program, city: SupportedCity): number {
        if (!program.itinerary) return 0;

        let daysInCity = 0;

        for (const day of program.itinerary) {
            const detectedCity = this.detectCityFromDay(day);
            if (detectedCity === city) {
                daysInCity++;
            }
        }

        // الليالي = الأيام - 1 (إلا لو كان يوم واحد)
        return Math.max(0, daysInCity - 1);
    }
    private extractNightsFromItinerary(itinerary: ItineraryItem[]): Partial<Record<SupportedCity, number>> {
        const cityDays: Partial<Record<SupportedCity | 'cruise', number>> = {};

        for (const day of itinerary) {
            const city = this.detectCityFromDay(day);
            if (city) {
                cityDays[city] = (cityDays[city] || 0) + 1;
            }
        }

        // تحويل الأيام لليالي
        const nights: Partial<Record<SupportedCity, number>> = {};
        for (const [city, days] of Object.entries(cityDays)) {
            if (city === 'cruise') {
                // الكروز: عدد الليالي = الأيام
                nights.cruise = days;
            } else {
                // المدن: الليالي = الأيام - 1
                nights[city as SupportedCity] = Math.max(0, (days || 0) - 1);
            }
        }

        return nights;
    }

    /**
     * 🚗 إنشاء خدمات النقل بناءً على البرنامج
     */
    private generateTransportServices(
        program: Program,
        nights: Partial<Record<SupportedCity, number>>
    ): TransportService[] {
        const services: TransportService[] = [];
        const travelers = program.quoteParams?.travelers || 2;

        // ✅ مطار القاهرة (وصول)
        services.push({
            city: 'cairo',
            type: 'airport',
            quantity: 1
        });

        // ✅ أيام كاملة في كل مدينة
        for (const [city, nightsCount] of Object.entries(nights)) {
            if (city === 'cruise') continue;

            const fullDays = nightsCount || 0;
            if (fullDays > 0) {
                services.push({
                    city: city as SupportedCity,
                    type: 'fullDay',
                    quantity: fullDays
                });
            }
        }

        // ✅ النقل بين المدن
        const cities = Object.keys(nights).filter(c => c !== 'cruise');
        for (let i = 0; i < cities.length - 1; i++) {
            const from = cities[i] as SupportedCity;
            const to = cities[i + 1] as SupportedCity;

            if (from && to && from !== to) {
                services.push({
                    city: from,
                    type: 'intercity',
                    toCity: to,
                    quantity: 1
                });
            }
        }

        // ✅ مطار القاهرة (مغادرة)
        services.push({
            city: 'cairo',
            type: 'airport',
            quantity: 1
        });

        return services;
    }

    /**
     * 💰 حساب السعر الكامل للبرنامج المحسّن
     */
    public calculateProgramPrice(program: Program): {
        quoteParams: CustomQuoteParams;
        pricing: any;
    } {
        const quoteParams = this.convertProgramToQuoteParams(program);

        const pricing = calculateRealPricing(quoteParams);

        return {
            quoteParams,
            pricing: null // هيتحط من برّا
        };
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

export function createAutoProgram(request: {
    duration: number;
    travelers: number;
    cities: string[];
    season: 'summer' | 'winter';
    category: 'gold' | 'diamond';
    language: Language;
}): Program {
    const extractor = new IntelligentDataExtractor();
    return extractor.createAutoProgram(request);
}

export function getAvailableSitesForCities(cities: string[]): { [city: string]: SupportedSite[] } {
    const extractor = new IntelligentDataExtractor();
    return extractor.getAvailableSitesForCities(cities);
}

export function calculateEnhancedProgramPrice(request: {
    duration: number;
    travelers: number;
    cities: string[];
    specificSites?: { [city: string]: SupportedSite[] };
    season: 'summer' | 'winter';
    category: 'gold' | 'diamond';
    language: Language;
}): {
    program: Program;
    quoteParams: CustomQuoteParams;
} {
    const extractor = new IntelligentDataExtractor();

    // ✅ إنشاء البرنامج
    const program = extractor.createEnhancedCustomProgram(request);

    // ✅ تحويله لـ quote params للتسعير
    const quoteParams = extractor.convertProgramToQuoteParams(program);

    return {
        program,
        quoteParams
    };
}

// تصدير المواقع المتاحة للاستخدام الخارجي
export { AVAILABLE_SITES };