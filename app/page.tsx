import { Section } from "@radix-ui/themes";
import { Footer } from "./components/Footer";
import { AboutMeSectionImproved } from "./sections/AboutMeSectionImproved";
import { LandingSection } from "./sections/LandingSection";
import { ProjectsSection } from "./sections/ProjectsSection";

const HomePage: React.FC = () => {
  return (
    <Section className="px-[5%] md:px-[10%] xl:px-[15%] mb-5">
      <LandingSection />
      <AboutMeSectionImproved />
      <ProjectsSection />
      <Footer />
    </Section>
  );
};

export default HomePage;
