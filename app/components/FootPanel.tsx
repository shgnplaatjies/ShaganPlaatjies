"use client";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { Box, Grid, Link } from "@radix-ui/themes";
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
        <Link href="/contact" asChild>
          <DotFilledIcon color="green" width="1.25rem" height="1.25rem" />
        </Link>
        <p className="flex text-nowrap justify-center opacity-60 text-sm">
          Johannesburg {currentTime}
        </p>
        <IconList
          className="sm:flex justify-end hidden sm:visible place-self-end"
          icons={socialIcons}
        />
        <AnimatedIconStack
          buttonClassName="flex justify-end sm:hidden place-self-end"
          popoverClassName="bottom-11 right-1 mb-1"
        />
      </Grid>
    </Box>
  );
};
export default FootPanel;
