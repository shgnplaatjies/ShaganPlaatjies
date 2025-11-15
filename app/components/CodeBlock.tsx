"use client";
import { Box } from "@radix-ui/themes";
import { ReactNode } from "react";

interface CodeBlockProps {
  children: ReactNode;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
}

const highlightCode = (code: string): JSX.Element[] => {
  const keywords = /\b(const|let|var|function|return|if|else|for|while|class|interface|type|import|export|from|default|async|await|new|this|extends|implements|public|private|protected|static|readonly|enum)\b/g;
  const strings = /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g;
  const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
  const numbers = /\b(\d+\.?\d*)\b/g;
  const properties = /\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  const types = /\b([A-Z][a-zA-Z0-9_]*)\b/g;

  const lines = code.split('\n');
  return lines.map((line, lineIndex) => {
    let highlighted = line;
    const elements: JSX.Element[] = [];
    let lastIndex = 0;

    const matches: Array<{ start: number; end: number; text: string; className: string }> = [];

    let match;
    const commentRegex = new RegExp(comments);
    while ((match = commentRegex.exec(line)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[0],
        className: "text-gray-9 italic"
      });
    }

    const stringRegex = new RegExp(strings);
    line.replace(stringRegex, (match, p1, p2, offset) => {
      matches.push({
        start: offset,
        end: offset + match.length,
        text: match,
        className: "text-radix-base-green"
      });
      return match;
    });

    const keywordRegex = new RegExp(keywords);
    line.replace(keywordRegex, (match, offset) => {
      matches.push({
        start: offset,
        end: offset + match.length,
        text: match,
        className: "text-radix-base-purple"
      });
      return match;
    });

    const numberRegex = new RegExp(numbers);
    line.replace(numberRegex, (match, offset) => {
      matches.push({
        start: offset,
        end: offset + match.length,
        text: match,
        className: "text-radix-base-orange"
      });
      return match;
    });

    matches.sort((a, b) => a.start - b.start);

    const cleanedMatches: typeof matches = [];
    matches.forEach(match => {
      if (cleanedMatches.length === 0 || match.start >= cleanedMatches[cleanedMatches.length - 1].end) {
        cleanedMatches.push(match);
      }
    });

    cleanedMatches.forEach((match, i) => {
      if (match.start > lastIndex) {
        elements.push(
          <span key={`${lineIndex}-text-${i}`}>
            {line.substring(lastIndex, match.start)}
          </span>
        );
      }
      elements.push(
        <span key={`${lineIndex}-match-${i}`} className={match.className}>
          {match.text}
        </span>
      );
      lastIndex = match.end;
    });

    if (lastIndex < line.length) {
      elements.push(
        <span key={`${lineIndex}-text-end`}>
          {line.substring(lastIndex)}
        </span>
      );
    }

    return (
      <div key={lineIndex}>
        {elements.length > 0 ? elements : line}
      </div>
    );
  });
};

const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  language = "typescript",
  className = "",
  showLineNumbers = false,
}) => {
  const code = typeof children === 'string' ? children : String(children);
  const highlighted = highlightCode(code);

  return (
    <Box
      className={`font-mono text-sm bg-gray-2 rounded-md p-4 overflow-x-auto border border-gray-5 ${className}`}
    >
      {language && (
        <div className="text-xs opacity-50 mb-2 flex justify-between">
          <span>{language}</span>
        </div>
      )}
      <pre className="text-radix-base-gray-12">
        <code>{highlighted}</code>
      </pre>
    </Box>
  );
};

export default CodeBlock;
