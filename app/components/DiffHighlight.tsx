import React from "react";

interface DiffLine {
  type: "add" | "remove" | "context";
  content: string;
  oldLineNum?: number;
  newLineNum?: number;
}

interface DiffHighlightProps {
  filePath?: string;
  oldFile?: string;
  newFile?: string;
  lines?: DiffLine[];
  oldCode?: string;
  newCode?: string;
  title?: string;
  className?: string;
}

const DiffHighlight: React.FC<DiffHighlightProps> = ({
  filePath = "file.ts",
  oldFile,
  newFile,
  lines: providedLines,
  oldCode,
  newCode,
  title,
  className = "",
}) => {
  const generateLines = (): DiffLine[] => {
    if (providedLines) {
      return providedLines;
    }

    if (oldCode && newCode) {
      const oldLines = oldCode.split('\n');
      const newLines = newCode.split('\n');
      const diffLines: DiffLine[] = [];

      oldLines.forEach((line, idx) => {
        diffLines.push({
          type: 'remove',
          content: line,
          oldLineNum: idx + 1,
        });
      });

      newLines.forEach((line, idx) => {
        diffLines.push({
          type: 'add',
          content: line,
          newLineNum: idx + 1,
        });
      });

      return diffLines;
    }

    return [];
  };

  const lines = generateLines();
  const getLineClass = (type: string) => {
    switch (type) {
      case "add":
        return "bg-green-900 bg-opacity-20 text-radix-base-green";
      case "remove":
        return "bg-red-900 bg-opacity-20 text-radix-base-red";
      default:
        return "text-radix-base-gray-11";
    }
  };

  const getLinePrefix = (type: string) => {
    switch (type) {
      case "add":
        return "+";
      case "remove":
        return "-";
      default:
        return " ";
    }
  };

  return (
    <div
      className={`font-mono text-xs bg-black bg-opacity-40 rounded-md border border-gray-700 border-opacity-40 overflow-hidden ${className}`}
    >
      <div className="bg-gray-900 bg-opacity-50 px-4 py-2 border-b border-gray-700 border-opacity-40">
        {title ? (
          <div className="text-radix-base-gray-11 mb-1 font-semibold">
            {title}
          </div>
        ) : (
          <>
            <div className="text-radix-base-gray-10 mb-1">
              diff --git a/{oldFile || filePath} b/{newFile || filePath}
            </div>
            <div className="flex gap-4 text-[11px]">
              {oldFile && (
                <span className="text-radix-base-red">--- a/{oldFile}</span>
              )}
              {newFile && (
                <span className="text-radix-base-green">+++ b/{newFile}</span>
              )}
            </div>
          </>
        )}
      </div>

      <div className="overflow-x-auto">
        {lines.map((line, idx) => (
          <div
            key={idx}
            className={`flex ${getLineClass(line.type)} hover:bg-opacity-30 transition-colors`}
          >
            <div className="flex gap-2 px-3 py-0.5 select-none border-r border-gray-700 border-opacity-30">
              <span className="text-radix-base-gray-9 w-8 text-right">
                {line.oldLineNum !== undefined ? line.oldLineNum : ""}
              </span>
              <span className="text-radix-base-gray-9 w-8 text-right">
                {line.newLineNum !== undefined ? line.newLineNum : ""}
              </span>
            </div>
            <div className="px-3 py-0.5 flex-1">
              <span
                className={`${
                  line.type === "add"
                    ? "text-radix-base-green"
                    : line.type === "remove"
                      ? "text-radix-base-red"
                      : "text-radix-base-gray-10"
                } mr-2`}
              >
                {getLinePrefix(line.type)}
              </span>
              <span>{line.content}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiffHighlight;
