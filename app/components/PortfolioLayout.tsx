import React, { ReactNode } from "react";
import { Heading, Text, Box, Flex } from "@radix-ui/themes";

interface Section {
  id: string;
  label: string;
}

interface PortfolioLayoutProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  children: ReactNode;
}

const PortfolioLayout: React.FC<PortfolioLayoutProps> = ({
  sections,
  activeSection,
  onSectionChange,
  children,
}) => {
  return (
    <Box className="flex h-full w-full overflow-hidden">
      <nav className="w-1/4 flex-shrink-0 border-r border-gray-border bg-gray-bg-secondary p-8 overflow-y-auto">
        <Box className="mb-8">
          <Heading as="h1" size="8" className="text-gray-12">Shagan Plaatjies</Heading>
          <Text as="p" size="2" className="mt-2 text-gray-10">
            Software Engineer & Product Lead
          </Text>
        </Box>

        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => onSectionChange(section.id)}
                className={`w-full text-left px-4 py-2 rounded transition-colors ${
                  activeSection === section.id
                    ? "bg-gray-border text-gray-text-contrast font-semibold"
                    : "text-gray-text hover:text-gray-text-contrast hover:bg-gray-interactive"
                }`}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>

        <Box className="mt-12 pt-6 border-t border-gray-border">
          <Text size="1" className="text-gray-9 mb-4">LINKS</Text>
          <ul className="space-y-2 text-sm text-gray-10">
            <li>
              <a
                href="https://github.com"
                className="hover:text-gray-12 transition-colors"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                className="hover:text-gray-12 transition-colors"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="mailto:contact@example.com"
                className="hover:text-gray-12 transition-colors"
              >
                Email
              </a>
            </li>
          </ul>
        </Box>
      </nav>

      <Box className="flex-1 overflow-y-auto">
        <Box className="px-4 sm:px-8 md:px-12 py-6 sm:py-8 max-w-4xl">{children}</Box>
      </Box>
    </Box>
  );
};

export default PortfolioLayout;
