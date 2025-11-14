'use client';

import React from 'react';
import { useScrollReveal } from '@/app/lib/animations/hooks';

interface ProjectCardWrapperProps {
  children: React.ReactNode;
  index: number;
}

const ProjectCardWrapper: React.FC<ProjectCardWrapperProps> = ({ children, index }) => {
  const ref = useScrollReveal({
    duration: 0.6,
    delay: index * 0.1,
    y: 50,
    opacity: 0,
  });

  return (
    <div ref={ref}>
      {children}
    </div>
  );
};

export default ProjectCardWrapper;
