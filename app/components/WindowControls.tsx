import { Cross1Icon, MinusIcon, SquareIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import React from "react";

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
  return (
    <Flex className={className} gap={gap}>
      <MinusIcon onClick={onMinimize} />
      <SquareIcon onClick={onMaximize} />
      <Cross1Icon onClick={onClose} />
    </Flex>
  );
};
export default WindowControls;
