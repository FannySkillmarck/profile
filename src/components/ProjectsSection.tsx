import React, { useState } from 'react';
import { ProjectItem, Language } from '../types/resume';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  lang: Language;
  onSelectProject: (proj: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  lang,
  onSelectProject,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const t = {
    en: {
      kicker: '01. THREE FEATURED CASE STUDIES & DELIVERIES',
      heading: 'Featured Engineering Projects (Tre Projekt)',
      subtitle:
        'Production-grade systems delivered for Swedish and Nordic enterprises, from nationwide forestry logistics to national university portals and connected workspace IoT apps.',
      all: 'All 3 Projects',
      cloud: 'Cloud & GIS Mapping',
      web: 'Public Sector & CMS',
      saas: 'Enterprise & Mobile',
      visit: 'Visit',
      details: 'Details',
      rolePrefix: 'Role: ',
    },
    sv: {
      kicker: '01. TRE UTVALDA PROJEKT & LEVERANSER',
      heading: 'Utvalda projekt & leveranser (Tre Projekt)',
      subtitle:
        'Produktionssystem levererade för svenska och nordiska verksamheter, från rikstäckande skogslogistik hos Sveaskog till nationella universitetsportaler för UHR och smarta kontor hos Veni.',
      all: 'Alla 3 projekt',
      cloud: 'Moln & GIS Kartor',
      web: 'Offentlig sektor & CMS',
      saas: 'SaaS & Appar',
      visit: 'Besök',
      details: 'Detaljer',
      rolePrefix: 'Roll: ',
    },
    zh: {
      kicker: '01. 三项核心代表性交付成果',
      heading: '核心代表作与工程项目 (Tre Projekt)',
      subtitle:
        '为瑞典及北欧企业与政府机构交付的核心系统，涵盖全国林业物流与 GIS 地图系统、瑞典高校招生与高等教育全国门户以及智能办公 IoT 平台。',
      all: '全部 3 个项目',
      cloud: '云原生与 GIS 地图',
      web: '公共事业与 CMS',
      saas: '企业 SaaS 与移动端',
      visit: '官方访问',
      details: '架构详情',
      rolePrefix: '角色：',
    },
  }[lang];

  const filterOptions = [
    { key: 'all', label: t.all },
    { key: 'cloud', label: t.cloud },
    { key: 'web', label: t.web },
    { key: 'saas', label: t.saas },
  ];

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-16 border-b border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading: Level 2 Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              {t.kicker}
            </div>
            <h2
              id="projects-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              {t.heading}
            </h2>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 max-w-md">
            {t.subtitle}
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div
          role="group"
          aria-label={t.heading}
          className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl mb-10 w-fit border border-slate-200/60 dark:border-slate-800/60"
        >
          {filterOptions.map((opt) => (
            <button
              type="button"
              key={opt.key}
              aria-pressed={filter === opt.key}
              onClick={() => setFilter(opt.key)}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                filter === opt.key
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* 3 Projects Grid - Responsive across Mobile, Tablet, and Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            const title = lang === 'sv' ? project.svTitle : lang === 'zh' ? project.title : project.enTitle;
            const categoryLabel = lang === 'sv' ? project.svCategoryLabel : lang === 'zh' ? project.categoryLabel : project.enCategoryLabel;
            const role = lang === 'sv' ? project.svRole : lang === 'zh' ? project.role : project.enRole;
            const summary = lang === 'sv' ? project.svSummary : lang === 'zh' ? project.summary : project.enSummary;
            const metrics = lang === 'sv' ? project.svMetrics : lang === 'zh' ? project.metrics : project.enMetrics;

            return (
              <article
                key={project.id}
                className="group rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                {/* Visual Media Container with accessible overlay button */}
                <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <img
                    src={project.image}
                    alt={`Preview of ${title}`}
                    width={600}
                    height={340}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    aria-label={`${t.details}: ${title}`}
                    className="absolute inset-0 z-10 w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400"
                  >
                    <span className="sr-only">{t.details}: {title}</span>
                  </button>

                  {/* Top Category Tag */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                    <span className="text-[11px] font-mono text-white bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15">
                      0{idx + 1} · {categoryLabel}
                    </span>
                    <div
                      aria-hidden="true"
                      className="p-1.5 rounded-full bg-black/50 backdrop-blur-md text-white group-hover:bg-white group-hover:text-slate-900 transition-colors"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Bottom Overlay Title */}
                  <div className="absolute bottom-3.5 left-4 right-4 text-white pointer-events-none">
                    <div className="text-[11px] font-mono text-slate-200 mb-0.5">
                      {role}
                    </div>
                    {/* Level 3 Heading: Project Title */}
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-white leading-snug">
                      {title}
                    </h3>
                  </div>
                </div>

                {/* Content Description */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      {summary}
                    </p>

                    {/* Quantified Highlights */}
                    <div className="space-y-1.5 mb-4">
                      {metrics.map((m, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 text-xs text-slate-800 dark:text-slate-200 font-medium"
                        >
                          <Sparkles className="w-3 h-3 text-slate-600 dark:text-slate-300 shrink-0" aria-hidden="true" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack & External Link Actions */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                    <div className="truncate pr-2 font-mono text-[11px]">
                      {project.techStack.slice(0, 4).join(' · ')}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
                          aria-label={`${t.visit} ${title}`}
                          title={`Open external website: ${project.demoUrl}`}
                        >
                          <span>{t.visit}</span>
                          <ExternalLink className="w-3 h-3" aria-hidden="true" />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        aria-label={`${t.details}: ${title}`}
                        className="px-2.5 py-1 rounded bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium hover:opacity-90"
                      >
                        {t.details}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
