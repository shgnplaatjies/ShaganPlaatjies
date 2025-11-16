import { Box, Grid, Heading, Section, Text } from "@radix-ui/themes";
import React from "react";

interface StatCard {
  value: string;
  label: string;
  color: string;
}

interface AreaOfExpertise {
  title: string;
  description: string;
  color: string;
}

const StatCard: React.FC<StatCard> = ({ value, label, color }) => (
  <Box className="group">
    <div className="p-6 rounded-lg border border-accent-6 border-opacity-20 transition-all duration-300 hover:border-opacity-40 hover:bg-accent-2 hover:bg-opacity-10">
      <div className={`text-4xl font-bold ${color} mb-2`}>{value}</div>
      <Text as="p" size="2" className="opacity-70">
        {label}
      </Text>
    </div>
  </Box>
);

const ExpertiseCard: React.FC<AreaOfExpertise> = ({
  title,
  description,
  color,
}) => (
  <Box className="group">
    <div className="relative p-6 rounded-lg border border-accent-6 border-opacity-20 transition-all duration-300 hover:border-opacity-40 hover:bg-accent-2 hover:bg-opacity-10">
      <div
        className={`absolute top-0 left-0 w-1 h-8 rounded-br ${color} opacity-0 group-hover:opacity-100 transition-opacity`}
      />
      <Heading as="h4" size="3" className="mb-3">
        {title}
      </Heading>
      <Text as="p" size="2" className="opacity-70">
        {description}
      </Text>
    </div>
  </Box>
);

const ImpactSection: React.FC = () => {
  const stats: StatCard[] = [
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

  const expertise: AreaOfExpertise[] = [
    {
      title: "Patented Technology Leadership",
      description:
        "Leading patented systems for global live entertainment at Broadway Media, handling performance and scale at international level.",
      color: "bg-radix-base-grass",
    },
    {
      title: "Monolithic to Microservices",
      description:
        "Architected BSure Insurance finance division's transformation from monolithic to microservices architecture.",
      color: "bg-radix-base-blue",
    },
    {
      title: "Complete Product Redesign",
      description:
        "Rebuilt Voucher Advance lending product with major UX and performance improvements while maintaining legacy support.",
      color: "bg-radix-base-violet",
    },
    {
      title: "Individual to Technical Lead",
      description:
        "Promoted to Technical Team Lead within first year, demonstrating leadership through mentorship and architecture design.",
      color: "bg-radix-base-amber",
    },
  ];

  return (
    <Section className="py-12" id="impact">
      <Box className="mb-8">
        <Heading as="h2" size="7" className="mb-3">
          Quantifying Impact
        </Heading>
        <Text as="p" size="2" className="opacity-70 max-w-2xl">
          Career achievements measured across architecture, leadership, and
          innovation across diverse industries and technical domains.
        </Text>
      </Box>

      <div className="mb-12">
        <Grid columns={{ initial: "1", md: "2" }} gap="4">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              color={stat.color}
            />
          ))}
        </Grid>
      </div>

      <Box className="mb-4">
        <Heading as="h3" size="5" className="mb-6">
          Key Achievements
        </Heading>
        <Grid columns={{ initial: "1", md: "2" }} gap="4">
          {expertise.map((area) => (
            <ExpertiseCard
              key={area.title}
              title={area.title}
              description={area.description}
              color={area.color}
            />
          ))}
        </Grid>
      </Box>
    </Section>
  );
};

export default ImpactSection;
