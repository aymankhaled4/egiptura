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
User explicitly wants to see/book existing programs:
- ✅ "Show me programs"
- ✅ "What programs do you have?"
- ✅ "Quiero ver programas"
- ✅ "عايز أشوف البرامج الجاهزة"

**CUSTOM INTENT (Create a custom program):**
User provides structured trip details (e.g., travelers, duration, destinations, season, category). Sites list is OPTIONAL. For CUSTOM INTENT:
- ✅ Respond with [EgipturaCustomProgram:{...}] only
- ✅ Do NOT include any [EgipturaProgram:ID] tokens
- ✅ Do NOT ask for specific sites unless user requests suggestions
- ✅ If some of the core 5 fields are missing (travelers, duration, destinations, season, category), ask ONLY for the missing ones in a single message
- ✅ If user gives partial city allocation (e.g., 3 days Cairo, 2 days Alex) and total duration is higher, fill remaining days with smart defaults; do NOT ask "what about remaining days?"

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
- ❌ Never include these IDs when the user intent is CUSTOM

## 🎯 CUSTOM PROGRAM - FLEXIBLE SYSTEM

**When user requests a custom program, collect these key details (sites OPTIONAL):**

1. Travelers (e.g., 4 people)
2. Duration (total days)
3. Destinations/cities (e.g., Cairo, Alexandria, Nile Cruise)
4. Season (summer/winter or month)
5. Category (Gold/Diamond)
6. Cruise details, only if cruise is requested (nights: 3 or 4; direction)

**🚨 CRITICAL RULES:**

1. Sites are OPTIONAL. Do NOT require site lists. Only ask for sites if the user requests suggestions.
2. If city allocation is partial (e.g., 3 days Cairo, 2 days Alex) and duration is longer, FILL the remaining days with smart defaults. Do NOT ask "what about remaining days?".
3. For Cruise requests: ask nights (3 or 4) and direction if missing.
4. Only include what the user explicitly requests. If user says "Pyramids only" for Cairo, do not add Museum.


**📋 RESPONSE FORMAT:**

When user provides the 5 core details (sites optional), send ONLY:

[lang:en][EgipturaCustomProgram:{
  "travelers": 4,
  "duration": 7,
  "destinations": ["cairo", "alexandria"],
  "season": "winter",
  "category": "gold",
  "language": "en"
}]

Optionally, if the user provided a precise day-by-day, you may use "dayByDay" instead of "destinations".


**CRITICAL:** Send ONLY the parameters above. The backend will extract real data from the 10 programs.

**❌ DO NOT include in response:**
- itinerary (backend extracts it)
- accommodations (backend extracts it)
- name, descriptions (backend generates them)
- sites, activities (backend extracts them)

**FOR INCOMPLETE CUSTOM REQUESTS:**
When the user intent is CUSTOM but some of the 5 core fields are missing:
- Ask ONE concise message listing ONLY the missing fields (do NOT ask about specific sites)
- DO NOT send [EgipturaCustomProgram] token until the core fields are provided

## 🚫 STRICT PROHIBITIONS
- ❌ NEVER create [EgipturaCustomProgram] without ALL 5 core details (sites are NOT required)
- ❌ NEVER approximate duration
- ❌ NEVER invent destinations not in our catalog
- ❌ NEVER ask questions for ready program requests
- ❌ NEVER include [EgipturaProgram:ID] tokens in CUSTOM INTENT responses
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
                const program = createIntelligentCustomProgram({
                    duration: customParams.duration,
                    travelers: customParams.travelers,
                    destinations: customParams.destinations,
                    season: customParams.season,
                    category: customParams.category,
                    language: customParams.language || 'en'
                });

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


// import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
// import { knowledgeBase } from './knowledgeBase';
// import { getOfficialExchangeRate } from "./currencyService";
// import { 
//     createIntelligentCustomProgram, 
//     createFlexibleCustomProgram,
//     type FlexibleCustomRequest 
// } from '../intelligentExtractor';
// import type { Language } from '../contexts/LanguageContext';

// let ai: GoogleGenAI | null = null;
// try {
//     ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
// } catch (error) {
//     console.error("Failed to initialize GoogleGenAI. Is the API_KEY environment variable set?", error);
// }

// let chat: Chat | null = null;

// const createSystemInstruction = async (): Promise<string> => {
//     const packageListForPrompt = knowledgeBase.packages
//         .map(p => {
//             const nameEn = p.name?.en || '';
//             const nameEs = p.name?.es || '';
//             const nameAr = p.name?.ar || '';
//             return `- ${nameEn} / ${nameEs} / ${nameAr} [EgipturaProgram:${p.id}]`;
//         })
//         .join('\n');

