import { Section } from "@radix-ui/themes";
import { Footer } from "./components/Footer";
import { AboutMeSection } from "./sections/AboutMeSection";
import { LandingSection } from "./sections/LandingSection";
import { ProjectsSection } from "./sections/ProjectsSection";

const HomePage: React.FC = () => {
  return (
    <Section className="px-[7.5%] md:px-[10%] xl:px-[15%]">
      <LandingSection />
      <AboutMeSection />
      <ProjectsSection />
      <Footer />
    </Section>
  );
};

export default HomePage;
