// import type { Program, ItineraryItem, CustomQuoteParams, SupportedSite, SupportedCity, LocalizedString } from './types';
// import { knowledgeBase } from './services/knowledgeBase';
// import type { Language } from './contexts/LanguageContext';

// // 🔥 النظام المرن الجديد - واجهات البيانات

// interface DayPlan {
//     days: string; // "1-2" or "3"
//     city?: string;
//     sites?: string[]; // أماكن محددة
//     type?: 'cruise' | 'city';
//     nights?: number; // للكروز
//     startCity?: 'luxor' | 'aswan';
//     direction?: 'luxor-to-aswan' | 'aswan-to-luxor';
//     departureDay?: 'saturday' | 'monday' | 'wednesday' | 'friday';
// }

// export interface FlexibleCustomRequest {
//     travelers: number;
//     duration: number;
//     dayByDay: DayPlan[];
//     season: 'summer' | 'winter';
//     category: 'gold' | 'diamond';
//     language: Language;
// }

// // 🗺️ خريطة المواقع المتاحة
// const AVAILABLE_SITES = {
//     cairo: [
//         'citadelOfSaladin',
//         'sultanHassanMosque',
//         'elSeheimyHouse',
//         'mohamedAliPalace',
//         'marysTree',
//         'senusretIObelisk',
//         'egyptianMuseum',
//         'egyptianMuseumAudioGuide',
//         'islamicArtMuseum',
//         'copticMuseum',
//         'royalCarriagesMuseum',
//         'gayerAndersonMuseum',
//         'baronEmpainPalace',
//         'alMuizzStreet',
//         'manialPalace',
//         'nilometer',
//         'gizaPyramidsAndSphinx',
//         'pyramidOfKeopsInterior',
//         'pyramidOfKhafrenInterior',
//         'pyramidOfMicerinoInterior',
//         'tombOfMeresankh',
//         'saqqaraComplexAndImhotepMuseum',
//         'nobleTombsOfTheNewKingdom',
//         'southTombSaqqara',
//         'saqqaraCombinedTicket',
//         'citadelAndAlabasterMosque',
//         'khanElKhalili',
//         'saqqara',
//         'stepPyramidOfZoser',
//         'serapeum',
//         'tombOfMereruka',
//         'dashurArchaeologicalZone',
//         'memphisMitRahina',
//         'egyptianCivilizationMuseum',
//         'grandEgyptianMuseum'
//     ],
//     luxor: [
//         'karnakTemple',
//         'mutTemple',
//         'luxorTemple',
//         'valleyOfTheKings',
//         'tombOfSetiI',
//         'tombOfAy',
//         'hatshepsutTemple',
//         'deirElMedina',
//         'tombOfPashed',
//         'tombOfRamose',
//         'ramesseumTemple',
//         'abdelQurnaHill',
//         'carterHouse',
//         'tombOfMennaAndNakht',
//         'tombsOfUserhatAndKhaemwaset',
//         'alAsasif',
//         'esnaTemple',
//         'tombOfRamsesVI',
//         'valleyOfTheQueens',
//         'tombOfNefertari',
//         'elKhokhaNecropolis',
//         'tombsOfRoyAndShuroy',
//         'qurnaMerai',
//         'sheikhAbdelQurna',
//         'mummificationMuseum',
//         'luxorMuseum'
//     ],
//     aswan: [
//         'philaeTemple',
//         'edfuTemple',
//         'komOmboTemple',
//         'qubbetElHawa',
//         'unfinishedObelisk',
//         'kalabshaTemple',
//         'elKab',
//         'nubianMuseum',
//         'highDam'
//     ],
//     alexandria: [
//         'qaitbayCitadel',
//         'komElShoqafaCatacombs',
//         'komElDikkaRomanTheater',
//         'pompeysPillar',
//         'alexandriaNationalMuseum',
//         'royalJewelryMuseum',
//         'graecoRomanMuseum',
//         'rosettaRuins'
//     ],
//     abuSimbel: [
//         'abuSimbelTemples',
//         'sunFestivalAbuSimbel'
//     ],
//     // Other cities with their respective sites
//     hurghada: [],
//     sharmElSheikh: [],
//     saintCatherine: [],
//     siwa: [],
//     matrouh: [],
//     cruise: []
// };

// // 🚢 قواعد الكروز
// const CRUISE_RULES = {
//     3: {
//         startCity: 'aswan',
//         departureDays: ['wednesday', 'friday'],
//         direction: 'aswan-to-luxor'
//     },
//     4: {
//         startCity: 'luxor',
//         departureDays: ['saturday', 'monday'],
//         direction: 'luxor-to-aswan'
//     }
// };

// // 🧠 نظام ذكي لاستخراج البيانات من البرامج الـ10 الموجودة
// export class IntelligentDataExtractor {
//     private programs: Program[];

//     constructor() {
//         this.programs = knowledgeBase.packages;
//     }

//     private SITES_DATABASE = {
//     // القاهرة
//     'gizaPyramidsAndSphinx': {
//         duration: 'half-day',
//         activities: {
//             es: [
//                 'Visita a la Meseta de Giza',
//                 'Exploración de las Grandes Pirámides de Keops, Kefrén y Micerino',
//                 'Contemplación de la Gran Esfinge',
//                 'Visita al Templo del Valle de Kefrén',
//                 'Oportunidad para fotos panorámicas'
//             ],
//             en: [
//                 'Visit to Giza Plateau',
//                 'Exploration of the Great Pyramids of Khufu, Khafre and Menkaure',
//                 'Viewing the Great Sphinx',
//                 'Visit to Valley Temple of Khafre',
//                 'Opportunity for panoramic photos'
//             ],
//             ar: [
//                 'زيارة هضبة الجيزة',
//                 'استكشاف أهرامات خوفو وخفرع ومنقرع العظيمة',
//                 'مشاهدة أبو الهول العظيم',
//                 'زيارة معبد الوادي لخفرع',
//                 'فرصة للتصوير البانورامي'
//             ]
//         }
//     },
//     'egyptianMuseum': {
//         duration: 'half-day',
//         activities: {
//             es: [
//                 'Visita al Museo Egipcio en la Plaza Tahrir',
//                 'Exploración de la colección de Tutankamón',
//                 'Admiración de las momias reales',
//                 'Recorrido por las salas de antigüedades',
//                 'Descubrimiento de joyas y tesoros faraónicos'
//             ],
//             en: [
//                 'Visit to Egyptian Museum in Tahrir Square',
//                 'Exploration of Tutankhamun collection',
//                 'Admiring the royal mummies',
//                 'Tour of antiquities halls',
//                 'Discovery of pharaonic jewels and treasures'
//             ],
//             ar: [
//                 'زيارة المتحف المصري في ميدان التحرير',
//                 'استكشاف مجموعة توت عنخ آمون',
//                 'الإعجاب بالمومياوات الملكية',
//                 'جولة في قاعات الآثار',
//                 'اكتشاف المجوهرات والكنوز الفرعونية'
//             ]
//         }
//     },
//     'saqqara': {
//         duration: 'half-day',
//         activities: {
//             es: [
//                 'Visita a la necrópolis de Saqqara',
//                 'Exploración de la Pirámide Escalonada de Djoser',
//                 'Visita a las tumbas de nobles',
//                 'Admiración de los relieves y jeroglíficos antiguos',
//                 'Descubrimiento del complejo funerario de Imhotep'
//             ],
//             en: [
//                 'Visit to Saqqara necropolis',
//                 'Exploration of Step Pyramid of Djoser',
//                 'Visit to nobles tombs',
//                 'Admiring ancient reliefs and hieroglyphs',
//                 'Discovery of Imhotep funerary complex'
//             ],
//             ar: [
//                 'زيارة مقبرة سقارة',
//                 'استكشاف هرم زوسر المدرج',
//                 'زيارة مقابر النبلاء',
//                 'الإعجاب بالنقوش والهيروغليفية القديمة',
//                 'اكتشاف مجمع إمحوتب الجنائزي'
//             ]
//         }
//     },
//     'khanElKhalili': {
//         duration: 'half-day',
//         activities: {
//             es: [
//                 'Paseo por el histórico bazar Khan el-Khalili',
//                 'Exploración de tiendas de especias y perfumes',
//                 'Compra de artesanías egipcias auténticas',
//                 'Visita a cafeterías tradicionales',
//                 'Experiencia de la vida local cairota'
//             ],
//             en: [
//                 'Walk through historic Khan el-Khalili bazaar',
//                 'Exploration of spice and perfume shops',
//                 'Shopping for authentic Egyptian handicrafts',
//                 'Visit to traditional coffee houses',
//                 'Experience of local Cairo life'
//             ],
//             ar: [
//                 'التجول في بازار خان الخليلي التاريخي',
//                 'استكشاف محلات التوابل والعطور',
//                 'شراء الحرف اليدوية المصرية الأصيلة',
//                 'زيارة المقاهي التقليدية',
//                 'تجربة الحياة المحلية القاهرية'
//             ]
//         }
//     },
//     'citadelOfSaladin': {
//         duration: 'half-day',
//         activities: {
//             es: [
//                 'Visita a la Ciudadela de Saladino',
//                 'Exploración de la Mezquita de Mohamed Ali (Mezquita de Alabastro)',
//                 'Vistas panorámicas de El Cairo',
//                 'Visita al Museo Militar',
//                 'Admiración de la arquitectura islámica'
//             ],
//             en: [
//                 'Visit to Citadel of Saladin',
//                 'Exploration of Mohamed Ali Mosque (Alabaster Mosque)',
//                 'Panoramic views of Cairo',
//                 'Visit to Military Museum',
//                 'Admiring Islamic architecture'
//             ],
//             ar: [
//                 'زيارة قلعة صلاح الدين',
//                 'استكشاف مسجد محمد علي (مسجد المرمر)',
//                 'إطلالات بانورامية على القاهرة',
//                 'زيارة المتحف الحربي',
//                 'الإعجاب بالعمارة الإسلامية'
//             ]
//         }
//     },
//     'grandEgyptianMuseum': {
//         duration: 'half-day',
//         activities: {
//             es: [
//                 'Visita al Gran Museo Egipcio (GEM)',
//                 'Exploración de la colección completa de Tutankamón',
//                 'Admiración de estatuas colosales',
//                 'Recorrido por galerías interactivas modernas',
//                 'Vistas espectaculares de las Pirámides'
//             ],
//             en: [
//                 'Visit to Grand Egyptian Museum (GEM)',
//                 'Exploration of complete Tutankhamun collection',
//                 'Admiring colossal statues',
//                 'Tour of modern interactive galleries',
//                 'Spectacular views of Pyramids'
//             ],
//             ar: [
//                 'زيارة المتحف المصري الكبير',
//                 'استكشاف مجموعة توت عنخ آمون الكاملة',
//                 'الإعجاب بالتماثيل الضخمة',
//                 'جولة في المعارض التفاعلية الحديثة',
//                 'إطلالات رائعة على الأهرامات'
//             ]
//         }
//     },

//     // الأقصر
//     'karnakTemple': {
//         duration: 'half-day',
//         activities: {
//             es: [
//                 'Visita al complejo de templos de Karnak',
//                 'Exploración de la Gran Sala Hipóstila',
//                 'Admiración de los obeliscos gigantes',
//                 'Recorrido por el Templo de Amón-Ra',
//                 'Vista del Lago Sagrado'
//             ],
//             en: [
//                 'Visit to Karnak temple complex',
//                 'Exploration of Great Hypostyle Hall',
//                 'Admiring giant obelisks',
//                 'Tour of Amun-Ra Temple',
//                 'View of Sacred Lake'
//             ],
//             ar: [
//                 'زيارة مجمع معابد الكرنك',
//                 'استكشاف قاعة الأعمدة الكبرى',
//                 'الإعجاب بالمسلات العملاقة',
//                 'جولة في معبد آمون رع',
//                 'مشاهدة البحيرة المقدسة'
//             ]
//         }
//     },
//     'luxorTemple': {
//         duration: 'half-day',
//         activities: {
//             es: [
//                 'Visita al Templo de Luxor',
//                 'Admiración de las estatuas de Ramsés II',
//                 'Exploración de la Avenida de las Esfinges',
//                 'Vista del obelisco y entrada monumental',
//                 'Recorrido nocturno con iluminación (opcional)'
//             ],
//             en: [
//                 'Visit to Luxor Temple',
//                 'Admiring statues of Ramses II',
//                 'Exploration of Avenue of Sphinxes',
//                 'View of obelisk and monumental entrance',
//                 'Evening tour with lighting (optional)'
//             ],
//             ar: [
//                 'زيارة معبد الأقصر',
//                 'الإعجاب بتماثيل رمسيس الثاني',
//                 'استكشاف طريق الكباش',
//                 'مشاهدة المسلة والمدخل الضخم',
//                 'جولة مسائية مع الإضاءة (اختياري)'
//             ]
//         }
//     },
//     'valleyOfTheKings': {
//         duration: 'half-day',
//         activities: {
//             es: [
//                 'Visita al Valle de los Reyes',
//                 'Exploración de 3 tumbas reales',
//                 'Admiración de pinturas murales antiguas',
//                 'Descubrimiento de jeroglíficos y relieves',
//                 'Opción de visitar la tumba de Tutankamón'
//             ],
//             en: [
//                 'Visit to Valley of the Kings',
//                 'Exploration of 3 royal tombs',
//                 'Admiring ancient wall paintings',
//                 'Discovery of hieroglyphs and reliefs',
//                 'Option to visit Tutankhamun tomb'
//             ],
//             ar: [
//                 'زيارة وادي الملوك',
//                 'استكشاف 3 مقابر ملكية',
//                 'الإعجاب باللوحات الجدارية القديمة',
//                 'اكتشاف الهيروغليفية والنقوش',
//                 'خيار زيارة مقبرة توت عنخ آمون'
//             ]
//         }
//     },
//     'hatshepsutTemple': {
//         duration: 'half-day',
//         activities: {
//             es: [
//                 'Visita al Templo de Hatshepsut',
//                 'Exploración de la arquitectura en terrazas',
//                 'Admiración de relieves de la expedición a Punt',
//                 'Vista panorámica desde las terrazas',
//                 'Descubrimiento de la historia de la reina faraona'
//             ],
//             en: [
//                 'Visit to Hatshepsut Temple',
//                 'Exploration of terraced architecture',
//                 'Admiring reliefs of Punt expedition',
//                 'Panoramic view from terraces',
//                 'Discovery of queen pharaoh history'
//             ],
//             ar: [
//                 'زيارة معبد حتشبسوت',
//                 'استكشاف العمارة المدرجة',
//                 'الإعجاب بنقوش رحلة بونت',
//                 'إطلالة بانورامية من المدرجات',
//                 'اكتشاف تاريخ الملكة الفرعون'
//             ]
//         }
//     },

