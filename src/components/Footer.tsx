import React from 'react';
import { CandidateProfile } from '../types/resume';
import { Mail, Phone, MapPin, Github, Linkedin, ArrowUp, ExternalLink, FileDown } from 'lucide-react';

interface FooterProps {
  profile: CandidateProfile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      aria-label="Site Footer"
      className="py-12 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-100 dark:border-slate-800/80">
          {/* Column 1: Candidate Identity & Stockholm Details */}
          <div className="md:col-span-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {profile.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
              {profile.title} · M.Sc. in Software Development from KTH Royal Institute of Technology.
            </p>
            <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono">{profile.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono">{profile.email}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 list-none p-0 m-0">
              <li>
                <a href="#about" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  About & Background
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Three Projects (Sveaskog, UHR, Veni)
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Work Experience (Tietoevry, H&M, Försvarsmakten)
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Technical Competencies
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Contact Form & Message Board
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: External Links & Official CV Download */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              External Portals & Resume
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <a
                href="/assets/aistudio/Fang_Stalmarck_EN_ee70276b.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white hover:underline"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Download Official CV (PDF)</span>
              </a>

              <a
                href="https://www.uhr.se"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <span>UHR.se Swedish Higher Education Portals</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href="https://www.sveaskog.se"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <span>Sveaskog Logistics & Map Services</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <div className="flex items-center gap-4 pt-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-500">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved. Sandhamnsgatan 13, Stockholm.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Back to Top"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
