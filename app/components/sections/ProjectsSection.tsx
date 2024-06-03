import { Heading, Text } from "@radix-ui/themes";
import CTAButton from "../CTAButton";

const ProjectsSection: React.FC = () => {
  return (
    <section>
      <Heading as="h2" className="mb-3 font-semibold">
        My Projects
      </Heading>
      <Text as="p">
        Have a look at some of my projects and work I have done.
      </Text>
      <CTAButton href="/projects" text="View All" />
    </section>
  );
};

export default ProjectsSection;
