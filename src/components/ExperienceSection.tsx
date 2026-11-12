import React from 'react';
import { WorkExperience, EducationItem, Language } from '../types/resume';
import { MapPin, Calendar, Building2, GraduationCap, Award } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: WorkExperience[];
  education: EducationItem[];
  lang: Language;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  education,
  lang,
}) => {
  const t = {
    en: {
      kicker: '02. CAREER HISTORY & CLIENT IMPACT',
      heading: 'Professional Working Experience',
      subtitle:
        'Over 15 years delivering enterprise cloud infrastructure, high-traffic portals, and software engineering for prominent Swedish institutions.',
      achievementsLabel: 'Key Engineering Deliveries:',
      techStackLabel: 'Technology Stack:',
      eduKicker: 'ACADEMIC BACKGROUND & DEGREES',
      eduHeading: 'Higher Education & University Credentials',
    },
    sv: {
      kicker: '02. ARBETSLIVSERFARENHET & KUNDUPPDRAG',
      heading: 'Yrkeserfarenhet & genomförda uppdrag',
      subtitle:
        'Över 15 års erfarenhet av molninfrastruktur, samhällsbärande webbportaler och mjukvaruutveckling för ledande svenska verksamheter.',
      achievementsLabel: 'Huvudsakliga leveranser & ansvarsområden:',
      techStackLabel: 'Använd teknik:',
      eduKicker: 'UTBILDNING & AKADEMISK BAKGRUND',
      eduHeading: 'Högre utbildning & akademiska meriter',
    },
    zh: {
      kicker: '02. 职业履历与核心工程产出',
      heading: '工作经验与重大项目交付',
      subtitle:
        '深耕瑞典重点企业与公共事业单位 15 年，主导云原生基础设施、高并发招生系统与企业级数字化平台研发。',
      achievementsLabel: '核心工程交付与职责：',
      techStackLabel: '核心技术栈：',
      eduKicker: '高等教育与学术背景',
      eduHeading: '学位学历与重点认证',
    },
  }[lang];

  return (
    <section id="experience" className="py-16 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading: Level 2 Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              {t.kicker}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.heading}
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
            {t.subtitle}
          </p>
        </div>

        {/* Timeline of Work Experiences */}
        <div className="space-y-10">
          {experiences.map((exp, index) => {
            const role = lang === 'sv' ? exp.svRole : lang === 'zh' ? exp.role : exp.enRole;
            const company = lang === 'sv' ? exp.svCompany : lang === 'zh' ? exp.company : exp.enCompany;
            const location = lang === 'sv' ? exp.svLocation : lang === 'zh' ? exp.location : exp.enLocation;
            const summary = lang === 'sv' ? exp.svSummary : lang === 'zh' ? exp.summary : exp.enSummary;
            const achievements = lang === 'sv' ? exp.svAchievements : lang === 'zh' ? exp.achievements : exp.enAchievements;

            return (
              <div
                key={exp.id}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                {/* Header: Role, Company, Period */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/70">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-400">0{index + 1}.</span>
                      {/* Level 3 Heading: Role */}
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {role}
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-slate-700 dark:text-slate-300 mt-1">
                      <span className="flex items-center gap-1.5 text-slate-900 dark:text-white font-semibold">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        {company}
                      </span>
                      <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                      <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <MapPin className="w-3.5 h-3.5" />
                        {location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 px-3 py-1.5 rounded-md border border-slate-200/60 dark:border-slate-700/60 w-fit shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Role Summary */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed my-4">
                  {summary}
                </p>

                {/* Key Achievements */}
                <div className="space-y-2.5 my-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {t.achievementsLabel}
                  </div>
                  {achievements.map((ach, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="text-slate-400 dark:text-slate-500 mt-1 font-mono">▸</span>
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Clean Tech Stack */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/70 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 mr-1">
                    {t.techStackLabel}
                  </span>
                  {exp.techStack.map((tech, i) => (
                    <React.Fragment key={tech}>
                      <span className="font-mono text-slate-700 dark:text-slate-300">{tech}</span>
                      {i < exp.techStack.length - 1 && (
                        <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Education Subsection */}
        <div className="mt-14 pt-10 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="mb-6">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              {t.eduKicker}
            </div>
            {/* Level 3 Heading: Education Header */}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {t.eduHeading}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, idx) => {
              const degree = lang === 'sv' && edu.svDegree ? edu.svDegree : lang === 'zh' ? edu.degree : edu.enDegree;
              const institution = lang === 'sv' && edu.svInstitution ? edu.svInstitution : lang === 'zh' ? edu.institution : edu.enInstitution;
              const major = lang === 'sv' && edu.svMajor ? edu.svMajor : lang === 'zh' ? edu.major : edu.enMajor;
              const honors = lang === 'sv' && edu.svHonors ? edu.svHonors : lang === 'zh' ? edu.honors : edu.enHonors;

              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-slate-700 dark:text-slate-300 shrink-0" />
                      <div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {institution}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                          {degree} · {major}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums">
                      {edu.period}
                    </span>
                  </div>

                  {honors && (
                    <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <Award className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>{honors}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
