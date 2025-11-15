"use client";

import React from "react";

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
        @keyframes scanLines {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .scan-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            rgba(59, 130, 246, 0) 0px,
            rgba(59, 130, 246, 0.3) 4px,
            transparent 4px,
            transparent 8px
          );
          animation: scanLines 8s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        @media (prefers-color-scheme: light) {
          .scan-lines {
            background: repeating-linear-gradient(
              0deg,
              rgba(37, 99, 235, 0) 0px,
              rgba(37, 99, 235, 0.3) 4px,
              transparent 4px,
              transparent 8px
            );
          }
        }
      `}</style>

      <div className="scan-lines" />
    </div>
  );
};

export default AnimatedGrid;
