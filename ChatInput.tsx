import React, { useState } from 'react';
import { knowledgeBase } from '../services/knowledgeBase';
import { useLanguage } from '../contexts/LanguageContext';
import TextareaAutosize from 'react-textarea-autosize';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
    const [input, setInput] = useState('');
    const { language } = useLanguage();
    const uiText = knowledgeBase.localizedStrings.ui[language] || knowledgeBase.localizedStrings.ui.es;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input);
            setInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSubmit(e as any); // cast لأن handleSubmit يتوقع FormEvent
    }
    };

    return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto"
      aria-label="chat-form"
    >
      <div className="relative flex items-end gap-3 p-3 rounded-3xl shadow-lg"
           style={{
             background: '#1b1c1e',
             border: '1px solid rgba(197,157,95,0.12)',
             backdropFilter: 'blur(20px)'
           }}
      >
        <TextareaAutosize
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          minRows={1}
          maxRows={4}
          placeholder={uiText.chatPlaceholder}
          className="flex-1 bg-transparent border-none text-[#fffcc] focus:outline-none px-4 py-3 resize-none"
          style={{
            fontFamily: "Cairo, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            fontSize: '15px',
          }}
        />

        <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className={`
            flex items-center justify-center 
            w-11 h-11 rounded-full 
            transition-all duration-300 ease-in-out
            transform
            ${(isLoading || !input.trim()) ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
            ${!isLoading && input.trim() ? 'hover:scale-95 opacity-85 active:scale-95' : ''}
            focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50
        `}
        aria-label="send"
        style={{
            background: '#C59D5F',
            boxShadow: isLoading 
            ? '0 2px 4px rgba(0,0,0,0.1)' 
            : '0 4px 8px rgba(0,0,0,0.2)'
        }}
        >
        {isLoading ? (
            <div className="w-4 h-4 border-2 border-[#0b0f14] border-t-transparent rounded-full animate-spin" />
        ) : (
            <svg 
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 20 24"
            className="transition-transform duration-200 hover:scale-100"
            style={{ display: 'block' }}
            aria-hidden
            >
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" fill="#0b0f14" />
            </svg>
        )}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
