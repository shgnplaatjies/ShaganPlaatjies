import { Flex, Section, Text } from "@radix-ui/themes";
import AccentedHeading from "../AccentedHeading";
import CTAButton from "../CTAButton";

export interface GenericLandingSectionProps {
  description: string;
}

const GenericLandingSection: React.FC<GenericLandingSectionProps> = ({ description }) => {
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
          {description}
        </Text>
        <CTAButton href="/about" text="About Me" />
      </Flex>
    </Section>
  );
};

export default GenericLandingSection;
