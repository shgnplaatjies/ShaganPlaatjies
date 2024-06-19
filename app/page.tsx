"use client";
import { Box, ScrollArea } from "@radix-ui/themes";
import { useRef } from "react";
import Orbs from "./components/Orbs";
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
      <ScrollArea ref={scrollAreaRef}>
        <Orbs pulseDuration={10000} className="flex w-full h-full absolute" />
        <Box className="h-full backdrop-blur-3xl bg-gradient-to-br">
          <LandingSection />
          <SkillsSection />
          <ProjectsSection />
          <AboutSection />
          <ContactSection />
        </Box>
      </ScrollArea>
    </ScrollContext.Provider>
  );
};

export default HomePage;
