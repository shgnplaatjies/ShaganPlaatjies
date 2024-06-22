import { Cross1Icon, MinusIcon, SquareIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import React from "react";

type WindowControlsProps = {
  className?: string;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
};

const WindowControls: React.FC<WindowControlsProps> = ({
  className = "",
  onMinimize,
  onMaximize,
  onClose,
}: WindowControlsProps) => {
  return (
    <Flex gap="2">
      <MinusIcon onClick={onMinimize} />
      <SquareIcon onClick={onMaximize} />
      <Cross1Icon onClick={onClose} />
    </Flex>
  );
};
export default WindowControls;
