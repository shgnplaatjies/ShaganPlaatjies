import { Section } from "@radix-ui/themes";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/Footer";
import LandingSection from "./sections/LandingSection";

const ContactPage: React.FC = () => {
  return (
    <>
      <LandingSection />

      <Section>
        <ContactForm />
      </Section>

      <Footer />
    </>
  );
};

export default ContactPage;
