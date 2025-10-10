import { ReactNode } from "react";

interface BorderAccentProps {
  children: ReactNode;
  color?: string;
  filePath?: string;
  className?: string;
}

const BorderAccent: React.FC<BorderAccentProps> = ({
  children,
  color = "border-radix-base-cyan",
  filePath,
  className = "",
}) => {
  return (
    <div className={`border-l-2 ${color} pl-6 mb-8 ${className}`}>
      {filePath && (
        <div className="font-mono text-xs opacity-50 mb-3 -ml-2">
          {filePath}
        </div>
      )}
      {children}
    </div>
  );
};

export default BorderAccent;
