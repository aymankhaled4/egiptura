// // import type { SupportedSite } from '../types';
// // import { knowledgeBase } from './knowledgeBase';

// // // Centralized alias map to normalize site keys from the AI.
// // export const SITE_ALIASES: Partial<Record<string, SupportedSite>> = {
// //   egyptianMuseumCairo: "egyptianMuseum",
// //   citadelAndAlabasterMosque: "citadelAndAlabasterMosque",
// //   AndAlabasterMosque: "citadelAndAlabasterMosque",
// //   komOmboTemple: "komOmboTemple",
// //   edfuTemple: "edfuTemple",
// //   grandEgyptianMuseum: "grandEgyptianMuseum",
// // };

// // // Function to normalize a single site key
// // export const normalizeSiteKey = (key: string): SupportedSite => {
// //     if (!key) return key as SupportedSite;
// //     // Handle potential casing issues from AI
// //     const firstCharLower = key.charAt(0).toLowerCase() + key.slice(1);
    
// //     // Check direct match, alias match, or lower-cased alias match
// //     const normalizedKey = SITE_ALIASES[key] || SITE_ALIASES[firstCharLower] || firstCharLower as SupportedSite;

// //     // Add a warning for unknown sites that won't be priced.
// //     // We check existence in the official tickets list.
// //     if (!knowledgeBase.internalCosts.tickets[normalizedKey as SupportedSite]) {
// //         console.warn(`Unknown site key detected after normalization: "${key}" -> "${normalizedKey}". It will not be priced.`);
// //     }

// //     return normalizedKey;
// // };


// import type { SupportedSite } from '../types';
// import { knowledgeBase } from './knowledgeBase';

// // Centralized alias map to normalize site keys from the AI.
// export const SITE_ALIASES: Partial<Record<string, SupportedSite>> = {
//   // القاهرة والجيزة
//   'egyptianMuseumCairo': 'egyptianMuseum',
//   'egyptian museum': 'egyptianMuseum',
//   'museum of egyptian antiquities': 'egyptianMuseum',
//   'متحف المصري': 'egyptianMuseum',
  
//   'citadelAndAlabasterMosque': 'citadelOfSaladin',
//   'citadel of saladin': 'citadelOfSaladin',
//   'alabaster mosque': 'citadelOfSaladin',
//   'مسجد محمد علي': 'citadelOfSaladin',
//   'القلعة': 'citadelOfSaladin',
  
//   'andAlabasterMosque': 'citadelOfSaladin',
  
//   'sultan hassan mosque': 'sultanHassanMosque',
//   'مسجد السلطان حسن': 'sultanHassanMosque',
  
//   'khan el khalili': 'khanElKhalili',
//   'خان الخليلي': 'khanElKhalili',
//   'khan alkhalili': 'khanElKhalili',
  
//   'giza pyramids': 'gizaPyramids',
//   'pyramids of giza': 'gizaPyramids',
//   'giza plateau': 'gizaPyramids',
//   'أهرام الجيزة': 'gizaPyramids',
  
//   'great sphinx': 'gizaPyramidsAndSphinx',
//   'sphinx': 'gizaPyramidsAndSphinx',
//   'أبو الهول': 'gizaPyramidsAndSphinx',
  
//   'great pyramid of khufu': 'pyramidOfKhufu',
//   'pyramid of cheops': 'pyramidOfKhufu',
//   'خوفو': 'pyramidOfKhufu',
  
//   'pyramid of khafre': 'pyramidOfKhafre',
//   'pyramid of chephren': 'pyramidOfKhafre',
//   'خفرع': 'pyramidOfKhafre',
  
//   'pyramid of menkaure': 'pyramidOfMenkaure',
//   'pyramid of mycerinus': 'pyramidOfMenkaure',
//   'منقرع': 'pyramidOfMenkaure',
  
//   'saqqara': 'saqqaraZone',
//   'sakkara': 'saqqaraZone',
//   'سقارة': 'saqqaraZone',
  
//   'step pyramid': 'stepPyramidOfDjoser',
//   'pyramid of djoser': 'stepPyramidOfDjoser',
//   'هرم زوسر': 'stepPyramidOfDjoser',
  
