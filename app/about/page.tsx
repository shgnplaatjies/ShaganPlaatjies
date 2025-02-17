"use client";
import { Section } from "@radix-ui/themes";
import Footer from "../components/Footer";
import AboutSection from "./sections/AboutSection";
import LandingSection from "./sections/LandingSection";
import TechStackSection from "./sections/TechStackSection";

const AboutPage: React.FC = () => (
  <>
    <LandingSection />
    <AboutSection />
    <TechStackSection />
    <Section>
      <Footer />
    </Section>
  </>
);

export default AboutPage;
