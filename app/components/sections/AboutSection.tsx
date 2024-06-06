import { Heading, Text } from "@radix-ui/themes";
import CTAButton from "../CTAButton";

const AboutSection: React.FC = () => {
  return (
    <section>
      <Heading as="h2" className="mb-3 font-semibold">
        Let&apos;s get to know each other
      </Heading>
      <Text as="p">
        Allow me to introduce myself, my work and my journey in software.
      </Text>
      <CTAButton href="/about" text="About Me" />
    </section>
  );
};

export default AboutSection;
