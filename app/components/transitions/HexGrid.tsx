"use client";
import React, { useEffect, useState } from "react";

interface HexGridProps {
  rows?: number;
  cols?: number;
  className?: string;
  onHexClick?: (row: number, col: number) => void;
}

const HexGrid: React.FC<HexGridProps> = ({
  rows = 3,
  cols = 12,
  className = "",
  onHexClick,
}) => {
  const [activeHexes, setActiveHexes] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Random activation of hexes
    const hexActivationInterval = setInterval(() => {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);
      const hexKey = `${randomRow}-${randomCol}`;

      setActiveHexes((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(hexKey)) {
          newSet.delete(hexKey);
        } else {
          newSet.add(hexKey);
        }
        return newSet;
      });
    }, 300);

    return () => clearInterval(hexActivationInterval);
  }, [rows, cols]);

  const hexSize = 20;
  const hexHeight = hexSize * Math.sqrt(3);
  const hexWidth = hexSize * 2;

  return (
    <div className={`py-8 flex justify-center overflow-x-auto ${className}`}>
      <div className="flex gap-1 p-4">
        {Array.from({ length: rows }).map((_, rowIndex) =>
          Array.from({ length: cols }).map((_, colIndex) => {
            const hexKey = `${rowIndex}-${colIndex}`;
            const isActive = activeHexes.has(hexKey);

            return (
              <button
                key={hexKey}
                onClick={() => {
                  onHexClick?.(rowIndex, colIndex);
                  const newSet = new Set(activeHexes);
                  if (newSet.has(hexKey)) {
                    newSet.delete(hexKey);
                  } else {
                    newSet.add(hexKey);
                  }
                  setActiveHexes(newSet);
                }}
                className={`
                  relative rounded
                  w-10 h-10
                  flex items-center justify-center
                  transition-all duration-300
                  cursor-pointer
                  border
                  ${
                    isActive
                      ? "bg-accent-9 border-accent-9 shadow-lg shadow-accent-9/50"
                      : "bg-gray-3 border-gray-5 hover:border-gray-6"
                  }
                `}
                aria-label={`Grid cell ${rowIndex}-${colIndex}`}
              >
                <div
                  className={`
                    w-1.5 h-1.5 rounded-full
                    transition-all
                    ${isActive ? "bg-gray-1" : "bg-accent-9 opacity-40"}
                  `}
                />
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HexGrid;
