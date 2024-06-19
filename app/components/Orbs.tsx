"use client";
import { Box } from "@radix-ui/themes";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { animated, useScroll } from "@react-spring/web";
import React, { useContext } from "react";
import { ScrollContext } from "../lib/context/ScrollContext";
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
    container: scrollAreaRef,
  });

  return (
    <Parallax pages={3}>
      <ParallaxLayer speed={0.8}>
        <div className={className}>
          <Box className="flex h-full w-full p-4 justify-between absolute">
            <animated.div
              style={{
                scrollPaddingBottom: scrollYProgress.to(
                  (progress) => `${progress * 50}%`
                ),
              }}
            >
              <PulsingCircle
                duration={pulseDuration}
                className="flex w-1/2 h-2/5 justify-center place-self-end"
              />
            </animated.div>

            <animated.div
              style={{
                scrollPaddingTop: scrollYProgress.to(
                  (progress) => `${progress * 50}%`
                ),
              }}
            >
              <PulsingCircle
                duration={pulseDuration * 0.66}
                className="flex w-1/2 h-2/5 justify-center"
              />
            </animated.div>
          </Box>
        </div>
      </ParallaxLayer>
    </Parallax>
  );
};
export default Orbs;
