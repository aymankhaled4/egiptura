// import { knowledgeBase } from './knowledgeBase';
// import type {
//   CustomQuoteParams,
//   PriceResult,
//   SupportedCity,
//   SupportedSite,
//   TransportService,
//   SeasonalPricingDetail,
//   CustomQuoteItinerary,
//   CustomItineraryDay,
// } from '../types';
// import { normalizeSiteKey } from './siteAliases';

// type TransportServiceType = 'halfDay' | 'fullDay' | 'airport' | 'intercity';
// type VehicleType = 'limousine' | 'microbus' | 'minibus' | 'bus';


// export const normalizeQuoteData = (quote: any): any => {
//     if (!quote?.itineraryPlan) return quote;

//     // 1) Normalize the flat list of all sites if it exists
//     if (Array.isArray(quote.itineraryPlan.sites)) {
//         quote.itineraryPlan.sites = quote.itineraryPlan.sites.map(normalizeSiteKey);
//     }

//     // 2) Normalize sitesGroupedByDay, handling both object and legacy array formats
//     if (Array.isArray(quote.itineraryPlan.sitesGroupedByDay)) {
//         quote.itineraryPlan.sitesGroupedByDay = quote.itineraryPlan.sitesGroupedByDay.map((day: any) => {
//             // Legacy format: a day is just an array of site strings
//             if (Array.isArray(day)) {
//                 return { city: undefined, sites: day.map(normalizeSiteKey) };
//             }
//             // Standard format: a day is an object with a sites array
//             if (day && Array.isArray(day.sites)) {
//                 return { ...day, sites: day.sites.map(normalizeSiteKey) };
//             }
//             return day; // Return as-is if format is unexpected
//         });
//     }

//     // 3) Convert legacy hotelNightsGroupedByCity to the standard `nights` object
//     if (!quote.itineraryPlan.nights && quote.itineraryPlan.hotelNightsGroupedByCity) {
//         const mapKey = (k: string): SupportedCity => {
//             const key = k.toLowerCase();
//             if (key === 'cairo') return 'cairo';
//             if (key === 'cruise') return 'cruise';
//             if (key === 'luxor') return 'luxor';
//             if (key === 'aswan') return 'aswan';
//             return key as SupportedCity;
//         };
//         const nights: Partial<Record<SupportedCity, number>> = {};
//         for (const k of Object.keys(quote.itineraryPlan.hotelNightsGroupedByCity)) {
//             nights[mapKey(k)] = quote.itineraryPlan.hotelNightsGroupedByCity[k];
//         }
//         quote.itineraryPlan.nights = nights;
//     }

//     return quote;
// };


// export function fillMissingFields(quote: any, langUI: any) {
//     quote.category = (quote.category || "gold").toString().toLowerCase();
//     quote.season = (quote.season || "winter").toString().toLowerCase();
//     quote.itineraryPlan = quote.itineraryPlan || {};
//     quote.itineraryPlan.nights = quote.itineraryPlan.nights || {};
//     quote.itineraryPlan.flightSectors = quote.itineraryPlan.flightSectors ?? 2; // Sensible default
    
//     if (!Array.isArray(quote.itineraryPlan.sitesGroupedByDay) || quote.itineraryPlan.sitesGroupedByDay.length === 0) {
//         quote.itineraryPlan.sitesGroupedByDay = [{ day: 1, city: "Cairo", sites: [], description: langUI?.arrivalDay ?? "Arrival & transfer" }];
//         console.warn("sitesGroupedByDay was missing or empty. A default arrival day has been added.");
//     }
    
//     if (quote.duration && quote.itineraryPlan.nights) {
//         // FIX: The reduce function was causing a type error where `unknown` was being assigned to `number`.
//         // By casting the array from `Object.values` to `any[]`, we ensure the elements (`n`) are treated as `any`,
//         // allowing `Number(n)` to work correctly and the reduce operation to correctly return a `number`.
//         const totalNights: number = (Object.values(quote.itineraryPlan.nights) as any[]).reduce((sum: number, n) => sum + (Number(n) || 0), 0);
//         if (totalNights > 0 && quote.duration - 1 !== totalNights) {
//             console.warn(`Duration mismatch: Program has ${quote.duration} days, but itinerary has ${totalNights} nights. Pricing may be affected.`);
//         }
//     }

//     return quote;
// }


