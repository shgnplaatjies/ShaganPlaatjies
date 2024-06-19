import { Heading, Section, Text } from "@radix-ui/themes";
import CTAButton from "../CTAButton";

const SkillsSection: React.FC = () => {
  return (
    <Section>
      <Heading as="h2" className="mb-3 font-semibold">
        Learn More About My Skills
      </Heading>
      <Text as="p">Allow me to introduce skills.</Text>
      <CTAButton href="/projects" text="My Projects" />
    </Section>
  );
};

export default SkillsSection;
