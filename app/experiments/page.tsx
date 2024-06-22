"use client";
import { Section } from "@radix-ui/themes";
import Footer from "../components/Footer";
import LandingSection from "../contact/sections/LandingSection";
import ExperimentsSection from "./sections/ExperimentsSection";

const ExperimentsPage: React.FC = () => {
  return (
    <>
      <LandingSection />
      <ExperimentsSection />
      <Section>
        <Footer />
      </Section>
    </>
  );
};

export default ExperimentsPage;
