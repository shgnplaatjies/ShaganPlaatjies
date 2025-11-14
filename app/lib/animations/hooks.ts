import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type ScrollRevealOptions = {
  duration?: number;
  delay?: number;
  stagger?: number;
  y?: number;
  opacity?: number;
  trigger?: string;
};

type TextAnimationOptions = {
  duration?: number;
  stagger?: number;
  delay?: number;
};

type CounterAnimationOptions = {
  duration?: number;
  prefix?: string;
  suffix?: string;
};

type HoverAnimationOptions = {
  scale?: number;
  duration?: number;
  shadowColor?: string;
  yOffset?: number;
};

const mergeScrollRevealDefaults = (options?: ScrollRevealOptions) => ({
  duration: 0.8,
  delay: 0,
  stagger: 0.1,
  y: 40,
  opacity: 0,
  ...options,
});

const mergeTextAnimationDefaults = (options?: TextAnimationOptions) => ({
  duration: 0.5,
  stagger: 0.05,
  delay: 0,
  ...options,
});

const mergeCounterDefaults = (options?: CounterAnimationOptions) => ({
  duration: 2,
  prefix: '',
  suffix: '',
  ...options,
});

const mergeHoverDefaults = (options?: HoverAnimationOptions) => ({
  scale: 1.05,
  duration: 0.3,
  shadowColor: 'rgba(0, 255, 200, 0.3)',
  yOffset: -5,
  ...options,
});

const killAllScrollTriggers = () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());

const createCharacterSpans = (textContent: string, container: HTMLElement) => {
  container.textContent = '';
  textContent.split('').forEach(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    container.appendChild(span);
  });
};

const attachScrollReveal = (
  element: HTMLElement,
  defaults: ReturnType<typeof mergeScrollRevealDefaults>,
  triggerElement?: string | HTMLElement
) => {
  gsap.from(element.children, {
    scrollTrigger: {
      trigger: triggerElement || element,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    duration: defaults.duration,
    delay: defaults.delay,
    stagger: defaults.stagger,
    y: defaults.y,
    opacity: defaults.opacity,
    ease: 'power3.out',
  });
};

const attachParallaxScroll = (element: HTMLElement, speed: number) => {
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      onUpdate: (self) => {
        const y = self.getVelocity() * -0.05 * speed;
        gsap.to(element, { y, overwrite: 'auto', duration: 0.5 });
      },
    },
  });
};

const attachTextAnimation = (
  element: HTMLElement,
  defaults: ReturnType<typeof mergeTextAnimationDefaults>
) => {
  gsap.from(element.querySelectorAll('span'), {
    duration: defaults.duration,
    stagger: defaults.stagger,
    delay: defaults.delay,
    opacity: 0,
    y: 20,
    ease: 'power2.out',
  });
};

const attachCounterAnimation = (
  element: HTMLElement,
  target: number,
  defaults: ReturnType<typeof mergeCounterDefaults>
) => {
  const counter = { value: 0 };
  gsap.to(counter, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    value: target,
    duration: defaults.duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = `${defaults.prefix}${Math.floor(counter.value)}${defaults.suffix}`;
    },
  });
};

const attachPinAnimation = (element: HTMLElement, duration: number) => {
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      pin: true,
      scrub: 0.5,
      end: `+=${duration}%`,
    },
  });
};

const attachHoverListeners = (
  element: HTMLElement,
  defaults: ReturnType<typeof mergeHoverDefaults>
) => {
  const onMouseEnter = () => {
    gsap.to(element, {
      scale: defaults.scale,
      y: defaults.yOffset,
      boxShadow: `0 20px 40px ${defaults.shadowColor}`,
      duration: defaults.duration,
      ease: 'power2.out',
    });
  };

  const onMouseLeave = () => {
    gsap.to(element, {
      scale: 1,
      y: 0,
      boxShadow: '0 0px 0px transparent',
      duration: defaults.duration,
      ease: 'power2.out',
    });
  };

  element.addEventListener('mouseenter', onMouseEnter);
  element.addEventListener('mouseleave', onMouseLeave);

  return () => {
    element.removeEventListener('mouseenter', onMouseEnter);
    element.removeEventListener('mouseleave', onMouseLeave);
  };
};

export const useScrollReveal = <T extends HTMLElement = HTMLDivElement>(options?: ScrollRevealOptions) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const defaults = mergeScrollRevealDefaults(options);
    attachScrollReveal(ref.current, defaults, options?.trigger);

    return () => killAllScrollTriggers();
  }, [options]);

  return ref;
};

export const useParallax = <T extends HTMLElement = HTMLDivElement>(speed: number = 0.5) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    attachParallaxScroll(ref.current, speed);

    return () => killAllScrollTriggers();
  }, [speed]);

  return ref;
};

export const useSplitTextAnimation = <T extends HTMLElement = HTMLDivElement>(options?: TextAnimationOptions) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const defaults = mergeTextAnimationDefaults(options);
    const textContent = ref.current.textContent || '';

    createCharacterSpans(textContent, ref.current);
    attachTextAnimation(ref.current, defaults);

    return () => killAllScrollTriggers();
  }, [options]);

  return ref;
};

export const useCounterAnimation = <T extends HTMLElement = HTMLDivElement>(target: number, options?: CounterAnimationOptions) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const defaults = mergeCounterDefaults(options);
    attachCounterAnimation(ref.current, target, defaults);

    return () => killAllScrollTriggers();
  }, [target, options]);

  return ref;
};

export const usePinSection = <T extends HTMLElement = HTMLDivElement>(duration: number = 300) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    attachPinAnimation(ref.current, duration);

    return () => killAllScrollTriggers();
  }, [duration]);

  return ref;
};

export const useHoverAnimation = <T extends HTMLElement = HTMLDivElement>(options?: HoverAnimationOptions) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const defaults = mergeHoverDefaults(options);
    const cleanup = attachHoverListeners(ref.current, defaults);

    return cleanup;
  }, [options]);

  return ref;
};
