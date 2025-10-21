// // export interface Message {
// //   id: string;
// //   role: 'user' | 'model';
// //   content: string;
// //   programIds?: number[]; // For pre-defined programs
// //   customPrograms?: Program[]; // For AI-generated programs
// // }

// // // Added types for the knowledge base for better type safety
// // export interface LocalizedString {
// //     es: string;
// //     en: string;
// //     ar?: string;
// // }

// // export interface ItineraryItem {
// //     day: number;
// //     title: LocalizedString;
// //     activities: {
// //         es: string[];
// //         en: string[];
// //         ar?: string[];
// //     };
// // }

// // export interface ItineraryOption {
// //     name: LocalizedString;
// //     itinerary: ItineraryItem[];
// // }

// // export interface SeasonalPricingDetail {
// //     single: number;
// //     double: number;
// //     triple: number;
// // }

// // export interface PricingCategory {
// //     gold: SeasonalPricingDetail | number;
// //     diamond: SeasonalPricingDetail | number;
// // }

// // export interface AccommodationInfo {
// //     city: LocalizedString;
// //     hotel: LocalizedString;
// // }

// // export interface Program {
// //     id: number | string; // Allow string for custom program IDs
// //     name: LocalizedString;
// //     icon: string;
// //     duration: { days: number; nights: number };
// //     priceFrom: number;
// //     categories: string[];
// //     runDays?: LocalizedString;
// //     cruiseRunDays?: LocalizedString;
// //     briefDescription: LocalizedString;
// //     generalDescription: LocalizedString;
// //     itinerary?: ItineraryItem[];
// //     itineraryOptions?: ItineraryOption[];
// //     // FIX: Made properties optional to align with data source where some programs might be incomplete, which was causing a type error.
// //     servicesIncluded?: { es: string[]; en: string[], ar?: string[] };
// //     servicesExcluded?: { es: string[]; en: string[], ar?: string[] };
// //     importantNotes?: { es: string[]; en: string[], ar?: string[] };
// //     seasonalPricing?: {
// //         summer: PricingCategory;
// //         winter: PricingCategory;
// //     };
// //     accommodations?: {
// //         gold: AccommodationInfo[];
// //         diamond: AccommodationInfo[];
// //     };
// //     startCity?: LocalizedString;
// //     cruiseNights?: number;
// //     // New properties to support custom quote programs
// //     isCustom?: boolean;
// //     quoteParams?: CustomQuoteParams;
// // }


// // // Types for the new Custom Quote Pricing Engine
// // export type SupportedCity = 'cairo' | 'luxor' | 'aswan' | 'cruise' | 'hurghada' | 'siwa' | 'matrouh' | 'alexandria';

