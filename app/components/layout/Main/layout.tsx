import { Box } from "@radix-ui/themes";
import React from "react";
import Footer from "../../Footer";
import Header from "../../Header";

const MainLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Box className="flex flex-col flex-grow w-full h-full border rounded-md border-white border-opacity-20 backdrop-blur-3xl bg-gradient-to-br shadow-inner shadow-slate-700">
      <Header className="h-auto py-4 px-2 flex place-content-center border-b border-opacity-10 border-white" />

      <main className="flex flex-col overflow-hidden mx-2">{children}</main>

      <Footer className="h-auto py-4 px-2 flex place-content-center border-t border-white border-opacity-10 sticky bottom-0 " />
    </Box>
  );
};

export default MainLayout;
