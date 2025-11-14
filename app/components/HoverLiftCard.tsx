'use client';

import React, { ReactNode } from 'react';
import { useHoverAnimation } from '@/app/lib/animations/hooks';

interface HoverLiftCardProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  shadowColor?: string;
  yOffset?: number;
}

const HoverLiftCard: React.FC<HoverLiftCardProps> = ({
  children,
  className = '',
  scale = 1.05,
  shadowColor = 'rgba(62, 155, 79, 0.4)',
  yOffset = -8,
}) => {
  const ref = useHoverAnimation({
    scale,
    duration: 0.3,
    shadowColor,
    yOffset,
  });

  return (
    <div
      ref={ref}
      className={`cursor-pointer transition-all ${className}`}
      style={{ willChange: 'transform, box-shadow' }}
    >
      {children}
    </div>
  );
};

export default HoverLiftCard;
