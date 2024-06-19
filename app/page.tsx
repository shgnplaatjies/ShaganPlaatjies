import AboutSection from "./components/sections/AboutSection";
import ContactSection from "./components/sections/ContactSection";
import LandingSection from "./components/sections/LandingSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import SkillsSection from "./components/sections/SkillsSection";

const HomePage: React.FC = () => {
  return (
    <>
      <LandingSection />
      <SkillsSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
