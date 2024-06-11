import { Heading, Section, Text } from "@radix-ui/themes";
import CTAButton from "../CTAButton";

const ProjectsSection: React.FC = () => {
  return (
    <Section>
      <Heading as="h2" className="mb-3 font-semibold">
        My Projects
      </Heading>
      <Text as="p">
        Have a look at some of my projects and work I have done.
      </Text>
      <CTAButton href="/projects" text="View All" />
    </Section>
  );
};

export default ProjectsSection;
