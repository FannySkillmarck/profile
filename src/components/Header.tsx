import React, { useState, useEffect } from 'react';
import { CandidateProfile, Language } from '../types/resume';
import { Moon, Sun, Printer, MessageSquarePlus, Menu, X, FileDown, Globe, Bot } from 'lucide-react';

interface HeaderProps {
  profile: CandidateProfile;
  lang: Language;
  onChangeLang: (lang: Language) => void;
  isDark: boolean;
  onToggleDark: () => void;
  onOpenPrint: () => void;
  onScrollToMessage: () => void;
  onOpenChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  lang,
  onChangeLang,
  isDark,
  onToggleDark,
  onOpenPrint,
  onScrollToMessage,
  onOpenChat,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLangDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const navLabels = {
    en: {
      about: 'About',
      projects: 'Projects (3)',
      experience: 'Experience',
      skills: 'Competencies',
      contact: 'Contact & Inquiries',
      print: 'Print View',
      quickContact: 'Contact',
      pdfCv: 'PDF CV',
      askAi: 'Ask AI',
    },
    sv: {
      about: 'Om mig',
      projects: 'Projekt (3)',
      experience: 'Erfarenhet',
      skills: 'Kompetens',
      contact: 'Kontakt & Inquiries',
      print: 'Skriv ut',
      quickContact: 'Kontakt',
      pdfCv: 'CV (PDF)',
      askAi: 'Fråga AI',
    },
    zh: {
      about: '关于我',
      projects: '核心项目 (3)',
      experience: '工作履历',
      skills: '专业技能',
      contact: '招聘留言与联系',
      print: '打印简历',
      quickContact: '联系',
      pdfCv: '简历 (PDF)',
      askAi: 'AI 助手',
    },
  }[lang];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'sv', label: 'Svenska', flag: '🇸🇪' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 dark:bg-slate-950/95 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#top"
          className="text-sm sm:text-base lg:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
        >
          {profile.name} <span className="hidden xl:inline font-normal text-slate-600 dark:text-slate-300">· Stockholm</span>
        </a>

        {/* Zone 2: Navigation / Menu (<nav>) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-3 lg:gap-6 text-xs lg:text-sm font-medium text-slate-600 dark:text-slate-300"
        >
          <ul className="flex items-center gap-3 lg:gap-5 list-none p-0 m-0">
            <li>
              <a
                href="#about"
                className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
              >
                {navLabels.about}
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
              >
                {navLabels.projects}
              </a>
            </li>
            <li>
              <a
                href="#experience"
                className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
              >
                {navLabels.experience}
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
              >
                {navLabels.skills}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
              >
                {navLabels.contact}
              </a>
            </li>
          </ul>
        </nav>

        {/* Zone 3: 3-Language Button & Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Trilingual Switcher (English, Swedish, Chinese) - High-Contrast Green */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              aria-expanded={langDropdownOpen}
              aria-haspopup="menu"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-lg transition-all border border-emerald-800 dark:border-emerald-500 shadow-sm ring-2 ring-emerald-500/30 active:scale-95 cursor-pointer"
              title="Change Language / Byt språk / 切换语言 (EN / SV / 中文)"
              aria-label={`Change language (current: ${lang.toUpperCase()})`}
            >
              <Globe className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              <span className="uppercase font-mono tracking-wider font-bold">
                {lang === 'en' ? '🇬🇧 EN' : lang === 'sv' ? '🇸🇪 SV' : '🇨🇳 中文'}
              </span>
              <span className="text-[10px] text-white" aria-hidden="true">▼</span>
            </button>

            {langDropdownOpen && (
              <div
                className="absolute right-0 mt-1.5 w-40 rounded-xl bg-white dark:bg-slate-900 border-2 border-emerald-600/60 dark:border-emerald-500/60 shadow-xl py-1 z-50 animate-in fade-in duration-100 ring-1 ring-emerald-600/20"
                role="menu"
                aria-label="Language selection"
              >
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 border-b border-emerald-100 dark:border-slate-800">
                  Select Language
                </div>
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    role="menuitemradio"
                    aria-checked={lang === item.code}
                    onClick={() => {
                      onChangeLang(item.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left transition-colors cursor-pointer ${
                      lang === item.code
                        ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 hover:text-emerald-800 dark:hover:text-emerald-200'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base" aria-hidden="true">{item.flag}</span>
                      <span>{item.label}</span>
                    </span>
                    {lang === item.code && <span className="text-emerald-700 dark:text-emerald-300 font-bold" aria-hidden="true">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={onToggleDark}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={isDark ? 'Switch to light color mode' : 'Switch to dark color mode'}
            aria-pressed={isDark}
          >
            {isDark ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
          </button>

          {/* Quick PDF download button */}
          <a
            href="/assets/aistudio/Fang_St_lmarck_CV_SV_f251bd6a.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="Download PDF CV"
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <FileDown className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{navLabels.pdfCv}</span>
          </a>

          {/* Primary Action Button: Ask AI Assistant */}
          <button
            type="button"
            onClick={onOpenChat}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/80 dark:text-emerald-200 dark:hover:bg-emerald-900/70 border border-emerald-400 dark:border-emerald-700 rounded-lg transition-colors shadow-2xs shrink-0"
            title="Chat with AI Recruitment Assistant"
            aria-label={navLabels.askAi}
          >
            <Bot className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
            <span className="hidden sm:inline font-medium">{navLabels.askAi}</span>
          </button>

          {/* Primary Action Button: Print Resume */}
          <button
            type="button"
            onClick={onOpenPrint}
            className="hidden xl:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{navLabels.print}</span>
          </button>

          {/* Mobile Quick Contact Button */}
          <button
            type="button"
            onClick={onScrollToMessage}
            className="hidden sm:flex md:hidden items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 dark:bg-white dark:text-slate-900"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{navLabels.quickContact}</span>
          </button>

          {/* Mobile Hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 dark:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-3"
        >
          {/* Mobile Language Switcher - Highlighted in Green */}
          <div className="flex items-center justify-between pb-3 border-b border-emerald-100 dark:border-slate-800">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
              <span>Language / Språk:</span>
            </span>
            <div className="flex items-center gap-1.5">
              {languages.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  aria-pressed={lang === item.code}
                  onClick={() => onChangeLang(item.code)}
                  className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-all ${
                    lang === item.code
                      ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-500/30'
                      : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  <span aria-hidden="true">{item.flag}</span> {item.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <nav aria-label="Mobile Navigation">
            <ul className="space-y-2 list-none p-0 m-0 text-sm font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenChat();
                  }}
                  className="w-full flex items-center gap-2 py-2 px-3 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg font-semibold text-left"
                >
                  <Bot className="w-4 h-4" />
                  <span>{navLabels.askAi} ({lang === 'sv' ? 'Chattassistent' : lang === 'zh' ? '智能问答' : 'Gemini AI Assistant'})</span>
                </button>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-slate-700 dark:text-slate-200 hover:text-slate-900"
                >
                  {navLabels.about}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-slate-700 dark:text-slate-200 hover:text-slate-900"
                >
                  {navLabels.projects}
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-slate-700 dark:text-slate-200 hover:text-slate-900"
                >
                  {navLabels.experience}
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-slate-700 dark:text-slate-200 hover:text-slate-900"
                >
                  {navLabels.skills}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-slate-700 dark:text-slate-200 hover:text-slate-900"
                >
                  {navLabels.contact}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};
