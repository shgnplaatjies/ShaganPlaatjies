import { Section } from "@radix-ui/themes";
import { ElegantContactForm } from "../components/ElegantContactForm";
import { Footer } from "../components/Footer";
import LandingSection from "./sections/LandingSection";

const ContactPage: React.FC = () => {
  return (
    <>
      <LandingSection />

      <Section className="px-[5%] md:px-[10%] xl:px-[15%]">
        <ElegantContactForm />
      </Section>

      <Footer />
    </>
  );
};

export default ContactPage;
