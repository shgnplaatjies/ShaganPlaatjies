"use client";
import { OrbColorOnPageType, OrbColorOnPagesConfig } from "@/app/lib/constants";
import { Box, Flex, ScrollArea, Theme } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import FootPanel from "../../FootPanel";
import Header from "../../Header";
import Orbs from "../../Orbs";
import SidePanel from "../../SidePanel";

const MainLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const pathName = usePathname();
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const defaultConfig = OrbColorOnPagesConfig.home;
  const [orbColor, setOrbColor] = useState<OrbColorOnPageType>(defaultConfig);

  useEffect(() => {
    setOrbColor(
      Object.values(OrbColorOnPagesConfig).find(
        (orb) => orb.path === pathName
      ) ?? defaultConfig
    );
  }, [pathName]);

  return (
    <Theme accentColor={orbColor.radixColor} className="w-full h-full">
      <Flex className="flex flex-col flex-grow w-full h-full border rounded-md border-white border-opacity-20 backdrop-blur-3xl bg-gradient-to-br shadow-inner shadow-slate-700">
        <Header className="h-auto py-2 px-4 flex place-content-center border-b border-opacity-10 border-white" />

        <main className="flex flex-grow flex-row overflow-hidden">
          <SidePanel className="w-auto hidden sm:flex px-4 py-4 place-content-center border-r border-opacity-10 border-white" />

          <ScrollArea ref={scrollAreaRef}>
            <Orbs
              pulseDuration={10000}
              className="w-full h-full absolute"
              scrollRef={scrollAreaRef}
              color={orbColor.color}
            />
            <Box className="w-full h-full backdrop-blur-3xl px-4">
              {children}
            </Box>
          </ScrollArea>
        </main>

        <footer>
          <FootPanel className="h-auto py-3 px-4 flex place-content-center border-t border-white border-opacity-10 sticky bottom-0 " />
        </footer>
      </Flex>
    </Theme>
  );
};

export default MainLayout;