// // // Expanded to include all sites from the official pricing document
// // export type SupportedSite = 
// //   // Cairo & Giza
// //   'gizaPyramidsAndSphinx' | 'saqqara' | 'grandEgyptianMuseum' | 'egyptianMuseum' | 
// //   'citadelAndAlabasterMosque' | 'khanElKhalili' | 'citadelOfSaladin' | 'sultanHassanMosque' | 
// //   'elSeheimyHouse' | 'mohamedAliPalace' | 'marysTree' | 'senusretIObelisk' | 
// //   'egyptianMuseumAudioGuide' | 'islamicArtMuseum' | 'copticMuseum' | 'royalCarriagesMuseum' | 
// //   'gayerAndersonMuseum' | 'baronEmpainPalace' | 'alMuizzStreet' | 'manialPalace' | 
// //   'nilometer' | 'pyramidOfKeopsInterior' | 'pyramidOfKhafrenInterior' | 
// //   'pyramidOfMicerinoInterior' | 'tombOfMeresankh' | 'saqqaraComplexAndImhotepMuseum' |
// //   'nobleTombsOfTheNewKingdom' | 'southTombSaqqara' | 'saqqaraCombinedTicket' |
// //   // Saqqara, Dashur, Memphis
// //   'stepPyramidOfZoser' | 'serapeum' | 'tombOfMereruka' | 'dashurArchaeologicalZone' |
// //   'memphisMitRahina' | 'egyptianCivilizationMuseum' |
// //   // Alexandria
// //   'qaitbayCitadel' | 'komElShoqafaCatacombs' | 'komElDikkaRomanTheater' | 'pompeysPillar' |
// //   'alexandriaNationalMuseum' | 'royalJewelryMuseum' | 'graecoRomanMuseum' | 'rosettaRuins' |
// //   // Other Governorates
// //   'kafrElSheikhMuseum' | 'sanElHagarRuins' | 'mallawiMuseum' | 'tunaElGebel' |
// //   'beniHassanTombs' | 'tellElAmarna' | 'royalNecropolisAmarna' | 'statueOfMeritAmun' |
// //   'abydosTemple' | 'denderaTemple' |
// //   // Luxor
// //   'karnakTemple' | 'mutTemple' | 'luxorTemple' | 'valleyOfTheKings' | 'tombOfSetiI' |
// //   'tombOfAy' | 'hatshepsutTemple' | 'deirElMedina' | 'tombOfPashed' | 'tombOfRamose' |
// //   'ramesseumTemple' | 'abdelQurnaHill' | 'carterHouse' | 'tombOfMennaAndNakht' |
// //   'tombsOfUserhatAndKhaemwaset' | 'alAsasif' | 'esnaTemple' | 'tombOfRamsesVI' |
// //   'valleyOfTheQueens' | 'tombOfNefertari' | 'elKhokhaNecropolis' | 'tombsOfRoyAndShuroy' |
// //   'qurnaMerai' | 'sheikhAbdelQurna' | 'mummificationMuseum' | 'luxorMuseum' |
// //   // Aswan & Abu Simbel
// //   'abuSimbelTemples' | 'sunFestivalAbuSimbel' | 'philaeTemple' | 'edfuTemple' | 'komOmboTemple' |
// //   'qubbetElHawa' | 'unfinishedObelisk' | 'kalabshaTemple' | 'elKab' | 'nubianMuseum' | 'highDam';


// // // FIX: This new interface describes the structure of a day plan in a custom quote after normalization.
// // // It replaces the incorrect `SupportedSite[][]` type, which caused compilation errors.
// // export interface CustomItineraryDay {
// //     day?: number;
// //     city?: SupportedCity | string;
// //     title?: string;
// //     sites: SupportedSite[];
// //     description?: string;
// // }

// // export interface CustomQuoteItinerary {
// //     nights: Partial<Record<SupportedCity, number>>;
// //     sites: SupportedSite[];
// //     sitesGroupedByDay?: CustomItineraryDay[]; // For better guide day inference
// //     flightSectors: number;
// //     guidedDays?: number; 
// // }

// // export type VehicleType = 'limousine' | 'microbus' | 'minibus' | 'bus';
// // export type TransportServiceType = 'halfDay' | 'fullDay' | 'airport' | 'intercity';

// // export interface TransportService {
// //     city: SupportedCity;
// //     type: TransportServiceType;
// //     quantity?: number;
// //     vehicleType?: VehicleType;
// //     toCity?: SupportedCity;
// // }

// // export interface CustomQuoteParams {
// //     travelers: number;
// //     duration: number;
// //     season: 'summer' | 'winter';
// //     category: 'gold' | 'diamond';
// //     itineraryPlan: CustomQuoteItinerary;
// //     optionalLunches?: number;
// //     // New, more detailed properties for accurate pricing
// //     isStudent?: boolean;
// //     transportServices?: TransportService[];
// //     cairoArrivalRepresentative?: boolean;
// //     cairoDepartureRepresentative?: boolean;
// //     guidedDays?: number;
// //     rooms?: {
// //         single?: number;
// //         double?: number;
// //         triple?: number;
// //     };
// // }


// // export interface PriceResult {
// //     totalGroupPrice: number;
// //     pricePerPerson: number;
// // }

// // export interface QuoteFormData {
// //     name: string;
// //     email: string;
// //     whatsapp: string;
// //     travelers: string;
// //     month: string;
// // }

// // // --- New types for refactored data structure ---

