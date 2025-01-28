import { CodeIcon } from "@radix-ui/react-icons";
import { Section, Text } from "@radix-ui/themes";
import AccentedHeading from "../components/AccentedHeading";
import CTAButton from "../components/CTAButton";
import WindowLayout from "../components/WindowCard/Window";

const AboutSection: React.FC = () => {
  return (
    <Section>
      <AccentedHeading
        textAs="h2"
        size="8"
        preText="My "
        accentedText="Story."
      />
      <Text as="p">
        Allow me to introduce myself, my work and my journey in software.
      </Text>
      <WindowLayout title="about me" padded LogoIcon={<CodeIcon />}>
        <Text as="p">Technologies</Text>
        <ul>
          <li>React</li>
          <li>TailwindCSS</li>
          <li>ExpressJs</li>
          <li>NextJs</li>
        </ul>
      </WindowLayout>
      <CTAButton href="/about" text="About Me" />
    </Section>
  );
};

export default AboutSection;
