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
      <span className="text-radix-base-grass">{user}@portfolio</span>
      <span className="text-gray-12">:</span>
      <span className="text-radix-base-blue">{path}</span>
      <span className="text-gray-12">$ </span>
      {command && <span className="text-radix-base-amber">{command}</span>}
      {showCursor && (
        <span className="text-radix-base-amber animate-pulse ml-1">_</span>
      )}
    </div>
  );
};

export default TerminalPrompt;
