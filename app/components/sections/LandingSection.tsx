import { Flex, Heading, Section, Text } from "@radix-ui/themes";
import CTAButton from "../CTAButton";

const LandingSection: React.FC = () => {
  return (
    <Section height="90vh">
      <Flex
        direction="column"
        height="100%"
        justify="center"
        align="center"
        flexGrow="1"
      >
        <Heading as="h1" className="mb-3 font-semibold">
          Shagan Plaatjies
        </Heading>
        <Text wrap="balance" as="p" align="center">
          Welcome to my personal portfolio. Home to my software development
          projects.
        </Text>
        <CTAButton href="/about" text="About Me" />
      </Flex>
    </Section>
  );
};

export default LandingSection;
