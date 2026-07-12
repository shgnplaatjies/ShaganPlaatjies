"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MoonIcon,
  SunIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import { SOCIAL_LINKS } from "@/app/lib/constants";
import StylizedTextLogo from "./StylizedTextLogo";

interface Section {
  id: string;
  label: string;
}

interface PortfolioNavProps {
  sections: Section[];
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
}

// Sections with a dedicated route navigate there directly; the rest are
// homepage-anchor sections, reached via "/#id" from any page.
const PAGE_ROUTES: Record<string, string> = {
  experience: "/experience",
  projects: "/projects",
};

const PortfolioNav: React.FC<PortfolioNavProps> = ({
  sections,
  activeSection,
  onSectionChange,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isLinkMode = !onSectionChange;

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }

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

  const isSectionActive = (id: string) =>
    isLinkMode ? pathname === PAGE_ROUTES[id] : activeSection === id;

  const itemClassName = (active: boolean) =>
    `group flex items-center gap-2.5 rounded-md border px-2.5 py-2 text-[13px] whitespace-nowrap transition-colors ${
      active
        ? "border-[var(--ops-line)] text-[var(--ops-fg-0)]"
        : "border-transparent text-[var(--ops-fg-1)] hover:border-[var(--ops-line)] hover:text-[var(--ops-fg-0)]"
    }`;

  const itemStyle = (active: boolean): React.CSSProperties | undefined =>
    active
      ? { backgroundColor: "color-mix(in srgb, var(--ops-accent) 8%, transparent)" }
      : undefined;

  const renderThemeToggle = (showLabel: boolean, size: string) => (
    <button
      onClick={toggleTheme}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="flex items-center gap-2 text-[var(--ops-fg-1)] transition-colors hover:text-[var(--ops-fg-0)]"
      aria-label="Toggle theme"
    >
      {mounted && theme === "dark" ? (
        <MoonIcon width={size} height={size} />
      ) : (
        <SunIcon width={size} height={size} />
      )}
      {showLabel && <span className="text-[11px]">{mounted ? theme : ""}</span>}
    </button>
  );

  return (
    <nav className="flex w-full flex-shrink-0 flex-col border-[var(--ops-line)] bg-[var(--ops-bg)] px-4 py-4 font-mono sm:h-full sm:w-64 sm:justify-between sm:overflow-hidden sm:border-r sm:px-5 sm:py-6">
      <div className="flex items-center justify-between gap-3 sm:block">
        <div>
          <StylizedTextLogo size="4" />
          <p className="mt-1 hidden text-[11px] tracking-wide text-[var(--ops-fg-2)] sm:block">
            Software Engineer &amp; Product Lead
          </p>
        </div>
        <div className="sm:hidden">{renderThemeToggle(false, "18")}</div>
      </div>

      <ul className="-mx-1 mt-3 flex flex-row gap-1 overflow-x-auto px-1 sm:mx-0 sm:mt-6 sm:flex-col sm:overflow-visible sm:px-0 sm:py-6">
        {sections.map((section) => {
          const active = isSectionActive(section.id);
          const dot = (
            <span
              className="h-[5px] w-[5px] flex-shrink-0 rounded-full"
              style={{
                backgroundColor: active ? "var(--ops-accent)" : "var(--ops-line-bright)",
                boxShadow: active ? "0 0 6px var(--ops-accent)" : "none",
              }}
              aria-hidden="true"
            />
          );
          const label = <span className="sr-only sm:not-sr-only">{section.label}</span>;

          return (
            <li key={section.id} className="flex-shrink-0">
              {isLinkMode ? (
                <Link
                  href={PAGE_ROUTES[section.id] ?? `/#${section.id}`}
                  className={itemClassName(active)}
                  style={itemStyle(active)}
                >
                  {dot}
                  {label}
                </Link>
              ) : (
                <a
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSectionChange!(section.id);
                  }}
                  className={itemClassName(active)}
                  style={itemStyle(active)}
                >
                  {dot}
                  {label}
                </a>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-3 flex items-center justify-between gap-4 border-t border-[var(--ops-line)] pt-3 sm:mt-0 sm:flex-col sm:items-stretch sm:gap-4 sm:pt-4">
        <div>
          <p className="mb-2 hidden text-[10px] uppercase tracking-widest text-[var(--ops-fg-2)] sm:block">
            Links
          </p>
          <div className="flex gap-4 text-[var(--ops-fg-1)]">
            <a
              href={SOCIAL_LINKS.github}
              title="GitHub"
              className="transition-colors hover:text-[var(--ops-fg-0)]"
            >
              <GitHubLogoIcon width="18" height="18" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              title="LinkedIn"
              className="transition-colors hover:text-[var(--ops-fg-0)]"
            >
              <LinkedInLogoIcon width="18" height="18" />
            </a>
            <a
              href={SOCIAL_LINKS.email}
              title="Email"
              className="transition-colors hover:text-[var(--ops-fg-0)]"
            >
              <EnvelopeClosedIcon width="18" height="18" />
            </a>
          </div>
        </div>

        <div className="hidden sm:block">
          <p className="mb-2 text-[10px] uppercase tracking-widest text-[var(--ops-fg-2)]">
            Theme
          </p>
          {renderThemeToggle(true, "18")}
        </div>
      </div>
    </nav>
  );
};

export default PortfolioNav;
