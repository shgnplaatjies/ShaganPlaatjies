import React from "react";
import { Box, Heading, Text, Flex } from "@radix-ui/themes";

const SummarySection: React.FC = () => {
  return (
    <Box id="summary-section" className="space-y-4 sm:space-y-6">
      <Heading as="h2" size="7" className="text-gray-12 mb-4 sm:mb-6">
        About
      </Heading>

      <Flex direction="column" gap="3" className="sm:gap-4 text-gray-10 leading-relaxed">
        <Text as="p" size="2" className="sm:text-base">
          I&apos;m a Software Engineer and Product Leader based in Johannesburg,
          South Africa, with over half a decade architecting mission-critical
          systems across fintech, insurance, telecommunications, and live
          entertainment.
        </Text>

        <Text as="p" size="2" className="sm:text-base">
          Currently at Broadway Media, I architect and deliver patented
          technology for global audiences. I merge deep technical expertise with
          product strategy, transforming complex challenges into elegant,
          scalable solutions. I&apos;ve led teams through enterprise-scale
          transformations, migrating monolithic systems into high-performance
          microservices while maintaining zero downtime.
        </Text>

        <Text as="p" size="2" className="sm:text-base">
          My specialties span full-stack development, system architecture, team
          leadership, and enterprise modernization. I thrive at the intersection
          of scale, security, and innovation—building systems that handle
          millions of concurrent users while maintaining architectural elegance.
        </Text>

        <Text as="p" size="2" className="sm:text-base">
          When not architecting systems, I enjoy exploring emerging
          technologies, contributing to open-source projects, and mentoring
          engineers through complex technical challenges.
        </Text>
      </Flex>
    </Box>
  );
};

export default SummarySection;