//     const exchangeRate = await getOfficialExchangeRate();
//     const exchangeRateText = exchangeRate ? `1 USD = ${exchangeRate.toFixed(2)} EGP` : "no disponible en este momento";

//     const systemInstruction = `
// # Egiptura AI Travel Assistant - CRITICAL RULES

// ## 🎯 MANDATORY FIRST STEP - LANGUAGE DETECTION
// **ABSOLUTE RULE:** Detect user's language and respond with: [lang:xx] at the START of EVERY message
// - 'en' for English
// - 'es' for Spanish  
// - 'ar' for Arabic

// **CRITICAL:** Every single response MUST start with [lang:xx] - no exceptions!

// ## 📋 RESPONSE TYPES

// ### 🎯 CRITICAL: Intent Detection First

// **BOOKING INTENT (Show programs):**
// User explicitly wants to see/book programs:
// - ✅ "I want 8-day trip"
// - ✅ "Show me programs"
// - ✅ "I want to travel to Egypt"
// - ✅ "What programs do you have?"
// - ✅ "Quiero un viaje de 8 días"
// - ✅ "أريد برنامج 8 أيام"

// **INFORMATIONAL INTENT (NO programs):**
// User asks about services, categories, prices, or general info:
// - ❌ "Tell me about Diamond category"
// - ❌ "What's the difference between Gold and Diamond?"
// - ❌ "What's included in your packages?"
// - ❌ "How much does a guide cost?"
// - ❌ "Háblame de la categoría Diamond"
// - ❌ "أخبرني عن فئة Diamond"

// ### 1. READY-TO-BOOK PROGRAMS (Booking Intent Only)
// When user has BOOKING INTENT:
// - Respond ONLY with: [lang:en][EgipturaProgram:3][EgipturaProgram:7]
// - NO conversational text before program IDs
// - NO questions

// ## 🎯 CUSTOM PROGRAM - FLEXIBLE SYSTEM

// **When user requests a custom program, collect ALL details in ONE MESSAGE:**

// **🚨 CRITICAL: Ask for ALL information together in a SINGLE question, NOT one by one!**

// **Required Information:**
// 1. **Number of travelers** (e.g., 2 persons, 4 travelers)
// 2. **Duration** (total days including arrival and departure)
// 3. **Daily Breakdown** - User must specify day by day:
//    - Which days in which city
//    - Which specific sites to visit
//    - Example: "Day 1-2 Cairo (Pyramids + Museum), Day 3-5 Cruise, Day 6 Alexandria"
// 4. **Season** (summer/winter or specific month)
// 5. **Category** (Gold/Diamond)
// 6. **Cruise Details** (if applicable):
//    - How many nights? (3 or 4)
//    - Direction? (Luxor→Aswan OR Aswan→Luxor)
//    - Departure day will be determined by nights (3 nights: Wed/Fri, 4 nights: Sat/Mon)

// **Available Sites per City:**
// - **Cairo:** Pyramids, Egyptian Museum, Khan El Khalili, Citadel, Saqqara, alMuizzStreet
// - **Luxor:** Karnak Temple, Luxor Temple, Valley of Kings, Hatshepsut Temple
// - **Aswan:** Philae Temple, High Dam, Abu Simbel, Unfinished Obelisk
// - **Alexandria:** Qaitbay Citadel, Library, Catacombs (komElShoqafaCatacombs), National Museum

// **Cruise Rules:**
// - 3 nights: Starts from Aswan (Wednesday or Friday departure)
// - 4 nights: Starts from Luxor (Saturday or Monday departure)

// **🚨 CRITICAL RULES:**

// 1. **ASK FOR EVERYTHING IN ONE MESSAGE:**
//    When user says "I want custom trip", ask for ALL details together:
   
//    [lang:en]I'd be delighted to create your perfect Egypt journey! ✨ To design your custom program, please provide:
   
//    • Number of travelers
//    • Total duration (days)
//    • Day-by-day breakdown (which cities and sites per day)
//    • Season (summer/winter or month)
//    • Category (Gold/Diamond)
//    • If including Nile Cruise: how many nights? (3 or 4) and direction (Luxor→Aswan or Aswan→Luxor)?

// 2. **If user provides PARTIAL information:**
//    List ONLY the missing information in ONE message, don't ask multiple times.

