import React, { useState, useEffect } from 'react';
import { AnubisIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';
import { knowledgeBase } from '../services/knowledgeBase';

const TypingIndicator: React.FC = () => {
    const { language } = useLanguage();
    const loadingMessages = knowledgeBase.localizedStrings.ui[language]?.loadingMessages || knowledgeBase.localizedStrings.ui.es.loadingMessages;
    
    // Select a random message when the component mounts
    const [message, setMessage] = useState('');

    useEffect(() => {
        setMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    }, [loadingMessages]);


    return (
        <div className="flex items-start gap-4 justify-start max-w-3xl mx-auto animate-fade-in">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center border-2 border-[#C59D5F]/50 shadow-sm">
                <AnubisIcon className="w-6 h-6 text-[#C59D5F]" />
            </div>
            <div className="rounded-xl p-4 shadow-md bg-[#2a2b2e] text-gray-300 rounded-tl-none flex items-center space-x-2 border border-gray-700">
                <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 bg-[#C59D5F] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-[#C59D5F] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-[#C59D5F] rounded-full animate-bounce"></span>
                </div>
                <span className="text-sm italic text-gray-400">{message}</span>
            </div>
        </div>
    );
};

export default TypingIndicator;
