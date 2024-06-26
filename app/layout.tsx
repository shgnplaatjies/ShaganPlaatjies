import { ClerkProvider } from "@clerk/nextjs";
import { Box, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import "../public/styles/globals.css";
import MainLayout from "./components/layout/Main/layout";
import { ChakraPetch, FixedSys, SpaceMono } from "./lib/fonts";

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
      <html
        lang="en"
        className={`${SpaceMono.variable} ${FixedSys.variable} ${ChakraPetch.variable}`}
      >
        <body className="flex flex-col h-dvh w-dvh overflow-hidden">
          <Theme appearance="dark" radius="small" panelBackground="translucent">
            <Box className=" flex flex-col h-full p-3 w-full backdrop-blur-3xl bg-gradient-to-br">
              <MainLayout>{children}</MainLayout>
            </Box>
          </Theme>
        </body>
      </html>
    </ClerkProvider>
  );
}
