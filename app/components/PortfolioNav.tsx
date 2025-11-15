'use client';

import React, { useState, useEffect } from 'react';
import { MoonIcon, SunIcon, GitHubLogoIcon, LinkedInLogoIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { SOCIAL_LINKS } from '@/app/lib/constants';

interface Section {
  id: string;
  label: string;
}

interface PortfolioNavProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  scrollProgress: number;
}

const PortfolioNav: React.FC<PortfolioNavProps> = ({
  sections,
  activeSection,
  onSectionChange,
  scrollProgress,
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Read initial theme
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved) {
      setTheme(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setTheme(newTheme);
  };

  return (
    <nav className="w-1/4 flex-shrink-0 border-r border-gray-border-1 border-opacity-50 px-8 py-4 h-full overflow-hidden bg-gray-1 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-12">Shagan Plaatjies</h1>
        <p className="mt-2 text-sm text-gray-10">
          Lead Software Engineer & Technical Product Lead
        </p>
      </div>

      <ul className="space-y-1">
        {sections.map((section, index) => (
          <li key={section.id} className="relative">
            <a
              href={`#${section.id}`}
              onClick={e => {
                e.preventDefault();
                onSectionChange(section.id);
              }}
              className={`block px-4 py-2 rounded transition-all duration-200 border-l-4 pl-3 ${
                activeSection === section.id
                  ? 'text-gray-12 font-semibold border-gray-12'
                  : 'text-gray-10 hover:text-gray-12 hover:bg-gray-2 border-transparent hover:border-gray-11'
              }`}
              style={{
                borderLeftWidth: activeSection === section.id ? '16px' : '4px',
              }}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-12 pt-6 border-t border-gray-border-1 border-opacity-50">
        <p className="text-xs text-gray-8 mb-3">LINKS</p>
        <ul className="flex gap-4 text-gray-10">
          <li>
            <a href={SOCIAL_LINKS.github} title="GitHub" className="hover:text-gray-12 transition-all duration-200 hover:scale-110">
              <GitHubLogoIcon width="16" height="16" />
            </a>
          </li>
          <li>
            <a href={SOCIAL_LINKS.linkedin} title="LinkedIn" className="hover:text-gray-12 transition-all duration-200 hover:scale-110">
              <LinkedInLogoIcon width="16" height="16" />
            </a>
          </li>
          <li>
            <a href={SOCIAL_LINKS.email} title="Email" className="hover:text-gray-12 transition-all duration-200 hover:scale-110">
              <EnvelopeClosedIcon width="16" height="16" />
            </a>
          </li>
        </ul>
      </div>

      <div className="mt-12 pt-6 border-t border-gray-border-1 border-opacity-50">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 text-sm text-gray-10 hover:text-gray-12 transition-all duration-200 hover:scale-105"
          aria-label="Toggle theme"
        >
          {mounted && theme === 'dark' ? (
            <>
              <SunIcon width="16" height="16" />
              <span>Light</span>
            </>
          ) : (
            <>
              <MoonIcon width="16" height="16" />
              <span>Dark</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
};

export default PortfolioNav;
