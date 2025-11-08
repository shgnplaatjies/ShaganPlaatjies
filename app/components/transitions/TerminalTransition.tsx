"use client";
import React, { useEffect, useState } from "react";

interface TerminalTransitionProps {
  messages?: string[];
  speed?: number;
  className?: string;
}

const TerminalTransition: React.FC<TerminalTransitionProps> = ({
  messages = [
    "$ npm run innovation",
    "$ git commit -m 'shipping excellence'",
    "$ node build-beautiful-things.js",
  ],
  speed = 2000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const message = messages[currentIndex];
    let charIndex = 0;

    if (isTyping) {
      const typingInterval = setInterval(() => {
        if (charIndex < message.length) {
          setDisplayText(message.slice(0, charIndex + 1));
          charIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 40);

      return () => clearInterval(typingInterval);
    } else {
      const nextMessageTimeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setDisplayText("");
        setIsTyping(true);
      }, speed);

      return () => clearTimeout(nextMessageTimeout);
    }
  }, [currentIndex, isTyping, messages, speed]);

  return (
    <div className={`py-6 px-4 rounded-lg bg-black bg-opacity-40 border border-accent-6 border-opacity-20 ${className}`}>
      <div className="font-mono text-sm">
        <span className="text-radix-base-grass">shagan@portfolio</span>
        <span className="text-white">:</span>
        <span className="text-radix-base-blue">~</span>
        <span className="text-white">$ </span>
        <span className="text-radix-base-amber">{displayText}</span>
        <span className={`ml-1 animate-pulse ${isTyping ? 'opacity-100' : 'opacity-0'}`}>
          _
        </span>
      </div>
    </div>
  );
};

export default TerminalTransition;