//   'grand egyptian museum': 'grandEgyptianMuseum',
//   'gem': 'grandEgyptianMuseum',
//   'المتحف المصري الكبير': 'grandEgyptianMuseum',
  
//   'national museum of egyptian civilization': 'egyptianCivilizationMuseum',
//   'nmec': 'egyptianCivilizationMuseum',
//   'متحف الحضارة': 'egyptianCivilizationMuseum',

//   // الإسكندرية
//   'citadel of qaitbay': 'qaitbayCitadel',
//   'قلعة قايتباي': 'qaitbayCitadel',
  
//   'catacombs of kom el shoqafa': 'komElShogafaCatacombs',
//   'catacombs': 'komElShogafaCatacombs',
//   'مقابر كوم الشقافة': 'komElShogafaCatacombs',
  
//   'roman theater': 'komElDikka',
//   'المسرح الروماني': 'komElDikka',

//   // الأقصر
//   'temple of karnak': 'karnakTemple',
//   'karnak': 'karnakTemple',
//   'معبد الكرنك': 'karnakTemple',
  
//   'temple of luxor': 'luxorTemple',
//   'luxor temple': 'luxorTemple',
//   'معبد الأقصر': 'luxorTemple',
  
//   'valley of kings': 'valleyOfTheKings',
//   'valley of the king': 'valleyOfTheKings',
//   'وادي الملوك': 'valleyOfTheKings',
  
//   'temple of hatshepsut': 'hatshepsutTemple',
//   'deir el bahari': 'hatshepsutTemple',
//   'معبد حتشبسوت': 'hatshepsutTemple',
  
//   'valley of queens': 'valleyOfTheQueens',
//   'وادي الملكات': 'valleyOfTheQueens',
  
//   'tomb of tutankhamun': 'carterHouse',
//   'توت عنخ آمون': 'carterHouse',
  
//   'tomb of nefertari': 'tombOfNefertari',
//   'مقبرة نفرتاري': 'tombOfNefertari',
  
//   'tomb of seti I': 'tombOfSetiI',
//   'مقبرة سيتي الأول': 'tombOfSetiI',
  
//   'tomb of ramses VI': 'tombOfRamsesVI',
//   'مقبرة رمسيس السادس': 'tombOfRamsesVI',

//   // أسوان
//   'philae': 'philaeTemple',
//   'temple of philae': 'philaeTemple',
//   'معبد فيلة': 'philaeTemple',
  
//   'temple of edfu': 'edfuTemple',
//   'معبد إدفو': 'edfuTemple',
  
//   'kom ombo': 'komOmboTemple',
//   'temple of kom ombo': 'komOmboTemple',
//   'معبد كوم امبو': 'komOmboTemple',
  
//   'abu simbel': 'abuSimbelTemples',
//   'temple of abu simbel': 'abuSimbelTemples',
//   'أبو سمبل': 'abuSimbelTemples',
  
//   'high dam': 'highDam',
//   'aswan high dam': 'highDam',
//   'السد العالي': 'highDam',
  
//   'unfinished obelisk': 'unfinishedObelisk',
//   'المسلة الناقصة': 'unfinishedObelisk',

//   // المعابد الأخرى
//   'temple of dendera': 'denderaTemple',
//   'dendera': 'denderaTemple',
//   'معبد دندرة': 'denderaTemple',
  
//   'temple of abydos': 'abydosTemple',
//   'abydos': 'abydosTemple',
//   'معبد أبيدوس': 'abydosTemple',

//   'al muizz street': 'alMuizzStreet',
//   'شارع المعز': 'alMuizzStreet',
  
//   'manial palace': 'manialPalace',
  
//   'nilometer': 'nilometer',
//   'مقياس النيل': 'nilometer',
  
//   'coptic museum': 'copticMuseum',
//   'المتحف القبطي': 'copticMuseum',
  
//   'islamic art museum': 'islamicArtMuseum',
//   'متحف الفن الإسلامي': 'islamicArtMuseum',
  
//   'nubian museum': 'nubianMuseum',
//   'المتحف النوبي': 'nubianMuseum',
  
//   'luxor museum': 'luxorMuseum',
//   'متحف الأقصر': 'luxorMuseum',
  
