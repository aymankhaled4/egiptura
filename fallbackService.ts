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
    
    // 🆕 استخراج تفاصيل الكروز
    let cruiseNights: 3 | 4 | undefined = undefined;
    let cruiseDirection: 'luxor-aswan' | 'aswan-luxor' | undefined = undefined;
    
    const hasCruise = destinations.includes('cruise') || 
                      (destinations.includes('luxor') && destinations.includes('aswan'));
    
    if (hasCruise) {
        // تحديد عدد ليالي الكروز
        if (/3\s*(?:nights?|noches?|ليال(?:ي)?)\s*cruise/i.test(userInput)) {
            cruiseNights = 3;
        } else if (/4\s*(?:nights?|noches?|ليال(?:ي)?)\s*cruise/i.test(userInput)) {
            cruiseNights = 4;
        } else {
            // افتراضي: 4 ليالي
            cruiseNights = 4;
        }
        
        // تحديد الاتجاه
        if (/aswan\s*to\s*luxor|اسوان\s*الى\s*الاقصر|asuán\s*a\s*luxor/i.test(userInput)) {
            cruiseDirection = 'aswan-luxor';
            if (cruiseNights === 4) cruiseNights = 3; // 3 ليالي من أسوان
        } else if (/luxor\s*to\s*aswan|الاقصر\s*الى\s*اسوان|luxor\s*a\s*asuán/i.test(userInput)) {
            cruiseDirection = 'luxor-aswan';
            if (cruiseNights === 3) cruiseNights = 4; // 4 ليالي من الأقصر
        } else {
            // افتراضي: من الأقصر لأسوان (4 ليالي)
            cruiseDirection = 'luxor-aswan';
        }
        
        console.log('[fallback] Cruise details:', { cruiseNights, cruiseDirection });
    }
    
    // استخدام النظام الذكي لإنشاء البرنامج
    const extractor = new IntelligentDataExtractor();
    const customProgram = extractor.createIntelligentCustomProgram({
        duration,
        travelers,
        destinations,
        season,  // ✅ الآن يدعم الكشف من الشهر
        category,
        language,
        cruiseNights,  // ✅ دعم اختيار نوع الكروز
        cruiseDirection  // ✅ دعم اتجاه الكروز
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
