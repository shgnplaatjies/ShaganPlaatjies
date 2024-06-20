import { Text } from "@radix-ui/themes";
import React from "react";
import { FixedSys } from "../lib/fonts";

const StylizedTextLogo: React.FC = () => {
  return (
    <Text as="p" size="4" className={`${FixedSys.className}`}>
      shagan
      <Text as="span" className="text-green-500">
        {"<plaatjies>"}
      </Text>
    </Text>
  );
};

export default StylizedTextLogo;
