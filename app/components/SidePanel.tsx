"use client";
import { Flex } from "@radix-ui/themes";
import React from "react";
import IconList from "./IconsList";
import { getNavIcons } from "./icons/NavIcons";

type SidePanelProps = {
  className?: string;
};

const SidePanel: React.FC<SidePanelProps> = ({
  className = "",
}: SidePanelProps) => {
  const navIcons = getNavIcons();
  return (
    <Flex direction="column" className={className}>
      <IconList className="flex flex-col" icons={navIcons} />
    </Flex>
  );
};
export default SidePanel;
