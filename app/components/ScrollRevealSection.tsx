'use client';

import React, { ReactNode } from 'react';
import { useScrollReveal } from '@/app/lib/animations/hooks';

interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  stagger?: number;
  delay?: number;
  yOffset?: number;
}

const ScrollRevealSection: React.FC<ScrollRevealSectionProps> = ({
  children,
  className = '',
  duration = 0.8,
  stagger = 0.1,
  delay = 0,
  yOffset = 40,
}) => {
  const ref = useScrollReveal({
    duration,
    stagger,
    delay,
    y: yOffset,
    opacity: 0,
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ScrollRevealSection;