//     // أسوان
//     'philaeTemple': {
//         duration: 'half-day',
//         activities: {
//             es: [
//                 'Viaje en barco a la Isla de Philae',
//                 'Visita al Templo de Isis',
//                 'Exploración de relieves ptolemaicos',
//                 'Admiración de la ubicación en la isla',
//                 'Espectáculo de luz y sonido (opcional nocturno)'
//             ],
//             en: [
//                 'Boat trip to Philae Island',
//                 'Visit to Temple of Isis',
//                 'Exploration of Ptolemaic reliefs',
//                 'Admiring island location',
//                 'Sound and light show (optional evening)'
//             ],
//             ar: [
//                 'رحلة بالقارب إلى جزيرة فيلة',
//                 'زيارة معبد إيزيس',
//                 'استكشاف النقوش البطلمية',
//                 'الإعجاب بموقع الجزيرة',
//                 'عرض الصوت والضوء (مسائي اختياري)'
//             ]
//         }
//     },
//     'highDam': {
//         duration: 'short',
//         activities: {
//             es: [
//                 'Visita a la Alta Presa de Asuán',
//                 'Vista del Lago Nasser',
//                 'Explicación de la ingeniería moderna',
//                 'Vistas panorámicas del Nilo',
//                 'Monumento a la amistad soviético-egipcia'
//             ],
//             en: [
//                 'Visit to Aswan High Dam',
//                 'View of Lake Nasser',
//                 'Modern engineering explanation',
//                 'Panoramic views of Nile',
//                 'Soviet-Egyptian friendship monument'
//             ],
//             ar: [
//                 'زيارة السد العالي',
//                 'إطلالة على بحيرة ناصر',
//                 'شرح الهندسة الحديثة',
//                 'إطلالات بانورامية على النيل',
//                 'نصب الصداقة السوفيتية المصرية'
//             ]
//         }
//     },
//     'abuSimbelTemples': {
//         duration: 'full-day',
//         activities: {
//             es: [
//                 'Viaje terrestre a Abu Simbel (3-4 horas)',
//                 'Visita al Gran Templo de Ramsés II',
//                 'Exploración del Templo de Nefertari',
//                 'Admiración de estatuas colosales',
//                 'Historia del traslado de los templos',
//                 'Regreso a Asuán'
//             ],
//             en: [
//                 'Overland trip to Abu Simbel (3-4 hours)',
//                 'Visit to Great Temple of Ramses II',
//                 'Exploration of Nefertari Temple',
//                 'Admiring colossal statues',
//                 'History of temples relocation',
//                 'Return to Aswan'
//             ],
//             ar: [
//                 'رحلة برية إلى أبو سمبل (3-4 ساعات)',
//                 'زيارة معبد رمسيس الثاني الكبير',
//                 'استكشاف معبد نفرتاري',
//                 'الإعجاب بالتماثيل الضخمة',
//                 'تاريخ نقل المعابد',
//                 'العودة إلى أسوان'
//             ]
//         }
//     },
//     'edfuTemple': {
//         duration: 'half-day',
//         activities: {
//             es: [
//                 'Viaje en calesa al Templo de Edfu',
//                 'Visita al Templo de Horus',
//                 'Exploración del templo mejor conservado',
//                 'Admiración de relieves y jeroglíficos',
//                 'Historia del dios halcón Horus'
//             ],
//             en: [
//                 'Horse carriage ride to Edfu Temple',
//                 'Visit to Temple of Horus',
//                 'Exploration of best preserved temple',
//                 'Admiring reliefs and hieroglyphs',
//                 'History of falcon god Horus'
//             ],
//             ar: [
//                 'رحلة بالحنطور إلى معبد إدفو',
//                 'زيارة معبد حورس',
//                 'استكشاف المعبد الأفضل حفظاً',
//                 'الإعجاب بالنقوش والهيروغليفية',
//                 'تاريخ الإله الصقر حورس'
//             ]
//         }
//     },
//     'komOmboTemple': {
//         duration: 'short',
//         activities: {
//             es: [
//                 'Visita al Templo de Kom Ombo',
//                 'Exploración del templo doble único',
//                 'Admiración de relieves médicos antiguos',
//                 'Historia de Sobek (cocodrilo) y Haroeris (halcón)',
//                 'Vista del museo de cocodrilos momificados'
//             ],
//             en: [
//                 'Visit to Kom Ombo Temple',
//                 'Exploration of unique double temple',
//                 'Admiring ancient medical reliefs',
//                 'History of Sobek (crocodile) and Haroeris (falcon)',
//                 'View of mummified crocodiles museum'
//             ],
//             ar: [
//                 'زيارة معبد كوم أمبو',
//                 'استكشاف المعبد المزدوج الفريد',
//                 'الإعجاب بالنقوش الطبية القديمة',
//                 'تاريخ سوبك (التمساح) وحورس (الصقر)',
//                 'مشاهدة متحف التماسيح المحنطة'
//             ]
//         }
//     },

//     // الإسكندرية
//     'qaitbayCitadel': {
//         duration: 'half-day',
//         activities: {
//             es: [
//                 'Visita a la Ciudadela de Qaitbay',
//                 'Exploración de la fortaleza mameluca',
//                 'Vista del sitio del antiguo Faro',
//                 'Admiración de vistas al Mediterráneo',
//                 'Historia de la defensa costera'
//             ],
//             en: [
//                 'Visit to Qaitbay Citadel',
//                 'Exploration of Mameluke fortress',
//                 'View of ancient Lighthouse site',
//                 'Admiring Mediterranean views',
//                 'History of coastal defense'
//             ],
//             ar: [
//                 'زيارة قلعة قايتباي',
//                 'استكشاف القلعة المملوكية',
//                 'مشاهدة موقع الفنار القديم',
//                 'الإعجاب بإطلالات المتوسط',
//                 'تاريخ الدفاع الساحلي'
//             ]
//         }
//     },
//     'alexandriaNationalMuseum': {
//         duration: 'half-day',
//         activities: {
//             es: [
//                 'Visita al Museo Nacional de Alejandría',
//                 'Exploración de artefactos grecorromanos',
//                 'Descubrimiento de la época ptolemaica',
//                 'Admiración de mosaicos y estatuas',
//                 'Historia de Alejandría multicultural'
//             ],
//             en: [
//                 'Visit to Alexandria National Museum',
//                 'Exploration of Greco-Roman artifacts',
//                 'Discovery of Ptolemaic era',
//                 'Admiring mosaics and statues',
//                 'History of multicultural Alexandria'
//             ],
//             ar: [
//                 'زيارة متحف الإسكندرية القومي',
//                 'استكشاف القطع الأثرية اليونانية الرومانية',
//                 'اكتشاف العصر البطلمي',
//                 'الإعجاب بالفسيفساء والتماثيل',
//                 'تاريخ الإسكندرية متعددة الثقافات'
//             ]
//         }
//     },
//     'komElShoqafaCatacombs': {
//         duration: 'short',
//         activities: {
//             es: [
//                 'Descenso a las Catacumbas de Kom el-Shoqafa',
//                 'Exploración de tumbas subterráneas',
//                 'Admiración de mezcla de estilos egipcio-romano',
//                 'Vista de la Sala de Caracalla',
//                 'Historia de las prácticas funerarias'
//             ],
//             en: [
//                 'Descent into Kom el-Shoqafa Catacombs',
//                 'Exploration of underground tombs',
//                 'Admiring mix of Egyptian-Roman styles',
//                 'View of Caracalla Hall',
//                 'History of burial practices'
//             ],
//             ar: [
//                 'النزول إلى سراديب كوم الشقافة',
//                 'استكشاف المقابر تحت الأرض',
//                 'الإعجاب بمزيج الأنماط المصرية الرومانية',
//                 'مشاهدة قاعة كاراكلا',
//                 'تاريخ ممارسات الدفن'
//             ]
//         }
//     }
// };

// private createDayFromSites(
//     sites: string[], 
//     city: string, 
//     dayNumber: number, 
//     language: Language
// ): ItineraryItem {
//     const activities: string[] = [];
    
//     // إضافة الإفطار
//     activities.push(this.getBasicActivity('breakfast', language));
    
//     // إضافة أنشطة كل موقع
//     for (const site of sites) {
//         const siteData = this.SITES_DATABASE[site as keyof typeof this.SITES_DATABASE];
//         if (siteData && siteData.activities[language]) {
//             activities.push(...siteData.activities[language]);
//         }
//     }
    
//     // إضافة الغداء
//     activities.push(this.getBasicActivity('lunch', language));
    
//     // إضافة وقت حر ممكن
//     if (sites.length <= 2) {
//         activities.push(this.getBasicActivity('free_time', language));
//     }
    
//     // إضافة العشاء
//     activities.push(this.getBasicActivity('dinner', language));
    
//     // إنشاء العنوان
//     const siteNames = sites.map(s => this.getSiteName(s, language)).join(' & ');
//     const cityName = this.getCityName(city, language);
    
//     return {
//         day: dayNumber,
//         title: {
//             es: `Día ${dayNumber} - ${cityName}: ${siteNames}`,
//             en: `Day ${dayNumber} - ${cityName}: ${siteNames}`,
//             ar: `اليوم ${dayNumber} - ${cityName}: ${siteNames}`
//         },
//         activities: {
//             es: activities,
//             en: activities,
//             ar: activities
//         }
//     };
// }



//     private validateCustomProgramName(proposedName: string): boolean {
//         const readyProgramNames = this.programs.map(p => 
//             p.name.en.toLowerCase().trim()
//         );
        
//         const proposedLower = proposedName.toLowerCase().trim();
        
//         const isReadyProgramName = readyProgramNames.some(readyName => 
//             proposedLower.includes(readyName) || readyName.includes(proposedLower)
//         );
        
//         const hasCorrectFormat = /custom\s+\d+\s*-\s*day/i.test(proposedLower);
        
//         return !isReadyProgramName && hasCorrectFormat;
//     }

//     findMatchingReadyProgram(request: {
//         duration: number;
//         destinations: string[];
//         language: Language;
//     }): Program | null {
//         const { duration, destinations, language } = request;
        
//         for (const program of this.programs) {
//             if (this.doesProgramMatchRequest(program, duration, destinations)) {
//                 return program;
//             }
//         }
        
//         return null;
//     }

//     private doesProgramMatchRequest(program: Program, duration: number, destinations: string[]): boolean {
//         if (program.duration.days !== duration) {
//             return false;
//         }

//         const programCities = this.extractCitiesFromProgram(program);
//         const requestCities = destinations.map(d => d.toLowerCase());

//         const hasAllCities = requestCities.every(city => 
//             programCities.some(programCity => programCity.includes(city))
//         );

//         return hasAllCities;
//     }

//     private extractCitiesFromProgram(program: Program): string[] {
//         const cities = new Set<string>();
//         const itinerary = this.getProgramItinerary(program);

//         itinerary.forEach(day => {
//             const text = `${day.title?.en || ''} ${Object.values(day.activities).flat().join(' ')}`.toLowerCase();
            
//             if (text.includes('cairo') || text.includes('القاهرة')) cities.add('cairo');
//             if (text.includes('luxor') || text.includes('الأقصر')) cities.add('luxor');
//             if (text.includes('aswan') || text.includes('أسوان')) cities.add('aswan');
//             if (text.includes('alexandria') || text.includes('الإسكندرية')) cities.add('alexandria');
//             if (text.includes('cruise') || text.includes('كروز') || text.includes('nile')) cities.add('cruise');
//         });

//         return Array.from(cities);
//     }

//     extractCityData(city: string, language: Language = 'en'): {
//         itinerary: ItineraryItem[];
//         accommodations: { gold: string; diamond: string };
//         sites: SupportedSite[];
//     } {
//         const cityLower = city.toLowerCase();
//         const results = {
//             itinerary: [] as ItineraryItem[],
//             accommodations: { gold: '', diamond: '' },
//             sites: [] as SupportedSite[]
//         };

//         for (const program of this.programs) {
//             const programItinerary = this.getProgramItinerary(program);
//             const cityItinerary = this.filterItineraryByCity(programItinerary, cityLower, language);
//             results.itinerary.push(...cityItinerary);

//             if (program.accommodations) {
//                 const cityAccommodations = this.extractCityAccommodations(program, cityLower);
//                 if (cityAccommodations.gold) results.accommodations.gold = cityAccommodations.gold;
//                 if (cityAccommodations.diamond) results.accommodations.diamond = cityAccommodations.diamond;
//             }

//             const citySites = this.extractCitySites(programItinerary, cityLower, language);
//             results.sites.push(...citySites);
//         }

//         results.itinerary = this.removeDuplicateItineraryItems(results.itinerary);
//         results.sites = [...new Set(results.sites)];

//         return results;
//     }

//     private extractCityAccommodations(program: Program, city: string): { gold: string; diamond: string } {
//         const result = { gold: '', diamond: '' };

//         if (!program.accommodations) return result;

//         if (program.accommodations.gold) {
//             for (const acc of program.accommodations.gold) {
//                 if (this.isCityMatch(acc.city, city)) {
//                     result.gold = acc.hotel[this.getLanguageKey(acc.hotel)] || acc.hotel.en || '';
//                     break;
//                 }
//             }
//         }

//         if (program.accommodations.diamond) {
//             for (const acc of program.accommodations.diamond) {
//                 if (this.isCityMatch(acc.city, city)) {
//                     result.diamond = acc.hotel[this.getLanguageKey(acc.hotel)] || acc.hotel.en || '';
//                     break;
//                 }
//             }
//         }

//         return result;
//     }

//     private extractCitySites(itinerary: ItineraryItem[], city: string, language: Language): SupportedSite[] {
//         const sites: SupportedSite[] = [];
//         const cityKeywords = this.getCityKeywords(city);

//         for (const day of itinerary) {
//             let activities: string[] = [];
//             if (day.activities) {
//                 if (Array.isArray(day.activities)) {
//                     activities = day.activities;
//                 } else if (typeof day.activities === 'object') {
//                     activities = day.activities[language] || day.activities.en || [];
//                 }
//             }
            
//             for (const activity of activities) {
//                 const activityLower = activity.toLowerCase();
                
//                 if (this.containsKeywords(activityLower, ['pyramid', 'pirámide', 'هرم']) && 
//                     this.containsKeywords(activityLower, ['giza', 'guiza', 'الجيزة'])) {
//                     sites.push('gizaPyramidsAndSphinx');
//                 }
//                 if (this.containsKeywords(activityLower, ['sphinx', 'esfinge', 'أبو الهول'])) {
//                     sites.push('gizaPyramidsAndSphinx');
//                 }
//                 if (this.containsKeywords(activityLower, ['museum', 'museo', 'متحف']) && 
//                     this.containsKeywords(activityLower, ['egyptian', 'egipcio', 'مصري'])) {
//                     sites.push('egyptianMuseum');
//                 }
//                 if (this.containsKeywords(activityLower, ['karnak', 'الكرنك'])) {
//                     sites.push('karnakTemple');
//                 }
//                 if (this.containsKeywords(activityLower, ['luxor temple', 'templo de luxor', 'معبد الأقصر'])) {
//                     sites.push('luxorTemple');
//                 }
//                 if (this.containsKeywords(activityLower, ['valley of the kings', 'valle de los reyes', 'وادي الملوك'])) {
//                     sites.push('valleyOfTheKings');
//                 }
//                 if (this.containsKeywords(activityLower, ['hatshepsut', 'حتشبسوت'])) {
//                     sites.push('hatshepsutTemple');
//                 }
//                 if (this.containsKeywords(activityLower, ['abu simbel', 'أبو سمبل'])) {
//                     sites.push('abuSimbelTemples');
//                 }
//                 if (this.containsKeywords(activityLower, ['philae', 'فيلة'])) {
//                     sites.push('philaeTemple');
//                 }
//                 if (this.containsKeywords(activityLower, ['kom ombo', 'كوم أمبو'])) {
//                     sites.push('komOmboTemple');
//                 }
//                 if (this.containsKeywords(activityLower, ['edfu', 'إدفو'])) {
//                     sites.push('edfuTemple');
//                 }
//                 if (this.containsKeywords(activityLower, ['khan el khalili', 'خان الخليلي'])) {
//                     sites.push('khanElKhalili');
//                 }
//                 if (this.containsKeywords(activityLower, ['citadel', 'ciudadela', 'قلعة'])) {
//                     sites.push('qaitbayCitadel');
//                 }
//                 if (this.containsKeywords(activityLower, ['alexandria', 'alejandría', 'الإسكندرية'])) {
//                     sites.push('alexandriaNationalMuseum');
//                 }
//             }
//         }

//         return [...new Set(sites)];
//     }

//     private filterItineraryByCity(itinerary: ItineraryItem[], city: string, language: Language): ItineraryItem[] {
//         const cityKeywords = this.getCityKeywords(city);
//         const filtered: ItineraryItem[] = [];

