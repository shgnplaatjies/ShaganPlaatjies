"use client";
import { Section } from "@radix-ui/themes";
import Footer from "../components/Footer";
import ProjectsSection from "../sections/ProjectsSection";
import LandingSection from "./sections/LandingSection";

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
