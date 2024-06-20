import { CodeIcon } from "@radix-ui/react-icons";
import { Box, Text } from "@radix-ui/themes";
import React from "react";
import { FixedSys } from "../lib/fonts";
import NavButton from "./NavButton";

type HeaderProps = { className: string };

const Header: React.FC<HeaderProps> = ({ className }: HeaderProps) => {
  return (
    <header className={className}>
      <Box className="flex w-full justify-between place-items-center overflow-visible">
        <Box className="flex flex-col">
          <CodeIcon />
        </Box>
        <Box className="flex flex-col">
          <Text as="p" className={`${FixedSys.className} text-lg`}>
            shagan
            <Text as="span" className="text-green-500">
              {"<plaatjies>"}
            </Text>
          </Text>
        </Box>
        <Box className="flex flex-col">
          <NavButton />
        </Box>
      </Box>
    </header>
  );
};

export default Header;