// // export interface BusinessRules {
// //   features?: {
// //     enableCustomQuotes: boolean;
// //   };
// //   // Contains pricing rules, logistics, definitions, etc.
// //   // FIX: Added missing properties to match the businessRules object structure.
// //   generalInfo: any;
// //   faq: any;
// //   conversationLogic: any;
// //   pricing: any;
// //   logistics: any;
// //   definitions: any;
// //   legal: any;
// // }

// // export interface LocalizedUIStrings {
// //   // Contains all UI text for different languages
// //   [key: string]: any;
// // }

// // export interface ProgramData {
// //   // Specifically for the list of tour packages
// //   packages: Program[];
// // }

// // export interface CostData {
// //     // For all internal cost structures
// //     accommodation: any;
// //     transport: any;
// //     tickets: Record<SupportedSite, { adult: number, student: number | null }>;
// // }


// export interface Message {
//   id: string;
//   role: 'user' | 'model';
//   content: string;
//   programIds?: number[]; // For pre-defined programs
//   customPrograms?: Program[]; // For AI-generated programs
// }

// // Added types for the knowledge base for better type safety
// export interface LocalizedString {
//     es: string;
//     en: string;
//     ar?: string;
// }

// export interface ItineraryItem {
//     day: number;
//     title: LocalizedString;
//     activities: {
//         es: string[];
//         en: string[];
//         ar?: string[];
//     };
// }

// export interface ItineraryOption {
//     name: LocalizedString;
//     itinerary: ItineraryItem[];
// }

// export interface SeasonalPricingDetail {
//     single: number;
//     double: number;
//     triple: number;
// }

// export interface PricingCategory {
//     gold: SeasonalPricingDetail | number;
//     diamond: SeasonalPricingDetail | number;
// }

// export interface AccommodationInfo {
//     city: LocalizedString;
//     hotel: LocalizedString;
// }

// export interface TravelerPricing {
//   type: 'adult' | 'student' | 'child';
//   age: number;
//   roomType: 'single' | 'double' | 'triple';
//   subtotal: number;
//   final: number;
//   breakdown: {
//     accommodation: number;
//     entranceFees: number;
//     transport: number;
//     guide: number;
//     representative: number;
//     domesticFlights: number;
//     generalFees: number;
//     optionalMeals: number;
//   };
// }

// export interface PricingResult {
//   travelers: TravelerPricing[];
//   summary: {
//     groupSubtotal: number;
//     profit: number;
//     groupTotal: number;
//     profitMargin: string;
//   };
// }

// export interface Program {
//     id: number | string;
//     name: LocalizedString;
//     icon: string;
//     duration: { days: number; nights: number };
//     priceFrom: number;
//     categories: string[];
//     runDays?: LocalizedString;
//     cruiseRunDays?: LocalizedString;
//     briefDescription: LocalizedString;
//     generalDescription: LocalizedString;
//     itinerary?: ItineraryItem[];
//     itineraryOptions?: ItineraryOption[];
//     servicesIncluded?: { es: string[]; en: string[], ar?: string[] };
//     servicesExcluded?: { es: string[]; en: string[], ar?: string[] };
//     importantNotes?: { es: string[]; en: string[], ar?: string[] };
//     seasonalPricing?: {
//         summer: PricingCategory;
//         winter: PricingCategory;
//     };
//     accommodations?: {
//         gold: AccommodationInfo[];
//         diamond: AccommodationInfo[];
//     };
//     startCity?: LocalizedString;
//     cruiseNights?: number;
//     isCustom?: boolean;
//     quoteParams?: CustomQuoteParams;
//     pricingDetails?: PricingResult;
//     pricingBreakdown?: {
//         gold: any;
//         diamond: any;
//     };
// }

// export type SupportedCity = 'cairo' | 'luxor' | 'aswan' | 'cruise' | 'hurghada' | 'siwa' | 'matrouh' | 'alexandria' | 'sharmElSheikh' | 'saintCatherine' | 'abuSimbel';

