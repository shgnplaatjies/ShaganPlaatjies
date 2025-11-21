import GenericContentPage from "../components/pages/GenericContentPage";
import ProjectsSection from "../sections/ProjectsSection";

const ProjectsPage: React.FC = () => {
  return (
    <GenericContentPage
      landingDescription="Explore my portfolio of technical projects and solutions delivered across various industries and platforms."
      contentComponent={<ProjectsSection />}
    />
  );
};

export default ProjectsPage;
