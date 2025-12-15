import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Mic, MicOff, Sparkles, Volume2, User, Bot, RefreshCw, Minus, ArrowRight, Maximize2, Minimize2 } from 'lucide-react';

// Speech Recognition Type Definition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}

const SYSTEM_INSTRUCTION = `
You are "Pressiqo AI", the elite Sales Engineer for Pressiqo. Your mission is to convert visitors into users by being persuasive, knowledgeable, and helpful.

**Core Objective:**
Persuade users to download the app by highlighting our "Local-First" and "Bring Your Own Key" (BYOK) advantages.

**Knowledge Base:**
1. **Pricing (Unbeatable):**
   - **Starter:** Free Forever. (1 Site, 50 articles/mo).
   - **Pro:** $29/mo (Yearly). Unlimited articles, 5 sites, Bulk CSV.
   - **Agency:** $99/mo (Yearly). Unlimited sites, White-label reports.
   - *Comparison:* "Jasper costs $49/mo for limited words. We are $29 for UNLIMITED generations because you use your own API key."

2. **Key Features:**
   - **Multi-LLM:** Switch between Gemini 1.5, GPT-4o, and Claude 3.5 instantly.
   - **Privacy:** Data is stored locally (AES-256). No cloud leaks.
   - **Automation:** Internal linking, SEO meta tags, and featured images are auto-generated.

**Behavioral Rules:**
- **Tone:** Professional, confident, enthusiastic.
- **Format:** Use bullet points for features. Use **bold** for key benefits.
- **Linking:** When mentioning pricing, write [View Pricing](#pricing). When mentioning features, write [See Features](#features). When asked to download, write [Download Now](https://app.pressiqo.app).
- **Language:** Detect language. Arabic input = Arabic response. English input = English response.

**Persuasion Scripts:**
- If asked about "Why Pressiqo?": Focus on cost savings (BYOK) and security.
- If asked about "Competitors": "Unlike Copy.ai or Jasper who mark up API costs 5x, Pressiqo gives you raw access to the models at cost price."
`;

