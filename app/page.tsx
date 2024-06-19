"use client";
import { ScrollArea } from "@radix-ui/themes";
import { useRef } from "react";
import AboutSection from "./components/sections/AboutSection";
import ContactSection from "./components/sections/ContactSection";
import LandingSection from "./components/sections/LandingSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import SkillsSection from "./components/sections/SkillsSection";
import { ScrollContext } from "./lib/context/ScrollContext";

const HomePage: React.FC = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollContext.Provider value={scrollAreaRef}>
      <ScrollArea>
        <LandingSection />
        <SkillsSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </ScrollArea>
    </ScrollContext.Provider>
  );
};

export default HomePage;
