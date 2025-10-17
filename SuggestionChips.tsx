import React, { useMemo } from 'react';
import { knowledgeBase } from '../services/knowledgeBase';
import { useLanguage } from '../contexts/LanguageContext';

interface SuggestionChipsProps {
    onSendMessage: (message: string) => void;
}

// Helper function to shuffle an array and take the first N items
const shuffleAndPick = <T,>(arr: T[], count: number): T[] => {
    return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
};

const SuggestionChips: React.FC<SuggestionChipsProps> = ({ onSendMessage }) => {
    const { language } = useLanguage();
    const allSuggestions = knowledgeBase.localizedStrings.ui[language]?.suggestions || knowledgeBase.localizedStrings.ui.es.suggestions;

    // Memoize the shuffled suggestions so they don't change on re-renders
    const suggestions = useMemo(() => shuffleAndPick(allSuggestions, 3), [allSuggestions]);

    return (
        <div className="flex justify-center items-center gap-2 flex-wrap mb-8 animate-fade-in">
            {suggestions.map((text, index) => (
                <button
                    key={index}
                    onClick={() => onSendMessage(text)}
                    className="bg-gray-800/80 border border-gray-700 text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-gray-700 hover:border-[#C59D5F]/50 transition-all duration-200"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    {text}
                </button>
            ))}
        </div>
    );
};

export default SuggestionChips;
