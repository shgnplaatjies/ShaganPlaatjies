import React from "react";
import { Footer } from "../components/Footer";
import {
  AboutSection,
  ImpactSection,
  LandingSection,
  TechStackSection,
  TestimonialsSection,
  WorkSection,
} from "./sections";

const AboutPage: React.FC = () => (
  <>
    <LandingSection />
    <AboutSection />
    <ImpactSection />
    <TechStackSection />
    <WorkSection />
    <TestimonialsSection />
    <Footer />
  </>
);

export default AboutPage;
