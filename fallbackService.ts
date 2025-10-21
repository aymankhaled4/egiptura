// import type { Program, ItineraryItem, CustomQuoteParams, SupportedSite, SupportedCity, LocalizedString } from '../types';
// import { knowledgeBase } from './knowledgeBase';
// // FIX: Imported Language type from its correct location in LanguageContext.
// import type { Language } from '../contexts/LanguageContext';

// // This robust fallback function generates a valid, detailed Program object locally if the AI fails.
// // It enforces critical business rules and constructs a rich, user-facing itinerary.
// export function generateLocalFallbackProgram(userText: string, lang: Language): Program {
//     const t = userText.toLowerCase();
//     const uiText = knowledgeBase.localizedStrings.ui[lang] ?? knowledgeBase.localizedStrings.ui.es;
    
//     // 1. Determine total duration and travelers
//     const daysMatch = t.match(/(\d+)\s*(days?|d[ií]as|ايام|يوم)/i);
//     const nightsMatch = t.match(/(\d+)\s*(nights?|noches?|ليال(?:ي)?)/i);

//     let duration = 9;
//     let totalNights = 8;
  
//     if (nightsMatch) {
//       totalNights = parseInt(nightsMatch[1], 10);
//       duration = totalNights + 1;
//     } else if (daysMatch) {
//       duration = parseInt(daysMatch[1], 10);
//       totalNights = duration - 1;
//     }
  
//     const travelers = +(t.match(/(\d+)\s*(pax|personas|persons|اشخاص|أشخاص|افراد)/)?.[1] ?? 2);
    
//     // 2. Parse cruise nights
//     const cruiseNights = +(t.match(/(\d+)\s*(?:nights?|noches?)\s*(?:on\s*)?(?:a\s*)?cruise|crucero|كروز/i)?.[1] ?? 0);
//     const cairoNights = Math.max(0, totalNights - cruiseNights);
    
//     // 3. Determine Season and Category
//     const season = /oct|nov|dec|jan|feb|mar|apr|اكتةبر|أكتوبر|نوفمبر|ديسمبر|يناير|فبراير|مارس|أبريل/i.test(t) ? "winter" : "summer";
//     const category = /diam/i.test(t) ? "diamond" : "gold";

//     // 4. Strict site detection
//     const siteKeywords: { [key: string]: SupportedSite } = {
//         'pyramids': 'gizaPyramidsAndSphinx', 'pirámides': 'gizaPyramidsAndSphinx',
//         'sphinx': 'gizaPyramidsAndSphinx', 'esfinge': 'gizaPyramidsAndSphinx',
//         'museum': 'egyptianMuseum', 'museo': 'egyptianMuseum', 'khan el khalili': 'khanElKhalili',
//         'karnak': 'karnakTemple', 'luxor temple': 'luxorTemple', 'valley of the kings': 'valleyOfTheKings',
//         'hatshepsut': 'hatshepsutTemple', 'abu simbel': 'abuSimbelTemples',
//     };
//     const detectedSites = [...new Set(Object.keys(siteKeywords).filter(k => t.includes(k)).map(k => siteKeywords[k]))];

//     // 5. Build a detailed, narrative itinerary
//     const itineraryDays: ItineraryItem[] = [];
//     let currentDay = 1;

//     const addDay = (title: LocalizedString, activities: string | string[] | LocalizedString) => {
//   const toArray = (val: any, key: keyof LocalizedString) => {
//     if (Array.isArray(val)) return val;
//     if (typeof val === 'object' && val !== null && val[key]) return [val[key]];
//     if (typeof val === 'string') return [val];
//     return [''];
//   };

//   const activitiesObj = {
//     es: toArray(activities, 'es'),
//     en: toArray(activities, 'en'),
//     ar: toArray(activities, 'ar'),
//   };

//   itineraryDays.push({ day: currentDay++, title, activities: activitiesObj });
// };


//     // --- Itinerary Construction Logic ---
//     // FIX: The calls to addDay were causing type errors because the `title` argument (from uiText.fallbackDayTitles) was missing the 'es' property when the language was 'en'. This was fixed in `localization/strings.ts`.
//    // --- Itinerary Construction Logic ---

//    const getDayTitle = (lang: Language, dayNum: number, baseTitle: LocalizedString): LocalizedString => {
//     return {
//         es: `${baseTitle.es}`,
//         en: `${baseTitle.en}`,
//         ar: `${baseTitle.ar}`
//     };
//     };

//        // Arrival day
//         addDay(
//         getDayTitle(lang, currentDay, uiText.fallbackDayTitles.arrival),
//         uiText.fallbackDayActivities.arrival[lang]
//         );

//         // Cairo Days (excluding arrival & departure)
//         for (let i = 0; i < totalNights - 1; i++) {
//         const cairoActivity = uiText.fallbackDayActivities.cairoFreeDay[lang];
//         const activityText = Array.isArray(cairoActivity)
//             ? cairoActivity.map(a =>
//                 a.replace('{suggestions}', uiText.optionalToursByCity.cairo[lang])
//             )
//             : cairoActivity.replace('{suggestions}', uiText.optionalToursByCity.cairo[lang]);

//         addDay(
//             getDayTitle(lang, currentDay, uiText.fallbackDayTitles.cairoTour),
//             activityText
//         );
//         }

//         // Departure day
//         addDay(
//         getDayTitle(lang, currentDay, uiText.fallbackDayTitles.departure),
//         uiText.fallbackDayActivities.departure[lang]
//         );


//     // 6. Construct Quote Params
//     const nightsObject: Partial<Record<SupportedCity, number>> = {};
//     if (cairoNights > 0) nightsObject.cairo = cairoNights;
//     if (cruiseNights > 0) nightsObject.cruise = cruiseNights;
  
//     const quoteParams: CustomQuoteParams = {
//         travelers, duration, season, category, 
//         itineraryPlan: {
//             nights: nightsObject,
//             sites: detectedSites,
//             flightSectors: cruiseNights > 0 ? 2 : 0,
//         }
//     };

//     // 7. Generate Hyper-Detailed Services Included
//     const catKey = category === 'gold' ? 'Gold' : 'Diamond';
//     const dynamicIncluded: Record<Language, string[]> = { es: [], en: [], ar: [] };
    
//     const langHotelDefs = knowledgeBase.definitions.accommodations[catKey];

//     if (cairoNights > 0) {
//         const hotel = langHotelDefs["El Cairo"];
//         (Object.keys(dynamicIncluded) as Language[]).forEach(l => {
//              dynamicIncluded[l].push(uiText.serviceStrings.accommodation[l].replace('{nights}', cairoNights.toString()).replace('{city}', 'El Cairo').replace('{hotel}', hotel).replace('{board}', uiText.serviceStrings.breakfastBoard[l]));
//         });
//     }
//     if (cruiseNights > 0) {
//         const hotel = langHotelDefs["Crucero por el Nilo"];
//          (Object.keys(dynamicIncluded) as Language[]).forEach(l => {
//             dynamicIncluded[l].push(uiText.serviceStrings.accommodation[l].replace('{nights}', cruiseNights.toString()).replace('{city}', 'Crucero por el Nilo').replace('{hotel}', hotel).replace('{board}', uiText.serviceStrings.fullBoard[l]));
//             dynamicIncluded[l].push(uiText.serviceStrings.domesticFlights[l]);
//         });
//     }
    
