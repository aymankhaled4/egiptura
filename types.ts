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