//         for (const day of itinerary) {
//             let activities: string[] = [];
//             if (day.activities) {
//                 if (Array.isArray(day.activities)) {
//                     activities = day.activities;
//                 } else if (typeof day.activities === 'object') {
//                     activities = day.activities[language] || day.activities.en || [];
//                 }
//             }
            
//             const title = day.title?.[language] || day.title?.en || '';
            
//             const hasCityReference = cityKeywords.some(keyword => 
//                 title.toLowerCase().includes(keyword) || 
//                 activities.some(activity => activity.toLowerCase().includes(keyword))
//             );

//             if (hasCityReference) {
//                 filtered.push(day);
//             }
//         }

//         return filtered;
//     }

//     private getCityKeywords(city: string): string[] {
//         const cityMap: { [key: string]: string[] } = {
//             'cairo': ['cairo', 'el cairo', 'القاهرة', 'القاهره'],
//             'luxor': ['luxor', 'الأقصر', 'الاقصر'],
//             'aswan': ['aswan', 'asuan', 'أسوان', 'اسوان'],
//             'alexandria': ['alexandria', 'alejandría', 'الإسكندرية', 'الاسكندرية'],
//             'abu simbel': ['abu simbel', 'أبو سمبل', 'ابو سمبل'],
//             'red sea': ['red sea', 'mar rojo', 'البحر الأحمر', 'البحر الاحمر', 'hurghada', 'شرم الشيخ'],
//             'cruise': ['cruise', 'crucero', 'كروز', 'نيل', 'nile']
//         };

//         return cityMap[city.toLowerCase()] || [city.toLowerCase()];
//     }

//     private containsKeywords(text: string, keywords: string[]): boolean {
//         return keywords.some(keyword => text.includes(keyword.toLowerCase()));
//     }

//     private isCityMatch(cityObj: LocalizedString, targetCity: string): boolean {
//         const cityKeywords = this.getCityKeywords(targetCity);
//         const cityValues = Object.values(cityObj).map(v => v.toLowerCase());
        
//         return cityKeywords.some(keyword => 
//             cityValues.some(value => value.includes(keyword))
//         );
//     }

//     private getLanguageKey(obj: LocalizedString): keyof LocalizedString {
//         return 'en' as keyof LocalizedString;
//     }

//     private getProgramItinerary(program: Program): ItineraryItem[] {
//         if (program.itineraryOptions && program.itineraryOptions.length > 0) {
//             return program.itineraryOptions[0].itinerary;
//         } else if (program.itinerary) {
//             return program.itinerary;
//         }
//         return [];
//     }

//     private removeDuplicateItineraryItems(items: ItineraryItem[]): ItineraryItem[] {
//         const seen = new Set<string>();
//         return items.filter(item => {
//             const titleKey = item.title?.en ?? item.title?.es ?? item.title?.ar ?? 'untitled';
//             const key = `${item.day}-${titleKey}`;
//             if (seen.has(key)) {
//                 return false;
//             }
//             seen.add(key);
//             return true;
//         });
//     }

//     private extractHotelsFromAllPrograms(): { city: string; category: 'gold' | 'diamond'; hotel: LocalizedString }[] {
//         const hotels: { city: string; category: 'gold' | 'diamond'; hotel: LocalizedString }[] = [];

//         for (const program of this.programs) {
//             if (program.accommodations) {
//                 if (program.accommodations.gold) {
//                     program.accommodations.gold.forEach(acc => {
//                         const cityKey = this.detectCityFromAccommodation(acc);
//                         if (cityKey) {
//                             hotels.push({
//                                 city: cityKey,
//                                 category: 'gold',
//                                 hotel: acc.hotel
//                             });
//                         }
//                     });
//                 }

//                 if (program.accommodations.diamond) {
//                     program.accommodations.diamond.forEach(acc => {
//                         const cityKey = this.detectCityFromAccommodation(acc);
//                         if (cityKey) {
//                             hotels.push({
//                                 city: cityKey,
//                                 category: 'diamond',
//                                 hotel: acc.hotel
//                             });
//                         }
//                     });
//                 }
//             }
//         }

//         return hotels;
//     }

//     private detectCityFromAccommodation(acc: any): string {
//         const cityName = acc.city.en?.toLowerCase() || '';
        
//         if (cityName.includes('cairo') || cityName.includes('القاهرة')) return 'cairo';
//         if (cityName.includes('luxor') || cityName.includes('الأقصر')) return 'luxor';
//         if (cityName.includes('aswan') || cityName.includes('أسوان')) return 'aswan';
//         if (cityName.includes('alexandria') || cityName.includes('الإسكندرية')) return 'alexandria';
        
//         return '';
//     }

//     private findHotelForCity(city: string, category: 'gold' | 'diamond', allHotels: any[]): any {
//         const availableHotels = allHotels.filter(h => 
//             h.city === city && h.category === category
//         );
        
//         if (availableHotels.length > 0) {
//             return availableHotels[Math.floor(Math.random() * availableHotels.length)];
//         }
        
//         return null;
//     }

//     private getDefaultHotelForCity(city: string, category: 'gold' | 'diamond', language: Language): LocalizedString {
//         const defaultHotels = {
//             cairo: {
//                 gold: {
//                     es: 'Hotel Steigenberger El Tahrir',
//                     en: 'Steigenberger Hotel El Tahrir', 
//                     ar: 'فندق شتيجنبرجر التحرير'
//                 },
//                 diamond: {
//                     es: 'Hotel Marriott Mena House',
//                     en: 'Marriott Mena House Hotel',
//                     ar: 'فندق ماريوت مينا هاوس'
//                 }
//             },
//             luxor: {
//                 gold: {
//                     es: 'Hotel Sofitel Winter Palace',
//                     en: 'Sofitel Winter Palace Hotel',
//                     ar: 'فندق سوفيتيل قصر الشتاء'
//                 },
//                 diamond: {
//                     es: 'Hotel Al Moudira',
//                     en: 'Al Moudira Hotel',
//                     ar: 'فندق المديرة'
//                 }
//             },
//             aswan: {
//                 gold: {
//                     es: 'Hotel Sofitel Legend Old Cataract',
//                     en: 'Sofitel Legend Old Cataract Hotel',
//                     ar: 'فندق سوفيتيل ليجند أولد كاتاراكت'
//                 },
//                 diamond: {
//                     es: 'Hotel Basma',
//                     en: 'Basma Hotel',
//                     ar: 'فندق بسمة'
//                 }
//             }
//         };

//         const cityHotels = defaultHotels[city as keyof typeof defaultHotels];
//         if (cityHotels) {
//             return {
//                 es: cityHotels[category].es,
//                 en: cityHotels[category].en,
//                 ar: cityHotels[category].ar
//             };
//         }

//         return {
//             es: `Hotel en ${city}`,
//             en: `Hotel in ${city}`,
//             ar: `فندق في ${city}`
//         };
//     }

//     private createCustomAccommodations(
//         nightsDistribution: any,
//         category: 'gold' | 'diamond',
//         language: Language
//     ): { gold: any[]; diamond: any[] } {
//         const accommodations = { gold: [] as any[], diamond: [] as any[] };

//         const allHotels = this.extractHotelsFromAllPrograms();

//         for (const [city, nights] of Object.entries(nightsDistribution)) {
//             if (typeof nights === 'number' && nights > 0 && city !== 'cruise') {
//                 const cityName = this.getCityLocalizedName(city);
                
//                 const hotelForCity = this.findHotelForCity(city, category, allHotels);
                
//                 if (hotelForCity) {
//                     accommodations[category].push({
//                         city: cityName,
//                         hotel: hotelForCity.hotel
//                     });
//                 } else {
//                     accommodations[category].push({
//                         city: cityName,
//                         hotel: this.getDefaultHotelForCity(city, category, language)
//                     });
//                 }
//             }
//         }

//         if (nightsDistribution.cruise > 0) {
//             accommodations[category].push({
//                 city: { es: 'Crucero por el Nilo', en: 'Nile Cruise', ar: 'رحلة نيلية' },
//                 hotel: { es: 'Nave de Lujo', en: 'Luxury Cruise Ship', ar: 'سفينة نيلية فاخرة' }
//             });
//         }

//         return accommodations;
//     }

//     // 🎯 إنشاء برنامج مخصص مرن بناءً على اختيارات العميل
//     createFlexibleCustomProgram(request: FlexibleCustomRequest): Program {
//         const { travelers, duration, dayByDay, season, category, language } = request;
        
//         // تحليل الطلب المرن
//         const analyzedRequest = this.analyzeFlexibleRequest(dayByDay, duration);
        
//         // إنشاء البرنامج اليومي المرن
//         const flexibleItinerary = this.createFlexibleItinerary(analyzedRequest, language);
        
//         // حساب توزيع الليالي
//         const nightsDistribution = this.calculateFlexibleNightsDistribution(analyzedRequest);
        
//         // إنشاء أماكن الإقامة
//         const accommodations = this.createCustomAccommodations(
//             nightsDistribution, 
//             category,
//             language
//         );

//         // إنشاء البرنامج النهائي
//         const program: Program = {
//             id: `flexible-custom-${Date.now()}`,
//             isCustom: true,
//             name: this.createFlexibleProgramName(analyzedRequest, language),
//             icon: "🗺️",
//             duration: { days: duration, nights: duration - 1 },
//             priceFrom: 0,
//             categories: [category],
//             startCity: { es: "El Cairo", en: "Cairo", ar: "القاهرة" },
//             ...(analyzedRequest.hasCruise && { cruiseNights: analyzedRequest.cruiseNights }),
//             briefDescription: this.createFlexibleBriefDescription(analyzedRequest, language),
//             generalDescription: this.createFlexibleGeneralDescription(analyzedRequest, language),
//             itinerary: flexibleItinerary,
//             itineraryOptions: [
//                 {
//                     name: { es: "Itinerario Personalizado", en: "Custom Itinerary", ar: "البرنامج المخصص" },
//                     itinerary: flexibleItinerary
//                 }
//             ],
//             accommodations: accommodations,
//             servicesIncluded: this.createServicesIncluded(nightsDistribution, category, language),
//             servicesExcluded: knowledgeBase.defaults.servicesExcluded,
//             importantNotes: knowledgeBase.defaults.importantNotes,
//             quoteParams: {
//                 travelers,
//                 duration,
//                 season,
//                 category,
//                 itineraryPlan: {
//                     nights: this.convertNightsDistribution(nightsDistribution),
//                     sites: this.extractSitesFromFlexibleItinerary(flexibleItinerary, language),
//                     flightSectors: analyzedRequest.hasCruise ? 2 : 0,
//                 }
//             }
//         };

//         return program;
//     }

//     // 🧠 تحليل الطلب المرن
//     private analyzeFlexibleRequest(dayByDay: DayPlan[], duration: number): {
//         cities: string[];
//         sites: { [city: string]: string[] };
//         hasCruise: boolean;
//         cruiseNights: number;
//         cruiseDirection: string;
//         cruiseStartCity: string;
//         cruiseDepartureDay: string;
//     } {
//         const cities: string[] = [];
//         const sites: { [city: string]: string[] } = {};
//         let hasCruise = false;
//         let cruiseNights = 0;
//         let cruiseDirection = '';
//         let cruiseStartCity = '';
//         let cruiseDepartureDay = '';

//         for (const dayPlan of dayByDay) {
//             if (dayPlan.type === 'cruise') {
//                 hasCruise = true;
//                 cruiseNights = dayPlan.nights || 3;
//                 cruiseDirection = dayPlan.direction || 'luxor-to-aswan';
//                 cruiseStartCity = dayPlan.startCity || 'luxor';
//                 cruiseDepartureDay = dayPlan.departureDay || 'saturday';
//             } else if (dayPlan.city) {
//                 const city = dayPlan.city.toLowerCase();
//                 if (!cities.includes(city)) {
//                     cities.push(city);
//                 }
                
//                 if (dayPlan.sites && dayPlan.sites.length > 0) {
//                     sites[city] = dayPlan.sites;
//                 } else {
//                     // إذا لم يحدد العميل مواقع محددة، نستخدم المواقع الافتراضية للمدينة
//                     sites[city] = AVAILABLE_SITES[city as keyof typeof AVAILABLE_SITES] || [];
//                 }
//             }
//         }

//         return {
//             cities,
//             sites,
//             hasCruise,
//             cruiseNights,
//             cruiseDirection,
//             cruiseStartCity,
//             cruiseDepartureDay
//         };
//     }

//     // 🎯 إنشاء برنامج مخصص ذكي (الطريقة القديمة - للتوافق مع الكود الموجود)
//     createCustomProgram(request: {
//         duration: number;
//         travelers: number;
//         destinations: string[];
//         season: 'summer' | 'winter';
//         category: 'gold' | 'diamond';
//         language: Language;
//     }): Program {
//         const { duration, travelers, destinations, season, category, language } = request;
//         const totalNights = duration - 1;

//         // حساب توزيع الليالي
//         const nightsDistribution = this.calculateNightsDistribution(duration, destinations);

//         // إنشاء البرنامج اليومي المفصل
//         const customItinerary = this.createCustomItinerary(
//             duration, 
//             destinations, 
//             nightsDistribution,
//             language
//         );

//         // إنشاء أماكن الإقامة المفصلة
//         const accommodations = this.createCustomAccommodations(
//             nightsDistribution, 
//             category,
//             language
//         );

//         // إنشاء البرنامج النهائي
//         const program: Program = {
//             id: `custom-${Date.now()}`,
//             isCustom: true,
//             name: this.createCustomProgramName(duration, destinations, language),
//             icon: "🗺️",
//             duration: { days: duration, nights: totalNights },
//             priceFrom: 0,
//             categories: [category],
//             startCity: { es: "El Cairo", en: "Cairo", ar: "القاهرة" },
//             ...(nightsDistribution.cruise > 0 && { cruiseNights: nightsDistribution.cruise }),
//             briefDescription: this.createBriefDescription(duration, destinations, language),
//             generalDescription: this.createGeneralDescription(duration, destinations, language),
//             itinerary: customItinerary,
//             itineraryOptions: [
//                 {
//                     name: { es: "Itinerario Principal", en: "Main Itinerary", ar: "البرنامج الرئيسي" },
//                     itinerary: customItinerary
//                 }
//             ],
//             accommodations: accommodations,
//             servicesIncluded: this.createServicesIncluded(nightsDistribution, category, language),
//             servicesExcluded: knowledgeBase.defaults.servicesExcluded,
//             importantNotes: knowledgeBase.defaults.importantNotes,
//             quoteParams: {
//                 travelers,
//                 duration,
//                 season,
//                 category,
//                 itineraryPlan: {
//                     nights: this.convertNightsDistribution(nightsDistribution),
//                     sites: this.extractSitesFromItinerary(customItinerary, language),
//                     flightSectors: nightsDistribution.cruise > 0 ? 2 : 0,
//                 }
//             }
//         };

//         return program;
//     }

//     // 🗺️ إنشاء البرنامج اليومي المرن
//     private createFlexibleItinerary(analyzedRequest: any, language: Language): ItineraryItem[] {
//         const itinerary: ItineraryItem[] = [];
//         let currentDay = 1;

//         // يوم الوصول
//         itinerary.push(this.createArrivalDay(language));

//         // إضافة أيام المدن حسب اختيار العميل
//         for (const city of analyzedRequest.cities) {
//             const citySites = analyzedRequest.sites[city] || [];
//             const cityDays = this.createCityDaysWithSpecificSites(city, citySites, language);
            
//             for (const day of cityDays) {
//                 itinerary.push({
//                     ...day,
//                     day: ++currentDay
//                 });
//             }
//         }

//         // إضافة أيام الكروز إذا كان مطلوباً
//         if (analyzedRequest.hasCruise) {
//             const cruiseDays = this.createCruiseDaysWithRules(
//                 analyzedRequest.cruiseNights,
//                 analyzedRequest.cruiseDirection,
//                 analyzedRequest.cruiseStartCity,
//                 language
//             );
            
