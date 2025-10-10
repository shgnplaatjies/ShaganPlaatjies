"use client";
import { Flex, Section, Text } from "@radix-ui/themes";
import Link from "next/link";
import AccentedHeading from "../components/AccentedHeading";
import CTAButton from "../components/CTAButton";
import WindowLayout from "../components/WindowCard/Window";

const AboutMeSection: React.FC = () => {
  return (
    <Section>
      <Flex direction={"column"} gapY={"4"} mb={"5"}>
        <AccentedHeading
          textAs="h2"
          size="8"
          preText="Engineering "
          accentedText="excellence at scale"
        />

        <Text as="p" className="mb-6 text-lg opacity-90">
          With over half a decade architecting mission-critical systems, I merge deep
          technical expertise with product strategy and business acumen. Currently leading
          development of patented technology at Broadway Media for global live entertainment,
          I've built a career on transforming complex challenges into elegant, scalable solutions.
        </Text>

        <div className="md:max-w-[80%] my-5">
          <WindowLayout title="leadership-and-impact.md" padded>
            <ul className="space-y-4">
              <li>
                <span className="text-radix-base-grass font-semibold">Broadway Media (Mar 2025–Present)</span>
                <br />
                Leading systems architecture and technical team for{" "}
                <span className="text-radix-base-cyan">patented technology</span> serving
                global live entertainment audiences. Managing{" "}
                <span className="text-radix-base-sky">AWS infrastructure</span> and{" "}
                <span className="text-radix-base-blue">Vercel deployments</span>, conducting
                code reviews, and serving as technical liaison between management and engineering.
              </li>
              <li>
                <span className="text-radix-base-tomato font-semibold">BSure Insurance (Jan 2024–Feb 2025)</span>
                <br />
                Elevated from IC to <span className="text-radix-base-amber">Technical Team Lead</span>,
                guiding three junior developers. Spearheaded finance division's migration from
                monolithic architecture to{" "}
                <span className="text-radix-base-green">robust microservice solution</span>,
                introducing automated deployment and advocating for{" "}
                <span className="text-radix-base-jade">S.O.L.I.D principles</span> and clean code practices.
              </li>
              <li>
                <span className="text-radix-base-blue font-semibold">Vodacom via BBD (Jan 2023–Jan 2024)</span>
                <br />
                Delivered high-impact frontend solutions for{" "}
                <span className="text-radix-base-violet">four VodaPay lending products</span>.
                Redesigned Voucher Advance from scratch, achieving significant{" "}
                <span className="text-radix-base-cyan">usability and performance enhancements</span> while
                maintaining legacy support.
              </li>
              <li>
                <span className="text-radix-base-orange font-semibold">Pixelscape (Founder)</span>
                <br />
                Building <span className="text-radix-base-amber">e-commerce platforms</span> and{" "}
                <span className="text-radix-base-violet">data-driven web solutions</span> using
                React and WooCommerce API, with full POPIA compliance and secure payment integration.
              </li>
            </ul>
          </WindowLayout>
        </div>

        <Flex className="flex flex-col md:flex-row justify-between gap-6 mt-8">
          <Flex className="flex-col w-full md:w-1/2">
            <WindowLayout title="technical-stack.json" padded>
              <ul className="space-y-3">
                <li>
                  <span className="text-radix-base-green font-semibold">Backend:</span>{" "}
                  <span className="text-radix-base-jade">C#, ASP.NET, Django, Node.js, Serverless</span>
                </li>
                <li>
                  <span className="text-radix-base-blue font-semibold">Frontend:</span>{" "}
                  <span className="text-radix-base-cyan">React, Vue, AngularJS, Next.js, TypeScript</span>
                </li>
                <li>
                  <span className="text-radix-base-violet font-semibold">Data & Cloud:</span>{" "}
                  <span className="text-radix-base-iris">AWS (S3, Kafka), SQL, MSSQL, Vercel</span>
                </li>
                <li>
                  <span className="text-radix-base-amber font-semibold">DevOps & Tools:</span>{" "}
                  <span className="text-radix-base-orange">Sentry, Tealium, Jira, ClickUp</span>
                </li>
              </ul>
            </WindowLayout>
          </Flex>

          <Flex className="flex-col w-full md:w-1/2">
            <WindowLayout title="core-competencies.txt" padded>
              <ul className="space-y-3">
                <li>
                  <span className="text-radix-base-grass">Technical Leadership</span>
                  <br />
                  <span className="text-sm opacity-80">Team mentorship, architecture design, code reviews</span>
                </li>
                <li>
                  <span className="text-radix-base-tomato">System Modernization</span>
                  <br />
                  <span className="text-sm opacity-80">Legacy-to-microservices, automated deployment</span>
                </li>
                <li>
                  <span className="text-radix-base-blue">Enterprise Security</span>
                  <br />
                  <span className="text-sm opacity-80">Fintech compliance, secure payment integration</span>
                </li>
                <li>
                  <span className="text-radix-base-violet">Product Strategy</span>
                  <br />
                  <span className="text-sm opacity-80">Business acumen, stakeholder management</span>
                </li>
              </ul>
            </WindowLayout>
          </Flex>
        </Flex>

        <Flex className="mt-8 w-full">
          <WindowLayout title="location-and-availability.ini" padded>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <span className="text-radix-base-orange font-semibold">Based in</span>
                <br />
                <span className="opacity-80">Johannesburg, South Africa</span>
              </div>
              <div>
                <span className="text-radix-base-cyan font-semibold">Remote Work</span>
                <br />
                <span className="opacity-80">Global collaborations welcome</span>
              </div>
              <div>
                <span className="text-radix-base-grass font-semibold">Current Role</span>
                <br />
                <span className="opacity-80">Lead Engineer @ Broadway Media</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-radix-base-gray-6">
              <Link
                href="https://www.linkedin.com/in/shaganplaatjies/"
                className="text-radix-base-blue hover:opacity-80 font-medium"
              >
                → LinkedIn
              </Link>
              <Link
                href="https://github.com/shgnplaatjies"
                className="text-radix-base-violet hover:opacity-80 font-medium"
              >
                → GitHub
              </Link>
              <Link
                href="mailto:hello@shaganplaatjies.co.za"
                className="text-radix-base-amber hover:opacity-80 font-medium"
              >
                → Email
              </Link>
              <Link
                href="https://pixelscape.co.za"
                className="text-radix-base-tomato hover:opacity-80 font-medium"
              >
                → Pixelscape Agency
              </Link>
            </div>
          </WindowLayout>
        </Flex>
      </Flex>

      <Flex className="flex-row justify-center mt-10">
        <CTAButton href="/experience" text="View Experience & Projects" />
      </Flex>
    </Section>
  );
};

export { AboutMeSection };
