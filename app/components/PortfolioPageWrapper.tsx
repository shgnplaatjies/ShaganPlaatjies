'use client';

import React, { ReactNode, useEffect, useState } from 'react';

interface PortfolioPageWrapperProps {
  children: ReactNode;
}

const PortfolioPageWrapper: React.FC<PortfolioPageWrapperProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [, setThemeState] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Listen for theme changes and force re-render
    const observer = new MutationObserver(() => {
      setThemeState(prev => prev + 1);
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default PortfolioPageWrapper;
