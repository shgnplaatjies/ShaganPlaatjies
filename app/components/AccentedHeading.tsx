import { Heading, Text } from "@radix-ui/themes";
import React from "react";
import {
  RADIX_COLORS,
  RADIX_HEADING_SIZES,
  RADIX_HEADING_TYPES,
} from "../lib/constants";

type AccentedHeadingProps = {
  textAs: RADIX_HEADING_TYPES;
  size: RADIX_HEADING_SIZES;
  color?: RADIX_COLORS;
  preText?: string;
  accentedText: string;
  postText?: string;
  wrap?: "balance" | "wrap" | "nowrap" | "pretty";
  align?: "left" | "center" | "right";
};

const AccentedHeading: React.FC<AccentedHeadingProps> = ({
  wrap = "balance",
  align = "left",
  textAs,
  size,
  color = "grass",
  preText = "",
  accentedText = "",
  postText = "",
}: AccentedHeadingProps) => {
  return (
    <Heading wrap={wrap} align={align} as={textAs} size={size}>
      {preText}
      <Text as="span" size={size} style={{ color: "var(--accent-11)" }}>
        {accentedText}
      </Text>
      {postText}
    </Heading>
  );
};

export default AccentedHeading;
