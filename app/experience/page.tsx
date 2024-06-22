"use client";
import { Section } from "@radix-ui/themes";
import Footer from "../components/Footer";
import LandingSection from "../contact/sections/LandingSection";
import ProjectsSection from "../sections/ProjectsSection";

const ExperiencePage: React.FC = () => {
  return (
    <>
      <LandingSection />
      <ProjectsSection />
      <Section>
        <Footer />
      </Section>
    </>
  );
};

export default ExperiencePage;
