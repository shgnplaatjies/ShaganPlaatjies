"use client";
import { GlobeIcon } from "@radix-ui/react-icons";
import { Box } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import IconList from "./IconsList";
import { getSocialIcons } from "./icons/SocialIcons";

type AnimatedIconStackProps = {
  buttonClassName?: string;
  popoverClassName: string;
};

const AnimatedIconStack: React.FC<AnimatedIconStackProps> = ({
  buttonClassName = "",
  popoverClassName,
}: AnimatedIconStackProps) => {
  const socialIcons = getSocialIcons();

  const [iconsVisible, setIconsVisible] = useState<boolean>(false);

  const toggleIconsVisibility = () => setIconsVisible(!iconsVisible);

  return (
    <Box className={buttonClassName}>
      <GlobeIcon
        onClick={toggleIconsVisibility}
        className="hover:scale-125 transition duration-200 ease-in-out opacity-70 active:scale-75"
        width="1rem"
        height="1rem"
      />
      <AnimatePresence>
        {iconsVisible && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0", opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`${popoverClassName} p-3 absolute rounded bg-black bg-opacity-10 border border-white border-opacity-20`}
          >
            <IconList
              className="flex justify-end place-self-end flex-col "
              icons={socialIcons}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};
export default AnimatedIconStack;
