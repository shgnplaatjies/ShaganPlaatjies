"use client";
import React, { useEffect, useState } from "react";

interface CodeGlitchProps {
  code?: string;
  language?: string;
  className?: string;
}

const CodeGlitch: React.FC<CodeGlitchProps> = ({
  code = "// building something beautiful",
  language = "ts",
  className = "",
}) => {
  const [displayCode, setDisplayCode] = useState(code);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitching(true);

      // Random corruption
      const chars = displayCode.split("");
      const randomIndex = Math.floor(Math.random() * chars.length);
      const glitchChars = ["█", "▓", "▒", "░", "◆", "◇", "@", "#", "%"];
      chars[randomIndex] = glitchChars[Math.floor(Math.random() * glitchChars.length)];

      setDisplayCode(chars.join(""));

      // Restore
      setTimeout(() => {
        setDisplayCode(code);
        setGlitching(false);
      }, 100);
    }, 4000);

    return () => clearInterval(glitchInterval);
  }, [code, displayCode]);

  return (
    <div className={`py-8 overflow-hidden ${className}`}>
      <div className={`font-mono text-sm opacity-50 mb-2`}>
        {language}
      </div>
      <div className={`
        relative p-4 rounded-lg
        bg-gradient-to-r from-accent-2 via-transparent to-transparent
        border border-accent-6 border-opacity-20
        backdrop-blur-sm
        ${glitching ? 'animate-pulse' : ''}
      `}>
        <code className="text-accent-9 whitespace-pre-wrap break-words">
          {displayCode}
        </code>
      </div>
    </div>
  );
};

export default CodeGlitch;
