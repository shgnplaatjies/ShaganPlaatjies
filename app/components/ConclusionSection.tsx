'use client';

import { Box, Flex, Heading, Link, Text } from '@radix-ui/themes';
import NextLink from 'next/link';

const ConclusionSection: React.FC = () => {
  return (
    <Box className="border-t border-gray-border mt-24 pt-16">
      <Flex direction="column" gap="8" align="center">
        <Box className="text-center max-w-2xl">
          <Heading as="h2" size="6" className="mb-4 text-gray-12">
            Built With
          </Heading>
          <Text as="p" size="2" className="text-gray-10 leading-relaxed">
            Loosely designed in Figma and coded in Visual Studio Code. Built with{' '}
            <Link asChild color="blue">
              <NextLink href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
                Next.js
              </NextLink>
            </Link>
            {' '}and{' '}
            <Link asChild color="blue">
              <NextLink href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer">
                Tailwind CSS
              </NextLink>
            </Link>
            . Styled with{' '}
            <Link asChild color="blue">
              <NextLink href="https://radix-ui.com" target="_blank" rel="noopener noreferrer">
                Radix UI
              </NextLink>
            </Link>
            . Deployed with{' '}
            <Link asChild color="blue">
              <NextLink href="https://vercel.com" target="_blank" rel="noopener noreferrer">
                Vercel
              </NextLink>
            </Link>
            .
          </Text>
        </Box>

        <Flex gap="6" justify="center" className="text-sm opacity-70 flex-wrap">
          <Link asChild className="hover:opacity-100 transition-opacity">
            <NextLink href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </NextLink>
          </Link>
          <Text>•</Text>
          <Link asChild className="hover:opacity-100 transition-opacity">
            <NextLink href="https://figma.com" target="_blank" rel="noopener noreferrer">
              Figma
            </NextLink>
          </Link>
          <Text>•</Text>
          <Link asChild className="hover:opacity-100 transition-opacity">
            <NextLink href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer">
              VS Code
            </NextLink>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export { ConclusionSection };
