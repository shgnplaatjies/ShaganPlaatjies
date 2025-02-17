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
          preText="A collection of "
          accentedText="my best "
          postText="best projects."
        />
        <Text wrap="balance" as="p" className="py-4" align="center">
          Through over half a decade of software development experience, I've
          acquired extensive experience working on softaware projects across
          several industries, from telecommunications, lending, e-commerce, to
          insurance.
        </Text>
        <CTAButton href="/about" text="About Me" />
      </Flex>
    </Section>
  );
};

export default LandingSection;
