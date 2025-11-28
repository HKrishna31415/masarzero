import React, { useState, useRef, useEffect } from 'react';
// FIX: Import Variants type from framer-motion
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Bot, X, Send, CornerDownLeft } from 'lucide-react';
import { streamChatResponse } from '../services/geminiService';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const AiConcierge: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! I am the MasarZero AI Concierge. How can I help you with our vapor recovery technology today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        const botMessageId = Date.now() + 1;
        setMessages(prev => [...prev, { id: botMessageId, text: '', sender: 'bot' }]);
        
        try {
            const stream = await streamChatResponse(currentInput);
            let currentBotText = '';
            for await (const chunk of stream) {
                const chunkText = chunk.text;
                if (chunkText) {
                    currentBotText += chunkText;
                    setMessages(prev => prev.map(msg => 
                        msg.id === botMessageId ? { ...msg, text: currentBotText } : msg
                    ));
                }
            }
        } catch (error) {
            console.error("Error streaming response:", error);
            setMessages(prev => prev.map(msg => 
                msg.id === botMessageId ? { ...msg, text: "I'm sorry, I encountered an issue. Please try again." } : msg
            ));
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    
    // Animation variants
    const fabVariants = {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0, opacity: 0 },
        hover: { scale: 1.1, rotate: 10 }
    };

    // FIX: Add Variants type to fix framer-motion type inference issue.
    const chatWindowVariants: Variants = {
        initial: { opacity: 0, y: 50, scale: 0.9 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
        exit: { opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } },
    };

    return (
        <div className="fixed bottom-6 right-6 z-[1000]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={chatWindowVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-80 h-[28rem] glass-card rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <Bot className="text-cyan-300" />
                                <h3 className="font-bold">AI Concierge</h3>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-white/10">
                                <X size={20} />
                            </button>
                        </div>
                        {/* Messages */}
                        <div className="flex-grow p-4 overflow-y-auto space-y-4">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-xl ${msg.sender === 'user' ? 'bg-cyan-500/30 text-white' : 'bg-slate-700/50 text-gray-300'}`}>
                                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-700/50 p-3 rounded-xl">
                                        <div className="flex items-center gap-1">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        {/* Input */}
                        <div className="p-4 border-t border-white/10 flex-shrink-0">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask anything..."
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2 pl-4 pr-10 text-sm focus:ring-1 focus:ring-cyan-400 focus:outline-none"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                  <CornerDownLeft size={16} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
                variants={fabVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
            >
                {isOpen ? <X size={32} className="text-white" /> : <Bot size={32} className="text-white" />}
            </motion.button>
        </div>
    );
};

export default AiConcierge;