//     // 8. Construct the full Program object
//     const program: Program = {
//         id: `fallback-${Date.now()}`,
//         isCustom: true,
//         quoteParams: quoteParams,
//         name: {
//             es: uiText.customQuoteTitle.replace('{duration}', duration.toString()),
//             en: uiText.customQuoteTitle.replace('{duration}', duration.toString()),
//             ar: uiText.customQuoteTitle.replace('{duration}', duration.toString()),
//         },
//         icon: "🗺️",
//         duration: { days: duration, nights: totalNights },
//         priceFrom: 0,
//         categories: [category],
//         startCity: { es: "El Cairo", en: "Cairo", ar: "القاهرة" },
//         ...(cruiseNights > 0 && { cruiseNights }),
//         briefDescription: {
//              es: `Un viaje a medida de ${totalNights} noches, incluyendo ${cairoNights} noches en El Cairo ${cruiseNights > 0 ? `y ${cruiseNights} noches en un crucero por el Nilo` : ''}.`,
//              en: `A custom ${totalNights}-night journey, including ${cairoNights} nights in Cairo ${cruiseNights > 0 ? `and ${cruiseNights} nights on a Nile cruise` : ''}.`,
//              ar: `رحلة مخصصة لمدة ${totalNights} ليلة، تشمل ${cairoNights} ليالٍ في القاهرة ${cruiseNights > 0 ? `و ${cruiseNights} ليالٍ في رحلة نيلية` : ''}.`
//         },
//         generalDescription: {
//             es: `Este es un itinerario diseñado especialmente para ti, basado en tu solicitud de ${duration} días. Explora las maravillas de Egipto, desde la majestuosidad de El Cairo ${cruiseNights > 0 ? 'hasta la serenidad de un crucero por el Nilo.' : '.'} Cada detalle ha sido considerado para crear una experiencia inolvidable.`,
//             en: `This is an itinerary specially designed for you, based on your request for ${duration} days. Explore the wonders of Egypt, from the majesty of Cairo ${cruiseNights > 0 ? 'to the serenity of a Nile cruise.' : '.'} Every detail has been considered to create an unforgettable experience.`,
//             ar: `هذا خط سير مصمم خصيصًا لك، بناءً على طلبك لمدة ${duration} يومًا. استكشف عجائب مصر، من عظمة القاهرة ${cruiseNights > 0 ? 'إلى هدوء رحلة نيلية.' : '.'} تم أخذ كل التفاصيل في الاعتبار لخلق تجربة لا تُنسى.`
//         },
//         itinerary: itineraryDays,
//         accommodations: {
//             gold: [{ city: {es:"El Cairo", en:"Cairo", ar: "القاهرة"}, hotel: {es: knowledgeBase.definitions.accommodations.Gold["El Cairo"], en: knowledgeBase.definitions.accommodations.Gold["El Cairo"], ar: knowledgeBase.definitions.accommodations.Gold["El Cairo"]} }],
//             diamond: [{ city: {es:"El Cairo", en:"Cairo", ar: "القاهرة"}, hotel: {es: knowledgeBase.definitions.accommodations.Diamond["El Cairo"], en: knowledgeBase.definitions.accommodations.Diamond["El Cairo"], ar: knowledgeBase.definitions.accommodations.Diamond["El Cairo"]} }],
//         },
//         servicesIncluded: {
//             es: [...dynamicIncluded.es, ...knowledgeBase.defaults.servicesIncluded.es],
//             en: [...dynamicIncluded.en, ...knowledgeBase.defaults.servicesIncluded.en],
//             ar: [...(dynamicIncluded.ar ?? []), ...(knowledgeBase.defaults.servicesIncluded.ar ?? [])]
//         },
//         servicesExcluded: knowledgeBase.defaults.servicesExcluded,
//         importantNotes: knowledgeBase.defaults.importantNotes,
//     };

//     return program;
// }

// export function withDisplayDefaults(program: Program): Program {
//   const def = knowledgeBase.defaults;
//   // Create a mutable copy to avoid modifying the original object
//   const safeProgram = { ...program };

//   const defaultLocalizedString: LocalizedString = { 
//     es: 'Información no disponible', 
//     en: 'Information not available', 
//     ar: 'المعلومات غير متوفرة' 
//   };
  
//   // Ensure all LocalizedString fields and other critical properties have a default structure
//   safeProgram.name = safeProgram.name ?? { ...defaultLocalizedString, es: "Viaje Personalizado", en: "Custom Trip", ar: "رحلة مخصصة" };
//   safeProgram.briefDescription = safeProgram.briefDescription ?? defaultLocalizedString;
//   safeProgram.generalDescription = safeProgram.generalDescription ?? defaultLocalizedString;
//   safeProgram.startCity = safeProgram.startCity ?? { es: 'El Cairo', en: 'Cairo', ar: 'القاهرة' };
//   safeProgram.icon = safeProgram.icon ?? "🗺️";
//   safeProgram.duration = safeProgram.duration ?? { days: 0, nights: 0 };
  
//   // Ensure arrays and other objects have defaults
//   safeProgram.servicesIncluded = safeProgram.servicesIncluded ?? def?.servicesIncluded ?? {es:[],en:[],ar:[]};
//   safeProgram.servicesExcluded = safeProgram.servicesExcluded ?? def?.servicesExcluded ?? {es:[],en:[],ar:[]};
//   safeProgram.importantNotes = safeProgram.importantNotes ?? def?.importantNotes ?? {es:[],en:[],ar:[]};
//   safeProgram.categories = safeProgram.categories?.length ? safeProgram.categories : ['gold'];
//   safeProgram.accommodations = safeProgram.accommodations ?? { gold: [], diamond: [] };

//   return safeProgram;
// }



// import type { Program, ItineraryItem, CustomQuoteParams, SupportedSite, SupportedCity, LocalizedString } from '../types';
// import { knowledgeBase } from './knowledgeBase';
// import type { Language } from '../contexts/LanguageContext';

// // دالة للعثور على أفضل برنامج مطابق من البرامج العشرة
// function findBestMatchingProgram(intent: { duration?: number; includeCruise?: boolean; destination?: string }): Program | null {
//     const { duration = 8, includeCruise = false, destination } = intent;
    
//     // ترجيح البرامج بناءً على المطابقة
//     const scoredPrograms = knowledgeBase.packages.map(program => {
//         let score = 0;
        
//         // مطابقة المدة (40% من النقاط)
//         const durationDiff = Math.abs(program.duration.days - duration);
//         score += Math.max(0, 40 - (durationDiff * 5));
        
//         // مطابقة الكروز (30% من النقاط)
//         if (includeCruise && program.cruiseNights && program.cruiseNights > 0) {
//             score += 30;
//         } else if (!includeCruise && (!program.cruiseNights || program.cruiseNights === 0)) {
//             score += 30;
//         }
        
//         // مطابقة الوجهة (30% من النقاط)
//         if (destination) {
//             const programDestinations = getProgramDestinations(program);
//             if (programDestinations.some(dest => destination.toLowerCase().includes(dest.toLowerCase()))) {
//                 score += 30;
//             }
//         }
        
//         return { program, score };
//     });
    
//     // ترتيب البرامج حسب النقاط
//     scoredPrograms.sort((a, b) => b.score - a.score);
    
//     // إرجاع أفضل برنامج (إذا كان لديه 50 نقطة على الأقل)
//     return scoredPrograms[0]?.score >= 50 ? scoredPrograms[0].program : null;
// }

// function getProgramDestinations(program: Program): string[] {
//     const destinations = new Set<string>();
    
//     // استخراج الوجهات من الـ itinerary والوصف
//     const description = program.generalDescription.en.toLowerCase() + ' ' + program.briefDescription.en.toLowerCase();
    
