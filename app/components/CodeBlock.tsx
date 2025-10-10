"use client";
import { Box } from "@radix-ui/themes";
import { ReactNode } from "react";

interface CodeBlockProps {
  children: ReactNode;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  language = "typescript",
  className = "",
  showLineNumbers = false,
}) => {
  return (
    <Box
      className={`font-mono text-sm bg-black bg-opacity-30 rounded-md p-4 overflow-x-auto border border-gray-600 border-opacity-30 ${className}`}
    >
      {language && (
        <div className="text-xs opacity-50 mb-2 flex justify-between">
          <span>{language}</span>
        </div>
      )}
      <pre className="text-radix-base-gray-12">
        <code>{children}</code>
      </pre>
    </Box>
  );
};

export default CodeBlock;
