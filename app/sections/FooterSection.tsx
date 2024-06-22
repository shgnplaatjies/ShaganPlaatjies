import { Box, Flex, Grid, Link, Section, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../components/Logo";
import StylizedTextLogo from "../components/StylizedTextLogo";
import { getNavIcons } from "../components/icons/NavIcons";

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
        <Flex
          wrap="wrap"
          gap="2"
          className="justify-self-center justify-center"
        >
          {navIcons.map(({ Icon, label, href }, i) => (
            <Link
              key={label}
              content="center"
              color={pathName !== href ? "gray" : undefined}
              asChild
            >
              <NextLink href={href}>
                <Text>
                  {i < navIcons.length && "·"}
                  {label}
                </Text>
              </NextLink>
            </Link>
          ))}
        </Flex>
      </Grid>

      <Grid columns={{ sm: "1", md: "2" }}>
        <Grid pb="6" columns={{ sm: "1", md: "2" }}>
          <Text as="p" className="text-center lg:justify-self-end">
            <Link href="/">&copy; 2024</Link> All rights reserved.
          </Text>
          <Text as="p" className="text-center lg:justify-self-start">
            | Full Stack Web Developer
          </Text>
        </Grid>
        <Grid gap="2" columns={{ sm: "1", md: "2" }}>
          <Link
            content="center"
            color="gray"
            className="text-center lg:justify-self-end"
            asChild
          >
            <NextLink href="/privacy-policy">
              <Text>Privacy Policy</Text>
            </NextLink>
          </Link>

          <Link
            content="center"
            color="gray"
            className="text-center lg:justify-self-start"
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
