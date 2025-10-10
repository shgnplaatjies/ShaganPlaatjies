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
          preText="Enterprise "
          accentedText="solutions "
          postText="that drive impact"
        />
        <Text wrap="balance" as="p" className="py-4 max-w-3xl" align="center">
          Over half a decade architecting and delivering mission-critical systems across
          fintech, insurance, telecommunications, and live entertainment. From patented
          global-scale platforms to complex microservice migrations, each project represents
          technical excellence, scalable architecture, and measurable business value.
        </Text>
        <CTAButton href="/about" text="About Me" />
      </Flex>
    </Section>
  );
};

export default LandingSection;
