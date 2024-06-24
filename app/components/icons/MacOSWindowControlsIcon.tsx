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
        return "#ff5f56"; // MacOS red
      case "minimize":
        return "#ffbd2e"; // MacOS yellow
      case "maximize":
        return "#27c93f"; // MacOS green
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
