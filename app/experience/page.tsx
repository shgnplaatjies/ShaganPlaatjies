"use client";
import { Section } from "@radix-ui/themes";
import { Footer } from "../components/Footer";
import ProjectsWidget from "../sections/ProjectsSection";
import LandingSection from "./sections/LandingSection";

const ExperiencePage: React.FC = () => {
  return (
    <>
      <LandingSection />
      <ProjectsWidget />
      <Section>
        <Footer />
      </Section>
    </>
  );
};

export default ExperiencePage;
