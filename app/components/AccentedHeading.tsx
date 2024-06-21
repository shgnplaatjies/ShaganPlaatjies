import { Heading, Text } from "@radix-ui/themes";
import React from "react";

type RADIX_HEADING_TYPES = "h1" | "h2" | "h3" | "h4";
type RADIX_HEADING_SIZES = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type RADIX_HEADING_COLORS =
  | "gray"
  | "gold"
  | "bronze"
  | "brown"
  | "yellow"
  | "amber"
  | "orange"
  | "tomato"
  | "red"
  | "ruby"
  | "crimson"
  | "pink"
  | "plum"
  | "purple"
  | "violet"
  | "iris"
  | "indigo"
  | "blue"
  | "cyan"
  | "teal"
  | "jade"
  | "green"
  | "grass"
  | "lime"
  | "mint"
  | "sky";

type AccentedHeadingProps = {
  textAs: RADIX_HEADING_TYPES;
  size: RADIX_HEADING_SIZES;
  color?: RADIX_HEADING_COLORS;
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
      <Text as="span" size={size} color={color}>
        {accentedText}
      </Text>
      {postText}
    </Heading>
  );
};

export default AccentedHeading;
