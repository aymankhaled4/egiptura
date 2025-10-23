// import type { Program, ItineraryItem, CustomQuoteParams, SupportedSite, SupportedCity, LocalizedString } from './types';
// import { knowledgeBase } from './services/knowledgeBase';
// import type { Language } from './contexts/LanguageContext';

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
// // 🧠 نظام ذكي لاستخراج البيانات من البرامج الـ10 الموجودة
// export class IntelligentDataExtractor {
//     private programs: Program[];

//     constructor() {
//         this.programs = knowledgeBase.packages;
//     }

//     private validateCustomProgramName(proposedName: string): boolean {
//     const readyProgramNames = this.programs.map(p => 
//         p.name.en.toLowerCase().trim()
//     );
    
//     const proposedLower = proposedName.toLowerCase().trim();
    
//     // التحقق من عدم استخدام أسماء البرامج الجاهزة
//     const isReadyProgramName = readyProgramNames.some(readyName => 
//         proposedLower.includes(readyName) || readyName.includes(proposedLower)
//     );
    
//     // التحقق من استخدام التنسيق الصحيح
//     const hasCorrectFormat = /custom\s+\d+\s*-\s*day/i.test(proposedLower);
    
//     return !isReadyProgramName && hasCorrectFormat;
// }

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

//     // ✅ التحقق من تطابق البرنامج مع الطلب
//     private doesProgramMatchRequest(program: Program, duration: number, destinations: string[]): boolean {
//         // التحقق من المدة
//         if (program.duration.days !== duration) {
//             return false;
//         }

//         // استخراج المدن من البرنامج
//         const programCities = this.extractCitiesFromProgram(program);
//         const requestCities = destinations.map(d => d.toLowerCase());

//         // التحقق من تطابق المدن الرئيسية
//         const hasAllCities = requestCities.every(city => 
//             programCities.some(programCity => programCity.includes(city))
//         );

//         return hasAllCities;
//     }

//     // 🏙️ استخراج المدن من البرنامج
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


//     // 🔍 استخراج البيانات المتعلقة بمدينة معينة
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

//         // البحث في جميع البرامج عن البيانات المتعلقة بالمدينة
//         for (const program of this.programs) {
//             // استخراج الـ itinerary المتعلق بالمدينة
//             const programItinerary = this.getProgramItinerary(program);
//             const cityItinerary = this.filterItineraryByCity(programItinerary, cityLower, language);
//             results.itinerary.push(...cityItinerary);

//             // استخراج أماكن الإقامة
//             if (program.accommodations) {
//                 const cityAccommodations = this.extractCityAccommodations(program, cityLower);
//                 if (cityAccommodations.gold) results.accommodations.gold = cityAccommodations.gold;
//                 if (cityAccommodations.diamond) results.accommodations.diamond = cityAccommodations.diamond;
//             }

//             // استخراج المواقع
//             const citySites = this.extractCitySites(programItinerary, cityLower, language);
//             results.sites.push(...citySites);
//         }

//         // إزالة التكرارات
//         results.itinerary = this.removeDuplicateItineraryItems(results.itinerary);
//         results.sites = [...new Set(results.sites)];

//         return results;
//     }

//     // 🏨 استخراج أماكن الإقامة لمدينة معينة
//     private extractCityAccommodations(program: Program, city: string): { gold: string; diamond: string } {
//         const result = { gold: '', diamond: '' };

//         if (!program.accommodations) return result;

//         // البحث في فئة Gold
//         if (program.accommodations.gold) {
//             for (const acc of program.accommodations.gold) {
//                 if (this.isCityMatch(acc.city, city)) {
//                     result.gold = acc.hotel[this.getLanguageKey(acc.hotel)] || acc.hotel.en || '';
//                     break;
//                 }
//             }
//         }

//         // البحث في فئة Diamond
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

//     // 🗺️ استخراج المواقع السياحية لمدينة معينة
//     private extractCitySites(itinerary: ItineraryItem[], city: string, language: Language): SupportedSite[] {
//         const sites: SupportedSite[] = [];
//         const cityKeywords = this.getCityKeywords(city);

//         for (const day of itinerary) {
//             // معالجة آمنة للأنشطة
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
                
//                 // البحث عن المواقع السياحية المعروفة
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

