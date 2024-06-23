"use client";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { Box, Flex, Grid, Link } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { POLLING_INTERVAL } from "../lib/constants";
import AnimatedIconStack from "./AnimatedIconStack";
import IconList from "./IconsList";
import { getSocialIcons } from "./icons/SocialIcons";

type FootPanelProps = {
  className: string;
};

const FootPanel: React.FC<FootPanelProps> = ({
  className = "",
}: FootPanelProps) => {
  const socialIcons = getSocialIcons();

  const getTime = () =>
    new Date().toLocaleTimeString("en-ZA", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    });

  const [currentTime, setCurrentTime] = useState<string>("00:00 am");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getTime());
    }, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box className={className}>
      <Grid width="100%" columns="3">
        <Flex align="center">
          <Link href="/contact" asChild>
            <DotFilledIcon width="1.15rem" height="1.15rem" />
          </Link>
        </Flex>
        <p className="flex text-nowrap justify-center opacity-60 text-sm">
          Johannesburg {currentTime}
        </p>
        <IconList
          className="sm:flex justify-end hidden sm:visible place-self-end"
          icons={socialIcons}
        />
        <Flex justify="end" align="center">
          <AnimatedIconStack
            iconList={socialIcons}
            directionX="right"
            directionY="up"
            buttonClassName="flex justify-end sm:hidden"
            popoverClassName="bottom-12 right-1.5 mb-1"
          />
        </Flex>
      </Grid>
    </Box>
  );
};
export default FootPanel;