//     if (description.includes('cairo') || description.includes('el cairo')) destinations.add('cairo');
//     if (description.includes('luxor')) destinations.add('luxor');
//     if (description.includes('aswan') || description.includes('asuan')) destinations.add('aswan');
//     if (description.includes('alexandria')) destinations.add('alexandria');
//     if (description.includes('abu simbel')) destinations.add('abu simbel');
//     if (description.includes('red sea') || description.includes('hurghada')) destinations.add('red sea');
//     if (description.includes('siwa')) destinations.add('siwa');
//     if (description.includes('matrouh')) destinations.add('matrouh');
    
//     return Array.from(destinations);
// }

// // دالة تكييف الـ Itinerary من البرنامج المطابق
// function adaptItineraryFromProgram(sourceProgram: Program, targetDuration: number, intent: any): ItineraryItem[] {
//     let sourceItinerary: ItineraryItem[] = [];
    
//     // الحصول على الـ itinerary من البرنامج المصدر
//     if (sourceProgram.itineraryOptions && sourceProgram.itineraryOptions.length > 0) {
//         sourceItinerary = sourceProgram.itineraryOptions[0].itinerary;
//     } else if (sourceProgram.itinerary) {
//         sourceItinerary = sourceProgram.itinerary;
//     }
    
//     if (sourceItinerary.length === 0) {
//         return generateDefaultItinerary(intent);
//     }
    
//     const sourceDuration = sourceProgram.duration.days;
    
//     if (targetDuration === sourceDuration) {
//         // نفس المدة - نستخدم الـ itinerary كما هو
//         return [...sourceItinerary];
//     } else if (targetDuration < sourceDuration) {
//         // مدة أقصر - نأخذ الأيام الأولى (باستثناء يوم المغادرة)
//         return sourceItinerary.slice(0, targetDuration - 1).concat(sourceItinerary[sourceItinerary.length - 1]);
//     } else {
//         // مدة أطول - نضيف أيام إضافية
//         const additionalDays = targetDuration - sourceDuration;
//         const additionalItinerary: ItineraryItem[] = [];
        
//         for (let i = 0; i < additionalDays; i++) {
//             additionalItinerary.push({
//                 day: sourceDuration + i,
//                 title: { 
//                     en: `Free Day in ${intent.destination?.includes('luxor') ? 'Luxor' : 'Cairo'}`,
//                     es: `Día Libre en ${intent.destination?.includes('luxor') ? 'Luxor' : 'El Cairo'}`,
//                     ar: `يوم حر في ${intent.destination?.includes('luxor') ? 'الأقصر' : 'القاهرة'}`
//                 },
//                 activities: {
//                     en: ['Free time for personal exploration', 'Optional activities available'],
//                     es: ['Tiempo libre para exploración personal', 'Actividades opcionales disponibles'],
//                     ar: ['وقت حر للاستكشاف الشخصي', 'أنشطة اختيارية متاحة']
//                 }
//             });
//         }
        
//         return [...sourceItinerary.slice(0, -1), ...additionalItinerary, sourceItinerary[sourceItinerary.length - 1]];
//     }
// }

// // دالة إنشاء itinerary افتراضي (للطوارئ)
// function generateDefaultItinerary(intent: any): ItineraryItem[] {
//     const { duration = 8, includeCruise = false } = intent;
//     const uiText = knowledgeBase.localizedStrings.ui[intent.lang] ?? knowledgeBase.localizedStrings.ui.es;
    
//     const itineraryDays: ItineraryItem[] = [];
//     let currentDay = 1;

//     const addDay = (title: LocalizedString, activities: string | string[] | LocalizedString) => {
//         const toArray = (val: any, key: keyof LocalizedString) => {
//             if (Array.isArray(val)) return val;
//             if (typeof val === 'object' && val !== null && val[key]) return [val[key]];
//             if (typeof val === 'string') return [val];
//             return [''];
//         };

//         const activitiesObj = {
//             es: toArray(activities, 'es'),
//             en: toArray(activities, 'en'),
//             ar: toArray(activities, 'ar'),
//         };

//         itineraryDays.push({ day: currentDay++, title, activities: activitiesObj });
//     };

//     const getDayTitle = (lang: Language, dayNum: number, baseTitle: LocalizedString): LocalizedString => {
//         return {
//             es: `${baseTitle.es}`,
//             en: `${baseTitle.en}`,
//             ar: `${baseTitle.ar}`
//         };
//     };

//     // Arrival day
//     addDay(
//         getDayTitle(intent.lang, currentDay, uiText.fallbackDayTitles.arrival),
//         uiText.fallbackDayActivities.arrival[intent.lang]
//     );

//     // Cairo Days (excluding arrival & departure)
//     for (let i = 0; i < duration - 2; i++) {
//         const cairoActivity = uiText.fallbackDayActivities.cairoFreeDay[intent.lang];
//         const activityText = Array.isArray(cairoActivity)
//             ? cairoActivity.map(a =>
//                 a.replace('{suggestions}', uiText.optionalToursByCity.cairo[intent.lang])
//             )
//             : cairoActivity.replace('{suggestions}', uiText.optionalToursByCity.cairo[intent.lang]);

//         addDay(
//             getDayTitle(intent.lang, currentDay, uiText.fallbackDayTitles.cairoTour),
//             activityText
//         );
//     }

//     // Departure day
//     addDay(
//         getDayTitle(intent.lang, currentDay, uiText.fallbackDayTitles.departure),
//         uiText.fallbackDayActivities.departure[intent.lang]
//     );

//     return itineraryDays;
// }

// // الدالة الرئيسية المحسنة
// export function generateLocalFallbackProgram(userText: string, lang: Language): Program {
//     const t = userText.toLowerCase();
//     const uiText = knowledgeBase.localizedStrings.ui[lang] ?? knowledgeBase.localizedStrings.ui.es;
    
//     // 1. Determine total duration and travelers
//     const daysMatch = t.match(/(\d+)\s*(days?|d[ií]as|ايام|يوم)/i);
//     const nightsMatch = t.match(/(\d+)\s*(nights?|noches?|ليال(?:ي)?)/i);

//     let duration = parseInt(daysMatch[1], 10);
//     let totalNights = duration - 1;

//     if (duration >= 3 && duration <= 15) {
//     // كل المدد مقبولة
//     } else if (duration > 15) {
//         duration = 15; // حد أقصى معقول
//         totalNights = 14;
//     } else {
//         duration = 4; // حد أدنى معقول  
//         totalNights = 3;
//     }
  
//     if (nightsMatch) {
//       totalNights = parseInt(nightsMatch[1], 10);
//       duration = totalNights + 1;
//     } else if (daysMatch) {
//       duration = parseInt(daysMatch[1], 10);
//       totalNights = duration - 1;
//     }
  
//     const travelers = +(t.match(/(\d+)\s*(pax|personas|persons|اشخاص|أشخاص|افراد)/)?.[1] ?? 2);
    
//     // 2. Parse cruise nights
//     const includeCruise = /cruise|crucero|كروز|نيل|nile/i.test(t);

//     // const cruiseNights = includeCruise ? (duration >= 8 ? 4 : 3) : 0;
//     // const cairoNights = Math.max(0, totalNights - cruiseNights);

//     // التصحيح في fallbackService.ts
// const calculateNightsDistribution = (duration: number, includeCruise: boolean) => {
//     const totalNights = duration - 1;
    