//     // 📅 تصفية الـ itinerary حسب المدينة
//     private filterItineraryByCity(itinerary: ItineraryItem[], city: string, language: Language): ItineraryItem[] {
//         const cityKeywords = this.getCityKeywords(city);
//         const filtered: ItineraryItem[] = [];

//         for (const day of itinerary) {
//             // معالجة آمنة للأنشطة
//             let activities: string[] = [];
//             if (day.activities) {
//                 if (Array.isArray(day.activities)) {
//                     activities = day.activities;
//                 } else if (typeof day.activities === 'object') {
//                     activities = day.activities[language] || day.activities.en || [];
//                 }
//             }
            
//             // معالجة آمنة للعنوان
//             const title = day.title?.[language] || day.title?.en || '';
            
//             // التحقق من وجود المدينة في العنوان أو الأنشطة
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

//     // 🏙️ الحصول على كلمات مفتاحية للمدينة
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

//     // 🔍 التحقق من وجود كلمات مفتاحية في النص
//     private containsKeywords(text: string, keywords: string[]): boolean {
//         return keywords.some(keyword => text.includes(keyword.toLowerCase()));
//     }

//     // 🏨 التحقق من مطابقة المدينة
//     private isCityMatch(cityObj: LocalizedString, targetCity: string): boolean {
//         const cityKeywords = this.getCityKeywords(targetCity);
//         const cityValues = Object.values(cityObj).map(v => v.toLowerCase());
        
//         return cityKeywords.some(keyword => 
//             cityValues.some(value => value.includes(keyword))
//         );
//     }

//     // 📋 الحصول على مفتاح اللغة
//     private getLanguageKey(obj: LocalizedString): keyof LocalizedString {
//         return 'en' as keyof LocalizedString; // افتراضي
//     }

//     // 📅 الحصول على itinerary البرنامج
//     private getProgramItinerary(program: Program): ItineraryItem[] {
//         if (program.itineraryOptions && program.itineraryOptions.length > 0) {
//             return program.itineraryOptions[0].itinerary;
//         } else if (program.itinerary) {
//             return program.itinerary;
//         }
//         return [];
//     }

//     // 🗑️ إزالة التكرارات من الـ itinerary
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

//     // 🏨 استخراج الفنادق من جميع البرامج
//     private extractHotelsFromAllPrograms(): { city: string; category: 'gold' | 'diamond'; hotel: LocalizedString }[] {
//         const hotels: { city: string; category: 'gold' | 'diamond'; hotel: LocalizedString }[] = [];

//         for (const program of this.programs) {
//             if (program.accommodations) {
//                 // استخراج فنادق فئة Gold
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

//                 // استخراج فنادق فئة Diamond
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

//     // 🏙️ الكشف عن المدينة من بيانات الإقامة
//     private detectCityFromAccommodation(acc: any): string {
//         const cityName = acc.city.en?.toLowerCase() || '';
        
//         if (cityName.includes('cairo') || cityName.includes('القاهرة')) return 'cairo';
//         if (cityName.includes('luxor') || cityName.includes('الأقصر')) return 'luxor';
//         if (cityName.includes('aswan') || cityName.includes('أسوان')) return 'aswan';
//         if (cityName.includes('alexandria') || cityName.includes('الإسكندرية')) return 'alexandria';
        
//         return '';
//     }

//     // 🏨 البحث عن فندق للمدينة
//     private findHotelForCity(city: string, category: 'gold' | 'diamond', allHotels: any[]): any {
//         const availableHotels = allHotels.filter(h => 
//             h.city === city && h.category === category
//         );
        
//         if (availableHotels.length > 0) {
//             // إرجاع فندق عشوائي من المتاح
//             return availableHotels[Math.floor(Math.random() * availableHotels.length)];
//         }
        
//         return null;
//     }

//     // 🏨 فندق افتراضي للمدينة
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

//         // فندق افتراضي عام
//         return {
//             es: `Hotel en ${city}`,
//             en: `Hotel in ${city}`,
//             ar: `فندق في ${city}`
//         };
//     }

//     // 🏨 إنشاء أماكن الإقامة المخصصة - إصلاح كامل
//     private createCustomAccommodations(
//         nightsDistribution: any,
//         category: 'gold' | 'diamond',
//         language: Language
//     ): { gold: any[]; diamond: any[] } {
//         const accommodations = { gold: [] as any[], diamond: [] as any[] };

