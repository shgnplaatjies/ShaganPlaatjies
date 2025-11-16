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
          preText="Building "
          accentedText="systems that scale, "
          postText="leading teams that deliver"
        />
        <Text
          wrap="balance"
          as="p"
          className="py-4 max-w-3xl opacity-80"
          align="center"
          size="2"
        >
          Over half a decade of architecting enterprise solutions, from fintech to live
          entertainment, merging technical depth with product vision and business strategy.
          I don&apos;t just write code; I build scalable systems, mentor engineering teams, and
          drive innovation at the intersection of technology and global impact.
        </Text>
        <CTAButton href="#about-me" text="More About Me" />
      </Flex>
    </Section>
  );
};

export default LandingSection;
