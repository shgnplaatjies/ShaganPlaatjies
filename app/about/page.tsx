"use client";
import { Footer } from "../components/Footer";
import AboutSection from "./sections/AboutSection";
import LandingSection from "./sections/LandingSection";
import TechStackSection from "./sections/TechStackSection";

const AboutPage: React.FC = () => (
  <>
    <LandingSection />
    <AboutSection />
    <TechStackSection />
    <Footer />
  </>
);

export default AboutPage;
