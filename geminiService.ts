import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { knowledgeBase } from './knowledgeBase';
import { getOfficialExchangeRate } from "./currencyService";
import { createIntelligentCustomProgram } from '../intelligentExtractor';
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

### 2. CUSTOM PROGRAM REQUESTS - STRICT RULES

**🚨 CRITICAL: Only create custom programs when user provides COMPLETE details:**

**REQUIRED DETAILS (ALL 5):**
1. ✅ Number of travelers
2. ✅ Duration (days)
3. ✅ Destinations (cities)
4. ✅ Season (summer/winter)
5. ✅ Category (gold/diamond)

**WHEN TO CREATE CUSTOM:**
User: "2 travelers, 5 days, Cairo + Alexandria, winter, gold"
→ [lang:en][EgipturaCustomProgram:{...}]

User: "4 people, 8 days, Cairo and Nile cruise, summer, diamond"
→ [lang:en][EgipturaCustomProgram:{...}]

**WHEN TO ASK QUESTIONS:**
User: "I want custom trip" (missing all details)
→ Ask questions ONLY, NO programs

User: "Custom 5 days Cairo" (missing travelers, season, category)
→ Ask questions ONLY, NO programs

**🎯 CUSTOM PROGRAM FORMAT:**
When user provides ALL 5 details, respond with:
[lang:xx][EgipturaCustomProgram:{
  "travelers": 2,
  "duration": 5,
  "destinations": ["cairo", "alexandria"],
  "season": "winter",
  "category": "gold",
  "language": "en"
}]

**CRITICAL:** Send ONLY the parameters above. The backend will extract real data from the 10 programs.

**❌ DO NOT include in response:**
- itinerary (backend extracts it)
- accommodations (backend extracts it)
- name, descriptions (backend generates them)
- sites, activities (backend extracts them)

**FOR INCOMPLETE CUSTOM REQUESTS:**
When user says "I want custom trip" without ALL 5 details:
- Ask conversational questions
- DO NOT send [EgipturaCustomProgram] token
- Collect missing information

## 🚫 STRICT PROHIBITIONS
- ❌ NEVER create [EgipturaCustomProgram] without ALL 5 required details
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

### ✅ CORRECT - Complete Custom Request:
User: "2 travelers, 5 days, Cairo and Alexandria, winter, gold"
AI: [lang:en][EgipturaCustomProgram:{
  "travelers": 2,
  "duration": 5,
  "destinations": ["cairo", "alexandria"],
  "season": "winter",
  "category": "gold",
  "language": "en"
}]

### ✅ CORRECT - Incomplete Custom Request:
User: "I want custom trip"
AI: [lang:en]I'd be delighted to create your perfect Egypt journey! ✨ To design your custom trip, I need:
• How many travelers?
• Duration in days?
• Which destinations? (Cairo, Luxor, Aswan, Alexandria, Nile Cruise)
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

        // 🔍 معالجة Custom Program Requests
        const customProgramMatch = text.match(/\[EgipturaCustomProgram:(\{[^}]+\})\]/);
        
        if (customProgramMatch) {
            try {
                const customParams = JSON.parse(customProgramMatch[1]);
                
                console.log("[ai:custom_params]", customParams);

                // ✅ التحقق من اكتمال البيانات
                const requiredFields = ['travelers', 'duration', 'destinations', 'season', 'category'];
                const missingFields = requiredFields.filter(field => !customParams[field]);
                
                if (missingFields.length > 0) {
                    console.warn("[ai:incomplete_custom]", missingFields);
                    // إعادة السؤال للمستخدم
                    const lang = customParams.language || 'en';
                    const questions = {
                        en: `I need more information to create your custom program. Please provide: ${missingFields.join(', ')}`,
                        es: `Necesito más información para crear tu programa personalizado. Por favor proporciona: ${missingFields.join(', ')}`,
                        ar: `أحتاج المزيد من المعلومات لإنشاء برنامجك المخصص. يرجى تقديم: ${missingFields.join(', ')}`
                    };
                    return `[lang:${lang}]${questions[lang as Language]}`;
                }

                // 🎯 إنشاء البرنامج المخصص باستخدام IntelligentDataExtractor
                // 🆕 دعم تفضيلات العميل: daysPerCity + sitesPerCity
                const daysPerCity: Record<string, number> | undefined = customParams.daysPerCity;
                const sitesPerCityRaw: Record<string, string[]> | undefined = customParams.sitesPerCity;

                const program = createIntelligentCustomProgram({
                    duration: customParams.duration,
                    travelers: customParams.travelers,
                    destinations: customParams.destinations,
                    season: customParams.season,
                    category: customParams.category,
                    language: customParams.language || 'en',
                    // تمرير الخطة الاختيارية داخل params عبر حقل غير مستخدم مباشرة (سيتم قراءتها في extractor)
                    clientPlan: {
                        perCityDays: daysPerCity,
                        perCitySitesRaw: sitesPerCityRaw,
                    }
                } as any);

                // ✅ التحقق من نجاح الإنشاء
                if ('error' in program) {
                    console.error("[ai:custom_error]", program.error);
                    
                    const lang = customParams.language || 'en';
                    const errorMessages = {
                        en: `I apologize, but some destinations you requested are not available in our programs. Available destinations: Cairo, Luxor, Aswan, Alexandria, Nile Cruise. Would you like to create a program with these destinations?`,
                        es: `Disculpa, pero algunos destinos que solicitaste no están disponibles en nuestros programas. Destinos disponibles: Cairo, Luxor, Aswan, Alejandría, Crucero por el Nilo. ¿Te gustaría crear un programa con estos destinos?`,
                        ar: `عذراً، بعض الوجهات المطلوبة غير متاحة في برامجنا. الوجهات المتاحة: القاهرة، الأقصر، أسوان، الإسكندرية، رحلة نيلية. هل تريد إنشاء برنامج بهذه الوجهات؟`
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