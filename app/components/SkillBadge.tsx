import { Badge, Flex } from "@radix-ui/themes";
import React from "react";

type SkillTheme = 'syntax' | 'minimal' | 'outlined';

interface SkillBadgeProps {
  icon?: React.ReactNode;
  label: string;
  category?: string;
  theme?: SkillTheme;
  color?: "gray" | "gold" | "bronze" | "brown" | "yellow" | "amber" | "orange" | "tomato" | "red" | "ruby" | "crimson" | "pink" | "plum" | "purple" | "violet" | "iris" | "indigo" | "blue" | "cyan" | "teal" | "jade" | "green" | "grass" | "lime" | "mint" | "sky";
}

const SkillBadge: React.FC<SkillBadgeProps> = ({
  icon,
  label,
  category,
  theme = 'syntax',
  color = "gray",
}) => {
  const themeStyles = {
    syntax: "bg-opacity-20 border border-current border-opacity-30",
    minimal: "bg-opacity-10",
    outlined: "bg-transparent border-2 border-current",
  };

  return (
    <Badge
      size="2"
      color={color}
      variant="soft"
      className={`${themeStyles[theme]} px-3 py-1.5 transition-all hover:scale-105 hover:bg-opacity-30`}
    >
      <Flex align="center" gap="2">
        {icon && (
          <div className="flex items-center">
            {icon}
          </div>
        )}
        <span className="font-mono text-xs">
          {label}
        </span>
      </Flex>
    </Badge>
  );
};

export default SkillBadge;