//             for (const day of cruiseDays) {
//                 itinerary.push({
//                     ...day,
//                     day: ++currentDay
//                 });
//             }
//         }

//         // يوم المغادرة
//         itinerary.push(this.createDepartureDay(currentDay + 1, language));

//         return itinerary;
//     }

//     // 🏛️ إنشاء أيام المدينة مع مواقع محددة
//     private createCityDaysWithSpecificSites(city: string, sites: string[], language: Language): ItineraryItem[] {
//         const days: ItineraryItem[] = [];
        
//         switch (city.toLowerCase()) {
//             case 'cairo':
//                 days.push(...this.createCairoDaysWithSites(sites, language));
//                 break;
//             case 'luxor':
//                 days.push(...this.createLuxorDaysWithSites(sites, language));
//                 break;
//             case 'aswan':
//                 days.push(...this.createAswanDaysWithSites(sites, language));
//                 break;
//             case 'alexandria':
//                 days.push(...this.createAlexandriaDaysWithSites(sites, language));
//                 break;
//         }

//         return days;
//     }

//     // 🏛️ إنشاء أيام القاهرة مع مواقع محددة
//     private createCairoDaysWithSites(sites: string[], language: Language): ItineraryItem[] {
//         const days: ItineraryItem[] = [];
        
//         // تجميع المواقع حسب الأيام
//         const sitesPerDay = this.groupSitesByDay(sites, 'cairo');
        
//         for (let i = 0; i < sitesPerDay.length; i++) {
//             const daySites = sitesPerDay[i];
//             const dayTitle = this.getDayTitleForSites(daySites, 'cairo', language);
//             const activities = this.generateActivitiesForSites(daySites, 'cairo', language);
            
//             days.push({
//                 day: i + 1,
//                 title: dayTitle,
//                 activities: activities
//             });
//         }

//         return days;
//     }

//     // 🏛️ إنشاء أيام الأقصر مع مواقع محددة
//     private createLuxorDaysWithSites(sites: string[], language: Language): ItineraryItem[] {
//         const days: ItineraryItem[] = [];
        
//         const sitesPerDay = this.groupSitesByDay(sites, 'luxor');
        
//         for (let i = 0; i < sitesPerDay.length; i++) {
//             const daySites = sitesPerDay[i];
//             const dayTitle = this.getDayTitleForSites(daySites, 'luxor', language);
//             const activities = this.generateActivitiesForSites(daySites, 'luxor', language);
            
//             days.push({
//                 day: i + 1,
//                 title: dayTitle,
//                 activities: activities
//             });
//         }

//         return days;
//     }

//     // 🏛️ إنشاء أيام أسوان مع مواقع محددة
//     private createAswanDaysWithSites(sites: string[], language: Language): ItineraryItem[] {
//         const days: ItineraryItem[] = [];
        
//         const sitesPerDay = this.groupSitesByDay(sites, 'aswan');
        
//         for (let i = 0; i < sitesPerDay.length; i++) {
//             const daySites = sitesPerDay[i];
//             const dayTitle = this.getDayTitleForSites(daySites, 'aswan', language);
//             const activities = this.generateActivitiesForSites(daySites, 'aswan', language);
            
//             days.push({
//                 day: i + 1,
//                 title: dayTitle,
//                 activities: activities
//             });
//         }

//         return days;
//     }

//     // 🏛️ إنشاء أيام الإسكندرية مع مواقع محددة
//     private createAlexandriaDaysWithSites(sites: string[], language: Language): ItineraryItem[] {
//         const days: ItineraryItem[] = [];
        
//         const sitesPerDay = this.groupSitesByDay(sites, 'alexandria');
        
//         for (let i = 0; i < sitesPerDay.length; i++) {
//             const daySites = sitesPerDay[i];
//             const dayTitle = this.getDayTitleForSites(daySites, 'alexandria', language);
//             const activities = this.generateActivitiesForSites(daySites, 'alexandria', language);
            
//             days.push({
//                 day: i + 1,
//                 title: dayTitle,
//                 activities: activities
//             });
//         }

//         return days;
//     }

//     // 🚢 إنشاء أيام الكروز مع القواعد
//     private createCruiseDaysWithRules(nights: number, direction: string, startCity: string, language: Language): ItineraryItem[] {
//         const days: ItineraryItem[] = [];
        
//         if (direction === 'luxor-to-aswan') {
//             // الأقصر إلى أسوان
//             days.push(this.createCruiseDay('luxor', 'karnakTemple', 'luxorTemple', language));
//             days.push(this.createCruiseDay('edfu', 'edfuTemple', language));
//             days.push(this.createCruiseDay('komOmbo', 'komOmboTemple', language));
//             days.push(this.createCruiseDay('aswan', 'philaeTemple', 'highDam', language));
//         } else {
//             // أسوان إلى الأقصر
//             days.push(this.createCruiseDay('aswan', 'philaeTemple', 'highDam', language));
//             days.push(this.createCruiseDay('komOmbo', 'komOmboTemple', language));
//             days.push(this.createCruiseDay('edfu', 'edfuTemple', language));
//             days.push(this.createCruiseDay('luxor', 'valleyOfTheKings', 'hatshepsutTemple', language));
//         }

//         return days.slice(0, nights);
//     }

//     // 🚢 إنشاء يوم كروز واحد
//     private createCruiseDay(city: string, ...sites: string[]): ItineraryItem {
//         return {
//             day: 1,
//             title: {
//                 es: `Crucero - ${this.getCityName(city, 'es')}`,
//                 en: `Cruise - ${this.getCityName(city, 'en')}`,
//                 ar: `كروز - ${this.getCityName(city, 'ar')}`
//             },
//             activities: {
//                 es: this.generateCruiseActivities(city, sites, 'es'),
//                 en: this.generateCruiseActivities(city, sites, 'en'),
//                 ar: this.generateCruiseActivities(city, sites, 'ar')
//             }
//         };
//     }

//     private getDefaultSitesForCity(city: string): string[][] {
//     const defaults: { [key: string]: string[][] } = {
//         'cairo': [
//             ['gizaPyramidsAndSphinx', 'saqqara'],
//             ['egyptianMuseum', 'citadelOfSaladin'],
//             ['khanElKhalili']
//         ],
//         'luxor': [
//             ['karnakTemple', 'luxorTemple'],
//             ['valleyOfTheKings', 'hatshepsutTemple']
//         ],
//         'aswan': [
//             ['philaeTemple', 'highDam'],
//             ['abuSimbelTemples']
//         ],
//         'alexandria': [
//             ['qaitbayCitadel', 'alexandriaNationalMuseum'],
//             ['komElShoqafaCatacombs']
//         ]
//     };
    
//     return defaults[city.toLowerCase()] || [[]];
// }


//     // 📅 تجميع المواقع حسب الأيام
//     private groupSitesByDay(sites: string[], city: string): string[][] {
//     if (!sites || sites.length === 0) {
//         // إذا لم يختر العميل مواقع، نستخدم المواقع الافتراضية
//         return this.getDefaultSitesForCity(city);
//     }
    
//     const grouped: string[][] = [];
//     const fullDaySites: string[] = [];
//     const halfDaySites: string[] = [];
//     const shortSites: string[] = [];
    
//     // تصنيف المواقع حسب المدة
//     for (const site of sites) {
//         const siteData = this.SITES_DATABASE[site as keyof typeof this.SITES_DATABASE];
//         if (siteData) {
//             switch (siteData.duration) {
//                 case 'full-day':
//                     fullDaySites.push(site);
//                     break;
//                 case 'half-day':
//                     halfDaySites.push(site);
//                     break;
//                 case 'short':
//                     shortSites.push(site);
//                     break;
//             }
//         }
//     }
//     fullDaySites.forEach(site => {
//         grouped.push([site]);
//     });
    
//     // تجميع المواقع نصف يوم (2 في اليوم)
//     for (let i = 0; i < halfDaySites.length; i += 2) {
//         if (i + 1 < halfDaySites.length) {
//             grouped.push([halfDaySites[i], halfDaySites[i + 1]]);
//         } else {
//             // آخر موقع نصف يوم لوحده
//             grouped.push([halfDaySites[i], ...shortSites.splice(0, 1)]);
//         }
//     }
    
//     // المواقع القصيرة المتبقية (3-4 في اليوم)
//     while (shortSites.length > 0) {
//         grouped.push(shortSites.splice(0, 3));
//     }
    
//     return grouped;
// }


//     // 📊 الحصول على الحد الأقصى للمواقع في اليوم الواحد
//     private getMaxSitesPerDay(city: string): number {
//         const limits = {
//             'cairo': 3,
//             'luxor': 4,
//             'aswan': 3,
//             'alexandria': 4
//         };
        
//         return limits[city as keyof typeof limits] || 3;
//     }

//     // 🏷️ الحصول على عنوان اليوم للمواقع
//     private getDayTitleForSites(sites: string[], city: string, language: Language): LocalizedString {
//         const siteNames = sites.map(site => this.getSiteName(site, language)).join(' & ');
//         const cityName = this.getCityName(city, language);
        
//         return {
//             es: `${cityName} - ${siteNames}`,
//             en: `${cityName} - ${siteNames}`,
//             ar: `${cityName} - ${siteNames}`
//         };
//     }

//     // 🎯 إنشاء الأنشطة للمواقع المحددة
//     private generateActivitiesForSites(sites: string[], city: string, language: Language): { es: string[]; en: string[]; ar: string[] } {
//         const activities = {
//             es: [] as string[],
//             en: [] as string[],
//             ar: [] as string[]
//         };

//         // إضافة أنشطة أساسية
//         activities[language].push(this.getBasicActivity('breakfast', language));
        
//         // إضافة أنشطة لكل موقع
//         for (const site of sites) {
//             const siteActivities = this.getSiteActivities(site, language);
//             activities[language].push(...siteActivities);
//         }
        
//         // إضافة أنشطة ختامية
//         activities[language].push(this.getBasicActivity('lunch', language));
//         activities[language].push(this.getBasicActivity('free_time', language));
//         activities[language].push(this.getBasicActivity('dinner', language));

//         // نسخ الأنشطة للغات الأخرى
//         activities.es = [...activities[language]];
//         activities.en = [...activities[language]];
//         activities.ar = [...activities[language]];

//         return activities;
//     }

//     // 🚢 إنشاء أنشطة الكروز
//     private generateCruiseActivities(city: string, sites: string[], language: Language): string[] {
//         const activities = [];
        
//         activities.push(this.getBasicActivity('cruise_breakfast', language));
        
//         for (const site of sites) {
//             const siteActivities = this.getSiteActivities(site, language);
//             activities.push(...siteActivities);
//         }
        
//         activities.push(this.getBasicActivity('cruise_lunch', language));
//         activities.push(this.getBasicActivity('cruise_sailing', language));
//         activities.push(this.getBasicActivity('cruise_dinner', language));
        
//         return activities;
//     }

//     // 🏷️ الحصول على اسم الموقع
//     private getSiteName(site: string, language: Language): string {
//         const siteNames = {
//             'gizaPyramidsAndSphinx': {
//                 es: 'Pirámides de Giza y Esfinge',
//                 en: 'Giza Pyramids and Sphinx',
//                 ar: 'أهرامات الجيزة وأبو الهول'
//             },
//             'egyptianMuseum': {
//                 es: 'Museo Egipcio',
//                 en: 'Egyptian Museum',
//                 ar: 'المتحف المصري'
//             },
//             'karnakTemple': {
//                 es: 'Templo de Karnak',
//                 en: 'Karnak Temple',
//                 ar: 'معبد الكرنك'
//             },
//             'luxorTemple': {
//                 es: 'Templo de Luxor',
//                 en: 'Luxor Temple',
//                 ar: 'معبد الأقصر'
//             },
//             'valleyOfTheKings': {
//                 es: 'Valle de los Reyes',
//                 en: 'Valley of the Kings',
//                 ar: 'وادي الملوك'
//             },
//             'hatshepsutTemple': {
//                 es: 'Templo de Hatshepsut',
//                 en: 'Hatshepsut Temple',
//                 ar: 'معبد حتشبسوت'
//             },
//             'philaeTemple': {
//                 es: 'Templo de Philae',
//                 en: 'Philae Temple',
//                 ar: 'معبد فيلة'
//             },
//             'edfuTemple': {
//                 es: 'Templo de Edfu',
//                 en: 'Edfu Temple',
//                 ar: 'معبد إدفو'
//             },
//             'komOmboTemple': {
//                 es: 'Templo de Kom Ombo',
//                 en: 'Kom Ombo Temple',
//                 ar: 'معبد كوم أمبو'
//             }
//         };

//         return siteNames[site as keyof typeof siteNames]?.[language] || site;
//     }

//     // 🏙️ الحصول على اسم المدينة
//     private getCityName(city: string, language: Language): string {
//         const cityNames = {
//             'cairo': {
//                 es: 'El Cairo',
//                 en: 'Cairo',
//                 ar: 'القاهرة'
//             },
//             'luxor': {
//                 es: 'Luxor',
//                 en: 'Luxor',
//                 ar: 'الأقصر'
//             },
//             'aswan': {
//                 es: 'Asuán',
//                 en: 'Aswan',
//                 ar: 'أسوان'
//             },
//             'alexandria': {
//                 es: 'Alejandría',
//                 en: 'Alexandria',
//                 ar: 'الإسكندرية'
//             }
//         };

//         return cityNames[city as keyof typeof cityNames]?.[language] || city;
//     }

//     // 🎯 الحصول على أنشطة الموقع
//     private getSiteActivities(site: string, language: Language): string[] {
//         const siteActivities = {
//             'gizaPyramidsAndSphinx': {
//                 es: [
//                     'Visita a la Meseta de Giza',
//                     'Exploración de las Grandes Pirámides',
//                     'Foto con la Gran Esfinge'
//                 ],
//                 en: [
//                     'Visit to Giza Plateau',
//                     'Exploration of the Great Pyramids',
//                     'Photo with the Great Sphinx'
//                 ],
//                 ar: [
//                     'زيارة هضبة الجيزة',
//                     'استكشاف الأهرامات العظيمة',
//                     'التقاط الصور مع أبو الهول'
//                 ]
//             },
//             'egyptianMuseum': {
//                 es: [
//                     'Visita al Museo Egipcio',
//                     'Exploración de las salas de antigüedades',
//                     'Admiración del tesoro de Tutankamón'
//                 ],
//                 en: [
//                     'Visit to Egyptian Museum',
//                     'Exploration of antiquities halls',
//                     'Admiration of Tutankhamun\'s treasure'
//                 ],
//                 ar: [
//                     'زيارة المتحف المصري',
//                     'استكشاف قاعات الآثار',
//                     'الإعجاب بكنوز توت عنخ آمون'
//                 ]
//             },
//             'karnakTemple': {
//                 es: [
//                     'Visita al Templo de Karnak',
//                     'Exploración del Gran Patio',
//                     'Admiración de la Sala Hipóstila'
//                 ],
//                 en: [
//                     'Visit to Karnak Temple',
//                     'Exploration of the Great Court',
//                     'Admiration of the Hypostyle Hall'
//                 ],
//                 ar: [
//                     'زيارة معبد الكرنك',
//                     'استكشاف الفناء الكبير',
//                     'الإعجاب بقاعة الأعمدة'
//                 ]
//             }
//         };

//         return siteActivities[site as keyof typeof siteActivities]?.[language] || [
//             `Visita a ${this.getSiteName(site, language)}`
//         ];
//     }

