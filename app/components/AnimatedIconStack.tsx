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
  direction: "left" | "right";
  Icon?: React.FC;
};

const AnimatedIconStack: React.FC<AnimatedIconStackProps> = ({
  buttonClassName = "",
  popoverClassName,
  direction = "left",
  iconList,
  Icon,
}: AnimatedIconStackProps) => {
  const [iconsVisible, setIconsVisible] = useState<boolean>(false);

  const toggleIconsVisibility = () => setIconsVisible(!iconsVisible);

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
            initial={
              direction === "left"
                ? {
                    x: "-10%",
                    y: "50%",
                    opacity: 0,
                    rotateZ: "10deg",
                    scaleY: 0,
                  }
                : {
                    x: "10%",
                    y: "-50%",
                    opacity: 0,
                    rotateZ: "-10deg",
                    scaleY: 0,
                  }
            }
            animate={{
              x: "0",
              y: "0%",
              opacity: 1,
              rotateZ: "0deg",
              scaleY: 1,
            }}
            exit={
              direction === "left"
                ? {
                    x: "-10%",
                    y: "50%",
                    opacity: 0,
                    rotateZ: "10deg",
                    scaleY: 0,
                  }
                : {
                    x: "10%",
                    y: "-50%",
                    opacity: 0,
                    rotateZ: "-10deg",
                    scaleY: 0,
                  }
            }
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
