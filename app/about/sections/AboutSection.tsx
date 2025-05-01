import { CodeIcon } from "@radix-ui/react-icons";
import { Box, Grid, Section, Text } from "@radix-ui/themes";
import AccentedHeading from "../../components/AccentedHeading";
import WindowLayout from "../../components/WindowCard/Window";

const AboutSection: React.FC = () => {
  return (
    <Section className="py-16" id="about-me">
      <AccentedHeading
        textAs="h2"
        size="8"
        preText="About "
        accentedText="Me"
      />

      <Grid columns={{ initial: "1", md: "2" }} gap="6" className="mt-8">
        <Box>
          <Text as="p" size="4" className="mb-6">
            Hi, I'm Shagan, a Frontend Engineer passionate about creating
            engaging user experiences and functional digital solutions.
          </Text>

          <Text as="p" size="4" className="mb-6">
            My focus is on modern web development: I integrate smooth animations
            and intuitive interfaces into my projects, presenting information in
            an engaging way that makes for a memorable user experience.
          </Text>

          <Text as="p" size="4" className="mb-6">
            I strive to deliver projects that are visually compelling while
            maintaining clean, well-structured code. I'm dedicated to optimal
            performance and thoughtful UX/UI design in everything I build.
          </Text>

          <Text as="p" size="4">
            My favorite technologies revolve around modern JavaScript
            frameworks. While my primary focus is frontend development, I'm
            comfortable working across the entire development process from
            design to deployment.
          </Text>
        </Box>

        <Box>
          <WindowLayout title="where-i-work" padded LogoIcon={<CodeIcon />}>
            <Text as="p" size="4" weight="bold" className="mb-4">
              Currently based in Sandton, South Africa 🇿🇦
            </Text>

            <Text as="p" size="4" className="mb-8">
              Available for remote collaborations across South Africa and
              worldwide 🌎
            </Text>

            <Text as="p" size="5" weight="bold" className="mb-4">
              My ideal collaborations:
            </Text>

            <Text as="p" size="3" className="mb-3">
              • Web agencies and digital design studios needing technical
              expertise
            </Text>
            <Text as="p" size="3" className="mb-3">
              • Independent professionals such as designers and developers
            </Text>
            <Text as="p" size="3" className="mb-3">
              • Innovative startups looking to create exceptional digital
              experiences
            </Text>
            <Text as="p" size="3">
              • Established companies seeking to modernize their digital
              presence
            </Text>
          </WindowLayout>
        </Box>
      </Grid>
    </Section>
  );
};

export default AboutSection;
