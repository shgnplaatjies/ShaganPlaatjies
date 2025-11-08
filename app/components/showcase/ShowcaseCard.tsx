import { Box, Heading, Text } from "@radix-ui/themes";
import React from "react";

interface ShowcaseCardProps {
  title: string;
  description: string;
  accent?: string;
  children?: React.ReactNode;
  className?: string;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  title,
  description,
  accent = "accent-9",
  children,
  className = "",
}) => {
  return (
    <Box
      className={`
        group relative
        p-6 rounded-lg
        border border-accent-6 border-opacity-20
        transition-all duration-300
        hover:border-opacity-40
        hover:bg-accent-2 hover:bg-opacity-10
        ${className}
      `}
    >
      <div className={`absolute top-0 left-0 w-1 h-6 rounded-br ${`bg-${accent}`} opacity-0 group-hover:opacity-100 transition-opacity`} />

      <Heading as="h3" size="4" className="mb-2">
        {title}
      </Heading>

      <Text as="p" size="2" className="opacity-70 mb-4">
        {description}
      </Text>

      {children}
    </Box>
  );
};

export default ShowcaseCard;
