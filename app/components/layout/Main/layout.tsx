import React from "react";
import Footer from "../../Footer";
import Header from "../../Header";

const MainLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer href="/contact" text="Contact me" />
    </div>
  );
};

export default MainLayout;
