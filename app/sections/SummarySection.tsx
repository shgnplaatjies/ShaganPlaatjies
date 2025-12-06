import React from "react";
import { Box, Heading, Text, Flex } from "@radix-ui/themes";

const SummarySection: React.FC = () => {
  return (
    <Box id="summary-section" className="space-y-4 sm:space-y-6">
      <Heading as="h2" size="7" className="text-gray-12 mb-4 sm:mb-6">
        About
      </Heading>

      <Flex
        direction="column"
        gap="3"
        className="sm:gap-4 text-gray-10 leading-relaxed"
      >
        <Text as="p" size="2" className="sm:text-base">
          I&apos;m a Software Engineer based in Johannesburg with over five
          years of experience delivering scalable, high-performance solutions
          across fintech, insurance, telecommunications, and entertainment.
        </Text>

        <Text as="p" size="2" className="sm:text-base">
          Specialized in building modern web applications and cloud
          infrastructure using TypeScript, Node.js, React, and AWS. Currently
          leading cloud architecture and development for live entertainment
          platforms serving global audiences.
        </Text>
      </Flex>
    </Box>
  );
};

export default SummarySection;