//         // البحث عن فنادق من البرامج الجاهزة لكل مدينة
//         const allHotels = this.extractHotelsFromAllPrograms();

//         for (const [city, nights] of Object.entries(nightsDistribution)) {
//             if (typeof nights === 'number' && nights > 0 && city !== 'cruise') {
//                 const cityName = this.getCityLocalizedName(city);
                
//                 // البحث عن فندق مناسب من البرامج الجاهزة
//                 const hotelForCity = this.findHotelForCity(city, category, allHotels);
                
//                 if (hotelForCity) {
//                     accommodations[category].push({
//                         city: cityName,
//                         hotel: hotelForCity.hotel
//                     });
//                 } else {
//                     // استخدام فندق افتراضي إذا لم يتم العثور على فندق
//                     accommodations[category].push({
//                         city: cityName,
//                         hotel: this.getDefaultHotelForCity(city, category, language)
//                     });
//                 }
//             }
//         }

//         // إضافة الإقامة في الكروز إذا كانت موجودة
//         if (nightsDistribution.cruise > 0) {
//             accommodations[category].push({
//                 city: { es: 'Crucero por el Nilo', en: 'Nile Cruise', ar: 'رحلة نيلية' },
//                 hotel: { es: 'Nave de Lujo', en: 'Luxury Cruise Ship', ar: 'سفينة نيلية فاخرة' }
//             });
//         }

//         return accommodations;
//     }

//     // 🏛️ أيام القاهرة المفصلة
//     private getCairoDays(totalDuration: number, language: Language): ItineraryItem[] {
//         const cairoDays: ItineraryItem[] = [];

//         // يوم الأهرامات
//         cairoDays.push({
//             day: 2, // سيتم تعديله لاحقاً
//             title: {
//                 es: 'Las Pirámides de Giza y la Esfinge',
//                 en: 'The Pyramids of Giza and the Sphinx',
//                 ar: 'أهرامات الجيزة وأبو الهول'
//             },
//             activities: {
//                 es: [
//                     'Desayuno en el hotel',
//                     'Visita a la Meseta de Giza para ver las Grandes Pirámides',
//                     'Exploración de la Pirámide de Keops (exterior)',
//                     'Visita a la Pirámide de Kefrén y la Pirámide de Micerinos',
//                     'Foto con la Gran Esfinge y el Templo del Valle',
//                     'Almuerzo en restaurante local con vistas a las pirámides',
//                     'Opcional: Paseo en camello alrededor de las pirámides',
//                     'Visita al Templo del Valle del Rey Kefrén',
//                     'Regreso al hotel y tiempo libre',
//                     'Cena y alojamiento'
//                 ],
//                 en: [
//                     'Breakfast at the hotel',
//                     'Visit to the Giza Plateau to see the Great Pyramids',
//                     'Exploration of the Pyramid of Khufu (exterior)',
//                     'Visit to the Pyramid of Khafre and Pyramid of Menkaure',
//                     'Photo with the Great Sphinx and Valley Temple',
//                     'Lunch at local restaurant with pyramid views',
//                     'Optional: Camel ride around the pyramids',
//                     'Visit to the Valley Temple of King Khafre',
//                     'Return to hotel and free time',
//                     'Dinner and accommodation'
//                 ],
//                 ar: [
//                     'الإفطار في الفندق',
//                     'زيارة هضبة الجيزة لمشاهدة الأهرامات العظيمة',
//                     'استكشاف هرم خوفو (من الخارج)',
//                     'زيارة هرم خفرع وهرم منقرع',
//                     'التقاط الصور مع أبو الهول ومعبد الوادي',
//                     'غداء في مطعم محلي بإطلالة على الأهرامات',
//                     'اختياري: رحلة جمل حول الأهرامات',
//                     'زيارة معبد الوادي للملك خفرع',
//                     'العودة إلى الفندق والوقت الحر',
//                     'العشاء والإقامة'
//                 ]
//             }
//         });

