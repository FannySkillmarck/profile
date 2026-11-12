import React, { useState } from 'react';
import { CandidateProfile, Language } from '../types/resume';
import {
  Mail,
  Check,
  Copy,
  ArrowUpRight,
  MessageSquare,
  MapPin,
  Briefcase,
  Github,
  Linkedin,
  QrCode,
  FileDown,
  Phone,
  Bot,
  Sparkles,
} from 'lucide-react';

interface HeroProps {
  profile: CandidateProfile;
  lang: Language;
  onScrollToMessage: () => void;
  onScrollToProjects: () => void;
  onShowWechatQr: () => void;
  onNotify: (msg: string) => void;
  onOpenChat?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  lang,
  onScrollToMessage,
  onScrollToProjects,
  onShowWechatQr,
  onNotify,
  onOpenChat,
}) => {
  const [copied, setCopied] = useState(false);

  const t = {
    en: {
      kicker: 'STOCKHOLM, SWEDEN · 2026',
      contactBtn: 'Contact & Send Message',
      projectsBtn: 'View Projects (3)',
      copiedMsg: 'Copied email to clipboard: ',
      copyEmail: 'Click to copy email',
      cvDownload: 'Download CV (PDF)',
      verified: 'VERIFIED CANDIDATE DOSSIER',
      location: 'Stockholm, Sweden',
      avail: 'Full-Time / Consulting / Hybrid',
    },
    sv: {
      kicker: 'STOCKHOLM, SVERIGE · 2026',
      contactBtn: 'Kontakta mig / Skicka meddelande',
      projectsBtn: 'Se utvalda projekt (3)',
      copiedMsg: 'Kopierade e-postadress: ',
      copyEmail: 'Klicka för att kopiera e-post',
      cvDownload: 'Ladda ner CV (PDF)',
      verified: 'VERIFIERAD KANDIDATPROFIL',
      location: 'Stockholm, Sverige',
      avail: 'Heltid / Konsult / Hybrid',
    },
    zh: {
      kicker: '瑞典斯德哥尔摩 · 2026',
      contactBtn: '招聘留言 / 快速邀约',
      projectsBtn: '浏览核心项目 (3)',
      copiedMsg: '已复制候选人邮箱: ',
      copyEmail: '点击复制邮箱',
      cvDownload: '下载简历 (PDF)',
      verified: '官方认证候选人档案',
      location: '斯德哥尔摩，瑞典',
      avail: '全职 / 顾问咨询 / 远程',
    },
  }[lang];

  const getTitle = () => {
    if (lang === 'sv') return profile.svTitle;
    if (lang === 'zh') return profile.title;
    return profile.enTitle;
  };

  const getTagline = () => {
    if (lang === 'sv') return profile.svTagline;
    if (lang === 'zh') return profile.tagline;
    return profile.enTagline;
  };

  const getBio = () => {
    if (lang === 'sv') return profile.svBio;
    if (lang === 'zh') return profile.bio;
    return profile.enBio;
  };

  const getJobStatus = () => {
    if (lang === 'sv') return profile.svJobStatus;
    if (lang === 'zh') return profile.jobStatus;
    return profile.enJobStatus;
  };

  const getLocation = () => {
    if (lang === 'sv') return profile.svLocation;
    if (lang === 'zh') return profile.location;
    return profile.enLocation;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      onNotify(`${t.copiedMsg}${profile.email}`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onNotify(profile.email);
    }
  };

  return (
    <section id="about" className="relative pt-10 pb-16 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split-Screen Hero: Left = Typographic Hierarchy; Right = Candidate Real Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Kicker & Candidate Status on the same line */}
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-4 flex-nowrap whitespace-nowrap overflow-x-auto no-scrollbar py-0.5">
                <span className="shrink-0">{t.kicker}</span>
                <span aria-hidden="true" className="shrink-0 text-slate-300 dark:text-slate-700">·</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-700/60 font-semibold whitespace-nowrap shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                  <span className="whitespace-nowrap">{getJobStatus()}</span>
                </span>
              </div>

              {/* Level 1 Heading: h1 */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-5 [text-wrap:balance]">
                {profile.name}
                <span className="block text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-600 dark:text-slate-400 mt-2">
                  {getTitle()}
                </span>
              </h1>

              {/* Tagline & Lead Paragraph */}
              <p className="text-base sm:text-lg font-medium text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                {getTagline()}
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                {getBio()}
              </p>

              {/* Contact Details & Address Strip */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600 dark:text-slate-400 pt-2 pb-6 border-t border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{getLocation()}</span>
                </div>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">{profile.phone}</span>
                </div>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  <span>M.Sc. KTH Royal Institute of Technology</span>
                </div>
              </div>
            </div>

            {/* CTAs & Direct Contact Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onScrollToMessage}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors shadow-sm whitespace-nowrap shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.contactBtn}</span>
              </button>

              <button
                type="button"
                onClick={onScrollToProjects}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <span>{t.projectsBtn}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {onOpenChat && (
                <button
                  type="button"
                  onClick={onOpenChat}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-2xs"
                  title="Ask Gemini AI about Fang's experience and background"
                >
                  <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{lang === 'sv' ? 'Fråga AI om Fang' : lang === 'zh' ? '向 AI 咨询履历' : 'Ask AI Assistant'}</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </button>
              )}

              {/* Direct Email Copy Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-900 transition-all whitespace-nowrap shrink-0"
                title={t.copyEmail}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span className="font-mono text-xs">{profile.email}</span>
              </button>

              {/* Download Original CV PDF */}
              <a
                href="/assets/aistudio/Fang_St_lmarck_CV_SV_f251bd6a.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={t.cvDownload}
              >
                <FileDown className="w-4 h-4" />
                <span>{t.cvDownload}</span>
              </a>

              {/* WeChat modal */}
              <button
                type="button"
                onClick={onShowWechatQr}
                className="p-2.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="WeChat Contact"
                aria-label="WeChat"
              >
                <QrCode className="w-4 h-4" />
              </button>

              {/* GitHub */}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="GitHub Profile"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              {/* LinkedIn */}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="LinkedIn Profile"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Container with Candidate's Real Photo */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative w-full h-full min-h-[380px] lg:min-h-[440px] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center p-3">
              <img
                src={profile.avatarUrl}
                alt="Portrait of Fang Stålmarck, Senior DevOps and Full Stack Developer based in Stockholm"
                width={400}
                height={400}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full max-h-[460px] object-contain filter contrast-[1.03]"
              />
              {/* Bottom Scrim */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/85 via-black/45 to-transparent text-white">
                <div className="text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                  {t.verified}
                </div>
                <div className="text-base font-semibold leading-snug">
                  {profile.name} · {getTitle()}
                </div>
                <div className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                  <span>{t.location}</span>
                  <span>·</span>
                  <span>{t.avail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width KPI strip below the split */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {profile.metrics.map((metric, idx) => {
              const label = lang === 'sv' ? metric.svLabel : lang === 'zh' ? metric.label : metric.enLabel;
              const subtext = lang === 'sv' ? metric.svSubtext : lang === 'zh' ? metric.subtext : metric.enSubtext;
              return (
                <div key={idx} className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums tracking-tight text-slate-900 dark:text-white">
                    {metric.value}
                  </span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                    {label}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {subtext}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
