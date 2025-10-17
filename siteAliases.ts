// import type { SupportedSite } from '../types';
// import { knowledgeBase } from './knowledgeBase';

// // Centralized alias map to normalize site keys from the AI.
// export const SITE_ALIASES: Partial<Record<string, SupportedSite>> = {
//   egyptianMuseumCairo: "egyptianMuseum",
//   citadelAndAlabasterMosque: "citadelAndAlabasterMosque",
//   AndAlabasterMosque: "citadelAndAlabasterMosque",
//   komOmboTemple: "komOmboTemple",
//   edfuTemple: "edfuTemple",
//   grandEgyptianMuseum: "grandEgyptianMuseum",
// };

// // Function to normalize a single site key
// export const normalizeSiteKey = (key: string): SupportedSite => {
//     if (!key) return key as SupportedSite;
//     // Handle potential casing issues from AI
//     const firstCharLower = key.charAt(0).toLowerCase() + key.slice(1);
    
//     // Check direct match, alias match, or lower-cased alias match
//     const normalizedKey = SITE_ALIASES[key] || SITE_ALIASES[firstCharLower] || firstCharLower as SupportedSite;

//     // Add a warning for unknown sites that won't be priced.
//     // We check existence in the official tickets list.
//     if (!knowledgeBase.internalCosts.tickets[normalizedKey as SupportedSite]) {
//         console.warn(`Unknown site key detected after normalization: "${key}" -> "${normalizedKey}". It will not be priced.`);
//     }

//     return normalizedKey;
// };


import type { SupportedSite } from '../types';
import { knowledgeBase } from './knowledgeBase';

