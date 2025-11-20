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
          preText="Hi. I'm Shagan, "
          accentedText="Full Stack "
          postText="Engineer."
        />
        <Text wrap="balance" as="p" size="2" className="py-4 opacity-80" align="center">
          Explore my portfolio of technical projects and solutions delivered
          across various industries and platforms.
        </Text>
        <CTAButton href="/about" text="About Me" />
      </Flex>
    </Section>
  );
};

export default LandingSection;
