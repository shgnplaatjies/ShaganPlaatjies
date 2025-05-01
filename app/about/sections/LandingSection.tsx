import { Flex, Section, Text } from "@radix-ui/themes";
import AccentedHeading from "../../components/AccentedHeading";
import CTAButton from "../../components/CTAButton";

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
          preText="Let's get to "
          accentedText="know each other"
          postText="."
        />
        <Text
          wrap="balance"
          as="p"
          className="py-4"
          align="center"
          size="4"
          weight="medium"
        >
          I'm Shagan, a Frontend Engineer from South Africa. My focus is on
          creating beautiful, functional digital experiences.
        </Text>
        <CTAButton href="#about-me" text="More About Me" />
      </Flex>
    </Section>
  );
};

export default LandingSection;
