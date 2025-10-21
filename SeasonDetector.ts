export type Season = 'summer' | 'winter';

interface MonthData {
    season: Season;
    names: {
        en: string[];
        es: string[];
        ar: string[];
    };
}

const MONTHS_DATA: MonthData[] = [
    {
        season: 'winter',
        names: {
            en: ['january', 'jan'],
            es: ['enero', 'ene'],
            ar: ['يناير', 'كانون الثاني']
        }
    },
    {
        season: 'winter',
        names: {
            en: ['february', 'feb'],
            es: ['febrero', 'feb'],
            ar: ['فبراير', 'شباط']
        }
    },
    {
        season: 'winter',
        names: {
            en: ['march', 'mar'],
            es: ['marzo', 'mar'],
            ar: ['مارس', 'آذار']
        }
    },
    {
        season: 'winter',
        names: {
            en: ['april', 'apr'],
            es: ['abril', 'abr'],
            ar: ['أبريل', 'نيسان', 'ابريل']
        }
    },
    {
        season: 'summer',
        names: {
            en: ['may'],
            es: ['mayo'],
            ar: ['مايو', 'أيار']
        }
    },
    {
        season: 'summer',
        names: {
            en: ['june', 'jun'],
            es: ['junio', 'jun'],
            ar: ['يونيو', 'حزيران', 'يونيه']
        }
    },
    {
        season: 'summer',
        names: {
            en: ['july', 'jul'],
            es: ['julio', 'jul'],
            ar: ['يوليو', 'تموز', 'يوليه']
        }
    },
    {
        season: 'summer',
        names: {
            en: ['august', 'aug'],
            es: ['agosto', 'ago'],
            ar: ['أغسطس', 'آب', 'اغسطس']
        }
    },
    {
        season: 'summer',
        names: {
            en: ['september', 'sep', 'sept'],
            es: ['septiembre', 'sep', 'sept'],
            ar: ['سبتمبر', 'أيلول']
        }
    },
    {
        season: 'winter',
        names: {
            en: ['october', 'oct'],
            es: ['octubre', 'oct'],
            ar: ['أكتوبر', 'تشرين الأول', 'اكتوبر']
        }
    },
    {
        season: 'winter',
        names: {
            en: ['november', 'nov'],
            es: ['noviembre', 'nov'],
            ar: ['نوفمبر', 'تشرين الثاني']
        }
    },
    {
        season: 'winter',
        names: {
            en: ['december', 'dec'],
            es: ['diciembre', 'dic'],
            ar: ['ديسمبر', 'كانون الأول']
        }
    }
];

// 🔍 الكلمات المفتاحية للموسم المباشر
const SEASON_KEYWORDS = {
    summer: {
        en: ['summer', 'hot', 'warm'],
        es: ['verano', 'calor', 'cálido', 'calido'],
        ar: ['صيف', 'حار', 'صيفي', 'الصيف']
    },
    winter: {
        en: ['winter', 'cold', 'cool'],
        es: ['invierno', 'frío', 'frio', 'fresco'],
        ar: ['شتاء', 'بارد', 'شتوي', 'الشتاء']
    }
};

/**
 * 🌡️ اكتشاف الموسم من النص
 * @param text - النص المدخل من المستخدم
 * @returns الموسم المكتشف أو null إذا لم يتم العثور عليه
 */
export function detectSeasonFromText(text: string): Season | null {
    const lowerText = text.toLowerCase().trim();

    console.log('[seasonDetector] Analyzing text:', text);

    // 1️⃣ البحث عن الموسم المباشر (summer/winter)
    for (const [season, keywords] of Object.entries(SEASON_KEYWORDS)) {
        const allKeywords = [
            ...keywords.en,
            ...keywords.es,
            ...keywords.ar
        ];

        for (const keyword of allKeywords) {
            if (lowerText.includes(keyword.toLowerCase())) {
                console.log(`[seasonDetector] ✅ Direct season found: ${season} (keyword: ${keyword})`);
                return season as Season;
            }
        }
    }

    // 2️⃣ البحث عن اسم الشهر
    for (const monthData of MONTHS_DATA) {
        const allMonthNames = [
            ...monthData.names.en,
            ...monthData.names.es,
            ...monthData.names.ar
        ];

        for (const monthName of allMonthNames) {
            if (lowerText.includes(monthName.toLowerCase())) {
                console.log(`[seasonDetector] ✅ Month found: ${monthName} → Season: ${monthData.season}`);
                return monthData.season;
            }
        }
    }

    console.log('[seasonDetector] ⚠️ No season detected');
    return null;
}

/**
 * 🗓️ الحصول على اسم الموسم المترجم
 * @param season - الموسم
 * @param language - اللغة
 * @returns اسم الموسم بالللغة المطلوبة
 */
export function getSeasonName(season: Season, language: 'en' | 'es' | 'ar'): string {
    const seasonNames = {
        summer: {
            en: 'Summer',
            es: 'Verano',
            ar: 'الصيف'
        },
        winter: {
            en: 'Winter',
            es: 'Invierno',
            ar: 'الشتاء'
        }
    };

    return seasonNames[season][language];
}

/**
 * 📅 الحصول على قائمة الشهور للموسم
 * @param season - الموسم
 * @param language - اللغة
 * @returns قائمة أسماء الشهور
 */
export function getMonthsForSeason(season: Season, language: 'en' | 'es' | 'ar'): string[] {
    return MONTHS_DATA
        .filter(month => month.season === season)
        .map(month => month.names[language][0]);
}

/**
 * 🔍 استخراج معلومات الموسم الكاملة من النص
 * @param text - النص المدخل
 * @returns كائن يحتوي على الموسم والشهر المذكور إن وُجد
 */
export function extractSeasonInfo(text: string): {
    season: Season | null;
    mentionedMonth: string | null;
    isExplicitSeason: boolean;
} {
    const lowerText = text.toLowerCase().trim();
    let season: Season | null = null;
    let mentionedMonth: string | null = null;
    let isExplicitSeason = false;

    // البحث عن الموسم المباشر
    for (const [seasonKey, keywords] of Object.entries(SEASON_KEYWORDS)) {
        const allKeywords = [
            ...keywords.en,
            ...keywords.es,
            ...keywords.ar
        ];

        for (const keyword of allKeywords) {
            if (lowerText.includes(keyword.toLowerCase())) {
                season = seasonKey as Season;
                isExplicitSeason = true;
                break;
            }
        }
        if (season) break;
    }

    // البحث عن الشهر
    for (const monthData of MONTHS_DATA) {
        const allMonthNames = [
            ...monthData.names.en,
            ...monthData.names.es,
            ...monthData.names.ar
        ];

        for (const monthName of allMonthNames) {
            if (lowerText.includes(monthName.toLowerCase())) {
                mentionedMonth = monthName;
                if (!season) {
                    season = monthData.season;
                }
                break;
            }
        }
        if (mentionedMonth) break;
    }

    return {
        season,
        mentionedMonth,
        isExplicitSeason
    };
}

/**
 * ✅ التحقق من صحة الموسم
 * @param value - القيمة المراد التحقق منها
 * @returns true إذا كانت القيمة موسم صحيح
 */
export function isValidSeason(value: any): value is Season {
    return value === 'summer' || value === 'winter';
}

/**
 * @returns
 */
export function getCurrentSeason(): Season {
    const now = new Date();
    const month = now.getMonth() + 1;

    if (month >= 5 && month <= 9) {
        return 'summer';
    } else {
        return 'winter';
    }
}