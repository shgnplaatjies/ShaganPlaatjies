import { Flex, Text, Box } from "@radix-ui/themes";
import { ReactNode } from "react";

interface BorderAccentProps {
  children: ReactNode;
  color?: string;
  filePath?: string;
  icon?: ReactNode;
  label?: string;
  className?: string;
}

const BorderAccent: React.FC<BorderAccentProps> = ({
  children,
  color = "border-radix-base-cyan",
  filePath,
  icon,
  label,
  className = "",
}) => (
  <Box className={`border-l-2 ${color} pl-6 mb-8 ${className}`}>
    {(icon || label || filePath) && (
      <Box className="mb-3 -ml-2">
        {(icon || label) && (
          <Flex align="center" gap="2" className="mb-2">
            {icon && (
              <Box className="opacity-60">
                {icon}
              </Box>
            )}
            {label && (
              <Text size="1" className="font-mono opacity-70">
                {label}
              </Text>
            )}
          </Flex>
        )}
        {filePath && !label && (
          <Text size="1" className="font-mono opacity-50">
            {filePath}
          </Text>
        )}
      </Box>
    )}
    {children}
  </Box>
);

export default BorderAccent;