//   'mummification museum': 'mummificationMuseum',
//   'متحف التحنيط': 'mummificationMuseum',

//   'pyramids': 'gizaPyramids',
//   'الاهرام': 'gizaPyramids',
//   'sakkara pyramid': 'stepPyramidOfDjoser',
//   'dashur': 'dahshurZone',
//   'دهشور': 'dahshurZone',
//   'memphis city': 'memphis',
//   'منف': 'memphis',
//   'alexandria library': 'alexandriaNationalMuseum',
//   'مكتبة الإسكندرية': 'alexandriaNationalMuseum',
//   'colossi of memnon': 'valleyOfTheKings',
//   'تمثالي ممنون': 'valleyOfTheKings',
//   'deir el medina tombs': 'deirElMedina',
//   'دير المدينة': 'deirElMedina',
//   'ramesseum': 'ramesseumTemple',
//   'الرمسيوم': 'ramesseumTemple',
//   'medinet habu': 'ramesseumTemple',
//   'ميدنة هابو': 'ramesseumTemple',
//   'temple of esna': 'esnaTemple',
//   'معبد إسنا': 'esnaTemple',
//   'kalabsha': 'kalabshaTemple',
//   'معبد كلابشة': 'kalabshaTemple',
//   'qubbet el hawa tombs': 'qubbetElHawa',
//   'قبة الهوا': 'qubbetElHawa'
// };

// // Function to normalize a single site key
// export const normalizeSiteKey = (key: string): SupportedSite => {
//     if (!key) return key as SupportedSite;
    
//     // تنظيف النص: إزالة المسافات الزائدة وتحويل لحروف صغيرة
//     const cleanedKey = key.trim().toLowerCase();
    
//     // البحث في المرادفات أولاً
//     const aliasedKey = SITE_ALIASES[cleanedKey];
//     if (aliasedKey) {
//         return aliasedKey;
//     }
    
//     // إذا لم يوجد في المرادفات، حاول مطابقة مباشرة مع معرفات النظام
//     const directMatch = cleanedKey as SupportedSite;
    
//     // تحقق إذا كان الموقع معروفاً في قاعدة المعرفة
//     if (!knowledgeBase.internalCosts.tickets[directMatch]) {
//         console.warn(`Unknown site key detected: "${key}" -> "${directMatch}". It will not be priced.`);
//     }

//     return directMatch;
// };

import type { SupportedSite } from '../types';
import { knowledgeBase } from './knowledgeBase';

/**
 * ✅ خريطة كاملة لتحويل الأسماء المختلفة إلى الأسماء الرسمية في costs.ts
 * متطابقة 100% مع PDF وجداول الأسعار
 */
