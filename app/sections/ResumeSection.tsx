import { Box, Flex, Heading, Link, Text } from '@radix-ui/themes';
import NextLink from 'next/link';

const ResumeSection: React.FC = () => {
  return (
    <Box className="mt-24">
      <Flex direction="column" gap="6" align="center">
        <Box className="text-center max-w-2xl">
          <Heading as="h2" size="6" className="mb-4 text-gray-text-contrast">
            Resume & Full History
          </Heading>
          <Text as="p" size="2" className="text-gray-solid-hover leading-relaxed">
            Want a comprehensive view of my professional background? Download my full resume to explore detailed work history, technical skills, achievements, and more.
          </Text>
        </Box>

        <Link asChild color="cyan">
          <NextLink href="/resume">
            Download Resume
          </NextLink>
        </Link>
      </Flex>
    </Box>
  );
};

export default ResumeSection;
