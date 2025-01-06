import { Box, Flex } from "@radix-ui/themes";
import React from "react";
import LinuxWindowControlsIcon from "./icons/LinuxWindowControlsIcon";
import MacOSWindowControlsIcon from "./icons/MacOSWindowControlsIcon";
import WindowsOSWindowControlsIcon from "./icons/WindowsOSWindowControlsIcon";

type WindowControlsProps = {
  className?: string;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  gap?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
};

const WindowControls: React.FC<WindowControlsProps> = ({
  className = "",
  onMinimize,
  onMaximize,
  onClose,
  gap = "2",
}: WindowControlsProps) => {
  const buttons: Record<
    string,
    ["close" | "minimize" | "maximize", (() => void) | undefined][]
  > = {
    darwin: [
      ["close", onClose],
      ["minimize", onMinimize],
      ["maximize", onMaximize],
    ],
    win32: [
      ["minimize", onMinimize],
      ["maximize", onMaximize],
      ["close", onClose],
    ],
    linux: [
      ["minimize", onMinimize],
      ["maximize", onMaximize],
      ["close", onClose],
    ],
  };

  const os = process.platform;

  const getIcon = (type: "close" | "minimize" | "maximize") => {
    switch (os) {
      case "darwin":
        return <MacOSWindowControlsIcon type={type} />;
      case "win32":
        return <WindowsOSWindowControlsIcon type={type} />;
      case "linux":
        return <LinuxWindowControlsIcon type={type} />;
      default:
        return <WindowsOSWindowControlsIcon type={type} />;
    }
  };

  return (
    <Flex className={className} gap={gap}>
      {buttons[os].map(([type, onClick]) => (
        <Box key={type} onClick={onClick}>
          {getIcon(type)}
        </Box>
      ))}
    </Flex>
  );
};
export default WindowControls;
