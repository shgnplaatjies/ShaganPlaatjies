import { Footer } from "../components/Footer";

import { ProjectsSection } from "../sections/ProjectsSection";
import LandingSection from "./sections/LandingSection";

const ExperiencePage: React.FC = () => {
  return (
    <>
      <LandingSection />
      <ProjectsSection />

      <Footer />
    </>
  );
};

export default ExperiencePage;
