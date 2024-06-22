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
          <Logo
            className="hidden sm:block opacity-70"
            width="2rem"
            height="2rem"
          />
          <AnimatedIconStack
            direction="right"
            Icon={Logo}
            iconList={navIcons}
            buttonClassName="flex justify-end sm:hidden place-self-end"
            popoverClassName="top-12 left-1 mt-1"
          />
        </Flex>
        <Flex justify="center" align="center">
          <StylizedTextLogo />
        </Flex>
        <Flex justify="end" align="center">
          <WindowControls className="opacity-50" gap="4" />
        </Flex>
      </Grid>
    </header>
  );
};

export default Header;
