"use client";

import React, { useState, useEffect } from "react";
import {
  MoonIcon,
  SunIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import { Heading, Text, Box, Flex } from "@radix-ui/themes";
import { SOCIAL_LINKS } from "@/app/lib/constants";

interface Section {
  id: string;
  label: string;
}

interface PortfolioNavProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  scrollProgress: number;
}

const PortfolioNav: React.FC<PortfolioNavProps> = ({
  sections,
  activeSection,
  onSectionChange,
  scrollProgress,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Read initial theme
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setTheme(newTheme);
  };

  return (
    <nav className="w-full sm:w-1/4 sm:h-full flex-shrink-0 sm:border-r border-gray-border px-4 sm:px-8 py-6 sm:py-8 overflow-y-auto sm:overflow-hidden bg-transparent flex flex-col sm:justify-between">
      {/* Header - Top */}
      <header className="mb-3 sm:mb-0">
        <Heading as="h1" size="8" className="text-gray-text-contrast">Shagan Plaatjies</Heading>
        <Text as="p" size="2" className="mt-2 text-gray-solid-hover">
          Software Engineer & Product Lead
        </Text>
      </header>

      {/* Navigation Links - Middle (visible on desktop only) */}
      <ul className="hidden sm:block space-y-3 sm:mt-0 sm:py-8">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                onSectionChange(section.id);
              }}
              className="group flex items-center py-3"
              onMouseEnter={(e) => {
                const div = e.currentTarget.querySelector(
                  ".nav-indicator"
                ) as HTMLElement;
                if (div) {
                  div.style.width = "40px";
                  div.style.backgroundColor = "var(--gray-12)";
                }
              }}
              onMouseLeave={(e) => {
                const div = e.currentTarget.querySelector(
                  ".nav-indicator"
                ) as HTMLElement;
                if (div && activeSection !== section.id) {
                  div.style.width = "24px";
                  div.style.backgroundColor = "var(--gray-10)";
                }
              }}
            >
              <div
                className="nav-indicator mr-4 transition-all duration-500 ease-in-out"
                style={{
                  height: "1px",
                  width: activeSection === section.id ? "40px" : "24px",
                  backgroundColor:
                    activeSection === section.id
                      ? "var(--gray-12)"
                      : "var(--gray-10)",
                }}
              />
              <Text
                className={`transition-colors ${
                  activeSection === section.id
                    ? "text-gray-text-contrast"
                    : "text-gray-solid-hover group-hover:text-gray-text-contrast"
                }`}
              >
                {section.label}
              </Text>
            </a>
          </li>
        ))}
      </ul>

      {/* Footer Controls - Bottom */}
      <Flex direction="column" gap="4" className="sm:gap-6">
        <Box className="pt-2 sm:pt-0 sm:border-t sm:border-gray-border">
          <Text size="1" className="text-gray-border-active mb-3">LINKS</Text>
          <ul className="flex gap-4 text-gray-solid-hover">
            <li>
              <a
                href={SOCIAL_LINKS.github}
                title="GitHub"
                className="hover:text-gray-text-contrast transition-all duration-300 ease-in-out hover:scale-110"
              >
                <GitHubLogoIcon width="20" height="20" />
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_LINKS.linkedin}
                title="LinkedIn"
                className="hover:text-gray-text-contrast transition-all duration-300 ease-in-out hover:scale-110"
              >
                <LinkedInLogoIcon width="20" height="20" />
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_LINKS.email}
                title="Email"
                className="hover:text-gray-text-contrast transition-all duration-300 ease-in-out hover:scale-110"
              >
                <EnvelopeClosedIcon width="20" height="20" />
              </a>
            </li>
          </ul>
        </Box>

        <Box className="pt-2 sm:pt-0 sm:border-t sm:border-gray-border">
          <Text size="1" className="text-gray-border-active mb-3">THEME</Text>
          <ul className="flex gap-4 text-gray-solid-hover">
            <li>
              <button
                onClick={toggleTheme}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="hover:text-gray-text-contrast transition-all duration-300 ease-in-out hover:scale-110"
                aria-label="Toggle theme"
              >
                {mounted && theme === "dark" ? (
                  <MoonIcon width="20" height="20" />
                ) : (
                  <SunIcon width="20" height="20" />
                )}
              </button>
            </li>
          </ul>
        </Box>
      </Flex>
    </nav>
  );
};

export default PortfolioNav;
