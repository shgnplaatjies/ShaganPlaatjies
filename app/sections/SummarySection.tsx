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
          I&apos;m a software engineer based in Johannesburg. Over the past five
          years, I&apos;ve led teams of 3-6 engineers building web applications
          across fintech, insurance, telecommunications, and entertainment.
        </Text>

        <Text as="p" size="2" className="sm:text-base">
          I work primarily with Node.js, TypeScript, React, and Next.js. I
          handle everything from initial architecture decisions through
          production deployment, working closely with product teams to align
          technical delivery with business needs.
        </Text>

        <Text as="p" size="2" className="sm:text-base">
          My experience includes managing AWS and Azure infrastructure,
          migrating legacy systems to microservices, and building platforms that
          serve millions of users. I&apos;m focused on writing maintainable code
          and shipping reliable software.
        </Text>
      </Flex>
    </Box>
  );
};

export default SummarySection;