// const siteToCityMap: Partial<Record<SupportedSite, SupportedCity>> = {
//   // Cairo & Giza
//   gizaPyramidsAndSphinx: 'cairo', saqqara: 'cairo', grandEgyptianMuseum: 'cairo', egyptianMuseum: 'cairo',
//   citadelAndAlabasterMosque: 'cairo', khanElKhalili: 'cairo', citadelOfSaladin: 'cairo', sultanHassanMosque: 'cairo',
//   elSeheimyHouse: 'cairo', mohamedAliPalace: 'cairo', marysTree: 'cairo', senusretIObelisk: 'cairo',
//   egyptianMuseumAudioGuide: 'cairo', islamicArtMuseum: 'cairo', copticMuseum: 'cairo', royalCarriagesMuseum: 'cairo',
//   gayerAndersonMuseum: 'cairo', baronEmpainPalace: 'cairo', alMuizzStreet: 'cairo', manialPalace: 'cairo',
//   nilometer: 'cairo', pyramidOfKeopsInterior: 'cairo', pyramidOfKhafrenInterior: 'cairo',
//   pyramidOfMicerinoInterior: 'cairo', tombOfMeresankh: 'cairo', saqqaraComplexAndImhotepMuseum: 'cairo',
//   nobleTombsOfTheNewKingdom: 'cairo', southTombSaqqara: 'cairo', saqqaraCombinedTicket: 'cairo',
//   stepPyramidOfZoser: 'cairo', serapeum: 'cairo', tombOfMereruka: 'cairo', dashurArchaeologicalZone: 'cairo',
//   memphisMitRahina: 'cairo', egyptianCivilizationMuseum: 'cairo',
//   // Alexandria
//   qaitbayCitadel: 'alexandria', komElShoqafaCatacombs: 'alexandria', komElDikkaRomanTheater: 'alexandria', pompeysPillar: 'alexandria',
//   alexandriaNationalMuseum: 'alexandria', royalJewelryMuseum: 'alexandria', graecoRomanMuseum: 'alexandria', rosettaRuins: 'alexandria',
//   // Luxor & nearby day trips
//   karnakTemple: 'luxor', mutTemple: 'luxor', luxorTemple: 'luxor', valleyOfTheKings: 'luxor', tombOfSetiI: 'luxor',
//   tombOfAy: 'luxor', hatshepsutTemple: 'luxor', deirElMedina: 'luxor', tombOfPashed: 'luxor', tombOfRamose: 'luxor',
//   ramesseumTemple: 'luxor', abdelQurnaHill: 'luxor', carterHouse: 'luxor', tombOfMennaAndNakht: 'luxor',
//   tombsOfUserhatAndKhaemwaset: 'luxor', alAsasif: 'luxor', esnaTemple: 'luxor', tombOfRamsesVI: 'luxor',
//   valleyOfTheQueens: 'luxor', tombOfNefertari: 'luxor', elKhokhaNecropolis: 'luxor', tombsOfRoyAndShuroy: 'luxor',
//   qurnaMerai: 'luxor', sheikhAbdelQurna: 'luxor', mummificationMuseum: 'luxor', luxorMuseum: 'luxor',
//   abydosTemple: 'luxor', denderaTemple: 'luxor',
//   // Aswan & nearby day trips
//   abuSimbelTemples: 'aswan', sunFestivalAbuSimbel: 'aswan', philaeTemple: 'aswan', edfuTemple: 'aswan', komOmboTemple: 'aswan',
//   qubbetElHawa: 'aswan', unfinishedObelisk: 'aswan', kalabshaTemple: 'aswan', elKab: 'aswan', nubianMuseum: 'aswan', highDam: 'aswan',
//   // Other Governorates are mapped to nearest major city for fallback transport logic
//   kafrElSheikhMuseum: 'alexandria', sanElHagarRuins: 'cairo', mallawiMuseum: 'luxor', tunaElGebel: 'luxor',
//   beniHassanTombs: 'luxor', tellElAmarna: 'luxor', royalNecropolisAmarna: 'luxor', statueOfMeritAmun: 'luxor',
// };


// const cruiseSites = new Set<SupportedSite>([
//   'highDam', 'philaeTemple', 'unfinishedObelisk', 'komOmboTemple', 'edfuTemple',
//   'luxorTemple', 'karnakTemple', 'valleyOfTheKings', 'hatshepsutTemple', 'valleyOfTheQueens',
//   'deirElMedina', 'ramesseumTemple', 'mutTemple', 'tombOfSetiI', 'tombOfAy',
//   'tombOfPashed', 'tombOfRamose', 'abdelQurnaHill', 'carterHouse', 'tombOfMennaAndNakht',
//   'tombsOfUserhatAndKhaemwaset', 'alAsasif', 'tombOfRamsesVI', 'elKhokhaNecropolis',
//   'tombsOfRoyAndShuroy', 'qurnaMerai', 'sheikhAbdelQurna', 'mummificationMuseum', 'luxorMuseum',
// ]);


// function pickVehicleType(travelers: number, city?: SupportedCity): VehicleType {
//   if (city === 'cairo') return travelers <= 16 ? 'microbus' : travelers <= 25 ? 'minibus' : 'bus';
//   if (travelers <= 2) return 'limousine';
//   if (travelers <= 16) return 'microbus';
//   if (travelers <= 25) return 'minibus';
//   return 'bus';
// }

// function priceTicket(
//   siteKey: SupportedSite,
//   isStudent?: boolean
// ): number {
//   const t = knowledgeBase.internalCosts.tickets[siteKey];
//   if (!t || t.adult === 0) return 0;
//   return isStudent ? (t.student ?? t.adult) : t.adult;
// }


// function inferTransportServices(params: CustomQuoteParams): TransportService[] {
//     const { itineraryPlan, cairoArrivalRepresentative, cairoDepartureRepresentative } = params;
//     const generatedServices: TransportService[] = [];
//     if (itineraryPlan.nights.cairo && itineraryPlan.nights.cairo > 0) {
//         if (cairoArrivalRepresentative) generatedServices.push({ city: 'cairo', type: 'airport' });
//         if (cairoDepartureRepresentative) generatedServices.push({ city: 'cairo', type: 'airport' });
//     }
    
//     if (itineraryPlan.sitesGroupedByDay && itineraryPlan.sitesGroupedByDay.length > 0) {
//         const hasCruise = (itineraryPlan.nights.cruise ?? 0) > 0;
//         const tourDaysByCity: Partial<Record<SupportedCity, number>> = {};
        
//         for (const day of itineraryPlan.sitesGroupedByDay) {
//             const sites = Array.isArray((day as any)) ? (day as any) : Array.isArray((day as CustomItineraryDay)?.sites) ? (day as CustomItineraryDay).sites : [];
//             if (sites.length === 0) continue;

//             const isCruiseTourDay = hasCruise && sites.every((site: SupportedSite) => cruiseSites.has(site));
//             if (isCruiseTourDay) {
//                 continue; 
//             }

//             const city = siteToCityMap[sites[0]];
//             if (city) {
//                 tourDaysByCity[city] = (tourDaysByCity[city] || 0) + 1;
//             }
//         }
        
//         for (const city in tourDaysByCity) {
//             const numDays = tourDaysByCity[city as SupportedCity];
//             if (numDays && numDays > 0) {
//               generatedServices.push({ city: city as SupportedCity, type: 'fullDay', quantity: numDays });
//             }
//         }
//     }
//     return generatedServices;
// }


// export const calculateCustomPackagePrice = (params: CustomQuoteParams): PriceResult => {
//   const {
//     travelers,
//     season,
//     category,
//     itineraryPlan,
//     optionalLunches = 0,
//     isStudent = false,
//     transportServices,
//     cairoArrivalRepresentative = true,
//     cairoDepartureRepresentative = true,
//     guidedDays,
//     rooms,
//   } = params;
  
//   if (travelers <= 0) {
//       return { totalGroupPrice: 0, pricePerPerson: 0 };
//   }

//   const { accommodation, transport } = knowledgeBase.internalCosts;
//   const { pricing } = knowledgeBase;

//   let sharedGroupCost = 0;

