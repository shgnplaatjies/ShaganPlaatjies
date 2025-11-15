"use client";

import React, { useEffect, useState } from "react";

interface AnimatedGridProps {
  className?: string;
  gridSize?: number;
  lineColor?: string;
  opacity?: number;
}

const AnimatedGrid: React.FC<AnimatedGridProps> = ({
  className = "",
  gridSize = 40,
  lineColor = "#0EA5E9",
  opacity = 0.5,
}) => {
  const [scanLineColor, setScanLineColor] = useState("rgba(14, 165, 233, 0.3)");

  useEffect(() => {
    const updateColor = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const accentColor = isDark ? "rgba(14, 165, 233, 0.3)" : "rgba(30, 144, 255, 0.3)";
      setScanLineColor(accentColor);
    };

    updateColor();

    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

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
          animation: scanLines 8s linear infinite;
          pointer-events: none;
          z-index: 1;
        }
      `}</style>

      <div
        className="scan-lines"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            ${scanLineColor} 0px,
            ${scanLineColor} 4px,
            transparent 4px,
            transparent 8px
          )`,
        }}
      />
    </div>
  );
};

export default AnimatedGrid;
