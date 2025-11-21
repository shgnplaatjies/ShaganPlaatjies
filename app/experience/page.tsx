import GenericContentPage from "../components/pages/GenericContentPage";
import ExperienceSection from "../sections/ExperienceSection";

const ExperiencePage: React.FC = () => {
  return (
    <GenericContentPage
      landingDescription="Explore my professional experience across fintech, insurance, telecommunications, and live entertainment sectors."
      contentComponent={<ExperienceSection />}
    />
  );
};

export default ExperiencePage;
