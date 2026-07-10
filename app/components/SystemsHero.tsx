import { Flex, Section, Text } from "@radix-ui/themes";
import AccentedHeading from "./AccentedHeading";
import CTAButton from "./CTAButton";
import TopologyDashboard from "./TopologyDashboard";
import { TopologyNode } from "../lib/topology";
import { CONTACT_INFO } from "../lib/constants";

export interface SystemsHeroProps {
  nodes: TopologyNode[];
  description: string;
}

const SystemsHero: React.FC<SystemsHeroProps> = ({ nodes, description }) => {
  return (
    <Section className="pt-2 pb-8 sm:pb-10 w-full min-w-0">
      <Flex direction="column" gap="1" className="mb-4">
        <Text
          size="1"
          className="uppercase tracking-widest"
          style={{ color: "var(--cyan-11)", fontFamily: "var(--font-space-mono)" }}
        >
          Software Engineer &amp; Product Lead · {CONTACT_INFO.location}
        </Text>

        <AccentedHeading
          textAs="h1"
          size="8"
          preText=""
          accentedText="Shagan"
          postText=" designs systems that don't go down."
          className="mt-1"
        />

        <Text wrap="balance" as="p" size="2" className="max-w-2xl opacity-80 mt-3">
          {description}
        </Text>

        <Flex gap="3" wrap="wrap" align="center" className="mt-1 mb-2">
          <CTAButton href="/#summary" text="About Me" />
          <a
            href="/downloads/shagan-plaatjies-resume.pdf"
            download
            className="inline-flex items-center px-8 py-3 font-semibold rounded-md border transition-colors hover:border-cyan-9"
            style={{ borderColor: "var(--gray-7)", color: "var(--gray-12)" }}
          >
            View résumé
          </a>
        </Flex>
      </Flex>

      <TopologyDashboard nodes={nodes} />
    </Section>
  );
};

export default SystemsHero;
