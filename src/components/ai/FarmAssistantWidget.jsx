import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  X,
  RefreshCw,
  Sparkles,
  Key,
  MessageSquare,
  ShoppingBag,
  Check,
  ExternalLink
} from 'lucide-react';
import { geminiService } from '../../services/geminiService';
import { useAuth } from '../../context/AuthContext';

const CHAT_STORAGE_KEY = 'farmdirect_ai_messages';

const INITIAL_GREETING = {
  id: 'msg-welcome',
  sender: 'ai',
  text: `👋 **Hello! Welcome to FarmDirect AI.**\n\nI'm your intelligent agricultural and buyer-communication assistant powered by **Google Gemini**. I can help you:\n\n• **Communicate with buyers & farmers** about harvest dates, crate packing, and bulk purchases\n• **Negotiate fair farm-gate pricing** with live APMC Mandi comparisons\n• **Discover fresh produce** harvested at dawn from verified growers\n• **Track orders** & verify escrow payment protection\n\nHow can I help you today?`,
  model: 'gemini-1.5-flash',
  timestamp: new Date().toISOString()
};

const SUGGESTED_QUERIES = {
  buyer: [
    "What fresh produce is available today?",
    "Why is FarmDirect price cheaper than supermarkets?",
    "How does escrow payment protection work?",
    "How can I buy in bulk from Rajesh Patel?"
  ],
  farmer: [
    "Draft a bulk offer message to urban buyers",
    "How should I price my tomatoes today?",
    "How do I explain my organic certification to buyers?",
    "What crops have the highest demand right now?"
  ]
};

