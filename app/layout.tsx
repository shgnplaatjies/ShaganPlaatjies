import { ClerkProvider } from "@clerk/nextjs";
import { Box, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Ubuntu_Mono } from "next/font/google";
import "../public/styles/globals.css";
import PulsingCircle from "./components/animations/PulsingCircle";
import MainLayout from "./components/layout/Main/layout";

const ubuntuMono = Ubuntu_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ubuntu-mono",
});

export const metadata: Metadata = {
  title: "Shagan Plaatjies",
  description: "My slice of the silicone sea, welcome to my portfolio!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pulseDuration = 10000;

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={ubuntuMono.className}>
          <Theme
            appearance="dark"
            accentColor="green"
            radius="small"
            panelBackground="translucent"
            className="flex flex-col h-screen w-screen"
          >
            <Box className="flex h-full w-full p-3 justify-between absolute">
              <PulsingCircle
                duration={pulseDuration}
                className="flex w-1/2 h-1/2 place-self-end"
              />

              <PulsingCircle
                duration={pulseDuration * 0.75}
                className="flex w-1/2 h-1/2"
              />
            </Box>
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
