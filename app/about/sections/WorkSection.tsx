import { CodeIcon, GlobeIcon } from "@radix-ui/react-icons";
import { Grid, Section, Text } from "@radix-ui/themes";
import AccentedHeading from "../../components/AccentedHeading";
import WindowLayout from "../../components/WindowCard/Window";

const WorkSection: React.FC = () => {
  return (
    <Section className="py-16">
      <AccentedHeading textAs="h2" size="8" preText="My " accentedText="Work" />

      <Text as="p" size="4" className="mb-8">
        Selected projects I've built throughout my career.
      </Text>

      <Grid columns={{ initial: "1", md: "2" }} gap="6">
        <WindowLayout title="projects" padded LogoIcon={<CodeIcon />}>
          <Text as="p" size="5" weight="bold" className="mb-4">
            Dexter Tuition
          </Text>
          <Text as="p" size="3" className="mb-6">
            An educational platform that connects students with tutors,
            featuring a modern UI built with React and a robust backend system.
          </Text>

          <Text as="p" size="5" weight="bold" className="mb-4">
            Dulcey Beauty Lounge
          </Text>
          <Text as="p" size="3" className="mb-6">
            A beautiful, fully responsive website for a beauty salon, crafted
            with attention to design details and smooth animations.
          </Text>

          <Text as="p" size="5" weight="bold" className="mb-4">
            Vodacom Vouchers
          </Text>
          <Text as="p" size="3">
            A digital voucher system for Vodacom customers, featuring a clean
            interface and secure transaction processing.
          </Text>
        </WindowLayout>

        <WindowLayout title="experience" padded LogoIcon={<GlobeIcon />}>
          <Text as="p" size="5" weight="bold" className="mb-2">
            Frontend Engineer
          </Text>
          <Text as="p" size="3" className="mb-6">
            Specializing in creating responsive, user-friendly interfaces with
            React, Next.js, and modern CSS frameworks. Experienced in
            implementing complex animations and interactive elements.
          </Text>

          <Text as="p" size="5" weight="bold" className="mb-2">
            UI/UX Developer
          </Text>
          <Text as="p" size="3" className="mb-6">
            Bridging the gap between design and development to create seamless
            user experiences. Working closely with designers to bring concepts
            to life with pixel-perfect implementation.
          </Text>

          <Text as="p" size="5" weight="bold" className="mb-2">
            Full Stack Developer
          </Text>
          <Text as="p" size="3">
            Building complete web applications from frontend to backend,
            utilizing technologies like Node.js, Express, and various database
            systems.
          </Text>
        </WindowLayout>
      </Grid>
    </Section>
  );
};

export default WorkSection;
