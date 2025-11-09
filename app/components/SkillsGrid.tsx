import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";

interface SkillCategoryProps {
  name: string;
  color?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const SkillCategory: React.FC<SkillCategoryProps> = ({
  name,
  color = "text-accent-9",
  icon,
  children,
  className = "",
}) => {
  return (
    <Box className={`mb-6 ${className}`}>
      <Flex align="center" gap="2" className="mb-3">
        {icon && (
          <div className={`${color} opacity-80 flex items-center`}>
            {icon}
          </div>
        )}
        <Heading as="h4" size="3" className={`font-mono ${color}`}>
          {name}
        </Heading>
      </Flex>
      <Flex wrap="wrap" gap="2">
        {children}
      </Flex>
    </Box>
  );
};

interface SkillsGridProps {
  title?: string;
  columns?: number;
  children: React.ReactNode;
  className?: string;
}

const SkillsGrid: React.FC<SkillsGridProps> = ({
  title,
  columns = 1,
  children,
  className = "",
}) => {
  const gridClass = columns === 2 ? "md:grid-cols-2" : columns === 3 ? "md:grid-cols-3" : "";

  return (
    <Box className={className}>
      {title && (
        <Heading as="h3" size="5" className="mb-4 font-heading">
          {title}
        </Heading>
      )}
      <div className={`grid grid-cols-1 ${gridClass} gap-6`}>
        {children}
      </div>
    </Box>
  );
};

export default SkillsGrid;