// export type SupportedSite = 
//   // Cairo & Giza
//   | 'citadelOfSaladin' | 'sultanHassanMosque' | 'elSeheimyHouse' | 'mohamedAliPalace'
//   | 'marysTree' | 'senusretIObelisk' | 'egyptianMuseum' | 'egyptianMuseumAudioGuide'
//   | 'islamicArtMuseum' | 'copticMuseum' | 'royalCarriagesMuseum' | 'gayerAndersonMuseum'
//   | 'baronEmpainPalace' | 'alMuizzStreet' | 'manialPalace' | 'nilometer'
//   | 'gizaPyramids' | 'pyramidOfKhufu' | 'pyramidOfKhafre' | 'pyramidOfMenkaure'
//   | 'tombOfMeresankh' | 'saqqaraZone' | 'newKingdomNoblesTombs' | 'southTomb'
//   | 'combinedSaqqaraTicket' | 'stepPyramidOfDjoser' | 'serapeum' | 'tombOfMereruka'
//   | 'dahshurZone' | 'memphis' | 'egyptianCivilizationMuseum' | 'grandEgyptianMuseum'
  
//   // Saqqara, Dashur, Memphis
//   | 'stepPyramidOfZoser' | 'dashurArchaeologicalZone' | 'memphisMitRahina'
  
//   // Alexandria
//   | 'qaitbayCitadel' | 'komElShogafaCatacombs' | 'komElDikka' | 'pompeysPillar'
//   | 'alexandriaNationalMuseum' | 'royalJewelryMuseum' | 'graecoRomanMuseum' | 'rosettaRuins'
  
//   // Other Governorates
//   | 'kafrElSheikhMuseum' | 'sanElHagarRuins' | 'mallawiMuseum' | 'tunaElGebel'
//   | 'beniHassanTombs' | 'tellElAmarna' | 'royalNecropolisAmarna' | 'statueOfMeritAmun'
//   | 'abydosTemple' | 'denderaTemple'
  
//   // Luxor
//   | 'karnakTemple' | 'mutTemple' | 'luxorTemple' | 'valleyOfTheKings' | 'tombOfSetiI'
//   | 'tombOfAy' | 'hatshepsutTemple' | 'deirElMedina' | 'tombOfPashedu' | 'tombOfRamose'
//   | 'ramesseumTemple' | 'abdelQurnaHill' | 'carterHouse' | 'tombOfMennaAndNakht'
//   | 'tombsOfUserhatAndKhaemwaset' | 'alAsasif' | 'esnaTemple' | 'tombOfRamsesVI'
//   | 'valleyOfTheQueens' | 'tombOfNefertari' | 'elKhokhaNecropolis' | 'tombsOfRoyAndShuroy'
//   | 'qurnaMerai' | 'sheikhAbdelQurna' | 'mummificationMuseum' | 'luxorMuseum'
  
//   // Aswan & Abu Simbel
//   | 'abuSimbelTemples' | 'sunFestivalAbuSimbel' | 'philaeTemple' | 'edfuTemple' | 'komOmboTemple'
//   | 'qubbetElHawa' | 'highDam' | 'unfinishedObelisk' | 'kalabshaTemple' | 'elKab' | 'nubianMuseum'
  
//   // Legacy names for backward compatibility
//   | 'gizaPyramidsAndSphinx' | 'saqqara' | 'saqqaraComplexAndImhotepMuseum'
//   | 'nobleTombsOfTheNewKingdom' | 'southTombSaqqara' | 'saqqaraCombinedTicket'
//   | 'komElShoqafaCatacombs' | 'komElDikkaRomanTheater' | 'pyramidOfKeopsInterior'
//   | 'pyramidOfKhafrenInterior' | 'pyramidOfMicerinoInterior' | 'citadelAndAlabasterMosque'
//   | 'khanElKhalili';


// export interface CustomItineraryDay {
//     day?: number;
//     city?: SupportedCity | string;
//     title?: string;
//     sites: SupportedSite[];
//     description?: string;
// }

