import { Box } from "@radix-ui/themes";
import React from "react";
import Logo from "./Logo";
import NavButton from "./NavButton";
import StylizedTextLogo from "./StylizedTextLogo";

type HeaderProps = { className: string };

const Header: React.FC<HeaderProps> = ({ className }: HeaderProps) => {
  return (
    <header className={className}>
      <Box className="flex w-full justify-between place-items-center overflow-visible">
        <Box className="flex flex-col">
          <Logo />
        </Box>
        <Box className="flex flex-col">
          <StylizedTextLogo />
        </Box>
        <Box className="flex flex-col">
          <NavButton />
        </Box>
      </Box>
    </header>
  );
};

export default Header;