//         // يوم المتحف المصري والقاهرة الإسلامية
//         cairoDays.push({
//             day: 3,
//             title: {
//                 es: 'Museo Egipcio y Cairo Histórico',
//                 en: 'Egyptian Museum and Historic Cairo',
//                 ar: 'المتحف المصري والقاهرة التاريخية'
//             },
//             activities: {
//                 es: [
//                     'Desayuno en el hotel',
//                     'Visita al Museo Egipcio de Antigüedades',
//                     'Exploración de la Sala de las Momias Reales',
//                     'Admiración del Tesoro de Tutankamón',
//                     'Almuerzo en restaurante tradicional egipcio',
//                     'Visita a la Ciudadela de Saladino y la Mezquita de Mohamed Ali',
//                     'Recorrido por el Bazar Khan el Khalili',
//                     'Tiempo libre para compras de artesanías',
//                     'Visita a la Mezquita de Alabastro',
//                     'Regreso al hotel, cena y alojamiento'
//                 ],
//                 en: [
//                     'Breakfast at the hotel',
//                     'Visit to the Egyptian Museum of Antiquities',
//                     'Exploration of the Royal Mummies Room',
//                     'Admiration of the Treasure of Tutankhamun',
//                     'Lunch at traditional Egyptian restaurant',
//                     'Visit to the Citadel of Saladin and Mohamed Ali Mosque',
//                     'Tour of Khan el Khalili Bazaar',
//                     'Free time for handicraft shopping',
//                     'Visit to the Alabaster Mosque',
//                     'Return to hotel, dinner and accommodation'
//                 ],
//                 ar: [
//                     'الإفطار في الفندق',
//                     'زيارة المتحف المصري للآثار',
//                     'استكشاف قاعة المومياوات الملكية',
//                     'الإعجاب بكنوز توت عنخ آمون',
//                     'غداء في مطعم مصري تقليدي',
//                     'زيارة قلعة صلاح الدين ومسجد محمد علي',
//                     'جولة في خان الخليلي',
//                     'وقت حر للتسوق للحرف اليدوية',
//                     'زيارة مسجد المرمر',
//                     'العودة إلى الفندق، العشاء والإقامة'
//                 ]
//             }
//         });

//         return cairoDays;
//     }

//     // 🏛️ أيام الأقصر المفصلة
//     private getLuxorDays(language: Language): ItineraryItem[] {
//         return [{
//             day: 1,
//             title: {
//                 es: 'Valle de los Reyes y Templo de Hatshepsut',
//                 en: 'Valley of the Kings and Hatshepsut Temple',
//                 ar: 'وادي الملوك ومعبد حتشبسوت'
//             },
//             activities: {
//                 es: [
//                     'Desayuno temprano',
//                     'Cruce del Nilo hacia la orilla occidental',
//                     'Visita al Valle de los Reyes (3 tumbas incluidas)',
//                     'Exploración del Templo de Hatshepsut en Deir el-Bahari',
//                     'Foto en los Colosos de Memnón',
//                     'Almuerzo en restaurante local',
//                     'Visita al Templo de Medinet Habu',
//                     'Regreso al hotel/crucero',
//                     'Cena y espectáculo de luz y sonido opcional'
//                 ],
//                 en: [
//                     'Early breakfast',
//                     'Crossing the Nile to the west bank',
//                     'Visit to Valley of the Kings (3 tombs included)',
//                     'Exploration of Hatshepsut Temple at Deir el-Bahari',
//                     'Photo at the Colossi of Memnon',
//                     'Lunch at local restaurant',
//                     'Visit to Medinet Habu Temple',
//                     'Return to hotel/cruise',
//                     'Dinner and optional sound and light show'
//                 ],
//                 ar: [
//                     'الإفطار المبكر',
//                     'عبور النيل إلى الضفة الغربية',
//                     'زيارة وادي الملوك (3 مقابر مشمولة)',
//                     'استكشاف معبد حتشبسوت في الدير البحري',
//                     'التقاط الصور عند تمثالي ممنون',
//                     'غداء في مطعم محلي',
//                     'زيارة معبد مدينة هابو',
//                     'العودة إلى الفندق/الكروز',
//                     'العشاء وعرض الصوت والضوء اختياري'
//                 ]
//             }
//         }];
//     }

