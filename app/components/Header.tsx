import { Flex, Grid } from "@radix-ui/themes";
import React from "react";
import Logo from "./Logo";
import StylizedTextLogo from "./StylizedTextLogo";
import WindowControls from "./WindowControls";

type HeaderProps = { className: string };

const Header: React.FC<HeaderProps> = ({ className }: HeaderProps) => {
  return (
    <header className={className}>
      <Grid width="100%" columns="3">
        <Flex justify="start" className="-ml-2" align="center">
          <Logo />
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
