import { Box, Grid, Section, Text } from "@radix-ui/themes";
import TerminalPrompt from "../../components/TerminalPrompt";
import HexDumpMetrics from "../../components/HexDumpMetrics";
import BorderAccent from "../../components/BorderAccent";
import DiffHighlight from "../../components/DiffHighlight";

const ImpactSection: React.FC = () => {
  const careerMetrics = [
    {
      value: "5+",
      label: "Years Enterprise Engineering",
      color: "text-radix-base-grass",
    },
    {
      value: "4",
      label: "Industries (Fintech, Insurance, Telecom, Entertainment)",
      color: "text-radix-base-blue",
    },
    {
      value: "3",
      label: "Developers Mentored as Technical Team Lead",
      color: "text-radix-base-violet",
    },
    {
      value: "4",
      label: "VodaPay Lending Products Delivered",
      color: "text-radix-base-amber",
    },
  ];

  const achievementDiff = [
    { type: "context" as const, content: "// Key Career Achievements", oldLineNum: 1, newLineNum: 1 },
    { type: "context" as const, content: "", oldLineNum: 2, newLineNum: 2 },
    { type: "add" as const, content: "+ Patented Technology Leadership", newLineNum: 3 },
    { type: "add" as const, content: "  Leading patented systems for global live entertainment", newLineNum: 4 },
    { type: "context" as const, content: "", oldLineNum: 3, newLineNum: 5 },
    { type: "add" as const, content: "+ Monolithic to Microservices Migration", newLineNum: 6 },
    { type: "add" as const, content: "  Architected BSure Insurance finance division transformation", newLineNum: 7 },
    { type: "context" as const, content: "", oldLineNum: 4, newLineNum: 8 },
    { type: "add" as const, content: "+ Complete Product Redesign", newLineNum: 9 },
    { type: "add" as const, content: "  Voucher Advance rebuilt with major UX/performance gains", newLineNum: 10 },
    { type: "context" as const, content: "", oldLineNum: 5, newLineNum: 11 },
    { type: "add" as const, content: "+ IC to Tech Lead Promotion", newLineNum: 12 },
    { type: "add" as const, content: "  Advanced within first year through demonstrated leadership", newLineNum: 13 },
  ];

  return (
    <Section className="py-8">
      <TerminalPrompt path="~/impact" command="cat metrics.bin" />

      <Text as="p" size="2" className="mb-6 opacity-70 font-mono text-xs">
        # Quantifying value across architecture, leadership, and innovation
      </Text>

      <div className="mb-6">
        <div className="font-mono text-xs opacity-50 mb-3">// MEMORY DUMP: Career Metrics</div>
        <HexDumpMetrics metrics={careerMetrics} />
      </div>

      <div className="mb-6">
        <div className="font-mono text-xs opacity-50 mb-3">// DIFF: Achievements Added</div>
        <DiffHighlight
          filePath="achievements.log"
          oldFile="achievements.log"
          newFile="achievements.log"
          lines={achievementDiff}
        />
      </div>

      <Grid columns={{ initial: "1", md: "2" }} gap="4">
        <BorderAccent color="border-radix-base-cyan" filePath="~/tech/cloud.md">
          <div className="font-mono text-xs mb-2 opacity-60"># Cloud Infrastructure</div>
          <div className="text-sm opacity-90">
            → AWS, Vercel, S3, Kafka<br />
            → Scalable distributed systems
          </div>
        </BorderAccent>

        <BorderAccent color="border-radix-base-green" filePath="~/tech/cicd.md">
          <div className="font-mono text-xs mb-2 opacity-60"># CI/CD Pipelines</div>
          <div className="text-sm opacity-90">
            → Automated deployments<br />
            → Zero-downtime releases
          </div>
        </BorderAccent>

        <BorderAccent color="border-radix-base-amber" filePath="~/tech/security.md">
          <div className="font-mono text-xs mb-2 opacity-60"># Security First</div>
          <div className="text-sm opacity-90">
            → Fintech compliance<br />
            → POPIA data protection
          </div>
        </BorderAccent>

        <BorderAccent color="border-radix-base-tomato" filePath="~/tech/architecture.md">
          <div className="font-mono text-xs mb-2 opacity-60"># Clean Architecture</div>
          <div className="text-sm opacity-90">
            → S.O.L.I.D principles<br />
            → Maintainable code patterns
          </div>
        </BorderAccent>
      </Grid>
    </Section>
  );
};

export default ImpactSection;