//   let inferredGuidedDays = guidedDays;
//   if (inferredGuidedDays == null) {
//     if (Array.isArray(itineraryPlan.sitesGroupedByDay) && itineraryPlan.sitesGroupedByDay.length) {
//       inferredGuidedDays = itineraryPlan.sitesGroupedByDay.filter(d => (d.sites?.length ?? 0) > 0).length;
//     } else {
//       const allSitesForGuideCalc = Array.isArray(itineraryPlan.sites) ? itineraryPlan.sites : [];
//       inferredGuidedDays = allSitesForGuideCalc.length ? Math.ceil(allSitesForGuideCalc.length / 3) : 0;
//     }
//   }
//   if (inferredGuidedDays > 0) {
//       sharedGroupCost += pricing.internalCostComponents.privateGuidePerDay * (inferredGuidedDays as number);
//   }

//   let effectiveTransportServices = transportServices;
//   if (!effectiveTransportServices || effectiveTransportServices.length === 0) {
//       effectiveTransportServices = inferTransportServices(params);
//   }
  
//   let groupTransport = 0;
//   if (effectiveTransportServices && effectiveTransportServices.length > 0) {
//     for (const svc of effectiveTransportServices) {
//       const cityKey = svc.city as keyof typeof transport.pricelist;
//       const typeKey = svc.type as TransportServiceType;
//       const qty = Math.max(1, svc.quantity ?? 1);
//       const vType = (svc.vehicleType as VehicleType) || pickVehicleType(travelers, svc.city);

//       if (typeKey === 'intercity') {
//         const toCity = svc.toCity as keyof typeof transport.pricelist;
//         const inter = transport.pricelist?.[cityKey]?.intercity?.[toCity as any]?.[vType];
//         if (inter) groupTransport += inter * qty;
//         continue;
//       }
      
//       const price = transport.pricelist?.[cityKey]?.[typeKey]?.[vType] ?? 0;
//       groupTransport += price * qty;
//     }
//   }
//   sharedGroupCost += groupTransport;
  
//   let repEvents = 0;
//   if (cairoArrivalRepresentative) repEvents += 1;
//   if (cairoDepartureRepresentative) repEvents += 1;

//   if (cairoArrivalRepresentative && !effectiveTransportServices?.some(s => s.type ==='airport' && s.city === 'cairo')) {
//       console.warn("Cairo arrival representative added without a corresponding airport vehicle service. This is expected if the user arrives independently but requires assistance.");
//   }
//   if (cairoDepartureRepresentative && !effectiveTransportServices?.some(s => s.type ==='airport' && s.city === 'cairo')) {
//       console.warn("Cairo departure representative added without a corresponding airport vehicle service. This is expected if the user departs independently but requires assistance.");
//   }

//   if (repEvents > 0) {
//       sharedGroupCost += pricing.internalCostComponents.cairoRepresentativeService * repEvents;
//   }

//   const allSites: SupportedSite[] = [];
//   const days = Array.isArray(itineraryPlan.sitesGroupedByDay) ? itineraryPlan.sitesGroupedByDay : [];
//   if (Array.isArray(itineraryPlan.sites) && itineraryPlan.sites.length > 0) {
//       allSites.push(...itineraryPlan.sites);
//   }
//   for (const day of days) {
//       if (Array.isArray((day as any))) {
//           allSites.push(...(day as any));
//       } else if ((day as CustomItineraryDay)?.sites) {
//           allSites.push(...(day as CustomItineraryDay).sites);
//       }
//   }
//   const uniqueSites = [...new Set(allSites)];

//   let totalPerPersonCost = 0;
//   for (const site of uniqueSites) {
//     totalPerPersonCost += priceTicket(site, isStudent);
//   }

//     // حساب التكاليف الفردية (الرحلات الداخلية + الغداء الاختياري + الضيافة)
//   totalPerPersonCost += itineraryPlan.flightSectors * pricing.internalCostComponents.internalFlightsPerLeg;
//   totalPerPersonCost += optionalLunches * pricing.internalCostComponents.optionalTraditionalLunch;
//   totalPerPersonCost += pricing.internalCostComponents.generalHospitalityFeePerPerson;

//   const totalIndividualCosts = totalPerPersonCost * travelers;

//   // تحديد توزيع الغرف
//   let totalAccommodationCost = 0;
//   let numSingles = 0, numDoubles = 0, numTriples = 0;

//   if (rooms && (rooms.single || rooms.double || rooms.triple)) {
//     numSingles = rooms.single || 0;
//     numDoubles = rooms.double || 0;
//     numTriples = rooms.triple || 0;
//     const totalPaxInRooms = (numSingles * 1) + (numDoubles * 2) + (numTriples * 3);
//     if (totalPaxInRooms !== travelers) {
//       console.warn(`Rooming plan mismatch: ${totalPaxInRooms} in rooms vs ${travelers} travelers. Defaulting to double rooms.`);
//       numSingles = travelers % 2;
//       numDoubles = Math.floor(travelers / 2);
//       numTriples = 0;
//     }
//   } else {
//     numSingles = travelers % 2;
//     numDoubles = Math.floor(travelers / 2);
//   }

//   // حساب الإقامة لكل مدينة بطريقة منطقية per-person
//   for (const cityKey of Object.keys(itineraryPlan.nights)) {
//     const city = cityKey as SupportedCity;
//     const nights = itineraryPlan.nights[city] || 0;
//     if (!nights) continue;

//     const acc = accommodation[city];
//     if (!acc) continue;
//     const cat = acc[category];
//     if (!cat) continue;

//     const perPersonDouble = (cat as any)[season] || 0;
//     const perPersonSingle = perPersonDouble * (1 + pricing.roomRules.single.surcharge);
//     const perPersonTriple = perPersonDouble * (1 - pricing.roomRules.triple.discount);

//     const avgPerPerson =
//       ((numSingles * perPersonSingle) +
//         (numDoubles * perPersonDouble * 2) +
//         (numTriples * perPersonTriple * 3)) /
//       Math.max(1, numSingles + numDoubles * 2 + numTriples * 3);

//     totalAccommodationCost += avgPerPerson * nights * travelers;
//   }

//   // إجمالي التكلفة النهائية
//   const totalCost = sharedGroupCost + totalIndividualCosts + totalAccommodationCost;
//   const totalGroupPrice = totalCost * 1.10;
//   const pricePerPerson = travelers > 0 ? totalGroupPrice / travelers : 0;

