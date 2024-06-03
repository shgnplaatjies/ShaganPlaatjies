import { Heading, Text } from "@radix-ui/themes";
import CTAButton from "../CTAButton";

const ContactSection: React.FC = () => {
  return (
    <section>
      <Heading as="h2" className="mb-3 font-semibold">
        Get in touch!
      </Heading>
      <Text as="p">
        Do you have a project in mind? Want to work together? Or just want to
        have a chat? Reach out to me below, let&apos;s connect!
      </Text>
      <CTAButton href="/contact" text="Get in touch" />
    </section>
  );
};

export default ContactSection;
