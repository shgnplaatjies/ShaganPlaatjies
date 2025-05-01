import React from "react";
import { Footer } from "../components/Footer";
import {
  AboutSection,
  LandingSection,
  TechStackSection,
  TestimonialsSection,
  WorkSection,
} from "./sections";

const AboutPage: React.FC = () => (
  <>
    <LandingSection />
    <AboutSection />
    <TechStackSection />
    <WorkSection />
    <TestimonialsSection />
    <Footer />
  </>
);

export default AboutPage;
