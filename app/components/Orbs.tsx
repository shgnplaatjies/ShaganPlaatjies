"use client";
import { Box } from "@radix-ui/themes";
import { animated, useScroll } from "@react-spring/web";
import React, { useContext } from "react";
import { ScrollContext } from "../lib/context/ScrollContext";
import { isHTMLElementRef } from "../lib/utils";
import PulsingCircle from "./animations/PulsingCircle";

type OrbProps = {
  className?: string;
  pulseDuration?: number;
};

const Orbs: React.FC<OrbProps> = ({
  className = "",
  pulseDuration = 5000,
}: OrbProps) => {
  const scrollAreaRef = useContext(ScrollContext);

  const { scrollYProgress } = useScroll({
    container: isHTMLElementRef(scrollAreaRef) ? scrollAreaRef : undefined,
  });

  return (
    <div className={className}>
      <Box className="flex h-full w-full p-4 justify-between absolute">
        <animated.div
          className="flex w-1/2 h-2/5 justify-center place-self-end"
          style={{
            marginBottom: scrollYProgress.to((progress) => `${progress * 80}%`),
          }}
        >
          <PulsingCircle duration={pulseDuration} className="w-full h-full" />
        </animated.div>

        <animated.div
          className="flex w-1/2 h-2/5 justify-center"
          style={{
            marginTop: scrollYProgress.to((progress) => `${progress * 80}%`),
          }}
        >
          <PulsingCircle
            duration={pulseDuration * 0.66}
            className="w-full h-full"
          />
        </animated.div>
      </Box>
    </div>
  );
};
export default Orbs;
