import { Flex, Section, Text } from "@radix-ui/themes";
import AccentedHeading from "../components/AccentedHeading";
import CTAButton from "../components/CTAButton";

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
        <AccentedHeading
          textAs="h1"
          align="center"
          size="9"
          preText="Hey there, I'm "
          accentedText="Shagan Plaatjies. "
          postText="I like building cool stuff."
        />
        <Text wrap="balance" as="p" className="py-4" align="center">
          Welcome to my personal portfolio. Home to my software development
          projects.
        </Text>
        <CTAButton href="/about" text="About Me" />
      </Flex>
    </Section>
  );
};

export { LandingSection };