//     // 🏛️ أيام أسوان المفصلة
//     private getAswanDays(language: Language): ItineraryItem[] {
//         return [{
//             day: 1,
//             title: {
//                 es: 'Presa de Asuán y Templo de Philae',
//                 en: 'Aswan Dam and Philae Temple',
//                 ar: 'سد أسوان ومعبد فيلة'
//             },
//             activities: {
//                 es: [
//                     'Desayuno en el hotel/crucero',
//                     'Visita a la Presa Alta de Asuán',
//                     'Recorrido por el Obelisco Inacabado',
//                     'Paseo en faluca alrededor de las Islas Elefantina',
//                     'Almuerzo con vistas al Nilo',
//                     'Visita al Templo de Philae dedicado a la diosa Isis',
//                     'Paseo en barco hacia la Isla de Agilkia',
//                     'Tiempo libre en el mercado de especias de Asuán',
//                     'Cena y alojamiento'
//                 ],
//                 en: [
//                     'Breakfast at hotel/cruise',
//                     'Visit to the Aswan High Dam',
//                     'Tour of the Unfinished Obelisk',
//                     'Feluccas ride around Elephantine Island',
//                     'Lunch with Nile views',
//                     'Visit to Philae Temple dedicated to goddess Isis',
//                     'Boat ride to Agilkia Island',
//                     'Free time at Aswan spice market',
//                     'Dinner and accommodation'
//                 ],
//                 ar: [
//                     'الإفطار في الفندق/الكروز',
//                     'زيارة السد العالي في أسوان',
//                     'جولة في المسلة الناقصة',
//                     'رحلة فلوكة حول جزيرة الفنتين',
//                     'غداء بإطلالة على النيل',
//                     'زيارة معبد فيلة المخصص للإلهة إيزيس',
//                     'رحلة بالقارب إلى جزيرة أجيليكيا',
//                     'وقت حر في سوق التوابل بأسوان',
//                     'العشاء والإقامة'
//                 ]
//             }
//         }];
//     }

//     // 🏛️ أيام الإسكندرية المفصلة
//     private getAlexandriaDays(language: Language): ItineraryItem[] {
//         return [{
//             day: 1,
//             title: {
//                 es: 'Alejandría Histórica y la Costa Mediterránea',
//                 en: 'Historic Alexandria and Mediterranean Coast',
//                 ar: 'الإسكندرية التاريخية والساحل المتوسطي'
//             },
//             activities: {
//                 es: [
//                     'Desayuno temprano y salida hacia Alejandría',
//                     'Visita a la Ciudadela de Qaitbay',
//                     'Exploración de la Nueva Biblioteca de Alejandría',
//                     'Almuerzo de mariscos frescos en el puerto',
//                     'Visita a las Catacumbas de Kom el Shoqafa',
//                     'Paseo por el Palacio de Montazah y sus jardines',
//                     'Tiempo libre en la Corniche de Alejandría',
//                     'Regreso a El Cairo',
//                     'Cena y alojamiento'
//                 ],
//                 en: [
//                     'Early breakfast and departure to Alexandria',
//                     'Visit to Qaitbay Citadel',
//                     'Exploration of the New Alexandria Library',
//                     'Fresh seafood lunch at the harbor',
//                     'Visit to Kom el Shoqafa Catacombs',
//                     'Walk through Montazah Palace and gardens',
//                     'Free time at Alexandria Corniche',
//                     'Return to Cairo',
//                     'Dinner and accommodation'
//                 ],
//                 ar: [
//                     'الإفطار المبكر والانطلاق إلى الإسكندرية',
//                     'زيارة قلعة قايتباي',
//                     'استكشاف مكتبة الإسكندرية الجديدة',
//                     'غداء مأكولات بحرية طازجة في الميناء',
//                     'زيارة катаكومبات كوم الشقافة',
//                     'نزهة في قصر المنتزه وحدائقه',
//                     'وقت حر في كورنيش الإسكندرية',
//                     'العودة إلى القاهرة',
//                     'العشاء والإقامة'
//                 ]
//             }
//         }];
//     }

//     // 🚢 أيام الكروز المفصلة
//    // 🚢 أيام الكروز المفصلة
//     private getCruiseDays(totalDuration: number, language: Language): ItineraryItem[] {
//         const cruiseDays: ItineraryItem[] = [];
        
