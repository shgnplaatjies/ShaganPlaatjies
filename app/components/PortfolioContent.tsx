'use client';

import React, { useState, Suspense } from 'react';
import PortfolioLayout from './PortfolioLayout';
import SummarySection from '../sections/SummarySection';

type SectionId = 'summary' | 'experience' | 'projects' | 'blog';

interface PortfolioContentProps {
  children?: React.ReactNode;
}

const PortfolioContent: React.FC<PortfolioContentProps> = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('summary');

  const sections = [
    { id: 'summary' as const, label: 'Summary' },
    { id: 'experience' as const, label: 'Experience' },
    { id: 'projects' as const, label: 'Projects' },
    { id: 'blog' as const, label: 'Blog' },
  ];

  return (
    <PortfolioLayout
      sections={sections}
      activeSection={activeSection}
      onSectionChange={(sectionId: string) => setActiveSection(sectionId as SectionId)}
    >
      {activeSection === 'summary' && <SummarySection />}
      {activeSection !== 'summary' && (
        <div className="text-gray-400 text-center py-12">
          <p>Loading...</p>
        </div>
      )}
    </PortfolioLayout>
  );
};

export default PortfolioContent;
