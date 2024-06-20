import { CodeIcon } from "@radix-ui/react-icons";
import { Box } from "@radix-ui/themes";
import React from "react";
import NavButton from "./NavButton";
import StylizedTextLogo from "./StylizedTextLogo";

type HeaderProps = { className: string };

const Header: React.FC<HeaderProps> = ({ className }: HeaderProps) => {
  return (
    <header className={className}>
      <Box className="flex w-full justify-between place-items-center overflow-visible">
        <Box className="flex flex-col">
          <CodeIcon />
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