//   return { 
//     totalGroupPrice: Math.round(totalGroupPrice), 
//     pricePerPerson: Math.round(pricePerPerson) 
//   };
// };



// export const calculatePriceScenarios = (baseParams: CustomQuoteParams): { summer: SeasonalPricingDetail, winter: SeasonalPricingDetail } => {
//     const { travelers, rooms, transportServices, ...restOfParams } = baseParams;

//     const inferredTransport = transportServices ?? inferTransportServices(baseParams);

//     // Calculate Summer Prices
//     const summerSinglePrice = calculateCustomPackagePrice({ ...restOfParams, transportServices: inferredTransport, season: 'summer', travelers: 1, rooms: { single: 1 } }).pricePerPerson;
//     const summerDoublePrice = calculateCustomPackagePrice({ ...restOfParams, transportServices: inferredTransport, season: 'summer', travelers: 2, rooms: { double: 1 } }).pricePerPerson;
//     const summerTriplePrice = calculateCustomPackagePrice({ ...restOfParams, transportServices: inferredTransport, season: 'summer', travelers: 3, rooms: { triple: 1 } }).pricePerPerson;

//     // Calculate Winter Prices
//     const winterSinglePrice = calculateCustomPackagePrice({ ...restOfParams, transportServices: inferredTransport, season: 'winter', travelers: 1, rooms: { single: 1 } }).pricePerPerson;
//     const winterDoublePrice = calculateCustomPackagePrice({ ...restOfParams, transportServices: inferredTransport, season: 'winter', travelers: 2, rooms: { double: 1 } }).pricePerPerson;
//     const winterTriplePrice = calculateCustomPackagePrice({ ...restOfParams, transportServices: inferredTransport, season: 'winter', travelers: 3, rooms: { triple: 1 } }).pricePerPerson;
    
//     return {
//         summer: {
//             single: summerSinglePrice,
//             double: summerDoublePrice,
//             triple: summerTriplePrice,
//         },
//         winter: {
//             single: winterSinglePrice,
//             double: winterDoublePrice,
//             triple: winterTriplePrice,
//         }
//     };
// };



import { knowledgeBase } from './knowledgeBase';
import type {
  CustomQuoteParams,
  PriceResult,
  SupportedCity,
  SupportedSite,
  TransportService,
  SeasonalPricingDetail,
  CustomQuoteItinerary,
  CustomItineraryDay,
} from '../types';
import { normalizeSiteKey } from './siteAliases';

type TransportServiceType = 'halfDay' | 'fullDay' | 'airport' | 'intercity';
type VehicleType = 'limousine' | 'microbus' | 'minibus' | 'bus';

// واجهات جديدة بناءً على PDF
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

// عوامل العمر من PDF
function getAgeFactor(age: number): number {
  if (age < 6) return 0;     // مجاني
  if (age <= 12) return 0.5; // 50%
  return 1;                  // سعر كامل
}

// عوامل نوع الغرفة من PDF
function getRoomFactor(roomType: string): number {
  switch (roomType) {
    case 'single': return 1.70; // +70%
    case 'triple': return 0.90; // -10%
    default: return 1.00; // double
  }
}

// الأسعار الحقيقية من PDF
const ACCOMMODATION_RATES = {
  cairo: {
    gold: { summer: 65, winter: 75 },
    diamond: { summer: 120, winter: 135 }
  },
  cruise: {
    gold: { summer: 75, winter: 95 },
    diamond: { summer: 85, winter: 120 }
  },
  luxor: {
    gold: { summer: 75, winter: 75 },
    diamond: { summer: 75, winter: 75 }
  },
  aswan: {
    gold: { summer: 100, winter: 100 },
    diamond: { summer: 100, winter: 100 }
  },
  hurghada: {
    gold: { summer: 100, winter: 100 },
    diamond: { summer: 100, winter: 100 }
  },
  sharmElSheikh: {
    gold: { summer: 100, winter: 100 },
    diamond: { summer: 100, winter: 100 }
  },
  saintCatherine: {
    gold: { summer: 70, winter: 70 },
    diamond: { summer: 70, winter: 70 }
  },
  abuSimbel: {
    gold: { summer: 200, winter: 200 },
    diamond: { summer: 200, winter: 200 }
  }
};

