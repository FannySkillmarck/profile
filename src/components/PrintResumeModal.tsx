import React from 'react';
import { CandidateProfile, WorkExperience, EducationItem, SkillCategory, Language } from '../types/resume';
import { X, Printer, Download } from 'lucide-react';

interface PrintResumeModalProps {
  profile: CandidateProfile;
  experiences: WorkExperience[];
  education: EducationItem[];
  skills: SkillCategory[];
  lang: Language;
  onClose: () => void;
}

export const PrintResumeModal: React.FC<PrintResumeModalProps> = ({
  profile,
  experiences,
  education,
  skills,
  lang,
  onClose,
}) => {
  const t = {
    en: {
      barTitle: 'Standard A4 Resume Print Preview (Save as PDF)',
      printBtn: 'Print / Save PDF',
      availHeader: 'AVAILABILITY & TARGET ROLES',
      eduHeader: 'HIGHER EDUCATION',
      expHeader: 'WORK EXPERIENCE & IMPACT',
      skillsHeader: 'TECHNICAL SKILLS',
      stackPrefix: 'Tech Stack: ',
    },
    sv: {
      barTitle: 'Standard A4 CV Utskriftsvy (Spara som PDF)',
      printBtn: 'Skriv ut / Spara som PDF',
      availHeader: 'TILLGÄNGLIGHET & ÖNSKADE ROLLER',
      eduHeader: 'HÖGRE UTBILDNING & AKADEMISKA MERITER',
      expHeader: 'ARBETSLIVSERFARENHET & LEVERANSER',
      skillsHeader: 'TEKNISK KOMPETENS',
      stackPrefix: 'Använd teknik: ',
    },
    zh: {
      barTitle: '标准 A4 简历打印预览 · 支持直接另存为 PDF',
      printBtn: '立即打印 / 保存 PDF',
      availHeader: '求职意向与到岗时间',
      eduHeader: '高等教育与学术背景',
      expHeader: '工作经历与重大项目',
      skillsHeader: '技术专长概览',
      stackPrefix: '技术栈：',
    },
  }[lang];

  const handlePrint = () => {
    window.print();
  };

  const title = lang === 'sv' ? profile.svTitle : lang === 'zh' ? profile.title : profile.enTitle;
  const tagline = lang === 'sv' ? profile.svTagline : lang === 'zh' ? profile.tagline : profile.enTagline;
  const location = lang === 'sv' ? profile.svLocation : lang === 'zh' ? profile.location : profile.enLocation;
  const jobStatus = lang === 'sv' ? profile.svJobStatus : lang === 'zh' ? profile.jobStatus : profile.enJobStatus;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white text-slate-900 rounded-2xl shadow-2xl flex flex-col">
        {/* Top Control Bar (Hidden when printing via no-print class) */}
        <div className="no-print sticky top-0 z-20 flex items-center justify-between px-6 py-3.5 bg-slate-900 text-white rounded-t-2xl">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
            <Printer className="w-4 h-4" />
            <span>{t.barTitle}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-900 bg-white rounded-lg hover:bg-slate-100 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.printBtn}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Paper Area (A4 Styled) */}
        <div className="print-page p-8 sm:p-12 font-sans bg-white text-slate-900 text-xs sm:text-sm leading-normal">
          {/* Header Block */}
          <div className="border-b-2 border-slate-900 pb-5 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {profile.name}
              </h1>
              <p className="text-base font-semibold text-slate-700 mt-1">
                {title}
              </p>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">
                {tagline}
              </p>
            </div>

            <div className="text-xs text-slate-600 font-mono space-y-1 text-left sm:text-right shrink-0">
              <div>{profile.email}</div>
              <div>{profile.phone}</div>
              <div>{location}</div>
              <div className="text-[11px] text-slate-500">{profile.github}</div>
            </div>
          </div>

          {/* Education & Status Summary */}
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                {t.availHeader}
              </div>
              <div className="font-semibold text-slate-900">
                {jobStatus}
              </div>
              <div className="text-slate-600 text-xs mt-0.5">
                Roles: {(lang === 'sv' ? profile.svTargetRoles : lang === 'zh' ? profile.targetRoles : profile.enTargetRoles).join(' / ')}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                {t.eduHeader}
              </div>
              {education.map((edu, i) => {
                const degree = lang === 'sv' && edu.svDegree ? edu.svDegree : lang === 'zh' ? edu.degree : edu.enDegree;
                const inst = lang === 'sv' && edu.svInstitution ? edu.svInstitution : lang === 'zh' ? edu.institution : edu.enInstitution;
                return (
                  <div key={i} className="text-xs text-slate-700">
                    <strong>{inst}</strong> · {degree} ({edu.period})
                  </div>
                );
              })}
            </div>
          </div>

          {/* Work Experiences */}
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1.5 mb-4">
              {t.expHeader}
            </h2>
            <div className="space-y-5">
              {experiences.map((exp) => {
                const role = lang === 'sv' ? exp.svRole : lang === 'zh' ? exp.role : exp.enRole;
                const company = lang === 'sv' ? exp.svCompany : lang === 'zh' ? exp.company : exp.enCompany;
                const loc = lang === 'sv' ? exp.svLocation : lang === 'zh' ? exp.location : exp.enLocation;
                const summary = lang === 'sv' ? exp.svSummary : lang === 'zh' ? exp.summary : exp.enSummary;
                const achievements = lang === 'sv' ? exp.svAchievements : lang === 'zh' ? exp.achievements : exp.enAchievements;

                return (
                  <div key={exp.id} className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                      <span className="font-bold text-slate-900">
                        {role} · <span className="font-semibold text-slate-700">{company}</span>
                      </span>
                      <span className="font-mono text-slate-500 text-xs tabular-nums">
                        {exp.period} · {loc}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 italic">
                      {summary}
                    </p>
                    <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-700">
                      {achievements.map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                    <div className="text-[11px] font-mono text-slate-500 pt-0.5">
                      <strong>{t.stackPrefix}</strong> {exp.techStack.join(', ')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Core Technical Skills */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1.5 mb-3">
              {t.skillsHeader}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {skills.map((cat, i) => {
                const catName = lang === 'sv' ? cat.svCategory : lang === 'zh' ? cat.category : cat.enCategory;
                return (
                  <div key={i}>
                    <div className="font-bold text-slate-800 mb-1">
                      {catName}:
                    </div>
                    <div className="text-slate-600 font-mono text-[11px] leading-relaxed">
                      {cat.items.map((it) => it.name).join(' · ')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