//         // يوم 1: صعود الكروز والإبحار
//         cruiseDays.push({
//             day: 1,
//             title: {
//                 es: 'Embarque en el Crucero y Templo de Edfu',
//                 en: 'Cruise Boarding and Edfu Temple',
//                 ar: 'الصعود إلى الكروز ومعبد إدفو'
//             },
//             activities: {
//                 es: [
//                     'Traslado al puerto para embarque en el crucero',
//                     'Bienvenida a bordo y asignación de cabinas',
//                     'Almuerzo buffet en el crucero',
//                     'Visita al Templo de Edfu, el mejor preservado de Egipto',
//                     'Navegación hacia Kom Ombo',
//                     'Cena a bordo',
//                     'Relajación en la cubierta bajo las estrellas'
//                 ],
//                 en: [
//                     'Transfer to port for cruise boarding',
//                     'Welcome aboard and cabin assignment',
//                     'Buffet lunch on the cruise',
//                     'Visit to Edfu Temple, the best preserved in Egypt',
//                     'Sailing towards Kom Ombo',
//                     'Dinner on board',
//                     'Relaxation on deck under the stars'
//                 ],
//                 ar: [
//                     'الانتقال إلى الميناء للصعود إلى الكروز',
//                     'الترحيب على متن السفينة وتخصيص الكبائن',
//                     'غداء بوفيه على الكروز',
//                     'زيارة معبد إدفو، الأفضل حفظاً في مصر',
//                     'الإبحار نحو كوم أمبو',
//                     'العشاء على متن السفينة',
//                     'الاسترخاء على سطح السفينة تحت النجوم'
//                 ]
//             }
//         });
        
//         // يوم 2: كوم أمبو والإبحار
//         cruiseDays.push({
//             day: 2,
//             title: {
//                 es: 'Templo de Kom Ombo y Navegación',
//                 en: 'Kom Ombo Temple and Sailing',
//                 ar: 'معبد كوم أمبو والإبحار'
//             },
//             activities: {
//                 es: [
//                     'Desayuno a bordo',
//                     'Visita al Templo de Kom Ombo dedicado a Sobek y Horus',
//                     'Navegación por el Nilo disfrutando de vistas panorámicas',
//                     'Almuerzo buffet a bordo',
//                     'Tarde de relax en la piscina del crucero',
//                     'Charla sobre la historia del Antiguo Egipto',
//                     'Cena temática egipcia',
//                     'Espectáculo de música y danza tradicional'
//                 ],
//                 en: [
//                     'Breakfast on board',
//                     'Visit to Kom Ombo Temple dedicated to Sobek and Horus',
//                     'Nile sailing enjoying panoramic views',
//                     'Buffet lunch on board',
//                     'Relaxing afternoon at cruise pool',
//                     'Lecture on Ancient Egyptian history',
//                     'Egyptian themed dinner',
//                     'Traditional music and dance show'
//                 ],
//                 ar: [
//                     'الإفطار على متن السفينة',
//                     'زيارة معبد كوم أمبو المخصص لسوبك وحورس',
//                     'الإبحار في النيل والاستمتاع بمناظر بانورامية',
//                     'غداء بوفيه على متن الكروز',
//                     'بعد الظهر للاسترخاء في مسبح الكروز',
//                     'محاضرة عن تاريخ مصر القديمة',
//                     'عشاء على الطريقة المصرية',
//                     'عرض موسيقي ورقص تقليدي'
//                 ]
//             }
//         });
        
//         // يوم 3: وصول أسوان
//         cruiseDays.push({
//             day: 3,
//             title: {
//                 es: 'Llegada a Asuán y Templo de Philae',
//                 en: 'Arrival in Aswan and Philae Temple',
//                 ar: 'الوصول إلى أسوان ومعبد فيلة'
//             },
//             activities: {
//                 es: [
//                     'Desayuno a bordo',
//                     'Llegada a Asuán',
//                     'Visita a la Presa Alta de Asuán',
//                     'Paseo en faluca alrededor de las Islas',
//                     'Almuerzo a bordo',
//                     'Visita al Templo de Philae dedicado a la diosa Isis',
//                     'Tiempo libre en el mercado de especias',
//                     'Cena y alojamiento en el crucero'
//                 ],
//                 en: [
//                     'Breakfast on board',
//                     'Arrival in Aswan',
//                     'Visit to Aswan High Dam',
//                     'Felucca ride around the Islands',
//                     'Lunch on board',
//                     'Visit to Philae Temple dedicated to goddess Isis',
//                     'Free time at spice market',
//                     'Dinner and accommodation on cruise'
//                 ],
//                 ar: [
//                     'الإفطار على متن السفينة',
//                     'الوصول إلى أسوان',
//                     'زيارة السد العالي في أسوان',
//                     'رحلة فلوكة حول الجزر',
//                     'الغداء على متن السفينة',
//                     'زيارة معبد فيلة المخصص للإلهة إيزيس',
//                     'وقت حر في سوق التوابل',
//                     'العشاء والإقامة على الكروز'
//                 ]
//             }
//         });
        