//     if (includeCruise) {
//         // لرحلة 8 أيام (7 ليالي): 4 كروز + 3 قاهرة
//         if (duration >= 8) {
//             return { cruiseNights: 4, cairoNights: totalNights - 4 };
//         }
//         // لرحلة أقل من 8 أيام
//         else {
//             return { cruiseNights: 3, cairoNights: totalNights - 3 };
//         }
//     } else {
//         return { cruiseNights: 0, cairoNights: totalNights };
//     }
// };

// // ثم نستخدمها:
// const { cruiseNights, cairoNights } = calculateNightsDistribution(duration, includeCruise);
    
//     // 3. Determine Season and Category
//     const season = /oct|nov|dec|jan|feb|mar|apr|اكتةبر|أكتوبر|نوفمبر|ديسمبر|يناير|فبراير|مارس|أبريل/i.test(t) ? "winter" : "summer";
//     const category = /diam/i.test(t) ? "diamond" : "gold";

//     // 4. Detect destination from user text
//     let destination = '';
//     if (t.includes('cairo') || t.includes('el cairo') || t.includes('القاهرة')) destination = 'cairo';
//     if (t.includes('luxor') || t.includes('الأقصر')) destination = 'luxor';
//     if (t.includes('aswan') || t.includes('أسوان')) destination = 'aswan';
//     if (t.includes('alexandria') || t.includes('الإسكندرية')) destination = 'alexandria';
//     if (t.includes('abu simbel') || t.includes('أبو سمبل')) destination = 'abu simbel';
//     if (t.includes('red sea') || t.includes('hurghada') || t.includes('البحر الأحمر')) destination = 'red sea';

//     // 5. Strict site detection
//     const siteKeywords: { [key: string]: SupportedSite } = {
//         'pyramids': 'gizaPyramidsAndSphinx', 'pirámides': 'gizaPyramidsAndSphinx',
//         'sphinx': 'gizaPyramidsAndSphinx', 'esfinge': 'gizaPyramidsAndSphinx',
//         'museum': 'egyptianMuseum', 'museo': 'egyptianMuseum', 'khan el khalili': 'khanElKhalili',
//         'karnak': 'karnakTemple', 'luxor temple': 'luxorTemple', 'valley of the kings': 'valleyOfTheKings',
//         'hatshepsut': 'hatshepsutTemple', 'abu simbel': 'abuSimbelTemples',
//     };
//     const detectedSites = [...new Set(Object.keys(siteKeywords).filter(k => t.includes(k)).map(k => siteKeywords[k]))];

//     // 6. البحث عن أفضل برنامج مطابق وإنشاء الـ Itinerary
//     const intent = { duration, includeCruise, destination, lang };
//     const bestMatch = findBestMatchingProgram(intent);
    
//     let itineraryDays: ItineraryItem[] = [];
//     let programName = { en: '', es: '', ar: '' };
//     let briefDesc = { en: '', es: '', ar: '' };
//     let generalDesc = { en: '', es: '', ar: '' };

//     if (bestMatch) {
//         // استخدام itinerary البرنامج المطابق مع تعديل الأيام
//         itineraryDays = adaptItineraryFromProgram(bestMatch, duration, intent);
        
//         // إنشاء أسماء وأوصاف مخصصة بناءً على البرنامج المطابق
//         programName = {
//             en: `Custom ${bestMatch.name.en}`,
//             es: `Personalizado ${bestMatch.name.es}`,
//             ar: `مخصص ${bestMatch.name.ar}`
//         };
        
//         briefDesc = {
//             en: `A tailored version of ${bestMatch.name.en} - ${bestMatch.briefDescription.en}`,
//             es: `Una versión personalizada de ${bestMatch.name.es} - ${bestMatch.briefDescription.es}`,
//             ar: `نسخة مخصصة من ${bestMatch.name.ar} - ${bestMatch.briefDescription.ar}`
//         };
        
//         generalDesc = {
//             en: `This custom itinerary is based on our popular ${bestMatch.name.en} program, adapted to your ${duration}-day preference. ${bestMatch.generalDescription.en}`,
//             es: `Este itinerario personalizado se basa en nuestro popular programa ${bestMatch.name.es}, adaptado a tu preferencia de ${duration} días. ${bestMatch.generalDescription.es}`,
//             ar: `هذا المسار المخصص يستند إلى برنامجنا الشهير ${bestMatch.name.ar}، معدلاً حسب تفضيلك لمدة ${duration} أيام. ${bestMatch.generalDescription.ar}`
//         };
//     } else {
//         // Fallback إلى الـ itinerary الافتراضي (إذا لم نجد برنامج مطابق)
//         itineraryDays = generateDefaultItinerary(intent);
        
//         programName = {
//             es: uiText.customQuoteTitle.replace('{duration}', duration.toString()),
//             en: uiText.customQuoteTitle.replace('{duration}', duration.toString()),
//             ar: uiText.customQuoteTitle.replace('{duration}', duration.toString()),
//         };
        
//         briefDesc = {
//             es: `Un viaje a medida de ${totalNights} noches, incluyendo ${cairoNights} noches en El Cairo ${cruiseNights > 0 ? `y ${cruiseNights} noches en un crucero por el Nilo` : ''}.`,
//             en: `A custom ${totalNights}-night journey, including ${cairoNights} nights in Cairo ${cruiseNights > 0 ? `and ${cruiseNights} nights on a Nile cruise` : ''}.`,
//             ar: `رحلة مخصصة لمدة ${totalNights} ليلة، تشمل ${cairoNights} ليالٍ في القاهرة ${cruiseNights > 0 ? `و ${cruiseNights} ليالٍ في رحلة نيلية` : ''}.`
//         };
        
//         generalDesc = {
//             es: `Este es un itinerario diseñado especialmente para ti, basado en tu solicitud de ${duration} días. Explora las maravillas de Egipto, desde la majestuosidad de El Cairo ${cruiseNights > 0 ? 'hasta la serenidad de un crucero por el Nilo.' : '.'} Cada detalle ha sido considerado para crear una experiencia inolvidable.`,
//             en: `This is an itinerary specially designed for you, based on your request for ${duration} days. Explore the wonders of Egypt, from the majesty of Cairo ${cruiseNights > 0 ? 'to the serenity of a Nile cruise.' : '.'} Every detail has been considered to create an unforgettable experience.`,
//             ar: `هذا خط سير مصمم خصيصًا لك، بناءً على طلبك لمدة ${duration} يومًا. استكشف عجائب مصر، من عظمة القاهرة ${cruiseNights > 0 ? 'إلى هدوء رحلة نيلية.' : '.'} تم أخذ كل التفاصيل في الاعتبار لخلق تجربة لا تُنسى.`
//         };
//     }

//     // 7. Construct Quote Params
//     const nightsObject: Partial<Record<SupportedCity, number>> = {};
//     if (cairoNights > 0) nightsObject.cairo = cairoNights;
//     if (cruiseNights > 0) nightsObject.cruise = cruiseNights;
  
//     const quoteParams: CustomQuoteParams = {
//         travelers, duration, season, category, 
//         itineraryPlan: {
//             nights: nightsObject,
//             sites: detectedSites,
//             flightSectors: cruiseNights > 0 ? 2 : 0,
//         }
//     };

//     // 8. Generate Hyper-Detailed Services Included
//     const catKey = category === 'gold' ? 'Gold' : 'Diamond';
//     const dynamicIncluded: Record<Language, string[]> = { es: [], en: [], ar: [] };
    
//     const langHotelDefs = knowledgeBase.definitions.accommodations[catKey];

