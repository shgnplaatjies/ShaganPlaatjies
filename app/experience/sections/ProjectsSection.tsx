import { CodeIcon } from "@radix-ui/react-icons";
import { Section, Text } from "@radix-ui/themes";
import AccentedHeading from "../../components/AccentedHeading";
import CTAButton from "../../components/CTAButton";
import WindowLayout from "../../components/WindowCard/Window";

const AboutSection: React.FC = () => {
  return (
    <Section>
      <AccentedHeading
        textAs="h2"
        size="8"
        preText="My "
        accentedText="Story."
      />
      <Text as="p" size="2" className="opacity-90">
        Through over half a decade of software development experience, I've
        acquired extensive experience working on softaware projects across
        several industries, from telecommunications, lending, e-commerce, to
        insurance.
      </Text>
      <WindowLayout title="about me" padded LogoIcon={<CodeIcon />}>
        <Text as="p" size="2" weight="bold">Technologies</Text>
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
