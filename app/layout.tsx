import { ClerkProvider } from "@clerk/nextjs";
import { Box, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import "../public/styles/globals.css";
import MainLayout from "./components/layout/Main/layout";
import { UbuntuMono } from "./lib/fonts";

export const metadata: Metadata = {
  title: "Shagan Plaatjies",
  description: "My slice of the silicone sea, welcome to my portfolio!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={UbuntuMono.className}>
          <Theme
            appearance="dark"
            accentColor="green"
            radius="small"
            panelBackground="translucent"
            className="flex flex-col h-screen w-screen"
          >
            <Box className=" flex flex-col h-full w-full backdrop-blur-3xl bg-gradient-to-br">
              <Box className="flex w-full h-full p-3">
                <MainLayout>{children}</MainLayout>
              </Box>
            </Box>
          </Theme>
        </body>
      </html>
    </ClerkProvider>
  );
}