//     if (cairoNights > 0) {
//         const hotel = langHotelDefs["El Cairo"];
//         (Object.keys(dynamicIncluded) as Language[]).forEach(l => {
//              dynamicIncluded[l].push(uiText.serviceStrings.accommodation[l].replace('{nights}', cairoNights.toString()).replace('{city}', 'El Cairo').replace('{hotel}', hotel).replace('{board}', uiText.serviceStrings.breakfastBoard[l]));
//         });
//     }
//     if (cruiseNights > 0) {
//         const hotel = langHotelDefs["Crucero por el Nilo"];
//          (Object.keys(dynamicIncluded) as Language[]).forEach(l => {
//             dynamicIncluded[l].push(uiText.serviceStrings.accommodation[l].replace('{nights}', cruiseNights.toString()).replace('{city}', 'Crucero por el Nilo').replace('{hotel}', hotel).replace('{board}', uiText.serviceStrings.fullBoard[l]));
//             dynamicIncluded[l].push(uiText.serviceStrings.domesticFlights[l]);
//         });
//     }
    
//     // 9. Construct the full Program object
//     const program: Program = {
//         id: `custom-${Date.now()}`,
//         isCustom: true,
//         quoteParams: quoteParams,
//         name: programName,
//         icon: bestMatch?.icon || "🗺️",
//         duration: { days: duration, nights: totalNights },
//         priceFrom: bestMatch?.priceFrom || 0,
//         categories: [category],
//         startCity: { es: "El Cairo", en: "Cairo", ar: "القاهرة" },
//         // ✅ الإصلاح: فقط إذا كان cruiseNights > 0 نضيف الخاصية
//         ...(cruiseNights > 0 && { cruiseNights }),
//         briefDescription: briefDesc,
//         generalDescription: generalDesc,
//         itinerary: itineraryDays,
//         accommodations: bestMatch?.accommodations || {
//             gold: [{ city: {es:"El Cairo", en:"Cairo", ar: "القاهرة"}, hotel: {es: knowledgeBase.definitions.accommodations.Gold["El Cairo"], en: knowledgeBase.definitions.accommodations.Gold["El Cairo"], ar: knowledgeBase.definitions.accommodations.Gold["El Cairo"]} }],
//             diamond: [{ city: {es:"El Cairo", en:"Cairo", ar: "القاهرة"}, hotel: {es: knowledgeBase.definitions.accommodations.Diamond["El Cairo"], en: knowledgeBase.definitions.accommodations.Diamond["El Cairo"], ar: knowledgeBase.definitions.accommodations.Diamond["El Cairo"]} }],
//         },
//         servicesIncluded: bestMatch?.servicesIncluded || {
//             es: [...dynamicIncluded.es, ...knowledgeBase.defaults.servicesIncluded.es],
//             en: [...dynamicIncluded.en, ...knowledgeBase.defaults.servicesIncluded.en],
//             ar: [...(dynamicIncluded.ar ?? []), ...(knowledgeBase.defaults.servicesIncluded.ar ?? [])]
//         },
//         servicesExcluded: bestMatch?.servicesExcluded || knowledgeBase.defaults.servicesExcluded,
//         importantNotes: bestMatch?.importantNotes || knowledgeBase.defaults.importantNotes,
//     };

//     return program;
// }

// export function withDisplayDefaults(program: Program): Program {
//   const def = knowledgeBase.defaults;
//   // Create a mutable copy to avoid modifying the original object
//   const safeProgram = { ...program };

//   const defaultLocalizedString: LocalizedString = { 
//     es: 'Información no disponible', 
//     en: 'Information not available', 
//     ar: 'المعلومات غير متوفرة' 
//   };
  
//   // Ensure all LocalizedString fields and other critical properties have a default structure
//   safeProgram.name = safeProgram.name ?? { ...defaultLocalizedString, es: "Viaje Personalizado", en: "Custom Trip", ar: "رحلة مخصصة" };
//   safeProgram.briefDescription = safeProgram.briefDescription ?? defaultLocalizedString;
//   safeProgram.generalDescription = safeProgram.generalDescription ?? defaultLocalizedString;
//   safeProgram.startCity = safeProgram.startCity ?? { es: 'El Cairo', en: 'Cairo', ar: 'القاهرة' };
//   safeProgram.icon = safeProgram.icon ?? "🗺️";
//   safeProgram.duration = safeProgram.duration ?? { days: 0, nights: 0 };
  
//   // Ensure arrays and other objects have defaults
//   safeProgram.servicesIncluded = safeProgram.servicesIncluded ?? def?.servicesIncluded ?? {es:[],en:[],ar:[]};
//   safeProgram.servicesExcluded = safeProgram.servicesExcluded ?? def?.servicesExcluded ?? {es:[],en:[],ar:[]};
//   safeProgram.importantNotes = safeProgram.importantNotes ?? def?.importantNotes ?? {es:[],en:[],ar:[]};
//   safeProgram.categories = safeProgram.categories?.length ? safeProgram.categories : ['gold'];
//   safeProgram.accommodations = safeProgram.accommodations ?? { gold: [], diamond: [] };

//   return safeProgram;
// }





import type { Program, ItineraryItem, CustomQuoteParams, SupportedSite, SupportedCity, LocalizedString } from '../types';
import { knowledgeBase } from './knowledgeBase';
import type { Language } from '../contexts/LanguageContext';
import { detectSeasonFromText, getCurrentSeason } from '../SeasonDetector';
import{IntelligentDataExtractor} from '../intelligentExtractor';


// 🔍 دالة للعثور على أفضل برنامج مطابق من البرامج العشرة
function findBestMatchingProgram(intent: { duration?: number; includeCruise?: boolean; destination?: string }): Program | null {
    const { duration = 8, includeCruise = false, destination } = intent;
    
    const scoredPrograms = knowledgeBase.packages.map(program => {
        let score = 0;
        
        // مطابقة المدة (40% من النقاط)
        const durationDiff = Math.abs(program.duration.days - duration);
        score += Math.max(0, 40 - (durationDiff * 5));
        
        // مطابقة الكروز (30% من النقاط)
        if (includeCruise && program.cruiseNights && program.cruiseNights > 0) {
            score += 30;
        } else if (!includeCruise && (!program.cruiseNights || program.cruiseNights === 0)) {
            score += 30;
        }
        
        // مطابقة الوجهة (30% من النقاط)
        if (destination) {
            const programDestinations = getProgramDestinations(program);
            if (programDestinations.some(dest => destination.toLowerCase().includes(dest.toLowerCase()))) {
                score += 30;
            }
        }
        
        return { program, score };
    });
    
    scoredPrograms.sort((a, b) => b.score - a.score);
    return scoredPrograms[0]?.score >= 50 ? scoredPrograms[0].program : null;
}

function getProgramDestinations(program: Program): string[] {
    const destinations = new Set<string>();
    const description = program.generalDescription.en.toLowerCase() + ' ' + program.briefDescription.en.toLowerCase();
    
    if (description.includes('cairo') || description.includes('el cairo')) destinations.add('cairo');
    if (description.includes('luxor')) destinations.add('luxor');
    if (description.includes('aswan') || description.includes('asuan')) destinations.add('aswan');
    if (description.includes('alexandria')) destinations.add('alexandria');
    if (description.includes('abu simbel')) destinations.add('abu simbel');
    if (description.includes('red sea') || description.includes('hurghada')) destinations.add('red sea');
    if (description.includes('siwa')) destinations.add('siwa');
    if (description.includes('matrouh')) destinations.add('matrouh');
    
    return Array.from(destinations);
}

