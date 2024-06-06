import { Heading, Text } from "@radix-ui/themes";
import CTAButton from "../CTAButton";

const LandingSection: React.FC = () => {
  return (
    <section>
      <Heading as="h1" className="mb-3 font-semibold">
        Shagan Plaatjies
      </Heading>
      <Text as="p">
        Welcome to my personal portfolio. Home to my software development
        projects.
      </Text>
      <CTAButton href="/about" text="About Me" />
    </section>
  );
};

export default LandingSection;
