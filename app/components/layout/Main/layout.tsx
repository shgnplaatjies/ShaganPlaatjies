"use client";
import { OrbColorOnPageType, OrbColorOnPagesConfig } from "@/app/lib/constants";
import { Flex, Theme } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "../../Header";
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
      <AnimatedGrid opacity={0.6} gridSize={40} />
      <MatrixRain opacity={0.02} />
      <Flex className="flex flex-col flex-grow w-full h-full backdrop-blur-3xl relative z-10 bg-transparent">
        <Header className="h-auto py-4 flex place-content-center border-b border-gray-border-1 border-opacity-50" />

        <main className="flex flex-grow flex-row overflow-hidden w-full">
          <div className="w-full h-full backdrop-blur-3xl bg-transparent overflow-hidden">
            {children}
          </div>
        </main>
      </Flex>
    </Theme>
  );
};

export default MainLayout;
