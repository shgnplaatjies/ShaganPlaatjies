"use client";
import MusicProject from "@/app/components/tidal-cycles/MusicProject";
import { FirstSongPattern } from "@/app/lib/strudel/cycles";
import { Section, Text } from "@radix-ui/themes";
import AccentedHeading from "../../components/AccentedHeading";
import CTAButton from "../../components/CTAButton";

export type MusicProjectConfig = {
  title: string;
  description?: string;
  tidalCyclesCode: any;
};

const MusicProjects: MusicProjectConfig[] = [
  {
    title: "My first tidal cycles project",
    tidalCyclesCode: FirstSongPattern,
  },
];

const MusicProjectsSection: React.FC = () => {
  return (
    <Section>
      <AccentedHeading
        textAs="h2"
        size="8"
        preText="My "
        accentedText="Story."
      />

      <Text as="p">
        Combining my two passions, music and code with *Tidal Cycles*.
      </Text>

      {MusicProjects.map((project) => (
        <MusicProject key={project.title} project={project} />
      ))}

      <CTAButton href="/about" text="About Me" />
    </Section>
  );
};

export default MusicProjectsSection;
