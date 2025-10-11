import { Section, Text } from "@radix-ui/themes";
import GitCommitTimeline from "../../components/GitCommitTimeline";
import TerminalPrompt from "../../components/TerminalPrompt";

const WorkSection: React.FC = () => {
  const commits = [
    {
      hash: "a1b2c3d",
      branch: "main",
      title: "Lead Software Engineer @ Broadway Media",
      company: "Broadway Media",
      period: "Mar 2025 - Present",
      description: (
        <ul className="list-none space-y-1 text-sm">
          <li>• Design and implement scalable systems architecture for global scale</li>
          <li>• Manage AWS services and Vercel deployment environments</li>
          <li>• Conduct code reviews and provide technical mentorship</li>
          <li>• Collaborate with management on milestones, deliverables, and technical strategy</li>
        </ul>
      ),
      stack: "AWS, Vercel, React, TypeScript, Microservices",
      color: "text-radix-base-grass",
    },
    {
      hash: "d4e5f6g",
      title: "Lead Software Engineer @ BSure Insurance Advisors",
      company: "BSure Insurance Advisors",
      period: "Jan 2024 - Feb 2025",
      description: (
        <ul className="list-none space-y-1 text-sm">
          <li>• Promoted to Technical Team Lead within first year</li>
          <li>• Architected and led finance division's microservice migration</li>
          <li>• Introduced automated deployment architecture across all projects</li>
          <li>• Championed S.O.L.I.D principles and clean code practices</li>
        </ul>
      ),
      stack: "C#, ASP.NET, MSSQL, React, Microservices, CI/CD",
      color: "text-radix-base-tomato",
    },
    {
      hash: "h7i8j9k",
      title: "Frontend Software Engineer @ Vodacom (BBD Consultant)",
      company: "Vodacom Financial Services",
      period: "Jan 2023 - Jan 2024",
      description: (
        <ul className="list-none space-y-1 text-sm">
          <li>• Built solutions for 4 VodaPay lending products</li>
          <li>• Complete Voucher Advance redesign with enhanced UX/performance</li>
          <li>• Maintained legacy support during transition period</li>
          <li>• Developed reusable, maintainable React applications from Figma designs</li>
        </ul>
      ),
      stack: "React, TypeScript, Next.js, Fintech APIs",
      color: "text-radix-base-blue",
    },
    {
      hash: "m1n2o3p",
      title: "Full Stack Developer @ Pixelscape (Founder)",
      company: "Pixelscape",
      period: "Jan 2024 - Jun 2024",
      description: (
        <ul className="list-none space-y-1 text-sm">
          <li>• Dynamic, responsive websites with modern design</li>
          <li>• E-commerce platforms using React and WooCommerce API</li>
          <li>• Email notifications, booking systems, secure payment gateways</li>
          <li>• Full POPIA and privacy compliance implementation</li>
        </ul>
      ),
      stack: "React, WooCommerce, Payment APIs, POPIA Compliance",
      color: "text-radix-base-orange",
    },
  ];

  return (
    <Section className="py-8">
      <TerminalPrompt path="~/career" command="git log --oneline --graph" />

      <Text as="p" size="3" className="mb-6 opacity-70 font-mono">
        From frontend developer to technical lead: five years of delivering enterprise solutions
        across fintech, insurance, telecommunications, and live entertainment.
      </Text>

      <GitCommitTimeline commits={commits} />
    </Section>
  );
};

export default WorkSection;
