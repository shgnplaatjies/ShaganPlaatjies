import { Cross1Icon, MinusIcon, SquareIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import React from "react";

type WindowsOSWindowControlsIconProps = {
  type: "close" | "minimize" | "maximize";
};

const WindowsOSWindowControlsIcon: React.FC<
  WindowsOSWindowControlsIconProps
> = ({ type }) => {
  const getIcon = () => {
    switch (type) {
      case "close":
        return <Cross1Icon />;
      case "minimize":
        return <MinusIcon />;
      case "maximize":
        return <SquareIcon />;
    }
  };

  return <Flex>{getIcon()}</Flex>;
};

export default WindowsOSWindowControlsIcon;
