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
  gridSize = 50,
  lineColor = "rgba(100, 200, 255, 0.1)",
  opacity = 0.5,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 ${className}`}
      style={{ opacity }}
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke={lineColor}
              strokeWidth="0.5"
            />
          </pattern>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <animate
              attributeName="y1"
              values="0%;100%;0%"
              dur="10s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y2"
              values="100%;0%;100%"
              dur="10s"
              repeatCount="indefinite"
            />
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.2" />
            <stop offset="50%" stopColor={lineColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#gridGradient)" opacity="0.3" />
      </svg>
    </div>
  );
};

export default AnimatedGrid;
