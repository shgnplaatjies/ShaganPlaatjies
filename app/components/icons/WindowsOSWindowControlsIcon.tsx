import { Cross1Icon, MinusIcon, SquareIcon } from "@radix-ui/react-icons";
import React from "react";

type MacOSWindowControlsIconProps = {
  type: "close" | "minimize" | "maximize";
};

const MacOSWindowControlsIcon: React.FC<MacOSWindowControlsIconProps> = ({
  type,
}) => {
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

  return <svg>{getIcon()}</svg>;
};

export default MacOSWindowControlsIcon;
