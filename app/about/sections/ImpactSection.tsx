import { Box, Grid, Section, Text } from "@radix-ui/themes";
import AccentedHeading from "../../components/AccentedHeading";
import WindowLayout from "../../components/WindowCard/Window";

interface MetricCardProps {
  value: string;
  label: string;
  description: string;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  description,
  color,
}) => (
  <Box>
    <Text
      as="p"
      size="8"
      weight="bold"
      className={`mb-2 ${color}`}
      style={{ lineHeight: 1 }}
    >
      {value}
    </Text>
    <Text as="p" size="4" weight="bold" className="mb-2">
      {label}
    </Text>
    <Text as="p" size="2" className="opacity-70">
      {description}
    </Text>
  </Box>
);

const ImpactSection: React.FC = () => {
  return (
    <Section className="py-16">
      <AccentedHeading
        textAs="h2"
        size="8"
        preText="Measurable "
        accentedText="Impact"
      />

      <Text as="p" size="4" className="mb-8 opacity-80">
        Quantifying the value delivered across systems architecture, team leadership,
        and technical innovation.
      </Text>

      <Grid columns={{ initial: "1", md: "2" }} gap="6" className="mb-8">
        <WindowLayout title="career-metrics.yml" padded>
          <Grid columns={{ initial: "2" }} gap="6">
            <MetricCard
              value="5+"
              label="Years"
              description="Enterprise software engineering"
              color="text-radix-base-grass"
            />
            <MetricCard
              value="4"
              label="Industries"
              description="Fintech, insurance, telecom, entertainment"
              color="text-radix-base-blue"
            />
            <MetricCard
              value="3"
              label="Developers"
              description="Mentored as Technical Team Lead"
              color="text-radix-base-violet"
            />
            <MetricCard
              value="4"
              label="Products"
              description="VodaPay lending solutions delivered"
              color="text-radix-base-amber"
            />
          </Grid>
        </WindowLayout>

        <WindowLayout title="key-achievements.log" padded>
          <Box className="space-y-4">
            <Box>
              <Text as="p" size="3" weight="bold" className="text-radix-base-grass mb-1">
                Patented Technology Leadership
              </Text>
              <Text as="p" size="2" className="opacity-70">
                Leading development of patented systems serving global live entertainment audiences
              </Text>
            </Box>
            <Box>
              <Text as="p" size="3" weight="bold" className="text-radix-base-tomato mb-1">
                Monolithic to Microservices Migration
              </Text>
              <Text as="p" size="2" className="opacity-70">
                Architected and led finance division transformation at BSure Insurance
              </Text>
            </Box>
            <Box>
              <Text as="p" size="3" weight="bold" className="text-radix-base-blue mb-1">
                Complete Product Redesign
              </Text>
              <Text as="p" size="2" className="opacity-70">
                Voucher Advance rebuilt from scratch with significant UX/performance gains
              </Text>
            </Box>
            <Box>
              <Text as="p" size="3" weight="bold" className="text-radix-base-violet mb-1">
                IC to Tech Lead Promotion
              </Text>
              <Text as="p" size="2" className="opacity-70">
                Advanced within first year at BSure through demonstrated leadership
              </Text>
            </Box>
          </Box>
        </WindowLayout>
      </Grid>

      <WindowLayout title="technical-contributions.md" padded>
        <Grid columns={{ initial: "1", sm: "2", md: "4" }} gap="4">
          <Box className="text-center">
            <Text as="p" size="2" weight="bold" className="mb-1 text-radix-base-cyan">
              Cloud Infrastructure
            </Text>
            <Text as="p" size="1" className="opacity-60">
              AWS, Vercel, S3, Kafka
            </Text>
          </Box>
          <Box className="text-center">
            <Text as="p" size="2" weight="bold" className="mb-1 text-radix-base-green">
              CI/CD Pipelines
            </Text>
            <Text as="p" size="1" className="opacity-60">
              Automated deployments
            </Text>
          </Box>
          <Box className="text-center">
            <Text as="p" size="2" weight="bold" className="mb-1 text-radix-base-amber">
              Security First
            </Text>
            <Text as="p" size="1" className="opacity-60">
              Fintech & POPIA compliance
            </Text>
          </Box>
          <Box className="text-center">
            <Text as="p" size="2" weight="bold" className="mb-1 text-radix-base-tomato">
              Clean Architecture
            </Text>
            <Text as="p" size="1" className="opacity-60">
              S.O.L.I.D principles
            </Text>
          </Box>
        </Grid>
      </WindowLayout>
    </Section>
  );
};

export default ImpactSection;