export const FarmAssistantWidget = () => {
  const { user, isFarmer } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [chatMode, setChatMode] = useState(isFarmer ? 'farmer' : 'buyer'); // 'buyer' | 'farmer'
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Storage unavailable
    }
    return [INITIAL_GREETING];
  });
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => geminiService.getApiKey());
  const [keySavedToast, setKeySavedToast] = useState(false);

  const messagesEndRef = useRef(null);
  const msgCounterRef = useRef(messages.length);

  // Sync role to chat mode on user switch
  useEffect(() => {
    setChatMode(isFarmer ? 'farmer' : 'buyer');
  }, [isFarmer]);

  // Persist messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {
      // Ignore
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isTyping) return;

    msgCounterRef.current += 1;
    const userMsg = {
      id: `msg-${msgCounterRef.current}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    try {
      const result = await geminiService.sendMessage({
        message: query,
        history: messages,
        userRole: chatMode === 'farmer' ? 'Farmer Producer' : 'Buyer Consumer',
        context: {
          currentUserName: user?.name || 'Consumer',
          mode: chatMode
        }
      });

      msgCounterRef.current += 1;
      const aiMsg = {
        id: `msg-${msgCounterRef.current}`,
        sender: 'ai',
        text: result.reply,
        model: result.model || 'gemini-1.5-flash',
        poweredBy: result.poweredBy || 'Google Gemini AI',
        isLocalFallback: result.isLocalFallback,
        requiresKeyNotice: result.requiresKeyNotice,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      msgCounterRef.current += 1;
      const errorMsg = {
        id: `msg-${msgCounterRef.current}`,
        sender: 'ai',
        text: `Sorry, I encountered an issue: ${err.message}. Please try again or check your Gemini API key.`,
        isError: true,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_GREETING]);
    try {
      localStorage.removeItem(CHAT_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const handleSaveApiKey = () => {
    geminiService.setApiKey(apiKeyInput);
    setKeySavedToast(true);
    setTimeout(() => {
      setKeySavedToast(false);
      setShowKeyModal(false);
    }, 1200);
  };

  const hasConfiguredKey = geminiService.hasApiKey();

  // Simple Markdown formatting helper for bold, italics, lists, and line breaks
  const renderFormattedText = (text) => {
    if (!text) return null;

    return text.split('\n').map((line, lineIdx) => {
      // Bullet list items
      if (line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('* ')) {
        const itemContent = line.trim().replace(/^[•\-*]\s*/, '');
        return (
          <div key={lineIdx} className="flex items-start gap-1.5 ml-1 my-0.5">
            <span className="text-primary font-bold mt-0.5">•</span>
            <span>{formatInlineMarkdown(itemContent)}</span>
          </div>
        );
      }

      // Empty lines
      if (!line.trim()) {
        return <div key={lineIdx} className="h-1.5" />;
      }

      return (
        <div key={lineIdx} className="my-0.5">
          {formatInlineMarkdown(line)}
        </div>
      );
    });
  };

  const formatInlineMarkdown = (content) => {
    const parts = [];
    const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
    let lastIdx = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIdx) {
        parts.push(content.substring(lastIdx, match.index));
      }
      const token = match[0];
      if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(
          <strong key={match.index} className="font-bold text-slate-900 dark:text-white">
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith('*') && token.endsWith('*')) {
        parts.push(
          <em key={match.index} className="italic text-slate-600 dark:text-slate-300">
            {token.slice(1, -1)}
          </em>
        );
      } else if (token.startsWith('`') && token.endsWith('`')) {
        parts.push(
          <code key={match.index} className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-primary font-mono text-[10px]">
            {token.slice(1, -1)}
          </code>
        );
      }
      lastIdx = regex.lastIndex;
    }

    if (lastIdx < content.length) {
      parts.push(content.substring(lastIdx));
    }

    return parts.length > 0 ? parts : content;
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-20 lg:bottom-6 right-6 z-40 text-white p-3.5 rounded-full shadow-elevated flex items-center gap-2.5 group transition-all duration-300 active:scale-95 border border-white/20 ${
          isOpen
            ? 'bg-rose-600 hover:bg-rose-700'
            : 'bg-gradient-to-r from-emerald-600 via-emerald-700 to-primary hover:from-emerald-700 hover:to-primary-dark'
        }`}
        aria-label={isOpen ? "End and close FarmDirect AI Assistant" : "Open FarmDirect AI Assistant"}
        title={isOpen ? "End Chat" : "Open FarmDirect AI"}
      >
        {isOpen ? (
          <div className="flex items-center gap-1.5">
            <X className="w-5 h-5 text-white stroke-[2.5]" />
            <span className="text-xs font-bold pr-1">End Chat</span>
          </div>
        ) : (
          <>
            <div className="relative">
              <Bot className="w-5 h-5 text-white animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
            </div>
            <div className="flex flex-col text-left pr-1 hidden sm:flex">
              <span className="text-xs font-bold leading-tight flex items-center gap-1">
                FarmDirect AI
                <Sparkles className="w-3 h-3 text-amber-300" />
              </span>
              <span className="text-[9px] text-emerald-200 font-medium leading-none">
                Gemini Powered
              </span>
            </div>
          </>
        )}
      </button>

      {/* Slide-out / Floating Chat Drawer */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 sm:w-[420px] sm:h-[min(580px,calc(100vh-2rem))] sm:max-h-[calc(100vh-2rem)] z-50 flex flex-col bg-white dark:bg-slate-900 sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-fade-in font-sans">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-primary to-emerald-800 text-white p-3 sm:p-3.5 flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs sm:text-sm font-bold tracking-tight truncate">FarmDirect AI</h3>
                  <span className="inline-flex items-center gap-1 text-[9px] bg-amber-400/20 text-amber-200 border border-amber-300/30 px-1.5 py-0.5 rounded-full font-semibold shrink-0">
                    <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                    Gemini 1.5
                  </span>
                </div>
                <p className="text-[10px] text-emerald-100 truncate">
                  Buyer & Farmer Communication Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setShowKeyModal(true)}
                className={`p-1.5 rounded-lg transition-colors ${
                  hasConfiguredKey
                    ? 'text-emerald-200 hover:text-white hover:bg-white/15'
                    : 'bg-amber-500/30 text-amber-200 hover:bg-amber-500/50 animate-pulse'
                }`}
                title="Configure Gemini API Key"
              >
                <Key className="w-4 h-4" />
              </button>
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors"
                title="Reset conversation"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              {/* Prominent Cross Option to End the Chatbot */}
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs font-bold transition-all shadow-xs border border-rose-400/40 ml-1 cursor-pointer"
                title="End Chat and close"
                aria-label="End Chat"
                id="end-chatbot-btn"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
                <span className="text-[11px] font-semibold">End</span>
              </button>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs shrink-0">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              Role Perspective:
            </span>
            <div className="flex items-center bg-white dark:bg-slate-900 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setChatMode('buyer')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  chatMode === 'buyer'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <ShoppingBag className="w-3 h-3" />
                Buyer Assistant
              </button>
              <button
                onClick={() => setChatMode('farmer')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  chatMode === 'farmer'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-3 h-3" />
                Farmer Direct
              </button>
            </div>
          </div>

          {/* Quick Suggestion Prompts */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800 shrink-0">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {SUGGESTED_QUERIES[chatMode].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="shrink-0 text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors shadow-2xs hover:text-primary font-medium"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-white dark:bg-slate-900">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {isAi && (
                    <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 border border-emerald-200 dark:border-emerald-800">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}

                  <div className={`max-w-[85%] flex flex-col ${isAi ? 'items-start' : 'items-end'}`}>
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs ${
                        isAi
                          ? 'bg-slate-50 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80'
                          : 'bg-primary text-white rounded-br-xs'
                      }`}
                    >
                      {isAi ? renderFormattedText(msg.text) : msg.text}
                    </div>

                    {/* Metadata pill for AI messages */}
                    {isAi && (
                      <div className="flex items-center gap-2 mt-1 px-1 text-[9px] text-slate-400 dark:text-slate-500">
                        <span>{msg.poweredBy || 'Google Gemini'}</span>
                        <span>•</span>
                        <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    )}
                  </div>

                  {!isAi && (
                    <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                      You
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs pl-9">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.3s]"></span>
                </div>
                <span className="text-[11px] font-medium text-primary">Gemini is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  chatMode === 'farmer'
                    ? 'Ask how to communicate or negotiate with buyers...'
                    : 'Ask about produce, pricing, harvest origin, delivery...'
                }
                className="flex-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputQuery.trim() || isTyping}
                className="p-2.5 bg-primary hover:bg-primary-dark disabled:opacity-40 text-white rounded-xl transition-all shadow-xs active:scale-95 shrink-0"
                title="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-2 px-1">
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 text-rose-500 hover:text-rose-600 dark:text-rose-400 font-semibold transition-colors hover:underline cursor-pointer"
                title="End Chat Session"
                id="end-chatbot-footer-btn"
              >
                <X className="w-3.5 h-3.5" />
                <span>End Chat</span>
              </button>

              <div className="flex items-center gap-2.5">
                <span className="items-center gap-1 hidden xs:flex">
                  <Sparkles className="w-2.5 h-2.5 text-primary" />
                  Gemini 1.5
                </span>
                <button
                  onClick={() => setShowKeyModal(true)}
                  className="hover:text-primary transition-colors underline decoration-dotted"
                >
                  {hasConfiguredKey ? 'API Key Active' : 'Configure Key'}
                </button>
              </div>
            </div>
          </div>

          {/* API Key Configuration Modal Overlay */}
          {showKeyModal && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 w-full max-w-sm border border-slate-200 dark:border-slate-800 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Key className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Google Gemini API Key
                      </h4>
                      <p className="text-[10px] text-slate-500">Enable live AI communication</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowKeyModal(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                  Paste your Google AI Studio Gemini API key below to connect live Gemini conversational intelligence:
                </p>

                <div className="space-y-3">
                  <div>
                    <input
                      type="password"
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      placeholder="AIzaSy..."
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <a
                      href="https://aistudio.google.com/api-keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-primary hover:underline flex items-center gap-1 font-medium"
                    >
                      Get Key from Google AI Studio
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={handleSaveApiKey}
                      className="px-3.5 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      {keySavedToast ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Saved!
                        </>
                      ) : (
                        'Save Key'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
