import { Text } from "@radix-ui/themes";
import React from "react";
import { RADIX_COLORS, RADIX_HEADING_SIZES } from "../lib/constants";
import { FixedSys } from "../lib/fonts";

type StylizedTextLogoProps = {
  size?: RADIX_HEADING_SIZES;
  color?: RADIX_COLORS;
};

const StylizedTextLogo: React.FC<StylizedTextLogoProps> = ({
  size = "4",
  color,
}: StylizedTextLogoProps) => {
  return (
    <Text as="p" size={size} className={`${FixedSys.className}`}>
      shagan
      {color ? (
        <Text as="span" color={color}>
          {"<plaatjies>"}
        </Text>
      ) : (
        <Text as="span" style={{ color: "var(--accent-11)" }}>
          {"<plaatjies>"}
        </Text>
      )}
    </Text>
  );
};

export default StylizedTextLogo;
