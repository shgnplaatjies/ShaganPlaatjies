import { Section, Text } from "@radix-ui/themes";
import AccentedHeading from "../components/AccentedHeading";
import CTAButton from "../components/CTAButton";

const SkillsSection: React.FC = () => {
  return (
    <Section>
      <AccentedHeading
        textAs="h2"
        size="8"
        preText="My "
        accentedText="Skills."
      />
      <Text as="p">Allow me to introduce skills.</Text>
      <CTAButton href="/projects" text="My Projects" />
    </Section>
  );
};

export default SkillsSection;
