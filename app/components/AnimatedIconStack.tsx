"use client";
import { GlobeIcon } from "@radix-ui/react-icons";
import { Box } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import IconList, { HyperMediaIconProps } from "./IconsList";

type AnimatedIconStackProps = {
  buttonClassName?: string;
  popoverClassName: string;
  iconList: HyperMediaIconProps[];
  directionX: "left" | "right";
  directionY: "up" | "down";
  Icon?: React.FC;
};

const AnimatedIconStack: React.FC<AnimatedIconStackProps> = ({
  buttonClassName = "",
  popoverClassName,
  directionX = "left",
  directionY = "up",
  iconList,
  Icon,
}: AnimatedIconStackProps) => {
  const [iconsVisible, setIconsVisible] = useState<boolean>(false);

  const toggleIconsVisibility = () => setIconsVisible(!iconsVisible);

  const isLeft = directionX === "left";
  const isUp = directionY === "up";

  return (
    <Box className={buttonClassName}>
      {Icon ? (
        <Box
          className="hover:scale-125 transition duration-200 ease-in-out opacity-70 active:scale-75"
          onClick={toggleIconsVisibility}
        >
          <Icon />
        </Box>
      ) : (
        <GlobeIcon
          onClick={toggleIconsVisibility}
          className="hover:scale-125 transition duration-200 ease-in-out opacity-70 active:scale-75"
          width="1rem"
          height="1rem"
        />
      )}
      <AnimatePresence>
        {iconsVisible && (
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
            transition={{ duration: 0.3 }}
            className={`${popoverClassName} p-3 absolute rounded bg-black bg-opacity-10 border border-white border-opacity-20`}
          >
            <IconList
              className="flex justify-end place-self-end flex-col "
              icons={iconList}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};
export default AnimatedIconStack;
