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
          preText="Let's get to Know "
          accentedText="each other "
          postText="better."
        />
        <Text wrap="balance" as="p" className="py-4" align="center">
          Let me introduce myself, my contributions, collaborations, workflows
          and the technologies I've used to bring projects to life.
        </Text>
        <CTAButton href="/about" text="About Me" />
      </Flex>
    </Section>
  );
};

export default LandingSection;
