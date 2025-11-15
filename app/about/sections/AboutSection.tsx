import { CodeIcon } from "@radix-ui/react-icons";
import { Box, Grid, Section, Text } from "@radix-ui/themes";
import AccentedHeading from "../../components/AccentedHeading";
import DecorativeWindow from "../../components/DecorativeWindow";

const AboutSection: React.FC = () => {
  return (
    <Section className="py-8" id="about-me">
      <AccentedHeading
        textAs="h2"
        size="8"
        preText="About "
        accentedText="Me"
      />

      <Grid columns={{ initial: "1", md: "2" }} gap="3" className="mt-4">
        <Box>
          <Text as="p" size="2" className="mb-3 opacity-90">
            I'm a Software Engineer and Product Lead with over five years
            architecting mission-critical systems across high-stakes industries.
            Currently, I lead development of patented technology at Broadway
            Media, solving complex problems of performance, security, and scale
            for a global audience in live entertainment.
          </Text>

          <Text as="p" size="2" className="mb-3 opacity-90">
            My approach merges deep technical expertise with product and
            business strategy. At BSure Insurance, I elevated from individual
            contributor to Technical Team Lead, guiding three junior developers
            while spearheading the finance division's migration from monolithic
            architecture to a robust microservice solution, transforming their
            operational capabilities and introducing automated deployment
            practices.
          </Text>

          <Text as="p" size="2" className="mb-3 opacity-90">
            At Vodacom Financial Services, I delivered high-impact frontend
            solutions for four VodaPay lending products, redesigning Voucher
            Advance from the ground up while maintaining legacy support,
            achieving significant improvements in usability, performance, and
            user satisfaction.
          </Text>

          <Text as="p" size="2" className="opacity-90">
            I advocate for software design excellence through S.O.L.I.D
            principles, clean code practices, and enterprise-grade
            implementations. Beyond corporate work, I founded Pixelscape,
            building data-driven web solutions and e-commerce platforms with
            full POPIA compliance for local businesses, demonstrating
            versatility across contexts and scales.
          </Text>
        </Box>

        <Box>
          <DecorativeWindow
            title="philosophy.md"
            theme="vscode"
            showDots={true}
            LogoIcon={<CodeIcon />}
            padded
          >
            <Text as="p" size="3" weight="bold" className="mb-4">
              My Engineering Philosophy
            </Text>

            <Text as="p" size="2" className="mb-4 opacity-90">
              <span className="text-radix-base-grass font-semibold">
                Scale-First Thinking
              </span>
              <br />
              Every system I design anticipates growth. From database
              architecture to API design, I build for tomorrow's demands, not
              just today's requirements.
            </Text>

            <Text as="p" size="2" className="mb-4 opacity-90">
              <span className="text-radix-base-blue font-semibold">
                Security as Foundation
              </span>
              <br />
              Having worked across fintech and insurance, I treat security not
              as an afterthought but as a foundational principle embedded in
              every architectural decision.
            </Text>

            <Text as="p" size="2" className="mb-4 opacity-90">
              <span className="text-radix-base-violet font-semibold">
                Team Elevation
              </span>
              <br />
              Technical leadership means growing others. Through code reviews,
              mentorship, and knowledge sharing, I elevate entire teams'
              capabilities and confidence.
            </Text>

            <Text as="p" size="2" className="opacity-90">
              <span className="text-radix-base-amber font-semibold">
                Business-Aligned Engineering
              </span>
              <br />
              Technology serves business goals. I bridge the gap between
              stakeholder needs and technical implementation, ensuring solutions
              deliver measurable impact.
            </Text>
          </DecorativeWindow>
        </Box>
      </Grid>
    </Section>
  );
};

export default AboutSection;
