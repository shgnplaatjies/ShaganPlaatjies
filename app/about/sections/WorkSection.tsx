import { Box, Heading, Section, Text } from "@radix-ui/themes";
import TimelineItem from "../../components/TimelineItem";

interface WorkEntry {
  hash?: string;
  branch?: string;
  title: string;
  company: string;
  period: string;
  description: string;
  stack: string;
  color: string;
  highlights?: string[];
}

const WorkSection: React.FC = () => {
  const workEntries: WorkEntry[] = [
    {
      title: "Lead Software Engineer",
      company: "Broadway Media",
      period: "Mar 2025 - Present",
      description:
        "Leading systems architecture and technical team for patented technology serving global live entertainment. Managing AWS infrastructure and Vercel deployments, conducting code reviews, and serving as technical liaison between management and engineering teams.",
      stack: "AWS, Vercel, React, TypeScript, Microservices",
      color: "text-radix-base-grass",
      highlights: [
        "Patented technology leadership at global scale",
        "AWS infrastructure and deployment management",
        "Code review and technical mentorship",
        "Strategic alignment with management",
      ],
    },
    {
      title: "Lead Software Engineer",
      company: "BSure Insurance Advisors",
      period: "Jan 2024 - Feb 2025",
      description:
        "Promoted to Technical Team Lead within first year. Architected and led finance division's transformation from monolithic to microservices architecture, introducing automated deployment practices and championing S.O.L.I.D principles.",
      stack: "C#, ASP.NET, MSSQL, React, Microservices, CI/CD",
      color: "text-radix-base-tomato",
      highlights: [
        "IC to Technical Team Lead promotion",
        "Microservices architecture design",
        "Automated deployment infrastructure",
        "Team mentorship and code quality",
      ],
    },
    {
      title: "Frontend Software Engineer",
      company: "Vodacom Financial Services",
      period: "Jan 2023 - Jan 2024",
      description:
        "Built solutions for 4 VodaPay lending products. Complete Voucher Advance redesign with enhanced UX and performance while maintaining legacy support and developing reusable React components from design specs.",
      stack: "React, TypeScript, Next.js, Fintech APIs",
      color: "text-radix-base-blue",
      highlights: [
        "Four VodaPay lending products delivered",
        "Complete product redesign and UX improvement",
        "Legacy system support during transition",
        "Reusable component architecture",
      ],
    },
    {
      title: "Full Stack Developer & Founder",
      company: "Pixelscape",
      period: "Jan 2024 - Jun 2024",
      description:
        "Built responsive websites and e-commerce platforms using React and WooCommerce API. Implemented email notifications, booking systems, and secure payment gateways with full POPIA and privacy compliance.",
      stack: "React, WooCommerce, Payment APIs, POPIA Compliance",
      color: "text-radix-base-orange",
      highlights: [
        "Dynamic, responsive website design",
        "E-commerce platform development",
        "Secure payment integration",
        "POPIA compliance implementation",
      ],
    },
  ];

  return (
    <Section className="py-12" id="work">
      <Box className="mb-8">
        <Heading as="h2" size="7" className="mb-3">
          Professional Experience
        </Heading>
        <Text as="p" size="2" className="opacity-70 max-w-2xl">
          Five years of delivering enterprise solutions across fintech, insurance,
          telecommunications, and live entertainment. Evolved from engineer to
          technical leader.
        </Text>
      </Box>

      <div className="space-y-8">
        {workEntries.map((entry, index) => (
          <Box key={index}>
            <div className="pb-8 border-b border-accent-6 border-opacity-20 last:border-b-0 last:pb-0">
              <div className="mb-4">
                <TimelineItem
                  company={entry.company}
                  period={entry.period}
                  description={entry.description}
                  color={entry.color}
                  highlights={entry.highlights || []}
                />
              </div>

              <div className="ml-0 mt-4">
                <Text as="span" size="1" className="opacity-60">
                  Tech Stack: {entry.stack}
                </Text>
              </div>
            </div>
          </Box>
        ))}
      </div>
    </Section>
  );
};

export default WorkSection;
