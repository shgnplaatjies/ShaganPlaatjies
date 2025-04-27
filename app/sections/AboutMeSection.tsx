"use client";
import { Flex, Section, Text } from "@radix-ui/themes";
import Link from "next/link";
import AccentedHeading from "../components/AccentedHeading";
import CTAButton from "../components/CTAButton";
import WindowLayout from "../components/WindowCard/Window";

const AboutMeSection: React.FC = () => {
  const colorThemes = {
    backend: {
      primary: "var(--green-9)",
      secondary: "var(--teal-9)",
      accent: "var(--jade-9)",
    },

    frontend: {
      primary: "var(--blue-9)",
      secondary: "var(--sky-9)",
      accent: "var(--cyan-9)",
    },

    data: {
      primary: "var(--violet-9)",
      secondary: "var(--iris-9)",
      accent: "var(--indigo-9)",
    },

    business: {
      primary: "var(--tomato-9)",
      secondary: "var(--amber-9)",
      accent: "var(--orange-9)",
    },
  };

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
                <span style={{ color: colorThemes.backend.primary }}>
                  robust applications
                </span>{" "}
                with{" "}
                <span style={{ color: colorThemes.backend.secondary }}>
                  scalable architectures
                </span>
                , emphasizing{" "}
                <span style={{ color: colorThemes.backend.accent }}>
                  security and performance
                </span>{" "}
                throughout the software lifecycle.
              </li>
              <li>
                As a technical lead, I've mentored junior developers while
                modernizing legacy systems into{" "}
                <span style={{ color: colorThemes.backend.primary }}>
                  efficient microservices
                </span>{" "}
                across the{" "}
                <span style={{ color: colorThemes.business.primary }}>
                  finance and insurance sectors
                </span>
                , and{" "}
                <span style={{ color: colorThemes.data.primary }}>
                  real-time analytics platforms
                </span>
                .
              </li>
              <li>
                My technical stack includes{" "}
                <span style={{ color: colorThemes.backend.primary }}>.NET</span>
                ,{" "}
                <span style={{ color: colorThemes.frontend.primary }}>
                  React
                </span>
                ,{" "}
                <span style={{ color: colorThemes.frontend.secondary }}>
                  Vue
                </span>
                ,{" "}
                <span style={{ color: colorThemes.backend.secondary }}>
                  AWS
                </span>
                , and{" "}
                <span style={{ color: colorThemes.data.secondary }}>SQL</span>,
                with a focus on enterprise-grade implementations and best
                practices like{" "}
                <span style={{ color: colorThemes.backend.accent }}>
                  S.O.L.I.D
                </span>{" "}
                principles.
              </li>
              <li>
                Beyond my enterprise work, I run{" "}
                <span style={{ color: colorThemes.business.primary }}>
                  Pixelscape
                </span>
                , providing{" "}
                <span style={{ color: colorThemes.data.primary }}>
                  data-driven web solutions
                </span>
                ,
                <span style={{ color: colorThemes.business.secondary }}>
                  {" "}
                  e-commerce platforms
                </span>
                , and
                <span style={{ color: colorThemes.business.accent }}>
                  {" "}
                  digital marketing
                </span>{" "}
                services to local businesses.
              </li>
            </ul>
          </WindowLayout>
        </div>

        <Flex className="flex flex-col md:flex-row justify-between gap-6 mt-8">
          <Flex className="flex-col w-full md:w-1/2">
            <WindowLayout title="where-i-work" padded>
              <ul className="space-y-2">
                <li>
                  Currently based in{" "}
                  <span style={{ color: colorThemes.business.accent }}>
                    Johannesburg, South Africa
                  </span>{" "}
                  🇿🇦
                </li>
                <li>
                  Available for{" "}
                  <span style={{ color: colorThemes.frontend.accent }}>
                    remote collaborations
                  </span>{" "}
                  worldwide 🌎
                </li>
                <li>
                  Current position:{" "}
                  <span style={{ color: colorThemes.backend.primary }}>
                    Full Stack Software Engineer
                  </span>{" "}
                  at BSure Insurance Advisors
                </li>
              </ul>
            </WindowLayout>
          </Flex>

          <Flex className="flex-col w-full md:w-1/2">
            <WindowLayout title="expertise" padded>
              <ul className="space-y-2 flex-col">
                <li>
                  <span style={{ color: colorThemes.business.primary }}>
                    🔒 Enterprise Software
                  </span>
                </li>
                <li>
                  <span style={{ color: colorThemes.backend.secondary }}>
                    🏗️ Scalable Solutions
                  </span>
                </li>
                <li>
                  <span style={{ color: colorThemes.data.primary }}>
                    📊 Data-Driven Design
                  </span>
                </li>
                <li>
                  <span style={{ color: colorThemes.business.secondary }}>
                    ☁️ Cloud Architecture
                  </span>
                </li>
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
                  style={{
                    color: colorThemes.business.secondary,
                    transition: "opacity 0.2s",
                  }}
                  className="hover:opacity-80"
                >
                  Linkedin
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/shgnplaatjies"
                  style={{
                    color: colorThemes.frontend.primary,
                    transition: "opacity 0.2s",
                  }}
                  className="hover:opacity-80"
                >
                  Github
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:me@shaganplaatjies.co.za"
                  style={{
                    color: colorThemes.data.primary,
                    transition: "opacity 0.2s",
                  }}
                  className="hover:opacity-80"
                >
                  Email
                </Link>
              </li>
              <li>
                <Link
                  href="https://pixelscape.co.za"
                  style={{
                    color: colorThemes.business.primary,
                    transition: "opacity 0.2s",
                  }}
                  className="hover:opacity-80"
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