// 🔧 دالة تكييف الـ Itinerary من البرنامج المطابق
function adaptItineraryFromProgram(sourceProgram: Program, targetDuration: number, intent: any): ItineraryItem[] {
    let sourceItinerary: ItineraryItem[] = [];
    
    if (sourceProgram.itineraryOptions && sourceProgram.itineraryOptions.length > 0) {
        sourceItinerary = sourceProgram.itineraryOptions[0].itinerary;
    } else if (sourceProgram.itinerary) {
        sourceItinerary = sourceProgram.itinerary;
    }
    
    if (sourceItinerary.length === 0) {
        return generateDefaultItinerary(intent);
    }
    
    const sourceDuration = sourceProgram.duration.days;
    
    if (targetDuration === sourceDuration) {
        return [...sourceItinerary];
    } else if (targetDuration < sourceDuration) {
        return sourceItinerary.slice(0, targetDuration - 1).concat(sourceItinerary[sourceItinerary.length - 1]);
    } else {
        const additionalDays = targetDuration - sourceDuration;
        const additionalItinerary: ItineraryItem[] = [];
        
        for (let i = 0; i < additionalDays; i++) {
            additionalItinerary.push({
                day: sourceDuration + i,
                title: { 
                    en: `Free Day in ${intent.destination?.includes('luxor') ? 'Luxor' : 'Cairo'}`,
                    es: `Día Libre en ${intent.destination?.includes('luxor') ? 'Luxor' : 'El Cairo'}`,
                    ar: `يوم حر في ${intent.destination?.includes('luxor') ? 'الأقصر' : 'القاهرة'}`
                },
                activities: {
                    en: ['Free time for personal exploration', 'Optional activities available'],
                    es: ['Tiempo libre para exploración personal', 'Actividades opcionales disponibles'],
                    ar: ['وقت حر للاستكشاف الشخصي', 'أنشطة اختيارية متاحة']
                }
            });
        }
        
        return [...sourceItinerary.slice(0, -1), ...additionalItinerary, sourceItinerary[sourceItinerary.length - 1]];
    }
}

// 📝 دالة إنشاء itinerary افتراضي
function generateDefaultItinerary(intent: any): ItineraryItem[] {
    const { duration = 8, includeCruise = false } = intent;
    const uiText = knowledgeBase.localizedStrings.ui[intent.lang] ?? knowledgeBase.localizedStrings.ui.es;
    
    const itineraryDays: ItineraryItem[] = [];
    let currentDay = 1;

    const addDay = (title: LocalizedString, activities: string | string[] | LocalizedString) => {
        const toArray = (val: any, key: keyof LocalizedString) => {
            if (Array.isArray(val)) return val;
            if (typeof val === 'object' && val !== null && val[key]) return [val[key]];
            if (typeof val === 'string') return [val];
            return [''];
        };

        const activitiesObj = {
            es: toArray(activities, 'es'),
            en: toArray(activities, 'en'),
            ar: toArray(activities, 'ar'),
        };

        itineraryDays.push({ day: currentDay++, title, activities: activitiesObj });
    };

    const getDayTitle = (lang: Language, dayNum: number, baseTitle: LocalizedString): LocalizedString => {
        return {
            es: `${baseTitle.es}`,
            en: `${baseTitle.en}`,
            ar: `${baseTitle.ar}`
        };
    };

    // Arrival day
    addDay(
        getDayTitle(intent.lang, currentDay, uiText.fallbackDayTitles.arrival),
        uiText.fallbackDayActivities.arrival[intent.lang]
    );

    // Middle days
    for (let i = 0; i < duration - 2; i++) {
        const cairoActivity = uiText.fallbackDayActivities.cairoFreeDay[intent.lang];
        const activityText = Array.isArray(cairoActivity)
            ? cairoActivity.map(a =>
                a.replace('{suggestions}', uiText.optionalToursByCity.cairo[intent.lang])
            )
            : cairoActivity.replace('{suggestions}', uiText.optionalToursByCity.cairo[intent.lang]);

        addDay(
            getDayTitle(intent.lang, currentDay, uiText.fallbackDayTitles.cairoTour),
            activityText
        );
    }

    // Departure day
    addDay(
        getDayTitle(intent.lang, currentDay, uiText.fallbackDayTitles.departure),
        uiText.fallbackDayActivities.departure[intent.lang]
    );

    return itineraryDays;
}

// 🎯 الدالة الرئيسية المحسنة - الحل النهائي
// export function generateLocalFallbackProgram(userText: string, lang: Language): Program {
//     const t = userText.toLowerCase();
//     const uiText = knowledgeBase.localizedStrings.ui[lang] ?? knowledgeBase.localizedStrings.ui.es;
    
//     // ✅ 1. استخراج المدة بشكل صحيح مع معالجة جميع الحالات
//     const daysMatch = t.match(/(\d+)\s*(days?|d[iíì]as|ايام|يوم)/i);
//     const nightsMatch = t.match(/(\d+)\s*(nights?|noches?|ليال(?:ي)?)/i);

//     let duration: number;
//     let totalNights: number;

//     // ✅ الحل الصحيح: نعطي أولوية للـ nights ثم الـ days
//     if (nightsMatch) {
//         totalNights = parseInt(nightsMatch[1], 10);
//         duration = totalNights + 1;
//         console.log(`[fallback] Detected from nights: ${totalNights} nights = ${duration} days`);
//     } else if (daysMatch) {
//         duration = parseInt(daysMatch[1], 10);
//         totalNights = duration - 1;
//         console.log(`[fallback] Detected from days: ${duration} days = ${totalNights} nights`);
//     } else {
//         // فقط إذا لم يكن هناك أي رقم، نستخدم القيمة الافتراضية
//         duration = 8;
//         totalNights = 7;
//         console.log(`[fallback] No duration found, using default: ${duration} days`);
//     }

//     // ✅ 2. التحقق من المدة المعقولة (بدون تغيير القيمة الأصلية إلا للضرورة)
//     if (duration < 3) {
//         console.warn(`[fallback] Duration ${duration} too short, adjusting to 4 days`);
//         duration = 4;
//         totalNights = 3;
//     } else if (duration > 20) {
//         console.warn(`[fallback] Duration ${duration} too long, adjusting to 15 days`);
//         duration = 15;
//         totalNights = 14;
//     }

//     console.log(`[fallback] FINAL DURATION: ${duration} days, ${totalNights} nights`);
  
//     const travelers = +(t.match(/(\d+)\s*(pax|personas|persons|اشخاص|أشخاص|افراد)/)?.[1] ?? 2);
    
//     // ✅ 3. حساب ليالي الكروز بشكل ذكي
//     const includeCruise = /cruise|crucero|كروز|نيل|nile/i.test(t);
    
//     const calculateNightsDistribution = (dur: number, hasCruise: boolean) => {
//         const nights = dur - 1;
        
//         if (hasCruise) {
//             if (dur >= 8) {
//                 return { cruiseNights: 4, cairoNights: nights - 4 };
//             } else if (dur >= 5) {
//                 return { cruiseNights: 3, cairoNights: nights - 3 };
//             } else {
//                 return { cruiseNights: Math.max(1, nights - 2), cairoNights: nights - Math.max(1, nights - 2) };
//             }
//         } else {
//             return { cruiseNights: 0, cairoNights: nights };
//         }
//     };

//     const { cruiseNights, cairoNights } = calculateNightsDistribution(duration, includeCruise);
//     console.log(`[fallback] Distribution: ${cairoNights} Cairo nights, ${cruiseNights} cruise nights`);
    
