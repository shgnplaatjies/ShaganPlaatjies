"use client";

import React from "react";

interface AnimatedGridProps {
  className?: string;
  gridSize?: number;
  lineColor?: string;
  opacity?: number;
}

const AnimatedGrid: React.FC<AnimatedGridProps> = ({
  className = "",
  gridSize = 40,
  lineColor = "var(--gray-10)",
  opacity = 0.5,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 ${className}`}
      style={{ opacity }}
    >
      <style>{`
        @keyframes scanLines {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .grid-pattern {
          background-image:
            linear-gradient(0deg, transparent 24%, var(--gray-10) 25%, var(--gray-10) 26%, transparent 27%, transparent 74%, var(--gray-10) 75%, var(--gray-10) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, var(--gray-10) 25%, var(--gray-10) 26%, transparent 27%, transparent 74%, var(--gray-10) 75%, var(--gray-10) 76%, transparent 77%, transparent);
          background-size: ${gridSize}px ${gridSize}px;
          background-position: 0 0;
        }

        .scan-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15) 0px,
            rgba(0, 0, 0, 0.15) 2px,
            transparent 2px,
            transparent 4px
          );
          animation: scanLines 6s linear infinite;
          pointer-events: none;
        }
      `}</style>

      <div className="w-full h-full grid-pattern" />
      <div className="scan-lines" />
    </div>
  );
};

export default AnimatedGrid;
