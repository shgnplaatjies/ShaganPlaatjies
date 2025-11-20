import React from "react";
import MainLayoutClient from "./MainLayoutClient";

const MainLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <MainLayoutClient>{children}</MainLayoutClient>;
};

export default MainLayout;
