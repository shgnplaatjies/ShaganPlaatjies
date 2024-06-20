import { Section, Text } from "@radix-ui/themes";
import AccentedHeading from "../AccentedHeading";
import CTAButton from "../CTAButton";

const ProjectsSection: React.FC = () => {
  return (
    <Section>
      <AccentedHeading
        textAs="h2"
        size="8"
        preText="My "
        accentedText="Experience."
      />
      <Text as="p">
        Have a look at some of my projects and work I have done.
      </Text>
      <CTAButton href="/projects" text="View All" />
    </Section>
  );
};

export default ProjectsSection;
