import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Message, Program } from './types';
import { sendMessageToAI, startChat } from './services/geminiService';
import { calculatePriceScenarios } from './services/pricingService';
import { knowledgeBase } from './services/knowledgeBase';
import ChatInput from './components/ChatInput';
import ChatWindow from './components/ChatWindow';
import TypingIndicator from './components/TypingIndicator';
import ProgramModal from './components/ProgramModal';
import { useLanguage, Language } from './contexts/LanguageContext';
import SuggestionChips from './components/SuggestionChips';
import EgipturaLogo from './components/EgipturaLogo';
import { generateLocalFallbackProgram, withDisplayDefaults } from './services/fallbackService';
import { normalizeQuoteData, fillMissingFields } from './services/pricingService';

const App: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const getInitialMessage = useCallback((): Message => {
        const messages = knowledgeBase.localizedStrings.ui[language]?.welcomeMessages || knowledgeBase.localizedStrings.ui.es.welcomeMessages;
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        return {
            id: 'init-message',
            role: 'model',
            content: randomMessage,
        };
    }, [language]);
    
    const [messages, setMessages] = useState<Message[]>([getInitialMessage()]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
    const [hasSavedTrip, setHasSavedTrip] = useState(false);

    const uiText = useMemo(() => knowledgeBase.localizedStrings.ui[language] || knowledgeBase.localizedStrings.ui.es, [language]);

    // Check for saved trip on mount
    useEffect(() => {
        if (localStorage.getItem('savedEgipturaProgram')) {
            setHasSavedTrip(true);
        }
    }, []);
    
        // ✅ دالة التحقق من quoteParams (يجب أن تكون موجودة)
    const validateQuoteParams = (quoteParams: any): boolean => {
        if (!quoteParams || typeof quoteParams !== 'object') return false;
        if (!quoteParams.itineraryPlan || typeof quoteParams.itineraryPlan !== 'object') return false;
        const hasNights = quoteParams.itineraryPlan.nights && Object.keys(quoteParams.itineraryPlan.nights).length > 0;
        if (!hasNights) return false;
        if (typeof quoteParams.travelers !== 'number' || quoteParams.travelers <= 0) return false;
        if (typeof quoteParams.duration !== 'number' || quoteParams.duration <= 0) return false;
        return true;
    };

    // دالة للبحث عن البرامج المطابقة من قاعدة البيانات
    const findMatchingPrograms = useCallback((userInput: string, customProgram?: Program): number[] => {
        const input = userInput.toLowerCase();
        
        // استخراج المتطلبات من الطلب
        const requestedDays = customProgram?.duration.days || 
                             +(input.match(/(\d+)\s*(?:days?|d[ií]as|ايام|يوم)/i)?.[1] || 0);
        const wantsCruise = customProgram?.cruiseNights > 0 || 
                           /cruise|crucero|كروز|نيل|nile/i.test(input);
        
        console.log(`[debug] Searching for programs: ${requestedDays} days, cruise: ${wantsCruise}`);
        
        // إذا لم يكن هناك متطلبات محددة، لا نعود بأي برامج
        if (!requestedDays && !wantsCruise) {
            return [];
        }
        
        // فلترة البرامج المطابقة
        const matchingPrograms = knowledgeBase.packages.filter(program => {
            // مطابقة المدة (±1 يوم)
            const durationMatch = requestedDays ? 
                Math.abs(program.duration.days - requestedDays) <= 1 : 
                true;
            
            // مطابقة الكروز
            const cruiseMatch = wantsCruise ? 
                (program.cruiseNights && program.cruiseNights > 0) : 
                true;
            
            return durationMatch && cruiseMatch;
        });
        
        console.log(`[debug] Found ${matchingPrograms.length} matching programs`);
        return matchingPrograms.map(p => Number(p.id));
    }, []);

    useEffect(() => {
        setMessages(prev => {
            if (prev.length === 1 && prev[0].id === 'init-message') {
                return [getInitialMessage()];
            }
            return prev;
        });
    }, [language, getInitialMessage]);

    const addMessage = useCallback((role: 'user' | 'model', content: string) => {
        const newMessage: Message = {
             id: Date.now().toString() + Math.random(),
             role,
             content
        };
        setMessages(prev => [...prev, newMessage]);
    }, []);
    
    const handleViewDetails = useCallback((program: Program) => {
        setSelectedProgram(program);
    }, []);

    useEffect(() => {
        const initializeChat = async () => {
            setIsLoading(true);
            try {
                await startChat();
            } catch (error) {
                console.error("Initialization failed:", error);
                addMessage('model', 'Error connecting to the Egiptura service. Please check the configuration and refresh the page.');
            } finally {
                setIsLoading(false);
            }
        };
        initializeChat();
    }, [addMessage]);


    function extractBalancedJson(text: string, tokenStart = '[EgipturaCustomProgram:') {
        const idx = text.indexOf(tokenStart);
        if (idx === -1) return null;
        const start = text.indexOf('{', idx);
        if (start === -1) return null;
        let depth = 0;
        for (let i = start; i < text.length; i++) {
            const ch = text[i];
            if (ch === '{') depth++;
            else if (ch === '}') depth--;
            if (depth === 0) {
            return text.slice(start, i + 1);
            }
        }
        return null;
    }

//     const handleSendMessage = useCallback(async (userInput: string) => {
//     if (!userInput.trim()) return;

//     const userMessage: Message = { id: Date.now().toString(), role: 'user', content: userInput };
//     const currentMessages = [...messages, userMessage];
//     setMessages(currentMessages);
//     setIsLoading(true);

//     try {
//         // For modification requests, we send more context to the AI.
//         const fullPrompt = messages.length > 2 ? 
//             `PREVIOUS_CONVERSATION_CONTEXT: ${messages.map(m => `${m.role}: ${m.content}`).join('\n')}\n\nCURRENT_USER_REQUEST: ${userInput}`
//             : userInput;

//         let response = await sendMessageToAI(fullPrompt);
//         let currentLang = language;

//         // Language detection
//         response = response.trimStart();
//         const langMatch = response.match(/^\[lang:(es|en|ar)\]/);

//         if (langMatch) {
//             const detectedLang = langMatch[1] as Language;
//             if (language !== detectedLang) {
//                 setLanguage(detectedLang);
//                 currentLang = detectedLang;
//             }
//             response = response.replace(langMatch[0], '').trim();
//         }

//         let responseText = response;
//         let finalCustomProgram: Program | undefined = undefined;

//         // 1. Extract custom program token first
//         const jsonString = extractBalancedJson(responseText);
//         if (jsonString) {
//             console.log("[ai:program_token_found]", true, "len", jsonString.length);
//             const tryParse = (s: string) => { 
//                 try { return JSON.parse(s); } 
//                 catch(e) { console.error("JSON Parse Error:", e); return null; } 
//             };
            
//             let programFromAI = tryParse(jsonString);
//             if (programFromAI) {
//                 // 1. Normalize data from AI
//                 const normalized = normalizeQuoteData(programFromAI);

//                 // 2. Fill any missing fields based on detected language
//                 const filled = fillMissingFields(normalized, knowledgeBase.localizedStrings.ui[currentLang]);

//                 // 3. Validate quoteParams
//                 if (filled.quoteParams && validateQuoteParams(filled.quoteParams)) {
//                     const scenarios = calculatePriceScenarios(filled.quoteParams);
//                     finalCustomProgram = withDisplayDefaults({
//                         ...filled,
//                         isCustom: true,
//                         seasonalPricing: {
//                             summer: { gold: scenarios.summer, diamond: scenarios.summer },
//                             winter: { gold: scenarios.winter, diamond: scenarios.winter },
//                         },
//                     });
//                     responseText = responseText.replace('[EgipturaCustomProgram:' + jsonString + ']', '').trim();
//                     if (!responseText) {
//                         responseText = (knowledgeBase.localizedStrings.ui[currentLang] || knowledgeBase.localizedStrings.ui.es).customQuoteCreated;
//                     }
//                 } else {
//                     console.warn("[ai:invalid_quoteParams_after_fill]");
//                 }
//             }
//         }
        
//         // 2. Fallback if a custom quote was intended but the token failed or was missing
//         const isCustomQuoteIntent = /build|create|make|design|armar|crear|hacer|formar|custom|personalized|personalizado|مخصص|برنامج مخصص|رحلة مخصصة/i.test(userInput.toLowerCase());
//         const hasNumber = /\d/.test(userInput);
//         if (isCustomQuoteIntent && hasNumber && !finalCustomProgram) {
//             console.warn("[ai:fallback] Intent and number detected, generating local program.");
//             const fallbackProgram = generateLocalFallbackProgram(userInput, currentLang);
//             if (fallbackProgram.quoteParams && validateQuoteParams(fallbackProgram.quoteParams)) {
//                 const scenarios = calculatePriceScenarios(fallbackProgram.quoteParams);
//                 finalCustomProgram = withDisplayDefaults({
//                   ...fallbackProgram,
//                   seasonalPricing: {
//                     summer: { gold: scenarios.summer, diamond: scenarios.summer },
//                     winter: { gold: scenarios.winter, diamond: scenarios.winter },
//                   },
//                 });
//                 responseText = (knowledgeBase.localizedStrings.ui[currentLang] || knowledgeBase.localizedStrings.ui.es).customQuoteCreated;
//             }
//         }

//         // 3. Extract any pre-defined program tokens
//         const programTokenRegex = /\[EgipturaProgram:(\d+)\]/g;
//         const programIds: number[] = [];
//         let match;
//         while ((match = programTokenRegex.exec(responseText)) !== null) {
//             programIds.push(parseInt(match[1], 10));
//         }

//         // ✅ البحث عن البرامج المطابقة من قاعدة البيانات
//         const matchingProgramIds = findMatchingPrograms(userInput, finalCustomProgram);
        
//         // ✅ الإصلاح الجديد: كشف طلبات الرحلات المخصصة
//         const isCustomTripRequest = /viaje a medida|viaje personalizado|custom trip|personalized|مخصص|رحلة مخصصة|برنامج مخصص|رحلة خاصة/i.test(userInput.toLowerCase());
//         const isGeneralProgramRequest = /programs?|viajes?|paquetes?|برامج|packages?|trips?|travel|عرض/i.test(userInput.toLowerCase());
        
//         // ✅ الإصلاح: عرض البرامج المطابقة فقط
//         if (matchingProgramIds.length > 0) {
//             // إذا وجدنا برامج مطابقة، نستخدمها بدلاً من أي برامج أخرى
//             programIds.length = 0; // مسح أي برامج موجودة
//             programIds.push(...matchingProgramIds);
            
//             // إذا كان هناك برنامج مخصص ونحن نعرض برامج مطابقة، نخفي البرنامج المخصص
//             // لأن المستخدم طلب برامج موجودة وليس برنامج مخصص
//             if (finalCustomProgram && !isCustomQuoteIntent) {
//                 finalCustomProgram = undefined;
//                 // تحديث النص ليعكس أننا نعرض برامج مطابقة
//                 if (!responseText || responseText === uiText.customQuoteCreated) {
//                     responseText = currentLang === 'es' ? 
//                         "Encontré estos programas que coinciden con lo que buscas:" :
//                         currentLang === 'en' ? 
//                         "I found these programs that match what you're looking for:" :
//                         "لقد وجدت هذه البرامج التي تطابق ما تبحث عنه:";
//                 }
//             }
//         } else {
//             // ✅ الإصلاح: إذا طلب رحلة مخصصة، لا نعرض برامج جاهزة
//             if (isGeneralProgramRequest && programIds.length === 0 && !finalCustomProgram && !isCustomTripRequest) {
//                 const suggestedPrograms = knowledgeBase.packages.slice(0, 4).map(p => Number(p.id));
//                 programIds.push(...suggestedPrograms);
//                 console.log(`[debug] Showing ${suggestedPrograms.length} suggested programs for general request`);
//             } else if (isCustomTripRequest) {
//                 console.log(`[debug] Custom trip request detected - skipping program suggestions`);
//             }
//         }

//         responseText = responseText.replace(programTokenRegex, '').trim();

//         // 4. Create and add the final, consolidated message to the chat
//         if (responseText || programIds.length > 0 || finalCustomProgram) {
//              const modelMessage: Message = {
//                 id: Date.now().toString() + Math.random(),
//                 role: 'model',
//                 content: responseText,
//                 programIds: programIds.length > 0 ? programIds : undefined,
//                 customPrograms: finalCustomProgram ? [finalCustomProgram] : undefined,
//             };
//             setMessages(prev => [...prev, modelMessage]);
//         }

//     } catch (error) {
//         console.error(error);
//         const uiText = knowledgeBase.localizedStrings.ui[language] || knowledgeBase.localizedStrings.ui.es;
//         let errorMessage = uiText.genericError || 'An error occurred. Please try again.';

//         if (error instanceof Error) {
//             if (error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED')) {
//                 errorMessage = uiText.quotaError || "Our AI assistant is currently experiencing high demand. Please try again in a little while.";
//             } else if (error.message.includes('API key not valid')) {
//                 errorMessage = uiText.apiKeyError || "There's an issue with the connection to our AI service. Our team has been notified.";
//             }
//         }
        
//         addMessage('model', errorMessage);
//     } finally {
//         setIsLoading(false);
//     }
// }, [addMessage, language, setLanguage, messages, findMatchingPrograms, uiText.customQuoteCreated]);

// const handleSendMessage = useCallback(async (userInput: string) => {
//     if (!userInput.trim()) return;

//     const userMessage: Message = { id: Date.now().toString(), role: 'user', content: userInput };
//     const currentMessages = [...messages, userMessage];
//     setMessages(currentMessages);
//     setIsLoading(true);

//     try {
//         // ✅ الخطوة 1: تحديد النية أولاً قبل إرسال للـ AI
//         const isChipRequest = /i want an? \d+-day trip (with|without) cruise/i.test(userInput.toLowerCase());
//         const isExplicitCustomRequest = /build|create|make|design|armar|crear|hacer|formar|custom|personalized|personalizado|مخصص|برنامج مخصص|رحلة مخصصة/i.test(userInput.toLowerCase());
        
//         console.log(`[debug] Request analysis - Chip: ${isChipRequest}, Custom: ${isExplicitCustomRequest}`);

//         let response, responseText, currentLang = language;
//         let finalCustomProgram: Program | undefined = undefined;

//         // ✅ الخطوة 2: إذا كان طلب Chip، نتخطى الـ AI تماماً
//         if (isChipRequest) {
//             console.log(`[debug] Chip request detected - skipping AI and showing matching programs directly`);
            
//             // نعرض البرامج المطابقة مباشرة بدون الذهاب للـ AI
//             const matchingProgramIds = findMatchingPrograms(userInput);
            
//             responseText = currentLang === 'es' ? 
//                 "Encontré estos programas que coinciden con lo que buscas:" :
//                 currentLang === 'en' ? 
//                 "I found these programs that match what you're looking for:" :
//                 "لقد وجدت هذه البرامج التي تطابق ما تبحث عنه:";
            
//             const programIds = matchingProgramIds;
            
//             const modelMessage: Message = {
//                 id: Date.now().toString() + Math.random(),
//                 role: 'model',
//                 content: responseText,
//                 programIds: programIds.length > 0 ? programIds : undefined,
//             };
//             setMessages(prev => [...prev, modelMessage]);
//             setIsLoading(false);
//             return; // نخرج من الدالة هنا
            
//         } else {
//             // ✅ الطلبات العادية نرسلها للـ AI
//             const fullPrompt = messages.length > 2 ? 
//                 `PREVIOUS_CONVERSATION_CONTEXT: ${messages.map(m => `${m.role}: ${m.content}`).join('\n')}\n\nCURRENT_USER_REQUEST: ${userInput}`
//                 : userInput;

//             response = await sendMessageToAI(fullPrompt);
            
//             // Language detection
//             response = response.trimStart();
//             const langMatch = response.match(/^\[lang:(es|en|ar)\]/);

//             if (langMatch) {
//                 const detectedLang = langMatch[1] as Language;
//                 if (language !== detectedLang) {
//                     setLanguage(detectedLang);
//                     currentLang = detectedLang;
//                 }
//                 response = response.replace(langMatch[0], '').trim();
//             }

//             responseText = response;

//             // ... باقي الكود الحالي لمعالجة الرد من AI
//             // 1. Extract custom program token
//             const jsonString = extractBalancedJson(responseText);
//             if (jsonString && isExplicitCustomRequest) {
//                 // معالجة البرنامج المخصص فقط للطلبات المخصصة الصريحة
//                 console.log("[ai:program_token_found] Processing custom program for explicit request");
//                 const tryParse = (s: string) => { 
//                     try { return JSON.parse(s); } 
//                     catch(e) { console.error("JSON Parse Error:", e); return null; } 
//                 };
                
//                 let programFromAI = tryParse(jsonString);
//                 if (programFromAI) {
//                     const normalized = normalizeQuoteData(programFromAI);
//                     const filled = fillMissingFields(normalized, knowledgeBase.localizedStrings.ui[currentLang]);
                    
//                     if (filled.quoteParams && validateQuoteParams(filled.quoteParams)) {
//                         const scenarios = calculatePriceScenarios(filled.quoteParams);
//                         finalCustomProgram = withDisplayDefaults({
//                             ...filled,
//                             isCustom: true,
//                             seasonalPricing: {
//                                 summer: { gold: scenarios.summer, diamond: scenarios.summer },
//                                 winter: { gold: scenarios.winter, diamond: scenarios.winter },
//                             },
//                         });
//                         responseText = responseText.replace('[EgipturaCustomProgram:' + jsonString + ']', '').trim();
//                     }
//                 }
//             }
            
//             // 2. Fallback - فقط للطلبات المخصصة الصريحة
//             const hasTravelDetails = /\d+\s*(days?|d[ií]as|ايام)/i.test(userInput);
//             if (isExplicitCustomRequest && hasTravelDetails && !finalCustomProgram) {
//                 console.warn("[ai:fallback] Explicit custom request detected, generating local program.");
//                 const fallbackProgram = generateLocalFallbackProgram(userInput, currentLang);
//                 if (fallbackProgram.quoteParams && validateQuoteParams(fallbackProgram.quoteParams)) {
//                     const scenarios = calculatePriceScenarios(fallbackProgram.quoteParams);
//                     finalCustomProgram = withDisplayDefaults({
//                         ...fallbackProgram,
//                         seasonalPricing: {
//                             summer: { gold: scenarios.summer, diamond: scenarios.summer },
//                             winter: { gold: scenarios.winter, diamond: scenarios.winter },
//                         },
//                     });
//                     responseText = uiText.customQuoteCreated;
//                 }
//             }

//             // 3. Extract any pre-defined program tokens
//             const programTokenRegex = /\[EgipturaProgram:(\d+)\]/g;
//             const programIds: number[] = [];
//             let match;
//             while ((match = programTokenRegex.exec(responseText)) !== null) {
//                 programIds.push(parseInt(match[1], 10));
//             }

//             // ✅ البحث عن البرامج المطابقة - فقط إذا لم يكن طلب مخصص
//             let matchingProgramIds: number[] = [];
//             if (!isExplicitCustomRequest) {
//                 matchingProgramIds = findMatchingPrograms(userInput, finalCustomProgram);
//             }

//             // ✅ المنطق البسيط للطلبات العادية:
//             if (matchingProgramIds.length > 0 && !isExplicitCustomRequest) {
//                 // طلبات البرامج العادية → عرض البرامج المشابهة
//                 programIds.length = 0;
//                 programIds.push(...matchingProgramIds);
//                 finalCustomProgram = undefined; // إخفاء البرنامج المخصص
                
//                 if (!responseText || responseText === uiText.customQuoteCreated) {
//                     responseText = currentLang === 'es' ? 
//                         "Encontré estos programas que coinciden con lo que buscas:" :
//                         currentLang === 'en' ? 
//                         "I found these programs that match what you're looking for:" :
//                         "لقد وجدت هذه البرامج التي تطابق ما تبحث عنه:";
//                 }
//             } else if (isExplicitCustomRequest && finalCustomProgram) {
//                 // طلبات مخصصة صريحة → عرض البرنامج المخصص فقط
//                 programIds.length = 0; // إخفاء البرامج الجاهزة
//             }

//             responseText = responseText.replace(programTokenRegex, '').trim();

//             // 4. Create and add the final message
//             if (responseText || programIds.length > 0 || finalCustomProgram) {
//                 const modelMessage: Message = {
//                     id: Date.now().toString() + Math.random(),
//                     role: 'model',
//                     content: responseText,
//                     programIds: programIds.length > 0 ? programIds : undefined,
//                     customPrograms: finalCustomProgram ? [finalCustomProgram] : undefined,
//                 };
//                 setMessages(prev => [...prev, modelMessage]);
//             }
//         }

//     } catch (error) {
//         // ... كود معالجة الأخطاء
//     } finally {
//         setIsLoading(false);
//     }
// }, [addMessage, language, setLanguage, messages, findMatchingPrograms, uiText.customQuoteCreated]);
   

//     const handleSendMessage = useCallback(async (userInput: string) => {
//     if (!userInput.trim()) return;

//     const userMessage: Message = { id: Date.now().toString(), role: 'user', content: userInput };
//     const currentMessages = [...messages, userMessage];
//     setMessages(currentMessages);
//     setIsLoading(true);

//     try {
//         // ✅ تعريف المتغيرات المطلوبة
//         const isExplicitCustomRequest = /build|create|make|design|armar|crear|hacer|formar|custom|personalized|personalizado|مخصص|برنامج مخصص|رحلة مخصصة/i.test(userInput.toLowerCase());
//         const isChipRequest = /i want an? \d+-day trip (with|without) cruise/i.test(userInput.toLowerCase());
        
//         // ✅ استخراج عدد الأيام المطلوبة من رسالة المستخدم
//         const daysMatch = userInput.match(/(\d+)\s*(days?|d[ií]as|ايام|يوم)/i);
//         const requestedDays = daysMatch ? parseInt(daysMatch[1], 10) : 0;
        
//         console.log(`[debug] Request analysis - Days: ${requestedDays}, Chip: ${isChipRequest}, Custom: ${isExplicitCustomRequest}`);

//         let response, responseText, currentLang = language;
//         let finalCustomProgram: Program | undefined = undefined;

//         // ✅ الخطوة 1: إذا كان طلب Chip، نتخطى الـ AI تماماً
//         if (isChipRequest) {
//             console.log(`[debug] Chip request detected - skipping AI and showing matching programs directly`);
            
//             const matchingProgramIds = findMatchingPrograms(userInput);
            
//             responseText = currentLang === 'es' ? 
//                 "Encontré estos programas que coinciden con lo que buscas:" :
//                 currentLang === 'en' ? 
//                 "I found these programs that match what you're looking for:" :
//                 "لقد وجدت هذه البرامج التي تطابق ما تبحث عنه:";
            
//             const programIds = matchingProgramIds;
            
//             const modelMessage: Message = {
//                 id: Date.now().toString() + Math.random(),
//                 role: 'model',
//                 content: responseText,
//                 programIds: programIds.length > 0 ? programIds : undefined,
//             };
//             setMessages(prev => [...prev, modelMessage]);
//             setIsLoading(false);
//             return;
//         } else {
//             // ✅ الطلبات العادية نرسلها للـ AI
//             const fullPrompt = messages.length > 2 ? 
//                 `PREVIOUS_CONVERSATION_CONTEXT: ${messages.map(m => `${m.role}: ${m.content}`).join('\n')}\n\nCURRENT_USER_REQUEST: ${userInput}`
//                 : userInput;

//             response = await sendMessageToAI(fullPrompt);
            
//             // Language detection
//             response = response.trimStart();
//             const langMatch = response.match(/^\[lang:(es|en|ar)\]/);

//             if (langMatch) {
//                 const detectedLang = langMatch[1] as Language;
//                 if (language !== detectedLang) {
//                     setLanguage(detectedLang);
//                     currentLang = detectedLang;
//                 }
//                 response = response.replace(langMatch[0], '').trim();
//             }

//             responseText = response;

//             // 1. Extract custom program token
//             const jsonString = extractBalancedJson(responseText);
//             if (jsonString && isExplicitCustomRequest) {
//                 console.log("[ai:program_token_found] Processing custom program for explicit request");
//                 const tryParse = (s: string) => { 
//                     try { return JSON.parse(s); } 
//                     catch(e) { console.error("JSON Parse Error:", e); return null; } 
//                 };
                
//                 let programFromAI = tryParse(jsonString);
//                 if (programFromAI) {
//                     const normalized = normalizeQuoteData(programFromAI);
//                     const filled = fillMissingFields(normalized, knowledgeBase.localizedStrings.ui[currentLang]);
                    
//                     if (filled.quoteParams && validateQuoteParams(filled.quoteParams)) {
//                         const scenarios = calculatePriceScenarios(filled.quoteParams);
//                         finalCustomProgram = withDisplayDefaults({
//                             ...filled,
//                             isCustom: true,
//                             seasonalPricing: {
//                                 summer: { gold: scenarios.summer, diamond: scenarios.summer },
//                                 winter: { gold: scenarios.winter, diamond: scenarios.winter },
//                             },
//                         });

//                         // ✅ التحقق من أن عدد الأيام صحيح - الإصلاح النهائي
//                         if (requestedDays > 0 && finalCustomProgram.duration.days !== requestedDays) {
//                             console.warn(`[debug] AI generated wrong duration: ${finalCustomProgram.duration.days} instead of ${requestedDays}. Using LOCAL FALLBACK.`);
//                             // استخدام الفال باك سيرفيس مباشرة مع التأكيد على عدد الأيام
//                             const correctedInput = userInput + ` ${requestedDays} days`;
//                             const fallbackProgram = generateLocalFallbackProgram(correctedInput, currentLang);
//                             if (fallbackProgram.quoteParams && validateQuoteParams(fallbackProgram.quoteParams)) {
//                                 const scenarios = calculatePriceScenarios(fallbackProgram.quoteParams);
//                                 finalCustomProgram = withDisplayDefaults({
//                                     ...fallbackProgram,
//                                     seasonalPricing: {
//                                         summer: { gold: scenarios.summer, diamond: scenarios.summer },
//                                         winter: { gold: scenarios.winter, diamond: scenarios.winter },
//                                     },
//                                 });
//                                 console.log(`[debug] Fallback program has correct duration: ${finalCustomProgram.duration.days} days`);
//                             }
//                         }

//                         responseText = responseText.replace('[EgipturaCustomProgram:' + jsonString + ']', '').trim();
//                     }
//                 }
//             }
            
//             // 2. Fallback - فقط للطلبات المخصصة الصريحة
//             const hasTravelDetails = /\d+\s*(days?|d[ií]as|ايام)/i.test(userInput);
//             if (isExplicitCustomRequest && hasTravelDetails && !finalCustomProgram) {
//                 console.warn("[ai:fallback] Explicit custom request detected, generating local program.");
                
//                 // ✅ استخدام الفال باك مباشرة مع التأكد من عدد الأيام
//                 const fallbackProgram = generateLocalFallbackProgram(userInput, currentLang);
                
//                 // ✅ التأكد من أن الفال باك بيكون بعدد الأيام الصحيح
//                 if (requestedDays > 0 && fallbackProgram.duration.days !== requestedDays) {
//                     console.warn(`[debug] Fallback has wrong duration: ${fallbackProgram.duration.days}. Forcing correct duration.`);
//                     // إعادة توليد البرنامج مع التركيز على عدد الأيام
//                     const correctedInput = userInput.replace(/(\d+)\s*(days?|d[ií]as|ايام)/i, `${requestedDays} days`);
//                     const correctedFallback = generateLocalFallbackProgram(correctedInput, currentLang);
//                     if (correctedFallback.quoteParams && validateQuoteParams(correctedFallback.quoteParams)) {
//                         const scenarios = calculatePriceScenarios(correctedFallback.quoteParams);
//                         finalCustomProgram = withDisplayDefaults({
//                             ...correctedFallback,
//                             seasonalPricing: {
//                                 summer: { gold: scenarios.summer, diamond: scenarios.summer },
//                                 winter: { gold: scenarios.winter, diamond: scenarios.winter },
//                             },
//                         });
//                     }
//                 } else if (fallbackProgram.quoteParams && validateQuoteParams(fallbackProgram.quoteParams)) {
//                     const scenarios = calculatePriceScenarios(fallbackProgram.quoteParams);
//                     finalCustomProgram = withDisplayDefaults({
//                         ...fallbackProgram,
//                         seasonalPricing: {
//                             summer: { gold: scenarios.summer, diamond: scenarios.summer },
//                             winter: { gold: scenarios.winter, diamond: scenarios.winter },
//                         },
//                     });
//                 }
//                 responseText = uiText.customQuoteCreated;
//             }

//             // 3. Extract any pre-defined program tokens
//             const programTokenRegex = /\[EgipturaProgram:(\d+)\]/g;
//             const programIds: number[] = [];
//             let match;
//             while ((match = programTokenRegex.exec(responseText)) !== null) {
//                 programIds.push(parseInt(match[1], 10));
//             }

//             // ✅ البحث عن البرامج المطابقة - فقط إذا لم يكن طلب مخصص
//             let matchingProgramIds: number[] = [];
//             if (!isExplicitCustomRequest) {
//                 matchingProgramIds = findMatchingPrograms(userInput, finalCustomProgram);
//             }

//             // ✅ المنطق البسيط للطلبات العادية:
//             if (matchingProgramIds.length > 0 && !isExplicitCustomRequest) {
//                 // طلبات البرامج العادية → عرض البرامج المشابهة
//                 programIds.length = 0;
//                 programIds.push(...matchingProgramIds);
//                 finalCustomProgram = undefined; // إخفاء البرنامج المخصص
                
//                 if (!responseText || responseText === uiText.customQuoteCreated) {
//                     responseText = currentLang === 'es' ? 
//                         "Encontré estos programas que coinciden con lo que buscas:" :
//                         currentLang === 'en' ? 
//                         "I found these programs that match what you're looking for:" :
//                         "لقد وجدت هذه البرامج التي تطابق ما تبحث عنه:";
//                 }
//             } else if (isExplicitCustomRequest) {
//                 // ✅ طلبات مخصصة صريحة → عرض البرنامج المخصص فقط
//                 programIds.length = 0; // إخفاء البرامج الجاهزة
                
//                 // ✅ إذا مفيش برنامج مخصص، نستخدم الفال باك مباشرة
//                 if (!finalCustomProgram && requestedDays > 0) {
//                     console.log(`[debug] No custom program found, generating fallback for ${requestedDays} days`);
//                     const fallbackProgram = generateLocalFallbackProgram(userInput, currentLang);
//                     if (fallbackProgram.quoteParams && validateQuoteParams(fallbackProgram.quoteParams)) {
//                         const scenarios = calculatePriceScenarios(fallbackProgram.quoteParams);
//                         finalCustomProgram = withDisplayDefaults({
//                             ...fallbackProgram,
//                             seasonalPricing: {
//                                 summer: { gold: scenarios.summer, diamond: scenarios.summer },
//                                 winter: { gold: scenarios.winter, diamond: scenarios.winter },
//                             },
//                         });
//                         responseText = uiText.customQuoteCreated;
//                     }
//                 }
                
//                 // ✅ التأكد النهائي من عدد الأيام - هذه آخر فرصة
//                 if (finalCustomProgram && requestedDays > 0 && finalCustomProgram.duration.days !== requestedDays) {
//                     console.error(`[debug] FINAL CHECK FAILED: Program has ${finalCustomProgram.duration.days} days but should have ${requestedDays}. FORCING CORRECTION.`);
//                     // إجبار التصحيح باستخدام الفال باك سيرفيس
//                     const forcedFallback = generateLocalFallbackProgram(userInput, currentLang);
//                     if (forcedFallback.quoteParams && validateQuoteParams(forcedFallback.quoteParams)) {
//                         const scenarios = calculatePriceScenarios(forcedFallback.quoteParams);
//                         finalCustomProgram = withDisplayDefaults({
//                             ...forcedFallback,
//                             seasonalPricing: {
//                                 summer: { gold: scenarios.summer, diamond: scenarios.summer },
//                                 winter: { gold: scenarios.winter, diamond: scenarios.winter },
//                             },
//                         });
//                         console.log(`[debug] Forced correction result: ${finalCustomProgram.duration.days} days`);
//                     }
//                 }
                
//                 // ✅ التأكد من أن الاسم مخصص وليس اسم برنامج جاهز
//                 if (finalCustomProgram) {
//                     const predefinedProgramNames = knowledgeBase.packages.map(p => p.name.en);
//                     const currentName = finalCustomProgram.name.en;
//                     if (predefinedProgramNames.some(name => currentName.includes(name))) {
//                         console.log(`[debug] Replacing predefined program name: ${currentName}`);
//                         finalCustomProgram.name = {
//                             en: `Custom ${finalCustomProgram.duration.days}-Day Egypt Journey`,
//                             es: `Viaje Personalizado de ${finalCustomProgram.duration.days} Días por Egipto`,
//                             ar: `رحلة مخصصة لمدة ${finalCustomProgram.duration.days} أيام في مصر`
//                         };
//                     }
//                 }
//             }

//             responseText = responseText.replace(programTokenRegex, '').trim();

//             // 4. Create and add the final message
//             if (responseText || programIds.length > 0 || finalCustomProgram) {
//                 const modelMessage: Message = {
//                     id: Date.now().toString() + Math.random(),
//                     role: 'model',
//                     content: responseText,
//                     programIds: programIds.length > 0 ? programIds : undefined,
//                     customPrograms: finalCustomProgram ? [finalCustomProgram] : undefined,
//                 };
//                 setMessages(prev => [...prev, modelMessage]);
//             }
//         }

//     } catch (error) {
//         console.error(error);
//         const uiText = knowledgeBase.localizedStrings.ui[language] || knowledgeBase.localizedStrings.ui.es;
//         let errorMessage = uiText.genericError || 'An error occurred. Please try again.';

//         // ✅ معالجة أخطاء السيرفر - استخدام الفال باك مباشرة
//         if (error instanceof Error && (error.message.includes('server') || error.message.includes('timeout') || error.message.includes('quota'))) {
//             console.warn("[debug] Server error detected, using fallback service");
//             const fallbackProgram = generateLocalFallbackProgram(userInput, language);
//             if (fallbackProgram.quoteParams && validateQuoteParams(fallbackProgram.quoteParams)) {
//                 const scenarios = calculatePriceScenarios(fallbackProgram.quoteParams);
//                 const finalProgram = withDisplayDefaults({
//                     ...fallbackProgram,
//                     seasonalPricing: {
//                         summer: { gold: scenarios.summer, diamond: scenarios.summer },
//                         winter: { gold: scenarios.winter, diamond: scenarios.winter },
//                     },
//                 });
                
//                 const modelMessage: Message = {
//                     id: Date.now().toString() + Math.random(),
//                     role: 'model',
//                     content: uiText.customQuoteCreated,
//                     customPrograms: [finalProgram],
//                 };
//                 setMessages(prev => [...prev, modelMessage]);
//                 setIsLoading(false);
//                 return;
//             }
//         }

//         if (error instanceof Error) {
//             if (error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED')) {
//                 errorMessage = uiText.quotaError || "Our AI assistant is currently experiencing high demand. Please try again in a little while.";
//             } else if (error.message.includes('API key not valid')) {
//                 errorMessage = uiText.apiKeyError || "There's an issue with the connection to our AI service. Our team has been notified.";
//             }
//         }
        
//         addMessage('model', errorMessage);
//     } finally {
//         setIsLoading(false);
//     }
// }, [addMessage, language, setLanguage, messages, findMatchingPrograms, uiText.customQuoteCreated]);


    // ✅ استبدل دالة handleSendMessage في App.tsx بهذا الكود المحسّن

// const handleSendMessage = useCallback(async (userInput: string) => {
//     if (!userInput.trim()) return;

//     const userMessage: Message = { id: Date.now().toString(), role: 'user', content: userInput };
//     const currentMessages = [...messages, userMessage];
//     setMessages(currentMessages);
//     setIsLoading(true);

//     try {
//         // ✅ تحليل الطلب لمعرفة النوع
//         const isExplicitCustomRequest = /build|create|make|design|armar|crear|hacer|formar|custom|personalized|personalizado|مخصص|برنامج مخصص|رحلة مخصصة|tailor/i.test(userInput.toLowerCase());
//         const isChipRequest = /i want an? \d+-day trip (with|without) cruise/i.test(userInput.toLowerCase());
        
//         // ✅ استخراج عدد الأيام المطلوبة من رسالة المستخدم بدقة
//         const daysMatch = userInput.match(/(\d+)\s*(days?|d[iíì]as|ايام|يوم)/i);
//         const nightsMatch = userInput.match(/(\d+)\s*(nights?|noches?|ليال(?:ي)?)/i);
        
//         let requestedDays = 0;
//         if (daysMatch) {
//             requestedDays = parseInt(daysMatch[1], 10);
//         } else if (nightsMatch) {
//             requestedDays = parseInt(nightsMatch[1], 10) + 1; // nights + 1 = days
//         }
        
//         // ✅ استخراج تفاصيل إضافية من الرسالة
//         const durationPattern = /duration:\s*(\d+)\s*days?/i;
//         const durationMatch = userInput.match(durationPattern);
//         if (durationMatch) {
//             requestedDays = parseInt(durationMatch[1], 10);
//         }
        
//         console.log(`[debug] Request analysis - Days requested: ${requestedDays}, Chip: ${isChipRequest}, Custom: ${isExplicitCustomRequest}`);
//         console.log(`[debug] Full user input: ${userInput}`);

//         let response, responseText, currentLang = language;
//         let finalCustomProgram: Program | undefined = undefined;

//         // ✅ الخطوة 1: إذا كان طلب Chip، نتخطى الـ AI تماماً
//         if (isChipRequest) {
//             console.log(`[debug] Chip request detected - skipping AI and showing matching programs directly`);
            
//             const matchingProgramIds = findMatchingPrograms(userInput);
            
//             responseText = currentLang === 'es' ? 
//                 "Encontré estos programas que coinciden con lo que buscas:" :
//                 currentLang === 'en' ? 
//                 "I found these programs that match what you're looking for:" :
//                 "لقد وجدت هذه البرامج التي تطابق ما تبحث عنه:";
            
//             const programIds = matchingProgramIds;
            
//             const modelMessage: Message = {
//                 id: Date.now().toString() + Math.random(),
//                 role: 'model',
//                 content: responseText,
//                 programIds: programIds.length > 0 ? programIds : undefined,
//             };
//             setMessages(prev => [...prev, modelMessage]);
//             setIsLoading(false);
//             return;
//         } else {
//             // ✅ الطلبات العادية نرسلها للـ AI
//             const fullPrompt = messages.length > 2 ? 
//                 `PREVIOUS_CONVERSATION_CONTEXT: ${messages.map(m => `${m.role}: ${m.content}`).join('\n')}\n\nCURRENT_USER_REQUEST: ${userInput}`
//                 : userInput;

//             response = await sendMessageToAI(fullPrompt);
            
//             // Language detection
//             response = response.trimStart();
//             const langMatch = response.match(/^\[lang:(es|en|ar)\]/);

//             if (langMatch) {
//                 const detectedLang = langMatch[1] as Language;
//                 if (language !== detectedLang) {
//                     setLanguage(detectedLang);
//                     currentLang = detectedLang;
//                 }
//                 response = response.replace(langMatch[0], '').trim();
//             }

//             responseText = response;

//             // 1. Extract custom program token من رد الـ AI
//             const jsonString = extractBalancedJson(responseText);
//             if (jsonString && isExplicitCustomRequest) {
//                 console.log("[ai:program_token_found] Processing custom program for explicit request");
//                 const tryParse = (s: string) => { 
//                     try { return JSON.parse(s); } 
//                     catch(e) { console.error("JSON Parse Error:", e); return null; } 
//                 };
                
//                 let programFromAI = tryParse(jsonString);
//                 if (programFromAI) {
//                     const normalized = normalizeQuoteData(programFromAI);
//                     const filled = fillMissingFields(normalized, knowledgeBase.localizedStrings.ui[currentLang]);
                    
//                     if (filled.quoteParams && validateQuoteParams(filled.quoteParams)) {
//                         // ✅ التحقق من duration قبل حساب السعر
//                         const aiDuration = filled.duration?.days || filled.quoteParams?.duration || 0;
                        
//                         console.log(`[debug] AI generated duration: ${aiDuration}, User requested: ${requestedDays}`);
                        
//                         // ✅ إذا كان الـ AI أخطأ في المدة، نستخدم الـ fallback مباشرة
//                         if (requestedDays > 0 && aiDuration !== requestedDays) {
//                             console.error(`[debug] ❌ AI ERROR: Generated ${aiDuration} days instead of ${requestedDays}. Using LOCAL FALLBACK.`);
                            
//                             // نستخدم الـ fallback service مباشرة
//                             const fallbackProgram = generateLocalFallbackProgram(userInput, currentLang);
                            
//                             if (fallbackProgram.quoteParams && validateQuoteParams(fallbackProgram.quoteParams)) {
//                                 const scenarios = calculatePriceScenarios(fallbackProgram.quoteParams);
//                                 finalCustomProgram = withDisplayDefaults({
//                                     ...fallbackProgram,
//                                     seasonalPricing: {
//                                         summer: { gold: scenarios.summer, diamond: scenarios.summer },
//                                         winter: { gold: scenarios.winter, diamond: scenarios.winter },
//                                     },
//                                 });
//                                 console.log(`[debug] ✅ Fallback program created with correct duration: ${finalCustomProgram.duration.days} days`);
//                             }
//                         } else {
//                             // الـ AI صحيح - نستخدم برنامجه
//                             const scenarios = calculatePriceScenarios(filled.quoteParams);
//                             finalCustomProgram = withDisplayDefaults({
//                                 ...filled,
//                                 isCustom: true,
//                                 seasonalPricing: {
//                                     summer: { gold: scenarios.summer, diamond: scenarios.summer },
//                                     winter: { gold: scenarios.winter, diamond: scenarios.winter },
//                                 },
//                             });
//                             console.log(`[debug] ✅ AI program accepted with duration: ${finalCustomProgram.duration.days} days`);
//                         }

//                         responseText = responseText.replace('[EgipturaCustomProgram:' + jsonString + ']', '').trim();
//                         if (!responseText) {
//                             responseText = uiText.customQuoteCreated;
//                         }
//                     }
//                 }
//             }
            
//             // 2. Fallback - فقط للطلبات المخصصة الصريحة إذا فشل الـ AI
//             const hasTravelDetails = /\d+\s*(days?|d[iíì]as|ايام)/i.test(userInput);
//             if (isExplicitCustomRequest && hasTravelDetails && !finalCustomProgram) {
//                 console.warn("[ai:fallback] Explicit custom request detected but no program from AI, generating local program.");
                
//                 const fallbackProgram = generateLocalFallbackProgram(userInput, currentLang);
                
//                 if (fallbackProgram.quoteParams && validateQuoteParams(fallbackProgram.quoteParams)) {
//                     const scenarios = calculatePriceScenarios(fallbackProgram.quoteParams);
//                     finalCustomProgram = withDisplayDefaults({
//                         ...fallbackProgram,
//                         seasonalPricing: {
//                             summer: { gold: scenarios.summer, diamond: scenarios.summer },
//                             winter: { gold: scenarios.winter, diamond: scenarios.winter },
//                         },
//                     });
//                     console.log(`[debug] ✅ Final fallback program: ${finalCustomProgram.duration.days} days`);
//                 }
                
//                 responseText = uiText.customQuoteCreated;
//             }

//             // 3. Extract any pre-defined program tokens
//             const programTokenRegex = /\[EgipturaProgram:(\d+)\]/g;
//             const programIds: number[] = [];
//             let match;
//             while ((match = programTokenRegex.exec(responseText)) !== null) {
//                 programIds.push(parseInt(match[1], 10));
//             }

//             // ✅ البحث عن البرامج المطابقة - فقط إذا لم يكن طلب مخصص
//             let matchingProgramIds: number[] = [];
//             if (!isExplicitCustomRequest) {
//                 matchingProgramIds = findMatchingPrograms(userInput, finalCustomProgram);
//             }

//             // ✅ المنطق البسيط للطلبات العادية:
//             if (matchingProgramIds.length > 0 && !isExplicitCustomRequest) {
//                 programIds.length = 0;
//                 programIds.push(...matchingProgramIds);
//                 finalCustomProgram = undefined;
                
//                 if (!responseText || responseText === uiText.customQuoteCreated) {
//                     responseText = currentLang === 'es' ? 
//                         "Encontré estos programas que coinciden con lo que buscas:" :
//                         currentLang === 'en' ? 
//                         "I found these programs that match what you're looking for:" :
//                         "لقد وجدت هذه البرامج التي تطابق ما تبحث عنه:";
//                 }
//             } else if (isExplicitCustomRequest) {
//                 programIds.length = 0;
                
//                 // ✅ التأكد النهائي من المدة قبل الإرسال
//                 if (finalCustomProgram && requestedDays > 0 && finalCustomProgram.duration.days !== requestedDays) {
//                     console.error(`[debug] 🚨 CRITICAL: Program has ${finalCustomProgram.duration.days} days but should have ${requestedDays}. REGENERATING.`);
                    
//                     const forcedFallback = generateLocalFallbackProgram(userInput, currentLang);
//                     if (forcedFallback.quoteParams && validateQuoteParams(forcedFallback.quoteParams)) {
//                         const scenarios = calculatePriceScenarios(forcedFallback.quoteParams);
//                         finalCustomProgram = withDisplayDefaults({
//                             ...forcedFallback,
//                             seasonalPricing: {
//                                 summer: { gold: scenarios.summer, diamond: scenarios.summer },
//                                 winter: { gold: scenarios.winter, diamond: scenarios.winter },
//                             },
//                         });
//                         console.log(`[debug] ✅ Forced regeneration result: ${finalCustomProgram.duration.days} days`);
//                     }
//                 }
                
//                 // ✅ التأكد من أن الاسم مخصص وليس اسم برنامج جاهز
//                 if (finalCustomProgram) {
//                     const predefinedProgramNames = knowledgeBase.packages.map(p => p.name.en);
//                     const currentName = finalCustomProgram.name.en;
                    
//                     // إذا كان الاسم يحتوي على اسم برنامج جاهز، نستبدله
//                     const containsPredefined = predefinedProgramNames.some(name => 
//                         currentName.toLowerCase().includes(name.toLowerCase())
//                     );
                    
//                     if (containsPredefined || !currentName.toLowerCase().includes('custom')) {
//                         console.log(`[debug] Replacing generic/predefined program name: ${currentName}`);
//                         const dur = finalCustomProgram.duration.days;
//                         finalCustomProgram.name = {
//                             en: `Custom ${dur}-Day Egypt Journey`,
//                             es: `Viaje Personalizado de ${dur} Días por Egipto`,
//                             ar: `رحلة مخصصة لمدة ${dur} أيام في مصر`
//                         };
//                     }
//                 }
//             }

//             responseText = responseText.replace(programTokenRegex, '').trim();

//             // 4. Create and add the final message
//             if (responseText || programIds.length > 0 || finalCustomProgram) {
//                 const modelMessage: Message = {
//                     id: Date.now().toString() + Math.random(),
//                     role: 'model',
//                     content: responseText,
//                     programIds: programIds.length > 0 ? programIds : undefined,
//                     customPrograms: finalCustomProgram ? [finalCustomProgram] : undefined,
//                 };
//                 setMessages(prev => [...prev, modelMessage]);
//             }
//         }

//     } catch (error) {
//         console.error(error);
//         let errorMessage = uiText.genericError || 'An error occurred. Please try again.';

//         // ✅ معالجة أخطاء السيرفر - استخدام الفال باك مباشرة
//         if (error instanceof Error && (error.message.includes('server') || error.message.includes('timeout') || error.message.includes('quota'))) {
//             console.warn("[debug] Server error detected, using fallback service");
            
//             const isCustomRequest = /build|create|make|design|custom|personalized|tailor/i.test(userInput.toLowerCase());
            
//             if (isCustomRequest) {
//                 const fallbackProgram = generateLocalFallbackProgram(userInput, language);
//                 if (fallbackProgram.quoteParams && validateQuoteParams(fallbackProgram.quoteParams)) {
//                     const scenarios = calculatePriceScenarios(fallbackProgram.quoteParams);
//                     const finalProgram = withDisplayDefaults({
//                         ...fallbackProgram,
//                         seasonalPricing: {
//                             summer: { gold: scenarios.summer, diamond: scenarios.summer },
//                             winter: { gold: scenarios.winter, diamond: scenarios.winter },
//                         },
//                     });
                    
//                     const modelMessage: Message = {
//                         id: Date.now().toString() + Math.random(),
//                         role: 'model',
//                         content: uiText.customQuoteCreated,
//                         customPrograms: [finalProgram],
//                     };
//                     setMessages(prev => [...prev, modelMessage]);
//                     setIsLoading(false);
//                     return;
//                 }
//             }
//         }

//         if (error instanceof Error) {
//             if (error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED')) {
//                 errorMessage = uiText.quotaError || "Our AI assistant is currently experiencing high demand. Please try again in a little while.";
//             } else if (error.message.includes('API key not valid')) {
//                 errorMessage = uiText.apiKeyError || "There's an issue with the connection to our AI service. Our team has been notified.";
//             }
//         }
        
//         addMessage('model', errorMessage);
//     } finally {
//         setIsLoading(false);
//     }
// }, [addMessage, language, setLanguage, messages, findMatchingPrograms, uiText.customQuoteCreated, validateQuoteParams]);


    // ✅ نسخة محسنة من handleSendMessage مع تتبع شامل

// const handleSendMessage = useCallback(async (userInput: string) => {
//     if (!userInput.trim()) return;

//     const userMessage: Message = { id: Date.now().toString(), role: 'user', content: userInput };
//     const currentMessages = [...messages, userMessage];
//     setMessages(currentMessages);
//     setIsLoading(true);

//     // ✅ LOG 1: تسجيل بداية المعالجة
//     console.group('🚀 Processing User Request');
//     console.log('User Input:', userInput);
//     console.log('Current Language:', language);

//     try {
//         // ✅ تحليل الطلب
//         const isExplicitCustomRequest = /build|create|make|design|armar|crear|hacer|formar|custom|personalized|personalizado|مخصص|برنامج مخصص|رحلة مخصصة|tailor/i.test(userInput.toLowerCase());
//         const isChipRequest = /i want an? \d+-day trip (with|without) cruise/i.test(userInput.toLowerCase());
        
//         // ✅ استخراج المدة بدقة عالية
//         const daysMatch = userInput.match(/(\d+)\s*(days?|d[iíì]as|ايام|يوم)/i);
//         const nightsMatch = userInput.match(/(\d+)\s*(nights?|noches?|ليال(?:ي)?)/i);
//         const durationPattern = /duration:\s*(\d+)\s*days?/i;
//         const durationMatch = userInput.match(durationPattern);
        
//         let requestedDays = 0;
//         if (durationMatch) {
//             requestedDays = parseInt(durationMatch[1], 10);
//             console.log('📌 Duration extracted from "duration:" pattern:', requestedDays);
//         } else if (daysMatch) {
//             requestedDays = parseInt(daysMatch[1], 10);
//             console.log('📌 Duration extracted from days pattern:', requestedDays);
//         } else if (nightsMatch) {
//             requestedDays = parseInt(nightsMatch[1], 10) + 1;
//             console.log('📌 Duration calculated from nights:', requestedDays, '(nights + 1)');
//         }
        
//         // ✅ LOG 2: تسجيل نوع الطلب
//         console.log('📊 Request Analysis:', {
//             isCustomRequest: isExplicitCustomRequest,
//             isChipRequest: isChipRequest,
//             requestedDays: requestedDays
//         });

//         let response, responseText, currentLang = language;
//         let finalCustomProgram: Program | undefined = undefined;

//         // ✅ معالجة Chip Requests
//         if (isChipRequest) {
//             console.log('⚡ Chip request detected - skipping AI');
            
//             const matchingProgramIds = findMatchingPrograms(userInput);
//             console.log('✅ Found matching programs:', matchingProgramIds);
            
//             responseText = currentLang === 'es' ? 
//                 "Encontré estos programas que coinciden con lo que buscas:" :
//                 currentLang === 'en' ? 
//                 "I found these programs that match what you're looking for:" :
//                 "لقد وجدت هذه البرامج التي تطابق ما تبحث عنه:";
            
//             const modelMessage: Message = {
//                 id: Date.now().toString() + Math.random(),
//                 role: 'model',
//                 content: responseText,
//                 programIds: matchingProgramIds.length > 0 ? matchingProgramIds : undefined,
//             };
//             setMessages(prev => [...prev, modelMessage]);
//             setIsLoading(false);
//             console.groupEnd();
//             return;
//         }

//         // ✅ معالجة الطلبات العادية عبر AI
//         console.log('🤖 Sending to AI...');
//         const fullPrompt = messages.length > 2 ? 
//             `PREVIOUS_CONVERSATION_CONTEXT: ${messages.map(m => `${m.role}: ${m.content}`).join('\n')}\n\nCURRENT_USER_REQUEST: ${userInput}`
//             : userInput;

//         response = await sendMessageToAI(fullPrompt);
//         console.log('✅ AI Response received, length:', response.length);
        
//         // Language detection
//         response = response.trimStart();
//         const langMatch = response.match(/^\[lang:(es|en|ar)\]/);

//         if (langMatch) {
//             const detectedLang = langMatch[1] as Language;
//             console.log('🌐 Language detected:', detectedLang);
//             if (language !== detectedLang) {
//                 setLanguage(detectedLang);
//                 currentLang = detectedLang;
//             }
//             response = response.replace(langMatch[0], '').trim();
//         }

//         responseText = response;

//         // ✅ LOG 3: معالجة Custom Program من AI
//         const jsonString = extractBalancedJson(responseText);
//         if (jsonString && isExplicitCustomRequest) {
//             console.log('🎯 Custom program token found in AI response');
//             console.log('📦 JSON length:', jsonString.length);
            
//             const tryParse = (s: string) => { 
//                 try { return JSON.parse(s); } 
//                 catch(e) { 
//                     console.error('❌ JSON Parse Error:', e); 
//                     return null; 
//                 } 
//             };
            
//             let programFromAI = tryParse(jsonString);
//             if (programFromAI) {
//                 console.log('✅ AI program parsed successfully');
                
//                 const normalized = normalizeQuoteData(programFromAI);
//                 const filled = fillMissingFields(normalized, knowledgeBase.localizedStrings.ui[currentLang]);
                
//                 console.log('📊 AI Program Details:', {
//                     name: filled.name?.en,
//                     duration: filled.duration?.days,
//                     quoteParamsDuration: filled.quoteParams?.duration,
//                     requestedDays: requestedDays
//                 });
                
//                 if (filled.quoteParams && validateQuoteParams(filled.quoteParams)) {
//                     const aiDuration = filled.duration?.days || filled.quoteParams?.duration || 0;
                    
//                     // ✅ التحقق الصارم من Duration
//                     if (requestedDays > 0 && aiDuration !== requestedDays) {
//                         console.error(`❌ AI DURATION ERROR: Generated ${aiDuration} days instead of ${requestedDays}`);
//                         console.log('🔄 Switching to LOCAL FALLBACK...');
                        
//                         const fallbackProgram = generateLocalFallbackProgram(userInput, currentLang);
//                         console.log('✅ Fallback program created:', {
//                             name: fallbackProgram.name.en,
//                             duration: fallbackProgram.duration.days,
//                             nights: fallbackProgram.duration.nights
//                         });
                        
//                         if (fallbackProgram.quoteParams && validateQuoteParams(fallbackProgram.quoteParams)) {
//                             const scenarios = calculatePriceScenarios(fallbackProgram.quoteParams);
//                             finalCustomProgram = withDisplayDefaults({
//                                 ...fallbackProgram,
//                                 seasonalPricing: {
//                                     summer: { gold: scenarios.summer, diamond: scenarios.summer },
//                                     winter: { gold: scenarios.winter, diamond: scenarios.winter },
//                                 },
//                             });
//                             console.log('💰 Pricing calculated for fallback program');
//                         }
//                     } else {
//                         console.log('✅ AI duration is correct, using AI program');
//                         const scenarios = calculatePriceScenarios(filled.quoteParams);
//                         finalCustomProgram = withDisplayDefaults({
//                             ...filled,
//                             isCustom: true,
//                             seasonalPricing: {
//                                 summer: { gold: scenarios.summer, diamond: scenarios.summer },
//                                 winter: { gold: scenarios.winter, diamond: scenarios.winter },
//                             },
//                         });
//                         console.log('💰 Pricing calculated for AI program');
//                     }

//                     responseText = responseText.replace('[EgipturaCustomProgram:' + jsonString + ']', '').trim();
//                     if (!responseText) {
//                         responseText = uiText.customQuoteCreated;
//                     }
//                 }
//             }
//         }
        
//         // ✅ Fallback للطلبات المخصصة بدون رد AI
//         const hasTravelDetails = /\d+\s*(days?|d[iíì]as|ايام)/i.test(userInput);
//         if (isExplicitCustomRequest && hasTravelDetails && !finalCustomProgram) {
//             console.warn('⚠️ Custom request without AI program - generating fallback');
            
//             const fallbackProgram = generateLocalFallbackProgram(userInput, currentLang);
//             console.log('✅ Fallback program details:', {
//                 duration: fallbackProgram.duration.days,
//                 nights: fallbackProgram.duration.nights,
//                 cairo: fallbackProgram.quoteParams?.itineraryPlan?.nights?.cairo,
//                 cruise: fallbackProgram.quoteParams?.itineraryPlan?.nights?.cruise
//             });
            
//             if (fallbackProgram.quoteParams && validateQuoteParams(fallbackProgram.quoteParams)) {
//                 const scenarios = calculatePriceScenarios(fallbackProgram.quoteParams);
//                 finalCustomProgram = withDisplayDefaults({
//                     ...fallbackProgram,
//                     seasonalPricing: {
//                         summer: { gold: scenarios.summer, diamond: scenarios.summer },
//                         winter: { gold: scenarios.winter, diamond: scenarios.winter },
//                     },
//                 });
//                 console.log('💰 Pricing scenarios:', scenarios);
//             }
            
//             responseText = uiText.customQuoteCreated;
//         }

//         // ✅ استخراج Pre-defined Program Tokens
//         const programTokenRegex = /\[EgipturaProgram:(\d+)\]/g;
//         const programIds: number[] = [];
//         let match;
//         while ((match = programTokenRegex.exec(responseText)) !== null) {
//             programIds.push(parseInt(match[1], 10));
//         }
//         console.log('📋 Pre-defined program IDs found:', programIds);

//         // ✅ البحث عن البرامج المطابقة
//         let matchingProgramIds: number[] = [];
//         if (!isExplicitCustomRequest) {
//             matchingProgramIds = findMatchingPrograms(userInput, finalCustomProgram);
//             console.log('🔍 Matching programs found:', matchingProgramIds);
//         }

//         // ✅ المنطق النهائي
//         if (matchingProgramIds.length > 0 && !isExplicitCustomRequest) {
//             console.log('✅ Showing matching programs');
//             programIds.length = 0;
//             programIds.push(...matchingProgramIds);
//             finalCustomProgram = undefined;
            
//             if (!responseText || responseText === uiText.customQuoteCreated) {
//                 responseText = currentLang === 'es' ? 
//                     "Encontré estos programas que coinciden con lo que buscas:" :
//                     currentLang === 'en' ? 
//                     "I found these programs that match what you're looking for:" :
//                     "لقد وجدت هذه البرامج التي تطابق ما تبحث عنه:";
//             }
//         } else if (isExplicitCustomRequest) {
//             console.log('✅ Custom program request - clearing predefined programs');
//             programIds.length = 0;
            
//             // ✅ التحقق النهائي من Duration
//             if (finalCustomProgram && requestedDays > 0 && finalCustomProgram.duration.days !== requestedDays) {
//                 console.error(`🚨 FINAL CHECK FAILED: ${finalCustomProgram.duration.days} days vs ${requestedDays} requested`);
//                 console.log('🔄 Force regenerating program...');
                
//                 const forcedFallback = generateLocalFallbackProgram(userInput, currentLang);
//                 if (forcedFallback.quoteParams && validateQuoteParams(forcedFallback.quoteParams)) {
//                     const scenarios = calculatePriceScenarios(forcedFallback.quoteParams);
//                     finalCustomProgram = withDisplayDefaults({
//                         ...forcedFallback,
//                         seasonalPricing: {
//                             summer: { gold: scenarios.summer, diamond: scenarios.summer },
//                             winter: { gold: scenarios.winter, diamond: scenarios.winter },
//                         },
//                     });
//                     console.log('✅ Force regeneration successful:', finalCustomProgram.duration.days, 'days');
//                 }
//             }
            
//             // ✅ تصحيح الاسم
//             if (finalCustomProgram) {
//                 const predefinedProgramNames = knowledgeBase.packages.map(p => p.name.en);
//                 const currentName = finalCustomProgram.name.en;
                
//                 const containsPredefined = predefinedProgramNames.some(name => 
//                     currentName.toLowerCase().includes(name.toLowerCase())
//                 );
                
//                 if (containsPredefined || !currentName.toLowerCase().includes('custom')) {
//                     console.log('🔧 Fixing program name from:', currentName);
//                     const dur = finalCustomProgram.duration.days;
//                     finalCustomProgram.name = {
//                         en: `Custom ${dur}-Day Egypt Journey`,
//                         es: `Viaje Personalizado de ${dur} Días por Egipto`,
//                         ar: `رحلة مخصصة لمدة ${dur} أيام في مصر`
//                     };
//                     console.log('✅ New program name:', finalCustomProgram.name.en);
//                 }
//             }
//         }

//         responseText = responseText.replace(programTokenRegex, '').trim();

//         // ✅ LOG النهائي
//         console.log('📤 Final Message:', {
//             responseText: responseText.substring(0, 100) + '...',
//             programIds: programIds,
//             hasCustomProgram: !!finalCustomProgram,
//             customProgramDuration: finalCustomProgram?.duration?.days
//         });

//         // إنشاء الرسالة النهائية
//         if (responseText || programIds.length > 0 || finalCustomProgram) {
//             const modelMessage: Message = {
//                 id: Date.now().toString() + Math.random(),
//                 role: 'model',
//                 content: responseText,
//                 programIds: programIds.length > 0 ? programIds : undefined,
//                 customPrograms: finalCustomProgram ? [finalCustomProgram] : undefined,
//             };
//             setMessages(prev => [...prev, modelMessage]);
//             console.log('✅ Message added to chat');
//         }

//         console.groupEnd();

//     } catch (error) {
//         console.error('❌ Error occurred:', error);
//         console.groupEnd();
        
//         let errorMessage = uiText.genericError || 'An error occurred. Please try again.';

//         // معالجة أخطاء السيرفر
//         if (error instanceof Error && (error.message.includes('server') || error.message.includes('timeout') || error.message.includes('quota'))) {
//             console.warn('⚠️ Server error - using fallback');
            
//             const isCustomRequest = /build|create|make|design|custom|personalized|tailor/i.test(userInput.toLowerCase());
            
//             if (isCustomRequest) {
//                 const fallbackProgram = generateLocalFallbackProgram(userInput, language);
//                 if (fallbackProgram.quoteParams && validateQuoteParams(fallbackProgram.quoteParams)) {
//                     const scenarios = calculatePriceScenarios(fallbackProgram.quoteParams);
//                     const finalProgram = withDisplayDefaults({
//                         ...fallbackProgram,
//                         seasonalPricing: {
//                             summer: { gold: scenarios.summer, diamond: scenarios.summer },
//                             winter: { gold: scenarios.winter, diamond: scenarios.winter },
//                         },
//                     });
                    
//                     const modelMessage: Message = {
//                         id: Date.now().toString() + Math.random(),
//                         role: 'model',
//                         content: uiText.customQuoteCreated,
//                         customPrograms: [finalProgram],
//                     };
//                     setMessages(prev => [...prev, modelMessage]);
//                     setIsLoading(false);
//                     return;
//                 }
//             }
//         }

//         if (error instanceof Error) {
//             if (error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED')) {
//                 errorMessage = uiText.quotaError || "Our AI assistant is currently experiencing high demand. Please try again in a little while.";
//             } else if (error.message.includes('API key not valid')) {
//                 errorMessage = uiText.apiKeyError || "There's an issue with the connection to our AI service. Our team has been notified.";
//             }
//         }
        
//         addMessage('model', errorMessage);
//     } finally {
//         setIsLoading(false);
//     }
// }, [addMessage, language, setLanguage, messages, findMatchingPrograms, uiText.customQuoteCreated, validateQuoteParams]);


// ✅ استيراد الدوال المطلوبة (تأكد من أنها مستوردة)

    const handleSendMessage = useCallback(async (userInput: string) => {
    if (!userInput.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: userInput };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setIsLoading(true);

    try {
        // ✅ الخطوة 1: تحليل الطلب والكشف عن النية بدقة عالية
        const userInputLower = userInput.toLowerCase();
        
        // ✅ كلمات مفتاحية للطلبات المخصصة (يجب أن تكون موجودة بوضوح)
        const customKeywords = [
            'custom', 'personalized', 'personalizado', 'tailor', 'bespoke',
            'build', 'create', 'make', 'design', 'craft',
            'armar', 'crear', 'hacer', 'formar', 'diseñar',
            'مخصص', 'خاص', 'خاصة', 'مصمم', 'مصممة',
            'برنامج مخصص', 'رحلة مخصصة', 'رحلة خاصة', 'برنامج خاص'
        ];
        
        // ✅ كلمات تشير إلى طلب برامج جاهزة
        const readyProgramKeywords = [
            'show me', 'i want', 'quiero', 'necesito', 'dame',
            'أريد', 'أعطني', 'اعرض', 'عرض', 'أرني',
            'programs', 'packages', 'trips', 'tours',
            'programas', 'paquetes', 'viajes',
            'برامج', 'رحلات', 'باقات'
        ];
        
        // ✅ فحص وجود كلمات مخصصة صريحة
        const hasCustomKeyword = customKeywords.some(keyword => 
            userInputLower.includes(keyword)
        );
        
        // ✅ فحص وجود كلمات برامج جاهزة
        const hasReadyKeyword = readyProgramKeywords.some(keyword =>
            userInputLower.includes(keyword)
        );
        
        // ✅ القرار النهائي: مخصص فقط إذا كان هناك كلمة مخصصة صريحة
        const isExplicitCustomRequest = hasCustomKeyword && !hasReadyKeyword;
        
        // ✅ طلب برامج جاهزة: إذا لم يكن مخصص أو كان فيه كلمات برامج جاهزة
        const isReadyProgramRequest = !isExplicitCustomRequest && (hasReadyKeyword || !hasCustomKeyword);
        
        const isChipRequest = /i want an? \d+-day trip (with|without) cruise/i.test(userInputLower);
        
        // ✅ استخراج المدة
        const daysMatch = userInput.match(/(\d+)\s*(days?|d[ií]as|ايام|يوم)/i);
        const requestedDays = daysMatch ? parseInt(daysMatch[1], 10) : 0;
        
        console.log(`[debug] 🔍 Request analysis:
  - Input: "${userInput}"
  - Has custom keyword: ${hasCustomKeyword}
  - Has ready keyword: ${hasReadyKeyword}
  - Is explicit custom: ${isExplicitCustomRequest}
  - Is ready program: ${isReadyProgramRequest}
  - Days requested: ${requestedDays}`);

        let response, responseText, currentLang = language;
        let finalCustomProgram: Program | undefined = undefined;

        // ✅ الخطوة 2: معالجة الطلبات المخصصة الناقصة
        if (isExplicitCustomRequest && requestedDays === 0) {
            console.log('🔄 Incomplete custom request - asking for details');
            
            let questionMessage = '';
            if (language === 'en') {
                questionMessage = `I'd be delighted to create your perfect Egypt journey! ✨ To design your custom trip, I need to know:

• **How many travelers** will be experiencing Egypt?
• **What's your ideal trip duration?**
• **Which destinations** call to you? (Cairo, Nile cruise, Luxor, Alexandria, etc.)
• **When are you thinking of traveling?**
• **Do you prefer Gold comfort or Diamond luxury?**

Once I have these details, I'll craft your unforgettable Egyptian adventure!`;
            } else if (language === 'es') {
                questionMessage = `¡Me encantaría crear tu viaje perfecto a Egipto! ✨ Para diseñar tu viaje personalizado, necesito saber:

• **¿Cuántos viajeros** experimentarán Egipto?
• **¿Cuál es la duración ideal de tu viaje?**
• **¿Qué destinos** te llaman? (El Cairo, crucero por el Nilo, Luxor, Alejandría, etc.)
• **¿Cuándo estás pensando en viajar?**
• **¿Prefieres comfort Gold o lujo Diamond?**

Una vez que tenga estos detalles, ¡crearé tu inolvidable aventura egipcia!`;
            } else {
                questionMessage = `سأكون سعيدًا لإنشاء رحلتك المثالية إلى مصر! ✨ لتصميم رحلتك المخصصة، أحتاج إلى معرفة:

• **كم مسافر** سيشهدون مصر؟
• **ما هي مدة رحلتك المثالية؟**
• **أي الوجهات** تهمك؟ (القاهرة، رحلة نيلية، الأقصر، الإسكندرية، إلخ)
• **متى تخطط للسفر؟**
• **هل تفضل راحة Gold أم فخامة Diamond؟**

بمجرد حصولي على هذه التفاصيل، سأصمم مغامرتك المصرية التي لا تنسى!`;
            }
            
            const modelMessage: Message = {
                id: Date.now().toString() + Math.random(),
                role: 'model',
                content: questionMessage
            };
            
            setMessages(prev => [...prev, modelMessage]);
            setIsLoading(false);
            return;
        }

        // ✅ الخطوة 3: إرسال الطلب للـ AI
        const fullPrompt = messages.length > 2 ? 
            `PREVIOUS_CONVERSATION_CONTEXT: ${messages.map(m => `${m.role}: ${m.content}`).join('\n')}\n\nCURRENT_USER_REQUEST: ${userInput}`
            : userInput;

        response = await sendMessageToAI(fullPrompt);
        
        // Language detection
        response = response.trimStart();
        const langMatch = response.match(/^\[lang:(es|en|ar)\]/);

        if (langMatch) {
            const detectedLang = langMatch[1] as Language;
            if (language !== detectedLang) {
                setLanguage(detectedLang);
                currentLang = detectedLang;
            }
            response = response.replace(langMatch[0], '').trim();
        }

        responseText = response;

        // ✅ الخطوة 4: استخراج البرامج المخصصة - الإصلاح الرئيسي هنا!
        console.log('[debug] Looking for custom program token in response...');
        
        // طريقة فعالة لاستخراج الـ JSON من الـ token
        const extractCustomProgram = (text: string): string | null => {
            const tokenStart = '[EgipturaCustomProgram:';
            const startIdx = text.indexOf(tokenStart);
            
            if (startIdx === -1) {
                console.log('[debug] No EgipturaCustomProgram token found');
                return null;
            }

            const jsonStartIdx = text.indexOf('{', startIdx);
            if (jsonStartIdx === -1) return null;

            let openBraces = 0;
            let inString = false;
            let escapeNext = false;

            for (let i = jsonStartIdx; i < text.length; i++) {
                const char = text[i];

                if (escapeNext) {
                    escapeNext = false;
                    continue;
                }

                if (char === '\\') {
                    escapeNext = true;
                    continue;
                }

                if (char === '"' && !escapeNext) {
                    inString = !inString;
                    continue;
                }

                if (!inString) {
                    if (char === '{') {
                        openBraces++;
                    } else if (char === '}') {
                        openBraces--;
                        
                        if (openBraces === 0) {
                            const jsonString = text.substring(jsonStartIdx, i + 1);
                            console.log('[debug] ✅ Successfully extracted custom program JSON');
                            return jsonString;
                        }
                    }
                }
            }

            console.log('[debug] ❌ Failed to extract balanced JSON');
            return null;
        };

        const jsonString = extractCustomProgram(responseText);
        
        if (jsonString && (isExplicitCustomRequest || requestedDays > 0)) {
            console.log('[debug] Processing custom program JSON...');
            
            const tryParse = (s: string) => { 
                try { 
                    return JSON.parse(s); 
                } catch(e) { 
                    console.error('❌ JSON Parse Error:', e);
                    console.log('📋 Problematic JSON:', s.substring(0, 200));
                    return null; 
                } 
            };
            
            let programFromAI = tryParse(jsonString);
            
            if (programFromAI) {
                console.log('[debug] ✅ JSON parsed successfully, normalizing data...');
                
                // تطبيع البيانات
                const normalized = normalizeQuoteData(programFromAI);
                const filled = fillMissingFields(normalized, knowledgeBase.localizedStrings.ui[currentLang]);
                
                if (filled.quoteParams && validateQuoteParams(filled.quoteParams)) {
                    console.log('[debug] ✅ Quote params validated, calculating pricing...');
                    
                    // حساب الأسعار
                    const scenarios = calculatePriceScenarios(filled.quoteParams);
                    finalCustomProgram = withDisplayDefaults({
                        ...filled,
                        isCustom: true,
                        seasonalPricing: {
                            summer: { gold: scenarios.summer, diamond: scenarios.summer },
                            winter: { gold: scenarios.winter, diamond: scenarios.winter },
                        },
                    });
                    
                    console.log('[debug] ✅ Custom program created successfully');
                    
                    // إزالة الـ token من النص
                    responseText = responseText.replace(`[EgipturaCustomProgram:${jsonString}]`, '').trim();
                    
                    if (!responseText) {
                        responseText = uiText.customQuoteCreated;
                    }
                } else {
                    console.warn('[debug] ❌ Invalid quote params after processing');
                }
            }
        }
        
        // ✅ الخطوة 5: Fallback للطلبات المخصصة إذا فشل الـ AI
        const hasTravelDetails = /\d+\s*(days?|d[ií]as|ايام)/i.test(userInput);
        if ((isExplicitCustomRequest || requestedDays > 0) && hasTravelDetails && !finalCustomProgram) {
            console.warn('[debug] 🔄 Custom request detected but no program from AI, generating fallback...');
            
            const fallbackProgram = generateLocalFallbackProgram(userInput, currentLang);
            
            if (fallbackProgram.quoteParams && validateQuoteParams(fallbackProgram.quoteParams)) {
                const scenarios = calculatePriceScenarios(fallbackProgram.quoteParams);
                finalCustomProgram = withDisplayDefaults({
                    ...fallbackProgram,
                    seasonalPricing: {
                        summer: { gold: scenarios.summer, diamond: scenarios.summer },
                        winter: { gold: scenarios.winter, diamond: scenarios.winter },
                    },
                });
                
                console.log('[debug] ✅ Fallback program created successfully');
                responseText = uiText.customQuoteCreated;
            }
        }

        // ✅ الخطوة 6: استخراج البرامج الجاهزة
        const programTokenRegex = /\[EgipturaProgram:(\d+)\]/g;
        const programIds: number[] = [];
        let match;
        while ((match = programTokenRegex.exec(responseText)) !== null) {
            programIds.push(parseInt(match[1], 10));
        }
        console.log(`[debug] Found ${programIds.length} predefined programs`);

        responseText = responseText.replace(programTokenRegex, '').trim();

        // ✅ الخطوة 7: البحث عن البرامج المطابقة
        const findMatchingPrograms = (input: string, customProgram?: Program): number[] => {
            const text = input.toLowerCase();
            const requestedDays = customProgram?.duration.days || 
                                +(text.match(/(\d+)\s*(?:days?|d[ií]as|ايام|يوم)/i)?.[1] || 0);
            const wantsCruise = customProgram?.cruiseNights > 0 || 
                              /cruise|crucero|كروز|نيل|nile/i.test(text);
            
            if (!requestedDays && !wantsCruise) return [];
            
            const matchingPrograms = knowledgeBase.packages.filter(program => {
                const durationMatch = requestedDays ? 
                    Math.abs(program.duration.days - requestedDays) <= 1 : true;
                const cruiseMatch = wantsCruise ? 
                    (program.cruiseNights && program.cruiseNights > 0) : true;
                
                return durationMatch && cruiseMatch;
            });
            
            console.log(`[debug] Found ${matchingPrograms.length} matching programs`);
            return matchingPrograms.map(p => Number(p.id));
        };

        let matchingProgramIds: number[] = [];
        if (!isExplicitCustomRequest) {
            matchingProgramIds = findMatchingPrograms(userInput, finalCustomProgram);
        }

        // ✅ الخطوة 8: المنطق النهائي لعرض البرامج - CRITICAL LOGIC
        console.log('[debug] 🎯 Final program display logic:');
        console.log(`  - Matching programs found: ${matchingProgramIds.length}`);
        console.log(`  - Predefined programs: ${programIds.length}`);
        console.log(`  - Custom program created: ${!!finalCustomProgram}`);
        console.log(`  - Is explicit custom: ${isExplicitCustomRequest}`);
        console.log(`  - Is ready program: ${isReadyProgramRequest}`);
        
        // ✅ RULE 1: إذا طلب برنامج مخصص صراحة، نعرض فقط البرنامج المخصص
        if (isExplicitCustomRequest && finalCustomProgram) {
            console.log('[debug] ✅ Showing CUSTOM program (user explicitly requested custom)');
            programIds.length = 0; // مسح أي برامج جاهزة
            // لا نمسح finalCustomProgram
            
        // ✅ RULE 2: إذا طلب برامج جاهزة ووجدنا برامج مطابقة، نعرضها
        } else if (isReadyProgramRequest && matchingProgramIds.length > 0) {
            console.log('[debug] ✅ Showing READY programs (user requested ready programs)');
            programIds.length = 0;
            programIds.push(...matchingProgramIds);
            finalCustomProgram = undefined; // مسح أي برنامج مخصص
            
            if (!responseText || responseText === uiText.customQuoteCreated) {
                responseText = currentLang === 'es' ? 
                    "Encontré estos programas que coinciden con lo que buscas:" :
                    currentLang === 'en' ? 
                    "I found these programs that match what you're looking for:" :
                    "لقد وجدت هذه البرامج التي تطابق ما تبحث عنه:";
            }
            
        // ✅ RULE 3: إذا كان الـ AI أعطى برامج جاهزة ولم يطلب مخصص، نستخدمها
        } else if (programIds.length > 0 && !isExplicitCustomRequest) {
            console.log('[debug] ✅ Showing READY programs from AI');
            finalCustomProgram = undefined;
            
        // ✅ RULE 4: إذا طلب مخصص لكن ما فيش برنامج، نسأله عن التفاصيل
        } else if (isExplicitCustomRequest && !finalCustomProgram) {
            console.log('[debug] ⚠️ Custom request but no program created - already asked for details');
            programIds.length = 0;
            
        // ✅ RULE 5: إذا ما فيش أي حاجة، نعرض برامج افتراضية
        } else if (!isExplicitCustomRequest && programIds.length === 0 && !finalCustomProgram && matchingProgramIds.length === 0) {
            console.log('[debug] ℹ️ No specific request - showing suggested programs');
            const suggestedPrograms = knowledgeBase.packages.slice(0, 3).map(p => Number(p.id));
            programIds.push(...suggestedPrograms);
        }
        
        console.log('[debug] 📊 Final decision:');
        console.log(`  - Will show ${programIds.length} ready programs`);
        console.log(`  - Will show custom program: ${!!finalCustomProgram}`);

        // ✅ الخطوة 9: إنشاء الرسالة النهائية
        if (responseText || programIds.length > 0 || finalCustomProgram) {
            const modelMessage: Message = {
                id: Date.now().toString() + Math.random(),
                role: 'model',
                content: responseText,
                programIds: programIds.length > 0 ? programIds : undefined,
                customPrograms: finalCustomProgram ? [finalCustomProgram] : undefined,
            };
            setMessages(prev => [...prev, modelMessage]);
            console.log('[debug] ✅ Message added to chat successfully');
        }

    } catch (error) {
        console.error('❌ Error in handleSendMessage:', error);
        
        let errorMessage = uiText.genericError || 'An error occurred. Please try again.';

        // معالجة أخطاء السيرفر باستخدام الفال باك
        if (error instanceof Error && (error.message.includes('server') || error.message.includes('timeout') || error.message.includes('quota'))) {
            console.warn('[debug] 🔄 Server error - using fallback service');
            
            const isCustomRequest = /build|create|make|design|custom|personalized|tailor/i.test(userInput.toLowerCase());
            
            if (isCustomRequest) {
                const fallbackProgram = generateLocalFallbackProgram(userInput, language);
                if (fallbackProgram.quoteParams && validateQuoteParams(fallbackProgram.quoteParams)) {
                    const scenarios = calculatePriceScenarios(fallbackProgram.quoteParams);
                    const finalProgram = withDisplayDefaults({
                        ...fallbackProgram,
                        seasonalPricing: {
                            summer: { gold: scenarios.summer, diamond: scenarios.summer },
                            winter: { gold: scenarios.winter, diamond: scenarios.winter },
                        },
                    });
                    
                    const modelMessage: Message = {
                        id: Date.now().toString() + Math.random(),
                        role: 'model',
                        content: uiText.customQuoteCreated,
                        customPrograms: [finalProgram],
                    };
                    setMessages(prev => [...prev, modelMessage]);
                    setIsLoading(false);
                    return;
                }
            }
        }

        if (error instanceof Error) {
            if (error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED')) {
                errorMessage = uiText.quotaError || "Our AI assistant is currently experiencing high demand. Please try again in a little while.";
            } else if (error.message.includes('API key not valid')) {
                errorMessage = uiText.apiKeyError || "There's an issue with the connection to our AI service. Our team has been notified.";
            }
        }
        
        addMessage('model', errorMessage);
    } finally {
        setIsLoading(false);
    }
}, [addMessage, language, setLanguage, messages, uiText.customQuoteCreated]);


    const handleLoadSavedTrip = useCallback(() => {
        const savedProgramJson = localStorage.getItem('savedEgipturaProgram');
        if (savedProgramJson) {
            try {
                const savedProgram: Program = JSON.parse(savedProgramJson);
                const messageContent = language === 'es' ? 
                    `Aquí está tu viaje guardado: "${savedProgram.name.es}"` : 
                    language === 'en' ? 
                    `Here is your saved trip: "${savedProgram.name.en}"` :
                    `ها هي رحلتك المحفوظة: "${savedProgram.name.ar}"`;
                
                const modelMessage: Message = {
                    id: Date.now().toString(),
                    role: 'model',
                    content: messageContent,
                    customPrograms: [savedProgram]
                };
                setMessages(prev => [...prev, modelMessage]);
            } catch (error) {
                console.error("Failed to parse saved trip:", error);
                localStorage.removeItem('savedEgipturaProgram');
                setHasSavedTrip(false);
            }
        }
    }, [language]);

    return (
        <div className="flex flex-col h-screen bg-[#0B0F14] text-gray-300 font-sans">
            <main className="flex-1 overflow-y-auto p-4">
                <div className="text-center pt-10 pb-8">
                    <EgipturaLogo className="mx-auto mb-3 drop-shadow-[0_0_15px_#C59D5F80]" />
                    <h1 className="text-xl font-semibold tracking-wide text-[#C59D5F] drop-shadow-[0_0_6px_#C59D5F60]">
                        {uiText.tagline}
                    </h1>
                </div>

                {messages.length === 1 && (
                    <div className="flex flex-col items-center">
                        <SuggestionChips onSendMessage={handleSendMessage} />
                        {hasSavedTrip && (
                            <button 
                                onClick={handleLoadSavedTrip}
                                className="mt-4 bg-gray-700/60 border border-gray-600 text-[#C59D5F] px-4 py-2 rounded-full text-sm hover:bg-gray-700 transition-all duration-200"
                            >
                                {uiText.cardLoadSaved}
                            </button>
                        )}
                    </div>
                )}
                <ChatWindow 
                    messages={messages} 
                    onViewDetails={handleViewDetails} 
                />
                {isLoading && <TypingIndicator />}
            </main>
            <footer className="p-4 bg-[#11151c]/80 backdrop-blur-3xl border-t border-[#1e2a3a] sticky bottom-0">
                <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            </footer>
            {selectedProgram && (
                <ProgramModal 
                    program={selectedProgram} 
                    onClose={() => setSelectedProgram(null)}
                />
            )}
        </div>
    );
};

export default App;