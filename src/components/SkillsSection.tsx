import React, { useState } from 'react';
import { SkillCategory, Language } from '../types/resume';
import { Layers, Cpu, BrainCircuit, CheckCircle2 } from 'lucide-react';

interface SkillsSectionProps {
  skills: SkillCategory[];
  lang: Language;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, lang }) => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const t = {
    en: {
      kicker: '03. TECHNICAL CAPABILITIES & TOOLSET',
      heading: 'Core Technical Competencies',
      subtitle:
        'Battle-tested engineering skills spanning Azure Cloud DevOps, enterprise C# / EPiServer CMS web development, and 2026 NVIDIA-certified Generative AI architectures.',
      levelLabel: 'Proficiency Level',
      coreTag: '[Core]',
      philosophyLabel: 'Engineering Philosophy: ',
      philosophyText:
        'Strict architectural discipline, cloud-first infrastructure automation, high availability, zero-regression CI/CD pipelines, and practical enterprise LLM application.',
    },
    sv: {
      kicker: '03. TEKNISK KOMPETENS & VERKTYGSLÅDA',
      heading: 'Huvudsaklig teknisk kompetens',
      subtitle:
        'Beprövad ingenjörskompetens inom Azure Cloud DevOps, systemutveckling i C# .NET, EPiServer CMS och NVIDIA-certifierad Generativ AI (2026).',
      levelLabel: 'Kompetensnivå',
      coreTag: '[Kärna]',
      philosophyLabel: 'Ingenjörsfilosofi: ',
      philosophyText:
        'God arkitekturpraxis, automatiserad molninfrastruktur, hög driftsäkerhet, robusta CI/CD-pipelines och strukturerat införande av generativ AI.',
    },
    zh: {
      kicker: '03. 专业技能矩阵与技术栈',
      heading: '核心技术能力与工具体系',
      subtitle:
        '经数千万并发与北欧大型政企系统检验的工程技术栈，涵盖微软 Azure 云原生、DevOps 流水线、C# / EPiServer 体系及 2026 年 NVIDIA 生成式大模型认证。',
      levelLabel: '熟练度评估',
      coreTag: '[核心]',
      philosophyLabel: '工程理念：',
      philosophyText:
        '严谨的架构规范、云原生优先的自动化基础设施、零故障的高可用设计，以及生产就绪的大模型智能体落地能力。',
    },
  }[lang];

  const getCategoryIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Layers className="w-4 h-4 text-slate-700 dark:text-slate-300" aria-hidden="true" />;
      case 1:
        return <Cpu className="w-4 h-4 text-slate-700 dark:text-slate-300" aria-hidden="true" />;
      default:
        return <BrainCircuit className="w-4 h-4 text-slate-700 dark:text-slate-300" aria-hidden="true" />;
    }
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
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
              id="skills-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              {t.heading}
            </h2>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 max-w-md">
            {t.subtitle}
          </p>
        </div>

        {/* Category Tabs */}
        <div
          role="tablist"
          aria-label={t.heading}
          className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-xl mb-8 border border-slate-200/60 dark:border-slate-800/60"
        >
          {skills.map((cat, idx) => {
            const catName = lang === 'sv' ? cat.svCategory : lang === 'zh' ? cat.category : cat.enCategory;
            const isSelected = activeCategory === idx;
            return (
              <button
                type="button"
                role="tab"
                id={`skill-tab-${idx}`}
                aria-selected={isSelected}
                aria-controls="skills-tabpanel"
                key={idx}
                onClick={() => setActiveCategory(idx)}
                className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {getCategoryIcon(idx)}
                <span>{catName}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div
          id="skills-tabpanel"
          role="tabpanel"
          aria-labelledby={`skill-tab-${activeCategory}`}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
        >
          {skills[activeCategory].items.map((item, i) => {
            const expLabel = lang === 'sv' && item.svExperience ? item.svExperience : lang === 'zh' ? item.experience : item.enExperience || item.experience;
            return (
              <div
                key={i}
                className="p-5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    {/* Level 3 Heading: Skill Item Name */}
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                      {item.name}
                    </h3>
                    {item.featured && (
                      <span className="text-[11px] font-mono text-slate-600 dark:text-slate-300">
                        {t.coreTag}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-mono text-slate-600 dark:text-slate-300 tabular-nums">
                    {expLabel}
                  </div>
                </div>

                {/* Progress Bar */}
                <div
                  role="progressbar"
                  aria-valuenow={item.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${item.name}: ${item.level}%`}
                  className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden"
                >
                  <div
                    className="bg-slate-800 dark:bg-slate-200 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.level}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300 mt-2">
                  <span>{t.levelLabel}</span>
                  <span className="font-mono tabular-nums">{item.level}%</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Engineering Philosophy Highlights */}
        <div className="mt-8 p-5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-slate-700 dark:text-slate-300 shrink-0" aria-hidden="true" />
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white">
                {t.philosophyLabel}
              </span>
              {t.philosophyText}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
