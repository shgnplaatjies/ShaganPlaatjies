import React, { ReactNode } from "react";

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
    <div className="flex h-full w-full overflow-hidden">
      <nav className="w-1/4 flex-shrink-0 border-r border-gray-5 bg-gray-2 p-8 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-12">Shagan Plaatjies</h1>
          <p className="mt-2 text-sm text-gray-10">
            Software Engineer & Product Lead
          </p>
        </div>

        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => onSectionChange(section.id)}
                className={`w-full text-left px-4 py-2 rounded transition-colors ${
                  activeSection === section.id
                    ? "bg-gray-6 text-gray-12 font-semibold"
                    : "text-gray-10 hover:text-gray-12 hover:bg-gray-4"
                }`}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-12 pt-6 border-t border-gray-5">
          <p className="text-xs text-gray-9 mb-4">LINKS</p>
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
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto">
        <div className="px-12 py-8 max-w-4xl">{children}</div>
      </div>
    </div>
  );
};

export default PortfolioLayout;
