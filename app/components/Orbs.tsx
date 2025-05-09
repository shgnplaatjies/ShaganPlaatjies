"client-only";
import { Box } from "@radix-ui/themes";
import { animated, useScroll } from "@react-spring/web";
import React, { MutableRefObject } from "react";
import { OrbColorOnPagesConfig } from "../lib/constants";
import PulsingCircle from "./animations/PulsingCircle";

type OrbProps = {
  className?: string;
  pulseDuration?: number;
  scrollRef?: MutableRefObject<HTMLDivElement | null>;
  color?: string;
  blurAmount?: number;
};

const Orbs: React.FC<OrbProps> = ({
  className = "",
  pulseDuration = 5000,
  scrollRef,
  color = OrbColorOnPagesConfig.default.color,
  blurAmount = 4,
}: OrbProps) => {
  const { scrollYProgress } = useScroll({
    container: scrollRef as MutableRefObject<HTMLElement>,
  });

  return (
    <Box className={className}>
      <Box className="flex h-full w-full justify-between">
        <animated.div
          className="flex w-1/2 h-2/5 justify-center place-self-end"
          style={{
            marginBottom: scrollYProgress.to(
              (progress) => `${progress * 50}vh`
            ),
          }}
        >
          <PulsingCircle
            color={color}
            duration={pulseDuration}
            className="w-full h-full"
            blurAmount={blurAmount}
          />
        </animated.div>

        <animated.div
          className="flex w-1/2 h-2/5 justify-center"
          style={{
            marginTop: scrollYProgress.to((progress) => `${progress * 50}vh`),
          }}
        >
          <PulsingCircle
            color={color}
            duration={pulseDuration * 0.66}
            className="w-full h-full"
            blurAmount={blurAmount * 1.5}
          />
        </animated.div>
      </Box>
    </Box>
  );
};
export default Orbs;
