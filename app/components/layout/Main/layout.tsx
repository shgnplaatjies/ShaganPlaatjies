"use client";
import { OrbColorOnPageType, OrbColorOnPagesConfig } from "@/app/lib/constants";
import { Flex, Theme } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import FootPanel from "../../FootPanel";
import Header from "../../Header";
import SidePanel from "../../SidePanel";
import MatrixRain from "../../MatrixRain";
import AnimatedGrid from "../../AnimatedGrid";

const MainLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const pathName = usePathname();

  const defaultConfig = OrbColorOnPagesConfig.default;
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
      <AnimatedGrid opacity={0.3} gridSize={40} />
      <MatrixRain opacity={0.05} />
      <Flex className="flex flex-col flex-grow w-full h-full border rounded-md border-gray-border-1 border-opacity-50 backdrop-blur-3xl relative z-10 bg-transparent">
        <Header className="h-auto py-2 px-4 flex place-content-center border-b border-gray-border-1 border-opacity-50" />

        <main className="flex flex-grow flex-row overflow-hidden w-full">
          <SidePanel className="w-auto hidden sm:flex px-4 py-4 place-content-center border-r border-gray-border-1 border-opacity-50" />

          <div className="w-full h-full backdrop-blur-3xl px-4 bg-transparent overflow-hidden">
            {children}
          </div>
        </main>

        <footer>
          <FootPanel className="h-auto py-3 px-4 flex place-content-center border-t border-gray-border-1 border-opacity-50 sticky bottom-0" />
        </footer>
      </Flex>
    </Theme>
  );
};

export default MainLayout;
