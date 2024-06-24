"use client";
import { GlobeIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import IconList, { HyperMediaIconProps } from "./IconsList";

type AnimatedIconStackProps = {
  buttonClassName?: string;
  popoverClassName: string;
  iconList: HyperMediaIconProps[];
  directionX: "left" | "right";
  directionY: "up" | "down";
  background?: "solid" | "translucent";
  Icon?: React.FC;
};

const AnimatedIconStack: React.FC<AnimatedIconStackProps> = ({
  buttonClassName = "",
  popoverClassName,
  directionX = "left",
  directionY = "up",
  background = "translucent",
  iconList,
  Icon,
}: AnimatedIconStackProps) => {
  const [iconsVisible, setIconsVisible] = useState<boolean>(false);

  const toggleIconsVisibility = () => setIconsVisible(!iconsVisible);

  const isLeft = directionX === "left";
  const isUp = directionY === "up";

  return (
    <Box className={buttonClassName}>
      <Flex className="hover:scale-125 transition duration-200 ease-in-out opacity-70 active:scale-90">
        <Button
          onClick={toggleIconsVisibility}
          mx="1"
          type="button"
          variant="ghost"
        >
          {Icon ? <Icon /> : <GlobeIcon onClick={toggleIconsVisibility} />}
        </Button>
      </Flex>
      <AnimatePresence>
        {iconsVisible && (
          <Box>
            <motion.div
              initial={{
                x: isLeft ? "-10%" : "10%",
                y: isUp ? "50%" : "-50%",
                opacity: 0,
                rotateZ: isLeft ? "10deg" : "-10deg",
                scaleY: 0,
              }}
              animate={{
                x: "0",
                y: "0%",
                opacity: 1,
                rotateZ: "0deg",
                scaleY: 1,
              }}
              exit={{
                x: isLeft ? "-10%" : "10%",
                y: isUp ? "50%" : "-50%",
                opacity: 0,
                rotateZ: isLeft ? "10deg" : "-10deg",
                scaleY: 0,
              }}
              style={{
                background:
                  background === "translucent"
                    ? "var(--color-panel-translucent)"
                    : "var(--color-panel-solid)",
                backdropFilter: "blur(10px)",
              }}
              transition={{ duration: 0.3 }}
              className={`${popoverClassName} p-3 absolute rounded border border-gray-interactive-2 border-opacity-50`}
            >
              <IconList
                className="flex justify-end place-self-end flex-col "
                icons={iconList}
              />
            </motion.div>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
};
export default AnimatedIconStack;
