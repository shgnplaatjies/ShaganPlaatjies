import { Box } from "@radix-ui/themes";
import React from "react";
import FootPanel from "../../FootPanel";
import Header from "../../Header";
import SidePanel from "../../SidePanel";

const MainLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Box className="flex flex-col flex-grow w-full h-full border rounded-md border-white border-opacity-20 backdrop-blur-3xl bg-gradient-to-br shadow-inner shadow-slate-700">
      <Header className="h-auto py-2 px-4 flex place-content-center border-b border-opacity-10 border-white" />

      <main className="flex flex-row overflow-hidden">
        <SidePanel className="w-auto px-4 py-4 place-content-center border-r border-opacity-10 border-white" />

        <Box>{children}</Box>
      </main>

      <footer>
        <FootPanel className="h-auto py-3 px-4 flex place-content-center border-t border-white border-opacity-10 sticky bottom-0 " />
      </footer>
    </Box>
  );
};

export default MainLayout;