//         // يوم 4: أبو سمبل (اختياري للكروز الطويل)
//         if (totalDuration >= 10) {
//             cruiseDays.push({
//                 day: 4,
//                 title: {
//                     es: 'Excursión a Abu Simbel',
//                     en: 'Abu Simbel Excursion',
//                     ar: 'رحلة إلى أبو سمبل'
//                 },
//                 activities: {
//                     es: [
//                         'Salida temprana hacia Abu Simbel',
//                         'Visita a los Templos de Ramsés II y Nefertari',
//                         'Desayuno tipo box',
//                         'Regreso a Asuán',
//                         'Almuerzo a bordo del crucero',
//                         'Tarde libre para descansar',
//                         'Cena de despedida en el crucero',
//                         'Desembarque'
//                     ],
//                     en: [
//                         'Early departure to Abu Simbel',
//                         'Visit to Ramses II and Nefertari Temples',
//                         'Box breakfast',
//                         'Return to Aswan',
//                         'Lunch on board',
//                         'Free afternoon to rest',
//                         'Farewell dinner on cruise',
//                         'Disembarkation'
//                     ],
//                     ar: [
//                         'مغادرة مبكرة إلى أبو سمبل',
//                         'زيارة معابد رمسيس الثاني ونفرتاري',
//                         'إفطار خفيف',
//                         'العودة إلى أسوان',
//                         'الغداء على متن السفينة',
//                         'بعد الظهر حر للراحة',
//                         'عشاء الوداع على الكروز',
//                         'النزول من السفينة'
//                     ]
//                 }
//             });
//         }
        
//         return cruiseDays;
//     }

//     // 🗺️ الحصول على أيام مفصلة لكل وجهة
//     private getDaysForDestination(destination: string, totalDuration: number, language: Language): ItineraryItem[] {
//         const days: ItineraryItem[] = [];
        
//         switch (destination.toLowerCase()) {
//             case 'cairo':
//                 days.push(...this.getCairoDays(totalDuration, language));
//                 break;
//             case 'luxor':
//                 days.push(...this.getLuxorDays(language));
//                 break;
//             case 'aswan':
//                 days.push(...this.getAswanDays(language));
//                 break;
//             case 'alexandria':
//                 days.push(...this.getAlexandriaDays(language));
//                 break;
//             case 'cruise':
//                 days.push(...this.getCruiseDays(totalDuration, language));
//                 break;
//         }
        
//         return days;
//     }

//     private createCustomItinerary(
//     duration: number,
//     destinations: string[],
//     nightsDistribution: any,
//     language: Language
// ): ItineraryItem[] {
//     const customItinerary: ItineraryItem[] = [];
    
