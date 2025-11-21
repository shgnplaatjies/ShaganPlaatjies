import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Flex, Grid } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import AnimatedIconStack from "./AnimatedIconStack";
import StylizedTextLogo from "./StylizedTextLogo";
import { getNavIcons } from "./icons/NavIcons";

type HeaderProps = { className: string };

const Header: React.FC<HeaderProps> = ({ className }: HeaderProps) => {
  const navIcons = getNavIcons();

  return (
    <header className={className}>
      <Grid width="100%" columns="3">
        <Flex justify="start" align="center">
        </Flex>
        <Flex justify="center" align="center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <StylizedTextLogo />
          </Link>
        </Flex>
        <Flex justify="end" align="center">
          <AnimatedIconStack
            directionX="left"
            directionY="down"
            Icon={HamburgerMenuIcon}
            iconList={navIcons}
            buttonClassName="hidden"
            popoverClassName="top-12 right-1.5 mt-2 z-10"
          />
        </Flex>
      </Grid>
    </header>
  );
};

export default Header;
