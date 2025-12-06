'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import PortfolioNav from './PortfolioNav';
import { useScrollDelegation } from '@/app/hooks/useScrollDelegation';
import { useScrollTransition } from '@/app/hooks/useScrollTransition';

interface Section {
  id: string;
  label: string;
}

interface PortfolioPageContentProps {
  sections: Section[];
  children: ReactNode;
}

const PortfolioPageContent: React.FC<PortfolioPageContentProps> = ({ sections, children }) => {
  const [activeSection, setActiveSection] = useState<string>('summary');
  const scrollProgress = useScrollTransition('.portfolio-scroll-container');

  useScrollDelegation('.portfolio-scroll-container');

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const scrollContainer = e.target as HTMLElement;
      const scrollPosition = scrollContainer.scrollTop + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    const scrollContainer = document.querySelector('.portfolio-scroll-container');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [sections]);

  const handleSectionChange = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full h-full overflow-hidden bg-transparent">
      <div className="hidden sm:flex sm:flex-row w-full h-full">
        <PortfolioNav sections={sections} activeSection={activeSection} onSectionChange={handleSectionChange} scrollProgress={scrollProgress} />

        <div className="portfolio-scroll-container flex-1 overflow-y-auto overflow-x-hidden">
          <div className="px-8 md:px-12 py-8 max-w-4xl">
            {children}
          </div>
        </div>
      </div>

      <div className="sm:hidden flex flex-col w-full h-full overflow-hidden">
        <div className="flex-shrink-0">
          <PortfolioNav sections={sections} activeSection={activeSection} onSectionChange={handleSectionChange} scrollProgress={scrollProgress} />
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
