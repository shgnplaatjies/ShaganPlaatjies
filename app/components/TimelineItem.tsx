import { Flex, Text } from "@radix-ui/themes";
import React from "react";

interface TimelineItemProps {
  company: string;
  period: string;
  description: string;
  color?: string;
  highlights?: string[];
  className?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  company,
  period,
  description,
  color = "text-radix-base-cyan",
  highlights = [],
  className = "",
}) => {
  return (
    <li className={className}>
      <Flex direction="column" gap="2">
        <Flex justify="between" align="center" wrap="wrap" gap="2">
          <span className={`${color} font-semibold font-mono text-sm sm:text-base`}>
            {company}
          </span>
          <span className="text-xs opacity-60 font-mono">{period}</span>
        </Flex>

        <Text size="2" className="opacity-90">
          {description}
        </Text>

        {highlights.length > 0 && (
          <Flex direction="column" gap="1" className="mt-2">
            {highlights.map((highlight, index) => (
              <Flex key={index} gap="2" align="start">
                <span className="text-accent-9 opacity-70 text-xs mt-0.5">▸</span>
                <Text size="1" className="opacity-80">
                  {highlight}
                </Text>
              </Flex>
            ))}
          </Flex>
        )}
      </Flex>
    </li>
  );
};

export default TimelineItem;
