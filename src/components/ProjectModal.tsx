import React, { useEffect } from 'react';
import { ProjectItem, Language } from '../types/resume';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Layers } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  lang: Language;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, lang, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const t = {
    en: {
      overview: 'PROJECT OVERVIEW & SCOPE',
      quantified: 'QUANTIFIED PERFORMANCE & METRICS',
      architecture: 'SYSTEM ARCHITECTURE DESIGN',
      highlights: 'KEY ENGINEERING HIGHLIGHTS',
      challenges: 'TECHNICAL CHALLENGES OVERCOME',
      techStack: 'TECHNOLOGY STACK USED',
      sourceCode: 'Source Code',
      demoLink: 'Live Interactive Demo',
      rolePrefix: 'Role: ',
    },
    sv: {
      overview: 'PROJEKTÖVERSIKT & OMFATTNING',
      quantified: 'KVANTIFIERAD PRESTANDA & NYCKELTAL',
      architecture: 'SYSTEMARKITEKTUR & DESIGN',
      highlights: 'TEKNISKA HÖJDPUNKTER & LÖSNINGAR',
      challenges: 'UTMANINGAR & PROBLEMLÖSNING',
      techStack: 'ANVÄND TEKNIKSTACK',
      sourceCode: 'Källkod',
      demoLink: 'Officiell webbplats / Demo',
      rolePrefix: 'Roll: ',
    },
    zh: {
      overview: '项目背景与架构定位',
      quantified: '核心量化表现与关键指标',
      architecture: '系统底层架构设计',
      highlights: '工程亮点与技术突破',
      challenges: '技术难点攻关与解决方案',
      techStack: '涉及技术栈',
      sourceCode: '查看开源仓库',
      demoLink: '查看在线原型 / 演示',
      rolePrefix: '角色：',
    },
  }[lang];

  const title = lang === 'sv' ? project.svTitle : lang === 'zh' ? project.title : project.enTitle;
  const categoryLabel = lang === 'sv' ? project.svCategoryLabel : lang === 'zh' ? project.categoryLabel : project.enCategoryLabel;
  const role = lang === 'sv' ? project.svRole : lang === 'zh' ? project.role : project.enRole;
  const summary = lang === 'sv' ? project.svSummary : lang === 'zh' ? project.summary : project.enSummary;
  const metrics = lang === 'sv' ? project.svMetrics : lang === 'zh' ? project.metrics : project.enMetrics;
  const highlights = lang === 'sv' ? project.svHighlights : lang === 'zh' ? project.highlights : project.enHighlights;
  const challenges = lang === 'sv' ? project.svChallenges : lang === 'zh' ? project.challenges : project.enChallenges;
  const architecture = lang === 'sv' ? project.svArchitecture : lang === 'zh' ? project.architecture : project.enArchitecture;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-600 dark:text-slate-300 uppercase tracking-wider">
              {categoryLabel}
            </span>
            <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
            <span className="text-xs font-mono text-slate-600 dark:text-slate-300">{project.period}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Media Banner */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 bg-slate-100 dark:bg-slate-950 overflow-hidden border-b border-slate-200 dark:border-slate-800">
          <img
            src={project.image}
            alt={`Detailed architecture preview of ${title}`}
            width={800}
            height={450}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <div className="text-xs font-mono text-slate-200 mb-1">
              {t.rolePrefix}{role}
            </div>
            <h2 id="project-modal-title" className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              {title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Summary */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              {t.overview}
            </h3>
            <p className="text-base text-slate-800 dark:text-slate-200 leading-relaxed">
              {summary}
            </p>
          </div>

          {/* Key Metrics Strip */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-3">
              {t.quantified}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {metrics.map((metric, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-slate-700 dark:text-slate-300 shrink-0" aria-hidden="true" />
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Architecture */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-slate-700 dark:text-slate-300" aria-hidden="true" />
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300">
                {t.architecture}
              </h3>
            </div>
            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 font-mono text-xs sm:text-sm">
              {architecture}
            </p>
          </div>

          {/* Highlights & Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-3">
                {t.highlights}
              </h3>
              <ul className="space-y-2">
                {highlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                    <span aria-hidden="true" className="text-slate-600 dark:text-slate-300 font-mono mt-0.5">▸</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-3">
                <AlertCircle className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" aria-hidden="true" />
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  {t.challenges}
                </h3>
              </div>
              <ul className="space-y-2">
                {challenges.map((ch, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                    <span aria-hidden="true" className="text-slate-600 dark:text-slate-300 font-mono mt-0.5">▸</span>
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech Stack List */}
          <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              {t.techStack}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-mono">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions: Live Demo & GitHub */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                <span>{t.sourceCode}</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white transition-colors"
              >
                <span>{t.demoLink}</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
