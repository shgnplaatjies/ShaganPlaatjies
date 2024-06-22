import { Box, Flex, Grid, Link, Section, Text } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import Logo from "../Logo";
import StylizedTextLogo from "../StylizedTextLogo";
import { getNavIcons } from "../icons/NavIcons";

const FooterSection: React.FC = () => {
  const navIcons = getNavIcons();
  const pathName = usePathname();

  return (
    <Section>
      <Grid
        className="h-60 w-full place-items-center"
        columns={{ sm: "1", md: "2" }}
      >
        <Flex className="lg:justify-self-center">
          <Box pr="2">
            <Logo />
          </Box>
          <StylizedTextLogo size="5" />
        </Flex>
        <Flex className="lg:justify-self-center">
          {navIcons.map(({ Icon, label, href }) => (
            <Link
              key={label}
              content="center"
              color={pathName !== href ? "gray" : undefined}
              asChild
            >
              <Text>{label}</Text>
            </Link>
          ))}
        </Flex>
      </Grid>

      <Grid columns={{ sm: "1", md: "2" }}>
        <Grid columns={{ sm: "1", md: "2" }}>
          <Text as="p" className="text-center lg:justify-self-end">
            <Link href="/">&copy; 2024</Link> All rights reserved.
          </Text>
          <Text as="p" className="text-center lg:justify-self-start">
            | Full Stack Web Developer
          </Text>
        </Grid>
        <Grid columns={{ sm: "1", md: "2" }}>
          <Link
            content="center"
            color="gray"
            className="text-center lg:justify-self-end"
            asChild
          >
            <Text>Privacy Policy</Text>
          </Link>

          <Link
            content="center"
            color="gray"
            className="text-center lg:justify-self-start"
            href="#"
            asChild
          >
            <Text>Cookie Free Website</Text>
          </Link>
        </Grid>
      </Grid>
    </Section>
  );
};

export default FooterSection;