export const SITE_ALIASES: Partial<Record<string, SupportedSite>> = {
  
  // ==================== القاهرة والجيزة ====================
  
  // المتحف المصري
  'egyptian museum': 'egyptianMuseum',
  'egyptianmuseumcairo': 'egyptianMuseum',
  'museum of egyptian antiquities': 'egyptianMuseum',
  'متحف المصري': 'egyptianMuseum',
  'cairo museum': 'egyptianMuseum',
  
  // القلعة ومسجد محمد علي
  'citadel': 'citadelOfSaladin',
  'citadelandalabastermosque': 'citadelOfSaladin',
  'andalabastermosque': 'citadelOfSaladin',
  'citadel of saladin': 'citadelOfSaladin',
  'alabaster mosque': 'citadelOfSaladin',
  'mohamed ali mosque': 'citadelOfSaladin',
  'muhammad ali mosque': 'citadelOfSaladin',
  'مسجد محمد علي': 'citadelOfSaladin',
  'القلعة': 'citadelOfSaladin',
  
  // مسجد السلطان حسن
  'sultan hassan': 'sultanHassanMosque',
  'sultan hassan mosque': 'sultanHassanMosque',
  'مسجد السلطان حسن': 'sultanHassanMosque',
  
  // خان الخليلي
  'khan': 'khanElKhalili',
  'khan el khalili': 'khanElKhalili',
  'khan alkhalili': 'khanElKhalili',
  'خان الخليلي': 'khanElKhalili',
  'bazaar': 'khanElKhalili',
  
  // أهرام الجيزة
  'pyramids': 'gizaPyramidsAndSphinx',
  'giza pyramids': 'gizaPyramidsAndSphinx',
  'pyramids of giza': 'gizaPyramidsAndSphinx',
  'giza plateau': 'gizaPyramidsAndSphinx',
  'أهرام الجيزة': 'gizaPyramidsAndSphinx',
  'الاهرام': 'gizaPyramidsAndSphinx',
  'gizapyramids': 'gizaPyramidsAndSphinx',
  
  // أبو الهول
  'sphinx': 'gizaPyramidsAndSphinx',
  'great sphinx': 'gizaPyramidsAndSphinx',
  'أبو الهول': 'gizaPyramidsAndSphinx',
  
  // الهرم الأكبر
  'great pyramid': 'pyramidOfKeopsInterior',
  'pyramid of khufu': 'pyramidOfKeopsInterior',
  'pyramid of cheops': 'pyramidOfKeopsInterior',
  'khufu': 'pyramidOfKeopsInterior',
  'خوفو': 'pyramidOfKeopsInterior',
  
  // هرم خفرع
  'pyramid of khafre': 'pyramidOfKhafrenInterior',
  'pyramid of chephren': 'pyramidOfKhafrenInterior',
  'khafre': 'pyramidOfKhafrenInterior',
  'خفرع': 'pyramidOfKhafrenInterior',
  
  // هرم منقرع
  'pyramid of menkaure': 'pyramidOfMicerinoInterior',
  'pyramid of mycerinus': 'pyramidOfMicerinoInterior',
  'menkaure': 'pyramidOfMicerinoInterior',
  'منقرع': 'pyramidOfMicerinoInterior',
  
  // سقارة
  'sakkara': 'saqqara',
  'saqqarazone': 'saqqara',
  'سقارة': 'saqqara',
  'saqqara complex': 'saqqaraComplexAndImhotepMuseum',
  
  // هرم زوسر
  'step pyramid': 'stepPyramidOfZoser',
  'pyramid of djoser': 'stepPyramidOfZoser',
  'djoser': 'stepPyramidOfZoser',
  'zoser': 'stepPyramidOfZoser',
  'هرم زوسر': 'stepPyramidOfZoser',
  
  // دهشور
  'dahshur': 'dashurArchaeologicalZone',
  'dashur': 'dashurArchaeologicalZone',
  'dahshurzone': 'dashurArchaeologicalZone',
  'دهشور': 'dashurArchaeologicalZone',
  'bent pyramid': 'dashurArchaeologicalZone',
  'red pyramid': 'dashurArchaeologicalZone',
  
  // ممفيس
  'memphis': 'memphisMitRahina',
  'memphis city': 'memphisMitRahina',
  'mit rahina': 'memphisMitRahina',
  'منف': 'memphisMitRahina',
  
  // المتحف المصري الكبير
  'gem': 'grandEgyptianMuseum',
  'grand egyptian museum': 'grandEgyptianMuseum',
  'المتحف المصري الكبير': 'grandEgyptianMuseum',
  'grand museum': 'grandEgyptianMuseum',
  
  // متحف الحضارة
  'nmec': 'egyptianCivilizationMuseum',
  'national museum of egyptian civilization': 'egyptianCivilizationMuseum',
  'civilization museum': 'egyptianCivilizationMuseum',
  'متحف الحضارة': 'egyptianCivilizationMuseum',
  
  // المتحف القبطي
  'coptic': 'copticMuseum',
  'coptic museum': 'copticMuseum',
  'المتحف القبطي': 'copticMuseum',
  
  // متحف الفن الإسلامي
  'islamic museum': 'islamicArtMuseum',
  'islamic art museum': 'islamicArtMuseum',
  'متحف الفن الإسلامي': 'islamicArtMuseum',
  
  // شارع المعز
  'al muizz': 'alMuizzStreet',
  'al muizz street': 'alMuizzStreet',
  'moez street': 'alMuizzStreet',
  'شارع المعز': 'alMuizzStreet',
  
  // قصر المنيل
  'manial': 'manialPalace',
  'manial palace': 'manialPalace',
  'قصر المنيل': 'manialPalace',
  
  // مقياس النيل
  'nilometer': 'nilometer',
  'nile meter': 'nilometer',
  'مقياس النيل': 'nilometer',
  
  // ==================== الإسكندرية ====================
  
  // قلعة قايتباي
  'qaitbay': 'qaitbayCitadel',
  'citadel of qaitbay': 'qaitbayCitadel',
  'قلعة قايتباي': 'qaitbayCitadel',
  
  // مقابر كوم الشقافة
  'catacombs': 'komElShoqafaCatacombs',
  'catacombs of kom el shoqafa': 'komElShoqafaCatacombs',
  'kom el shoqafa': 'komElShoqafaCatacombs',
  'مقابر كوم الشقافة': 'komElShoqafaCatacombs',
  
  // المسرح الروماني
  'roman theater': 'komElDikkaRomanTheater',
  'kom el dikka': 'komElDikkaRomanTheater',
  'المسرح الروماني': 'komElDikkaRomanTheater',
  
  // عمود السواري
  'pompey pillar': 'pompeysPillar',
  'pompeys pillar': 'pompeysPillar',
  'عمود السواري': 'pompeysPillar',
  
  // متحف الإسكندرية
  'alexandria museum': 'alexandriaNationalMuseum',
  'alexandria national museum': 'alexandriaNationalMuseum',
  'متحف الإسكندرية': 'alexandriaNationalMuseum',
  
  // ==================== الأقصر ====================
  
  // معبد الكرنك
  'karnak': 'karnakTemple',
  'temple of karnak': 'karnakTemple',
  'معبد الكرنك': 'karnakTemple',
  'karnak temples': 'karnakTemple',
  
  // معبد الأقصر
  'luxor': 'luxorTemple',
  'temple of luxor': 'luxorTemple',
  'luxor temple': 'luxorTemple',
  'معبد الأقصر': 'luxorTemple',
  
  // وادي الملوك
  'valley of kings': 'valleyOfTheKings',
  'valley of the king': 'valleyOfTheKings',
  'kings valley': 'valleyOfTheKings',
  'وادي الملوك': 'valleyOfTheKings',
  
  // معبد حتشبسوت
  'hatshepsut': 'hatshepsutTemple',
  'temple of hatshepsut': 'hatshepsutTemple',
  'deir el bahari': 'hatshepsutTemple',
  'deir el bahri': 'hatshepsutTemple',
  'معبد حتشبسوت': 'hatshepsutTemple',
  
  // وادي الملكات
  'valley of queens': 'valleyOfTheQueens',
  'queens valley': 'valleyOfTheQueens',
  'وادي الملكات': 'valleyOfTheQueens',
  
  // مقبرة توت عنخ آمون
  'tutankhamun': 'carterHouse',
  'tomb of tutankhamun': 'carterHouse',
  'tut': 'carterHouse',
  'توت عنخ آمون': 'carterHouse',
  
  // مقبرة نفرتاري
  'nefertari': 'tombOfNefertari',
  'tomb of nefertari': 'tombOfNefertari',
  'مقبرة نفرتاري': 'tombOfNefertari',
  
  // مقبرة سيتي الأول
  'seti i': 'tombOfSetiI',
  'tomb of seti i': 'tombOfSetiI',
  'seti 1': 'tombOfSetiI',
  'مقبرة سيتي الأول': 'tombOfSetiI',
  
  // مقبرة رمسيس السادس
  'ramses vi': 'tombOfRamsesVI',
  'tomb of ramses vi': 'tombOfRamsesVI',
  'ramesses vi': 'tombOfRamsesVI',
  'مقبرة رمسيس السادس': 'tombOfRamsesVI',
  
  // دير المدينة
  'deir el medina': 'deirElMedina',
  'deir al medina': 'deirElMedina',
  'دير المدينة': 'deirElMedina',
  
  // الرمسيوم
  'ramesseum': 'ramesseumTemple',
  'temple of ramesseum': 'ramesseumTemple',
  'الرمسيوم': 'ramesseumTemple',
  
  // مدينة هابو
  'medinet habu': 'ramesseumTemple',
  'medinat habu': 'ramesseumTemple',
  'مدينة هابو': 'ramesseumTemple',
  
  // تماثيل ممنون
  'colossi of memnon': 'valleyOfTheKings',
  'memnon colossi': 'valleyOfTheKings',
  'تماثيل ممنون': 'valleyOfTheKings',
  
  // متحف الأقصر
  'luxor museum': 'luxorMuseum',
  'متحف الأقصر': 'luxorMuseum',
  
  // متحف التحنيط
  'mummification museum': 'mummificationMuseum',
  'متحف التحنيط': 'mummificationMuseum',
  
  // معبد إسنا
  'esna': 'esnaTemple',
  'temple of esna': 'esnaTemple',
  'معبد إسنا': 'esnaTemple',
  
  // ==================== أسوان ====================
  
  // معبد فيلة
  'philae': 'philaeTemple',
  'temple of philae': 'philaeTemple',
  'معبد فيلة': 'philaeTemple',
  'temple of isis': 'philaeTemple',
  
  // معبد إدفو
  'edfu': 'edfuTemple',
  'temple of edfu': 'edfuTemple',
  'معبد إدفو': 'edfuTemple',
  'temple of horus': 'edfuTemple',
  
  // معبد كوم أمبو
  'kom ombo': 'komOmboTemple',
  'temple of kom ombo': 'komOmboTemple',
  'معبد كوم امبو': 'komOmboTemple',
  
  // أبو سمبل
  'abu simbel': 'abuSimbelTemples',
  'abusimbel': 'abuSimbelTemples',
  'temple of abu simbel': 'abuSimbelTemples',
  'أبو سمبل': 'abuSimbelTemples',
  'temples of ramses ii': 'abuSimbelTemples',
  
  // السد العالي
  'high dam': 'highDam',
  'aswan high dam': 'highDam',
  'aswan dam': 'highDam',
  'السد العالي': 'highDam',
  
  // المسلة الناقصة
  'unfinished obelisk': 'unfinishedObelisk',
  'المسلة الناقصة': 'unfinishedObelisk',
  
  // المتحف النوبي
  'nubian museum': 'nubianMuseum',
  'المتحف النوبي': 'nubianMuseum',
  
  // معبد كلابشة
  'kalabsha': 'kalabshaTemple',
  'temple of kalabsha': 'kalabshaTemple',
  'معبد كلابشة': 'kalabshaTemple',
  
  // قبة الهوا
  'qubbet el hawa': 'qubbetElHawa',
  'dome of the winds': 'qubbetElHawa',
  'قبة الهوا': 'qubbetElHawa',
  
  // ==================== معابد أخرى ====================
  
  // معبد دندرة
  'dendera': 'denderaTemple',
  'temple of dendera': 'denderaTemple',
  'temple of hathor': 'denderaTemple',
  'معبد دندرة': 'denderaTemple',
  
  // معبد أبيدوس
  'abydos': 'abydosTemple',
  'temple of abydos': 'abydosTemple',
  'temple of seti i abydos': 'abydosTemple',
  'معبد أبيدوس': 'abydosTemple',
};

