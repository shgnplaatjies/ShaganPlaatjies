import React from "react";
import PortfolioPageContent from "./PortfolioPageContent";
import PortfolioPageWrapper from "./PortfolioPageWrapper";
import { LandingSection } from "../sections/LandingSection";
import SummarySection from "../sections/SummarySection";
import ExperienceSection from "../sections/ExperienceSection";
import ProjectsSection from "../sections/ProjectsSection";
import MusicSection from "../sections/MusicSection";
import BlogSection from "../sections/BlogSection";
import ResumeSection from "../sections/ResumeSection";
import { ConclusionSection } from "./ConclusionSection";
import ContactSection from "../sections/ContactSection";

const sections = [
  { id: "summary", label: "Summary" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "music", label: "Music" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

const PortfolioPage: React.FC = () => {
  return (
    <PortfolioPageWrapper>
      <PortfolioPageContent sections={sections}>
        <LandingSection />

        <div id="summary" className="mt-20 scroll-mt-20">
          <SummarySection />
        </div>

        <div id="experience" className="mt-20 scroll-mt-20">
          <ExperienceSection />
        </div>

        <div id="projects" className="mt-20 scroll-mt-20">
          <ProjectsSection />
        </div>

        <div id="music" className="mt-20 scroll-mt-20">
          <MusicSection />
        </div>

        <div id="blog" className="mt-20 scroll-mt-20">
          <BlogSection />
        </div>

        <div className="mt-20">
          <ResumeSection />
        </div>

        <div id="contact" className="mt-20 scroll-mt-20">
          <ContactSection />
        </div>

        <div className="mt-20 mb-20">
          <ConclusionSection />
        </div>
      </PortfolioPageContent>
    </PortfolioPageWrapper>
  );
};

export default PortfolioPage;
