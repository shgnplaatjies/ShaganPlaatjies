'use client';

import React, { ReactNode } from 'react';
import { useParallax } from '@/app/lib/animations/hooks';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = '',
  speed = 0.5,
}) => {
  const ref = useParallax(speed);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ParallaxSection;