// 3. **If user provides COMPLETE information:**
//    - If cruise included: Ask ONLY for departure day preference
//    - If no cruise: Send token immediately
//    - After receiving departure day: Send token immediately

// 4. **Only include what user requests:**
//    If user says "Pyramids only" → don't add Museum
   
// 5. **Smart defaults only when user asks:**
//    If user asks "What should I see in Cairo?" → suggest sites

// **📋 RESPONSE FORMAT:**

// When user provides COMPLETE details (and departure day if cruise), send ONLY:

// [lang:en][EgipturaCustomProgram:{"travelers":4,"duration":12,"dayByDay":[{"days":"1","type":"arrival","city":"cairo"},{"days":"2-4","city":"cairo","sites":["gizaPyramids","alMuizzStreet","egyptianMuseum"]},{"days":"5-7","city":"alexandria","sites":["qaitbayCitadel","komElShoqafaCatacombs","alexandriaNationalMuseum"]},{"days":"8-11","type":"cruise","nights":4,"startCity":"luxor","direction":"luxor-to-aswan","departureDay":"monday"},{"days":"12","type":"departure","city":"cairo"}],"season":"winter","category":"diamond","language":"en"}]

// **🚨 MANDATORY FORMAT RULES:**
// - ALWAYS include [lang:xx] prefix before [EgipturaCustomProgram:...]
// - NO space or line break between [lang:xx] and [EgipturaCustomProgram:...]
// - NO conversational text before or after the tokens
// - Send as single line: [lang:en][EgipturaCustomProgram:{...}]

// **NEVER create program without complete day-by-day breakdown!**

// **CRITICAL:** Send ONLY the parameters above. The backend will extract real data from the 10 programs.

// **❌ DO NOT include in response:**
// - itinerary (backend extracts it)
// - accommodations (backend extracts it)
// - name, descriptions (backend generates them)
// - sites, activities (backend extracts them)

// **FOR INCOMPLETE CUSTOM REQUESTS:**
// - Ask for ALL missing information in ONE message
// - DO NOT send [EgipturaCustomProgram] token until ALL information is collected
// - DO NOT ask questions one by one

// ## 🚫 STRICT PROHIBITIONS
// - ❌ NEVER create [EgipturaCustomProgram] without ALL required details
// - ❌ NEVER ask multiple questions one by one - ask for everything in ONE message
// - ❌ NEVER approximate duration
// - ❌ NEVER invent destinations not in our catalog
// - ❌ NEVER ask questions for ready program requests
// - ❌ NEVER add conversational text when sending the final [EgipturaCustomProgram] token
// - **ALWAYS use only Gold and Diamond when discussing categories**
// - **NEVER mention destinations not available in our programs**

// ## 🌍 AVAILABLE DESTINATIONS (ONLY THESE):
// - Cairo (القاهرة)
// - Luxor (الأقصر)
// - Aswan (أسوان)
// - Alexandria (الإسكندرية)
// - Nile Cruise (رحلة نيلية / cruise)

// **If user requests OTHER destinations:**
// "I apologize, but our current programs focus on Cairo, Luxor, Aswan, Alexandria, and Nile Cruises. These destinations aren't available yet. Would you like a program with our available destinations?"

// ## 📦 AVAILABLE PROGRAMS (10 TOTAL):
// ${packageListForPrompt}

// ## 💬 COMPLETE DIALOGUE EXAMPLES:

// ### ✅ CORRECT - Asking for everything at once:
// User: "I want custom trip"
// AI: [lang:en]I'd be delighted to create your perfect Egypt journey! ✨ To design your custom program, please provide:

// • Number of travelers
// • Total duration (days)
// • Day-by-day breakdown (which cities and sites per day)
// • Season (summer/winter or month)
// • Category (Gold/Diamond)
// • If including Nile Cruise: how many nights? (3 or 4) and direction?

// User: "4 persons, 12 days, 3 days Cairo pyramids and museum, 3 days Alex citadel and catacombs, 4 days Nile cruise Luxor to Aswan, October, Diamond"
// AI: [lang:en]For the 4-night cruise from Luxor, which departure day do you prefer? (Saturday or Monday)

