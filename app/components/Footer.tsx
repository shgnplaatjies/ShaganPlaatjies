"use client";

import { Flex, Grid, Link, Section, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import StylizedTextLogo from "./StylizedTextLogo";
import { getNavIcons } from "./icons/NavIcons";

const Footer: React.FC = () => {
  const navIcons = getNavIcons();
  const pathName = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <Section className="border-t border-gray-border mt-16 pt-10">
      <Flex direction="column" gap="6" align="center">
        <Flex align="center" gap="2">
          <Logo className="w-8 h-8" />
          <StylizedTextLogo size="5" />
        </Flex>

        <Flex direction="column" gap="3" align="center" className="max-w-xl">
          <Text as="p" className="text-center opacity-70">
            Interested in technical collaboration or enterprise solutions? Let&apos;s
            discuss your project.
          </Text>
          <Text as="p" className="text-center opacity-70 text-sm">
            This site is built with Next.js, TypeScript, and Radix UI. Content is
            server-side rendered from a custom WordPress API.{" "}
            <Link
              color="gray"
              href="https://github.com/shgnplaatjies"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100"
            >
              View the source code
            </Link>
            .
          </Text>
        </Flex>

        <Flex wrap="wrap" gap="4" justify="center" className="my-4">
          {navIcons.map(({ label, href }, i) => (
            <Link
              key={label}
              asChild
              color={pathName !== href ? "gray" : undefined}
              className="hover:opacity-80"
            >
              <NextLink href={href}>
                <Text>{label}</Text>
              </NextLink>
            </Link>
          ))}
        </Flex>

        <Grid columns={{ sm: "1", md: "1" }} className="w-full mt-8">
          <Flex direction="column" align="center" gap="2">
            <Flex gap="2" justify="center" wrap="wrap">
              <Text as="p" className="text-center text-sm opacity-70">
                © {currentYear} Shagan Plaatjies | Full Stack Software Engineer
              </Text>
              <Text
                as="p"
                className="text-center text-sm opacity-70 hidden sm:block"
              >
                |
              </Text>
              <Text as="p" className="text-center text-sm opacity-70">
                Based in Johannesburg, South Africa
              </Text>
            </Flex>

            <Flex gap="4" justify="center" className="mt-4">
              <Link
                color="gray"
                asChild
                className="text-xs opacity-70 hover:opacity-100"
              >
                <NextLink href="/privacy-policy">Privacy Policy</NextLink>
              </Link>

              <Link
                color="gray"
                className="text-xs opacity-70 hover:opacity-100"
              >
                Cookie-free Website
              </Link>
            </Flex>
          </Flex>
        </Grid>
      </Flex>
    </Section>
  );
};

export { Footer };