// export interface CustomQuoteItinerary {
//     nights: Partial<Record<SupportedCity, number>>;
//     sites: SupportedSite[];
//     sitesGroupedByDay?: CustomItineraryDay[];
//     flightSectors: number;
//     guidedDays?: number; 
// }

// export type VehicleType = 'limousine' | 'microbus' | 'minibus' | 'bus';
// export type TransportServiceType = 'halfDay' | 'fullDay' | 'airport' | 'intercity';

// export interface TransportService {
//     city: SupportedCity;
//     type: TransportServiceType;
//     quantity?: number;
//     vehicleType?: VehicleType;
//     toCity?: SupportedCity;
// }

// export interface Traveler {
//     type: 'adult' | 'student' | 'child';
//     age: number;
//     roomType: 'single' | 'double' | 'triple';
// }

// export interface CustomQuoteParams {
//     travelers: number;
//     duration: number;
//     season: 'summer' | 'winter';
//     category: 'gold' | 'diamond';
//     itineraryPlan: CustomQuoteItinerary;
//     optionalLunches?: number;
//     isStudent?: boolean;
//     transportServices?: TransportService[];
//     cairoArrivalRepresentative?: boolean;
//     cairoDepartureRepresentative?: boolean;
//     guidedDays?: number;
//     rooms?: {
//         single?: number;
//         double?: number;
//         triple?: number;
//     };
//     travelersData?: Traveler[];
// }


// export interface PriceResult {
//     totalGroupPrice: number;
//     pricePerPerson: number;
// }

// export interface QuoteFormData {
//     name: string;
//     email: string;
//     whatsapp: string;
//     travelers: string;
//     month: string;
// }


// export interface BusinessRules {
//   features?: {
//     enableCustomQuotes: boolean;
//   };
//   generalInfo: any;
//   faq: any;
//   conversationLogic: any;
//   pricing: any;
//   logistics: any;
//   definitions: any;
//   legal: any;
// }

// export interface LocalizedUIStrings {
//   // Contains all UI text for different languages
//   [key: string]: any;
// }

// export interface ProgramData {
//   // Specifically for the list of tour packages
//   packages: Program[];
// }

// export interface CostData {
//     // For all internal cost structures
//     accommodation: any;
//     transport: any;
//     tickets: Record<SupportedSite, { adult: number, student: number }>;
// }

// export interface AccommodationRates {
//   [city: string]: {
//     gold: { summer: number; winter: number };
//     diamond: { summer: number; winter: number };
//   };
// }

// export interface RoomRules {
//   single: { surcharge: number };
//   triple: { discount: number };
// }

// export interface InternalCostComponents {
//   privateGuidePerDay: number;
//   cairoRepresentativeService: number;
//   internalFlightsPerLeg: number;
//   optionalTraditionalLunch: number;
//   generalHospitalityFeePerPerson: number;
// }


export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  programIds?: number[];
  customPrograms?: Program[];
}

export interface LocalizedString {
    es: string;
    en: string;
    ar?: string;
}

export interface ItineraryItem {
    day: number;
    title: LocalizedString;
    activities: {
        es: string[];
        en: string[];
        ar?: string[];
    };
}

export interface ItineraryOption {
    name: LocalizedString;
    itinerary: ItineraryItem[];
}

export interface SeasonalPricingDetail {
    single: number;
    double: number;
    triple: number;
}

export interface PricingCategory {
    gold: SeasonalPricingDetail | number;
    diamond: SeasonalPricingDetail | number;
}

export interface AccommodationInfo {
    city: LocalizedString;
    hotel: LocalizedString;
}

export interface TravelerPricing {
  type: 'adult' | 'student' | 'child';
  age: number;
  roomType: 'single' | 'double' | 'triple';
  subtotal: number;
  final: number;
  breakdown: {
    accommodation: number;
    entranceFees: number;
    transport: number;
    guide: number;
    representative: number;
    domesticFlights: number;
    generalFees: number;
    optionalMeals: number;
  };
}

export interface PricingResult {
  travelers: TravelerPricing[];
  summary: {
    groupSubtotal: number;
    profit: number;
    groupTotal: number;
    profitMargin: string;
  };
}

