import { CodeIcon } from "@radix-ui/react-icons";
import { Heading, Section, Text } from "@radix-ui/themes";
import CTAButton from "../CTAButton";
import WindowLayout from "../Window";

const AboutSection: React.FC = () => {
  return (
    <Section>
      <Heading as="h2" className="mb-3 font-semibold">
        Let&apos;s get to know each other
      </Heading>
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
