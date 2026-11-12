import React, { useState, useEffect } from 'react';
import {
  initialProfile,
  initialSkills,
  initialExperiences,
  initialProjects,
  initialMessages,
} from './data/resumeData';
import { CandidateProfile, ProjectItem, RecruiterMessage, Language } from './types/resume';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Sidebar } from './components/Sidebar';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { MessageBoardSection } from './components/MessageBoardSection';
import { PrintResumeModal } from './components/PrintResumeModal';
import { ProfileEditModal } from './components/ProfileEditModal';
import { WechatModal } from './components/WechatModal';
import { Chatbot } from './components/Chatbot';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

export default function App() {
  // Trilingual Language State (English, Swedish, Chinese)
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('resume_language_v3');
    if (saved === 'en' || saved === 'sv' || saved === 'zh') return saved;
    return 'en';
  });

  // Dark Mode State
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('resume_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Candidate Profile State with localStorage persistence
  const [profile, setProfile] = useState<CandidateProfile>(() => {
    try {
      const saved = localStorage.getItem('candidate_profile_v4');
      if (saved) return JSON.parse(saved);
      // Migration: check older stored profile and normalize phone format
      const savedV3 = localStorage.getItem('candidate_profile_v3');
      if (savedV3) {
        const parsed = JSON.parse(savedV3);
        parsed.phone = '+46 76 18 48 301';
        localStorage.setItem('candidate_profile_v4', JSON.stringify(parsed));
        return parsed;
      }
    } catch (e) {
      console.error('Error loading saved profile', e);
    }
    return initialProfile;
  });

  // Recruiter Messages with localStorage persistence
  const [messages, setMessages] = useState<RecruiterMessage[]>(() => {
    try {
      const saved = localStorage.getItem('recruiter_messages_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading saved messages', e);
    }
    return initialMessages;
  });

  // Modals & UI State
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [isWechatModalOpen, setIsWechatModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync Dark Mode to <html> element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('resume_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('resume_theme', 'light');
    }
  }, [isDark]);

  // Persist Language Choice
  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('resume_language_v3', newLang);
    const messages = {
      en: 'Language set to English',
      sv: 'Språk ändrat till Svenska',
      zh: '语言已切换为中文',
    };
    triggerToast(messages[newLang]);
  };

  // Toast Notification Trigger
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Message Handlers
  const handleAddMessage = (newMsgData: Omit<RecruiterMessage, 'id' | 'timestamp'>) => {
    const now = new Date();
    const formattedTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newMsg: RecruiterMessage = {
      ...newMsgData,
      id: `msg-${Date.now()}`,
      timestamp: formattedTime,
    };

    setMessages((prev) => {
      const updated = [newMsg, ...prev];
      localStorage.setItem('recruiter_messages_v3', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteMessage = (id: string) => {
    setMessages((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      localStorage.setItem('recruiter_messages_v3', JSON.stringify(updated));
      return updated;
    });
  };

  const handleReplyMessage = (id: string, replyText: string) => {
    setMessages((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, reply: replyText } : m));
      localStorage.setItem('recruiter_messages_v3', JSON.stringify(updated));
      return updated;
    });
  };

  // Profile Save & Reset Handlers
  const handleSaveProfile = (updated: CandidateProfile) => {
    setProfile(updated);
    localStorage.setItem('candidate_profile_v4', JSON.stringify(updated));
    triggerToast(lang === 'sv' ? 'Profilen har uppdaterats' : lang === 'zh' ? '个人资料已更新' : 'Profile updated successfully');
  };

  const handleResetProfile = () => {
    setProfile(initialProfile);
    localStorage.removeItem('candidate_profile_v4');
    localStorage.removeItem('candidate_profile_v3');
    triggerToast(lang === 'sv' ? 'Återställt till standardprofil' : lang === 'zh' ? '已重置为标准档案' : 'Profile reset to default credentials');
  };

  // Scroll Navigation
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Semantic Header with Navigation Menu & Trilingual Switcher */}
      <Header
        profile={profile}
        lang={lang}
        onChangeLang={handleLanguageChange}
        isDark={isDark}
        onToggleDark={() => setIsDark((prev) => !prev)}
        onOpenPrint={() => setIsPrintModalOpen(true)}
        onOpenEdit={() => setIsProfileEditOpen(true)}
        onScrollToMessage={scrollToContact}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Hero Presentation */}
      <Hero
        profile={profile}
        lang={lang}
        onScrollToMessage={scrollToContact}
        onScrollToProjects={scrollToProjects}
        onShowWechatQr={() => setIsWechatModalOpen(true)}
        onNotify={triggerToast}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Main Content Layout with semantic <main> and semantic <aside> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Semantic Main Section (Huvudsektion) */}
          <main id="main-content" className="lg:col-span-8 space-y-16">
            {/* 1. Three Featured Projects (Tre Projekt) */}
            <ProjectsSection
              projects={initialProjects}
              lang={lang}
              onSelectProject={(proj) => setSelectedProject(proj)}
            />

            {/* 2. Professional Work Experience Timeline */}
            <ExperienceSection
              experiences={initialExperiences}
              education={profile.education}
              lang={lang}
            />

            {/* 3. Technical Competencies */}
            <SkillsSection skills={initialSkills} lang={lang} />

            {/* 4. Complete Contact Form & Message Board */}
            <MessageBoardSection
              messages={messages}
              onAddMessage={handleAddMessage}
              onDeleteMessage={handleDeleteMessage}
              onReplyMessage={handleReplyMessage}
              lang={lang}
              profile={profile}
              onShowWechatQr={() => setIsWechatModalOpen(true)}
              onNotify={triggerToast}
            />
          </main>

          {/* Semantic Sidebar (<aside>) with Candidate Info, Languages, and PDF Download */}
          <div className="lg:col-span-4 sticky top-24">
            <Sidebar
              profile={profile}
              lang={lang}
              onNotify={triggerToast}
            />
          </div>
        </div>
      </div>

      {/* Semantic Footer (Sidfot) with Contact Details */}
      <Footer profile={profile} />

      {/* Project Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        lang={lang}
        onClose={() => setSelectedProject(null)}
      />

      {/* Print & PDF Resume Modal */}
      {isPrintModalOpen && (
        <PrintResumeModal
          profile={profile}
          experiences={initialExperiences}
          education={profile.education}
          skills={initialSkills}
          lang={lang}
          onClose={() => setIsPrintModalOpen(false)}
        />
      )}

      {/* Profile Customize Modal */}
      {isProfileEditOpen && (
        <ProfileEditModal
          profile={profile}
          lang={lang}
          onSave={handleSaveProfile}
          onReset={handleResetProfile}
          onClose={() => setIsProfileEditOpen(false)}
        />
      )}

      {/* WeChat QR Modal */}
      {isWechatModalOpen && (
        <WechatModal
          wechatId={profile.wechat}
          lang={lang}
          onClose={() => setIsWechatModalOpen(false)}
          onNotify={triggerToast}
        />
      )}

      {/* AI Career & Recruitment Assistant Chatbot (Gemini Powered) */}
      <Chatbot
        profile={profile}
        lang={lang}
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen((prev) => !prev)}
        onScrollToMessage={scrollToContact}
        onNotify={triggerToast}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
