import React from "react";
import { Text } from "@radix-ui/themes";

interface TerminalPromptProps {
  user?: string;
  path: string;
  command?: string;
  showCursor?: boolean;
  className?: string;
}

const TerminalPrompt: React.FC<TerminalPromptProps> = ({
  user = "shagan",
  path,
  command,
  showCursor = true,
  className = "",
}) => {
  return (
    <div className={`font-mono text-sm mb-6 ${className}`}>
      <Text className="text-radix-base-grass">{user}@portfolio</Text>
      <Text className="text-gray-12">:</Text>
      <Text className="text-radix-base-blue">{path}</Text>
      <Text className="text-gray-12">$ </Text>
      {command && <Text className="text-radix-base-amber">{command}</Text>}
      {showCursor && (
        <Text className="text-radix-base-amber animate-pulse ml-1">_</Text>
      )}
    </div>
  );
};

export default TerminalPrompt;
