import MainLayout from "./components/layout/Main/layout";
import AboutSection from "./components/sections/AboutSection";
import ContactSection from "./components/sections/ContactSection";
import LandingSection from "./components/sections/LandingSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import SkillsSection from "./components/sections/SkillsSection";

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <LandingSection />
      <SkillsSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </MainLayout>
  );
};

export default HomePage;
