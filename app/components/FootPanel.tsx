"use client";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Box, Flex, Grid, IconButton, Text } from "@radix-ui/themes";
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
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Read initial theme
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved) {
      setTheme(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setTheme(newTheme);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getTime());
    }, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box className={className}>
      <Grid
        width="100%"
        columns="3"
      >
        <Flex align="center">
          <IconButton
            onClick={toggleTheme}
            variant="ghost"
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </IconButton>
        </Flex>
        <Text as="p" size="1" className="flex text-nowrap justify-center opacity-60">
          Johannesburg {currentTime}
        </Text>
        <IconList
          className="sm:flex justify-end hidden sm:visible place-self-end"
          icons={socialIcons}
        />
        <Flex
          justify="end"
          align="center"
        >
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
