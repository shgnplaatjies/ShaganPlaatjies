'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import PortfolioNav from './PortfolioNav';
import { useScrollDelegation } from '@/app/hooks/useScrollDelegation';

interface Section {
  id: string;
  label: string;
}

interface PortfolioPageContentProps {
  sections: Section[];
  children: ReactNode;
}

// `children` (and its section ids) render twice below - once in the desktop
// layout, once in the mobile layout, toggled by CSS display. document.getElementById
// always returns the first (desktop) match even when only the mobile copy is
// on screen, so id lookups must pick whichever copy is actually visible.
const getVisibleElementById = (id: string): HTMLElement | null => {
  const matches = document.querySelectorAll<HTMLElement>(`#${id}`);
  return Array.from(matches).find((el) => el.offsetParent !== null) ?? matches[0] ?? null;
};

const PortfolioPageContent: React.FC<PortfolioPageContentProps> = ({ sections, children }) => {
  const [activeSection, setActiveSection] = useState<string>('summary');

  useScrollDelegation('.portfolio-scroll-container');

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const scrollContainer = e.target as HTMLElement;
      const scrollPosition = scrollContainer.scrollTop + 100;

      for (const section of sections) {
        const element = getVisibleElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    const scrollContainers = document.querySelectorAll<HTMLElement>('.portfolio-scroll-container');
    scrollContainers.forEach((container) => container.addEventListener('scroll', handleScroll));
    return () => scrollContainers.forEach((container) => container.removeEventListener('scroll', handleScroll));
  }, [sections]);

  const handleSectionChange = (sectionId: string) => {
    getVisibleElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full h-full overflow-hidden bg-transparent">
      <div className="hidden sm:flex sm:flex-row w-full h-full">
        <PortfolioNav sections={sections} activeSection={activeSection} onSectionChange={handleSectionChange} />

        <div className="portfolio-scroll-container flex-1 overflow-y-auto overflow-x-hidden">
          <div className="px-8 md:px-12 py-8 max-w-4xl">
            {children}
          </div>
        </div>
      </div>

      <div className="sm:hidden flex flex-col w-full h-full overflow-hidden">
        <div className="flex-shrink-0">
          <PortfolioNav sections={sections} activeSection={activeSection} onSectionChange={handleSectionChange} />
        </div>
        <div className="flex-1 overflow-y-auto portfolio-scroll-container">
          <div className="px-4 py-6 max-w-4xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPageContent;
