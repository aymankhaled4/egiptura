import { knowledgeBase } from './knowledgeBase';
import type {
  CustomQuoteParams,
  PriceResult,
  SupportedCity,
  SupportedSite,
  TransportService,
  SeasonalPricingDetail,
  CustomItineraryDay,
} from '../types';
import { normalizeSiteKey } from './siteAliases';

type TransportServiceType = 'halfDay' | 'fullDay' | 'airport' | 'intercity';
type VehicleType = 'limousine' | 'microbus' | 'minibus' | 'bus';

// ✅ واجهات جديدة بناءً على PDF
export interface TravelerInput {
  age: number;
  isStudent: boolean;
  roomType: 'single' | 'double' | 'triple';
}

export interface TravelerPricing {
  age: number;
  isStudent: boolean;
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

// ✅ عوامل العمر من PDF
function getAgeFactor(age: number): number {
  if (age < 6) return 0;
  if (age <= 12) return 0.5;
  return 1;
}

// ✅ عوامل نوع الغرفة من PDF
function getRoomFactor(roomType: string): number {
  switch (roomType) {
    case 'single': return 1.70;
    case 'triple': return 0.90;
    default: return 1.00;
  }
}

// ✅ الأسعار الحقيقية من PDF
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

// ✅ دالة حساب الإقامة الصحيحة 100%
function calculateAccommodation(
  params: CustomQuoteParams, 
  travelersData: TravelerInput[]
): Record<number, number> {
  const { season, category, itineraryPlan } = params;
  const result: Record<number, number> = {};
  
  travelersData.forEach((traveler, index) => {
    let travelerTotal = 0;
    
    for (const [city, nights] of Object.entries(itineraryPlan.nights)) {
      if (!nights || nights === 0) continue;
      
      const cityKey = city as keyof typeof ACCOMMODATION_RATES;
      if (ACCOMMODATION_RATES[cityKey]) {
        const baseRate = ACCOMMODATION_RATES[cityKey][category][season];
        const roomFactor = getRoomFactor(traveler.roomType);
        const ageFactor = getAgeFactor(traveler.age);
        
        // ✅ حسب PDF: base × occupancy_factor × age_factor × nights
        travelerTotal += baseRate * roomFactor * ageFactor * nights;
      }
    }
    
    result[index] = Math.round(travelerTotal * 100) / 100;
  });
  
  return result;
}

// ✅ دالة حساب تذاكر الدخول الصحيحة
function calculateEntranceFees(
  params: CustomQuoteParams, 
  travelersData: TravelerInput[]
): Record<number, number> {
  const { itineraryPlan } = params;
  const result: Record<number, number> = {};
  
  // جمع كل المواقع
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
  
  travelersData.forEach((traveler, index) => {
    let travelerTotal = 0;
    
    uniqueSites.forEach(site => {
      const ticketPrice = knowledgeBase.internalCosts.tickets[site];
      if (ticketPrice) {
        const basePrice = traveler.isStudent && ticketPrice.student 
          ? ticketPrice.student 
          : ticketPrice.adult;
        const ageFactor = getAgeFactor(traveler.age);
        travelerTotal += basePrice * ageFactor;
      }
    });
    
    result[index] = Math.round(travelerTotal * 100) / 100;
  });
  
  return result;
}

// ✅ دالة حساب النقل الصحيحة - تستخدم الجداول الفعلية
function calculateTransport(
  params: CustomQuoteParams, 
  travelersData: TravelerInput[]
): Record<number, number> {
  const { transportServices } = params;
  const result: Record<number, number> = {};
  
  if (!transportServices || transportServices.length === 0) {
    travelersData.forEach((_, index) => { result[index] = 0; });
    return result;
  }
  
  const totalPassengers = travelersData.length;
  let totalTransportCost = 0;
  
  // ✅ حساب التكلفة الفعلية من الجداول
  transportServices.forEach(svc => {
    const cityKey = svc.city as keyof typeof knowledgeBase.internalCosts.transport.pricelist;
    const typeKey = svc.type as TransportServiceType;
    const qty = Math.max(1, svc.quantity ?? 1);
    const vType = (svc.vehicleType as VehicleType) || pickVehicleType(totalPassengers, svc.city);

    if (typeKey === 'intercity') {
      const toCity = svc.toCity as any;
      const inter = knowledgeBase.internalCosts.transport.pricelist?.[cityKey]?.intercity?.[toCity]?.[vType];
      if (inter) totalTransportCost += inter * qty;
    } else {
      const price = knowledgeBase.internalCosts.transport.pricelist?.[cityKey]?.[typeKey]?.[vType] ?? 0;
      totalTransportCost += price * qty;
    }
  });
  
  // ✅ توزيع التكلفة حسب قواعد العمر
  travelersData.forEach((traveler, index) => {
    const baseShare = totalTransportCost / totalPassengers;
    const ageFactor = getAgeFactor(traveler.age);
    result[index] = Math.round(baseShare * ageFactor * 100) / 100;
  });
  
  return result;
}

// ✅ اختيار نوع المركبة حسب العدد
function pickVehicleType(travelers: number, city?: SupportedCity): VehicleType {
  if (city === 'cairo') return travelers <= 16 ? 'microbus' : travelers <= 25 ? 'minibus' : 'bus';
  if (travelers <= 2) return 'limousine';
  if (travelers <= 16) return 'microbus';
  if (travelers <= 25) return 'minibus';
  return 'bus';
}

// ✅ حساب المرشد الصحيح
function calculateGuide(
  params: CustomQuoteParams, 
  travelersData: TravelerInput[]
): Record<number, number> {
  const result: Record<number, number> = {};
  
  // ✅ حساب أيام المرشد الفعلية
  let guidedDays = params.guidedDays;
  if (guidedDays == null) {
    if (Array.isArray(params.itineraryPlan.sitesGroupedByDay)) {
      guidedDays = params.itineraryPlan.sitesGroupedByDay.filter(
        d => (d.sites?.length ?? 0) > 0
      ).length;
    } else {
      guidedDays = 0;
    }
  }
  
  const totalGuideCost = 30 * guidedDays;
  const totalPassengers = travelersData.length;
  
  travelersData.forEach((traveler, index) => {
    const baseShare = totalGuideCost / totalPassengers;
    const ageFactor = getAgeFactor(traveler.age);
    result[index] = Math.round(baseShare * ageFactor * 100) / 100;
  });
  
  return result;
}

// ✅ حساب المندوب
function calculateRepresentative(
  params: CustomQuoteParams, 
  travelersData: TravelerInput[]
): Record<number, number> {
  const { cairoArrivalRepresentative = true, cairoDepartureRepresentative = true } = params;
  const result: Record<number, number> = {};
  
  let repEvents = 0;
  if (cairoArrivalRepresentative) repEvents += 1;
  if (cairoDepartureRepresentative) repEvents += 1;
  
  const totalRepCost = 20 * repEvents;
  const totalPassengers = travelersData.length;
  
  travelersData.forEach((traveler, index) => {
    const baseShare = totalRepCost / totalPassengers;
    const ageFactor = getAgeFactor(traveler.age);
    result[index] = Math.round(baseShare * ageFactor * 100) / 100;
  });
  
  return result;
}

// ✅ حساب الطيران الداخلي - القاعدة الخاصة من PDF
function calculateDomesticFlights(
  params: CustomQuoteParams, 
  travelersData: TravelerInput[]
): Record<number, number> {
  const { itineraryPlan } = params;
  const flightSegments = itineraryPlan.flightSectors || 0;
  const flightCostPerSegment = 125;
  const result: Record<number, number> = {};
  
  travelersData.forEach((traveler, index) => {
    // ✅ قاعدة خاصة: الأطفال 6-12 يدفعون كامل السعر للطيران
    const ageFactor = traveler.age < 6 ? 0 : 1;
    result[index] = Math.round(flightCostPerSegment * flightSegments * ageFactor * 100) / 100;
  });
  
  return result;
}

// ✅ حساب المصاريف العامة
function calculateGeneralFees(travelersData: TravelerInput[]): Record<number, number> {
  const result: Record<number, number> = {};
  
  travelersData.forEach((traveler, index) => {
    if (traveler.age < 6) {
      result[index] = 0;
    } else if (traveler.age <= 12) {
      result[index] = 30;
    } else {
      result[index] = 60;
    }
  });
  
  return result;
}

// ✅ حساب الوجبات الاختيارية
function calculateOptionalMeals(
  params: CustomQuoteParams, 
  travelersData: TravelerInput[]
): Record<number, number> {
  const { optionalLunches = 0 } = params;
  const mealCost = 15;
  const result: Record<number, number> = {};
  
  travelersData.forEach((traveler, index) => {
    const ageFactor = traveler.age < 6 ? 0 : (traveler.age <= 12 ? 0.5 : 1);
    result[index] = Math.round(mealCost * optionalLunches * ageFactor * 100) / 100;
  });
  
  return result;
}

// ✅ الدالة الرئيسية المطابقة 100% للـ PDF
export function calculateRealPricing(
  params: CustomQuoteParams,
  travelersInput?: TravelerInput[]
): PricingResult {
  const { travelers } = params;
  
  // ✅ إنشاء بيانات المسافرين - افتراضية أو من المدخلات
  const travelersData: TravelerInput[] = travelersInput || 
    Array(travelers).fill(null).map(() => ({ 
      age: 30, 
      isStudent: false, 
      roomType: travelers === 1 ? 'single' as const : 
                travelers === 3 ? 'triple' as const : 
                'double' as const
    }));

  // ✅ حساب كل المكونات
  const accommodation = calculateAccommodation(params, travelersData);
  const entranceFees = calculateEntranceFees(params, travelersData);
  const transport = calculateTransport(params, travelersData);
  const guide = calculateGuide(params, travelersData);
  const representative = calculateRepresentative(params, travelersData);
  const domesticFlights = calculateDomesticFlights(params, travelersData);
  const generalFees = calculateGeneralFees(travelersData);
  const optionalMeals = calculateOptionalMeals(params, travelersData);
  
  // ✅ جمع كل المكونات لكل مسافر
  const travelersBreakdown: TravelerPricing[] = travelersData.map((traveler, i) => {
    const subtotal = 
      accommodation[i] +
      entranceFees[i] +
      transport[i] +
      guide[i] +
      representative[i] +
      domesticFlights[i] +
      generalFees[i] +
      optionalMeals[i];
    
    // ✅ إضافة ربح 10% كما في PDF
    const final = Math.round(subtotal * 1.10 * 100) / 100;
    
    return {
      age: traveler.age,
      isStudent: traveler.isStudent,
      roomType: traveler.roomType,
      subtotal,
      final,
      breakdown: {
        accommodation: accommodation[i],
        entranceFees: entranceFees[i],
        transport: transport[i],
        guide: guide[i],
        representative: representative[i],
        domesticFlights: domesticFlights[i],
        generalFees: generalFees[i],
        optionalMeals: optionalMeals[i]
      }
    };
  });
  
  // ✅ المجموع النهائي
  const groupSubtotal = travelersBreakdown.reduce((sum, t) => sum + t.subtotal, 0);
  const groupTotal = travelersBreakdown.reduce((sum, t) => sum + t.final, 0);
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

// ✅ دالة السيناريوهات المصححة 100%
export const calculatePriceScenarios = (baseParams: CustomQuoteParams): { 
  summer: SeasonalPricingDetail, 
  winter: SeasonalPricingDetail 
} => {
  // ✅ حساب Single (1 مسافر بغرفة single)
  const summerSingle = calculateRealPricing(
    { ...baseParams, season: 'summer', travelers: 1 },
    [{ age: 30, isStudent: false, roomType: 'single' }]
  );
  
  const winterSingle = calculateRealPricing(
    { ...baseParams, season: 'winter', travelers: 1 },
    [{ age: 30, isStudent: false, roomType: 'single' }]
  );
  
  // ✅ حساب Double (2 مسافرين بغرفة double)
  const summerDouble = calculateRealPricing(
    { ...baseParams, season: 'summer', travelers: 2 },
    [
      { age: 30, isStudent: false, roomType: 'double' },
      { age: 30, isStudent: false, roomType: 'double' }
    ]
  );
  
  const winterDouble = calculateRealPricing(
    { ...baseParams, season: 'winter', travelers: 2 },
    [
      { age: 30, isStudent: false, roomType: 'double' },
      { age: 30, isStudent: false, roomType: 'double' }
    ]
  );
  
  // ✅ حساب Triple (3 مسافرين بغرفة triple)
  const summerTriple = calculateRealPricing(
    { ...baseParams, season: 'summer', travelers: 3 },
    [
      { age: 30, isStudent: false, roomType: 'triple' },
      { age: 30, isStudent: false, roomType: 'triple' },
      { age: 30, isStudent: false, roomType: 'triple' }
    ]
  );
  
  const winterTriple = calculateRealPricing(
    { ...baseParams, season: 'winter', travelers: 3 },
    [
      { age: 30, isStudent: false, roomType: 'triple' },
      { age: 30, isStudent: false, roomType: 'triple' },
      { age: 30, isStudent: false, roomType: 'triple' }
    ]
  );
  
  return {
    summer: {
      single: Math.round(summerSingle.summary.groupTotal),
      double: Math.round(summerDouble.summary.groupTotal / 2),
      triple: Math.round(summerTriple.summary.groupTotal / 3),
    },
    winter: {
      single: Math.round(winterSingle.summary.groupTotal),
      double: Math.round(winterDouble.summary.groupTotal / 2),
      triple: Math.round(winterTriple.summary.groupTotal / 3),
    }
  };
};

// ✅ دالة قديمة للتوافق
export const calculateCustomPackagePrice = (params: CustomQuoteParams): PriceResult => {
  const realPricing = calculateRealPricing(params);
  return { 
    totalGroupPrice: Math.round(realPricing.summary.groupTotal), 
    pricePerPerson: Math.round(realPricing.summary.groupTotal / params.travelers) 
  };
};

// ✅ دوال مساعدة قديمة للتوافق
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
  
  return quote;
};

export function fillMissingFields(quote: any, langUI: any) {
  quote.category = (quote.category || "gold").toString().toLowerCase();
  quote.season = (quote.season || "winter").toString().toLowerCase();
  quote.itineraryPlan = quote.itineraryPlan || {};
  quote.itineraryPlan.nights = quote.itineraryPlan.nights || {};
  quote.itineraryPlan.flightSectors = quote.itineraryPlan.flightSectors ?? 0;
  
  if (!Array.isArray(quote.itineraryPlan.sitesGroupedByDay) || 
      quote.itineraryPlan.sitesGroupedByDay.length === 0) {
    quote.itineraryPlan.sitesGroupedByDay = [
      { day: 1, city: "Cairo", sites: [], description: langUI?.arrivalDay ?? "Arrival & transfer" }
    ];
  }
  
  return quote;
}