// أسعار التذاكر من PDF (مثال - تحتاج استكمال)
// أسعار التذاكر الكاملة من PDF
const TICKET_PRICES: Record<string, { adult: number; student: number }> = {
  // القاهرة والجيزة
  citadelOfSaladin: { adult: 12.2, student: 6.1 },
  sultanHassanMosque: { adult: 4.9, student: 2.4 },
  elSeheimyHouse: { adult: 4.9, student: 2.4 },
  mohamedAliPalace: { adult: 6.7, student: 3.3 },
  marysTree: { adult: 4.9, student: 2.4 },
  senusretIObelisk: { adult: 4.4, student: 2.2 },
  egyptianMuseum: { adult: 12.2, student: 6.1 },
  egyptianMuseumAudioGuide: { adult: 1.7, student: 1.7 },
  islamicArtMuseum: { adult: 7.6, student: 3.8 },
  copticMuseum: { adult: 6.2, student: 3.1 },
  royalCarriagesMuseum: { adult: 6.7, student: 3.3 },
  gayerAndersonMuseum: { adult: 2.2, student: 1.1 },
  baronEmpainPalace: { adult: 4.9, student: 2.4 },
  alMuizzStreet: { adult: 4.9, student: 2.4 },
  manialPalace: { adult: 4.9, student: 2.4 },
  nilometer: { adult: 2.7, student: 1.3 },
  gizaPyramids: { adult: 15.6, student: 7.8 },
  pyramidOfKhufu: { adult: 22.2, student: 11.1 },
  pyramidOfKhafre: { adult: 6.2, student: 3.1 },
  pyramidOfMenkaure: { adult: 6.2, student: 3.1 },
  tombOfMeresankh: { adult: 4.4, student: 2.2 },
  saqqaraZone: { adult: 13.3, student: 6.7 },
  newKingdomNoblesTombs: { adult: 8.9, student: 4.4 },
  southTomb: { adult: 6.7, student: 3.3 },
  combinedSaqqaraTicket: { adult: 22.2, student: 11.1 },
  
  // سقارة، دهشور وممفيس
  stepPyramidOfDjoser: { adult: 6.2, student: 3.1 },
  serapeum: { adult: 7.6, student: 3.8 },
  tombOfMereruka: { adult: 4.4, student: 2.2 },
  dahshurZone: { adult: 4.4, student: 2.2 },
  memphis: { adult: 4.4, student: 2.2 },
  egyptianCivilizationMuseum: { adult: 11.1, student: 5.6 },
  grandEgyptianMuseum: { adult: 26.7, student: 13.3 },
  
  // الإسكندرية
  qaitbayCitadel: { adult: 4.4, student: 2.2 },
  komElShogafaCatacombs: { adult: 4.4, student: 2.2 },
  komElDikka: { adult: 4.4, student: 2.2 },
  pompeysPillar: { adult: 4.4, student: 2.2 },
  alexandriaNationalMuseum: { adult: 4.9, student: 2.4 },
  royalJewelryMuseum: { adult: 4.9, student: 2.4 },
  graecoRomanMuseum: { adult: 8.9, student: 4.4 },
  rosettaRuins: { adult: 2.7, student: 1.3 },
  
  // محافظات أخرى
  kafrElSheikhMuseum: { adult: 4.9, student: 2.4 },
  sanElHagarRuins: { adult: 2.7, student: 1.3 },
  mallawiMuseum: { adult: 2.7, student: 1.3 },
  tunaElGebel: { adult: 4.4, student: 2.2 },
  beniHassanTombs: { adult: 4.4, student: 2.2 },
  tellElAmarna: { adult: 4.4, student: 2.2 },
  royalNecropolisAmarna: { adult: 2.7, student: 1.3 },
  statueOfMeritAmun: { adult: 2.7, student: 1.3 },
  abydosTemple: { adult: 5.8, student: 2.9 },
  denderaTemple: { adult: 6.7, student: 3.3 },
  
  // الأقصر (الضفة الشرقية والغربية)
  karnakTemple: { adult: 13.3, student: 6.7 },
  mutTemple: { adult: 4.4, student: 2.2 },
  luxorTemple: { adult: 11.1, student: 5.6 },
  valleyOfTheKings: { adult: 16.7, student: 8.3 },
  tombOfSetiI: { adult: 44.4, student: 22.2 },
  tombOfAy: { adult: 4.4, student: 2.2 },
  hatshepsutTemple: { adult: 8.9, student: 4.9 },
  deirElMedina: { adult: 4.9, student: 2.4 },
  tombOfPashedu: { adult: 2.7, student: 1.3 },
  tombOfRamose: { adult: 4.4, student: 2.2 },
  ramesseumTemple: { adult: 4.9, student: 2.4 },
  abdelQurnaHill: { adult: 2.7, student: 1.3 },
  carterHouse: { adult: 4.9, student: 2.4 },
  tombOfMennaAndNakht: { adult: 4.4, student: 2.2 },
  tombsOfUserhatAndKhaemwaset: { adult: 2.7, student: 1.3 },
  alAsasif: { adult: 4.4, student: 2.2 },
  esnaTemple: { adult: 4.4, student: 2.2 },
  tombOfRamsesVI: { adult: 4.9, student: 2.4 },
  valleyOfTheQueens: { adult: 4.9, student: 2.4 },
  tombOfNefertari: { adult: 55.6, student: 55.6 }, // سعر ثابت
  elKhokhaNecropolis: { adult: 2.7, student: 1.3 },
  tombsOfRoyAndShuroy: { adult: 2.7, student: 1.3 },
  qurnaMerai: { adult: 2.7, student: 1.3 },
  sheikhAbdelQurna: { adult: 2.7, student: 1.3 },
  mummificationMuseum: { adult: 4.9, student: 2.4 },
  luxorMuseum: { adult: 8.9, student: 4.4 },
  
  // أسوان وأبو سمبل
  abuSimbelTemples: { adult: 16.7, student: 8.3 },
  sunFestivalAbuSimbel: { adult: 26.7, student: 13.3 },
  philaeTemple: { adult: 12.2, student: 6.1 },
  edfuTemple: { adult: 12.2, student: 6.1 },
  komOmboTemple: { adult: 10.0, student: 5.0 },
  qubbetElHawa: { adult: 4.4, student: 2.2 },
  highDam: { adult: 4.9, student: 2.4 },
  unfinishedObelisk: { adult: 4.9, student: 2.4 },
  kalabshaTemple: { adult: 4.4, student: 2.2 },
  elKab: { adult: 4.4, student: 2.2 },
  nubianMuseum: { adult: 8.9, student: 4.4 }
};

export const normalizeQuoteData = (quote: any): any => {
    if (!quote?.itineraryPlan) return quote;

    if (Array.isArray(quote.itineraryPlan.sites)) {
        quote.itineraryPlan.sites = quote.itineraryPlan.sites.map(normalizeSiteKey);
    }

    if (Array.isArray(quote.itineraryPlan.sitesGroupedByDay)) {
        quote.itineraryPlan.sitesGroupedByDay = quote.itineraryPlan.sitesGroupedByDay.map((day: any) => {
            if (Array.isArray(day)) {
                return { city: undefined, sites: day.map(normalizeSiteKey) };
            }
            if (day && Array.isArray(day.sites)) {
                return { ...day, sites: day.sites.map(normalizeSiteKey) };
            }
            return day;
        });
    }

    if (!quote.itineraryPlan.nights && quote.itineraryPlan.hotelNightsGroupedByCity) {
        const mapKey = (k: string): SupportedCity => {
            const key = k.toLowerCase();
            if (key === 'cairo') return 'cairo';
            if (key === 'cruise') return 'cruise';
            if (key === 'luxor') return 'luxor';
            if (key === 'aswan') return 'aswan';
            if (key === 'hurghada') return 'hurghada';
            return key as SupportedCity;
        };
        const nights: Partial<Record<SupportedCity, number>> = {};
        for (const k of Object.keys(quote.itineraryPlan.hotelNightsGroupedByCity)) {
            nights[mapKey(k)] = quote.itineraryPlan.hotelNightsGroupedByCity[k];
        }
        quote.itineraryPlan.nights = nights;
    }

    return quote;
};

