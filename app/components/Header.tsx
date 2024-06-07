import { CodeIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import React from "react";
import NavButton from "./NavButton";

const Header: React.FC = () => {
  return (
    <Flex direction="row" height="2rem" overflow={"visible"} justify="between">
      <CodeIcon />
      <Text as="p">
        shagan<span className="text-green-500">{"<plaatjies>"}</span>
      </Text>
      <NavButton />
    </Flex>
  );
};

export default Header;
