"use client";

import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Content, Item, Root, Trigger } from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon, PersonIcon } from "@radix-ui/react-icons";
import { Box, Card, Heading, Text } from "@radix-ui/themes";
import { Separator } from "@radix-ui/themes/dist/esm/components/dropdown-menu.js";
import Link from "next/link";
import React from "react";

const ListItem: React.FC<{
  title: string;
  subtitle: string;
}> = ({ title, subtitle }) => (
  <Box className="group hover:bg-red-300">
    <Heading as="h3" className="group-hover:text-red-800">
      {title}
    </Heading>
    <Text>{subtitle}</Text>
  </Box>
);

const NavButton: React.FC = () => {
  const { user } = useUser();

  return (
    <Root>
      <Trigger>
        <HamburgerMenuIcon />
      </Trigger>
      <Content className="mr-4">
        <Item>
          <Card>
            <ul>
              <li>
                <Link href="/">{user ? <UserButton /> : <PersonIcon />}</Link>
              </li>
              <Separator />
              <li>
                <Link href="/contact">
                  <ListItem title="Contact" subtitle="Get in touch" />
                </Link>
              </li>
              <Separator />
              <li>
                <Link href="/about">
                  <ListItem
                    title="About"
                    subtitle="Learn more about me"
                  ></ListItem>
                </Link>
              </li>
              <Separator />
              <li>
                <Box>
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                  <SignedIn>
                    <SignOutButton />
                  </SignedIn>
                </Box>
              </li>
            </ul>
          </Card>
        </Item>
      </Content>
    </Root>
  );
};

export default NavButton;
