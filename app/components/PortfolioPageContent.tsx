'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import PortfolioNav from './PortfolioNav';

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

  // Track which section is in view as user scrolls
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const scrollContainer = e.target as HTMLElement;
      const scrollPosition = scrollContainer.scrollTop + 100; // Offset for better UX

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
      <div className="flex w-full h-full">
        <PortfolioNav sections={sections} activeSection={activeSection} onSectionChange={handleSectionChange} />

        <div className="portfolio-scroll-container flex-1 overflow-y-auto overflow-x-hidden">
          <div className="px-12 py-8 max-w-4xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPageContent;
