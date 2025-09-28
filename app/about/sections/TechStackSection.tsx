import { getTechStackIcons } from "@/app/components/icons/TechStackIcons";
import { Box, Grid, Section, Text } from "@radix-ui/themes";
import AccentedHeading from "../../components/AccentedHeading";
import AnimatedIconStack from "../../components/AnimatedIconStack";

const TechStackSection: React.FC = () => {
  const techItems = getTechStackIcons();

  return (
    <Section className="py-16">
      <AccentedHeading
        textAs="h2"
        size="8"
        preText="Tech I "
        accentedText="Work With"
      />

      <Text as="p" size="4" className="mb-8">
        Here are some of the technologies I enjoy using in my projects.
      </Text>

      <Box className="mb-12">
        <AnimatedIconStack
          iconList={techItems}
          directionX="right"
          directionY="up"
          buttonClassName="flex justify-end sm:hidden"
          popoverClassName="bottom-12 right-1.5 mb-1"
        />
      </Box>

      <Grid columns={{ initial: "1", sm: "2" }} gap="6">
        <Box>
          <Text as="p" size="5" weight="bold" className="mb-4">
            Frontend
          </Text>
          <Text as="p" size="3" className="mb-2">
            • React & Next.js for powerful, interactive UIs
          </Text>
          <Text as="p" size="3" className="mb-2">
            • TypeScript for type-safe code
          </Text>
          <Text as="p" size="3" className="mb-2">
            • TailwindCSS for rapid, responsive styling
          </Text>
          <Text as="p" size="3" className="mb-2">
            • GSAP for smooth animations
          </Text>
          <Text as="p" size="3">
            • Modern JavaScript (ES6+)
          </Text>
        </Box>

        <Box>
          <Text as="p" size="5" weight="bold" className="mb-4">
            Tools & Platforms
          </Text>
          <Text as="p" size="3" className="mb-2">
            • Git & GitHub for version control
          </Text>
          <Text as="p" size="3" className="mb-2">
            • Figma for design collaboration
          </Text>
          <Text as="p" size="3" className="mb-2">
            • Vercel for hosting and deployment
          </Text>
          <Text as="p" size="3" className="mb-2">
            • VS Code as my editor of choice
          </Text>
          <Text as="p" size="3">
            • Netlify for simple site hosting
          </Text>
        </Box>
      </Grid>
    </Section>
  );
};

export default TechStackSection;
