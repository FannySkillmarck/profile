import React, { useState } from 'react';
import { CandidateProfile, Language } from '../types/resume';
import { Moon, Sun, Printer, Edit3, MessageSquarePlus, Menu, X, FileDown, Globe, Bot } from 'lucide-react';

interface HeaderProps {
  profile: CandidateProfile;
  lang: Language;
  onChangeLang: (lang: Language) => void;
  isDark: boolean;
  onToggleDark: () => void;
  onOpenPrint: () => void;
  onOpenEdit: () => void;
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
  onOpenEdit,
  onScrollToMessage,
  onOpenChat,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-6">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#top"
          className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
        >
          {profile.name} <span className="font-normal text-slate-500">· Stockholm</span>
        </a>

        {/* Zone 2: Navigation / Menu (<nav>) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300"
        >
          <ul className="flex items-center gap-6 list-none p-0 m-0">
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
          {/* Trilingual Switcher (English, Swedish, Chinese) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200/60 dark:border-slate-700/60"
              title="Change Language (English / Svenska / 中文)"
              aria-label="Change language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span className="uppercase font-mono">{lang}</span>
              <span className="text-[10px] text-slate-400">▼</span>
            </button>

            {langDropdownOpen && (
              <div
                className="absolute right-0 mt-1.5 w-36 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-50 animate-in fade-in duration-100"
                role="menu"
              >
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      onChangeLang(item.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left transition-colors ${
                      lang === item.code
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{item.flag}</span>
                      <span>{item.label}</span>
                    </span>
                    {lang === item.code && <span className="text-emerald-500 font-bold">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Edit profile modal trigger */}
          <button
            type="button"
            onClick={onOpenEdit}
            title="Edit Candidate Information"
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Edit Profile"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={onToggleDark}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Quick PDF download button */}
          <a
            href="/assets/aistudio/Fang_St_lmarck_CV_SV_f251bd6a.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="Download PDF CV"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>{navLabels.pdfCv}</span>
          </a>

          {/* Primary Action Button: Ask AI Assistant */}
          <button
            type="button"
            onClick={onOpenChat}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 rounded-lg transition-colors shadow-2xs"
            title="Chat with AI Recruitment Assistant"
          >
            <Bot className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-medium">{navLabels.askAi}</span>
          </button>

          {/* Primary Action Button: Print Resume */}
          <button
            type="button"
            onClick={onOpenPrint}
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{navLabels.print}</span>
          </button>

          {/* Mobile Quick Contact Button */}
          <button
            type="button"
            onClick={onScrollToMessage}
            className="md:hidden flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 dark:bg-white dark:text-slate-900"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>{navLabels.quickContact}</span>
          </button>

          {/* Mobile Hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-3">
          {/* Mobile Language Switcher */}
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-500">Language:</span>
            <div className="flex items-center gap-1">
              {languages.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => onChangeLang(item.code)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium ${
                    lang === item.code
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {item.flag} {item.code.toUpperCase()}
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
