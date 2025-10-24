import type { Program, ItineraryItem, CustomQuoteParams, SupportedSite, SupportedCity, LocalizedString } from './types';
import { knowledgeBase } from './services/knowledgeBase';
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
    abuSimbel: [
        'abuSimbelTemples',
        'sunFestivalAbuSimbel'
    ],
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

// 🎨 أنشطة تفصيلية لكل مدينة (Story-like activities)
const DETAILED_CITY_ACTIVITIES = {
    cairo: {
        day1: {
            es: [
                "Comenzamos nuestro viaje explorando las majestuosas Pirámides de Giza, una de las Siete Maravillas del Mundo Antiguo",
                "Contemplamos la enigmática Gran Esfinge, guardiana milenaria de los secretos faraónicos",
                "Visitamos el Templo del Valle, donde se realizaban los rituales de momificación de los faraones",
                "Tiempo libre para explorar el área y capturar fotografías memorables",
                "Almuerzo en restaurante local con vistas panorámicas a las pirámides"
            ],
            en: [
                "We begin our journey exploring the majestic Pyramids of Giza, one of the Seven Wonders of the Ancient World",
                "Contemplate the enigmatic Great Sphinx, millennial guardian of pharaonic secrets",
                "Visit the Valley Temple, where the mummification rituals of the pharaohs took place",
                "Free time to explore the area and capture memorable photographs",
                "Lunch at local restaurant with panoramic views of the pyramids"
            ],
            ar: [
                "نبدأ رحلتنا باستكشاف أهرامات الجيزة المهيبة، إحدى عجائب الدنيا السبع في العالم القديم",
                "نتأمل تمثال أبو الهول الغامض، الحارس الألفي لأسرار الفراعنة",
                "نزور معبد الوادي، حيث كانت تُجرى طقوس التحنيط للفراعنة",
                "وقت حر لاستكشاف المنطقة والتقاط الصور التذكارية",
                "الغداء في مطعم محلي مع إطلالة بانورامية على الأهرامات"
            ]
        },
        day2: {
            es: [
                "Visitamos el Museo Egipcio en la Plaza Tahrir, hogar de la mayor colección de antigüedades faraónicas del mundo",
                "Admiramos los tesoros de Tutankamón, incluyendo su famosa máscara de oro macizo",
                "Exploramos la Sala de las Momias Reales, donde descansan los grandes faraones de Egipto",
                "Paseamos por el histórico Bazar Khan El Khalili, el mercado más antiguo de El Cairo",
                "Tiempo libre para compras y degustar el té tradicional egipcio en un café local",
                "Cena opcional con espectáculo de danza del vientre y música tradicional"
            ],
            en: [
                "Visit the Egyptian Museum in Tahrir Square, home to the world's largest collection of pharaonic antiquities",
                "Admire the treasures of Tutankhamun, including his famous solid gold mask",
                "Explore the Royal Mummies Hall, where the great pharaohs of Egypt rest",
                "Stroll through the historic Khan El Khalili Bazaar, Cairo's oldest market",
                "Free time for shopping and tasting traditional Egyptian tea at a local café",
                "Optional dinner with belly dance show and traditional music"
            ],
            ar: [
                "نزور المتحف المصري في ميدان التحرير، موطن أكبر مجموعة من الآثار الفرعونية في العالم",
                "نشاهد كنوز توت عنخ آمون، بما في ذلك قناعه الذهبي الشهير",
                "نستكشف قاعة المومياوات الملكية، حيث يستريح عظماء فراعنة مصر",
                "نتجول في خان الخليلي التاريخي، أقدم سوق في القاهرة",
                "وقت حر للتسوق وتذوق الشاي المصري التقليدي في مقهى محلي",
                "عشاء اختياري مع عرض رقص شرقي وموسيقى تقليدية"
            ]
        },
        day3: {
            es: [
                "Exploramos la necrópolis de Saqqara, el cementerio más antiguo de Egipto",
                "Visitamos la Pirámide Escalonada de Zoser, la primera pirámide construida en piedra",
                "Descubrimos las mastabas bellamente decoradas de los nobles del Reino Antiguo",
                "Visitamos Memphis, la antigua capital de Egipto, y su museo al aire libre",
                "Admiramos la estatua colosal de Ramsés II y la enigmática Esfinge de Alabastro",
                "Continuamos a Dahshur para ver las pirámides de Snefru: la Pirámide Roja y la Pirámide Acodada"
            ],
            en: [
                "Explore the Saqqara necropolis, Egypt's oldest cemetery",
                "Visit the Step Pyramid of Djoser, the first pyramid built in stone",
                "Discover the beautifully decorated mastabas of Old Kingdom nobles",
                "Visit Memphis, the ancient capital of Egypt, and its open-air museum",
                "Admire the colossal statue of Ramses II and the enigmatic Alabaster Sphinx",
                "Continue to Dahshur to see Snefru's pyramids: the Red Pyramid and the Bent Pyramid"
            ],
            ar: [
                "نستكشف مقابر سقارة، أقدم مقبرة في مصر",
                "نزور هرم زوسر المدرج، أول هرم بُني من الحجر",
                "نكتشف المصاطب المزينة بشكل جميل للنبلاء من عصر المملكة القديمة",
                "نزور ممفيس، العاصمة القديمة لمصر، ومتحفها المفتوح",
                "نشاهد تمثال رمسيس الثاني الضخم وأبو الهول المرمر الغامض",
                "نواصل إلى دهشور لمشاهدة أهرامات سنفرو: الهرم الأحمر والهرم المنحني"
            ]
        },
        day4: {
            es: [
                "Visitamos la Ciudadela de Saladino, fortaleza medieval que domina la ciudad",
                "Exploramos la magnífica Mezquita de Muhammad Ali, conocida como la Mezquita de Alabastro",
                "Descubrimos el Cairo Copto, visitando la Iglesia Colgante y la Iglesia de San Sergio",
                "Visitamos la Sinagoga Ben Ezra, uno de los lugares más sagrados del judaísmo",
                "Paseamos por la histórica calle Al-Muizz, repleta de monumentos islámicos",
                "Disfrutamos de un crucero por el Nilo al atardecer con cena buffet opcional"
            ],
            en: [
                "Visit the Citadel of Saladin, medieval fortress overlooking the city",
                "Explore the magnificent Muhammad Ali Mosque, known as the Alabaster Mosque",
                "Discover Coptic Cairo, visiting the Hanging Church and the Church of St. Sergius",
                "Visit Ben Ezra Synagogue, one of Judaism's most sacred places",
                "Stroll along the historic Al-Muizz Street, filled with Islamic monuments",
                "Enjoy a Nile cruise at sunset with optional buffet dinner"
            ],
            ar: [
                "نزور قلعة صلاح الدين الأيوبي، الحصن الذي يطل على المدينة",
                "نستكشف مسجد محمد علي الرائع، المعروف بمسجد المرمر",
                "نكتشف القاهرة القبطية، بزيارة الكنيسة المعلقة وكنيسة مار جرجس",
                "نزور معبد بن عزرا، أحد أقدس الأماكن في اليهودية",
                "نتجول في شارع المعز التاريخي، المليء بالآثار الإسلامية",
                "نستمتع برحلة نيلية عند الغروب مع عشاء بوفيه اختياري"
            ]
        }
    },
    alexandria: {
        day1: {
            es: [
                "Comenzamos nuestra exploración de Alejandría visitando la Ciudadela de Qaitbay, construida sobre las ruinas del antiguo Faro de Alejandría",
                "Disfrutamos de las vistas panorámicas del Mar Mediterráneo desde las murallas de la fortaleza",
                "Paseamos por la Corniche, el hermoso paseo marítimo de la ciudad",
                "Visitamos la moderna Biblioteca Alexandrina, heredera de la legendaria biblioteca antigua",
                "Almuerzo de mariscos frescos en restaurante con vista al mar",
                "Tiempo libre para explorar el barrio de Anfushi y sus mercados de pescado"
            ],
            en: [
                "Begin our Alexandria exploration visiting Qaitbay Citadel, built on the ruins of the ancient Lighthouse of Alexandria",
                "Enjoy panoramic views of the Mediterranean Sea from the fortress walls",
                "Walk along the Corniche, the city's beautiful seafront promenade",
                "Visit the modern Bibliotheca Alexandrina, heir to the legendary ancient library",
                "Lunch of fresh seafood at restaurant overlooking the sea",
                "Free time to explore the Anfushi neighborhood and its fish markets"
            ],
            ar: [
                "نبدأ استكشافنا للإسكندرية بزيارة قلعة قايتباي، المبنية على أنقاض منارة الإسكندرية القديمة",
                "نستمتع بالمناظر البانورامية للبحر الأبيض المتوسط من أسوار القلعة",
                "نتجول على الكورنيش، الممشى البحري الجميل للمدينة",
                "نزور مكتبة الإسكندرية الحديثة، وريثة المكتبة القديمة الأسطورية",
                "غداء من المأكولات البحرية الطازجة في مطعم مطل على البحر",
                "وقت حر لاستكشاف حي الأنفوشي وأسواق السمك"
            ]
        },
        day2: {
            es: [
                "Visitamos las Catacumbas de Kom El Shoqafa, el sitio funerario más grande de Egipto",
                "Exploramos este fascinante laberinto subterráneo que combina estilos egipcio, griego y romano",
                "Visitamos la Columna de Pompeyo, el monumento más alto de la ciudad",
                "Descubrimos el Anfiteatro Romano de Kom El Dikka, único en Egipto",
                "Visitamos el Museo Nacional de Alejandría, con artefactos que narran la historia de la ciudad",
                "Tarde libre para pasear por las playas de la ciudad o visitar sus cafés históricos"
            ],
            en: [
                "Visit the Catacombs of Kom El Shoqafa, Egypt's largest burial site",
                "Explore this fascinating underground labyrinth combining Egyptian, Greek and Roman styles",
                "Visit Pompey's Pillar, the city's tallest monument",
                "Discover the Roman Amphitheater of Kom El Dikka, unique in Egypt",
                "Visit the Alexandria National Museum, with artifacts narrating the city's history",
                "Afternoon free to stroll the city's beaches or visit its historic cafés"
            ],
            ar: [
                "نزور سراديب كوم الشقافة، أكبر موقع للدفن في مصر",
                "نستكشف هذا المتاهة الرائعة تحت الأرض التي تجمع بين الأساليب المصرية واليونانية والرومانية",
                "نزور عمود السواري، أطول نصب تذكاري في المدينة",
                "نكتشف المدرج الروماني في كوم الدكة، الوحيد في مصر",
                "نزور المتحف الوطني بالإسكندرية، مع قطع أثرية تروي تاريخ المدينة",
                "بعد الظهر حر للتنزه على شواطئ المدينة أو زيارة مقاهيها التاريخية"
            ]
        },
        day3: {
            es: [
                "Visitamos el Palacio de Montazah, antigua residencia veraniega de la familia real egipcia",
                "Paseamos por sus magníficos jardines con vistas al Mediterráneo",
                "Visitamos el Museo de Joyas Reales en el Palacio de Gleem",
                "Admiramos la impresionante colección de joyas de la familia real de Muhammad Ali",
                "Exploramos el barrio de Stanley con su famoso puente",
                "Tiempo libre para disfrutar de la playa o visitar los mercados locales",
                "Cena opcional de mariscos en uno de los restaurantes tradicionales del puerto"
            ],
            en: [
                "Visit Montazah Palace, former summer residence of the Egyptian royal family",
                "Stroll through its magnificent gardens overlooking the Mediterranean",
                "Visit the Royal Jewelry Museum in Gleem Palace",
                "Admire the impressive jewelry collection of Muhammad Ali's royal family",
                "Explore the Stanley neighborhood with its famous bridge",
                "Free time to enjoy the beach or visit local markets",
                "Optional seafood dinner at one of the traditional harbor restaurants"
            ],
            ar: [
                "نزور قصر المنتزه، المقر الصيفي السابق للعائلة المالكة المصرية",
                "نتجول في حدائقه الرائعة المطلة على البحر الأبيض المتوسط",
                "نزور متحف المجوهرات الملكية في قصر جليم",
                "نشاهد مجموعة المجوهرات المذهلة للعائلة المالكة لمحمد علي",
                "نستكشف حي ستانلي مع جسره الشهير",
                "وقت حر للاستمتاع بالشاطئ أو زيارة الأسواق المحلية",
                "عشاء اختياري من المأكولات البحرية في أحد مطاعم الميناء التقليدية"
            ]
        },
        day4: {
            es: [
                "Excursión opcional a El Alamein para visitar los cementerios de guerra y el museo militar",
                "Alternativa: día libre en Alejandría para actividades personales",
                "Visita opcional al Acuario de Alejandría y al Museo Hidrobiológico",
                "Tiempo para compras en los centros comerciales modernos o mercados tradicionales",
                "Última tarde para disfrutar de la cocina alejandrina en restaurantes locales",
                "Preparación para el regreso con recuerdos inolvidables de esta ciudad mediterránea"
            ],
            en: [
                "Optional excursion to El Alamein to visit war cemeteries and military museum",
                "Alternative: free day in Alexandria for personal activities",
                "Optional visit to Alexandria Aquarium and Hydrobiological Museum",
                "Time for shopping in modern malls or traditional markets",
                "Last afternoon to enjoy Alexandrian cuisine at local restaurants",
                "Preparation for return with unforgettable memories of this Mediterranean city"
            ],
            ar: [
                "رحلة اختيارية إلى العلمين لزيارة مقابر الحرب والمتحف العسكري",
                "بديل: يوم حر في الإسكندرية للأنشطة الشخصية",
                "زيارة اختيارية لأكواريوم الإسكندرية والمتحف الهيدروبيولوجي",
                "وقت للتسوق في مراكز التسوق الحديثة أو الأسواق التقليدية",
                "بعد ظهر أخير للاستمتاع بالمطبخ السكندري في المطاعم المحلية",
                "الاستعداد للعودة مع ذكريات لا تُنسى من هذه المدينة المتوسطية"
            ]
        }
    }
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
        
        // ✅ حساب توزيع الأيام بشكل صحيح
        const daysDistribution = this.calculateDaysDistribution(duration, cities);
        
        console.log('[Enhanced] Days distribution:', daysDistribution);
        
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

    // 📊 حساب توزيع الأيام بشكل ذكي مع دعم ترتيب المدن - ✅ FIXED
    private calculateDaysDistribution(duration: number, cities: string[]): { [city: string]: number } {
        const distribution: { [city: string]: number } = {};
        
        // ✅ إجمالي الأيام المتاحة للأنشطة (بدون يوم الوصول والمغادرة)
        const totalActivityDays = duration - 2;
        
        console.log(`[Days Calc] Total duration: ${duration}, Activity days: ${totalActivityDays}`);
        
        // تحديد نوع الكروز المطلوب
        const hasLuxor = cities.includes('luxor');
        const hasAswan = cities.includes('aswan');
        const hasCruise = hasLuxor && hasAswan;
        
        // حساب أيام الكروز
        let cruiseDays = 0;
        if (hasCruise) {
            cruiseDays = 5; // 4 ليالي = 5 أيام
        }
        
        // ✅ حساب الأيام المتاحة للمدن الأخرى
        const remainingDays = totalActivityDays - cruiseDays;
        
        console.log(`[Days Calc] Cruise days: ${cruiseDays}, Remaining days: ${remainingDays}`);
        
        // توزيع الأيام حسب ترتيب المدن في الطلب
        let daysLeft = remainingDays;
        const nonCruiseCities = cities.filter(city => city !== 'luxor' && city !== 'aswan');
        
        for (let i = 0; i < nonCruiseCities.length; i++) {
            const city = nonCruiseCities[i];
            
            if (daysLeft > 0) {
                // ✅ توزيع الأيام بالتساوي أو حسب الأولوية
                let cityDays: number;
                
                if (nonCruiseCities.length === 1) {
                    // مدينة واحدة فقط = كل الأيام المتبقية
                    cityDays = daysLeft;
                } else if (i === nonCruiseCities.length - 1) {
                    // آخر مدينة = كل ما تبقى
                    cityDays = daysLeft;
                } else {
                    // توزيع متساوٍ مع إعطاء القاهرة أولوية أكبر
                    const isFirstCity = i === 0;
                    const baseDays = Math.floor(remainingDays / nonCruiseCities.length);
                    cityDays = isFirstCity ? Math.ceil(remainingDays / nonCruiseCities.length) : baseDays;
                    cityDays = Math.min(cityDays, daysLeft);
                }
                
                distribution[city] = cityDays;
                daysLeft -= cityDays;
                
                console.log(`[Days Calc] ${city}: ${cityDays} days, Remaining: ${daysLeft}`);
            }
        }
        
        // إضافة أيام الكروز
        if (hasCruise) {
            distribution.cruise = cruiseDays;
        }
        
        console.log('[Days Calc] Final distribution:', distribution);
        return distribution;
    }

    // 🗺️ إنشاء برنامج يومي محسن مع دعم ترتيب المدن والكروز - ✅ FIXED
    private createEnhancedItinerary(
        daysDistribution: { [city: string]: number },
        specificSites: { [city: string]: SupportedSite[] },
        language: Language,
        totalDuration: number
    ): ItineraryItem[] {
        const itinerary: ItineraryItem[] = [];
        let currentDay = 1;
        
        // ✅ يوم 1: الوصول
        itinerary.push(this.createArrivalDay(language));
        currentDay++;
        
        // ترتيب المدن حسب الطلب: القاهرة → الإسكندرية → الكروز
        const orderedCities = this.getOrderedCities(daysDistribution);
        
        console.log('[Itinerary] Ordered cities:', orderedCities);
        
        for (const city of orderedCities) {
            const days = daysDistribution[city];
            if (days > 0) {
                console.log(`[Itinerary] Creating ${days} days for ${city}, starting from day ${currentDay}`);
                
                if (city === 'cruise') {
                    // إنشاء أيام الكروز
                    const cruiseDays = this.createCruiseDays(specificSites, language, currentDay);
                    itinerary.push(...cruiseDays);
                    currentDay += days;
                } else {
                    // ✅ إنشاء أيام المدن العادية بأنشطة تفصيلية
                    const cityDays = this.createDetailedCityDays(city, days, specificSites[city] || [], language, currentDay);
                    itinerary.push(...cityDays);
                    currentDay += days;
                }
            }
        }
        
        // ✅ آخر يوم: المغادرة
        itinerary.push(this.createDepartureDay(totalDuration, language));
        
        console.log(`[Itinerary] Total days created: ${itinerary.length} (Expected: ${totalDuration})`);
        
        return itinerary;
    }

    // 🏙️ إنشاء أيام مدينة مفصلة بأنشطة قصصية - ✅ NEW
    private createDetailedCityDays(
        city: string, 
        days: number, 
        specificSites: SupportedSite[], 
        language: Language, 
        startDay: number
    ): ItineraryItem[] {
        const cityDays: ItineraryItem[] = [];
        
        console.log(`[Detailed Days] Creating ${days} days for ${city} starting from day ${startDay}`);
        
        // الحصول على الأنشطة التفصيلية من DETAILED_CITY_ACTIVITIES
        const cityActivities = DETAILED_CITY_ACTIVITIES[city as keyof typeof DETAILED_CITY_ACTIVITIES];
        
        for (let i = 0; i < days; i++) {
            const dayNumber = startDay + i;
            const dayInCity = i + 1;
            
            // ✅ استخدام الأنشطة التفصيلية إذا كانت متاحة
            let dayActivities: { es: string[]; en: string[]; ar: string[] };
            
            if (cityActivities) {
                const dayKey = `day${dayInCity}` as keyof typeof cityActivities;
                const detailedActivities = cityActivities[dayKey];
                
                if (detailedActivities) {
                    dayActivities = {
                        es: detailedActivities.es,
                        en: detailedActivities.en,
                        ar: detailedActivities.ar
                    };
                } else {
                    // استخدام أنشطة عامة إذا لم تكن متاحة
                    dayActivities = this.createGenericDayActivities(city, specificSites, language, dayInCity);
                }
            } else {
                // استخدام أنشطة عامة إذا لم تكن متاحة
                dayActivities = this.createGenericDayActivities(city, specificSites, language, dayInCity);
            }
            
            const dayTitle = this.createDayTitle(city, dayInCity, days, language);
            
            cityDays.push({
                day: dayNumber,
                title: dayTitle,
                activities: dayActivities
            });
            
            console.log(`[Detailed Days] Created day ${dayNumber} (Day ${dayInCity} in ${city})`);
        }
        
        return cityDays;
    }

    // 🎯 إنشاء أنشطة عامة للأيام التي ليس لها أنشطة تفصيلية
    private createGenericDayActivities(
        city: string, 
        specificSites: SupportedSite[], 
        language: Language,
        dayInCity: number
    ): { es: string[]; en: string[]; ar: string[] } {
        const activities: { es: string[]; en: string[]; ar: string[] } = {
            es: [],
            en: [],
            ar: []
        };
        
        const cityName = this.getCityLocalizedName(city);
        
        // إضافة نشاط الصباح
        activities.es.push(`Desayuno en el hotel y preparación para el día de exploración en ${cityName.es}`);
        activities.en.push(`Breakfast at hotel and preparation for exploration day in ${cityName.en}`);
        activities.ar.push(`الإفطار في الفندق والاستعداد ليوم الاستكشاف في ${cityName.ar}`);
        
        // إضافة أنشطة المواقع المحددة
        if (specificSites && specificSites.length > 0) {
            const sitesForThisDay = this.selectSitesForDay(specificSites, dayInCity - 1, Math.ceil(specificSites.length / 3));
            
            for (const site of sitesForThisDay) {
                const siteActivity = this.getDetailedSiteActivity(site, language);
                if (siteActivity) {
                    activities.es.push(siteActivity.es);
                    activities.en.push(siteActivity.en);
                    activities.ar.push(siteActivity.ar);
                }
            }
        } else {
            // أنشطة عامة إذا لم يتم تحديد مواقع
            activities.es.push(`Exploramos los principales atractivos turísticos de ${cityName.es}`);
            activities.en.push(`Explore the main tourist attractions of ${cityName.en}`);
            activities.ar.push(`استكشاف المعالم السياحية الرئيسية في ${cityName.ar}`);
        }
        
        // إضافة نشاط الغداء
        activities.es.push("Almuerzo en restaurante local con especialidades de la región");
        activities.en.push("Lunch at local restaurant featuring regional specialties");
        activities.ar.push("الغداء في مطعم محلي مع الأطباق الإقليمية");
        
        // إضافة نشاط المساء
        activities.es.push(`Tiempo libre para explorar ${cityName.es} por cuenta propia o relajarse en el hotel`);
        activities.en.push(`Free time to explore ${cityName.en} on your own or relax at the hotel`);
        activities.ar.push(`وقت حر لاستكشاف ${cityName.ar} بنفسك أو الاسترخاء في الفندق`);
        
        return activities;
    }

    // 🎯 نشاط موقع مفصل بدلاً من سطر واحد
    private getDetailedSiteActivity(site: SupportedSite, language: Language): { es: string; en: string; ar: string } | null {
        const detailedActivities: { [key: string]: { es: string; en: string; ar: string } } = {
            gizaPyramidsAndSphinx: {
                es: "Visitamos las majestuosas Pirámides de Giza y la Gran Esfinge, contemplando una de las Siete Maravillas del Mundo Antiguo",
                en: "Visit the majestic Pyramids of Giza and the Great Sphinx, contemplating one of the Seven Wonders of the Ancient World",
                ar: "نزور أهرامات الجيزة المهيبة وأبو الهول العظيم، ونتأمل إحدى عجائب الدنيا السبع القديمة"
            },
            egyptianMuseum: {
                es: "Exploramos el Museo Egipcio, hogar de la mayor colección de antigüedades faraónicas, incluyendo los tesoros de Tutankamón",
                en: "Explore the Egyptian Museum, home to the largest collection of pharaonic antiquities, including Tutankhamun's treasures",
                ar: "نستكشف المتحف المصري، موطن أكبر مجموعة من الآثار الفرعونية، بما في ذلك كنوز توت عنخ آمون"
            },
            khanElKhalili: {
                es: "Paseamos por el histórico Bazar Khan El Khalili, sumergiéndonos en la atmósfera tradicional y los aromas del Oriente",
                en: "Stroll through the historic Khan El Khalili Bazaar, immersing ourselves in the traditional atmosphere and scents of the Orient",
                ar: "نتجول في خان الخليلي التاريخي، ونغوص في الأجواء التقليدية وروائح الشرق"
            },
            qaitbayCitadel: {
                es: "Visitamos la Ciudadela de Qaitbay, construida sobre las ruinas del antiguo Faro de Alejandría, disfrutando de las vistas al Mediterráneo",
                en: "Visit Qaitbay Citadel, built on the ruins of the ancient Lighthouse of Alexandria, enjoying Mediterranean views",
                ar: "نزور قلعة قايتباي، المبنية على أنقاض منارة الإسكندرية القديمة، مع الاستمتاع بإطلالات البحر المتوسط"
            },
            alexandriaNationalMuseum: {
                es: "Exploramos el Museo Nacional de Alejandría, descubriendo artefactos que narran la rica historia de esta ciudad cosmopolita",
                en: "Explore the Alexandria National Museum, discovering artifacts that tell the rich history of this cosmopolitan city",
                ar: "نستكشف المتحف الوطني بالإسكندرية، ونكتشف القطع الأثرية التي تحكي التاريخ الغني لهذه المدينة العالمية"
            },
            luxorTemple: {
                es: "Visitamos el Templo de Luxor, iluminado majestuosamente por la noche, revelando su impresionante arquitectura faraónica",
                en: "Visit Luxor Temple, majestically illuminated at night, revealing its impressive pharaonic architecture",
                ar: "نزور معبد الأقصر، المضاء بشكل مهيب في الليل، ليكشف عن عمارته الفرعونية المذهلة"
            },
            karnakTemple: {
                es: "Exploramos el vasto complejo de Karnak, el sitio religioso más grande del mundo antiguo, con su famoso bosque de columnas",
                en: "Explore the vast Karnak complex, the largest religious site in the ancient world, with its famous hypostyle hall",
                ar: "نستكشف مجمع الكرنك الضخم، أكبر موقع ديني في العالم القديم، مع قاعة الأعمدة الشهيرة"
            },
            valleyOfTheKings: {
                es: "Descendemos al Valle de los Reyes, explorando las tumbas bellamente decoradas de los faraones del Imperio Nuevo",
                en: "Descend into the Valley of the Kings, exploring the beautifully decorated tombs of New Kingdom pharaohs",
                ar: "ننزل إلى وادي الملوك، ونستكشف مقابر فراعنة الدولة الحديثة المزينة بشكل جميل"
            },
            hatshepsutTemple: {
                es: "Visitamos el Templo de Hatshepsut, obra maestra arquitectónica dedicada a la reina faraón más poderosa de Egipto",
                en: "Visit Hatshepsut Temple, architectural masterpiece dedicated to Egypt's most powerful female pharaoh",
                ar: "نزور معبد حتشبسوت، التحفة المعمارية المخصصة لأقوى فرعونة في مصر"
            },
            philaeTemple: {
                es: "Navegamos al Templo de Philae en la isla de Agilkia, dedicado a la diosa Isis, disfrutando de su encanto mágico",
                en: "Sail to Philae Temple on Agilkia Island, dedicated to goddess Isis, enjoying its magical charm",
                ar: "نبحر إلى معبد فيلة في جزيرة أجيليكا، المخصص للإلهة إيزيس، ونستمتع بسحره الخلاب"
            },
            edfuTemple: {
                es: "Visitamos el Templo de Edfu, el templo ptolemaico mejor conservado de Egipto, dedicado al dios Horus",
                en: "Visit Edfu Temple, the best-preserved Ptolemaic temple in Egypt, dedicated to god Horus",
                ar: "نزور معبد إدفو، المعبد البطلمي الأفضل حفظاً في مصر، المخصص للإله حورس"
            },
            komOmboTemple: {
                es: "Exploramos el Templo de Kom Ombo, único por estar dedicado a dos dioses: Sobek y Horus",
                en: "Explore Kom Ombo Temple, unique for being dedicated to two gods: Sobek and Horus",
                ar: "نستكشف معبد كوم أمبو، الفريد من نوعه لأنه مخصص لإلهين: سوبك وحورس"
            },
            saqqara: {
                es: "Exploramos la necrópolis de Saqqara, hogar de la Pirámide Escalonada de Zoser, la primera estructura de piedra monumental",
                en: "Explore Saqqara necropolis, home to Djoser's Step Pyramid, the first monumental stone structure",
                ar: "نستكشف مقابر سقارة، موطن هرم زوسر المدرج، أول بناء حجري ضخم"
            },
            citadelOfSaladin: {
                es: "Visitamos la Ciudadela de Saladino, fortaleza medieval que ofrece vistas panorámicas de El Cairo",
                en: "Visit the Citadel of Saladin, medieval fortress offering panoramic views of Cairo",
                ar: "نزور قلعة صلاح الدين الأيوبي، الحصن الذي يوفر إطلالات بانورامية على القاهرة"
            },
            komElShoqafaCatacombs: {
                es: "Descendemos a las Catacumbas de Kom El Shoqafa, fascinante laberinto que fusiona estilos egipcio, griego y romano",
                en: "Descend into Catacombs of Kom El Shoqafa, fascinating labyrinth blending Egyptian, Greek and Roman styles",
                ar: "ننزل إلى سراديب كوم الشقافة، المتاهة الرائعة التي تمزج بين الأساليب المصرية واليونانية والرومانية"
            },
            pompeysPillar: {
                es: "Admiramos la Columna de Pompeyo, el monumento más alto de Alejandría, testimonio de la grandeza romana",
                en: "Admire Pompey's Pillar, Alexandria's tallest monument, testament to Roman grandeur",
                ar: "نشاهد عمود السواري، أطول نصب تذكاري في الإسكندرية، شاهد على العظمة الرومانية"
            }
        };
        
        return detailedActivities[site] || null;
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
        
        // اليوم 1: الأقصر (معبد الأقصر + الكرنك + وادي الملوك + حتشبسوت)
        cruiseDays.push({
            day: startDay,
            title: this.getCruiseDayTitle('luxor', 1, language),
            activities: {
                es: [
                    "Traslado desde El Cairo o Alejandría a Luxor y embarque en el crucero del Nilo",
                    "Visitamos el Templo de Luxor, iluminado majestuosamente, revelando su impresionante arquitectura",
                    "Exploramos el vasto complejo de Karnak, el sitio religioso más grande del mundo antiguo",
                    "Descendemos al Valle de los Reyes, explorando las tumbas de los faraones",
                    "Visitamos el Templo de Hatshepsut, obra maestra dedicada a la reina faraón",
                    "Admiramos los Colosos de Memnón, guardianes milenarios del templo de Amenhotep III",
                    "Cena y noche a bordo del crucero"
                ],
                en: [
                    "Transfer from Cairo or Alexandria to Luxor and embark on Nile cruise",
                    "Visit Luxor Temple, majestically illuminated, revealing its impressive architecture",
                    "Explore the vast Karnak complex, the largest religious site in the ancient world",
                    "Descend into Valley of the Kings, exploring pharaohs' tombs",
                    "Visit Hatshepsut Temple, masterpiece dedicated to the female pharaoh",
                    "Admire the Colossi of Memnon, millennial guardians of Amenhotep III's temple",
                    "Dinner and overnight aboard the cruise"
                ],
                ar: [
                    "الانتقال من القاهرة أو الإسكندرية إلى الأقصر والصعود على متن الكروز النيلي",
                    "نزور معبد الأقصر المضاء بشكل مهيب، ليكشف عن عمارته المذهلة",
                    "نستكشف مجمع الكرنك الضخم، أكبر موقع ديني في العالم القديم",
                    "ننزل إلى وادي الملوك، ونستكشف مقابر الفراعنة",
                    "نزور معبد حتشبسوت، التحفة المخصصة للفرعونة",
                    "نشاهد تمثالي ممنون الضخمين، حراس معبد أمنحتب الثالث الألفيين",
                    "العشاء والمبيت على متن الكروز"
                ]
            }
        });
        
        // اليوم 2: إدفو
        cruiseDays.push({
            day: startDay + 1,
            title: this.getCruiseDayTitle('edfu', 2, language),
            activities: {
                es: [
                    "Desayuno a bordo mientras navegamos por el Nilo",
                    "Llegada a Edfu y traslado en calesa al templo",
                    "Visitamos el Templo de Edfu, el templo ptolemaico mejor conservado de Egipto, dedicado al dios Horus",
                    "Exploramos los relieves detallados que narran la batalla entre Horus y Set",
                    "Regreso al crucero y continuación de la navegación",
                    "Tarde libre para relajarse en la cubierta del barco",
                    "Cena con espectáculo de música tradicional egipcia"
                ],
                en: [
                    "Breakfast aboard while sailing the Nile",
                    "Arrival in Edfu and transfer by horse carriage to temple",
                    "Visit Edfu Temple, best-preserved Ptolemaic temple in Egypt, dedicated to god Horus",
                    "Explore detailed reliefs narrating the battle between Horus and Set",
                    "Return to cruise and continue sailing",
                    "Afternoon free to relax on ship's deck",
                    "Dinner with traditional Egyptian music show"
                ],
                ar: [
                    "الإفطار على متن الكروز أثناء الإبحار في النيل",
                    "الوصول إلى إدفو والانتقال بعربة الحنطور إلى المعبد",
                    "نزور معبد إدفو، المعبد البطلمي الأفضل حفظاً في مصر، المخصص للإله حورس",
                    "نستكشف النقوش التفصيلية التي تروي معركة حورس وست",
                    "العودة إلى الكروز ومواصلة الإبحار",
                    "بعد الظهر حر للاسترخاء على سطح السفينة",
                    "العشاء مع عرض موسيقى مصرية تقليدية"
                ]
            }
        });
        
        // اليوم 3: كوم أمبو
        cruiseDays.push({
            day: startDay + 2,
            title: this.getCruiseDayTitle('komOmbo', 3, language),
            activities: {
                es: [
                    "Desayuno mientras navegamos hacia Kom Ombo",
                    "Visitamos el Templo de Kom Ombo, único por estar dedicado a dos dioses: Sobek (cocodrilo) y Horus",
                    "Exploramos el museo de cocodrilos momificados",
                    "Admiramos los relieves médicos antiguos, precursores de la medicina moderna",
                    "Continuamos navegando hacia Asuán con hermosas vistas del Nilo",
                    "Tarde libre para disfrutar de las instalaciones del crucero",
                    "Cena de gala con trajes tradicionales (opcional)"
                ],
                en: [
                    "Breakfast while sailing to Kom Ombo",
                    "Visit Kom Ombo Temple, unique for being dedicated to two gods: Sobek (crocodile) and Horus",
                    "Explore the mummified crocodiles museum",
                    "Admire ancient medical reliefs, precursors of modern medicine",
                    "Continue sailing to Aswan with beautiful Nile views",
                    "Afternoon free to enjoy cruise facilities",
                    "Gala dinner with traditional costumes (optional)"
                ],
                ar: [
                    "الإفطار أثناء الإبحار إلى كوم أمبو",
                    "نزور معبد كوم أمبو، الفريد لأنه مخصص لإلهين: سوبك (التمساح) وحورس",
                    "نستكشف متحف التماسيح المحنطة",
                    "نشاهد النقوش الطبية القديمة، رواد الطب الحديث",
                    "نواصل الإبحار إلى أسوان مع مناظر النيل الخلابة",
                    "بعد الظهر حر للاستمتاع بمرافق الكروز",
                    "عشاء فاخر مع الأزياء التقليدية (اختياري)"
                ]
            }
        });
        
        // اليوم 4: أسوان
        cruiseDays.push({
            day: startDay + 3,
            title: this.getCruiseDayTitle('aswan', 4, language),
            activities: {
                es: [
                    "Desayuno a bordo con vistas al Nilo en Asuán",
                    "Navegamos en bote motorizado al Templo de Philae en la isla de Agilkia",
                    "Exploramos el Templo de Philae, dedicado a la diosa Isis, en su entorno mágico",
                    "Visitamos la Presa Alta de Asuán, obra maestra de la ingeniería moderna",
                    "Admiramos el Obelisco Inacabado en las canteras de granito",
                    "Paseo opcional en faluca tradicional alrededor de las islas del Nilo",
                    "Visita opcional al pueblo nubio para conocer su cultura única",
                    "Última cena a bordo del crucero"
                ],
                en: [
                    "Breakfast aboard with Nile views in Aswan",
                    "Sail by motorboat to Philae Temple on Agilkia Island",
                    "Explore Philae Temple, dedicated to goddess Isis, in its magical setting",
                    "Visit Aswan High Dam, masterpiece of modern engineering",
                    "Admire the Unfinished Obelisk in granite quarries",
                    "Optional ride in traditional felucca around Nile islands",
                    "Optional visit to Nubian village to experience its unique culture",
                    "Last dinner aboard the cruise"
                ],
                ar: [
                    "الإفطار على متن الكروز مع إطلالات النيل في أسوان",
                    "نبحر بالقارب الآلي إلى معبد فيلة في جزيرة أجيليكا",
                    "نستكشف معبد فيلة المخصص للإلهة إيزيس في محيطه السحري",
                    "نزور السد العالي بأسوان، تحفة الهندسة الحديثة",
                    "نشاهد المسلة الناقصة في محاجر الجرانيت",
                    "رحلة اختيارية بالفلوكة التقليدية حول جزر النيل",
                    "زيارة اختيارية للقرية النوبية للتعرف على ثقافتها الفريدة",
                    "العشاء الأخير على متن الكروز"
                ]
            }
        });
        
        // اليوم 5: مغادرة الكروز
        cruiseDays.push({
            day: startDay + 4,
            title: {
                es: "Crucero del Nilo - Desembarque",
                en: "Nile Cruise - Disembarkation",
                ar: "رحلة نيلية - مغادرة الكروز"
            },
            activities: {
                es: [
                    "Desayuno final a bordo del crucero",
                    "Desembarque después del desayuno",
                    "Excursión opcional a Abu Simbel (recomendada): templos de Ramsés II y Nefertari",
                    "Traslado al aeropuerto de Asuán para vuelo de regreso a El Cairo",
                    "O continuación del programa según itinerario personalizado"
                ],
                en: [
                    "Final breakfast aboard the cruise",
                    "Disembarkation after breakfast",
                    "Optional excursion to Abu Simbel (recommended): temples of Ramses II and Nefertari",
                    "Transfer to Aswan airport for return flight to Cairo",
                    "Or program continuation as per customized itinerary"
                ],
                ar: [
                    "الإفطار الأخير على متن الكروز",
                    "مغادرة الكروز بعد الإفطار",
                    "رحلة اختيارية إلى أبو سمبل (موصى بها): معابد رمسيس الثاني ونفرتاري",
                    "الانتقال إلى مطار أسوان لرحلة العودة إلى القاهرة",
                    "أو مواصلة البرنامج حسب المسار المخصص"
                ]
            }
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

    // 🎯 اختيار المواقع لكل يوم
    private selectSitesForDay(specificSites: SupportedSite[], dayIndex: number, sitesPerDay: number): SupportedSite[] {
        const startIndex = dayIndex * sitesPerDay;
        const endIndex = Math.min(startIndex + sitesPerDay, specificSites.length);
        return specificSites.slice(startIndex, endIndex);
    }

    // 🗺️ الحصول على المواقع المتاحة للمدينة
    private getAvailableSitesForCity(city: string): SupportedSite[] {
        const cityKey = city.toLowerCase() as keyof typeof AVAILABLE_SITES;
        return AVAILABLE_SITES[cityKey] || [];
    }

    // 🎯 التحقق من صحة المواقع المحددة
    private validateSitesForCity(city: string, sites: SupportedSite[]): SupportedSite[] {
        const availableSites = this.getAvailableSitesForCity(city);
        return sites.filter(site => availableSites.includes(site));
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
                        nights: days
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
                es: "Crucero Dorado del Nilo (5 estrellas)",
                en: "Golden Nile Cruise (5 stars)",
                ar: "كروز نيل ذهبي (5 نجوم)"
            },
            diamond: {
                es: "Crucero Diamante del Nilo (5 estrellas lujo)",
                en: "Diamond Nile Cruise (5 stars deluxe)", 
                ar: "كروز نيل ماسي (5 نجوم فاخر)"
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
    ): { es: string[]; en: string[]; ar?: string[] } {
        const services: { es: string[]; en: string[]; ar?: string[] } = {
            es: [],
            en: [],
            ar: []
        };
        
        // الخدمات الأساسية
        services.es.push(`Alojamiento en hoteles de categoría ${category === 'gold' ? 'dorada (5 estrellas)' : 'diamante (5 estrellas lujo)'}`);
        services.en.push(`Accommodation in ${category === 'gold' ? 'gold category (5 stars)' : 'diamond category (5 stars deluxe)'} hotels`);
        services.ar!.push(`الإقامة في فنادق فئة ${category === 'gold' ? 'ذهبية (5 نجوم)' : 'ماسية (5 نجوم فاخرة)'}`);
        
        // إضافة الكروز إذا كان موجوداً
        if (daysDistribution.cruise) {
            services.es.push("Crucero por el Nilo de 4 noches (Luxor a Asuán) pensión completa");
            services.en.push("4-night Nile cruise (Luxor to Aswan) full board");
            services.ar!.push("رحلة نيلية لمدة 4 ليالي (من الأقصر إلى أسوان) بنظام الإقامة الكاملة");
        }
        
        // الخدمات الإضافية
        services.es.push(
            "Guía egiptólogo profesional de habla española durante todo el recorrido",
            "Todas las entradas a monumentos, museos y sitios arqueológicos",
            "Todas las comidas según se especifica en el itinerario (desayuno, almuerzo, cena)",
            "Traslados desde/hacia aeropuertos y hoteles",
            "Vehículo privado con aire acondicionado y conductor profesional",
            "Vuelos domésticos (según itinerario)",
            "Todos los impuestos y cargos por servicio",
            "Agua embotellada durante las excursiones"
        );
        
        services.en.push(
            "Professional Spanish-speaking Egyptologist guide throughout the tour",
            "All entrance fees to monuments, museums and archaeological sites",
            "All meals as specified in itinerary (breakfast, lunch, dinner)",
            "Transfers from/to airports and hotels",
            "Private air-conditioned vehicle with professional driver",
            "Domestic flights (as per itinerary)",
            "All taxes and service charges",
            "Bottled water during excursions"
        );
        
        services.ar!.push(
            "مرشد مصريات محترف يتحدث الإسبانية طوال الجولة",
            "جميع رسوم دخول المعالم والمتاحف والمواقع الأثرية",
            "جميع الوجبات حسب المحدد في البرنامج (إفطار، غداء، عشاء)",
            "الانتقالات من وإلى المطارات والفنادق",
            "مركبة خاصة مكيفة مع سائق محترف",
            "رحلات طيران داخلية (حسب البرنامج)",
            "جميع الضرائب ورسوم الخدمة",
            "مياه معبأة خلال الرحلات"
        );
        
        return services;
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
                gold: { es: "Steigenberger El Tahrir o similar", en: "Steigenberger El Tahrir or similar", ar: "فندق شتيجنبرجر التحرير أو مماثل" },
                diamond: { es: "Four Seasons Cairo at Nile Plaza o similar", en: "Four Seasons Cairo at Nile Plaza or similar", ar: "فندق فور سيزونز القاهرة نايل بلازا أو مماثل" }
            },
            alexandria: {
                gold: { es: "Hilton Alexandria Corniche o similar", en: "Hilton Alexandria Corniche or similar", ar: "فندق هيلتون الإسكندرية كورنيش أو مماثل" },
                diamond: { es: "Four Seasons Alexandria o similar", en: "Four Seasons Alexandria or similar", ar: "فندق فور سيزونز الإسكندرية أو مماثل" }
            },
            luxor: {
                gold: { es: "Sonesta St. George Luxor o similar", en: "Sonesta St. George Luxor or similar", ar: "فندق سونيستا سان جورج الأقصر أو مماثل" },
                diamond: { es: "Sofitel Winter Palace Luxor o similar", en: "Sofitel Winter Palace Luxor or similar", ar: "فندق سوفيتيل ونتر بالاس الأقصر أو مماثل" }
            },
            aswan: {
                gold: { es: "Tolip Aswan Hotel o similar", en: "Tolip Aswan Hotel or similar", ar: "فندق توليب أسوان أو مماثل" },
                diamond: { es: "Sofitel Legend Old Cataract Aswan o similar", en: "Sofitel Legend Old Cataract Aswan or similar", ar: "فندق سوفيتيل ليجند أولد كتاراكت أسوان أو مماثل" }
            }
        };
        
        return hotels[city as keyof typeof hotels]?.[category] || { es: "Hotel de lujo", en: "Luxury Hotel", ar: "فندق فاخر" };
    }

    // 🔍 التحقق من تطابق المدينة
    private isCityMatch(accCity: LocalizedString, city: string): boolean {
        const cityNames = this.getCityLocalizedName(city);
        return accCity.en.toLowerCase().includes(cityNames.en.toLowerCase()) || 
               accCity.es.toLowerCase().includes(cityNames.es.toLowerCase()) || 
               (accCity.ar && accCity.ar.includes(cityNames.ar));
    }

    // 📊 تحويل الأيام إلى ليالي
    private convertDaysToNights(daysDistribution: { [city: string]: number }): Partial<Record<SupportedCity, number>> {
        const nights: Partial<Record<SupportedCity, number>> = {};
        
        for (const [city, days] of Object.entries(daysDistribution)) {
            if (city === 'cruise') {
                // الكروز = 4 ليالي
                continue;
            }
            nights[city as SupportedCity] = days;
        }
        
        return nights;
    }

    // 🛫 حساب قطاعات الطيران
    private calculateFlightSectors(daysDistribution: { [city: string]: number }): number {
        let sectors = 0;
        
        // قطاع واحد لكل انتقال بين المدن
        const cities = Object.keys(daysDistribution).filter(city => daysDistribution[city] > 0);
        
        if (cities.includes('cairo')) sectors++;
        if (cities.includes('alexandria')) sectors++;
        if (cities.includes('cruise') || cities.includes('luxor') || cities.includes('aswan')) sectors += 2; // ذهاب وعودة
        
        return sectors;
    }

    // 🎯 استخراج جميع المواقع من البرنامج اليومي
    private extractAllSitesFromItinerary(itinerary: ItineraryItem[], language: Language): SupportedSite[] {
        const sites: SupportedSite[] = [];
        
        for (const day of itinerary) {
            if (day.activities && day.activities[language]) {
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
        const activityLower = activity.toLowerCase();
        
        if (activityLower.includes('giza') || activityLower.includes('pirámides') || activityLower.includes('pyramids') || activityLower.includes('أهرامات')) {
            return 'gizaPyramidsAndSphinx';
        }
        if (activityLower.includes('museo egipcio') || activityLower.includes('egyptian museum') || activityLower.includes('المتحف المصري')) {
            return 'egyptianMuseum';
        }
        if (activityLower.includes('khan') || activityLower.includes('khalili') || activityLower.includes('خان الخليلي')) {
            return 'khanElKhalili';
        }
        if (activityLower.includes('qaitbay') || activityLower.includes('qaitbay') || activityLower.includes('قايتباي')) {
            return 'qaitbayCitadel';
        }
        if (activityLower.includes('luxor temple') || activityLower.includes('templo de luxor') || activityLower.includes('معبد الأقصر')) {
            return 'luxorTemple';
        }
        if (activityLower.includes('karnak') || activityLower.includes('الكرنك')) {
            return 'karnakTemple';
        }
        if (activityLower.includes('valley of the kings') || activityLower.includes('valle de los reyes') || activityLower.includes('وادي الملوك')) {
            return 'valleyOfTheKings';
        }
        if (activityLower.includes('hatshepsut') || activityLower.includes('حتشبسوت')) {
            return 'hatshepsutTemple';
        }
        if (activityLower.includes('philae') || activityLower.includes('فيلة')) {
            return 'philaeTemple';
        }
        if (activityLower.includes('edfu') || activityLower.includes('إدفو')) {
            return 'edfuTemple';
        }
        if (activityLower.includes('kom ombo') || activityLower.includes('كوم أمبو')) {
            return 'komOmboTemple';
        }
        
        return null;
    }

    // 🏠 إنشاء يوم الوصول
    private createArrivalDay(language: Language): ItineraryItem {
        return {
            day: 1,
            title: {
                es: "Llegada a El Cairo - Bienvenida a Egipto",
                en: "Arrival in Cairo - Welcome to Egypt",
                ar: "الوصول إلى القاهرة - مرحباً بكم في مصر"
            },
            activities: {
                es: [
                    "Llegada al Aeropuerto Internacional de El Cairo",
                    "Recepción por nuestro representante con cartel de bienvenida",
                    "Asistencia con los trámites de inmigración y recogida de equipaje",
                    "Traslado en vehículo privado con aire acondicionado al hotel",
                    "Check-in en el hotel y entrega de documentación del viaje",
                    "Briefing sobre el itinerario y consejos para su estancia en Egipto",
                    "Resto del día libre para descansar del vuelo o explorar los alrededores del hotel",
                    "Cena de bienvenida opcional en restaurante con vistas al Nilo"
                ],
                en: [
                    "Arrival at Cairo International Airport",
                    "Meet and greet by our representative with welcome sign",
                    "Assistance with immigration procedures and luggage collection",
                    "Transfer in private air-conditioned vehicle to hotel",
                    "Hotel check-in and trip documentation delivery",
                    "Briefing about the itinerary and tips for your stay in Egypt",
                    "Rest of day free to relax from flight or explore hotel surroundings",
                    "Optional welcome dinner at restaurant with Nile views"
                ],
                ar: [
                    "الوصول إلى مطار القاهرة الدولي",
                    "الاستقبال من قبل ممثلنا مع لافتة ترحيب",
                    "المساعدة في إجراءات الهجرة واستلام الأمتعة",
                    "الانتقال بمركبة خاصة مكيفة إلى الفندق",
                    "تسجيل الوصول في الفندق وتسليم وثائق الرحلة",
                    "إحاطة حول البرنامج ونصائح للإقامة في مصر",
                    "باقي اليوم حر للراحة من الرحلة أو استكشاف محيط الفندق",
                    "عشاء ترحيبي اختياري في مطعم مطل على النيل"
                ]
            }
        };
    }

    // 🛫 إنشاء يوم المغادرة
    private createDepartureDay(totalDuration: number, language: Language): ItineraryItem {
        return {
            day: totalDuration,
            title: {
                es: "Despedida de Egipto - Traslado al Aeropuerto",
                en: "Farewell to Egypt - Airport Transfer",
                ar: "وداعاً مصر - الانتقال إلى المطار"
            },
            activities: {
                es: [
                    "Desayuno final en el hotel",
                    "Tiempo libre para últimas compras o paseo según horario de vuelo",
                    "Check-out del hotel con asistencia de nuestro personal",
                    "Traslado al Aeropuerto Internacional de El Cairo",
                    "Asistencia con los trámites de facturación y check-in",
                    "Despedida de nuestro equipo y fin de nuestros servicios",
                    "Vuelo de regreso a casa con recuerdos inolvidables de Egipto"
                ],
                en: [
                    "Final breakfast at hotel",
                    "Free time for last-minute shopping or walk depending on flight schedule",
                    "Hotel check-out with assistance from our staff",
                    "Transfer to Cairo International Airport",
                    "Assistance with baggage check-in procedures",
                    "Farewell from our team and end of our services",
                    "Return flight home with unforgettable memories of Egypt"
                ],
                ar: [
                    "الإفطار الأخير في الفندق",
                    "وقت حر لآخر مشتريات أو نزهة حسب موعد الرحلة",
                    "تسجيل الخروج من الفندق بمساعدة موظفينا",
                    "الانتقال إلى مطار القاهرة الدولي",
                    "المساعدة في إجراءات تسجيل الأمتعة",
                    "وداعاً من فريقنا ونهاية خدماتنا",
                    "رحلة العودة إلى الوطن مع ذكريات لا تُنسى من مصر"
                ]
            }
        };
    }

    // 🗺️ الحصول على المواقع المتاحة للمدن
    getAvailableSitesForCities(cities: string[]): { [city: string]: SupportedSite[] } {
        const result: { [city: string]: SupportedSite[] } = {};
        
        for (const city of cities) {
            result[city] = this.getAvailableSitesForCity(city);
        }
        
        return result;
    }
}

// 🚀 تصدير الدوال الرئيسية
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

// تصدير المواقع المتاحة للاستخدام الخارجي
export { AVAILABLE_SITES };