"use client";
import { Section } from "@radix-ui/themes";
import Footer from "../components/Footer";
import ProjectsWidget from "../components/widgets/ProjectsWidget";
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