//     // 🍽️ الحصول على الأنشطة الأساسية
//     private getBasicActivity(type: string, language: Language): string {
//         const activities = {
//             'breakfast': {
//                 es: 'Desayuno en el hotel',
//                 en: 'Breakfast at hotel',
//                 ar: 'الإفطار في الفندق'
//             },
//             'lunch': {
//                 es: 'Almuerzo en restaurante local',
//                 en: 'Lunch at local restaurant',
//                 ar: 'الغداء في مطعم محلي'
//             },
//             'dinner': {
//                 es: 'Cena y alojamiento',
//                 en: 'Dinner and accommodation',
//                 ar: 'العشاء والإقامة'
//             },
//             'free_time': {
//                 es: 'Tiempo libre',
//                 en: 'Free time',
//                 ar: 'وقت حر'
//             },
//             'cruise_breakfast': {
//                 es: 'Desayuno a bordo',
//                 en: 'Breakfast on board',
//                 ar: 'الإفطار على متن السفينة'
//             },
//             'cruise_lunch': {
//                 es: 'Almuerzo a bordo',
//                 en: 'Lunch on board',
//                 ar: 'الغداء على متن السفينة'
//             },
//             'cruise_dinner': {
//                 es: 'Cena a bordo',
//                 en: 'Dinner on board',
//                 ar: 'العشاء على متن السفينة'
//             },
//             'cruise_sailing': {
//                 es: 'Navegación por el Nilo',
//                 en: 'Nile sailing',
//                 ar: 'الإبحار في النيل'
//             }
//         };

//         return activities[type as keyof typeof activities]?.[language] || type;
//     }

//     // 📊 حساب توزيع الليالي المرن
//     private calculateFlexibleNightsDistribution(analyzedRequest: any): any {
//         const distribution: any = {
//             cairo: 0,
//             luxor: 0,
//             aswan: 0,
//             alexandria: 0,
//             cruise: 0
//         };

//         // حساب الليالي لكل مدينة
//         for (const city of analyzedRequest.cities) {
//             const cityDays = this.getCityDaysFromSites(analyzedRequest.sites[city] || []);
//             distribution[city] = cityDays;
//         }

//         // إضافة ليالي الكروز
//         if (analyzedRequest.hasCruise) {
//             distribution.cruise = analyzedRequest.cruiseNights;
//         }

//         return distribution;
//     }

//     // 📊 حساب عدد أيام المدينة من المواقع
//     private getCityDaysFromSites(sites: string[]): number {
//         if (sites.length === 0) return 1;
        
//         const maxSitesPerDay = 3; // متوسط المواقع في اليوم
//         return Math.ceil(sites.length / maxSitesPerDay);
//     }

//     // 🏷️ إنشاء اسم البرنامج المرن
//     private createFlexibleProgramName(analyzedRequest: any, language: Language): LocalizedString {
//         const cityNames = analyzedRequest.cities.map((city: string) => 
//             this.getCityName(city, language)
//         ).join(' & ');

//         const duration = analyzedRequest.cities.length + (analyzedRequest.hasCruise ? analyzedRequest.cruiseNights : 0) + 2;

//         return {
//             es: `Viaje Personalizado de ${duration} Días - ${cityNames}`,
//             en: `Custom ${duration}-Day Journey - ${cityNames}`,
//             ar: `رحلة مخصصة لمدة ${duration} أيام - ${cityNames}`
//         };
//     }

//     // 📝 إنشاء الوصف المختصر المرن
//     private createFlexibleBriefDescription(analyzedRequest: any, language: Language): LocalizedString {
//         const cityNames = analyzedRequest.cities.map((city: string) => 
//             this.getCityName(city, language)
//         ).join(' & ');

//         return {
//             es: `Un viaje personalizado explorando ${cityNames} según tus preferencias`,
//             en: `A custom journey exploring ${cityNames} according to your preferences`,
//             ar: `رحلة مخصصة لاستكشاف ${cityNames} حسب تفضيلاتك`
//         };
//     }

//     // 📝 إنشاء الوصف العام المرن
//     private createFlexibleGeneralDescription(analyzedRequest: any, language: Language): LocalizedString {
//         const cityNames = analyzedRequest.cities.map((city: string) => 
//             this.getCityName(city, language)
//         ).join(' & ');

//         return {
//             es: `Este itinerario ha sido diseñado especialmente para ti, visitando ${cityNames} con los sitios que más te interesan. Cada detalle ha sido personalizado para crear una experiencia única.`,
//             en: `This itinerary has been specially designed for you, visiting ${cityNames} with the sites that interest you most. Every detail has been personalized to create a unique experience.`,
//             ar: `هذا المسار مصمم خصيصًا لك، لزيارة ${cityNames} مع المواقع التي تهمك أكثر. تم تخصيص كل تفصيل لخلق تجربة فريدة.`
//         };
//     }

//     // 🗺️ استخراج المواقع من البرنامج المرن
//     private extractSitesFromFlexibleItinerary(itinerary: ItineraryItem[], language: Language): SupportedSite[] {
//         const sites: SupportedSite[] = [];
//         const allActivities = itinerary.flatMap(day => {
//             if (!day.activities) return [];
//             if (Array.isArray(day.activities)) return day.activities;
//             if (typeof day.activities === 'object') {
//                 return day.activities[language] || day.activities.en || [];
//             }
//             return [];
//         });

//         const activitiesText = allActivities.join(' ').toLowerCase();

//         // التعرف على المواقع من النص
//         if (activitiesText.includes('pyramid') || activitiesText.includes('pirámide') || activitiesText.includes('هرم')) {
//             sites.push('gizaPyramidsAndSphinx');
//         }
//         if (activitiesText.includes('museum') || activitiesText.includes('museo') || activitiesText.includes('متحف')) {
//             sites.push('egyptianMuseum');
//         }
//         if (activitiesText.includes('karnak') || activitiesText.includes('الكرنك')) {
//             sites.push('karnakTemple');
//         }
//         if (activitiesText.includes('luxor temple') || activitiesText.includes('templo de luxor') || activitiesText.includes('معبد الأقصر')) {
//             sites.push('luxorTemple');
//         }
//         if (activitiesText.includes('valley of the kings') || activitiesText.includes('valle de los reyes') || activitiesText.includes('وادي الملوك')) {
//             sites.push('valleyOfTheKings');
//         }
//         if (activitiesText.includes('hatshepsut') || activitiesText.includes('حتشبسوت')) {
//             sites.push('hatshepsutTemple');
//         }
//         if (activitiesText.includes('philae') || activitiesText.includes('فيلة')) {
//             sites.push('philaeTemple');
//         }
//         if (activitiesText.includes('edfu') || activitiesText.includes('إدفو')) {
//             sites.push('edfuTemple');
//         }
//         if (activitiesText.includes('kom ombo') || activitiesText.includes('كوم أمبو')) {
//             sites.push('komOmboTemple');
//         }

//         return [...new Set(sites)];
//     }

//     // 📅 إنشاء يوم الوصول
//     private createArrivalDay(language: Language): ItineraryItem {
//         return {
//             day: 1,
//             title: {
//                 es: 'Llegada a El Cairo - Bienvenida a Egipto',
//                 en: 'Arrival in Cairo - Welcome to Egypt',
//                 ar: 'الوصول إلى القاهرة - مرحباً بكم في مصر'
//             },
//             activities: {
//                 es: [
//                     'Llegada al aeropuerto internacional de El Cairo',
//                     'Asistencia en el aeropuerto por nuestro representante',
//                     'Traslado privado al hotel',
//                     'Check-in en el hotel y tiempo libre',
//                     'Cena de bienvenida (opcional)'
//                 ],
//                 en: [
//                     'Arrival at Cairo International Airport',
//                     'Airport assistance by our representative',
//                     'Private transfer to hotel',
//                     'Hotel check-in and free time',
//                     'Welcome dinner (optional)'
//                 ],
//                 ar: [
//                     'الوصول إلى مطار القاهرة الدولي',
//                     'المساعدة في المطار من قبل ممثلنا',
//                     'انتقال خاص إلى الفندق',
//                     'تسجيل الوصول في الفندق والوقت الحر',
//                     'عشاء ترحيبي (اختياري)'
//                 ]
//             }
//         };
//     }

//     // 📅 إنشاء يوم المغادرة
//     private createDepartureDay(day: number, language: Language): ItineraryItem {
//         return {
//             day: day,
//             title: {
//                 es: 'Salida de El Cairo - Hasta Pronto',
//                 en: 'Departure from Cairo - See You Soon',
//                 ar: 'المغادرة من القاهرة - إلى اللقاء'
//             },
//             activities: {
//                 es: [
//                     'Desayuno en el hotel',
//                     'Tiempo libre para últimas compras',
//                     'Check-out del hotel',
//                     'Traslado al aeropuerto',
//                     'Despedida y fin de nuestros servicios'
//                 ],
//                 en: [
//                     'Breakfast at the hotel',
//                     'Free time for last-minute shopping',
//                     'Hotel check-out',
//                     'Transfer to airport',
//                     'Farewell and end of our services'
//                 ],
//                 ar: [
//                     'الإفطار في الفندق',
//                     'وقت حر للتسوق الأخير',
//                     'تسجيل الخروج من الفندق',
//                     'الانتقال إلى المطار',
//                     'الوداع ونهاية خدماتنا'
//                 ]
//             }
//         };
//     }

//     private createCustomItinerary(
//     duration: number, 
//     destinations: string[], 
//     nightsDistribution: any,
//     language: Language,
//     customSites?: { [city: string]: string[] } // المواقع المحددة من العميل
// ): ItineraryItem[] {
//     const itinerary: ItineraryItem[] = [];
//     let currentDay = 1;

//     // يوم الوصول
//     itinerary.push(this.createArrivalDay(language));
//     currentDay++;

//     // أيام المدن
//     for (const destination of destinations) {
//         const city = destination.toLowerCase();
//         const cityNights = nightsDistribution[city] || 0;
        
//         if (cityNights > 0 && city !== 'cruise') {
//             // 🔍 هل العميل حدد مواقع معينة للمدينة دي؟
//             if (customSites && customSites[city] && customSites[city].length > 0) {
//                 // ✅ العميل حدد مواقع → ننشئ أيام من المواقع المحددة
//                 const sitesGrouped = this.groupSitesByDay(customSites[city], city);
                
//                 for (let i = 0; i < Math.min(cityNights, sitesGrouped.length); i++) {
//                     const daySites = sitesGrouped[i];
//                     const dayItem = this.createDayFromSites(daySites, city, currentDay, language);
//                     itinerary.push(dayItem);
//                     currentDay++;
//                 }
//             } else {
//                 // ✅ العميل ماحددش مواقع → نجيب من البرامج الجاهزة
//                 const cityData = this.extractCityData(city, language);
                
//                 if (cityData.itinerary && cityData.itinerary.length > 0) {
//                     // نستخدم أيام المدينة من البرامج الجاهزة
//                     const cityDays = cityData.itinerary.slice(0, cityNights);
                    
//                     for (const day of cityDays) {
//                         itinerary.push({
//                             ...day,
//                             day: currentDay++
//                         });
//                     }
//                 } else {
//                     // لو مافيش بيانات في البرامج، نستخدم المواقع الافتراضية
//                     const defaultSites = this.getDefaultSitesForCity(city);
                    
//                     for (let i = 0; i < Math.min(cityNights, defaultSites.length); i++) {
//                         const daySites = defaultSites[i];
//                         const dayItem = this.createDayFromSites(daySites, city, currentDay, language);
//                         itinerary.push(dayItem);
//                         currentDay++;
//                     }
//                 }
//             }
//         }
//     }

//     // أيام الكروز
//     if (nightsDistribution.cruise > 0) {
//         const cruiseDays = this.createDefaultCruiseDays(nightsDistribution.cruise, language);
//         for (const day of cruiseDays) {
//             itinerary.push({
//                 ...day,
//                 day: currentDay++
//             });
//         }
//     }

//     // يوم المغادرة
//     itinerary.push(this.createDepartureDay(currentDay, language));

//     return itinerary;
// }

// private createDefaultCruiseDays(nights: number, language: Language): ItineraryItem[] {
//     const days: ItineraryItem[] = [];
    
//     if (nights === 3) {
//         // 3 ليالي: أسوان → الأقصر
//         days.push({
//             day: 1,
//             title: {
//                 es: 'Crucero - Asuán: Templo de Philae',
//                 en: 'Cruise - Aswan: Philae Temple',
//                 ar: 'كروز - أسوان: معبد فيلة'
//             },
//             activities: {
//                 es: [
//                     'Desayuno a bordo del crucero',
//                     'Visita al majestuoso Templo de Philae, dedicado a la diosa Isis',
//                     'Exploración de la impresionante Alta Presa de Asuán',
//                     'Almuerzo gourmet a bordo',
//                     'Paseo opcional en faluca por el Nilo',
//                     'Navegación hacia Kom Ombo',
//                     'Cena bajo las estrellas',
//                     'Noche a bordo'
//                 ],
//                 en: [
//                     'Breakfast on board the cruise',
//                     'Visit to the majestic Philae Temple, dedicated to goddess Isis',
//                     'Exploration of the impressive Aswan High Dam',
//                     'Gourmet lunch on board',
//                     'Optional felucca ride on the Nile',
//                     'Sailing to Kom Ombo',
//                     'Dinner under the stars',
//                     'Overnight on board'
//                 ],
//                 ar: [
//                     'الإفطار على متن السفينة',
//                     'زيارة معبد فيلة المهيب المخصص للإلهة إيزيس',
//                     'استكشاف السد العالي المذهل',
//                     'غداء فاخر على متن السفينة',
//                     'رحلة اختيارية بالفلوكة في النيل',
//                     'الإبحار إلى كوم أمبو',
//                     'عشاء تحت النجوم',
//                     'المبيت على متن السفينة'
//                 ]
//             }
//         });
        
//         days.push({
//             day: 2,
//             title: {
//                 es: 'Crucero - Kom Ombo y Edfu',
//                 en: 'Cruise - Kom Ombo and Edfu',
//                 ar: 'كروز - كوم أمبو وإدفو'
//             },
//             activities: {
//                 es: [
//                     'Desayuno a bordo',
//                     'Visita al singular Templo de Kom Ombo, dedicado a dos dioses',
//                     'Navegación hacia Edfu',
//                     'Almuerzo mientras navegamos por el Nilo',
//                     'Visita al Templo de Horus en Edfu, uno de los mejor conservados',
//                     'Navegación hacia Luxor',
//                     'Cena gourmet a bordo',
//                     'Noche a bordo'
//                 ],
//                 en: [
//                     'Breakfast on board',
//                     'Visit to the unique Kom Ombo Temple, dedicated to two gods',
//                     'Sailing to Edfu',
//                     'Lunch while cruising the Nile',
//                     'Visit to Horus Temple in Edfu, one of the best preserved',
//                     'Sailing to Luxor',
//                     'Gourmet dinner on board',
//                     'Overnight on board'
//                 ],
//                 ar: [
//                     'الإفطار على متن السفينة',
//                     'زيارة معبد كوم أمبو الفريد المخصص لإلهين',
//                     'الإبحار إلى إدفو',
//                     'الغداء أثناء الإبحار في النيل',
//                     'زيارة معبد حورس في إدفو، أحد أفضل المعابد المحفوظة',
//                     'الإبحار إلى الأقصر',
//                     'عشاء فاخر على متن السفينة',
//                     'المبيت على متن السفينة'
//                 ]
//             }
//         });
        
