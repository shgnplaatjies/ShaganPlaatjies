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
          preText="Hi, I'm "
          accentedText="Shagan, "
          postText="a Full Stack Software Engineer"
        />
        <Text
          wrap="balance"
          as="p"
          className="py-4 text-center max-w-2xl opacity-80"
        >
          I specialize in leading teams, modernizing legacy systems, and
          building secure, scalable solutions across finance, insurance, and
          data-driven industries.
        </Text>
        <CTAButton href="/about" text="About Me" />
      </Flex>
    </Section>
  );
};

export { LandingSection };
