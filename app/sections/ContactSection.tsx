import { Section, Text } from "@radix-ui/themes";
import AccentedHeading from "../components/AccentedHeading";
import CTAButton from "../components/CTAButton";

const ContactSection: React.FC = () => {
  return (
    <Section>
      <AccentedHeading
        textAs="h2"
        size="8"
        preText="Reach "
        accentedText="Out."
      />
      <Text as="p">
        Do you have a project in mind? Want to work together? Or just want to
        have a chat? Reach out to me below, let&apos;s connect!
      </Text>
      <CTAButton href="/contact" text="Get in touch" />
    </Section>
  );
};

export default ContactSection;
