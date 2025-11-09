import { Heading, Section, Text, Box, Grid, Flex } from "@radix-ui/themes";
import React from "react";

interface TechCategoryProps {
  title: string;
  description: string;
  technologies: string[];
  icon?: string;
}

const TechCategory: React.FC<TechCategoryProps> = ({
  title,
  description,
  technologies,
  icon,
}) => {
  return (
    <Box className="group cursor-pointer">
      <div className="relative p-6 rounded-lg border border-accent-6 border-opacity-20 transition-all duration-300 hover:border-opacity-40 hover:bg-accent-2 hover:bg-opacity-10">
        <div className="flex items-start gap-3 mb-3">
          {icon && <span className="text-2xl">{icon}</span>}
          <Heading as="h3" size="4">
            {title}
          </Heading>
        </div>

        <Text as="p" size="2" className="mb-4 opacity-70">
          {description}
        </Text>

        <Flex wrap="wrap" gap="2">
          {technologies.map((tech) => (
            <div
              key={tech}
              className="px-2.5 py-1 rounded text-xs bg-accent-2 bg-opacity-30 text-accent-11 border border-accent-6 border-opacity-20 transition-all hover:bg-opacity-50"
            >
              {tech}
            </div>
          ))}
        </Flex>
      </div>
    </Box>
  );
};

const TechStackSectionRefined: React.FC = () => {
  const categories: TechCategoryProps[] = [
    {
      title: "Backend & APIs",
      description: "Enterprise-scale systems and microservice architecture",
      icon: "⚙️",
      technologies: [
        "C# & ASP.NET",
        "Django & Python",
        "Node.js",
        "Serverless & Lambda",
        "RESTful & GraphQL",
      ],
    },
    {
      title: "Frontend & UI",
      description: "Responsive, accessible interfaces with modern tooling",
      icon: "🎨",
      technologies: [
        "React & Vue",
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "Responsive Design",
      ],
    },
    {
      title: "Cloud & Data",
      description: "Scalable infrastructure and data-driven systems",
      icon: "☁️",
      technologies: [
        "AWS (S3, Kafka, Lambda)",
        "SQL & MSSQL",
        "Vercel",
        "CI/CD Automation",
        "Microservices",
      ],
    },
    {
      title: "DevOps & Tools",
      description: "Monitoring, deployment, and team collaboration",
      icon: "🔧",
      technologies: [
        "Git & GitHub",
        "Sentry",
        "Tealium",
        "Jira & ClickUp",
        "Automated Pipelines",
      ],
    },
    {
      title: "Practices & Patterns",
      description: "Software engineering excellence and best practices",
      icon: "📚",
      technologies: [
        "S.O.L.I.D Principles",
        "Clean Code",
        "TDD",
        "Code Review",
        "Agile",
      ],
    },
    {
      title: "Specialized Skills",
      description: "Industry-specific expertise and compliance",
      icon: "⭐",
      technologies: [
        "Fintech Integration",
        "POPIA & GDPR",
        "E-commerce",
        "Real-time Systems",
        "Enterprise Security",
      ],
    },
  ];

  return (
    <Section className="py-12" id="tech-stack">
      <Box className="mb-8">
        <Heading as="h2" size="8" className="mb-3">
          Technical Foundation
        </Heading>
        <Text as="p" size="2" className="opacity-70 max-w-2xl">
          A thoughtfully curated toolkit built over years of shipping production systems
          across fintech, insurance, entertainment, and enterprise contexts. Each technology
          was chosen for its impact on solving real problems at scale.
        </Text>
      </Box>

      <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="4" className="mt-8">
        {categories.map((category) => (
          <TechCategory key={category.title} {...category} />
        ))}
      </Grid>
    </Section>
  );
};

export default TechStackSectionRefined;
