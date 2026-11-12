export type Language = 'en' | 'sv' | 'zh';

export interface CandidateProfile {
  name: string;
  enName: string;
  svName?: string;
  title: string;
  enTitle: string;
  svTitle: string;
  tagline: string;
  enTagline: string;
  svTagline: string;
  bio: string;
  enBio: string;
  svBio: string;
  avatarUrl: string;
  email: string;
  phone: string;
  wechat: string;
  github: string;
  linkedin: string;
  location: string;
  enLocation: string;
  svLocation: string;
  yearsExperience: number;
  education: EducationItem[];
  jobStatus: string;
  enJobStatus: string;
  svJobStatus: string;
  targetRoles: string[];
  enTargetRoles: string[];
  svTargetRoles: string[];
  metrics: {
    label: string;
    enLabel: string;
    svLabel: string;
    value: string;
    subtext: string;
    enSubtext: string;
    svSubtext: string;
  }[];
}

export interface EducationItem {
  degree: string;
  enDegree: string;
  svDegree?: string;
  institution: string;
  enInstitution: string;
  svInstitution?: string;
  period: string;
  major: string;
  enMajor: string;
  svMajor?: string;
  honors?: string;
  enHonors?: string;
  svHonors?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  enCompany: string;
  svCompany: string;
  role: string;
  enRole: string;
  svRole: string;
  period: string;
  location: string;
  enLocation: string;
  svLocation: string;
  summary: string;
  enSummary: string;
  svSummary: string;
  achievements: string[];
  enAchievements: string[];
  svAchievements: string[];
  techStack: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  enTitle: string;
  svTitle: string;
  category: 'ai' | 'cloud' | 'saas' | 'web';
  categoryLabel: string;
  enCategoryLabel: string;
  svCategoryLabel: string;
  role: string;
  enRole: string;
  svRole: string;
  period: string;
  summary: string;
  enSummary: string;
  svSummary: string;
  image: string;
  metrics: string[];
  enMetrics: string[];
  svMetrics: string[];
  highlights: string[];
  enHighlights: string[];
  svHighlights: string[];
  challenges: string[];
  enChallenges: string[];
  svChallenges: string[];
  architecture: string;
  enArchitecture: string;
  svArchitecture: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface SkillCategory {
  category: string;
  enCategory: string;
  svCategory: string;
  items: {
    name: string;
    level: number;
    experience: string;
    enExperience?: string;
    svExperience?: string;
    featured?: boolean;
  }[];
}

export interface RecruiterMessage {
  id: string;
  name: string;
  company: string;
  role: string;
  intent: 'job_offer' | 'interview' | 'tech_chat' | 'freelance' | 'other';
  targetPosition?: string;
  salaryBudget?: string;
  email: string;
  phoneOrWechat?: string;
  content: string;
  isUrgent?: boolean;
  isVerified?: boolean;
  timestamp: string;
  reply?: string;
}