//     // 4. تحديد الموسم والفئة
//     const season = /oct|nov|dec|jan|feb|mar|apr|اكتوبر|أكتوبر|نوفمبر|ديسمبر|يناير|فبراير|مارس|أبريل/i.test(t) ? "winter" : "summer";
//     const category = /diam/i.test(t) ? "diamond" : "gold";

//     // 5. استخراج الوجهة
//     let destination = '';
//     if (t.includes('cairo') || t.includes('el cairo') || t.includes('القاهرة')) destination = 'cairo';
//     if (t.includes('luxor') || t.includes('الأقصر')) destination = 'luxor';
//     if (t.includes('aswan') || t.includes('أسوان')) destination = 'aswan';
//     if (t.includes('alexandria') || t.includes('الإسكندرية')) destination = 'alexandria';
//     if (t.includes('abu simbel') || t.includes('أبو سمبل')) destination = 'abu simbel';
//     if (t.includes('red sea') || t.includes('hurghada') || t.includes('البحر الأحمر')) destination = 'red sea';

//     // 6. كشف المواقع
//     const siteKeywords: { [key: string]: SupportedSite } = {
//         'pyramids': 'gizaPyramidsAndSphinx', 'pirámides': 'gizaPyramidsAndSphinx',
//         'sphinx': 'gizaPyramidsAndSphinx', 'esfinge': 'gizaPyramidsAndSphinx',
//         'museum': 'egyptianMuseum', 'museo': 'egyptianMuseum', 'khan el khalili': 'khanElKhalili',
//         'karnak': 'karnakTemple', 'luxor temple': 'luxorTemple', 'valley of the kings': 'valleyOfTheKings',
//         'hatshepsut': 'hatshepsutTemple', 'abu simbel': 'abuSimbelTemples',
//     };
//     const detectedSites = [...new Set(Object.keys(siteKeywords).filter(k => t.includes(k)).map(k => siteKeywords[k]))];

//     // 7. البحث عن أفضل برنامج مطابق وإنشاء الـ Itinerary
//     const intent = { duration, includeCruise, destination, lang };
//     const bestMatch = findBestMatchingProgram(intent);
    
//     let itineraryDays: ItineraryItem[] = [];
//     let programName = { en: '', es: '', ar: '' };
//     let briefDesc = { en: '', es: '', ar: '' };
//     let generalDesc = { en: '', es: '', ar: '' };

//     if (bestMatch) {
//         itineraryDays = adaptItineraryFromProgram(bestMatch, duration, intent);
        
//         programName = {
//             en: `Custom ${duration}-Day ${bestMatch.name.en}`,
//             es: `${bestMatch.name.es} Personalizado de ${duration} Días`,
//             ar: `${bestMatch.name.ar} مخصص لمدة ${duration} أيام`
//         };
        
//         briefDesc = {
//             en: `A tailored ${duration}-day version of ${bestMatch.name.en} - ${bestMatch.briefDescription.en}`,
//             es: `Una versión personalizada de ${duration} días de ${bestMatch.name.es} - ${bestMatch.briefDescription.es}`,
//             ar: `نسخة مخصصة لمدة ${duration} أيام من ${bestMatch.name.ar} - ${bestMatch.briefDescription.ar}`
//         };
        
//         generalDesc = {
//             en: `This custom ${duration}-day itinerary is based on our popular ${bestMatch.name.en} program. ${bestMatch.generalDescription.en}`,
//             es: `Este itinerario personalizado de ${duration} días se basa en nuestro popular programa ${bestMatch.name.es}. ${bestMatch.generalDescription.es}`,
//             ar: `هذا المسار المخصص لمدة ${duration} أيام يستند إلى برنامجنا الشهير ${bestMatch.name.ar}. ${bestMatch.generalDescription.ar}`
//         };
//     } else {
//         itineraryDays = generateDefaultItinerary(intent);
        
//         programName = {
//             es: uiText.customQuoteTitle.replace('{duration}', duration.toString()),
//             en: `Custom ${duration}-Day Egypt Journey`,
//             ar: `رحلة مخصصة لمدة ${duration} أيام في مصر`,
//         };
        
//         briefDesc = {
//             es: `Un viaje a medida de ${totalNights} noches, incluyendo ${cairoNights} noches en El Cairo ${cruiseNights > 0 ? `y ${cruiseNights} noches en un crucero por el Nilo` : ''}.`,
//             en: `A custom ${totalNights}-night journey, including ${cairoNights} nights in Cairo ${cruiseNights > 0 ? `and ${cruiseNights} nights on a Nile cruise` : ''}.`,
//             ar: `رحلة مخصصة لمدة ${totalNights} ليلة، تشمل ${cairoNights} ليالي في القاهرة ${cruiseNights > 0 ? `و ${cruiseNights} ليالي في رحلة نيلية` : ''}.`
//         };
        
//         generalDesc = {
//             es: `Este es un itinerario diseñado especialmente para ti, basado en tu solicitud de ${duration} días. Explora las maravillas de Egipto, desde la majestuosidad de El Cairo ${cruiseNights > 0 ? 'hasta la serenidad de un crucero por el Nilo.' : '.'} Cada detalle ha sido considerado para crear una experiencia inolvidable.`,
//             en: `This is an itinerary specially designed for you, based on your request for ${duration} days. Explore the wonders of Egypt, from the majesty of Cairo ${cruiseNights > 0 ? 'to the serenity of a Nile cruise.' : '.'} Every detail has been considered to create an unforgettable experience.`,
//             ar: `هذا خط سير مصمم خصيصًا لك، بناءً على طلبك لمدة ${duration} يومًا. استكشف عجائب مصر، من عظمة القاهرة ${cruiseNights > 0 ? 'إلى هدوء رحلة نيلية.' : '.'} تم أخذ كل التفاصيل في الاعتبار لخلق تجربة لا تُنسى.`
//         };
//     }

//     // 8. بناء Quote Params
//     const nightsObject: Partial<Record<SupportedCity, number>> = {};
//     if (cairoNights > 0) nightsObject.cairo = cairoNights;
//     if (cruiseNights > 0) nightsObject.cruise = cruiseNights;
  
//     const quoteParams: CustomQuoteParams = {
//         travelers, 
//         duration, // ✅ استخدام المدة الصحيحة
//         season, 
//         category, 
//         itineraryPlan: {
//             nights: nightsObject,
//             sites: detectedSites,
//             flightSectors: cruiseNights > 0 ? 2 : 0,
//         }
//     };

//     // 9. إنشاء الخدمات المضمنة
//     const catKey = category === 'gold' ? 'Gold' : 'Diamond';
//     const dynamicIncluded: Record<Language, string[]> = { es: [], en: [], ar: [] };
    
//     const langHotelDefs = knowledgeBase.definitions.accommodations[catKey];

//     if (cairoNights > 0) {
//         const hotel = langHotelDefs["El Cairo"];
//         (Object.keys(dynamicIncluded) as Language[]).forEach(l => {
//              dynamicIncluded[l].push(uiText.serviceStrings.accommodation[l]
//                 .replace('{nights}', cairoNights.toString())
//                 .replace('{city}', 'El Cairo')
//                 .replace('{hotel}', hotel)
//                 .replace('{board}', uiText.serviceStrings.breakfastBoard[l]));
//         });
//     }
//     if (cruiseNights > 0) {
//         const hotel = langHotelDefs["Crucero por el Nilo"];
//          (Object.keys(dynamicIncluded) as Language[]).forEach(l => {
//             dynamicIncluded[l].push(uiText.serviceStrings.accommodation[l]
//                 .replace('{nights}', cruiseNights.toString())
//                 .replace('{city}', 'Crucero por el Nilo')
//                 .replace('{hotel}', hotel)
//                 .replace('{board}', uiText.serviceStrings.fullBoard[l]));
//             dynamicIncluded[l].push(uiText.serviceStrings.domesticFlights[l]);
//         });
//     }
    
