import { getTechStackIcons } from "@/app/components/icons/TechStackIcons";
import { Box, Grid, Section, Text } from "@radix-ui/themes";
import AccentedHeading from "../../components/AccentedHeading";
import AnimatedIconStack from "../../components/AnimatedIconStack";

const TechStackSection: React.FC = () => {
  const techItems = getTechStackIcons();

  return (
    <Section className="py-8">
      <AccentedHeading
        textAs="h2"
        size="8"
        preText="Technical "
        accentedText="Arsenal"
      />

      <Text as="p" size="4" className="mb-4 opacity-80">
        Enterprise-grade technologies and frameworks powering mission-critical systems
        across multiple high-stakes industries.
      </Text>

      <Box className="mb-6">
        <AnimatedIconStack
          iconList={techItems}
          directionX="right"
          directionY="up"
          buttonClassName="flex justify-end sm:hidden"
          popoverClassName="bottom-12 right-1.5 mb-1"
        />
      </Box>

      <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="3">
        <Box>
          <Text as="p" size="5" weight="bold" className="mb-2 text-radix-base-green">
            Backend & APIs
          </Text>
          <Text as="p" size="3" className="mb-1">
            • C# & ASP.NET for enterprise systems
          </Text>
          <Text as="p" size="3" className="mb-1">
            • Django & Python for data-driven apps
          </Text>
          <Text as="p" size="3" className="mb-1">
            • Node.js for JavaScript backends
          </Text>
          <Text as="p" size="3" className="mb-1">
            • Serverless architecture & Lambda
          </Text>
          <Text as="p" size="3">
            • RESTful & GraphQL APIs
          </Text>
        </Box>

        <Box>
          <Text as="p" size="5" weight="bold" className="mb-2 text-radix-base-blue">
            Frontend & UI
          </Text>
          <Text as="p" size="3" className="mb-1">
            • React, Vue & AngularJS
          </Text>
          <Text as="p" size="3" className="mb-1">
            • Next.js for production apps
          </Text>
          <Text as="p" size="3" className="mb-1">
            • TypeScript for type safety
          </Text>
          <Text as="p" size="3" className="mb-1">
            • TailwindCSS & modern CSS
          </Text>
          <Text as="p" size="3">
            • Responsive & accessible design
          </Text>
        </Box>

        <Box>
          <Text as="p" size="5" weight="bold" className="mb-2 text-radix-base-violet">
            Data & Cloud
          </Text>
          <Text as="p" size="3" className="mb-1">
            • AWS (S3, Kafka, Lambda)
          </Text>
          <Text as="p" size="3" className="mb-1">
            • SQL & MSSQL databases
          </Text>
          <Text as="p" size="3" className="mb-1">
            • Vercel for deployment
          </Text>
          <Text as="p" size="3" className="mb-1">
            • CI/CD automation
          </Text>
          <Text as="p" size="3">
            • Microservices architecture
          </Text>
        </Box>

        <Box>
          <Text as="p" size="5" weight="bold" className="mb-2 text-radix-base-amber">
            DevOps & Monitoring
          </Text>
          <Text as="p" size="3" className="mb-1">
            • Git & GitHub workflows
          </Text>
          <Text as="p" size="3" className="mb-1">
            • Sentry for error tracking
          </Text>
          <Text as="p" size="3" className="mb-1">
            • Tealium for analytics
          </Text>
          <Text as="p" size="3" className="mb-1">
            • Jira & ClickUp for project mgmt
          </Text>
          <Text as="p" size="3">
            • Automated deployment pipelines
          </Text>
        </Box>

        <Box>
          <Text as="p" size="5" weight="bold" className="mb-2 text-radix-base-tomato">
            Practices & Patterns
          </Text>
          <Text as="p" size="3" className="mb-1">
            • S.O.L.I.D principles
          </Text>
          <Text as="p" size="3" className="mb-1">
            • Clean code architecture
          </Text>
          <Text as="p" size="3" className="mb-1">
            • Test-driven development
          </Text>
          <Text as="p" size="3" className="mb-1">
            • Code reviews & mentorship
          </Text>
          <Text as="p" size="3">
            • Agile methodologies
          </Text>
        </Box>

        <Box>
          <Text as="p" size="5" weight="bold" className="mb-2 text-radix-base-cyan">
            Specialized Skills
          </Text>
          <Text as="p" size="3" className="mb-1">
            • Fintech & payment integration
          </Text>
          <Text as="p" size="3" className="mb-1">
            • POPIA & GDPR compliance
          </Text>
          <Text as="p" size="3" className="mb-1">
            • E-commerce platforms
          </Text>
          <Text as="p" size="3" className="mb-1">
            • Real-time data systems
          </Text>
          <Text as="p" size="3">
            • Enterprise security
          </Text>
        </Box>
      </Grid>
    </Section>
  );
};

export default TechStackSection;
