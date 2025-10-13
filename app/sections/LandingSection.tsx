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
          postText="Lead Software Engineer & Technical Product Lead"
        />
        <Text
          wrap="balance"
          as="p"
          size="2"
          className="py-4 text-center max-w-2xl opacity-80"
        >
          I architect and deliver patented technology for global audiences in live entertainment,
          having led teams and transformed legacy systems into high-performance microservices
          across fintech, insurance, and telecommunications. I solve complex problems at the
          intersection of scale, security, and innovation.
        </Text>
        <CTAButton href="/about" text="About Me" />
      </Flex>
    </Section>
  );
};

export { LandingSection };
