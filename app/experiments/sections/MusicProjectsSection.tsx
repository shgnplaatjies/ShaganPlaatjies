import { Section, Text, Heading, Box } from "@radix-ui/themes";
import AccentedHeading from "../../components/AccentedHeading";
import CTAButton from "../../components/CTAButton";

const MusicProjectsSection: React.FC = () => {
  return (
    <Section>
      <AccentedHeading
        textAs="h2"
        size="8"
        preText="My "
        accentedText="Story."
      />

      <Text as="p" size="2" className="mb-6 opacity-80 max-w-3xl">
        Combining my two passions: music and code. I explore the intersection of
        creative expression and technical innovation, experimenting with live
        music coding, generative music systems, and interactive audio
        experiences.
      </Text>

      <Box className="py-8">
        <Heading as="h3" size="5" className="mb-4">
          Explorations
        </Heading>
        <Text as="p" size="2" className="opacity-70">
          More details coming soon as I develop.
        </Text>
      </Box>

      <CTAButton href="/about" text="About Me" />
    </Section>
  );
};

export default MusicProjectsSection;