export interface Program {
    id: number | string;
    name: LocalizedString;
    icon: string;
    duration: { days: number; nights: number };
    priceFrom: number;
    categories: string[];
    runDays?: LocalizedString;
    cruiseRunDays?: LocalizedString;
    briefDescription: LocalizedString;
    generalDescription: LocalizedString;
    itinerary?: ItineraryItem[];
    itineraryOptions?: ItineraryOption[];
    servicesIncluded?: { es: string[]; en: string[], ar?: string[] };
    servicesExcluded?: { es: string[]; en: string[], ar?: string[] };
    importantNotes?: { es: string[]; en: string[], ar?: string[] };
    seasonalPricing?: {
        summer: PricingCategory;
        winter: PricingCategory;
    };
    accommodations?: {
        gold: AccommodationInfo[];
        diamond: AccommodationInfo[];
    };
    startCity?: LocalizedString;
    cruiseNights?: number;
    isCustom?: boolean;
    quoteParams?: CustomQuoteParams;
    pricingDetails?: PricingResult;
    pricingBreakdown?: {
        gold: any;
        diamond: any;
    };
}

// ✅ مدن مصر المدعومة - متطابقة 100% مع PDF و costs.ts
export type SupportedCity = 
  | 'cairo' 
  | 'luxor' 
  | 'aswan' 
  | 'cruise' 
  | 'hurghada' 
  | 'sharmElSheikh' 
  | 'saintCatherine' 
  | 'abuSimbel'
  | 'alexandria'
  | 'siwa'
  | 'matrouh';

// ✅ المواقع السياحية - متطابقة 100% مع costs.ts
export type SupportedSite = 
  // ===== Cairo & Giza =====
  | 'citadelOfSaladin'
  | 'sultanHassanMosque'
  | 'elSeheimyHouse'
  | 'mohamedAliPalace'
  | 'marysTree'
  | 'senusretIObelisk'
  | 'egyptianMuseum'
  | 'egyptianMuseumAudioGuide'
  | 'islamicArtMuseum'
  | 'copticMuseum'
  | 'royalCarriagesMuseum'
  | 'gayerAndersonMuseum'
  | 'baronEmpainPalace'
  | 'alMuizzStreet'
  | 'manialPalace'
  | 'nilometer'
  | 'gizaPyramidsAndSphinx'
  | 'pyramidOfKeopsInterior'
  | 'pyramidOfKhafrenInterior'
  | 'pyramidOfMicerinoInterior'
  | 'tombOfMeresankh'
  | 'saqqaraComplexAndImhotepMuseum'
  | 'nobleTombsOfTheNewKingdom'
  | 'southTombSaqqara'
  | 'saqqaraCombinedTicket'
  | 'citadelAndAlabasterMosque'
  | 'khanElKhalili'
  | 'saqqara'
  
  // ===== Saqqara, Dashur, Memphis =====
  | 'stepPyramidOfZoser'
  | 'serapeum'
  | 'tombOfMereruka'
  | 'dashurArchaeologicalZone'
  | 'memphisMitRahina'
  | 'egyptianCivilizationMuseum'
  | 'grandEgyptianMuseum'
  
  // ===== Alexandria =====
  | 'qaitbayCitadel'
  | 'komElShoqafaCatacombs'
  | 'komElDikkaRomanTheater'
  | 'pompeysPillar'
  | 'alexandriaNationalMuseum'
  | 'royalJewelryMuseum'
  | 'graecoRomanMuseum'
  | 'rosettaRuins'
  
  // ===== Other Governorates =====
  | 'kafrElSheikhMuseum'
  | 'sanElHagarRuins'
  | 'mallawiMuseum'
  | 'tunaElGebel'
  | 'beniHassanTombs'
  | 'tellElAmarna'
  | 'royalNecropolisAmarna'
  | 'statueOfMeritAmun'
  | 'abydosTemple'
  | 'denderaTemple'
  
  // ===== Luxor (East & West Banks) =====
  | 'karnakTemple'
  | 'mutTemple'
  | 'luxorTemple'
  | 'valleyOfTheKings'
  | 'tombOfSetiI'
  | 'tombOfAy'
  | 'hatshepsutTemple'
  | 'deirElMedina'
  | 'tombOfPashed'
  | 'tombOfRamose'
  | 'ramesseumTemple'
  | 'abdelQurnaHill'
  | 'carterHouse'
  | 'tombOfMennaAndNakht'
  | 'tombsOfUserhatAndKhaemwaset'
  | 'alAsasif'
  | 'esnaTemple'
  | 'tombOfRamsesVI'
  | 'valleyOfTheQueens'
  | 'tombOfNefertari'
  | 'elKhokhaNecropolis'
  | 'tombsOfRoyAndShuroy'
  | 'qurnaMerai'
  | 'sheikhAbdelQurna'
  | 'mummificationMuseum'
  | 'luxorMuseum'
  
  // ===== Aswan & Abu Simbel =====
  | 'abuSimbelTemples'
  | 'sunFestivalAbuSimbel'
  | 'philaeTemple'
  | 'edfuTemple'
  | 'komOmboTemple'
  | 'qubbetElHawa'
  | 'unfinishedObelisk'
  | 'kalabshaTemple'
  | 'elKab'
  | 'nubianMuseum'
  | 'highDam';


