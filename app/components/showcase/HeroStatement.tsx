import { Box, Heading, Text } from "@radix-ui/themes";
import React from "react";

interface HeroStatementProps {
  mainText: string;
  subtext?: string;
  className?: string;
}

const HeroStatement: React.FC<HeroStatementProps> = ({
  mainText,
  subtext,
  className = "",
}) => {
  return (
    <Box className={`text-center py-12 ${className}`}>
      <Heading
        as="h2"
        size="9"
        className="mb-4 text-balance leading-tight"
      >
        {mainText}
      </Heading>

      {subtext && (
        <Text as="p" size="3" className="opacity-70 max-w-3xl mx-auto text-balance">
          {subtext}
        </Text>
      )}
    </Box>
  );
};

export default HeroStatement;