//     // 10. بناء الكائن النهائي للبرنامج
//     const program: Program = {
//         id: `custom-${Date.now()}`,
//         isCustom: true,
//         quoteParams: quoteParams,
//         name: programName,
//         icon: bestMatch?.icon || "🗺️",
//         duration: { days: duration, nights: totalNights }, // ✅ المدة الصحيحة
//         priceFrom: bestMatch?.priceFrom || 0,
//         categories: [category],
//         startCity: { es: "El Cairo", en: "Cairo", ar: "القاهرة" },
//         ...(cruiseNights > 0 && { cruiseNights }),
//         briefDescription: briefDesc,
//         generalDescription: generalDesc,
//         itinerary: itineraryDays,
//         accommodations: bestMatch?.accommodations || {
//             gold: [{ 
//                 city: {es:"El Cairo", en:"Cairo", ar: "القاهرة"}, 
//                 hotel: {
//                     es: knowledgeBase.definitions.accommodations.Gold["El Cairo"], 
//                     en: knowledgeBase.definitions.accommodations.Gold["El Cairo"], 
//                     ar: knowledgeBase.definitions.accommodations.Gold["El Cairo"]
//                 } 
//             }],
//             diamond: [{ 
//                 city: {es:"El Cairo", en:"Cairo", ar: "القاهرة"}, 
//                 hotel: {
//                     es: knowledgeBase.definitions.accommodations.Diamond["El Cairo"], 
//                     en: knowledgeBase.definitions.accommodations.Diamond["El Cairo"], 
//                     ar: knowledgeBase.definitions.accommodations.Diamond["El Cairo"]
//                 } 
//             }],
//         },
//         servicesIncluded: bestMatch?.servicesIncluded || {
//             es: [...dynamicIncluded.es, ...knowledgeBase.defaults.servicesIncluded.es],
//             en: [...dynamicIncluded.en, ...knowledgeBase.defaults.servicesIncluded.en],
//             ar: [...(dynamicIncluded.ar ?? []), ...(knowledgeBase.defaults.servicesIncluded.ar ?? [])]
//         },
//         servicesExcluded: bestMatch?.servicesExcluded || knowledgeBase.defaults.servicesExcluded,
//         importantNotes: bestMatch?.importantNotes || knowledgeBase.defaults.importantNotes,
//     };

//     console.log(`[fallback] Created program: ${program.name.en}, Duration: ${program.duration.days} days`);
//     return program;
// }


export function generateLocalFallbackProgram(
    userInput: string,
    language: Language
): Program {
    console.log('[fallback] Generating local fallback program from:', userInput);
    
    // استخراج المدة
    const daysMatch = userInput.match(/(\d+)\s*(days?|d[iíì]as|ايام|يوم)/i);
    const nightsMatch = userInput.match(/(\d+)\s*(nights?|noches?|ليال(?:ي)?)/i);
    const durationPattern = /duration:\s*(\d+)\s*days?/i;
    const durationMatch = userInput.match(durationPattern);
    
    let duration = 7; // افتراضي
    if (durationMatch) {
        duration = parseInt(durationMatch[1], 10);
    } else if (daysMatch) {
        duration = parseInt(daysMatch[1], 10);
    } else if (nightsMatch) {
        duration = parseInt(nightsMatch[1], 10) + 1;
    }
    
    console.log('[fallback] Duration extracted:', duration);
    
    // 🆕 استخراج الموسم بذكاء (من الشهر أو الكلمة المباشرة)
    const detectedSeason = detectSeasonFromText(userInput);
    const season: 'summer' | 'winter' = detectedSeason || getCurrentSeason();
    
    console.log('[fallback] Season detected:', season);
    if (detectedSeason) {
        console.log('[fallback] ✅ Season explicitly mentioned or derived from month');
    } else {
        console.log('[fallback] ℹ️ Using current season as default');
    }
    
    // استخراج عدد المسافرين
    const travelersMatch = userInput.match(/(\d+)\s*(people|person|travelers|viajeros|personas|اشخاص|مسافر)/i);
    const travelers = travelersMatch ? parseInt(travelersMatch[1], 10) : 2;
    
    console.log('[fallback] Travelers:', travelers);
    
    // استخراج الفئة
    const categoryMatch = userInput.match(/(gold|diamond|ذهبي|الماسي|oro|diamante)/i);
    let category: 'gold' | 'diamond' = 'gold';
    if (categoryMatch) {
        const catText = categoryMatch[1].toLowerCase();
        category = (catText.includes('diamond') || catText.includes('الماسي') || catText.includes('diamante')) 
            ? 'diamond' 
            : 'gold';
    }
    
    console.log('[fallback] Category:', category);
    
    // استخراج الوجهات
    const destinations: string[] = ['cairo'];
    if (/cruise|crucero|كروز|nile|نيل/i.test(userInput)) {
        destinations.push('cruise');
    }
    if (/luxor|الأقصر|الاقصر/i.test(userInput)) {
        destinations.push('luxor');
    }
    if (/aswan|أسوان|اسوان/i.test(userInput)) {
        destinations.push('aswan');
    }
    if (/alexandria|alejandría|الإسكندرية|الاسكندرية/i.test(userInput)) {
        destinations.push('alexandria');
    }
    
    console.log('[fallback] Destinations:', destinations);
    
    // استخدام النظام الذكي لإنشاء البرنامج
    const extractor = new IntelligentDataExtractor();
    const customProgram = extractor.createCustomProgram({
        duration,
        travelers,
        destinations,
        season,  // ✅ الآن يدعم الكشف من الشهر
        category,
        language
    });
    
    console.log('[fallback] ✅ Custom program created');
    return customProgram;
}

export function withDisplayDefaults(program: Program): Program {
  const def = knowledgeBase.defaults;
  const safeProgram = { ...program };

  const defaultLocalizedString: LocalizedString = { 
    es: 'Información no disponible', 
    en: 'Information not available', 
    ar: 'المعلومات غير متوفرة' 
  };
  
  safeProgram.name = safeProgram.name ?? { ...defaultLocalizedString, es: "Viaje Personalizado", en: "Custom Trip", ar: "رحلة مخصصة" };
  safeProgram.briefDescription = safeProgram.briefDescription ?? defaultLocalizedString;
  safeProgram.generalDescription = safeProgram.generalDescription ?? defaultLocalizedString;
  safeProgram.startCity = safeProgram.startCity ?? { es: 'El Cairo', en: 'Cairo', ar: 'القاهرة' };
  safeProgram.icon = safeProgram.icon ?? "🗺️";
  safeProgram.duration = safeProgram.duration ?? { days: 0, nights: 0 };
  
  safeProgram.servicesIncluded = safeProgram.servicesIncluded ?? def?.servicesIncluded ?? {es:[],en:[],ar:[]};
  safeProgram.servicesExcluded = safeProgram.servicesExcluded ?? def?.servicesExcluded ?? {es:[],en:[],ar:[]};
  safeProgram.importantNotes = safeProgram.importantNotes ?? def?.importantNotes ?? {es:[],en:[],ar:[]};
  safeProgram.categories = safeProgram.categories?.length ? safeProgram.categories : ['gold'];
  safeProgram.accommodations = safeProgram.accommodations ?? { gold: [], diamond: [] };

  return safeProgram;
}
