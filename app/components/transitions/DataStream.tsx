"use client";
import React, { useEffect, useState } from "react";

interface DataStreamProps {
  items?: string[];
  direction?: "up" | "down" | "left" | "right";
  speed?: number;
  className?: string;
}

const DataStream: React.FC<DataStreamProps> = ({
  items = ["01", "10", "11", "00", "API", "React", "TypeScript", "AWS"],
  direction = "down",
  speed = 3,
  className = "",
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % 100);
    }, speed * 10);

    return () => clearInterval(interval);
  }, [speed]);

  const isVertical = direction === "up" || direction === "down";
  const isReverse = direction === "up" || direction === "left";

  const containerClasses = isVertical
    ? "flex flex-col overflow-hidden"
    : "flex flex-row overflow-hidden";

  const maskImage = isVertical
    ? `linear-gradient(${
        direction === "down" ? "to bottom" : "to top"
      }, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)`
    : `linear-gradient(${
        direction === "right" ? "to right" : "to left"
      }, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)`;

  return (
    <div
      className={`py-8 ${className}`}
      style={{
        WebkitMaskImage: maskImage,
        maskImage,
      }}
    >
      <div
        className={`${containerClasses} gap-2 transition-transform duration-100`}
        style={{
          transform: isVertical
            ? `translateY(${isReverse ? -scrollPosition : scrollPosition}%)`
            : `translateX(${isReverse ? -scrollPosition : scrollPosition}%)`,
        }}
      >
        {[...Array(3)].map((_, batchIndex) =>
          items.map((item, itemIndex) => (
            <div
              key={`${batchIndex}-${itemIndex}`}
              className={`
                px-3 py-1
                rounded
                font-mono text-xs
                bg-accent-2 bg-opacity-40
                border border-accent-6 border-opacity-20
                text-accent-9
                whitespace-nowrap
                transition-all hover:bg-opacity-60 hover:border-opacity-40
              `}
            >
              {item}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DataStream;