export function fillMissingFields(quote: any, langUI: any) {
    quote.category = (quote.category || "gold").toString().toLowerCase();
    quote.season = (quote.season || "winter").toString().toLowerCase();
    quote.itineraryPlan = quote.itineraryPlan || {};
    quote.itineraryPlan.nights = quote.itineraryPlan.nights || {};
    quote.itineraryPlan.flightSectors = quote.itineraryPlan.flightSectors ?? 0;
    
    if (!Array.isArray(quote.itineraryPlan.sitesGroupedByDay) || quote.itineraryPlan.sitesGroupedByDay.length === 0) {
        quote.itineraryPlan.sitesGroupedByDay = [{ day: 1, city: "Cairo", sites: [], description: langUI?.arrivalDay ?? "Arrival & transfer" }];
    }
    
    if (quote.duration && quote.itineraryPlan.nights) {
        const totalNights: number = (Object.values(quote.itineraryPlan.nights) as any[]).reduce((sum: number, n) => sum + (Number(n) || 0), 0);
        if (totalNights > 0 && quote.duration - 1 !== totalNights) {
            console.warn(`Duration mismatch: Program has ${quote.duration} days, but itinerary has ${totalNights} nights.`);
        }
    }

    return quote;
}

// نظام التسعير الجديد المطابق لـ PDF
// export function calculateRealPricing(params: CustomQuoteParams): PricingResult {
//     const { travelers, season, category, itineraryPlan } = params;
    
//     // بيانات افتراضية للمسافرين (يجب أن تأتي من params في التطبيق الحقيقي)
//     const travelersData = [
//         { type: 'adult' as const, age: 30, roomType: 'double' as const },
//         { type: 'adult' as const, age: 30, roomType: 'double' as const }
//     ];

//     // 1. حساب الإقامة
//     const accommodationTotal = calculateAccommodation(params, travelersData);
    
//     // 2. حساب تذاكر الدخول
//     const entranceFeesTotal = calculateEntranceFees(params, travelersData);
    
//     // 3. حساب النقل
//     const transportTotal = calculateTransport(params, travelersData);
    
//     // 4. حساب المرشد
//     const guideTotal = calculateGuide(params, travelersData);
    
//     // 5. حساب الممثل
//     const repTotal = calculateRepresentative(params, travelersData);
    
//     // 6. حساب الطيران الداخلي
//     const flightsTotal = calculateDomesticFlights(params, travelersData);
    
//     // 7. المصاريف العامة
//     const generalFeesTotal = calculateGeneralFees(travelersData);
    
//     // 8. الوجبات الاختيارية
//     const mealsTotal = calculateOptionalMeals(params, travelersData);
    
//     // جمع كل المكونات لكل مسافر
//     const travelersBreakdown = travelersData.map(traveler => {
//         const subtotal = 
//             accommodationTotal[traveler.type] +
//             entranceFeesTotal[traveler.type] +
//             transportTotal[traveler.type] +
//             guideTotal[traveler.type] +
//             repTotal[traveler.type] +
//             flightsTotal[traveler.type] +
//             generalFeesTotal[traveler.type] +
//             mealsTotal[traveler.type];
        
//         // إضافة ربح 10% كما في PDF
//         const final = Math.round(subtotal * 1.10 * 100) / 100;
        
//         return {
//             type: traveler.type,
//             age: traveler.age,
//             roomType: traveler.roomType,
//             subtotal,
//             final,
//             breakdown: {
//                 accommodation: accommodationTotal[traveler.type],
//                 entranceFees: entranceFeesTotal[traveler.type],
//                 transport: transportTotal[traveler.type],
//                 guide: guideTotal[traveler.type],
//                 representative: repTotal[traveler.type],
//                 domesticFlights: flightsTotal[traveler.type],
//                 generalFees: generalFeesTotal[traveler.type],
//                 optionalMeals: mealsTotal[traveler.type]
//             }
//         };
//     });
    
//     // المجموع النهائي
//     const groupTotal = travelersBreakdown.reduce((sum, traveler) => sum + traveler.final, 0);
//     const groupSubtotal = travelersBreakdown.reduce((sum, traveler) => sum + traveler.subtotal, 0);
//     const profit = groupTotal - groupSubtotal;
    
//     return {
//         travelers: travelersBreakdown,
//         summary: {
//             groupSubtotal: Math.round(groupSubtotal * 100) / 100,
//             profit: Math.round(profit * 100) / 100,
//             groupTotal: Math.round(groupTotal * 100) / 100,
//             profitMargin: '10%'
//         }
//     };
// }




// دالة حساب الإقامة حسب البيانات الحقيقية من PDF
function calculateAccommodation(params: CustomQuoteParams, travelersData: any[]): Record<string, number> {
    const { season, category, itineraryPlan } = params;
    
    const result: Record<string, number> = { adult: 0, student: 0, child: 0 };
    
    travelersData.forEach(traveler => {
        let travelerTotal = 0;
        
        // حساب إقامة كل مدينة
        for (const [city, nights] of Object.entries(itineraryPlan.nights)) {
            if (!nights || nights === 0) continue;
            
            const cityKey = city as keyof typeof ACCOMMODATION_RATES;
            if (ACCOMMODATION_RATES[cityKey]) {
                const baseRate = ACCOMMODATION_RATES[cityKey][category][season];
                const roomFactor = getRoomFactor(traveler.roomType);
                const ageFactor = getAgeFactor(traveler.age);
                
                travelerTotal += baseRate * nights * roomFactor * ageFactor;
            }
        }
        
        result[traveler.type] = Math.round(travelerTotal * 100) / 100;
    });
    
    return result;
}

// حساب تذاكر الدخول
function calculateEntranceFees(params: CustomQuoteParams, travelersData: any[]): Record<string, number> {
    const { itineraryPlan } = params;
    const result: Record<string, number> = { adult: 0, student: 0, child: 0 };
    
    // جمع كل المواقع من itinerary
    const allSites: string[] = [];
    if (Array.isArray(itineraryPlan.sites)) {
        allSites.push(...itineraryPlan.sites);
    }
    if (Array.isArray(itineraryPlan.sitesGroupedByDay)) {
        itineraryPlan.sitesGroupedByDay.forEach(day => {
            if (Array.isArray((day as any))) {
                allSites.push(...(day as any));
            } else if ((day as CustomItineraryDay)?.sites) {
                allSites.push(...(day as CustomItineraryDay).sites);
            }
        });
    }
    
    const uniqueSites = [...new Set(allSites)];
    
    travelersData.forEach(traveler => {
        let travelerTotal = 0;
        
        uniqueSites.forEach(site => {
            const ticketPrice = TICKET_PRICES[site];
            if (ticketPrice) {
                const basePrice = traveler.type === 'student' ? ticketPrice.student : ticketPrice.adult;
                const ageFactor = getAgeFactor(traveler.age);
                travelerTotal += basePrice * ageFactor;
            }
        });
        
        result[traveler.type] = Math.round(travelerTotal * 100) / 100;
    });
    
    return result;
}

