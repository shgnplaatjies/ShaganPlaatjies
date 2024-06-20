"use client";
import { Box, ScrollArea } from "@radix-ui/themes";
import { useRef } from "react";
import Orbs from "./components/Orbs";

import AboutSection from "./components/sections/AboutSection";
import ContactSection from "./components/sections/ContactSection";
import LandingSection from "./components/sections/LandingSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import SkillsSection from "./components/sections/SkillsSection";

const HomePage: React.FC = () => {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  return (
    <ScrollArea ref={scrollAreaRef}>
      <Orbs
        pulseDuration={10000}
        className="w-full h-full absolute"
        scrollRef={scrollAreaRef}
      />
      <Box className="backdrop-blur-3xl bg-gradient-to-br px-4">
        <LandingSection />
        <SkillsSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </Box>
    </ScrollArea>
  );
};

export default HomePage;
