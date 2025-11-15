"use client";
import { Flex, Section, Text } from "@radix-ui/themes";
import Link from "next/link";
import AccentedHeading from "../components/AccentedHeading";
import BorderAccent from "../components/BorderAccent";
import CTAButton from "../components/CTAButton";
import SectionHeader from "../components/SectionHeader";
import SkillBadge from "../components/SkillBadge";
import SkillsGrid, { SkillCategory } from "../components/SkillsGrid";
import CategoryIcon, {
  CareerIcon,
  CodeIconComponent,
  ConfigIcon,
  ContactIcon,
  ProfileIcon,
  SkillsIcon,
  TechIcon,
} from "../components/icons/CategoryIcons";

const AboutMeSectionImproved: React.FC = () => {
  return (
    <Section>
      <Flex direction={"column"} gapY={"2"} mb={"3"}>
        <SectionHeader
          icon={<ProfileIcon />}
          title="About"
        />

        <Text as="p" className="mb-6 text-sm opacity-80">
          With over half a decade architecting mission-critical systems, I merge deep
          technical expertise with product strategy and business acumen. Currently leading
          development of patented technology at Broadway Media for global live entertainment,
          I&apos;ve built a career on transforming complex challenges into elegant, scalable solutions.
        </Text>

        <BorderAccent
          color="border-radix-base-grass"
          icon={<CareerIcon />}
          label="Career Journey"
        >
          <ul className="space-y-4">
            <li>
              <span className="text-radix-base-grass font-semibold font-mono">Broadway Media (Mar 2025–Present)</span>
              <br />
              <Text size="2" className="opacity-90 mt-1">
                Leading systems architecture and technical team for{" "}
                <span className="text-radix-base-cyan">patented technology</span> serving
                global live entertainment audiences. Managing{" "}
                <span className="text-radix-base-sky">AWS infrastructure</span> and{" "}
                <span className="text-radix-base-blue">Vercel deployments</span>, conducting
                code reviews, and serving as technical liaison between management and engineering.
              </Text>
            </li>
            <li>
              <span className="text-radix-base-tomato font-semibold font-mono">BSure Insurance (Jan 2024–Feb 2025)</span>
              <br />
              <Text size="2" className="opacity-90 mt-1">
                Elevated from IC to <span className="text-radix-base-amber">Technical Team Lead</span>,
                guiding three junior developers. Spearheaded finance division&apos;s migration from
                monolithic architecture to{" "}
                <span className="text-radix-base-green">robust microservice solution</span>,
                introducing automated deployment and advocating for{" "}
                <span className="text-radix-base-jade">S.O.L.I.D principles</span> and clean code practices.
              </Text>
            </li>
            <li>
              <span className="text-radix-base-blue font-semibold font-mono">Vodacom via BBD (Jan 2023–Jan 2024)</span>
              <br />
              <Text size="2" className="opacity-90 mt-1">
                Delivered high-impact frontend solutions for{" "}
                <span className="text-radix-base-violet">four VodaPay lending products</span>.
                Redesigned Voucher Advance from scratch, achieving significant{" "}
                <span className="text-radix-base-cyan">usability and performance enhancements</span> while
                maintaining legacy support.
              </Text>
            </li>
            <li>
              <span className="text-radix-base-orange font-semibold font-mono">Pixelscape (Founder)</span>
              <br />
              <Text size="2" className="opacity-90 mt-1">
                Building <span className="text-radix-base-amber">e-commerce platforms</span> and{" "}
                <span className="text-radix-base-violet">data-driven web solutions</span> using
                React and WooCommerce API, with full POPIA compliance and secure payment integration.
              </Text>
            </li>
          </ul>
        </BorderAccent>

        <Flex className="flex flex-col md:flex-row justify-between gap-6 mt-8">
          <Flex className="flex-col w-full md:w-1/2">
            <BorderAccent
              color="border-radix-base-blue"
              icon={<CodeIconComponent />}
              label="Tech Stack"
            >
              <SkillsGrid columns={1}>
                <SkillCategory
                  name="Backend"
                  color="text-radix-base-purple"
                  icon={<TechIcon />}
                >
                  <SkillBadge label="C#" color="purple" />
                  <SkillBadge label="ASP.NET" color="violet" />
                  <SkillBadge label="Django" color="green" />
                  <SkillBadge label="Node.js" color="grass" />
                  <SkillBadge label="Serverless" color="amber" />
                </SkillCategory>

                <SkillCategory
                  name="Frontend"
                  color="text-radix-base-cyan"
                  icon={<CodeIconComponent />}
                >
                  <SkillBadge label="React" color="cyan" />
                  <SkillBadge label="Vue" color="green" />
                  <SkillBadge label="AngularJS" color="red" />
                  <SkillBadge label="Next.js" color="gray" />
                  <SkillBadge label="TypeScript" color="blue" />
                </SkillCategory>

                <SkillCategory
                  name="Cloud & Data"
                  color="text-radix-base-orange"
                  icon={<ConfigIcon />}
                >
                  <SkillBadge label="AWS (S3, Kafka)" color="orange" />
                  <SkillBadge label="SQL" color="blue" />
                  <SkillBadge label="MSSQL" color="red" />
                  <SkillBadge label="Vercel" color="gray" />
                </SkillCategory>

                <SkillCategory
                  name="DevOps & Tools"
                  color="text-radix-base-violet"
                  icon={<ConfigIcon />}
                >
                  <SkillBadge label="Sentry" color="purple" />
                  <SkillBadge label="Tealium" color="violet" />
                  <SkillBadge label="Jira" color="blue" />
                  <SkillBadge label="ClickUp" color="pink" />
                </SkillCategory>
              </SkillsGrid>
            </BorderAccent>
          </Flex>

          <Flex className="flex-col w-full md:w-1/2">
            <BorderAccent
              color="border-radix-base-violet"
              icon={<SkillsIcon />}
              label="Core Competencies"
            >
              <ul className="space-y-3 text-sm">
                <li>
                  <span className="text-radix-base-grass font-mono">→ Technical Leadership</span>
                  <br />
                  <span className="text-xs opacity-70 ml-4">Team mentorship, architecture design, code reviews</span>
                </li>
                <li>
                  <span className="text-radix-base-tomato font-mono">→ System Modernization</span>
                  <br />
                  <span className="text-xs opacity-70 ml-4">Legacy-to-microservices, automated deployment</span>
                </li>
                <li>
                  <span className="text-radix-base-blue font-mono">→ Enterprise Security</span>
                  <br />
                  <span className="text-xs opacity-70 ml-4">Fintech compliance, secure payment integration</span>
                </li>
                <li>
                  <span className="text-radix-base-violet font-mono">→ Product Strategy</span>
                  <br />
                  <span className="text-xs opacity-70 ml-4">Business acumen, stakeholder management</span>
                </li>
              </ul>
            </BorderAccent>
          </Flex>
        </Flex>

        <Flex className="mt-8 w-full">
          <BorderAccent
            color="border-radix-base-amber"
            icon={<ContactIcon />}
            label="Contact Information"
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-sm">
              <div>
                <span className="text-radix-base-orange">Location:</span>
                <span className="text-gray-12 ml-2">Johannesburg, ZA</span>
              </div>
              <div>
                <span className="text-radix-base-cyan">Remote:</span>
                <span className="text-gray-12 ml-2">Available</span>
              </div>
              <div>
                <span className="text-radix-base-grass">Role:</span>
                <span className="text-gray-12 ml-2">Lead Engineer</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-700 border-opacity-30 font-mono text-xs">
              <Link
                href="https://www.linkedin.com/in/shaganplaatjies/"
                className="text-radix-base-blue hover:text-radix-base-cyan transition-colors"
              >
                linkedin.com/in/shaganplaatjies
              </Link>
              <Link
                href="https://github.com/shgnplaatjies"
                className="text-radix-base-violet hover:text-radix-base-iris transition-colors"
              >
                github.com/shgnplaatjies
              </Link>
              <Link
                href="mailto:hello@shaganplaatjies.co.za"
                className="text-radix-base-amber hover:text-radix-base-orange transition-colors"
              >
                hello@shaganplaatjies.co.za
              </Link>
              <Link
                href="https://pixelscape.co.za"
                className="text-radix-base-tomato hover:text-radix-base-red transition-colors"
              >
                pixelscape.co.za
              </Link>
            </div>
          </BorderAccent>
        </Flex>
      </Flex>

      <Flex className="flex-row justify-center mt-5">
        <CTAButton href="/experience" text="View Experience & Projects" />
      </Flex>
    </Section>
  );
};

export { AboutMeSectionImproved };
