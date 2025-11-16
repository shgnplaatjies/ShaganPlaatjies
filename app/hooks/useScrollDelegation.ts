import { useEffect } from 'react';

export const useScrollDelegation = (containerSelector: string) => {
  useEffect(() => {
    const scrollContainer = document.querySelector(containerSelector) as HTMLElement;
    if (!scrollContainer) return;

    const handleWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest(containerSelector)) {
        return;
      }

      event.preventDefault();
      scrollContainer.scrollTop += event.deltaY;
    };

    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [containerSelector]);
};