//         days.push({
//             day: 3,
//             title: {
//                 es: 'Crucero - Luxor: Valle de los Reyes',
//                 en: 'Cruise - Luxor: Valley of the Kings',
//                 ar: 'كروز - الأقصر: وادي الملوك'
//             },
//             activities: {
//                 es: [
//                     'Desayuno a bordo',
//                     'Visita al legendario Valle de los Reyes',
//                     'Exploración del Templo de Hatshepsut',
//                     'Parada en los Colosos de Memnón',
//                     'Almuerzo a bordo',
//                     'Visita a los Templos de Karnak y Luxor',
//                     'Cena de despedida',
//                     'Desembarque'
//                 ],
//                 en: [
//                     'Breakfast on board',
//                     'Visit to the legendary Valley of the Kings',
//                     'Exploration of Hatshepsut Temple',
//                     'Stop at the Colossi of Memnon',
//                     'Lunch on board',
//                     'Visit to Karnak and Luxor Temples',
//                     'Farewell dinner',
//                     'Disembarkation'
//                 ],
//                 ar: [
//                     'الإفطار على متن السفينة',
//                     'زيارة وادي الملوك الأسطوري',
//                     'استكشاف معبد حتشبسوت',
//                     'التوقف عند تمثالي ممنون',
//                     'الغداء على متن السفينة',
//                     'زيارة معبدي الكرنك والأقصر',
//                     'عشاء الوداع',
//                     'النزول من السفينة'
//                 ]
//             }
//         });
//     } else if (nights === 4) {
//         // 4 ليالي: الأقصر → أسوان
//         days.push({
//             day: 1,
//             title: {
//                 es: 'Crucero - Luxor: Templos Majestuosos',
//                 en: 'Cruise - Luxor: Majestic Temples',
//                 ar: 'كروز - الأقصر: المعابد المهيبة'
//             },
//             activities: {
//                 es: [
//                     'Embarque en el crucero de lujo',
//                     'Almuerzo de bienvenida a bordo',
//                     'Visita al grandioso Templo de Karnak',
//                     'Exploración del Templo de Luxor',
//                     'Navegación hacia Edfu',
//                     'Cena gourmet',
//                     'Noche a bordo'
//                 ],
//                 en: [
//                     'Embarkation on luxury cruise',
//                     'Welcome lunch on board',
//                     'Visit to the grand Karnak Temple',
//                     'Exploration of Luxor Temple',
//                     'Sailing to Edfu',
//                     'Gourmet dinner',
//                     'Overnight on board'
//                 ],
//                 ar: [
//                     'الصعود إلى السفينة الفاخرة',
//                     'غداء الترحيب على متن السفينة',
//                     'زيارة معبد الكرنك العظيم',
//                     'استكشاف معبد الأقصر',
//                     'الإبحار إلى إدفو',
//                     'عشاء فاخر',
//                     'المبيت على متن السفينة'
//                 ]
//             }
//         });
        
//         days.push({
//             day: 2,
//             title: {
//                 es: 'Crucero - Valle de los Reyes',
//                 en: 'Cruise - Valley of the Kings',
//                 ar: 'كروز - وادي الملوك'
//             },
//             activities: {
//                 es: [
//                     'Desayuno a bordo',
//                     'Visita al Valle de los Reyes',
//                     'Exploración del Templo de Hatshepsut',
//                     'Parada en los Colosos de Memnón',
//                     'Regreso al crucero para almuerzo',
//                     'Navegación hacia Edfu',
//                     'Cena a bordo',
//                     'Noche navegando por el Nilo'
//                 ],
//                 en: [
//                     'Breakfast on board',
//                     'Visit to Valley of the Kings',
//                     'Exploration of Hatshepsut Temple',
//                     'Stop at Colossi of Memnon',
//                     'Return to cruise for lunch',
//                     'Sailing to Edfu',
//                     'Dinner on board',
//                     'Night sailing the Nile'
//                 ],
//                 ar: [
//                     'الإفطار على متن السفينة',
//                     'زيارة وادي الملوك',
//                     'استكشاف معبد حتشبسوت',
//                     'التوقف عند تمثالي ممنون',
//                     'العودة للسفينة للغداء',
//                     'الإبحار إلى إدفو',
//                     'العشاء على متن السفينة',
//                     'الإبحار الليلي في النيل'
//                 ]
//             }
//         });
        
//         days.push({
//             day: 3,
//             title: {
//                 es: 'Crucero - Edfu y Kom Ombo',
//                 en: 'Cruise - Edfu and Kom Ombo',
//                 ar: 'كروز - إدفو وكوم أمبو'
//             },
//             activities: {
//                 es: [
//                     'Desayuno a bordo',
//                     'Visita al Templo de Horus en Edfu',
//                     'Navegación hacia Kom Ombo',
//                     'Almuerzo mientras navegamos',
//                     'Visita al Templo de Kom Ombo',
//                     'Navegación hacia Asuán',
//                     'Cena bajo las estrellas',
//                     'Noche a bordo'
//                 ],
//                 en: [
//                     'Breakfast on board',
//                     'Visit to Horus Temple in Edfu',
//                     'Sailing to Kom Ombo',
//                     'Lunch while cruising',
//                     'Visit to Kom Ombo Temple',
//                     'Sailing to Aswan',
//                     'Dinner under the stars',
//                     'Overnight on board'
//                 ],
//                 ar: [
//                     'الإفطار على متن السفينة',
//                     'زيارة معبد حورس في إدفو',
//                     'الإبحار إلى كوم أمبو',
//                     'الغداء أثناء الإبحار',
//                     'زيارة معبد كوم أمبو',
//                     'الإبحار إلى أسوان',
//                     'عشاء تحت النجوم',
//                     'المبيت على متن السفينة'
//                 ]
//             }
//         });
        
//         days.push({
//             day: 4,
//             title: {
//                 es: 'Crucero - Asuán: Maravillas del Sur',
//                 en: 'Cruise - Aswan: Southern Wonders',
//                 ar: 'كروز - أسوان: عجائب الجنوب'
//             },
//             activities: {
//                 es: [
//                     'Desayuno a bordo',
//                     'Visita al Templo de Philae',
//                     'Exploración de la Alta Presa',
//                     'Almuerzo a bordo',
//                     'Paseo en faluca opcional',
//                     'Visita al Obelisco Inacabado (opcional)',
//                     'Cena de despedida',
//                     'Desembarque'
//                 ],
//                 en: [
//                     'Breakfast on board',
//                     'Visit to Philae Temple',
//                     'Exploration of High Dam',
//                     'Lunch on board',
//                     'Optional felucca ride',
//                     'Visit to Unfinished Obelisk (optional)',
//                     'Farewell dinner',
//                     'Disembarkation'
//                 ],
//                 ar: [
//                     'الإفطار على متن السفينة',
//                     'زيارة معبد فيلة',
//                     'استكشاف السد العالي',
//                     'الغداء على متن السفينة',
//                     'رحلة بالفلوكة اختيارية',
//                     'زيارة المسلة الناقصة (اختياري)',
//                     'عشاء الوداع',
//                     'النزول من السفينة'
//                 ]
//             }
//         });
//     }
    
//     return days;
// }

// // ============================================
// // 📅 يوم الوصول
// // ============================================


// // ============================================
// // 📅 يوم المغادرة
// // =========================================



//     // باقي الدوال المساعدة...
//     // private createCustomItinerary(duration: number, destinations: string[], nightsDistribution: any, language: Language): ItineraryItem[] {
//     //     // Implementation here...
//     //     return [];
//     // }

//     private calculateNightsDistribution(duration: number, destinations: string[]): any {
//         // Implementation here...
//         return {};
//     }

//     private createCustomProgramName(duration: number, destinations: string[], language: Language): LocalizedString {
//         return { es: '', en: '', ar: '' };
//     }

//     private createBriefDescription(duration: number, destinations: string[], language: Language): LocalizedString {
//         return { es: '', en: '', ar: '' };
//     }

//     private createGeneralDescription(duration: number, destinations: string[], language: Language): LocalizedString {
//         return { es: '', en: '', ar: '' };
//     }

//     private createServicesIncluded(nightsDistribution: any, category: 'gold' | 'diamond', language: Language): { es: string[]; en: string[]; ar: string[] } {
//         return { es: [], en: [], ar: [] };
//     }

//     private extractSitesFromItinerary(itinerary: ItineraryItem[], language: Language): SupportedSite[] {
//         return [];
//     }

//     private convertNightsDistribution(nightsDistribution: any): { [key: string]: number } {
//         return {};
//     }

//     private getCityLocalizedName(city: string): LocalizedString {
//         return { es: '', en: '', ar: '' };
//     }
// }

// // 🚀 تصدير الدالة الرئيسية
// export function createIntelligentCustomProgram(request: {
//     duration: number;
//     travelers: number;
//     destinations: string[];
//     season: 'summer' | 'winter';
//     category: 'gold' | 'diamond';
//     language: Language;
// }): Program {
//     const extractor = new IntelligentDataExtractor();
//     return extractor.createCustomProgram(request);
// }

// // 🚀 تصدير الدالة المرنة الجديدة
// export function createFlexibleCustomProgram(request: FlexibleCustomRequest): Program {
//     const extractor = new IntelligentDataExtractor();
//     return extractor.createFlexibleCustomProgram(request);
// }

// // 🚀 دالة مساعدة لإنشاء طلب مرن بسهولة
// export function createFlexibleRequest(
//     travelers: number,
//     duration: number,
//     dayByDay: DayPlan[],
//     season: 'summer' | 'winter',
//     category: 'gold' | 'diamond',
//     language: Language
// ): FlexibleCustomRequest {
//     return {
//         travelers,
//         duration,
//         dayByDay,
//         season,
//         category,
//         language
//     };
// }

// // 🚀 دالة مساعدة لإنشاء خطة يومية بسهولة
// export function createDayPlan(
//     days: string,
//     city?: string,
//     sites?: string[],
//     type?: 'cruise' | 'city',
//     nights?: number,
//     startCity?: 'luxor' | 'aswan',
//     direction?: 'luxor-to-aswan' | 'aswan-to-luxor',
//     departureDay?: 'saturday' | 'monday' | 'wednesday' | 'friday'
// ): DayPlan {
//     return {
//         days,
//         city,
//         sites,
//         type,
//         nights,
//         startCity,
//         direction,
//         departureDay
//     };
// }

// // 🚀 أمثلة على الاستخدام
// export const FlexibleExamples = {
//     // مثال 1: رحلة القاهرة مع مواقع محددة
//     cairoOnly: (travelers: number, language: Language = 'en'): FlexibleCustomRequest => {
//         return createFlexibleRequest(
//             travelers,
//             4,
//             [
//                 createDayPlan('2', 'cairo', ['gizaPyramidsAndSphinx', 'egyptianMuseum']),
//                 createDayPlan('1', 'cairo', ['khanElKhalili', 'citadelOfSaladin'])
//             ],
//             'winter',
//             'gold',
//             language
//         );
//     },

//     // مثال 2: رحلة الأقصر مع مواقع محددة
//     luxorOnly: (travelers: number, language: Language = 'en'): FlexibleCustomRequest => {
//         return createFlexibleRequest(
//             travelers,
//             3,
//             [
//                 createDayPlan('2', 'luxor', ['karnakTemple', 'luxorTemple', 'valleyOfTheKings', 'hatshepsutTemple'])
//             ],
//             'winter',
//             'gold',
//             language
//         );
//     },

//     // مثال 3: رحلة كروز 4 ليالي من الأقصر إلى أسوان
//     cruise4Nights: (travelers: number, language: Language = 'en'): FlexibleCustomRequest => {
//         return createFlexibleRequest(
//             travelers,
//             6,
//             [
//                 createDayPlan('1', 'cairo', ['gizaPyramidsAndSphinx']),
//                 createDayPlan('4', undefined, undefined, 'cruise', 4, 'luxor', 'luxor-to-aswan', 'saturday')
//             ],
//             'winter',
//             'diamond',
//             language
//         );
//     },

//     // مثال 4: رحلة كروز 3 ليالي من أسوان إلى الأقصر
//     cruise3Nights: (travelers: number, language: Language = 'en'): FlexibleCustomRequest => {
//         return createFlexibleRequest(
//             travelers,
//             5,
//             [
//                 createDayPlan('1', 'cairo', ['egyptianMuseum']),
//                 createDayPlan('3', undefined, undefined, 'cruise', 3, 'aswan', 'aswan-to-luxor', 'wednesday')
//             ],
//             'winter',
//             'gold',
//             language
//         );
//     },