// حساب النقل
function calculateTransport(params: CustomQuoteParams, travelersData: any[]): Record<string, number> {
    // في التطبيق الحقيقي، سيتم حساب هذا بناءً على خدمات النقل الفعلية
    // هنا نستخدم قيمة افتراضية للتوضيح
    const totalTransportCost = 200; // سعر المركبة
    const totalPassengers = travelersData.length;
    
    const result: Record<string, number> = { adult: 0, student: 0, child: 0 };
    
    travelersData.forEach(traveler => {
        const baseShare = totalTransportCost / totalPassengers;
        const ageFactor = getAgeFactor(traveler.age);
        result[traveler.type] = Math.round(baseShare * ageFactor * 100) / 100;
    });
    
    return result;
}

// حساب المرشد
function calculateGuide(params: CustomQuoteParams, travelersData: any[]): Record<string, number> {
    const { guidedDays = 3 } = params; // قيمة افتراضية
    const totalGuideCost = 30 * guidedDays; // 30 USD يومياً
    const totalPassengers = travelersData.length;
    
    const result: Record<string, number> = { adult: 0, student: 0, child: 0 };
    
    travelersData.forEach(traveler => {
        const baseShare = totalGuideCost / totalPassengers;
        const ageFactor = getAgeFactor(traveler.age);
        result[traveler.type] = Math.round(baseShare * ageFactor * 100) / 100;
    });
    
    return result;
}

// حساب الممثل
function calculateRepresentative(params: CustomQuoteParams, travelersData: any[]): Record<string, number> {
    const { cairoArrivalRepresentative = true, cairoDepartureRepresentative = true } = params;
    
    let repEvents = 0;
    if (cairoArrivalRepresentative) repEvents += 1;
    if (cairoDepartureRepresentative) repEvents += 1;
    
    const totalRepCost = 20 * repEvents; // 20 USD لكل خدمة
    const totalPassengers = travelersData.length;
    
    const result: Record<string, number> = { adult: 0, student: 0, child: 0 };
    
    travelersData.forEach(traveler => {
        const baseShare = totalRepCost / totalPassengers;
        const ageFactor = getAgeFactor(traveler.age);
        result[traveler.type] = Math.round(baseShare * ageFactor * 100) / 100;
    });
    
    return result;
}

// حساب الطيران الداخلي
function calculateDomesticFlights(params: CustomQuoteParams, travelersData: any[]): Record<string, number> {
    const { itineraryPlan } = params;
    const flightSegments = itineraryPlan.flightSectors || 0;
    const flightCostPerSegment = 125; // 125 USD لكل مقطع
    
    const result: Record<string, number> = { adult: 0, student: 0, child: 0 };
    
    travelersData.forEach(traveler => {
        // قاعدة خاصة للطيران الداخلي من PDF: الأطفال 6-12 يدفعون كامل
        const ageFactor = traveler.age < 6 ? 0 : 1;
        result[traveler.type] = Math.round(flightCostPerSegment * flightSegments * ageFactor * 100) / 100;
    });
    
    return result;
}

// حساب المصاريف العامة
function calculateGeneralFees(travelersData: any[]): Record<string, number> {
    const result: Record<string, number> = { adult: 0, student: 0, child: 0 };
    
    travelersData.forEach(traveler => {
        // 60 USD للبالغ، 30 USD للطفل 6-12، 0 لأقل من 6
        if (traveler.age < 6) {
            result[traveler.type] = 0;
        } else if (traveler.age <= 12) {
            result[traveler.type] = 30;
        } else {
            result[traveler.type] = 60;
        }
    });
    
    return result;
}

// حساب الوجبات الاختيارية
function calculateOptionalMeals(params: CustomQuoteParams, travelersData: any[]): Record<string, number> {
    const { optionalLunches = 0 } = params;
    const mealCost = 15; // 15 USD للوجبة
    
    const result: Record<string, number> = { adult: 0, student: 0, child: 0 };
    
    travelersData.forEach(traveler => {
        const ageFactor = traveler.age < 6 ? 0 : (traveler.age <= 12 ? 0.5 : 1);
        result[traveler.type] = Math.round(mealCost * optionalLunches * ageFactor * 100) / 100;
    });
    
    return result;
}

// الدوال القديمة للحفاظ على التوافق (يمكن إزالتها لاحقاً)
export const calculateCustomPackagePrice = (params: CustomQuoteParams): PriceResult => {
  const realPricing = calculateRealPricing(params);
  
  return { 
    totalGroupPrice: Math.round(realPricing.summary.groupTotal), 
    pricePerPerson: Math.round(realPricing.summary.groupTotal / params.travelers) 
  };
};

// export const calculatePriceScenarios = (baseParams: CustomQuoteParams): { summer: SeasonalPricingDetail, winter: SeasonalPricingDetail } => {

//     const summerPricing = calculateRealPricing({ ...baseParams, season: 'summer' });
//     const winterPricing = calculateRealPricing({ ...baseParams, season: 'winter' });
    
//     return {
//         summer: {
//             single: summerPricing.travelers[0]?.final || 0,
//             double: summerPricing.travelers[0]?.final || 0,
//             triple: summerPricing.travelers[0]?.final || 0,
//         },
//         winter: {
//             single: winterPricing.travelers[0]?.final || 0,
//             double: winterPricing.travelers[0]?.final || 0,
//             triple: winterPricing.travelers[0]?.final || 0,
//         }
//     };
// };


