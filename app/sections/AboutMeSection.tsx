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
          preText="Your "
          accentedText="technical expert"
        />

        <Text as="p" className="mb-6">
          Nice to meet you! I'm Shagan, a Full Stack Software Engineer with
          extensive experience in various domains.
        </Text>

        <div className="md:max-w-[80%] my-5">
          <WindowLayout title="about-me" padded>
            <ul className="space-y-4">
              <li>
                I'm focused on developing{" "}
                <span className="text-radix-base-lime">
                  robust applications
                </span>{" "}
                with{" "}
                <span className="text-radix-base-sky">
                  scalable architectures
                </span>
                , emphasizing{" "}
                <span className="text-radix-base-mint">
                  security and performance
                </span>{" "}
                throughout the software lifecycle.
              </li>
              <li>
                As a technical lead, I've mentored junior developers while
                modernizing legacy systems into{" "}
                <span className="text-radix-base-yellow">
                  efficient microservices
                </span>{" "}
                across the{" "}
                <span className="text-radix-base-crimson">
                  finance and insurance sectors
                </span>
                , and{" "}
                <span className="text-radix-base-violet">
                  real-time analytics platforms
                </span>
                .
              </li>
              <li>
                My technical stack includes{" "}
                <span className="text-radix-base-lime">.NET</span>,{" "}
                <span className="text-radix-base-sky">React</span>,{" "}
                <span className="text-radix-base-mint">Vue</span>,{" "}
                <span className="text-radix-base-yellow">AWS</span>, and{" "}
                <span className="text-radix-base-violet">SQL</span>, with a
                focus on enterprise-grade implementations and best practices
                like S.O.L.I.D principles.
              </li>
              <li>
                Beyond my enterprise work, I run{" "}
                <span className="text-radix-base-crimson">Pixelscape</span>,
                providing data-driven web solutions, e-commerce platforms, and
                digital marketing services to local businesses.
              </li>
            </ul>
          </WindowLayout>
        </div>

        <Flex className="flex flex-col md:flex-row justify-between gap-6 mt-8">
          <Flex className="flex-col w-full md:w-1/2">
            <WindowLayout title="where-i-work" padded>
              <ul className="space-y-2">
                <li>Currently based in Johannesburg, South Africa 🇿🇦</li>
                <li>Available for remote collaborations worldwide 🌎</li>
                <li>
                  Current position: Full Stack Software Engineer at BSure
                  Insurance Advisors
                </li>
              </ul>
            </WindowLayout>
          </Flex>

          <Flex className="flex-col w-full md:w-1/2">
            <WindowLayout title="expertise" padded>
              <ul className="space-y-2 flex-col">
                <li>🔒 Enterprise Software</li>
                <li>🏗️ Scalable Solutions</li>
                <li>📊 Data-Driven Design</li>
                <li>☁️ Cloud Architecture</li>
              </ul>
            </WindowLayout>
          </Flex>
        </Flex>

        <Flex className="mt-8">
          <WindowLayout title="me-online" padded>
            <ul className="flex-col flex-wrap gap-6 justify-center">
              <li>
                <Link
                  href="https://www.linkedin.com/in/shaganplaatjies/"
                  className="text-radix-base-blue hover:opacity-80"
                >
                  Linkedin
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/shgnplaatjies"
                  className="text-radix-base-crimson hover:opacity-80"
                >
                  Github
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:me@shaganplaatjies.co.za"
                  className="text-radix-base-mint hover:opacity-80"
                >
                  Email
                </Link>
              </li>
              <li>
                <Link
                  href="https://pixelscape.co.za"
                  className="text-radix-base-yellow hover:opacity-80"
                >
                  Digital Agency
                </Link>
              </li>
            </ul>
          </WindowLayout>
        </Flex>
      </Flex>

      <Flex className="flex-row justify-center mt-10">
        <CTAButton href="/projects" text="My Projects" />
      </Flex>
    </Section>
  );
};

export { AboutMeSection };
