import React from 'react';
import { CandidateProfile, Language } from '../types/resume';
import {
  MapPin,
  Phone,
  Mail,
  FileDown,
  GraduationCap,
  Globe2,
  ExternalLink,
} from 'lucide-react';

interface SidebarProps {
  profile: CandidateProfile;
  lang: Language;
  onNotify: (msg: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ profile, lang, onNotify }) => {
  const t = {
    en: {
      verified: 'Verified Candidate',
      contactTitle: 'Contact Details & Location',
      addressLabel: 'Official Address',
      phoneLabel: 'Telephone',
      emailLabel: 'Email Address',
      downloadCv: 'Download Original CV (PDF)',
      langTitle: 'Spoken Languages',
      degreesTitle: 'Top Degrees & Certifications',
      extTitle: 'External References',
      extSubtitle: 'Verified external portals and past client ecosystems:',
      copiedEmail: 'Copied email to clipboard: ',
      copiedPhone: 'Copied telephone number: ',
      langs: [
        { name: 'Swedish (Svenska)', level: 'Fluent / Professional' },
        { name: 'English', level: 'Fluent / Full Working' },
        { name: 'Chinese (中文)', level: 'Native' },
        { name: 'Norwegian (Norsk)', level: 'Working Proficiency' },
        { name: 'French (Français)', level: 'Basic' },
      ],
    },
    sv: {
      verified: 'Verifierad kandidat',
      contactTitle: 'Kontaktuppgifter & Adress',
      addressLabel: 'Folkbokföringsadress',
      phoneLabel: 'Telefonnummer',
      emailLabel: 'E-postadress',
      downloadCv: 'Ladda ner officiellt CV (PDF)',
      langTitle: 'Språkkunskaper',
      degreesTitle: 'Utbildning & Certifieringar',
      extTitle: 'Externa referenslänkar',
      extSubtitle: 'Verifierade externa portaler från tidigare uppdrag:',
      copiedEmail: 'Kopierade e-postadress: ',
      copiedPhone: 'Kopierade telefonnummer: ',
      langs: [
        { name: 'Svenska', level: 'Flytande / Professionell' },
        { name: 'Engelska', level: 'Flytande / Arbetsspråk' },
        { name: 'Kinesiska', level: 'Modersmål' },
        { name: 'Norska', level: 'God förståelse' },
        { name: 'Franska', level: 'Grundläggande' },
      ],
    },
    zh: {
      verified: '官方认证求职者',
      contactTitle: '联系方式与现居住址',
      addressLabel: '住址 (瑞典斯德哥尔摩)',
      phoneLabel: '联系电话',
      emailLabel: '电子邮箱',
      downloadCv: '下载原始履历 (PDF)',
      langTitle: '语言能力',
      degreesTitle: '重点学历与专业认证',
      extTitle: '官方外部链接',
      extSubtitle: '已验证的既往交付项目外部官方门户：',
      copiedEmail: '已复制邮箱: ',
      copiedPhone: '已复制电话: ',
      langs: [
        { name: '瑞典语 (Svenska)', level: '精通 / 流利工作语言' },
        { name: '英语 (English)', level: '流利 / 商务工作语言' },
        { name: '中文 (Chinese)', level: '母语' },
        { name: '挪威语 (Norwegian)', level: '熟练工作沟通' },
        { name: '法语 (French)', level: '基础日常交流' },
      ],
    },
  }[lang];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      onNotify(`${t.copiedEmail}${profile.email}`);
    } catch {
      onNotify(profile.email);
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(profile.phone);
      onNotify(`${t.copiedPhone}${profile.phone}`);
    } catch {
      onNotify(profile.phone);
    }
  };

  const getLocation = () => {
    if (lang === 'sv') return profile.svLocation;
    if (lang === 'zh') return profile.location;
    return profile.enLocation;
  };

  return (
    <aside
      aria-label="Candidate Information and Credentials"
      className="space-y-6"
    >
      {/* Profile Card with Image with All Correct Required HTML Attributes */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        {/* Profile Image with explicit alt-text, width, height, and loading attributes */}
        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white dark:bg-slate-800 mb-5 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center p-2">
          <img
            src={profile.avatarUrl}
            alt="Portrait of Fang Stålmarck, Senior DevOps and Full Stack Developer based in Stockholm"
            width={400}
            height={400}
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter contrast-[1.03]"
          />
          <div className="absolute bottom-2.5 left-2.5 right-2.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-medium flex items-center justify-between">
            <span>{t.verified}</span>
            <span className="font-mono text-emerald-400">Stockholm, SE</span>
          </div>
        </div>

        {/* Level 3 Heading: Contact Information */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
          {t.contactTitle}
        </h3>

        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <strong className="block text-slate-900 dark:text-white font-semibold">
                {t.addressLabel}
              </strong>
              <span>{getLocation()}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Phone className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <strong className="block text-slate-900 dark:text-white font-semibold">
                {t.phoneLabel}
              </strong>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="font-mono hover:text-slate-900 dark:hover:text-white underline decoration-dotted text-left"
                title="Click to copy telephone"
              >
                {profile.phone}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Mail className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <strong className="block text-slate-900 dark:text-white font-semibold">
                {t.emailLabel}
              </strong>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="font-mono hover:text-slate-900 dark:hover:text-white underline decoration-dotted text-left"
                title="Click to copy email"
              >
                {profile.email}
              </button>
            </div>
          </div>
        </div>

        {/* Download PDF Resume Button linking directly to uploaded PDF */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <a
            href="/assets/aistudio/Fang_St_lmarck_CV_SV_f251bd6a.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors shadow-xs"
          >
            <FileDown className="w-4 h-4" />
            <span>{t.downloadCv}</span>
          </a>
        </div>
      </div>

      {/* Languages Box */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Globe2 className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t.langTitle}
          </h3>
        </div>

        <ul className="space-y-2 text-xs">
          {t.langs.map((item, i) => (
            <li
              key={i}
              className={`flex items-center justify-between py-1 ${
                i < t.langs.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''
              }`}
            >
              <span className="font-semibold text-slate-800 dark:text-slate-200">{item.name}</span>
              <span className="text-slate-500">{item.level}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Education Highlights & Certifications */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <GraduationCap className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t.degreesTitle}
          </h3>
        </div>

        <div className="space-y-3.5 text-xs">
          <div>
            <div className="flex items-center justify-between">
              <strong className="text-slate-900 dark:text-white font-semibold">
                NVIDIA Generative AI LLMs
              </strong>
              <span className="font-mono text-slate-500">2026</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              NVIDIA Deep Learning Institute & Coursera
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <strong className="text-slate-900 dark:text-white font-semibold">
                DevOps Engineer Certification
              </strong>
              <span className="font-mono text-slate-500">2024</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              Tietoevry & Microsoft
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <strong className="text-slate-900 dark:text-white font-semibold">
                M.Sc. in Software Development
              </strong>
              <span className="font-mono text-slate-500">2007-2012</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              KTH Royal Institute of Technology, Stockholm
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <strong className="text-slate-900 dark:text-white font-semibold">
                B.S. in Computer Science
              </strong>
              <span className="font-mono text-slate-500">1992-1996</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              Lanzhou University
            </p>
          </div>
        </div>
      </div>

      {/* External Verified Links Box */}
      <div className="p-6 rounded-2xl bg-slate-100/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
          {t.extTitle}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          {t.extSubtitle}
        </p>

        <div className="space-y-2 text-xs">
          <a
            href="https://www.uhr.se"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/60 dark:border-slate-700/60 transition-colors"
          >
            <span className="font-medium">UHR.se (EPiServer Portals)</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <a
            href="https://www.sveaskog.se"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/60 dark:border-slate-700/60 transition-colors"
          >
            <span className="font-medium">Sveaskog.se (Forest Logistics)</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <a
            href="https://www.kth.se"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/60 dark:border-slate-700/60 transition-colors"
          >
            <span className="font-medium">KTH Royal Institute of Technology</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>
    </aside>
  );
};