export const calculatePriceScenarios = (baseParams: CustomQuoteParams): { 
    summer: SeasonalPricingDetail, 
    winter: SeasonalPricingDetail 
} => {
    // ✅ إنشاء بيانات افتراضية للمسافرين للسيناريوهات الثلاثة
    const createTravelerData = (roomType: 'single' | 'double' | 'triple', count: number) => 
        Array(count).fill({ type: 'adult' as const, age: 30, roomType });

    // ✅ حساب سعر Single (1 مسافر)
    const summerSingleData = createTravelerData('single', 1);
    const summerSinglePricing = calculateRealPricing({ 
        ...baseParams, 
        season: 'summer', 
        travelers: 1 
    });

    const winterSingleData = createTravelerData('single', 1);
    const winterSinglePricing = calculateRealPricing({ 
        ...baseParams, 
        season: 'winter', 
        travelers: 1 
    });

    // ✅ حساب سعر Double (2 مسافرين)
    const summerDoubleData = createTravelerData('double', 2);
    const summerDoublePricing = calculateRealPricing({ 
        ...baseParams, 
        season: 'summer', 
        travelers: 2 
    });

    const winterDoubleData = createTravelerData('double', 2);
    const winterDoublePricing = calculateRealPricing({ 
        ...baseParams, 
        season: 'winter', 
        travelers: 2 
    });

    // ✅ حساب سعر Triple (3 مسافرين)
    const summerTripleData = createTravelerData('triple', 3);
    const summerTriplePricing = calculateRealPricing({ 
        ...baseParams, 
        season: 'summer', 
        travelers: 3 
    });

    const winterTripleData = createTravelerData('triple', 3);
    const winterTriplePricing = calculateRealPricing({ 
        ...baseParams, 
        season: 'winter', 
        travelers: 3 
    });

    return {
        summer: {
            single: Math.round(summerSinglePricing.summary.groupTotal),
            double: Math.round(summerDoublePricing.summary.groupTotal / 2), // السعر للشخص
            triple: Math.round(summerTriplePricing.summary.groupTotal / 3), // السعر للشخص
        },
        winter: {
            single: Math.round(winterSinglePricing.summary.groupTotal),
            double: Math.round(winterDoublePricing.summary.groupTotal / 2), // السعر للشخص
            triple: Math.round(winterTriplePricing.summary.groupTotal / 3), // السعر للشخص
        }
    };
};

// ✅ إضافة دالة مساعدة لإنشاء بيانات المسافرين بشكل صحيح
function createDefaultTravelersData(
    count: number, 
    roomType: 'single' | 'double' | 'triple'
): Array<{ type: 'adult' | 'student' | 'child', age: number, roomType: 'single' | 'double' | 'triple' }> {
    const data = [];
    
    if (roomType === 'single') {
        // Single: شخص واحد في غرفة single
        data.push({ type: 'adult' as const, age: 30, roomType: 'single' });
    } else if (roomType === 'double') {
        // Double: شخصين في غرفة double
        for (let i = 0; i < count; i++) {
            data.push({ type: 'adult' as const, age: 30, roomType: 'double' });
        }
    } else if (roomType === 'triple') {
        // Triple: 3 أشخاص في غرفة triple
        for (let i = 0; i < count; i++) {
            data.push({ type: 'adult' as const, age: 30, roomType: 'triple' });
        }
    }
    
    return data;
}

// ✅ تحديث calculateRealPricing لاستخدام البيانات الافتراضية إذا لم يتم توفيرها
export function calculateRealPricing(params: CustomQuoteParams): PricingResult {
    const { travelers, season, category, itineraryPlan } = params;
    
    // ✅ إنشاء بيانات افتراضية للمسافرين
    let travelersData = createDefaultTravelersData(
        travelers, 
        travelers === 1 ? 'single' : (travelers === 3 ? 'triple' : 'double')
    );

    // 1. حساب الإقامة
    const accommodationTotal = calculateAccommodation(params, travelersData);
    
    // 2. حساب تذاكر الدخول
    const entranceFeesTotal = calculateEntranceFees(params, travelersData);
    
    // 3. حساب النقل
    const transportTotal = calculateTransport(params, travelersData);
    
    // 4. حساب المرشد
    const guideTotal = calculateGuide(params, travelersData);
    
    // 5. حساب الممثل
    const repTotal = calculateRepresentative(params, travelersData);
    
    // 6. حساب الطيران الداخلي
    const flightsTotal = calculateDomesticFlights(params, travelersData);
    
    // 7. المصاريف العامة
    const generalFeesTotal = calculateGeneralFees(travelersData);
    
    // 8. الوجبات الاختيارية
    const mealsTotal = calculateOptionalMeals(params, travelersData);
    
    // جمع كل المكونات لكل مسافر
    const travelersBreakdown = travelersData.map(traveler => {
        const subtotal = 
            accommodationTotal[traveler.type] +
            entranceFeesTotal[traveler.type] +
            transportTotal[traveler.type] +
            guideTotal[traveler.type] +
            repTotal[traveler.type] +
            flightsTotal[traveler.type] +
            generalFeesTotal[traveler.type] +
            mealsTotal[traveler.type];
        
        // إضافة ربح 10% كما في PDF
        const final = Math.round(subtotal * 1.10 * 100) / 100;
        
        return {
            type: traveler.type,
            age: traveler.age,
            roomType: traveler.roomType,
            subtotal,
            final,
            breakdown: {
                accommodation: accommodationTotal[traveler.type],
                entranceFees: entranceFeesTotal[traveler.type],
                transport: transportTotal[traveler.type],
                guide: guideTotal[traveler.type],
                representative: repTotal[traveler.type],
                domesticFlights: flightsTotal[traveler.type],
                generalFees: generalFeesTotal[traveler.type],
                optionalMeals: mealsTotal[traveler.type]
            }
        };
    });
    
    // المجموع النهائي
    const groupTotal = travelersBreakdown.reduce((sum, traveler) => sum + traveler.final, 0);
    const groupSubtotal = travelersBreakdown.reduce((sum, traveler) => sum + traveler.subtotal, 0);
    const profit = groupTotal - groupSubtotal;
    
    return {
        travelers: travelersBreakdown,
        summary: {
            groupSubtotal: Math.round(groupSubtotal * 100) / 100,
            profit: Math.round(profit * 100) / 100,
            groupTotal: Math.round(groupTotal * 100) / 100,
            profitMargin: '10%'
        }
    };
}