//     // يوم الوصول
//     customItinerary.push({
//         day: 1,
//         title: {
//             es: 'Llegada a El Cairo - Bienvenida a Egipto',
//             en: 'Arrival in Cairo - Welcome to Egypt', 
//             ar: 'الوصول إلى القاهرة - مرحباً بكم في مصر'
//         },
//         activities: {
//             es: [
//                 'Llegada al aeropuerto internacional de El Cairo',
//                 'Asistencia en el aeropuerto por nuestivate createCustomProgramName(duration: number, destinations: string[], language: Language): LocalizedString {
        return { es: '', en: '', ar: '' };
    }

    private createBriefDescription(duration: number, destinations: string[], language: Language): LocalizedString {
        return { es: '', en: '', ar: '' };
    }

    private createGeneralDescription(duration: number, destinations: string[], language: Language): LocalizedString {
        return { es: '', en: '', ar: '' };
    }

    private createServicesIncluded(nightsDistribution: any, category: 'gold' | 'diamond', language: Language): { es: string[]; en: string[]; ar: string[] } {
        return { es: [], en: [], ar: [] };
    }

    private extractSitesFromItinerary(itinerary: ItineraryItem[], language: Language): SupportedSite[] {
        return [];
    }

    private convertNightsDistribution(nightsDistribution: any): { [key: string]: number } {
        return {};
    }

    private getCityLocalizedName(city: string): LocalizedString {
        return { es: '', en: '', ar: '' };
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

// 🚀 تصدير الدالة المرنة الجديدة
export function createFlexibleCustomProgram(request: FlexibleCustomRequest): Program {
    const extractor = new IntelligentDataExtractor();
    return extractor.createFlexibleCustomProgram(request);
}

// 🚀 دالة مساعدة لإنشاء طلب مرن بسهولة
export function createFlexibleRequest(
    travelers: number,
    duration: number,
    dayByDay: DayPlan[],
    season: 'summer' | 'winter',
    category: 'gold' | 'diamond',
    language: Language
): FlexibleCustomRequest {
    return {
        travelers,
        duration,
        dayByDay,
        season,
        category,
        language
    };
}

// 🚀 دالة مساعدة لإنشاء خطة يومية بسهولة
export function createDayPlan(
    days: string,
    city?: string,
    sites?: string[],
    type?: 'cruise' | 'city',
    nights?: number,
    startCity?: 'luxor' | 'aswan',
    direction?: 'luxor-to-aswan' | 'aswan-to-luxor',
    departureDay?: 'saturday' | 'monday' | 'wednesday' | 'friday'
): DayPlan {
    return {
        days,
        city,
        sites,
        type,
        nights,
        startCity,
        direction,
        departureDay
    };
}

// 🚀 أمثلة على الاستخدام
export const FlexibleExamples = {
    // مثال 1: رحلة القاهرة مع مواقع محددة
    cairoOnly: (travelers: number, language: Language = 'en'): FlexibleCustomRequest => {
        return createFlexibleRequest(
            travelers,
            4,
            [
                createDayPlan('2', 'cairo', ['gizaPyramidsAndSphinx', 'egyptianMuseum']),
                createDayPlan('1', 'cairo', ['khanElKhalili', 'citadelOfSaladin'])
            ],
            'winter',
            'gold',
            language
        );
    },

    // مثال 2: رحلة الأقصر مع مواقع محددة
    luxorOnly: (travelers: number, language: Language = 'en'): FlexibleCustomRequest => {
        return createFlexibleRequest(
            travelers,
            3,
            [
                createDayPlan('2', 'luxor', ['karnakTemple', 'luxorTemple', 'valleyOfTheKings', 'hatshepsutTemple'])
            ],
            'winter',
            'gold',
            language
        );
    },

    // مثال 3: رحلة كروز 4 ليالي من الأقصر إلى أسوان
    cruise4Nights: (travelers: number, language: Language = 'en'): FlexibleCustomRequest => {
        return createFlexibleRequest(
            travelers,
            6,
            [
                createDayPlan('1', 'cairo', ['gizaPyramidsAndSphinx']),
                createDayPlan('4', undefined, undefined, 'cruise', 4, 'luxor', 'luxor-to-aswan', 'saturday')
            ],
            'winter',
            'diamond',
            language
        );
    },

    // مثال 4: رحلة كروز 3 ليالي من أسوان إلى الأقصر
    cruise3Nights: (travelers: number, language: Language = 'en'): FlexibleCustomRequest => {
        return createFlexibleRequest(
            travelers,
            5,
            [
                createDayPlan('1', 'cairo', ['egyptianMuseum']),
                createDayPlan('3', undefined, undefined, 'cruise', 3, 'aswan', 'aswan-to-luxor', 'wednesday')
            ],
            'winter',
            'gold',
            language
        );
    },

    // مثال 5: رحلة مرنة مع عدة مدن
    multiCity: (travelers: number, language: Language = 'en'): FlexibleCustomRequest => {
        return createFlexibleRequest(
            travelers,
            8,
            [
                createDayPlan('2', 'cairo', ['gizaPyramidsAndSphinx', 'egyptianMuseum']),
                createDayPlan('1', 'alexandria', ['qaitbayCitadel', 'alexandriaNationalMuseum']),
                createDayPlan('3', undefined, undefined, 'cruise', 3, 'luxor', 'luxor-to-aswan', 'saturday'),
                createDayPlan('1', 'aswan', ['philaeTemple', 'highDam'])
            ],
            'winter',
            'diamond',
            language
        );
    }
};