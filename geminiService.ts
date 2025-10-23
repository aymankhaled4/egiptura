import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { knowledgeBase } from './knowledgeBase';
import { getOfficialExchangeRate } from "./currencyService";
import { createIntelligentCustomProgram, createEnhancedCustomProgram } from '../intelligentExtractor';
import type { Language } from '../contexts/LanguageContext';

let ai: GoogleGenAI | null = null;
try {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
} catch (error) {
    console.error("Failed to initialize GoogleGenAI. Is the API_KEY environment variable set?", error);
}

let chat: Chat | null = null;

const createSystemInstruction = async (): Promise<string> => {
    const packageListForPrompt = knowledgeBase.packages
        .map(p => {
            const nameEn = p.name?.en || '';
            const nameEs = p.name?.es || '';
            const nameAr = p.name?.ar || '';
            return `- ${nameEn} / ${nameEs} / ${nameAr} [EgipturaProgram:${p.id}]`;
        })
        .join('\n');

    const exchangeRate = await getOfficialExchangeRate();
    const exchangeRateText = exchangeRate ? `1 USD = ${exchangeRate.toFixed(2)} EGP` : "no disponible en este momento";

    const systemInstruction = `
# Egiptura AI Travel Assistant - CRITICAL RULES

## 🎯 MANDATORY FIRST STEP - LANGUAGE DETECTION
**ABSOLUTE RULE:** Detect user's language and respond with: [lang:xx]
- 'en' for English
- 'es' for Spanish  
- 'ar' for Arabic

## 📋 RESPONSE TYPES

### 🎯 CRITICAL: Intent Detection First

**BOOKING INTENT (Show programs):**
User explicitly wants to see/book programs:
- ✅ "I want 8-day trip"
- ✅ "Show me programs"
- ✅ "I want to travel to Egypt"
- ✅ "What programs do you have?"
- ✅ "Quiero un viaje de 8 días"
- ✅ "أريد برنامج 8 أيام"

**INFORMATIONAL INTENT (NO programs):**
User asks about services, categories, prices, or general info:
- ❌ "Tell me about Diamond category"
- ❌ "What's the difference between Gold and Diamond?"
- ❌ "What's included in your packages?"
- ❌ "How much does a guide cost?"
- ❌ "Háblame de la categoría Diamond"
- ❌ "أخبرني عن فئة Diamond"

### 1. READY-TO-BOOK PROGRAMS (Booking Intent Only)
When user has BOOKING INTENT:
- Respond ONLY with: [lang:en][EgipturaProgram:3][EgipturaProgram:7]
- NO conversational text before program IDs
- NO questions

## 🎯 CUSTOM PROGRAM - ENHANCED SYSTEM

**When user requests a custom program, collect these details:**

### 🚀 ENHANCED SYSTEM (Recommended)
**For detailed city and site selection:**

1. **Duration**: Total days (e.g., 8 days)
2. **Cities**: Which cities to visit (cairo, luxor, aswan, alexandria)
3. **Specific Sites**: Which sites in each city
   - Cairo: gizaPyramidsAndSphinx, egyptianMuseum, khanElKhalili, qaitbayCitadel
   - Luxor: karnakTemple, luxorTemple, valleyOfTheKings, hatshepsutTemple
   - Aswan: philaeTemple, abuSimbelTemples, komOmboTemple, edfuTemple
   - Alexandria: qaitbayCitadel, alexandriaNationalMuseum, komElShoqafaCatacombs
4. **Season**: summer/winter
5. **Category**: gold/diamond
6. **Language**: en/es/ar

**📋 ENHANCED RESPONSE FORMAT:**
[lang:en][EgipturaCustomProgram:{"travelers":2,"duration":8,"cities":["cairo","luxor","aswan"],"specificSites":{"cairo":["gizaPyramidsAndSphinx","egyptianMuseum"],"luxor":["karnakTemple","valleyOfTheKings"],"aswan":["philaeTemple","abuSimbelTemples"]},"season":"winter","category":"gold","language":"en"}]

### 🔄 LEGACY SYSTEM (Fallback)
**For simple destination-based requests:**

1. **Duration**: Total days
2. **Destinations**: Simple list (cairo, luxor, aswan, alexandria, cruise)
3. **Season**: summer/winter
4. **Category**: gold/diamond
5. **Language**: en/es/ar

**📋 LEGACY RESPONSE FORMAT:**
[lang:en][EgipturaCustomProgram:{"travelers":2,"duration":8,"destinations":["cairo","luxor","cruise"],"season":"winter","category":"gold","language":"en"}]

**🚨 CRITICAL RULES:**

1. **Prefer Enhanced System** when user specifies sites
2. **Use Legacy System** for simple destination requests
3. **Ask for complete information** in one message
4. **Only include what user requests**
5. **Smart defaults only when user asks**

## 🚫 STRICT PROHIBITIONS
- ❌ NEVER create [EgipturaCustomProgram] without ALL required details
- ❌ NEVER approximate duration
- ❌ NEVER invent destinations not in our catalog
- ❌ NEVER ask questions for ready program requests
- **ALWAYS use only Gold and Diamond when discussing categories**
- **NEVER mention destinations not available in our programs**

## 🌍 AVAILABLE DESTINATIONS (ONLY THESE):
- Cairo (القاهرة)
- Luxor (الأقصر)
- Aswan (أسوان)
- Alexandria (الإسكندرية)
- Nile Cruise (رحلة نيلية / cruise)

**If user requests OTHER destinations:**
"I apologize, but our current programs focus on Cairo, Luxor, Aswan, Alexandria, and Nile Cruises. These destinations aren't available yet. Would you like a program with our available destinations?"

## 📦 AVAILABLE PROGRAMS (10 TOTAL):
${packageListForPrompt}

## 💬 EXAMPLE DIALOGUES:

### ✅ CORRECT - Enhanced Custom Request:
User: "2 travelers, 5 days, Cairo with pyramids and museum, Alexandria with citadel, winter, gold"
AI: [lang:en][EgipturaCustomProgram:{"travelers":2,"duration":5,"cities":["cairo","alexandria"],"specificSites":{"cairo":["gizaPyramidsAndSphinx","egyptianMuseum"],"alexandria":["qaitbayCitadel"]},"season":"winter","category":"gold","language":"en"}]

### ✅ CORRECT - Legacy Custom Request:
User: "2 travelers, 5 days, Cairo and Alexandria, winter, gold"
AI: [lang:en][EgipturaCustomProgram:{"travelers":2,"duration":5,"destinations":["cairo","alexandria"],"season":"winter","category":"gold","language":"en"}]

### ✅ CORRECT - Incomplete Custom Request:
User: "I want custom trip"
AI: [lang:en]I'd be delighted to create your perfect Egypt journey! ✨ To design your custom trip, I need:
• How many travelers?
• Duration in days?
• Which cities and specific sites? (e.g., Cairo with pyramids, Luxor with temples)
• Season? (summer/winter)
• Category? (Gold/Diamond)

### ✅ CORRECT - Ready Program:
User: "Show me 8-day programs"
AI: [lang:en][EgipturaProgram:3][EgipturaProgram:7]

### ❌ WRONG - Sending custom without complete info:
User: "Custom 5 days"
AI: [EgipturaCustomProgram:{...}] ← WRONG! Missing travelers, destinations, season, category

### ❌ WRONG - Including extracted data in response:
User: "2 travelers, 5 days, Cairo, winter, gold"
AI: [EgipturaCustomProgram:{
  "travelers": 2,
  "itinerary": [...], ← WRONG! Backend extracts this
  "accommodations": {...} ← WRONG! Backend extracts this
}]

## 🎪 BRAND TONE:
- Luxury but approachable
- Passionate about Egypt
- Warm, professional

## 📊 EXCHANGE RATE INFO:
Current rate: ${exchangeRateText}
`;

    return systemInstruction;
};