//     // مثال 5: رحلة مرنة مع عدة مدن
//     multiCity: (travelers: number, language: Language = 'en'): FlexibleCustomRequest => {
//         return createFlexibleRequest(
//             travelers,
//             8,
//             [
//                 createDayPlan('2', 'cairo', ['gizaPyramidsAndSphinx', 'egyptianMuseum']),
//                 createDayPlan('1', 'alexandria', ['qaitbayCitadel', 'alexandriaNationalMuseum']),
//                 createDayPlan('3', undefined, undefined, 'cruise', 3, 'luxor', 'luxor-to-aswan', 'saturday'),
//                 createDayPlan('1', 'aswan', ['philaeTemple', 'highDam'])
//             ],
//             'winter',
//             'diamond',
//             language
//         );
//     }
// };


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
    saintCatherine: [],
    siwa: [],
    matrouh: [],
    cruise: []
};
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
                 en: [
                'Breakfast at hotel',
                'Transfer to Cairo International Airport',
                'Assistance with check-in and baggage handling',
                'Farewell and end of our services'
            ],
            ar: [
                'إفطار في الفندق',
                'الانتقال إلى مطار القاهرة الدولي',
                'المساعدة في تسجيل الوصول وتجهيز الأمتعة',
                'وداع ونهاية خدماتنا'
            ]
        };
    }

    // 🏨 إنشاء أماكن الإقامة المخصصة
    private createCustomAccommodations(
        nightsDistribution: any,
        category: 'gold' | 'diamond',
        language: Language
    ): { gold: AccommodationInfo[]; diamond: AccommodationInfo[] } {
        const accommodations: { gold: AccommodationInfo[]; diamond: AccommodationInfo[] } = {
            gold: [],
            diamond: []
        };

        // إضافة أماكن الإقامة حسب التوزيع
        for (const [city, nights] of Object.entries(nightsDistribution)) {
            if (typeof nights === 'number' && nights > 0) {
                const cityAccommodation = this.getAccommodationForCity(city as SupportedCity, category);
                accommodations[category].push(...cityAccommodation);
            }
        }

        return accommodations;
    }

    // 🧮 حساب توزيع الليالي
    private calculateNightsDistribution(duration: number, destinations: string[]): any {
        const distribution: any = {
            cairo: 0,
            luxor: 0,
            aswan: 0,
            alexandria: 0,
            cruise: 0
        };

        let remainingDays = duration - 1; // ناقص يوم الوصول
        
        // القاهرة دائماً لها الأولوية
        distribution.cairo = Math.max(2, Math.ceil(remainingDays * 0.4));
        remainingDays -= distribution.cairo;
        
        console.log('[distribution] Final distribution (DAYS not nights):', distribution);htsDistribution.cruise > 0) {
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
                'Breakfast a        // القاهرة دائماً لها الأولوية
        distribution.cairo = Math.max(2, Math.ceil(remainingDays * 0.4));
        remainingDays -= distribution.cairo;
        
        console.log('[distribution] Final distribution (DAYS not nights):', distribution);
        console.log('[distribution] Total days allocated:', 
            distribution.cairo + distribution.luxor + distribution.aswan + distribution.alexandria + distribution.cruise);
        
        return distribution;
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

    // 🎯 إنشاء برنامج مخصص ذكي
    createCustomProgram(request: {
        duration: number;
        travelers: number;
        destinations: string[];
        season: 'summer' | 'winter';
        category: 'gold' | 'diamond';
        language: Language;
    }): Program {              'وقت حر للتسوق أو الأنشطة الشخصية',
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
        
                return program;
    }

    // 🔄 تحويل توزيع الليالي
    private convertNightsDistribution(nightsDistribution: any): { [key: string]: number } {ategory: 'gold' | 'diamond';
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
                    name: {
                        es: `Opción Personalizada de ${duration} Días`,
                        en: `Custom ${duration}-Day Option`,
                        ar: `خيار مخصص لمدة ${duration} أيام`
                    },
                    itinerary: customItinerary
                }
            ],
            servicesIncluded: this.getCustomServicesIncluded(language),
            servicesExcluded: this.getCustomServicesExcluded(language),
            importantNotes: this.getCustomImportantNotes(language),
            accommodations: this.getCustomAccommodations(category, language),
            isCustom: true,
            quoteParams: {
                travelers,
                duration,
                season,
                category,
                itineraryPlan: {
                    nights: this.convertNightsDistribution(nightsDistribution),
                    sites: this.extractSitesFromDestinations(destinations),
                    flightSectors: this.calculateFlightSectors(destinations),
                    guidedDays: duration
                }
            }
        };

        return customProgram;
    }

    // 🔄 تحويل توزيع الليالي
    private convertNightsDistribution(nightsDistribution: any): { [key: string]: number } {ions, language),
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

    // 🏙️ الحصول على المدن المتاحة
    getAvailableCities(): SupportedCity[] {
        return [
            'cairo', 'luxor', 'aswan', 'alexandria', 'abuSimbel',
            'hurghada', 'sharmElSheikh', 'saintCatherine', 'siwa', 'matrouh'
        ];
    }

    // 🗺️ الحصول على الأماكن المتاحة لمدينة معينة
    getSitesForCity(city: SupportedCity): SupportedSite[] {
        const sitesByCity: Record<SupportedCity, SupportedSite[]> = {
            cairo: [
                'citadelOfSaladin', 'sultanHassanMosque', 'elSeheimyHouse', 'mohamedAliPalace',
                'marysTree', 'senusretIObelisk', 'egyptianMuseum', 'egyptianMuseumAudioGuide',
                'islamicArtMuseum', 'copticMuseum', 'royalCarriagesMuseum', 'gayerAndersonMuseum',
                'baronEmpainPalace', 'alMuizzStreet', 'manialPalace', 'nilometer',
                'gizaPyramidsAndSphinx', 'pyramidOfKeopsInterior', 'pyramidOfKhafrenInterior',
                'pyramidOfMicerinoInterior', 'tombOfMeresankh', 'saqqaraComplexAndImhotepMuseum',
                'nobleTombsOfTheNewKingdom', 'southTombSaqqara', 'saqqaraCombinedTicket',
                'citadelAndAlabasterMosque', 'khanElKhalili', 'saqqara', 'stepPyramidOfZoser',
                'serapeum', 'tombOfMereruka', 'dashurArchaeologicalZone', 'memphisMitRahina',
                'egyptianCivilizationMuseum', 'grandEgyptianMuseum'
            ],
            luxor: [
                'karnakTemple', 'mutTemple', 'luxorTemple', 'valleyOfTheKings', 'tombOfSetiI',
                'tombOfAy', 'hatshepsutTemple', 'deirElMedina', 'tombOfPashed', 'tombOfRamose',
                'ramesseumTemple', 'abdelQurnaHill', 'carterHouse', 'tombOfMennaAndNakht',
                'tombsOfUserhatAndKhaemwaset', 'alAsasif', 'esnaTemple', 'tombOfRamsesVI',
                'valleyOfTheQueens', 'tombOfNefertari', 'elKhokhaNecropolis', 'tombsOfRoyAndShuroy',
                'qurnaMerai', 'sheikhAbdelQurna', 'mummificationMuseum', 'luxorMuseum'
            ],
            aswan: [
                'philaeTemple', 'edfuTemple', 'komOmboTemple', 'qubbetElHawa', 'unfinishedObelisk',
                'kalabshaTemple', 'elKab', 'nubianMuseum', 'highDam'
            ],
            alexandria: [
                'qaitbayCitadel', 'komElShoqafaCatacombs', 'komElDikkaRomanTheater', 'pompeysPillar',
                'alexandriaNationalMuseum', 'royalJewelryMuseum', 'graecoRomanMuseum', 'rosettaRuins'
            ],
            abuSimbel: [
                'abuSimbelTemples', 'sunFestivalAbuSimbel'
            ],
            hurghada: [],
            sharmElSheikh: [],
            saintCatherine: [],
            siwa: [],
            matrouh: []
        };

        return sitesByCity[city] || [];
    }

    // 🏨 الحصول على معلومات الإقامة لمدينة معينة
    getAccommodationForCity(city: SupportedCity, category: 'gold' | 'diamond'): AccommodationInfo[] {
        // البحث في البرامج الجاهزة عن معلومات الإقامة للمدينة
        for (const program of this.programs) {
            if (program.accommodations && program.accommodations[category]) {
                const cityAccommodations = program.accommodations[category].filter(acc => 
                    acc.city.en.toLowerCase().includes(city) || 
                    acc.city.ar?.toLowerCase().includes(city) ||
                    acc.city.es?.toLowerCase().includes(city)
                );
                if (cityAccommodations.length > 0) {
                    return cityAccommodations;
                }
            }
        }

        // إرجاع معلومات افتراضية إذا لم توجد
        const defaultAccommodations: Record<SupportedCity, AccommodationInfo[]> = {
            cairo: [
                {
                    city: { es: 'El Cairo', en: 'Cairo', ar: 'القاهرة' },
                    hotel: { 
                        es: category === 'gold' ? 'Helnan Dreamland o similar' : 'Fairmont Nile City o similar',
                        en: category === 'gold' ? 'Helnan Dreamland or similar' : 'Fairmont Nile City or similar',
                        ar: category === 'gold' ? 'هيلنان دريم لاند أو ما يعادله' : 'فيرمونت نايل سيتي أو ما يعادله'
                    }
                }
            ],
            luxor: [
                {
                    city: { es: 'Luxor', en: 'Luxor', ar: 'الأقصر' },
                    hotel: { 
                        es: category === 'gold' ? 'Steigenberger Nile Palace o similar' : 'Sofitel Winter Palace o similar',
                        en: category === 'gold' ? 'Steigenberger Nile Palace or similar' : 'Sofitel Winter Palace or similar',
                        ar: category === 'gold' ? 'ستيجنبرجر نايل بالاس أو ما يعادله' : 'سوفيتيل وينتر بالاس أو ما يعادله'
                    }
                }
            ],
            aswan: [
                {
                    city: { es: 'Asuán', en: 'Aswan', ar: 'أسوان' },
                    hotel: { 
                        es: category === 'gold' ? 'Mövenpick Resort Aswan o similar' : 'Sofitel Legend Old Cataract o similar',
                        en: category === 'gold' ? 'Mövenpick Resort Aswan or similar' : 'Sofitel Legend Old Cataract or similar',
                        ar: category === 'gold' ? 'موفنبيك ريزورت أسوان أو ما يعادله' : 'سوفيتيل ليجند أولد كاتاراكت أو ما يعادله'
                    }
                }
            ],
            alexandria: [
                {
                    city: { es: 'Alejandría', en: 'Alexandria', ar: 'الإسكندرية' },
                    hotel: { 
                        es: category === 'gold' ? 'Hilton Alexandria Corniche o similar' : 'Four Seasons Alexandria o similar',
                        en: category === 'gold' ? 'Hilton Alexandria Corniche or similar' : 'Four Seasons Alexandria or similar',
                        ar: category === 'gold' ? 'هيلتون الإسكندرية الكورنيش أو ما يعادله' : 'فور سيزونز الإسكندرية أو ما يعادله'
                    }
                }
            ],
            abuSimbel: [
                {
                    city: { es: 'Abu Simbel', en: 'Abu Simbel', ar: 'أبو سمبل' },
                    hotel: { 
                        es: category === 'gold' ? 'Seti Abu Simbel o similar' : 'Seti Abu Simbel o similar',
                        en: category === 'gold' ? 'Seti Abu Simbel or similar' : 'Seti Abu Simbel or similar',
                        ar: category === 'gold' ? 'ستي أبو سمبل أو ما يعادله' : 'ستي أبو سمبل أو ما يعادله'
                    }
                }
            ],
            hurghada: [
                {
                    city: { es: 'Hurghada', en: 'Hurghada', ar: 'الغردقة' },
                    hotel: { 
                        es: category === 'gold' ? 'Grand Resort Hurghada o similar' : 'Four Seasons Resort Sharm El Sheikh o similar',
                        en: category === 'gold' ? 'Grand Resort Hurghada or similar' : 'Four Seasons Resort Sharm El Sheikh or similar',
                        ar: category === 'gold' ? 'جراند ريزورت الغردقة أو ما يعادله' : 'فور سيزونز ريزورت شرم الشيخ أو ما يعادله'
                    }
                }
            ],
            sharmElSheikh: [
                {
                    city: { es: 'Sharm El Sheikh', en: 'Sharm El Sheikh', ar: 'شرم الشيخ' },
                    hotel: { 
                        es: category === 'gold' ? 'Grand Resort Sharm El Sheikh o similar' : 'Four Seasons Resort Sharm El Sheikh o similar',
                        en: category === 'gold' ? 'Grand Resort Sharm El Sheikh or similar' : 'Four Seasons Resort Sharm El Sheikh or similar',
                        ar: category === 'gold' ? 'جراند ريزورت شرم الشيخ أو ما يعادله' : 'فور سيزونز ريزورت شرم الشيخ أو ما يعادله'
                    }
                }
            ],
            saintCatherine: [
                {
                    city: { es: 'Santa Catalina', en: 'Saint Catherine', ar: 'سانت كاترين' },
                    hotel: { 
                        es: 'Karm Ecolodge o similar',
                        en: 'Karm Ecolodge or similar',
                        ar: 'كرم إيكولودج أو ما يعادله'
                    }
                }
            ],
            siwa: [
                {
                    city: { es: 'Siwa', en: 'Siwa', ar: 'سيوة' },
                    hotel: { 
                        es: 'Adrère Amellal o similar',
                        en: 'Adrère Amellal or similar',
                        ar: 'أدري أملال أو ما يعادله'
                    }
                }
            ],
            matrouh: [
                {
                    city: { es: 'Marsa Matrouh', en: 'Marsa Matrouh', ar: 'مرسى مطروح' },
                    hotel: { 
                        es: 'Marassi Resort o similar',
                        en: 'Marassi Resort or similar',
                        ar: 'مراسي ريزورت أو ما يعادله'
                    }
                }
            ]
        };

        return defaultAccommodations[city] || [];
    }

    // 🎯 إنشاء برنامج مخصص بناءً على المدينة والأماكن المختارة
    createCityBasedProgram(request: {
        city: SupportedCity;
        selectedSites: SupportedSite[];
        duration: number;
        travelers: number;
        season: 'summer' | 'winter';
        category: 'gold' | 'diamond';
        language: Language;
    }): Program {
        const { city, selectedSites, duration, travelers, season, category, language } = request;
        const totalNights = duration - 1;

        // إنشاء اسم البرنامج
        const cityName = this.getCityLocalizedName(city);
        const programName = {
            en: `Custom ${duration}-Day ${cityName.en} Experience`,
            es: `Experiencia Personalizada de ${duration} Días en ${cityName.es}`,
            ar: `تجربة مخصصة لمدة ${duration} أيام في ${cityName.ar}`
        };

        // إنشاء وصف مختصر
        const briefDescription = this.createCityBriefDescription(city, selectedSites, duration, language);

        // إنشاء وصف عام
        const generalDescription = this.createCityGeneralDescription(city, selectedSites, duration, language);

        // إنشاء البرنامج
        const customProgram: Program = {
            id: `custom-${city}-${Date.now()}`,
            name: programName,
            icon: this.getCityIcon(city),
            duration: { days: duration, nights: totalNights },
            priceFrom: 0,
            categories: [category],
            startCity: cityName,
            briefDescription,
            generalDescription,
            itinerary: this.createCityItinerary(city, selectedSites, duration, language),
            servicesIncluded: this.getCityServicesIncluded(city, language),
            servicesExcluded: this.getCityServicesExcluded(city, language),
            importantNotes: this.getCityImportantNotes(city, language),
            accommodations: {
                [category]: this.getAccommodationForCity(city, category)
            },
            isCustom: true,
            quoteParams: {
                travelers,
                duration,
                season,
                category,
                itineraryPlan: {
                    nights: { [city]: totalNights },
                    sites: selectedSites,
                    flightSectors: 0,
                    guidedDays: duration
                }
            }
        };

        return customProgram;
    }

    // 🏷️ الحصول على اسم المدينة باللغات المختلفة
    private getCityLocalizedName(city: SupportedCity): LocalizedString {
        const cityNames: Record<SupportedCity, LocalizedString> = {
            cairo: { es: 'El Cairo', en: 'Cairo', ar: 'القاهرة' },
            luxor: { es: 'Luxor', en: 'Luxor', ar: 'الأقصر' },
            aswan: { es: 'Asuán', en: 'Aswan', ar: 'أسوان' },
            alexandria: { es: 'Alejandría', en: 'Alexandria', ar: 'الإسكندرية' },
            abuSimbel: { es: 'Abu Simbel', en: 'Abu Simbel', ar: 'أبو سمبل' },
            hurghada: { es: 'Hurghada', en: 'Hurghada', ar: 'الغردقة' },
            sharmElSheikh: { es: 'Sharm El Sheikh', en: 'Sharm El Sheikh', ar: 'شرم الشيخ' },
            saintCatherine: { es: 'Santa Catalina', en: 'Saint Catherine', ar: 'سانت كاترين' },
            siwa: { es: 'Siwa', en: 'Siwa', ar: 'سيوة' },
            matrouh: { es: 'Marsa Matrouh', en: 'Marsa Matrouh', ar: 'مرسى مطروح' }
        };

        return cityNames[city] || { es: city, en: city, ar: city };
    }

    // 🎨 الحصول على أيقونة المدينة
    private getCityIcon(city: SupportedCity): string {
        const cityIcons: Record<SupportedCity, string> = {
            cairo: '🏛️',
            luxor: '🏺',
            aswan: '⛵',
            alexandria: '🏛️',
            abuSimbel: '🗿',
            hurghada: '🏖️',
            sharmElSheikh: '🐠',
            saintCatherine: '⛰️',
            siwa: '🌴',
            matrouh: '🏖️'
        };

        return cityIcons[city] || '🗺️';
    }

    // 📝 إنشاء وصف مختصر للمدينة
    private createCityBriefDescription(city: SupportedCity, selectedSites: SupportedSite[], duration: number, language: Language): LocalizedString {
        const cityName = this.getCityLocalizedName(city);
        const siteCount = selectedSites.length;

        const descriptions = {
            cairo: {
                en: `A ${duration}-day immersive journey through Cairo's ancient wonders. Explore ${siteCount} carefully selected sites including the Great Pyramids, Egyptian Museum, and historic Islamic Cairo.`,
                es: `Un viaje inmersivo de ${duration} días por las maravillas antiguas de El Cairo. Explora ${siteCount} sitios cuidadosamente seleccionados incluyendo las Grandes Pirámides, el Museo Egipcio y el histórico Cairo Islámico.`,
                ar: `رحلة غامرة لمدة ${duration} أيام عبر عجائب القاهرة القديمة. استكشف ${siteCount} مواقع مختارة بعناية تشمل الأهرامات العظيمة والمتحف المصري والقاهرة الإسلامية التاريخية.`
            },
            luxor: {
                en: `Discover the treasures of ancient Thebes in this ${duration}-day Luxor adventure. Visit ${siteCount} magnificent temples, tombs, and monuments that tell the story of pharaonic Egypt.`,
                es: `Descubre los tesoros de la antigua Tebas en esta aventura de ${duration} días en Luxor. Visita ${siteCount} magníficos templos, tumbas y monumentos que cuentan la historia del Egipto faraónico.`,
                ar: `اكتشف كنوز طيبة القديمة في مغامرة الأقصر هذه لمدة ${duration} أيام. زر ${siteCount} معابد ومقابر وآثار رائعة تحكي قصة مصر الفرعونية.`
            },
            aswan: {
                en: `Experience the beauty of Upper Egypt in this ${duration}-day Aswan journey. Explore ${siteCount} ancient temples and monuments along the Nile, including the magnificent Philae Temple.`,
                es: `Experimenta la belleza del Alto Egipto en este viaje de ${duration} días a Asuán. Explora ${siteCount} templos y monumentos antiguos a lo largo del Nilo, incluyendo el magnífico Templo de Filae.`,
                ar: `اختبر جمال مصر العليا في رحلة أسوان هذه لمدة ${duration} أيام. استكشف ${siteCount} معابد وآثار قديمة على طول النيل، بما في ذلك معبد فيلة الرائع.`
            },
            alexandria: {
                en: `Discover the Mediterranean charm of Alexandria in this ${duration}-day coastal adventure. Explore ${siteCount} historic sites that blend Greek, Roman, and Egyptian cultures.`,
                es: `Descubre el encanto mediterráneo de Alejandría en esta aventura costera de ${duration} días. Explora ${siteCount} sitios históricos que combinan las culturas griega, romana y egipcia.`,
                ar: `اكتشف سحر الإسكندرية المتوسطي في مغامرة ساحلية لمدة ${duration} أيام. استكشف ${siteCount} مواقع تاريخية تدمج الثقافات اليونانية والرومانية والمصرية.`
            },
            abuSimbel: {
                en: `Witness the grandeur of Ramses II's masterpiece in this ${duration}-day Abu Simbel experience. Marvel at the colossal temples carved into the mountainside.`,
                es: `Presencia la grandeza de la obra maestra de Ramsés II en esta experiencia de ${duration} días en Abu Simbel. Maravíllate con los colosales templos tallados en la montaña.`,
                ar: `شاهد عظمة تحفة رمسيس الثاني في تجربة أبو سمبل هذه لمدة ${duration} أيام. تعجب بالمعابد الضخمة المنحوتة في الجبل.`
            }
        };

        const cityDescriptions = descriptions[city] || {
            en: `A ${duration}-day customized experience in ${cityName.en}. Explore ${siteCount} carefully selected sites and immerse yourself in the local culture.`,
            es: `Una experiencia personalizada de ${duration} días en ${cityName.es}. Explora ${siteCount} sitios cuidadosamente seleccionados y sumérgete en la cultura local.`,
            ar: `تجربة مخصصة لمدة ${duration} أيام في ${cityName.ar}. استكشف ${siteCount} مواقع مختارة بعناية واغمر نفسك في الثقافة المحلية.`
        };

        return {
            en: cityDescriptions.en,
            es: cityDescriptions.es,
            ar: cityDescriptions.ar
        };
    }

    // 📖 إنشاء وصف عام للمدينة
    private createCityGeneralDescription(city: SupportedCity, selectedSites: SupportedSite[], duration: number, language: Language): LocalizedString {
        const cityName = this.getCityLocalizedName(city);
        
        const descriptions = {
            cairo: {
                en: `Embark on an unforgettable ${duration}-day journey through the heart of ancient Egypt. Cairo, the city of a thousand minarets, offers an incredible blend of pharaonic grandeur and Islamic heritage. Your adventure begins with the iconic Great Pyramids of Giza, where you'll stand in awe of the last remaining wonder of the ancient world. Explore the mysterious Sphinx and discover the secrets of the pharaohs at the Grand Egyptian Museum, home to the treasures of Tutankhamun. Wander through the historic streets of Islamic Cairo, where ancient mosques and bustling bazaars tell stories of centuries past. Each day brings new discoveries as you immerse yourself in the rich tapestry of Egyptian history and culture.`,
                es: `Embárcate en un viaje inolvidable de ${duration} días por el corazón del antiguo Egipto. El Cairo, la ciudad de los mil minaretes, ofrece una increíble mezcla de grandeza faraónica y herencia islámica. Tu aventura comienza con las icónicas Grandes Pirámides de Giza, donde quedarás asombrado ante la última maravilla del mundo antiguo. Explora la misteriosa Esfinge y descubre los secretos de los faraones en el Gran Museo Egipcio, hogar de los tesoros de Tutankamón. Pasea por las calles históricas del Cairo Islámico, donde antiguas mezquitas y bulliciosos bazares cuentan historias de siglos pasados. Cada día trae nuevos descubrimientos mientras te sumerges en el rico tapiz de la historia y cultura egipcia.`,
                ar: `انطلق في رحلة لا تُنسى لمدة ${duration} أيام عبر قلب مصر القديمة. القاهرة، مدينة الألف مئذنة، تقدم مزيجًا رائعًا من العظمة الفرعونية والتراث الإسلامي. تبدأ مغامرتك بالأهرامات العظيمة الشهيرة في الجيزة، حيث ستقف مذهولاً أمام آخر عجائب الدنيا السبع. استكشف أبو الهول الغامض واكتشف أسرار الفراعنة في المتحف المصري الكبير، موطن كنوز توت عنخ آمون. تجول في شوارع القاهرة الإسلامية التاريخية، حيث تروي المساجد القديمة والأسواق المزدحمة قصص القرون الماضية. كل يوم يجلب اكتشافات جديدة بينما تغمر نفسك في النسيج الغني للتاريخ والثقافة المصرية.`
            },
            luxor: {
                en: `Step into the world of pharaohs with this ${duration}-day Luxor adventure. Known as the world's greatest open-air museum, Luxor offers an unparalleled journey through ancient Egyptian civilization. Begin your exploration at the magnificent Karnak Temple complex, where towering columns and intricate hieroglyphs tell stories of divine power. Cross the Nile to discover the Valley of the Kings, where pharaohs rest in their eternal tombs. Marvel at the Temple of Hatshepsut, dramatically carved into the cliffs, and explore the colorful tombs of nobles and artisans. Each site reveals another layer of Egypt's fascinating history, from the grandeur of royal temples to the intimate details of daily life in ancient times.`,
                es: `Adéntrate en el mundo de los faraones con esta aventura de ${duration} días en Luxor. Conocido como el museo al aire libre más grande del mundo, Luxor ofrece un viaje incomparable a través de la civilización del antiguo Egipto. Comienza tu exploración en el magnífico complejo del Templo de Karnak, donde columnas imponentes y jeroglíficos intrincados cuentan historias de poder divino. Cruza el Nilo para descubrir el Valle de los Reyes, donde los faraones descansan en sus tumbas eternas. Maravíllate con el Templo de Hatshepsut, dramáticamente tallado en los acantilados, y explora las coloridas tumbas de nobles y artesanos. Cada sitio revela otra capa de la fascinante historia de Egipto, desde la grandeza de los templos reales hasta los detalles íntimos de la vida cotidiana en la antigüedad.`,
                ar: `ادخل عالم الفراعنة مع مغامرة الأقصر هذه لمدة ${duration} أيام. المعروف باسم أكبر متحف في الهواء الطلق في العالم، يقدم الأقصر رحلة لا مثيل لها عبر حضارة مصر القديمة. ابدأ استكشافك في مجمع معبد الكرنك الرائع، حيث تروي الأعمدة الشاهقة والهيروغليفية المعقدة قصص القوة الإلهية. اعبر النيل لاكتشاف وادي الملوك، حيث يرقد الفراعنة في مقابرهم الأبدية. تعجب بمعبد حتشبسوت، المنحوت بشكل درامي في المنحدرات، واستكشف مقابر النبلاء والحرفيين الملونة. كل موقع يكشف عن طبقة أخرى من التاريخ المصري الرائع، من عظمة المعابد الملكية إلى التفاصيل الحميمة للحياة اليومية في العصور القديمة.`
            }
        };

        const cityDescriptions = descriptions[city] || {
            en: `Experience the unique charm of ${cityName.en} in this ${duration}-day customized journey. Discover the rich history, culture, and natural beauty that make this destination truly special.`,
            es: `Experimenta el encanto único de ${cityName.es} en este viaje personalizado de ${duration} días. Descubre la rica historia, cultura y belleza natural que hacen de este destino algo verdaderamente especial.`,
            ar: `اختبر السحر الفريد لـ ${cityName.ar} في هذه الرحلة المخصصة لمدة ${duration} أيام. اكتشف التاريخ الغني والثقافة والجمال الطبيعي الذي يجعل هذا الوجهة مميزة حقًا.`
        };

        return {
            en: cityDescriptions.en,
            es: cityDescriptions.es,
            ar: cityDescriptions.ar
        };
    }

    // 📅 إنشاء برنامج يومي للمدينة
    private createCityItinerary(city: SupportedCity, selectedSites: SupportedSite[], duration: number, language: Language): ItineraryItem[] {
        const itinerary: ItineraryItem[] = [];
        const sitesPerDay = Math.ceil(selectedSites.length / duration);

        for (let day = 1; day <= duration; day++) {
            const startIndex = (day - 1) * sitesPerDay;
            const endIndex = Math.min(startIndex + sitesPerDay, selectedSites.length);
            const daySites = selectedSites.slice(startIndex, endIndex);

            const dayTitle = {
                en: `Day ${day}: Exploring ${this.getCityLocalizedName(city).en}`,
                es: `Día ${day}: Explorando ${this.getCityLocalizedName(city).es}`,
                ar: `اليوم ${day}: استكشاف ${this.getCityLocalizedName(city).ar}`
            };

            const activities = this.generateActivitiesForSites(daySites, language);

            itinerary.push({
                day,
                title: dayTitle,
                activities
            });
        }

        return itinerary;
    }

    // 🎯 توليد الأنشطة للمواقع المختارة
    private generateActivitiesForSites(sites: SupportedSite[], language: Language): { es: string[]; en: string[]; ar?: string[] } {
        const activities: { es: string[]; en: string[]; ar?: string[] } = {
            es: [],
            en: [],
            ar: []
        };

        for (const site of sites) {
            const siteActivities = this.getSiteActivities(site, language);
            activities.es.push(...siteActivities.es);
            activities.en.push(...siteActivities.en);
            if (siteActivities.ar) {
                activities.ar!.push(...siteActivities.ar);
            }
        }

        return activities;
    }

    // 📋 الحصول على أنشطة موقع معين
    private getSiteActivities(site: SupportedSite, language: Language): { es: string[]; en: string[]; ar?: string[] } {
        // هذا يمكن توسيعه لاحقاً لاستخدام قاعدة بيانات أكثر تفصيلاً
        const siteActivities: Record<SupportedSite, { es: string[]; en: string[]; ar?: string[] }> = {
            'gizaPyramidsAndSphinx': {
                es: ['Visita a la Meseta de Giza', 'Exploración de las Grandes Pirámides', 'Contemplación de la Gran Esfinge'],
                en: ['Visit to Giza Plateau', 'Exploration of the Great Pyramids', 'Viewing the Great Sphinx'],
                ar: ['زيارة هضبة الجيزة', 'استكشاف الأهرامات العظيمة', 'مشاهدة أبو الهول العظيم']
            },
            'egyptianMuseum': {
                es: ['Visita al Museo Egipcio', 'Exploración de la colección de Tutankamón', 'Admiración de las momias reales'],
                en: ['Visit to Egyptian Museum', 'Exploration of Tutankhamun collection', 'Admiring the royal mummies'],
                ar: ['زيارة المتحف المصري', 'استكشاف مجموعة توت عنخ آمون', 'الإعجاب بالمومياوات الملكية']
            },
            'karnakTemple': {
                es: ['Visita al Templo de Karnak', 'Exploración de la Gran Sala Hipóstila', 'Admiración de los obeliscos'],
                en: ['Visit to Karnak Temple', 'Exploration of the Great Hypostyle Hall', 'Admiring the obelisks'],
                ar: ['زيارة معبد الكرنك', 'استكشاف قاعة الأعمدة العظيمة', 'الإعجاب بالأعمدة']
            },
            'valleyOfTheKings': {
                es: ['Descenso al Valle de los Reyes', 'Exploración de tumbas faraónicas', 'Descubrimiento de jeroglíficos'],
                en: ['Descent into Valley of the Kings', 'Exploration of pharaonic tombs', 'Discovery of hieroglyphs'],
                ar: ['النزول إلى وادي الملوك', 'استكشاف المقابر الفرعونية', 'اكتشاف الهيروغليفية']
            }
        };

        return siteActivities[site] || {
            es: [`Visita a ${site}`],
            en: [`Visit to ${site}`],
            ar: [`زيارة ${site}`]
        };
    }

    // ✅ الخدمات المشمولة
    private getCityServicesIncluded(city: SupportedCity, language: Language): { es: string[]; en: string[]; ar?: string[] } {
        const baseServices = {
            es: [
                'Traslados privados de lujo',
                'Guía egiptólogo profesional',
                'Entradas a todos los sitios mencionados',
                'Alojamiento con desayuno',
                'Asistencia 24/7'
            ],
            en: [
                'Private luxury transfers',
                'Professional Egyptologist guide',
                'Entrance fees to all mentioned sites',
                'Accommodation with breakfast',
                '24/7 assistance'
            ],
            ar: [
                'نقل خاص فاخر',
                'دليل متخصص في علم المصريات',
                'رسوم دخول لجميع المواقع المذكورة',
                'إقامة مع الإفطار',
                'مساعدة على مدار الساعة'
            ]
        };

        return baseServices;
    }

    // ❌ الخدمات غير المشمولة
    private getCityServicesExcluded(city: SupportedCity, language: Language): { es: string[]; en: string[]; ar?: string[] } {
        const baseServices = {
            es: [
                'Vuelos internacionales',
                'Almuerzos y cenas (excepto desayuno)',
                'Propinas y gastos personales',
                'Seguro de viaje',
                'Gastos de visa'
            ],
            en: [
                'International flights',
                'Lunches and dinners (except breakfast)',
                'Tips and personal expenses',
                'Travel insurance',
                'Visa fees'
            ],
            ar: [
                'الرحلات الجوية الدولية',
                'الغداء والعشاء (عدا الإفطار)',
                'البقشيش والمصروفات الشخصية',
                'تأمين السفر',
                'رسوم التأشيرة'
            ]
        };

        return baseServices;
    }

    // ⚠️ ملاحظات مهمة
    private getCityImportantNotes(city: SupportedCity, language: Language): { es: string[]; en: string[]; ar?: string[] } {
        const baseNotes = {
            es: [
                'Se requiere pasaporte válido',
                'Se recomienda ropa cómoda y zapatos para caminar',
                'Horarios de sitios pueden variar según temporada',
                'Fotografía permitida en la mayoría de sitios'
            ],
            en: [
                'Valid passport required',
                'Comfortable clothing and walking shoes recommended',
                'Site hours may vary by season',
                'Photography allowed at most sites'
            ],
            ar: [
                'مطلوب جواز سفر صالح',
                'يُنصح بملابس مريحة وأحذية للمشي',
                'أوقات المواقع قد تختلف حسب الموسم',
                'التصوير مسموح في معظم المواقع'
            ]
        };

        return baseNotes;
    }
}       cons// 🚀 تصدير الدالة الرئيسية
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

// 🏙️ تصدير دوال النظام الجديد
export function getAvailableCities(): SupportedCity[] {
    const extractor = new IntelligentDataExtractor();
    return extractor.getAvailableCities();
}

export function getSitesForCity(city: SupportedCity): SupportedSite[] {
    const extractor = new IntelligentDataExtractor();
    return extractor.getSitesForCity(city);
}

export function createCityBasedProgram(request: {
    city: SupportedCity;
    selectedSites: SupportedSite[];
    duration: number;
    travelers: number;
    season: 'summer' | 'winter';
    category: 'gold' | 'diamond';
    language: Language;
}): Program {
    const extractor = new IntelligentDataExtractor();
    return extractor.createCityBasedProgram(request);
}

export function getAccommodationForCity(city: SupportedCity, category: 'gold' | 'diamond'): AccommodationInfo[] {
    const extractor = new IntelligentDataExtractor();
    return extractor.getAccommodationForCity(city, category);
}      ar: `رحلة مخصصة لمدة ${duration} أيام - ${cityList}`
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