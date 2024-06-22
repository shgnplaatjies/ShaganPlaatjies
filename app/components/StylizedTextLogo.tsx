import { Text } from "@radix-ui/themes";
import React from "react";
import { RADIX_HEADING_COLORS, RADIX_HEADING_SIZES } from "../lib/constants";
import { FixedSys } from "../lib/fonts";

type StylizedTextLogoProps = {
  size?: RADIX_HEADING_SIZES;
  color?: RADIX_HEADING_COLORS;
};

const StylizedTextLogo: React.FC<StylizedTextLogoProps> = ({
  size = "4",
  color = "grass",
}: StylizedTextLogoProps) => {
  return (
    <Text as="p" size={size} className={`${FixedSys.className}`}>
      shagan
      <Text as="span" color={color}>
        {"<plaatjies>"}
      </Text>
    </Text>
  );
};

export default StylizedTextLogo;
