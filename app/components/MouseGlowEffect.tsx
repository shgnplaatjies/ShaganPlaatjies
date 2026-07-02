"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

interface MouseGlowEffectProps {
  className?: string;
  glowRadius?: number;
  glowColor?: string;
}

const MouseGlowEffect: React.FC<MouseGlowEffectProps> = ({
  className = "",
  glowRadius = 200,
  glowColor = "var(--cyan-9)",
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      // Respect the user's motion preference: don't mount the
      // mousemove listener that drives the following glow effect.
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 w-full h-full pointer-events-none ${className}`}
      style={{
        background: isVisible
          ? `radial-gradient(
              circle at ${mousePosition.x}px ${mousePosition.y}px,
              color-mix(in srgb, ${glowColor} 8%, transparent) 0%,
              color-mix(in srgb, ${glowColor} 4%, transparent) ${glowRadius * 0.4}px,
              color-mix(in srgb, ${glowColor} 1%, transparent) ${glowRadius * 0.7}px,
              transparent ${glowRadius}px
            )`
          : "transparent",
        transition: "background 0.15s ease-out",
        zIndex: 1,
      }}
    />
  );
};

export default MouseGlowEffect;
