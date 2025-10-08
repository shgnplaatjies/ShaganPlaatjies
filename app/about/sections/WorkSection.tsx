import { CodeIcon, GlobeIcon } from "@radix-ui/react-icons";
import { Grid, Section, Text } from "@radix-ui/themes";
import AccentedHeading from "../../components/AccentedHeading";
import WindowLayout from "../../components/WindowCard/Window";

const WorkSection: React.FC = () => {
  return (
    <Section className="py-16">
      <AccentedHeading textAs="h2" size="8" preText="Career " accentedText="Timeline" />

      <Text as="p" size="4" className="mb-8 opacity-80">
        From frontend developer to technical lead—five years of delivering enterprise solutions
        across fintech, insurance, telecommunications, and live entertainment.
      </Text>

      <Grid columns={{ initial: "1", md: "1" }} gap="6">
        <WindowLayout title="broadway-media_2025-present.ts" padded LogoIcon={<CodeIcon />}>
          <Text as="p" size="5" weight="bold" className="mb-2 text-radix-base-grass">
            Lead Software Engineer @ Broadway Media
          </Text>
          <Text as="p" size="2" className="mb-4 opacity-60">
            Mar 2025 – Present | Full-time
          </Text>

          <Text as="p" size="3" className="mb-4">
            Leading systems architecture design and technical implementation for patented technology
            serving global live entertainment audiences. Providing technical leadership to engineering
            team while managing cloud infrastructure and serving as technical liaison to management.
          </Text>

          <Text as="p" size="3" className="mb-2 font-semibold">Key Responsibilities:</Text>
          <Text as="p" size="3" className="mb-2">
            • Design and implement scalable systems architecture for global scale
          </Text>
          <Text as="p" size="3" className="mb-2">
            • Manage AWS services and Vercel deployment environments
          </Text>
          <Text as="p" size="3" className="mb-2">
            • Conduct code reviews and provide technical mentorship
          </Text>
          <Text as="p" size="3" className="mb-4">
            • Collaborate with management on milestones, deliverables, and technical strategy
          </Text>

          <Text as="p" size="3">
            <span className="text-radix-base-cyan">Stack:</span> AWS, Vercel, React, TypeScript, Microservices
          </Text>
        </WindowLayout>

        <WindowLayout title="bsure-insurance_2024-2025.cs" padded LogoIcon={<CodeIcon />}>
          <Text as="p" size="5" weight="bold" className="mb-2 text-radix-base-tomato">
            Lead Software Engineer @ BSure Insurance Advisors
          </Text>
          <Text as="p" size="2" className="mb-4 opacity-60">
            Jan 2024 – Feb 2025 | Full-time
          </Text>

          <Text as="p" size="3" className="mb-4">
            Advanced from individual contributor to Technical Team Lead, guiding three junior
            developers and driving their professional growth. Led transformative migration of
            finance division from monolithic architecture to robust, secure microservice solution.
          </Text>

          <Text as="p" size="3" className="mb-2 font-semibold">Major Achievements:</Text>
          <Text as="p" size="3" className="mb-2">
            • Promoted to Technical Team Lead within first year
          </Text>
          <Text as="p" size="3" className="mb-2">
            • Architected and led finance division's microservice migration
          </Text>
          <Text as="p" size="3" className="mb-2">
            • Introduced automated deployment architecture across all projects
          </Text>
          <Text as="p" size="3" className="mb-4">
            • Championed S.O.L.I.D principles and clean code practices
          </Text>

          <Text as="p" size="3">
            <span className="text-radix-base-blue">Stack:</span> C#, ASP.NET, MSSQL, React, Microservices, CI/CD
          </Text>
        </WindowLayout>

        <WindowLayout title="vodacom_2023-2024.tsx" padded LogoIcon={<CodeIcon />}>
          <Text as="p" size="5" weight="bold" className="mb-2 text-radix-base-blue">
            Frontend Software Engineer @ Vodacom (BBD Consultant)
          </Text>
          <Text as="p" size="2" className="mb-4 opacity-60">
            Jan 2023 – Jan 2024 | 1-Year Contract
          </Text>

          <Text as="p" size="3" className="mb-4">
            Delivered impactful frontend solutions for Vodacom Financial Services' lending products
            on VodaPay. Redesigned Voucher Advance from scratch while maintaining legacy system,
            achieving significant UX and performance improvements.
          </Text>

          <Text as="p" size="3" className="mb-2 font-semibold">Impact:</Text>
          <Text as="p" size="3" className="mb-2">
            • Built solutions for 4 VodaPay lending products
          </Text>
          <Text as="p" size="3" className="mb-2">
            • Complete Voucher Advance redesign with enhanced UX/performance
          </Text>
          <Text as="p" size="3" className="mb-2">
            • Maintained legacy support during transition period
          </Text>
          <Text as="p" size="3" className="mb-4">
            • Developed reusable, maintainable React applications from Figma designs
          </Text>

          <Text as="p" size="3">
            <span className="text-radix-base-violet">Stack:</span> React, TypeScript, Next.js, Fintech APIs
          </Text>
        </WindowLayout>

        <WindowLayout title="pixelscape_freelance.js" padded LogoIcon={<GlobeIcon />}>
          <Text as="p" size="5" weight="bold" className="mb-2 text-radix-base-orange">
            Full Stack Developer @ Pixelscape (Founder)
          </Text>
          <Text as="p" size="2" className="mb-4 opacity-60">
            Jan 2024 – Jun 2024 | Freelance / Entrepreneurship
          </Text>

          <Text as="p" size="3" className="mb-4">
            Founded and operated digital agency delivering responsive websites and e-commerce
            platforms for local businesses. Handled full development lifecycle from client
            consultation to ongoing maintenance.
          </Text>

          <Text as="p" size="3" className="mb-2 font-semibold">Services Delivered:</Text>
          <Text as="p" size="3" className="mb-2">
            • Dynamic, responsive websites with modern design
          </Text>
          <Text as="p" size="3" className="mb-2">
            • E-commerce platforms using React and WooCommerce API
          </Text>
          <Text as="p" size="3" className="mb-2">
            • Email notifications, booking systems, secure payment gateways
          </Text>
          <Text as="p" size="3" className="mb-4">
            • Full POPIA and privacy compliance implementation
          </Text>

          <Text as="p" size="3">
            <span className="text-radix-base-amber">Stack:</span> React, WooCommerce, Payment APIs, POPIA Compliance
          </Text>
        </WindowLayout>
      </Grid>
    </Section>
  );
};

export default WorkSection;
