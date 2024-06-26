import { Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import { RADIX_HEADING_SIZES, RADIX_HEADING_TYPES } from "../lib/constants";

type AccentedHeadingProps = {
  textAs: RADIX_HEADING_TYPES;
  size: RADIX_HEADING_SIZES;
  color?: string;
  preText?: string;
  accentedText: string;
  postText?: string;
  wrap?: "balance" | "wrap" | "nowrap" | "pretty";
  align?: "left" | "center" | "right";
  className?: string;
};

const AccentedHeading: React.FC<AccentedHeadingProps> = ({
  wrap = "balance",
  align = "left",
  textAs,
  size,
  color = "var(--accent-11)",
  preText = "",
  accentedText = "",
  postText = "",
  className = "",
}: AccentedHeadingProps) => {
  return (
    <Flex className={className}>
      <Heading wrap={wrap} align={align} as={textAs} size={size}>
        {preText}
        <Text as="span" size={size} style={{ color: color }}>
          {accentedText}
        </Text>
        {postText}
      </Heading>
    </Flex>
  );
};

export default AccentedHeading;
