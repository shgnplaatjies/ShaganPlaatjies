import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Flex, Grid } from "@radix-ui/themes";
import React from "react";
import AnimatedIconStack from "./AnimatedIconStack";
import Logo from "./Logo";
import StylizedTextLogo from "./StylizedTextLogo";
import WindowControls from "./WindowControls";
import { getNavIcons } from "./icons/NavIcons";

type HeaderProps = { className: string };

const Header: React.FC<HeaderProps> = ({ className }: HeaderProps) => {
  const navIcons = getNavIcons();

  return (
    <header className={className}>
      <Grid width="100%" columns="3">
        <Flex justify="start" className="-ml-2" align="center">
          <Logo className=" opacity-70" width="2rem" height="2rem" />
        </Flex>
        <Flex justify="center" align="center">
          <StylizedTextLogo />
        </Flex>
        <Flex justify="end" align="center">
          <WindowControls className="opacity-50 hidden sm:flex" gap="4" />
          <AnimatedIconStack
            directionX="left"
            directionY="down"
            Icon={HamburgerMenuIcon}
            iconList={navIcons}
            buttonClassName="flex place-self-center sm:hidden"
            popoverClassName="top-12 right-1.5 mt-2 z-10"
          />
        </Flex>
      </Grid>
    </header>
  );
};

export default Header;
