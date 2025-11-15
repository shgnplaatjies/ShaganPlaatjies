"use client";

import React, { ReactNode } from "react";

interface GlitchEffectProps {
  children: ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
}

const GlitchEffect: React.FC<GlitchEffectProps> = ({
  children,
  className = "",
  intensity = "medium",
}) => {
  const glitchKeyframes = `
    @keyframes glitch-anim {
      0% {
        clip-path: inset(40% 0 61% 0);
        transform: translate(0);
      }
      20% {
        clip-path: inset(92% 0 1% 0);
        transform: translate(-2px, 2px);
      }
      40% {
        clip-path: inset(43% 0 1% 0);
        transform: translate(2px, -2px);
      }
      60% {
        clip-path: inset(25% 0 58% 0);
        transform: translate(-2px, 2px);
      }
      80% {
        clip-path: inset(54% 0 7% 0);
        transform: translate(2px, -2px);
      }
      100% {
        clip-path: inset(58% 0 43% 0);
        transform: translate(0);
      }
    }

    @keyframes glitch-anim-2 {
      0% {
        clip-path: inset(65% 0 31% 0);
        transform: translate(0);
      }
      20% {
        clip-path: inset(12% 0 23% 0);
        transform: translate(2px, -2px);
      }
      40% {
        clip-path: inset(48% 0 20% 0);
        transform: translate(-2px, 2px);
      }
      60% {
        clip-path: inset(80% 0 15% 0);
        transform: translate(2px, -2px);
      }
      80% {
        clip-path: inset(32% 0 58% 0);
        transform: translate(-2px, 2px);
      }
      100% {
        clip-path: inset(20% 0 45% 0);
        transform: translate(0);
      }
    }
  `;

  const getDuration = () => {
    switch (intensity) {
      case "low":
        return "650ms";
      case "high":
        return "350ms";
      default:
        return "500ms";
    }
  };

  return (
    <>
      <style>{glitchKeyframes}</style>
      <div className={`glitch-container group relative inline-block ${className}`}>
        <div className="glitch-content">{children}</div>
        <div
          className="glitch-layer absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            animation: `glitch-anim ${getDuration()} infinite`,
            color: "var(--cyan-9)",
            textShadow: "-2px 0 var(--magenta-9)",
          }}
          aria-hidden="true"
        >
          {children}
        </div>
        <div
          className="glitch-layer absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            animation: `glitch-anim-2 ${getDuration()} infinite`,
            color: "var(--magenta-9)",
            textShadow: "2px 0 var(--cyan-9)",
          }}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default GlitchEffect;