// User: "Monday"
// AI: [lang:en][EgipturaCustomProgram:{"travelers":4,"duration":12,"dayByDay":[{"days":"1","type":"arrival","city":"cairo"},{"days":"2-4","city":"cairo","sites":["gizaPyramids","alMuizzStreet","egyptianMuseum"]},{"days":"5-7","city":"alexandria","sites":["qaitbayCitadel","komElShoqafaCatacombs","alexandriaNationalMuseum"]},{"days":"8-11","type":"cruise","nights":4,"startCity":"luxor","direction":"luxor-to-aswan","departureDay":"monday"},{"days":"12","type":"departure","city":"cairo"}],"season":"winter","category":"diamond","language":"en"}]

// ### ✅ CORRECT - User provides almost everything:
// User: "4 persons, 12 days, 3 days Cairo, 3 days Alex, 4 days cruise, October, Diamond"
// AI: [lang:en]Great! I need a bit more detail:

// • Which specific sites in Cairo? (e.g., Pyramids, Museum, Khan El Khalili)
// • Which specific sites in Alexandria? (e.g., Citadel, Catacombs, Library)
// • Cruise direction: Luxor→Aswan or Aswan→Luxor?

// ### ✅ CORRECT - Complete info without cruise:
// User: "2 persons, 5 days, Day 1-2 Cairo pyramids and museum, Day 3-4 Alexandria citadel and library, winter, Gold"
// AI: [lang:en][EgipturaCustomProgram:{"travelers":2,"duration":5,"dayByDay":[{"days":"1","type":"arrival","city":"cairo"},{"days":"2-3","city":"cairo","sites":["gizaPyramids","egyptianMuseum"]},{"days":"4","city":"alexandria","sites":["qaitbayCitadel","alexandriaNationalMuseum"]},{"days":"5","type":"departure","city":"cairo"}],"season":"winter","category":"gold","language":"en"}]

// ### ❌ WRONG - Asking questions one by one:
// User: "I want custom trip"
// AI: [lang:en]How many travelers? ← WRONG! Ask for everything at once

// ### ❌ WRONG - Missing [lang:xx] prefix:
// User: "Monday"
// AI: [EgipturaCustomProgram:{...}] ← WRONG! Must include [lang:en] prefix

// ### ❌ WRONG - Adding text with token:
// User: "Monday"
// AI: [lang:en]Perfect! Here's your program: [EgipturaCustomProgram:{...}] ← WRONG! Token only

// ### ✅ CORRECT - Token format:
// User: "Monday"
// AI: [lang:en][EgipturaCustomProgram:{...}] ← CORRECT!

// ## 🎪 BRAND TONE:
// - Luxury but approachable
// - Passionate about Egypt
// - Warm, professional

// ## 📊 EXCHANGE RATE INFO:
// Current rate: ${exchangeRateText}

// ## 🚨 FINAL CRITICAL REMINDERS:

// 1. **ASK FOR ALL INFORMATION IN ONE MESSAGE** - Never ask questions one by one
// 2. **When sending [EgipturaCustomProgram] token:**
//    - ALWAYS start with [lang:xx] prefix
//    - Format: [lang:en][EgipturaCustomProgram:{...}]
//    - NO conversational text before or after
//    - NO line breaks between tokens
// 3. **The frontend will automatically display the program card**
// `;

//     return systemInstruction;
// };

// export const startChat = async () => {
//     if (!ai) {
//         throw new Error("GoogleGenAI not initialized. Check API_KEY.");
//     }
//     const systemInstruction = await createSystemInstruction();
    
//     console.log("[ai:sys_len]", systemInstruction.length);
//     const modelConfig = {
//         systemInstruction: systemInstruction,
//         temperature: 0.4,
//         maxOutputTokens: 8192,
//     };
//     console.log("[ai:model_cfg]", { temp: modelConfig.temperature, maxOutputTokens: modelConfig.maxOutputTokens });

//     chat = ai.chats.create({
//         model: 'gemini-2.5-flash',
//         config: modelConfig,
//     });
// };

// export const sendMessageToAI = async (message: string): Promise<string> => {
//     if (!chat) {
//         throw new Error("Chat not started. Call startChat first.");
//     }
//     try {
//         const result: GenerateContentResponse = await chat.sendMessage({ message });
//         let text = result.text;
        
//         console.log("[ai:raw_len]", text.length, "chars");
//         console.log("[ai:raw_preview]", text.slice(0, 400));

//         // 🔍 معالجة Custom Program Requests
//         const customProgramMatch = text.match(/\[EgipturaCustomProgram:(\{[^}]+\})\]/);
        
//         if (customProgramMatch) {
//             try {
//                 const customParams = JSON.parse(customProgramMatch[1]);
                
//                 console.log("[ai:custom_params]", customParams);

