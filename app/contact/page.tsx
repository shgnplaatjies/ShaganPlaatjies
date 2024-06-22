"use client";
import { Section } from "@radix-ui/themes";
import Footer from "../components/Footer";
import LandingSection from "../contact/sections/LandingSection";
import ContactSection from "../sections/ContactSection";

const ContactPage: React.FC = () => {
  return (
    <>
      <LandingSection />
      <ContactSection />
      <Section>
        <Footer />
      </Section>
    </>
  );
};

export default ContactPage;
