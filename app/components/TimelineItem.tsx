import { Flex, Text, Box } from "@radix-ui/themes";
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
          <Text className={`${color} font-semibold font-mono text-sm sm:text-base`}>
            {company}
          </Text>
          <Text size="1" className="opacity-60 font-mono">{period}</Text>
        </Flex>

        <Text size="2" className="opacity-90">
          {description}
        </Text>

        {highlights.length > 0 && (
          <Flex direction="column" gap="1" className="mt-2">
            {highlights.map((highlight, index) => (
              <Flex key={index} gap="2" align="start">
                <Text size="1" className="text-accent-9 opacity-70 mt-0.5">▸</Text>
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