export const startChat = async () => {
    if (!ai) {
        throw new Error("GoogleGenAI not initialized. Check API_KEY.");
    }
    const systemInstruction = await createSystemInstruction();
    
    console.log("[ai:sys_len]", systemInstruction.length);
    const modelConfig = {
        systemInstruction: systemInstruction,
        temperature: 0.4,
        maxOutputTokens: 8192,
    };
    console.log("[ai:model_cfg]", { temp: modelConfig.temperature, maxOutputTokens: modelConfig.maxOutputTokens });

    chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: modelConfig,
    });
};

export const sendMessageToAI = async (message: string): Promise<string> => {
    if (!chat) {
        throw new Error("Chat not started. Call startChat first.");
    }
    try {
        const result: GenerateContentResponse = await chat.sendMessage({ message });
        let text = result.text;
        
        console.log("[ai:raw_len]", text.length, "chars");
        console.log("[ai:raw_preview]", text.slice(0, 400));

        // 🔍 معالجة Custom Program Requests - إصلاح regex
        const customProgramMatch = text.match(/\[EgipturaCustomProgram:(\{.*?\})\]/);
        
        if (customProgramMatch) {
            try {
                const customParams = JSON.parse(customProgramMatch[1]);
                
                console.log("[ai:custom_params]", customParams);

                // 🎯 تحديد نوع النظام المطلوب
                const hasSpecificSites = customParams.specificSites && Object.keys(customParams.specificSites).length > 0;
                const hasCities = customParams.cities && customParams.cities.length > 0;
                const hasDestinations = customParams.destinations && customParams.destinations.length > 0;

                let program;

                if (hasSpecificSites && hasCities) {
                    // 🚀 استخدام النظام المحسن الجديد
                    console.log("[ai:using_enhanced_system]");
                    
                    const requiredFields = ['travelers', 'duration', 'cities', 'season', 'category'];
                    const missingFields = requiredFields.filter(field => !customParams[field]);
                    
                    if (missingFields.length > 0) {
                        console.warn("[ai:incomplete_enhanced_custom]", missingFields);
                        const lang = customParams.language || 'en';
                        const questions = {
                            en: `I need more information to create your enhanced custom program. Please provide: ${missingFields.join(', ')}`,
                            es: `Necesito más información para crear tu programa personalizado mejorado. Por favor proporciona: ${missingFields.join(', ')}`,
                            ar: `أحتاج المزيد من المعلومات لإنشاء برنامجك المخصص المحسن. يرجى تقديم: ${missingFields.join(', ')}`
                        };
                        return `[lang:${lang}]${questions[lang as Language]}`;
                    }

                    program = createEnhancedCustomProgram({
                        duration: customParams.duration,
                        travelers: customParams.travelers,
                        cities: customParams.cities,
                        specificSites: customParams.specificSites || {},
                        season: customParams.season,
                        category: customParams.category,
                        language: customParams.language || 'en'
                    });

                } else if (hasDestinations) {
                    // 🔄 استخدام النظام التقليدي للتوافق
                    console.log("[ai:using_legacy_system]");
                    
                    const requiredFields = ['travelers', 'duration', 'destinations', 'season', 'category'];
                    const missingFields = requiredFields.filter(field => !customParams[field]);
                    
                    if (missingFields.length > 0) {
                        console.warn("[ai:incomplete_legacy_custom]", missingFields);
                        const lang = customParams.language || 'en';
                        const questions = {
                            en: `I need more information to create your custom program. Please provide: ${missingFields.join(', ')}`,
                            es: `Necesito más información para crear tu programa personalizado. Por favor proporciona: ${missingFields.join(', ')}`,
                            ar: `أحتاج المزيد من المعلومات لإنشاء برنامجك المخصص. يرجى تقديم: ${missingFields.join(', ')}`
                        };
                        return `[lang:${lang}]${questions[lang as Language]}`;
                    }

                    program = createIntelligentCustomProgram({
                        duration: customParams.duration,
                        travelers: customParams.travelers,
                        destinations: customParams.destinations,
                        season: customParams.season,
                        category: customParams.category,
                        language: customParams.language || 'en'
                    });

                } else {
                    // ❌ بيانات غير كافية
                    console.warn("[ai:insufficient_data]");
                    const lang = customParams.language || 'en';
                    const errorMessages = {
                        en: `I need more information to create your custom program. Please specify either cities with specific sites, or destinations.`,
                        es: `Necesito más información para crear tu programa personalizado. Por favor especifica ciudades con sitios específicos, o destinos.`,
                        ar: `أحتاج المزيد من المعلومات لإنشاء برنامجك المخصص. يرجى تحديد المدن مع المواقع المحددة، أو الوجهات.`
                    };
                    return `[lang:${lang}]${errorMessages[lang as Language]}`;
                }

                // ✅ التحقق من نجاح الإنشاء
                if ('error' in program) {
                    console.error("[ai:custom_error]", program.error);
                    
                    const lang = customParams.language || 'en';
                    const errorMessages = {
                        en: `I apologize, but there was an error creating your custom program. Please try again with different destinations or contact support.`,
                        es: `Disculpa, pero hubo un error al crear tu programa personalizado. Por favor intenta con diferentes destinos o contacta al soporte.`,
                        ar: `عذراً، حدث خطأ أثناء إنشاء برنامجك المخصص. يرجى المحاولة بوجهات مختلفة أو الاتصال بالدعم.`
                    };
                    
                    return `[lang:${lang}]${errorMessages[lang as Language]}`;
                }

                // ✅ استبدال الـ token بالبرنامج الكامل
                const programJson = JSON.stringify(program);
                text = text.replace(
                    customProgramMatch[0], 
                    `[EgipturaCustomProgram:${programJson}]`
                );
                
                console.log("[ai:custom_created]", program.id);
                
            } catch (error) {
                console.error("[ai:custom_parse_error]", error);
            }
        }

        return text;
        
    } catch (error) {
        console.error("[ai:error]", (error as any)?.status || (error as any)?.code, (error as any)?.message || error);
        throw error;
    }
};