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
import { extractSeasonInfo } from './SeasonDetector';

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
                             +(input.match(/(\\d+)\\s*(?:days?|d[ií]as|ايام|يوم)/i)?.[1] || 0);
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


const handleSendMessage = useCallback(async (userInput: string) => {
    if (!userInput.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: userInput };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setIsLoading(true);

    // ✅ LOG 1: تسجيل بداية المعالجة
    console.group('🚀 Processing User Request');
    console.log('User Input:', userInput);
    console.log('Current Language:', language);

    try {
        // ✅ تحليل الطلب
        const isExplicitCustomRequest = /build|create|make|design|armar|crear|hacer|formar|custom|personalized|personalizado|مخصص|برنامج مخصص|رحلة مخصصة|tailor/i.test(userInput.toLowerCase());
        const isChipRequest = /i want an? \\d+-day trip (with|without) cruise/i.test(userInput.toLowerCase());
        
        // ✅ استخراج المدة بدقة عالية
        const daysMatch = userInput.match(/(\\d+)\\s*(days?|d[iíì]as|ايام|يوم)/i);
        const nightsMatch = userInput.match(/(\\d+)\\s*(nights?|noches?|ليال(?:ي)?)/i);
        const durationPattern = /duration:\\s*(\\d+)\\s*days?/i;
        const durationMatch = userInput.match(durationPattern);
        
        let requestedDays = 0;
        if (durationMatch) {
            requestedDays = parseInt(durationMatch[1], 10);
            console.log('📌 Duration extracted from "duration:" pattern:', requestedDays);
        } else if (daysMatch) {
            requestedDays = parseInt(daysMatch[1], 10);
            console.log('📌 Duration extracted from days pattern:', requestedDays);
        } else if (nightsMatch) {
            requestedDays = parseInt(nightsMatch[1], 10) + 1;
            console.log('📌 Duration calculated from nights:', requestedDays, '(nights + 1)');
        }
        
        // 🆕 استخراج معلومات الموسم (من الكلمة المباشرة أو الشهر)
        const seasonInfo = extractSeasonInfo(userInput);
        const hasSeason = seasonInfo.season !== null;
        
        console.log('🌡️ Season Analysis:', {
            detected: seasonInfo.season,
            mentionedMonth: seasonInfo.mentionedMonth,
            isExplicitSeason: seasonInfo.isExplicitSeason,
            source: seasonInfo.isExplicitSeason ? 'direct keyword' : seasonInfo.mentionedMonth ? 'from month' : 'not detected'
        });
        
        // ✅ LOG 2: تسجيل نوع الطلب
        console.log('📊 Request Analysis:', {
            isCustomRequest: isExplicitCustomRequest,
            isChipRequest: isChipRequest,
            requestedDays: requestedDays,
            hasSeason: hasSeason
        });

        let response, responseText, currentLang = language;
        let finalCustomProgram: Program | undefined = undefined;

        // ✅ معالجة Chip Requests
        if (isChipRequest) {
            console.log('⚡ Chip request detected - skipping AI');
            
            const matchingProgramIds = findMatchingPrograms(userInput);
            console.log('✅ Found matching programs:', matchingProgramIds);
            
            responseText = currentLang === 'es' ? 
                "Encontré estos programas que coinciden con lo que buscas:" :
                currentLang === 'en' ? 
                "I found these programs that match what you're looking for:" :
                "لقد وجدت هذه البرامج التي تطابق ما تبحث عنه:";
            
            const modelMessage: Message = {
                id: Date.now().toString() + Math.random(),
                role: 'model',
                content: responseText,
                programIds: matchingProgramIds.length > 0 ? matchingProgramIds : undefined,
            };
            setMessages(prev => [...prev, modelMessage]);
            setIsLoading(false);
            console.groupEnd();
            return;
        }

        // 🎯 معالجة الطلبات المخصصة تلقائياً
        if (isExplicitCustomRequest && requestedDays > 0) {
            console.log('🎯 Custom request detected - creating auto program...');
            
            // استخراج المدن من الطلب
            const cities = [];
            if (/cairo|القاهرة/i.test(userInput)) cities.push('cairo');
            if (/alexandria|الإسكندرية/i.test(userInput)) cities.push('alexandria');
            if (/luxor|الأقصر/i.test(userInput)) cities.push('luxor');
            if (/aswan|أسوان/i.test(userInput)) cities.push('aswan');
            
            // إذا لم يتم تحديد مدن، نستخدم المدن الافتراضية
            if (cities.length === 0) {
                if (requestedDays >= 7) {
                    cities.push('cairo', 'alexandria', 'luxor', 'aswan');
                } else if (requestedDays >= 5) {
                    cities.push('cairo', 'alexandria');
                } else {
                    cities.push('cairo');
                }
            }
            
            // استخراج عدد المسافرين
            const travelersMatch = userInput.match(/(\\d+)\\s*(people|person|travelers|viajeros|اشخاص|مسافر)/i);
            const travelers = travelersMatch ? parseInt(travelersMatch[1], 10) : 2;
            
            // استخراج الفئة
            const category = /diamond|الماسي|lujo/i.test(userInput) ? 'diamond' : 'gold';
            
            // استخراج الموسم
            const season = seasonInfo.season || 'summer';
            
            console.log('🎯 Auto program details:', {
                duration: requestedDays,
                travelers,
                cities,
                category,
                season
            });
            
            // إنشاء البرنامج التلقائي
            try {
                const { createAutoProgram } = await import('./intelligentExtractor-final');
                const autoProgram = createAutoProgram({
                    duration: requestedDays,
                    travelers,
                    cities,
                    season,
                    category,
                    language: currentLang
                });
                
                console.log('✅ Auto program created successfully');
                
                // تطبيق التسعير
                if (autoProgram.quoteParams && validateQuoteParams(autoProgram.quoteParams)) {
                    const scenarios = calculatePriceScenarios(autoProgram.quoteParams);
                    finalCustomProgram = withDisplayDefaults({
                        ...autoProgram,
                        seasonalPricing: {
                            summer: { gold: scenarios.summer, diamond: scenarios.summer },
                            winter: { gold: scenarios.winter, diamond: scenarios.winter },
                        },
                    });
                } else {
                    finalCustomProgram = withDisplayDefaults(autoProgram);
                }
                
                responseText = currentLang === 'es' ? 
                    `¡Perfecto! He creado tu viaje personalizado de ${requestedDays} días por Egipto.` :
                    currentLang === 'en' ? 
                    `Perfect! I've created your custom ${requestedDays}-day Egypt journey.` :
                    `ممتاز! لقد أنشأت رحلتك المخصصة لمدة ${requestedDays} أيام في مصر.`;
                
                console.log('✅ Custom program created and ready to display');
                setIsLoading(false);
                console.groupEnd();
                return;
            } catch (error) {
                console.error('❌ Failed to create auto program:', error);
                // الاستمرار مع AI كـ fallback
            }
        }

        // ✅ معالجة الطلبات العادية عبر AI
        console.log('🤖 Sending to AI...');
        const fullPrompt = messages.length > 2 ? 
            `PREVIOUS_CONVERSATION_CONTEXT: ${messages.map(m => `${m.role}: ${m.content}`).join('\\n')}\\n\\nCURRENT_USER_REQUEST: ${userInput}`
            : userInput;

        response = await sendMessageToAI(fullPrompt);
        console.log('✅ AI Response received, length:', response.length);
        
        // Language detection
        response = response.trimStart();
        const langMatch = response.match(/^\\[lang:(es|en|ar)\\]/);

        if (langMatch) {
            const detectedLang = langMatch[1] as Language;
            console.log('🌐 Language detected:', detectedLang);
            if (language !== detectedLang) {
                setLanguage(detectedLang);
                currentLang = detectedLang;
            }
            response = response.replace(langMatch[0], '').trim();
        }

        responseText = response;

        // 📦 STEP 3: استخراج ومعالجة البرنامج المخصص من الـ AI
        console.log('[App] 🔍 Looking for custom program in AI response...');

        // دالة محسنة لاستخراج JSON
        const extractCustomProgramJSON = (text: string): string | null => {
            const tokenStart = '[EgipturaCustomProgram:';
            const startIdx = text.indexOf(tokenStart);
            if (startIdx === -1) return null;

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
                if (char === '\\\\') { 
                    escapeNext = true; 
                    continue; 
                }
                if (char === '\"' && !escapeNext) { 
                    inString = !inString; 
                    continue; 
                }
                if (!inString) {
                    if (char === '{') openBraces++;
                    else if (char === '}') {
                        openBraces--;
                        if (openBraces === 0) {
                            return text.substring(jsonStartIdx, i + 1);
                        }
                    }
                }
            }
            return null;
        };

        const jsonString = extractCustomProgramJSON(responseText);

        if (jsonString) {
            console.log('[App] ✅ Custom program JSON found, parsing...');
            console.log('📦 JSON length:', jsonString.length);
            
            try {
                const programFromAI = JSON.parse(jsonString);
                console.log('✅ AI program parsed successfully');
                
                // ✅ استخدام البرنامج مباشرة من الـ AI (تم معالجته في geminiService)
                if (programFromAI.id && programFromAI.isCustom) {
                    console.log('✅ Using pre-processed custom program from AI');
                    
                    // تطبيق التسعير إذا لزم الأمر
                    if (programFromAI.quoteParams && validateQuoteParams(programFromAI.quoteParams)) {
                        const scenarios = calculatePriceScenarios(programFromAI.quoteParams);
                        finalCustomProgram = withDisplayDefaults({
                            ...programFromAI,
                            seasonalPricing: {
                                summer: { gold: scenarios.summer, diamond: scenarios.summer },
                                winter: { gold: scenarios.winter, diamond: scenarios.winter },
                            },
                        });
                    } else {
                        finalCustomProgram = withDisplayDefaults(programFromAI);
                    }
                    
                    // ✅ إزالة الـ token من النص لعرض النص فقط
                    responseText = responseText.replace(`[EgipturaCustomProgram:${jsonString}]`, '').trim();
                    
                    if (!responseText) {
                        responseText = uiText.customQuoteCreated || "I've created your custom Egypt journey!";
                    }
                }
                
            } catch (error) {
                console.error('[App] ❌ Failed to parse custom program JSON:', error);
                // في حالة فشل التحليل، نستخدم fallback
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
                    responseText = uiText.customQuoteCreated || "I've created your custom Egypt journey!";
                }
            }
        }
        
        // ✅ Fallback للطلبات المخصصة بدون رد AI
        const hasTravelDetails = /\\d+\\s*(days?|d[iíì]as|ايام)/i.test(userInput);
        if (isExplicitCustomRequest && hasTravelDetails && !finalCustomProgram) {
            console.warn('⚠️ Custom request without AI program - generating fallback');
            
            const fallbackProgram = generateLocalFallbackProgram(userInput, currentLang);
            console.log('✅ Fallback program details:', {
                duration: fallbackProgram.duration.days,
                nights: fallbackProgram.duration.nights,
                cairo: fallbackProgram.quoteParams?.itineraryPlan?.nights?.cairo,
                cruise: fallbackProgram.quoteParams?.itineraryPlan?.nights?.cruise,
                season: fallbackProgram.quoteParams?.season // 🆕 الموسم المكتشف
            });
            
            if (fallbackProgram.quoteParams && validateQuoteParams(fallbackProgram.quoteParams)) {
                const scenarios = calculatePriceScenarios(fallbackProgram.quoteParams);
                finalCustomProgram = withDisplayDefaults({
                    ...fallbackProgram,
                    seasonalPricing: {
                        summer: { gold: scenarios.summer, diamond: scenarios.summer },
                        winter: { gold: scenarios.winter, diamond: scenarios.winter },
                    },
                });
                console.log('💰 Pricing scenarios:', scenarios);
                console.log('🌡️ Season used:', fallbackProgram.quoteParams.season);
            }
            
            responseText = uiText.customQuoteCreated;
        }

        // ✅ استخراج Pre-defined Program Tokens
        const programTokenRegex = /\\[EgipturaProgram:(\\d+)\\]/g;
        const programIds: number[] = [];
        let match;
        while ((match = programTokenRegex.exec(responseText)) !== null) {
            programIds.push(parseInt(match[1], 10));
        }
        console.log('📋 Pre-defined program IDs found:', programIds);

        // ✅ البحث عن البرامج المطابقة
        let matchingProgramIds: number[] = [];
        if (!isExplicitCustomRequest) {
            matchingProgramIds = findMatchingPrograms(userInput, finalCustomProgram);
            console.log('🔍 Matching programs found:', matchingProgramIds);
        }

        // ✅ المنطق النهائي
        if (matchingProgramIds.length > 0 && !isExplicitCustomRequest) {
            console.log('✅ Showing matching programs');
            programIds.length = 0;
            programIds.push(...matchingProgramIds);
            finalCustomProgram = undefined;
            
            if (!responseText || responseText === uiText.customQuoteCreated) {
                responseText = currentLang === 'es' ? 
                    "Encontré estos programas que coinciden con lo que buscas:" :
                    currentLang === 'en' ? 
                    "I found these programs that match what you're looking for:" :
                    "لقد وجدت هذه البرامج التي تطابق ما تبحث عنه:";
            }
        } else if (isExplicitCustomRequest) {
            console.log('✅ Custom program request - clearing predefined programs');
            programIds.length = 0;
            
            // ✅ التحقق النهائي من Duration
            if (finalCustomProgram && requestedDays > 0 && finalCustomProgram.duration.days !== requestedDays) {
                console.error(`🚨 FINAL CHECK FAILED: ${finalCustomProgram.duration.days} days vs ${requestedDays} requested`);
                console.log('🔄 Force regenerating program...');
                
                const forcedFallback = generateLocalFallbackProgram(userInput, currentLang);
                if (forcedFallback.quoteParams && validateQuoteParams(forcedFallback.quoteParams)) {
                    const scenarios = calculatePriceScenarios(forcedFallback.quoteParams);
                    finalCustomProgram = withDisplayDefaults({
                        ...forcedFallback,
                        seasonalPricing: {
                            summer: { gold: scenarios.summer, diamond: scenarios.summer },
                            winter: { gold: scenarios.winter, diamond: scenarios.winter },
                        },
                    });
                    console.log('✅ Force regeneration successful:', finalCustomProgram.duration.days, 'days');
                }
            }
            
            // ✅ تصحيح الاسم
            if (finalCustomProgram) {
                const predefinedProgramNames = knowledgeBase.packages.map(p => p.name.en);
                const currentName = finalCustomProgram.name.en;
                
                const containsPredefined = predefinedProgramNames.some(name => 
                    currentName.toLowerCase().includes(name.toLowerCase())
                );
                
                if (containsPredefined || !currentName.toLowerCase().includes('custom')) {
                    console.log('🔧 Fixing program name from:', currentName);
                    const dur = finalCustomProgram.duration.days;
                    finalCustomProgram.name = {
                        en: `Custom ${dur}-Day Egypt Journey`,
                        es: `Viaje Personalizado de ${dur} Días por Egipto`,
                        ar: `رحلة مخصصة لمدة ${dur} أيام في مصر`
                    };
                    console.log('✅ New program name:', finalCustomProgram.name.en);
                }
            }
        }

        responseText = responseText.replace(programTokenRegex, '').trim();

        // ✅ LOG النهائي
        console.log('📤 Final Message:', {
            responseText: responseText.substring(0, 100) + '...',
            programIds: programIds,
            hasCustomProgram: !!finalCustomProgram,
            customProgramDuration: finalCustomProgram?.duration?.days,
            detectedSeason: seasonInfo.season // 🆕
        });

        // إنشاء الرسالة النهائية
        if (responseText || programIds.length > 0 || finalCustomProgram) {
            const modelMessage: Message = {
                id: Date.now().toString() + Math.random(),
                role: 'model',
                content: responseText,
                programIds: programIds.length > 0 ? programIds : undefined,
                customPrograms: finalCustomProgram ? [finalCustomProgram] : undefined,
            };
            setMessages(prev => [...prev, modelMessage]);
            console.log('✅ Message added to chat');
        }

        console.groupEnd();

    } catch (error) {
        console.error('❌ Error occurred:', error);
        console.groupEnd();
        
        let errorMessage = uiText.genericError || 'An error occurred. Please try again.';

        // معالجة أخطاء السيرفر
        if (error instanceof Error && (error.message.includes('server') || error.message.includes('timeout') || error.message.includes('quota'))) {
            console.warn('⚠️ Server error - using fallback');
            
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
}, [addMessage, language, setLanguage, messages, findMatchingPrograms, uiText.customQuoteCreated, validateQuoteParams]);

    const handleLoadSavedTrip = useCallback(() => {
        const savedProgramJson = localStorage.getItem('savedEgipturaProgram');
        if (savedProgramJson) {
            try {
                const savedProgram: Program = JSON.parse(savedProgramJson);
                const messageContent = language === 'es' ? 
                    `Aquí está tu viaje guardado: \"${savedProgram.name.es}\"` : 
                    language === 'en' ? 
                    `Here is your saved trip: \"${savedProgram.name.en}\"` :
                    `ها هي رحلتك المحفوظة: \"${savedProgram.name.ar}\"`;
                
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
                    <EgipturaLogo className="mx-auto mb-3" />
                    <h1 className="text-xl font-semibold tracking-wide text-[#C59D5F]">
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