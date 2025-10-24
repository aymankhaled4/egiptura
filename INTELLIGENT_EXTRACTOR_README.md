# 🧠 Intelligent Data Extractor - النظام الذكي المحسن

## 📋 نظرة عامة

تم تطوير نظام `IntelligentDataExtractor` محسن يدعم إنشاء برامج مخصصة بناءً على اختيار المدن والمواقع المحددة. النظام يستخرج البيانات من البرامج الجاهزة في `packages.ts` ويستخدمها لإنشاء برامج مخصصة عالية الجودة.

## 🎯 الميزات الجديدة

### 1. اختيار المدن المحددة
- يمكن للعميل اختيار المدن التي يريد زيارتها
- النظام يدعم: القاهرة، الأقصر، أسوان، الإسكندرية، الكروز النيلي

### 2. اختيار المواقع المحددة
- يمكن تحديد المواقع السياحية المحددة لكل مدينة
- النظام يستخرج الأنشطة والتفاصيل من البرامج الجاهزة

### 3. توزيع ذكي للأيام
- حساب توزيع الأيام بناءً على المدن المختارة
- القاهرة تحصل على الأولوية دائماً
- توزيع متوازن لباقي المدن

## 🚀 كيفية الاستخدام

### النظام المحسن الجديد

```typescript
import { createEnhancedCustomProgram } from './intelligentExtractor';

const customProgram = createEnhancedCustomProgram({
    duration: 8,                    // عدد الأيام
    travelers: 2,                   // عدد المسافرين
    cities: ['cairo', 'luxor'],     // المدن المختارة
    specificSites: {                // المواقع المحددة لكل مدينة
        'cairo': ['gizaPyramidsAndSphinx', 'egyptianMuseum'],
        'luxor': ['karnakTemple', 'valleyOfTheKings']
    },
    season: 'winter',               // الموسم
    category: 'gold',               // الفئة
    language: 'en'                  // اللغة
});
```

### النظام التقليدي (للتوافق)

```typescript
import { createIntelligentCustomProgram } from './intelligentExtractor';

const customProgram = createIntelligentCustomProgram({
    duration: 8,
    travelers: 2,
    destinations: ['cairo', 'luxor', 'cruise'],
    season: 'winter',
    category: 'gold',
    language: 'en'
});
```

## 🏗️ هيكل النظام

### الدوال الرئيسية

1. **`createEnhancedCustomProgram`** - النظام المحسن الجديد
2. **`createIntelligentCustomProgram`** - النظام التقليدي المحسن
3. **`findMatchingReadyProgram`** - البحث عن برنامج جاهز مطابق

### الدوال المساعدة

- **`calculateDaysDistribution`** - حساب توزيع الأيام
- **`createEnhancedItinerary`** - إنشاء البرنامج اليومي المحسن
- **`createCityDays`** - إنشاء أيام مدينة محددة
- **`selectSitesForDay`** - اختيار المواقع لكل يوم
- **`extractCityData`** - استخراج بيانات المدينة من البرامج الجاهزة

## 🎨 الميزات المتقدمة

### 1. استخراج البيانات الذكي
- يستخرج الفنادق من البرامج الجاهزة
- يستخرج الأنشطة والمواقع السياحية
- يستخرج أوصاف المدن والمواقع

### 2. إنشاء البرنامج اليومي
- يوم وصول مفصل
- أيام المدن مع أنشطة مخصصة
- يوم مغادرة مفصل
- أيام حرة عند الحاجة

### 3. إدارة أماكن الإقامة
- البحث عن أفضل فندق لكل مدينة
- استخدام فنادق من البرامج الجاهزة
- فنادق افتراضية عالية الجودة

### 4. استخراج المواقع السياحية
- كشف المواقع من النصوص
- ربط المواقع بالأنشطة
- دعم جميع المواقع المدعومة

## 📊 مثال كامل

```typescript
// إنشاء برنامج مخصص متقدم
const advancedProgram = createEnhancedCustomProgram({
    duration: 10,
    travelers: 4,
    cities: ['cairo', 'luxor', 'aswan', 'alexandria'],
    specificSites: {
        'cairo': [
            'gizaPyramidsAndSphinx',
            'egyptianMuseum',
            'khanElKhalili',
            'citadelOfSaladin'
        ],
        'luxor': [
            'karnakTemple',
            'valleyOfTheKings',
            'hatshepsutTemple',
            'luxorTemple'
        ],
        'aswan': [
            'philaeTemple',
            'abuSimbelTemples',
            'highDam'
        ],
        'alexandria': [
            'qaitbayCitadel',
            'alexandriaNationalMuseum',
            'komElShoqafaCatacombs'
        ]
    },
    season: 'winter',
    category: 'diamond',
    language: 'ar'
});

console.log('اسم البرنامج:', advancedProgram.name.ar);
console.log('المدة:', advancedProgram.duration);
console.log('المدن:', Object.keys(advancedProgram.quoteParams?.itineraryPlan?.nights || {}));
console.log('المواقع:', advancedProgram.quoteParams?.itineraryPlan?.sites);
```

## 🔧 التخصيص المتقدم

### إضافة مواقع جديدة
```typescript
// في دالة getSiteKeywords
const keywordsMap = {
    'newSite': ['keyword1', 'keyword2', 'كلمة مفتاحية']
};
```

### إضافة أنشطة مخصصة
```typescript
// في دالة getSiteActivity
const siteActivities = {
    'newSite': {
        es: 'نشاط جديد باللغة الإسبانية',
        en: 'New activity in English',
        ar: 'نشاط جديد باللغة العربية'
    }
};
```

## 🎯 الفوائد

1. **جودة عالية**: يستخدم بيانات من البرامج الجاهزة المحترفة
2. **مرونة كاملة**: يدعم اختيار المدن والمواقع المحددة
3. **سهولة الاستخدام**: واجهة بسيطة وواضحة
4. **دعم متعدد اللغات**: العربية، الإنجليزية، الإسبانية
5. **توافق مع النظام القديم**: لا يكسر الكود الموجود

## 🚀 التطوير المستقبلي

- إضافة المزيد من المدن والمواقع
- تحسين خوارزمية توزيع الأيام
- إضافة دعم للأنشطة الموسمية
- تحسين استخراج البيانات من البرامج الجاهزة