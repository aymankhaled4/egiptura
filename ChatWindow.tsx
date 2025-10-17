import React, { useEffect, useRef } from 'react';
import type { Message as MessageType, Program } from '../types';
import Message from './Message';

interface ChatWindowProps {
    messages: MessageType[];
    onViewDetails: (program: Program) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onViewDetails }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
                <Message
                    key={msg.id}
                    message={msg}
                    onViewDetails={onViewDetails}
                />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatWindow;
