import { Flex } from "@radix-ui/themes";
import React from "react";

type MacOSWindowControlsIconProps = {
  type: "close" | "minimize" | "maximize";
};

const MacOSWindowControlsIcon: React.FC<MacOSWindowControlsIconProps> = ({
  type,
}) => {
  const getColor = () => {
    switch (type) {
      case "close":
        return "var(--red-9)";
      case "minimize":
        return "var(--amber-9)";
      case "maximize":
        return "var(--grass-9)";
    }
  };

  return (
    <Flex>
      <svg width="1rem" height="1rem">
        <circle cx="50%" cy="50%" r="5" fill={getColor()} />
      </svg>
    </Flex>
  );
};

export default MacOSWindowControlsIcon;