export interface CustomItineraryDay {
    day?: number;
    city?: SupportedCity | string;
    title?: string;
    sites: SupportedSite[];
    description?: string;
}

export interface CustomQuoteItinerary {
    nights: Partial<Record<SupportedCity, number>>;
    sites?: SupportedSite[];
    sitesGroupedByDay?: CustomItineraryDay[];
    flightSectors?: number;
    guidedDays?: number; 
}

export type VehicleType = 'limousine' | 'microbus' | 'minibus' | 'bus';
export type TransportServiceType = 'halfDay' | 'fullDay' | 'airport' | 'intercity';

export interface TransportService {
    city: SupportedCity;
    type: TransportServiceType;
    quantity?: number;
    vehicleType?: VehicleType;
    toCity?: SupportedCity;
}

// ✅ واجهة جديدة لبيانات المسافر الفردي
export interface TravelerInput {
    age: number;
    isStudent: boolean;
    roomType: 'single' | 'double' | 'triple';
}

export interface CustomQuoteParams {
    travelers: number;
    duration: number;
    season: 'summer' | 'winter';
    category: 'gold' | 'diamond';
    itineraryPlan: CustomQuoteItinerary;
    optionalLunches?: number;
    isStudent?: boolean;
    transportServices?: TransportService[];
    cairoArrivalRepresentative?: boolean;
    cairoDepartureRepresentative?: boolean;
    guidedDays?: number;
    rooms?: {
        single?: number;
        double?: number;
        triple?: number;
    };
    // ✅ مصفوفة بيانات المسافرين الفعلية
    travelersData?: TravelerInput[];
}


export interface PriceResult {
    totalGroupPrice: number;
    pricePerPerson: number;
}

export interface QuoteFormData {
    name: string;
    email: string;
    whatsapp: string;
    travelers: string;
    month: string;
}


export interface BusinessRules {
  features?: {
    enableCustomQuotes: boolean;
  };
  generalInfo: any;
  faq: any;
  conversationLogic: any;
  pricing: any;
  logistics: any;
  definitions: any;
  legal: any;
}

export interface LocalizedUIStrings {
  [key: string]: any;
}

export interface ProgramData {
  packages: Program[];
}

export interface CostData {
    accommodation: any;
    transport: any;
    tickets: Record<SupportedSite, { adult: number, student: number | null }>;
}

export interface AccommodationRates {
  [city: string]: {
    gold: { summer: number; winter: number };
    diamond: { summer: number; winter: number };
  };
}

export interface RoomRules {
  single: { surcharge: number };
  triple: { discount: number };
}

export interface InternalCostComponents {
  privateGuidePerDay: number;
  cairoRepresentativeService: number;
  internalFlightsPerLeg: number;
  optionalTraditionalLunch: number;
  generalHospitalityFeePerPerson: number;
}