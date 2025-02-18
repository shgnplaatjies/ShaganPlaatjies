import { Flex, Section, Text } from "@radix-ui/themes";
import Link from "next/link";
import AccentedHeading from "../components/AccentedHeading";
import CTAButton from "../components/CTAButton";
import WindowLayout from "../components/WindowCard/Window";

const AboutMeSection: React.FC = () => {
  return (
    <Section>
      <Flex direction={"column"} gapY={"4"}>
        <AccentedHeading
          textAs="h2"
          size="8"
          preText="My "
          accentedText="Skills."
        />

        <Text as="p">Allow me to introduce skills.</Text>

        <WindowLayout title="about-me" padded>
          <ul>
            <li>
              Hi there! I'm Shagan, a{" "}
              <span className="text-radix-base-lime">
                Full Stack Software Engineer
              </span>
              .
            </li>
            <li>
              Full Stack Engineer with a track record in leading development
              teams,{" "}
              <span className="text-radix-base-mint">
                modernizing legacy systems
              </span>
              , and{" "}
              <span className="text-radix-base-crimson">
                building secure, scalable{" "}
              </span>
              solutions.
            </li>
            <li>
              Skilled in .NET, Vue, React, Azure, with experience across{" "}
              <span className="text-radix-base-yellow">
                finance and insurance sectors
              </span>
              ,{" "}
              <span className="text-radix-base-sky">
                real-time data analytics
              </span>{" "}
              solutions, and freelance projects.
            </li>
          </ul>
        </WindowLayout>

        <Flex className="flex-row place-self-end w-3/6">
          <WindowLayout title="where-i-work" padded>
            <ul>
              <li>I'm currently based in Johannesburg, South Africa.</li>
              <li>Available for remote collaborations world wide.</li>
            </ul>
          </WindowLayout>
        </Flex>

        <Flex className="flex-row place-self-center  max-w-1/3">
          <WindowLayout title="find-me-at" padded>
            <ul>
              <li>
                <Link href="https://www.linkedin.com/in/shaganplaatjies/">
                  linkedin
                </Link>
              </li>
              <li>
                <Link href="https://github.com/shgnplaatjies">github</Link>
              </li>
              <li>
                <Link href="#">resume</Link>
              </li>
            </ul>
          </WindowLayout>
        </Flex>
      </Flex>

      <Flex className="flex-row justify-center">
        <CTAButton href="/projects" text="My Projects" />
      </Flex>
    </Section>
  );
};

export { AboutMeSection };
