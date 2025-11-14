'use client';

import React from 'react';
import { useSplitTextAnimation } from '@/app/lib/animations/hooks';

interface AnimatedTextProps {
  text: string;
  className?: string;
  duration?: number;
  stagger?: number;
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  duration = 0.5,
  stagger = 0.05,
  delay = 0,
}) => {
  const ref = useSplitTextAnimation({
    duration,
    stagger,
    delay,
  });

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
};

export default AnimatedText;
