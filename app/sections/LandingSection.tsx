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
          preText="Hi, I&apos;m "
          accentedText="Shagan"
          postText=""
        />
        <Text
          wrap="balance"
          as="p"
          size="2"
          className="py-4 text-center max-w-2xl opacity-80"
        >
          I build software for global entertainment platforms, leading technical delivery from architecture through production.
        </Text>
        <CTAButton href="/about" text="About Me" />
      </Flex>
    </Section>
  );
};

export { LandingSection };
