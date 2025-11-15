import { useEffect, useState } from 'react';

export const useScrollTransition = (containerSelector: string) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const scrollContainer = document.querySelector(containerSelector) as HTMLElement;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const totalScroll = scrollHeight - clientHeight;
      const progress = totalScroll > 0 ? scrollTop / totalScroll : 0;
      setScrollProgress(Math.min(progress, 1));
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [containerSelector]);

  return scrollProgress;
};
