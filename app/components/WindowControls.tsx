import { Box, Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
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
    ReturnType<typeof getOs>,
    ["close" | "minimize" | "maximize", (() => void) | undefined][]
  > = {
    iOS: [
      ["close", onClose],
      ["minimize", onMinimize],
      ["maximize", onMaximize],
    ],
    macOS: [
      ["close", onClose],
      ["minimize", onMinimize],
      ["maximize", onMaximize],
    ],
    Linux: [
      ["close", onClose],
      ["minimize", onMinimize],
      ["maximize", onMaximize],
    ],
    Unknown: [
      ["minimize", onMinimize],
      ["maximize", onMaximize],
      ["close", onClose],
    ],
    Android: [
      ["minimize", onMinimize],
      ["maximize", onMaximize],
      ["close", onClose],
    ],
    Windows: [
      ["minimize", onMinimize],
      ["maximize", onMaximize],
      ["close", onClose],
    ],
  };

  const [userAgent, setUserAgent] = useState("Unknown");

  useEffect(() => {
    setUserAgent(window.navigator.userAgent);
  }, [userAgent]);

  const getOs = (userAgentString: string) => {
    if (/Mac/i.test(userAgent)) {
      return "macOS";
    } else if (/Win/i.test(userAgent)) {
      return "Windows";
    } else if (/Linux/i.test(userAgent)) {
      return "Linux";
    } else if (/Android/i.test(userAgent)) {
      return "Android";
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return "iOS";
    } else {
      return "Unknown";
    }
  };

  const getIcon = (type: "close" | "minimize" | "maximize") => {
    switch (getOs(userAgent)) {
      case "iOS":
      case "macOS":
        return <MacOSWindowControlsIcon type={type} />;
      case "Android":
      case "Windows":
        return <WindowsOSWindowControlsIcon type={type} />;
      case "Linux":
      case "Unknown":
        return <LinuxWindowControlsIcon type={type} />;
      default:
        return <WindowsOSWindowControlsIcon type={type} />;
    }
  };

  return (
    <Flex className={className} gap={gap}>
      {buttons[getOs(userAgent)].map(([type, onClick]) => (
        <Box key={type} onClick={onClick}>
          {getIcon(type)}
        </Box>
      ))}
    </Flex>
  );
};
export default WindowControls;