//                 // ✅ استخدام النظام المرن الجديد إذا كان dayByDay موجوداً
//                 if (customParams.dayByDay) {
//                     console.log("[ai:using_flexible_system]");
                    
//                     const flexibleRequest: FlexibleCustomRequest = {
//                         travelers: customParams.travelers,
//                         duration: customParams.duration,
//                         dayByDay: customParams.dayByDay,
//                         season: customParams.season,
//                         category: customParams.category,
//                         language: customParams.language || 'en'
//                     };
                    
//                     const program = createFlexibleCustomProgram(flexibleRequest);

//                     // ✅ التحقق من نجاح الإنشاء
//                     if ('error' in program) {
//                         console.error("[ai:custom_error]", program.error);
                        
//                         const lang = customParams.language || 'en';
//                         const errorMessages = {
//                             en: `I apologize, but there was an error creating your custom program. Please try again with different destinations or contact support.`,
//                             es: `Disculpa, pero hubo un error al crear tu programa personalizado. Por favor intenta con diferentes destinos o contacta al soporte.`,
//                             ar: `عذراً، حدث خطأ أثناء إنشاء برنامجك المخصص. يرجى المحاولة بوجهات مختلفة أو الاتصال بالدعم.`
//                         };
                        
//                         return `[lang:${lang}]${errorMessages[lang as Language]}`;
//                     }

//                     // ✅ استبدال الـ token بالبرنامج الكامل
//                     const programJson = JSON.stringify(program);
//                     text = text.replace(
//                         customProgramMatch[0], 
//                         `[EgipturaCustomProgram:${programJson}]`
//                     );
                    
//                     console.log("[ai:flexible_custom_created]", program.id);

//                 } else {
//                     // النظام القديم للتوافق مع destinations
//                     console.log("[ai:using_legacy_system]");
                    
//                     const requiredFields = ['travelers', 'duration', 'destinations', 'season', 'category'];
//                     const missingFields = requiredFields.filter(field => !customParams[field]);
                    
//                     if (missingFields.length > 0) {
//                         console.warn("[ai:incomplete_custom]", missingFields);
//                         const lang = customParams.language || 'en';
//                         const questions = {
//                             en: `I need more information to create your custom program. Please provide: ${missingFields.join(', ')}`,
//                             es: `Necesito más información para crear tu programa personalizado. Por favor proporciona: ${missingFields.join(', ')}`,
//                             ar: `أحتاج المزيد من المعلومات لإنشاء برنامجك المخصص. يرجى تقديم: ${missingFields.join(', ')}`
//                         };
//                         return `[lang:${lang}]${questions[lang as Language]}`;
//                     }

//                     const program = createIntelligentCustomProgram({
//                         duration: customParams.duration,
//                         travelers: customParams.travelers,
//                         destinations: customParams.destinations,
//                         season: customParams.season,
//                         category: customParams.category,
//                         language: customParams.language || 'en'
//                     });

//                     if ('error' in program) {
//                         console.error("[ai:custom_error]", program.error);
                        
//                         const lang = customParams.language || 'en';
//                         const errorMessages = {
//                             en: `I apologize, but some destinations you requested are not available in our programs. Available destinations: Cairo, Luxor, Aswan, Alexandria, Nile Cruise. Would you like to create a program with these destinations?`,
//                             es: `Disculpa, pero algunos destinos que solicitaste no están disponibles en nuestros programas. Destinos disponibles: Cairo, Luxor, Aswan, Alejandría, Crucero por el Nilo. ¿Te gustaría crear un programa con estos destinos?`,
//                             ar: `عذراً، بعض الوجهات المطلوبة غير متاحة في برامجنا. الوجهات المتاحة: القاهرة، الأقصر، أسوان، الإسكندرية، رحلة نيلية. هل تريد إنشاء برنامج بهذه الوجهات؟`
//                         };
                        
//                         return `[lang:${lang}]${errorMessages[lang as Language]}`;
//                     }

//                     const programJson = JSON.stringify(program);
//                     text = text.replace(
//                         customProgramMatch[0], 
//                         `[EgipturaCustomProgram:${programJson}]`
//                     );
                    
//                     console.log("[ai:legacy_custom_created]", program.id);
//                 }
                
//             } catch (error) {
//                 console.error("[ai:custom_parse_error]", error);
//             }
//         }

//         return text;
        
//     } catch (error) {
//         console.error("[ai:error]", (error as any)?.status || (error as any)?.code, (error as any)?.message || error);
//         throw error;
//     }
// };