/**
 * ✅ دالة تحويل أسماء المواقع للأسماء الرسمية
 * @param key - اسم الموقع (بأي صيغة)
 * @returns الاسم الرسمي في costs.ts
 */
export const normalizeSiteKey = (key: string): SupportedSite => {
    if (!key) return key as SupportedSite;
    
    // تنظيف النص: إزالة المسافات الزائدة وتحويل لحروف صغيرة
    const cleanedKey = key.trim().toLowerCase();
    
    // البحث في المرادفات أولاً
    const aliasedKey = SITE_ALIASES[cleanedKey];
    if (aliasedKey) {
        return aliasedKey;
    }
    
    // إذا لم يوجد في المرادفات، حاول مطابقة مباشرة (camelCase)
    const firstCharLower = key.charAt(0).toLowerCase() + key.slice(1);
    const directMatch = (SITE_ALIASES[firstCharLower] || firstCharLower) as SupportedSite;
    
    // تحقق إذا كان الموقع معروفاً في قاعدة المعرفة
    if (!knowledgeBase.internalCosts.tickets[directMatch]) {
        console.warn(
            `⚠️ Unknown site detected: "${key}" → normalized to "${directMatch}"\n` +
            `This site will NOT be priced. Check spelling or add to costs.ts`
        );
    }

    return directMatch;
};