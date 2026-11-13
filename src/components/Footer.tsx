import React from 'react';
import { CandidateProfile, Language } from '../types/resume';
import { Mail, Phone, MapPin, Github, Linkedin, ArrowUp, ExternalLink, FileDown } from 'lucide-react';

interface FooterProps {
  profile: CandidateProfile;
  lang?: Language;
}

export const Footer: React.FC<FooterProps> = ({ profile, lang = 'en' }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = {
    en: {
      subtitle: `${profile.enTitle} · M.Sc. in Software Development from KTH Royal Institute of Technology.`,
      navTitle: 'Navigation',
      navAbout: 'About & Background',
      navProjects: 'Three Projects (Sveaskog, UHR, Veni)',
      navExp: 'Work Experience (Tietoevry, H&M, Försvarsmakten)',
      navSkills: 'Technical Competencies',
      navContact: 'Contact Form & Message Board',
      extTitle: 'External Portals & Resume',
      downloadCv: 'Download Official CV (PDF)',
      uhrText: 'UHR.se Swedish Higher Education Portals',
      sveaText: 'Sveaskog Logistics & Map Services',
      rights: 'All rights reserved.',
      backToTop: 'Back to top',
    },
    sv: {
      subtitle: `${profile.svTitle} · Civilingenjörsexamen i programvaruteknik från KTH (Kungliga Tekniska högskolan).`,
      navTitle: 'Navigering',
      navAbout: 'Om mig & Bakgrund',
      navProjects: 'Tre Projekt (Sveaskog, UHR, Veni)',
      navExp: 'Arbetslivserfarenhet (Tietoevry, H&M, Försvarsmakten)',
      navSkills: 'Teknisk kompetens',
      navContact: 'Kontaktformulär & Meddelanden',
      extTitle: 'Externa webbplatser & CV',
      downloadCv: 'Ladda ner officiellt CV (PDF)',
      uhrText: 'UHR.se Universitets- och högskolerådet',
      sveaText: 'Sveaskog Logistik & Karttjänster',
      rights: 'Alla rättigheter förbehållna.',
      backToTop: 'Tillbaka upp',
    },
    zh: {
      subtitle: `${profile.title} · 瑞典皇家理工学院 (KTH) 软件开发硕士。`,
      navTitle: '页面导航',
      navAbout: '关于我与背景',
      navProjects: '三大代表项目 (Sveaskog, UHR, Veni)',
      navExp: '工作履历 (Tietoevry, H&M, 瑞典国防军)',
      navSkills: '核心技术矩阵',
      navContact: '联系表单与留言板',
      extTitle: '外部官方网站与简历',
      downloadCv: '下载官方原始履历 (PDF)',
      uhrText: 'UHR.se 瑞典高等教育署官网',
      sveaText: 'Sveaskog 瑞典国家林业物流官网',
      rights: '保留所有权利。',
      backToTop: '返回顶部',
    },
  }[lang];

  const location =
    lang === 'sv' ? profile.svLocation : lang === 'zh' ? profile.location : profile.enLocation;

  return (
    <footer
      aria-labelledby="footer-heading"
      className="py-12 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="footer-heading" className="sr-only">
          {t.navTitle}
        </h2>

        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-100 dark:border-slate-800/80">
          {/* Column 1: Candidate Identity & Contact Details */}
          <div className="md:col-span-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {profile.name}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-sm">
              {t.subtitle}
            </p>
            <address className="not-italic mt-3 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300 shrink-0" aria-hidden="true" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300 shrink-0" aria-hidden="true" />
                <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="font-mono hover:text-slate-900 dark:hover:text-white">
                  {profile.phone}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300 shrink-0" aria-hidden="true" />
                <a href={`mailto:${profile.email}`} className="font-mono hover:text-slate-900 dark:hover:text-white">
                  {profile.email}
                </a>
              </div>
            </address>
          </div>

          {/* Column 2: Navigation Links */}
          <nav aria-label={t.navTitle} className="md:col-span-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-3">
              {t.navTitle}
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 list-none p-0 m-0">
              <li>
                <a href="#about" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  {t.navAbout}
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  {t.navProjects}
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  {t.navExp}
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  {t.navSkills}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  {t.navContact}
                </a>
              </li>
            </ul>
          </nav>

          {/* Column 3: External Links & Official CV Download */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-3">
              {t.extTitle}
            </h3>
            <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <a
                href="/assets/aistudio/Fang_Stalmarck_EN_ee70276b.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white hover:underline"
              >
                <FileDown className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.downloadCv}</span>
              </a>

              <a
                href="https://www.uhr.se"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <span>{t.uhrText}</span>
                <ExternalLink className="w-3 h-3 text-slate-600 dark:text-slate-300" aria-hidden="true" />
              </a>

              <a
                href="https://www.sveaskog.se"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <span>{t.sveaText}</span>
                <ExternalLink className="w-3 h-3 text-slate-600 dark:text-slate-300" aria-hidden="true" />
              </a>

              <div className="flex items-center gap-4 pt-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
                >
                  <Github className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
                >
                  <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
          <p>
            © {new Date().getFullYear()} {profile.name}. {t.rights} {location}.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 p-1.5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={t.backToTop}
            aria-label={t.backToTop}
          >
            <span>{t.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};
