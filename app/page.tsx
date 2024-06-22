"use client";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import FooterSection from "./sections/FooterSection";
import LandingSection from "./sections/LandingSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";

const HomePage: React.FC = () => {
  return (
    <>
      <LandingSection />
      <SkillsSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
      <FooterSection />
    </>
  );
};

export default HomePage;