// Text Formatter with Link and Bold support
const FormattedText = ({ text }: { text: string }) => {
  const parseLinks = (segment: string) => {
    // Split by markdown links: [Text](url)
    const parts = segment.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (match) {
        const [_, label, url] = match;
        const isAnchor = url.startsWith('#');
        return (
          <a
            key={i}
            href={url}
            target={isAnchor ? undefined : "_blank"}
            rel={isAnchor ? undefined : "noopener noreferrer"}
            onClick={(e) => {
              if (isAnchor) {
                e.preventDefault();
                const element = document.querySelector(url);
                if (element) {
                   element.scrollIntoView({ behavior: 'smooth' });
                   element.classList.add('ring', 'ring-blue-500');
                   setTimeout(() => element.classList.remove('ring', 'ring-blue-500'), 2000);
                }
              }
            }}
            className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold underline decoration-blue-500/30 underline-offset-2 transition-colors"
          >
            {label}
            {isAnchor ? null : <ArrowRight className="w-3 h-3" />}
          </a>
        );
      }
      return parseBold(part);
    });
  };

  const parseBold = (segment: string) => {
    const parts = segment.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="space-y-3">
      {text.split('\n').map((line, i) => {
        if (!line.trim()) return null;
        
        // List Items
        const listMatch = line.match(/^[-*•]\s+(.*)/);
        if (listMatch) {
          return (
            <div key={i} className="flex gap-2.5 ml-1">
              <span className="text-blue-500 mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <span className="flex-1 text-slate-300">{parseLinks(listMatch[1])}</span>
            </div>
          );
        }

        return <p key={i} className="leading-relaxed text-slate-300">{parseLinks(line)}</p>;
      })}
    </div>
  );
};

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: "Hi! 👋 I'm your Pressiqo sales expert. ask me how our **BYOK model** saves you 80% compared to Jasper, or check out our [Pricing](#pricing)." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (process.env.API_KEY) {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      chatSessionRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isTyping, isFullScreen]);

  // Lock body scroll when in full screen on mobile
  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isFullScreen]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input requires a Chrome-based browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setTimeout(() => handleSendMessage(transcript), 500);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const speakText = (text: string) => {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/\*\*|\[.*?\]\(.*?\)/g, (match) => {
        if (match.startsWith('[')) return match.match(/\[(.*?)\]/)?.[1] || "";
        return match.replace(/\*\*/g, '');
    });
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const isArabic = /[\u0600-\u06FF]/.test(cleanText);
    utterance.lang = isArabic ? 'ar-SA' : 'en-US';
    utterance.rate = 1.1;
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes("Google") || v.name.includes("Natural"));
    if (preferredVoice) utterance.voice = preferredVoice;
    
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || inputValue;
    if (!textToSend.trim() || !chatSessionRef.current) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const aiMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: aiMsgId, role: 'model', text: '', isStreaming: true }]);

      const result = await chatSessionRef.current.sendMessageStream({ message: textToSend });
      
      let accumulatedText = '';
      for await (const chunk of result) {
        const chunkText = chunk.text;
        accumulatedText += chunkText;
        
        setMessages(prev => prev.map(msg => 
          msg.id === aiMsgId ? { ...msg, text: accumulatedText } : msg
        ));
      }

      setMessages(prev => prev.map(msg => 
        msg.id === aiMsgId ? { ...msg, isStreaming: false } : msg
      ));

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Connection interrupted. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Custom Scrollbar CSS to hide scrollbars
  const scrollbarStyles = `
    .chat-scrollbar {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
    .chat-scrollbar::-webkit-scrollbar {
      display: none;
    }
    
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
  `;

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div className={`fixed z-50 flex flex-col items-end gap-6 font-sans ${isFullScreen ? 'inset-0' : 'bottom-6 right-6'}`}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={isFullScreen ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
              animate={isFullScreen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={isFullScreen ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className={`
                bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10
                ${isFullScreen 
                  ? 'fixed inset-0 w-full h-full rounded-none z-50' 
                  : 'w-[90vw] sm:w-[360px] h-[520px] max-h-[80vh] rounded-2xl relative'
                }
              `}
            >
              {/* Header */}
              <div className="bg-slate-950/80 border-b border-slate-800 p-3 flex items-center justify-between shrink-0 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm tracking-wide">Pressiqo AI</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                      <p className="text-[10px] text-blue-200 font-medium">Sales & Support</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setIsFullScreen(!isFullScreen)}
                    className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                    title={isFullScreen ? "Minimize" : "Full Screen"}
                  >
                    {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={() => { setIsOpen(false); setIsFullScreen(false); }}
                    className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6 chat-scrollbar bg-gradient-to-b from-slate-900/50 to-transparent">
                {messages.map((msg) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id}
                    className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg ${
                      msg.role === 'user' 
                        ? 'bg-slate-800 border border-slate-700' 
                        : 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
                    }`}>
                      {msg.role === 'user' ? <User className="w-4 h-4 text-slate-400" /> : <Sparkles className="w-4 h-4" />}
                    </div>

                    {/* Bubble */}
                    <div className={`relative group max-w-[85%] p-3.5 rounded-2xl text-sm shadow-md ${
                      msg.role === 'user' 
                        ? 'bg-slate-800 text-slate-200 rounded-tr-sm border border-slate-700' 
                        : 'bg-slate-900/80 border border-slate-700/50 backdrop-blur-sm rounded-tl-sm ring-1 ring-white/5'
                    }`}>
                      <FormattedText text={msg.text} />
                      
                      {msg.isStreaming && (
                        <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-blue-400 animate-pulse"></span>
                      )}

                      {msg.role === 'model' && !msg.isStreaming && (
                        <div className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                           <button 
                            onClick={() => speakText(msg.text)}
                            className="p-1.5 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700 shadow-sm"
                            title="Read aloud"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Chips */}
              {!isTyping && messages.length < 5 && (
                <div className="px-4 pb-3 flex gap-2 overflow-x-auto no-scrollbar shrink-0 mask-linear-fade">
                  {[
                    "💸 Pricing vs Competitors?",
                    "🔐 Is it secure?",
                    "🚀 Download Link"
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleSendMessage(chip)}
                      className="whitespace-nowrap px-3 py-1.5 bg-slate-800/80 hover:bg-blue-600/20 hover:border-blue-500/50 border border-slate-700 rounded-full text-xs text-slate-300 hover:text-blue-100 transition-all duration-200 shadow-sm"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Area */}
              <div className="p-3 bg-slate-950/80 border-t border-slate-800 shrink-0 backdrop-blur-md">
                <div className="relative flex items-center gap-2">
                  <div className="relative flex-1 group">
                     <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isTyping}
                      placeholder={isListening ? "Listening..." : "Ask..."}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-xl pl-4 pr-9 py-3 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder-slate-500 disabled:opacity-50"
                    />
                    <button
                      onClick={toggleListening}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors ${
                        isListening 
                          ? 'bg-red-500/20 text-red-400 animate-pulse' 
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                      title="Voice Input"
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                  </div>

                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className="p-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:shadow-none hover:scale-105 active:scale-95 flex items-center justify-center"
                  >
                    {isTyping ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="flex justify-center mt-2">
                  <span className="text-[9px] text-slate-600 flex items-center gap-1.5">
                     <div className="w-1 h-1 rounded-full bg-green-500"></div> 
                     AI Online • Gemini 2.5
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Toggle Button (Hidden in full screen) */}
        {!isFullScreen && (
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl shadow-blue-900/50 transition-all duration-300 z-50 ${
                isOpen ? 'bg-slate-800 hover:bg-slate-700' : 'bg-blue-600 hover:bg-blue-500'
            }`}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="relative"
                >
                  <MessageSquare className="w-6 h-6 text-white fill-current" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-slate-900"></span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </div>
    </>
  );
};

export default AIChatWidget;