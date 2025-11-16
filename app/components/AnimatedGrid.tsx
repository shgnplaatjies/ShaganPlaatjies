"use client";

import React from "react";
import ScanLineEffect from "./ScanLineEffect";

interface AnimatedGridProps {
  className?: string;
  gridSize?: number;
  opacity?: number;
}

const AnimatedGrid: React.FC<AnimatedGridProps> = ({
  className = "",
  gridSize = 40,
  opacity = 0.5,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 ${className}`}
      style={{ opacity }}
    >
      <style>{`
        .background-base {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            var(--gray-6) 0%,
            color-mix(in srgb, var(--gray-7) 60%, var(--cyan-8) 40%) 100%
          );
          pointer-events: none;
          z-index: 0;
        }

        @media (prefers-color-scheme: light) {
          .background-base {
            background: linear-gradient(
              135deg,
              var(--gray-5) 0%,
              color-mix(in srgb, var(--gray-6) 50%, var(--cyan-7) 50%) 100%
            );
          }
        }
      `}</style>

      <div className="background-base" />
      <ScanLineEffect />
    </div>
  );
};

export default AnimatedGrid;