// Centralized alias map to normalize site keys from the AI.
export const SITE_ALIASES: Partial<Record<string, SupportedSite>> = {
  // القاهرة والجيزة
  'egyptianMuseumCairo': 'egyptianMuseum',
  'egyptian museum': 'egyptianMuseum',
  'museum of egyptian antiquities': 'egyptianMuseum',
  'متحف المصري': 'egyptianMuseum',
  
  'citadelAndAlabasterMosque': 'citadelOfSaladin',
  'citadel of saladin': 'citadelOfSaladin',
  'alabaster mosque': 'citadelOfSaladin',
  'مسجد محمد علي': 'citadelOfSaladin',
  'القلعة': 'citadelOfSaladin',
  
  'andAlabasterMosque': 'citadelOfSaladin',
  
  'sultan hassan mosque': 'sultanHassanMosque',
  'مسجد السلطان حسن': 'sultanHassanMosque',
  
  'khan el khalili': 'khanElKhalili',
  'خان الخليلي': 'khanElKhalili',
  'khan alkhalili': 'khanElKhalili',
  
  'giza pyramids': 'gizaPyramids',
  'pyramids of giza': 'gizaPyramids',
  'giza plateau': 'gizaPyramids',
  'أهرام الجيزة': 'gizaPyramids',
  
  'great sphinx': 'gizaPyramidsAndSphinx',
  'sphinx': 'gizaPyramidsAndSphinx',
  'أبو الهول': 'gizaPyramidsAndSphinx',
  
  'great pyramid of khufu': 'pyramidOfKhufu',
  'pyramid of cheops': 'pyramidOfKhufu',
  'خوفو': 'pyramidOfKhufu',
  
  'pyramid of khafre': 'pyramidOfKhafre',
  'pyramid of chephren': 'pyramidOfKhafre',
  'خفرع': 'pyramidOfKhafre',
  
  'pyramid of menkaure': 'pyramidOfMenkaure',
  'pyramid of mycerinus': 'pyramidOfMenkaure',
  'منقرع': 'pyramidOfMenkaure',
  
  'saqqara': 'saqqaraZone',
  'sakkara': 'saqqaraZone',
  'سقارة': 'saqqaraZone',
  
  'step pyramid': 'stepPyramidOfDjoser',
  'pyramid of djoser': 'stepPyramidOfDjoser',
  'هرم زوسر': 'stepPyramidOfDjoser',
  
  'grand egyptian museum': 'grandEgyptianMuseum',
  'gem': 'grandEgyptianMuseum',
  'المتحف المصري الكبير': 'grandEgyptianMuseum',
  
  'national museum of egyptian civilization': 'egyptianCivilizationMuseum',
  'nmec': 'egyptianCivilizationMuseum',
  'متحف الحضارة': 'egyptianCivilizationMuseum',

  // الإسكندرية
  'citadel of qaitbay': 'qaitbayCitadel',
  'قلعة قايتباي': 'qaitbayCitadel',
  
  'catacombs of kom el shoqafa': 'komElShogafaCatacombs',
  'catacombs': 'komElShogafaCatacombs',
  'مقابر كوم الشقافة': 'komElShogafaCatacombs',
  
  'roman theater': 'komElDikka',
  'المسرح الروماني': 'komElDikka',

  // الأقصر
  'temple of karnak': 'karnakTemple',
  'karnak': 'karnakTemple',
  'معبد الكرنك': 'karnakTemple',
  
  'temple of luxor': 'luxorTemple',
  'luxor temple': 'luxorTemple',
  'معبد الأقصر': 'luxorTemple',
  
  'valley of kings': 'valleyOfTheKings',
  'valley of the king': 'valleyOfTheKings',
  'وادي الملوك': 'valleyOfTheKings',
  
  'temple of hatshepsut': 'hatshepsutTemple',
  'deir el bahari': 'hatshepsutTemple',
  'معبد حتشبسوت': 'hatshepsutTemple',
  
  'valley of queens': 'valleyOfTheQueens',
  'وادي الملكات': 'valleyOfTheQueens',
  
  'tomb of tutankhamun': 'carterHouse',
  'توت عنخ آمون': 'carterHouse',
  
  'tomb of nefertari': 'tombOfNefertari',
  'مقبرة نفرتاري': 'tombOfNefertari',
  
  'tomb of seti I': 'tombOfSetiI',
  'مقبرة سيتي الأول': 'tombOfSetiI',
  
  'tomb of ramses VI': 'tombOfRamsesVI',
  'مقبرة رمسيس السادس': 'tombOfRamsesVI',

  // أسوان
  'philae': 'philaeTemple',
  'temple of philae': 'philaeTemple',
  'معبد فيلة': 'philaeTemple',
  
  'temple of edfu': 'edfuTemple',
  'معبد إدفو': 'edfuTemple',
  
  'kom ombo': 'komOmboTemple',
  'temple of kom ombo': 'komOmboTemple',
  'معبد كوم امبو': 'komOmboTemple',
  
  'abu simbel': 'abuSimbelTemples',
  'temple of abu simbel': 'abuSimbelTemples',
  'أبو سمبل': 'abuSimbelTemples',
  
  'high dam': 'highDam',
  'aswan high dam': 'highDam',
  'السد العالي': 'highDam',
  
  'unfinished obelisk': 'unfinishedObelisk',
  'المسلة الناقصة': 'unfinishedObelisk',

  // المعابد الأخرى
  'temple of dendera': 'denderaTemple',
  'dendera': 'denderaTemple',
  'معبد دندرة': 'denderaTemple',
  
  'temple of abydos': 'abydosTemple',
  'abydos': 'abydosTemple',
  'معبد أبيدوس': 'abydosTemple',

  'al muizz street': 'alMuizzStreet',
  'شارع المعز': 'alMuizzStreet',
  
  'manial palace': 'manialPalace',
  
  'nilometer': 'nilometer',
  'مقياس النيل': 'nilometer',
  
  'coptic museum': 'copticMuseum',
  'المتحف القبطي': 'copticMuseum',
  
  'islamic art museum': 'islamicArtMuseum',
  'متحف الفن الإسلامي': 'islamicArtMuseum',
  
  'nubian museum': 'nubianMuseum',
  'المتحف النوبي': 'nubianMuseum',
  
  'luxor museum': 'luxorMuseum',
  'متحف الأقصر': 'luxorMuseum',
  
  'mummification museum': 'mummificationMuseum',
  'متحف التحنيط': 'mummificationMuseum',

  'pyramids': 'gizaPyramids',
  'الاهرام': 'gizaPyramids',
  'sakkara pyramid': 'stepPyramidOfDjoser',
  'dashur': 'dahshurZone',
  'دهشور': 'dahshurZone',
  'memphis city': 'memphis',
  'منف': 'memphis',
  'alexandria library': 'alexandriaNationalMuseum',
  'مكتبة الإسكندرية': 'alexandriaNationalMuseum',
  'colossi of memnon': 'valleyOfTheKings',
  'تمثالي ممنون': 'valleyOfTheKings',
  'deir el medina tombs': 'deirElMedina',
  'دير المدينة': 'deirElMedina',
  'ramesseum': 'ramesseumTemple',
  'الرمسيوم': 'ramesseumTemple',
  'medinet habu': 'ramesseumTemple',
  'ميدنة هابو': 'ramesseumTemple',
  'temple of esna': 'esnaTemple',
  'معبد إسنا': 'esnaTemple',
  'kalabsha': 'kalabshaTemple',
  'معبد كلابشة': 'kalabshaTemple',
  'qubbet el hawa tombs': 'qubbetElHawa',
  'قبة الهوا': 'qubbetElHawa'
};

// Function to normalize a single site key
export const normalizeSiteKey = (key: string): SupportedSite => {
    if (!key) return key as SupportedSite;
    
    // تنظيف النص: إزالة المسافات الزائدة وتحويل لحروف صغيرة
    const cleanedKey = key.trim().toLowerCase();
    
    // البحث في المرادفات أولاً
    const aliasedKey = SITE_ALIASES[cleanedKey];
    if (aliasedKey) {
        return aliasedKey;
    }
    
    // إذا لم يوجد في المرادفات، حاول مطابقة مباشرة مع معرفات النظام
    const directMatch = cleanedKey as SupportedSite;
    
    // تحقق إذا كان الموقع معروفاً في قاعدة المعرفة
    if (!knowledgeBase.internalCosts.tickets[directMatch]) {
        console.warn(`Unknown site key detected: "${key}" -> "${directMatch}". It will not be priced.`);
    }

    return directMatch;
};