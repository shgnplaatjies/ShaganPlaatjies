import { Flex, Tooltip } from "@radix-ui/themes";
import { ReactNode } from "react";

interface BorderAccentProps {
  children: ReactNode;
  color?: string;
  filePath?: string;
  icon?: ReactNode;
  label?: string;
  devHint?: string;
  className?: string;
}

const BorderAccent: React.FC<BorderAccentProps> = ({
  children,
  color = "border-radix-base-cyan",
  filePath,
  icon,
  label,
  devHint,
  className = "",
}) => {
  const headerContent = (
    <>
      {(icon || label || filePath) && (
        <div className="mb-3 -ml-2">
          {(icon || label) && (
            <Flex align="center" gap="2" className="mb-2">
              {icon && (
                <div className="opacity-60">
                  {icon}
                </div>
              )}
              {label && (
                <span className="font-mono text-sm opacity-70">
                  {label}
                </span>
              )}
            </Flex>
          )}
          {filePath && !label && (
            <div className="font-mono text-xs opacity-50">
              {filePath}
            </div>
          )}
        </div>
      )}
    </>
  );

  const content = (
    <div className={`border-l-2 ${color} pl-6 mb-8 ${className}`}>
      {headerContent}
      {children}
    </div>
  );

  if (devHint) {
    return (
      <Tooltip content={devHint}>
        {content}
      </Tooltip>
    );
  }

  return content;
};

export default BorderAccent;
