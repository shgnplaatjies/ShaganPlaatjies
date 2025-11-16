"use client";

import React, { useState, useEffect } from "react";
import {
  MoonIcon,
  SunIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
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
    <nav className="w-full sm:w-1/4 flex-shrink-0 sm:border-r border-gray-4 px-4 sm:px-8 py-6 sm:py-8 sm:h-full overflow-y-auto sm:overflow-hidden bg-transparent flex flex-col">
      <header className="mb-3">
        <h1 className="text-2xl font-bold text-gray-12">Shagan Plaatjies</h1>
        <p className="mt-2 text-sm text-gray-10">
          Software Engineer & Product Lead
        </p>
      </header>

      <ul className="hidden sm:block space-y-3 sm:mt-12">
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
                className="nav-indicator mr-4 transition-all"
                style={{
                  height: "1px",
                  width: activeSection === section.id ? "40px" : "24px",
                  backgroundColor:
                    activeSection === section.id
                      ? "var(--gray-12)"
                      : "var(--gray-10)",
                }}
              />
              <span
                className={`transition-colors ${
                  activeSection === section.id
                    ? "text-gray-12"
                    : "text-gray-10 group-hover:text-gray-12"
                }`}
              >
                {section.label}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="pt-2 sm:pt-10 sm:border-t sm:border-gray-border-1 sm:border-opacity-50">
        <p className="text-xs text-gray-8 mb-3">LINKS</p>
        <ul className="flex gap-4 text-gray-10">
          <li>
            <a
              href={SOCIAL_LINKS.github}
              title="GitHub"
              className="hover:text-gray-12 transition-all duration-200 hover:scale-110"
            >
              <GitHubLogoIcon width="16" height="16" />
            </a>
          </li>
          <li>
            <a
              href={SOCIAL_LINKS.linkedin}
              title="LinkedIn"
              className="hover:text-gray-12 transition-all duration-200 hover:scale-110"
            >
              <LinkedInLogoIcon width="16" height="16" />
            </a>
          </li>
          <li>
            <a
              href={SOCIAL_LINKS.email}
              title="Email"
              className="hover:text-gray-12 transition-all duration-200 hover:scale-110"
            >
              <EnvelopeClosedIcon width="16" height="16" />
            </a>
          </li>
        </ul>
      </div>

      <div className="pt-2 sm:pt-8 sm:border-t sm:border-gray-border-1 sm:border-opacity-50">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 text-sm text-gray-10 hover:text-gray-12 transition-all duration-200 hover:scale-105"
          aria-label="Toggle theme"
        >
          {mounted && theme === "dark" ? (
            <>
              <MoonIcon width="16" height="16" />
              <span>Dark</span>
            </>
          ) : (
            <>
              <SunIcon width="16" height="16" />
              <span>Light</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
};

export default PortfolioNav;
