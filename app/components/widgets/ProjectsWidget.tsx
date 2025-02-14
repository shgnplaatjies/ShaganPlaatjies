import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import AccentedHeading from "../AccentedHeading";
import CTAButton from "../CTAButton";

const ProjectsWidget: React.FC = () => {
  return (
    <Section>
      <AccentedHeading
        textAs="h2"
        size="9"
        preText="Projects & "
        accentedText="Experience"
      />
      <Box maxWidth={"75%"}>
        <Card asChild className="group">
          <Link href={"#projectLinkProp"}>
            <Box>
              <Flex gapX={"2"} justify={"between"}>
                <Box className=" max-w-5 overflow-hidden transition-[max-width] duration-300 ease-in-out group-hover:max-w-0">
                  <Text className="whitespace-nowrap flex-nowrap">index</Text>
                </Box>

                <Box>
                  <Heading size={"8"}>projectNameProp</Heading>
                  <Flex>
                    <Badge variant={"outline"}>skillProp1</Badge>
                  </Flex>
                </Box>

                <Box className="max-w-0 overflow-hidden transition-[max-width] duration-300 ease-in-out group-hover:max-w-40">
                  {/* <Image
                  alt={`${"projectNameProp"}`}
                  src="imageProp"
                  width={"24"}
                  height={"24"}
                /> */}
                </Box>

                <Text>yearProp</Text>
              </Flex>
            </Box>
          </Link>
        </Card>
      </Box>
      <CTAButton href="/projects" text="View All" />
    </Section>
  );
};

export default ProjectsWidget;
