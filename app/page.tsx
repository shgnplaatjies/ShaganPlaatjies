"use client";
import Footer from "./components/Footer";
import { AboutMeSection } from "./sections/AboutMeSection";
import { LandingSection } from "./sections/LandingSection";

const HomePage: React.FC = () => {
  return (
    <>
      <LandingSection />
      <AboutMeSection />
      <Footer />
    </>
  );
};

export default HomePage;
