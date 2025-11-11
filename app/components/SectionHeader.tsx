import { Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";

interface SectionHeaderProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  accentColor?: string;
  size?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  title,
  subtitle,
  accentColor = "text-accent-9",
  size = "6",
  className = "",
}) => (
  <Flex
    direction="column"
    gap="2"
    className={`mb-6 ${className}`}
  >
    <Flex align="center" gap="3">
      {icon && (
        <div className="opacity-70 flex items-center">
          {icon}
        </div>
      )}
      <Heading as="h2" size={size} className="font-heading">
        {title}
      </Heading>
    </Flex>
    {subtitle && (
      <Text as="p" size="2" className="opacity-80 max-w-3xl">
        {subtitle}
      </Text>
    )}
  </Flex>
);

export default SectionHeader;
