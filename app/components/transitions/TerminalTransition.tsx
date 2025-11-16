"use client";
import React, { useEffect, useState } from "react";
import { Text, Box } from "@radix-ui/themes";

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
    <Box className={`py-6 px-4 rounded-lg bg-gray-2 border border-gray-5 ${className}`}>
      <Box className="font-mono text-sm">
        <Text className="text-radix-base-grass">shagan@portfolio</Text>
        <Text className="text-gray-12">:</Text>
        <Text className="text-radix-base-blue">~</Text>
        <Text className="text-gray-12">$ </Text>
        <Text className="text-radix-base-amber">{displayText}</Text>
        <Text className={`ml-1 animate-pulse ${isTyping ? 'opacity-100' : 'opacity-0'}`}>
          _
        </Text>
      </Box>
    </Box>
  );
};

export default TerminalTransition;
