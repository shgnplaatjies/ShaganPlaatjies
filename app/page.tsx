"use client";
import Footer from "./components/Footer";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
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
      <Footer />
    </>
  );
};

export default HomePage;
