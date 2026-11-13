import React, { useState, useRef, useEffect } from 'react';
import { CandidateProfile, Language } from '../types/resume';
import {
  Bot,
  Sparkles,
  Send,
  X,
  Minimize2,
  Maximize2,
  RefreshCw,
  Mail,
  Phone,
  MessageSquare,
  User,
  Copy,
  Check,
  ArrowRight,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface ChatbotProps {
  profile: CandidateProfile;
  lang: Language;
  isOpen: boolean;
  onToggle: () => void;
  onScrollToMessage: () => void;
  onNotify?: (msg: string) => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({
  profile,
  lang,
  isOpen,
  onToggle,
  onScrollToMessage,
  onNotify,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Internationalized content & prompts
  const i18n = {
    en: {
      title: "Fang's AI Career Assistant",
      subtitle: "Powered by Gemini 2.5 Flash",
      status: "Online & ready to answer recruiter questions",
      welcome:
        "Hello! I'm Fang Stålmarck's AI Career Assistant. Ask me anything about her 15+ years of DevOps & Full Stack experience, KTH Master's degree, NVIDIA Generative AI certification, or how to arrange an interview in Stockholm.",
      suggestions: [
        "What are Fang's key DevOps and cloud skills?",
        "Tell me about her work with EPiServer at UHR",
        "What is her availability and notice period?",
        "How can I contact Fang directly for an interview?",
      ],
      placeholder: "Ask about Fang's experience, skills, or projects...",
      send: "Send",
      thinking: "Gemini is analyzing Fang's profile...",
      clearChat: "Clear conversation",
      contactActions: "Quick Actions",
      sendEmail: "Email Fang",
      callDirect: "Call Phone",
      fillForm: "Fill Contact Form",
      copied: "Copied to clipboard",
      errorMsg: "Sorry, I encountered an issue reaching the AI service. You can contact Fang directly at fang.stalmarck@gmail.com or +46 76 18 48 301.",
    },
    sv: {
      title: "Fangs AI-Karriärassistent",
      subtitle: "Drivs av Gemini 2.5 Flash",
      status: "Online & redo att besvara arbetsgivares frågor",
      welcome:
        "Hej! Jag är Fang Stålmarcks AI-assistent. Fråga mig om hennes 15+ års erfarenhet inom DevOps & Full Stack, KTH civilingenjörsexamen, NVIDIA Generative AI-certifiering eller hur du kontaktar henne för ett möte i Stockholm.",
      suggestions: [
        "Vilka är Fangs främsta DevOps- och molnkompetenser?",
        "Berätta om hennes arbete med EPiServer hos UHR",
        "Vad har hon för tillgänglighet och uppsägningstid?",
        "Hur kontaktar jag Fang snabbast för en intervju?",
      ],
      placeholder: "Ställ en fråga om Fangs erfarenhet, projekt eller kompetens...",
      send: "Skicka",
      thinking: "Gemini analyserar Fangs profil...",
      clearChat: "Rensa samtal",
      contactActions: "Snabbval",
      sendEmail: "E-posta Fang",
      callDirect: "Ring Fang",
      fillForm: "Fyll i kontaktformulär",
      copied: "Kopierat till urklipp",
      errorMsg: "Tyvärr uppstod ett fel vid anslutning till AI-tjänsten. Kontakta Fang direkt via fang.stalmarck@gmail.com eller +46 76 18 48 301.",
    },
    zh: {
      title: "方立马克 (Fang) 的 AI 招聘助手",
      subtitle: "基于 Google Gemini 2.5 Flash",
      status: "在线中 · 随时解答招聘与技术经历",
      welcome:
        "您好！我是 Fang Stålmarck 的专属 AI 职业与招聘助手。您可以向我提问关于她 15+ 年的 DevOps 与全栈架构经验、瑞典皇家理工 (KTH) 硕士背景、NVIDIA 生成式 AI 认证，或直接安排面试沟通。",
      suggestions: [
        "Fang 擅长哪些核心 DevOps 与云架构技术？",
        "介绍一下她在瑞典高等教育署 (UHR) 的项目经验",
        "她目前的到岗时间与招聘偏好是怎样的？",
        "如何直接联系 Fang 安排技术面试？",
      ],
      placeholder: "向 AI 询问 Fang 的项目经验、技术栈或履历...",
      send: "发送",
      thinking: "Gemini 正在分析 Fang 的履历库...",
      clearChat: "清空对话",
      contactActions: "快捷操作",
      sendEmail: "发送邮件",
      callDirect: "致电联系",
      fillForm: "填写留言板",
      copied: "已复制到剪贴板",
      errorMsg: "抱歉，连接 AI 助手时出现网络波动。欢迎直接发送邮件至 fang.stalmarck@gmail.com 或拨打 +46 76 18 48 301 与 Fang 联系！",
    },
  }[lang];

  // Initialize or reset welcome message on lang change if chat is empty
  useEffect(() => {
    if (messages.length === 0) {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      setMessages([
        {
          id: 'welcome-msg',
          role: 'model',
          text: i18n.welcome,
          timestamp: timeStr,
        },
      ]);
    }
  }, [lang]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen, isMinimized]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, isMinimized]);

  // Close chatbot on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onToggle();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onToggle]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = (queryText || inputValue).trim();
    if (!textToSend || isLoading) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: timeStr,
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build multi-turn history for /api/chat
      const apiHistory = newHistory.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history: apiHistory.slice(0, -1), // previous turns before current message
          model: 'gemini-3.8-flash',
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.statusText}`);
      }

      const data = await res.json();
      const replyText = data.reply || i18n.errorMsg;

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'model',
        text: replyText,
        timestamp: `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackAiMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        role: 'model',
        text: i18n.errorMsg,
        timestamp: `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`,
      };
      setMessages((prev) => [...prev, fallbackAiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    if (onNotify) onNotify(i18n.copied);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: i18n.welcome,
        timestamp: timeStr,
      },
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button (visible when chat window is closed) */}
      {!isOpen && (
        <div role="region" aria-label="AI Assistant Launcher" className="fixed bottom-6 right-6 z-50">
          <button
            type="button"
            onClick={onToggle}
            className="group relative flex items-center gap-3 bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 hover:from-emerald-800 hover:to-cyan-900 text-white px-4 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-hidden focus:ring-4 focus:ring-emerald-400/50"
            aria-label="Open AI Recruitment Assistant"
            aria-expanded={false}
          >
            <div className="relative" aria-hidden="true">
              <Bot className="w-6 h-6 animate-pulse" aria-hidden="true" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 border-2 border-emerald-800 rounded-full" />
            </div>
            <div className="flex flex-col text-left pr-1">
              <span className="text-xs font-bold leading-tight flex items-center gap-1">
                {lang === 'sv' ? 'Fråga AI om Fang' : lang === 'zh' ? 'AI 简历问答助手' : 'Ask AI About Fang'}
                <Sparkles className="w-3 h-3 text-amber-300" aria-hidden="true" />
              </span>
              <span className="text-[10px] text-emerald-50 font-normal">
                {lang === 'sv' ? 'Sök erfarenhet & kontakt' : lang === 'zh' ? '搜索技术背景与直联' : 'Search skills & contact'}
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Main Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="chatbot-title"
          className={`fixed z-50 transition-all duration-300 ease-out ${
            isMinimized
              ? 'bottom-6 right-6 w-80 sm:w-96 rounded-2xl shadow-xl'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[440px] md:w-[480px] h-[580px] max-h-[85vh] rounded-2xl shadow-2xl'
          } bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-700 to-cyan-700 p-0.5 shrink-0 flex items-center justify-center shadow-inner" aria-hidden="true">
                <Bot className="w-5 h-5 text-white" aria-hidden="true" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 id="chatbot-title" className="text-sm font-bold text-white truncate">{i18n.title}</h2>
                  <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/20 text-emerald-200 border border-emerald-500/30">
                    Gemini 2.5
                  </span>
                </div>
                <p className="text-[11px] text-slate-200 truncate">{i18n.subtitle}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleClearChat}
                title={i18n.clearChat}
                className="p-1.5 text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
                aria-label={i18n.clearChat}
              >
                <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand' : 'Minimize'}
                className="p-1.5 text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
                aria-label={isMinimized ? 'Expand chat window' : 'Minimize chat window'}
                aria-expanded={!isMinimized}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" /> : <Minimize2 className="w-3.5 h-3.5" aria-hidden="true" />}
              </button>
              <button
                type="button"
                onClick={onToggle}
                title="Close Chat"
                className="p-1.5 text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
                aria-label="Close chat assistant"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Body (only if not minimized) */}
          {!isMinimized && (
            <>
              {/* Message Thread */}
              <div
                role="log"
                aria-live="polite"
                aria-relevant="additions"
                aria-label={i18n.title}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60 dark:bg-slate-950/60"
              >
                {messages.map((msg) => {
                  const isModel = msg.role === 'model';
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${isModel ? 'items-start' : 'items-start flex-row-reverse'}`}
                    >
                      {/* Avatar */}
                      <div
                        aria-hidden="true"
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs shadow-xs ${
                          isModel
                            ? 'bg-emerald-700 text-white'
                            : 'bg-slate-800 text-slate-100 dark:bg-slate-700'
                        }`}
                      >
                        {isModel ? <Bot className="w-4 h-4" aria-hidden="true" /> : <User className="w-4 h-4" aria-hidden="true" />}
                      </div>

                      {/* Bubble */}
                      <div
                        className={`group relative max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                          isModel
                            ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 rounded-tl-xs'
                            : 'bg-gradient-to-r from-emerald-700 to-teal-700 text-white rounded-tr-xs'
                        }`}
                      >
                        {/* Text formatting with paragraphs and line breaks */}
                        <div className="whitespace-pre-wrap">{msg.text}</div>

                        {/* Footer time & copy */}
                        <div
                          className={`mt-1.5 flex items-center gap-2 text-[10px] ${
                            isModel ? 'text-slate-600 dark:text-slate-300' : 'text-emerald-50'
                          }`}
                        >
                          <span>{msg.timestamp}</span>
                          {isModel && (
                            <button
                              type="button"
                              onClick={() => handleCopyMessage(msg.id, msg.text)}
                              className="opacity-70 group-hover:opacity-100 focus:opacity-100 transition-opacity hover:text-slate-900 dark:hover:text-white flex items-center gap-0.5"
                              title="Copy response"
                              aria-label="Copy response"
                            >
                              {copiedId === msg.id ? (
                                <Check className="w-3 h-3 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                              ) : (
                                <Copy className="w-3 h-3" aria-hidden="true" />
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex gap-2.5 items-start" role="status" aria-live="polite">
                    <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0" aria-hidden="true">
                      <Bot className="w-4 h-4 animate-spin" aria-hidden="true" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1" aria-hidden="true">
                          <span className="w-1.5 h-1.5 bg-emerald-700 dark:bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-1.5 h-1.5 bg-emerald-700 dark:bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-1.5 h-1.5 bg-emerald-700 dark:bg-emerald-400 rounded-full animate-bounce"></span>
                        </div>
                        <span className="text-xs text-slate-600 dark:text-slate-300 italic">
                          {i18n.thinking}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions Chips (shown when few messages) */}
              {messages.length <= 3 && !isLoading && (
                <div className="px-4 py-2 bg-slate-100/70 dark:bg-slate-900/70 border-t border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    {lang === 'sv' ? 'Vanliga frågor för rekryterare:' : lang === 'zh' ? '雇主常问技术与履历问题：' : 'Suggested questions for recruiters:'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {i18n.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(sug)}
                        className="text-left text-[11px] bg-white dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-800 dark:hover:bg-slate-700 dark:hover:text-emerald-200 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 px-2.5 py-1 rounded-full transition-colors leading-tight"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Contact Action Bar */}
              <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                  {i18n.contactActions}:
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-1 text-[11px] text-emerald-800 dark:text-emerald-300 hover:underline font-semibold"
                    title={profile.email}
                  >
                    <Mail className="w-3 h-3" aria-hidden="true" />
                    <span>{i18n.sendEmail}</span>
                  </a>
                  <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">|</span>
                  <a
                    href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-1 text-[11px] text-emerald-800 dark:text-emerald-300 hover:underline font-semibold"
                    title={profile.phone}
                  >
                    <Phone className="w-3 h-3" aria-hidden="true" />
                    <span>{i18n.callDirect}</span>
                  </a>
                  <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">|</span>
                  <button
                    type="button"
                    onClick={() => {
                      onScrollToMessage();
                      onToggle();
                    }}
                    className="flex items-center gap-1 text-[11px] text-slate-800 dark:text-slate-200 hover:text-emerald-800 dark:hover:text-emerald-300 font-semibold"
                  >
                    <MessageSquare className="w-3 h-3" aria-hidden="true" />
                    <span>{i18n.fillForm}</span>
                  </button>
                </div>
              </div>

              {/* Input Box */}
              <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <label htmlFor="chatbot-message-input" className="sr-only">
                    {i18n.placeholder}
                  </label>
                  <input
                    id="chatbot-message-input"
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={i18n.placeholder}
                    aria-label={i18n.placeholder}
                    disabled={isLoading}
                    className="flex-1 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 dark:focus:ring-emerald-400 disabled:opacity-60 placeholder-slate-500 dark:placeholder-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 text-white hover:from-emerald-800 hover:to-teal-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs shrink-0"
                    aria-label={i18n.send}
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
