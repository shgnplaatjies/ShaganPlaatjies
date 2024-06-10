import { ClerkProvider } from "@clerk/nextjs";
import { Flex, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Ubuntu_Mono } from "next/font/google";
import PulsingCircle from "./components/animations/PulsingCircle";
import MainLayout from "./components/layout/Main/layout";
import "./styles/globals.css";

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
  const pulseDuration = 8000;

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={ubuntuMono.className}>
          <ThemeProvider attribute="media">
            <Theme
              appearance="dark"
              accentColor="green"
              radius="small"
              panelBackground="translucent"
            >
              <Flex direction="column" height="100vh" width="100vw">
                <Flex
                  height="100%"
                  width="100%"
                  px="3"
                  justify="between"
                  position="absolute"
                >
                  <PulsingCircle
                    duration={pulseDuration}
                    className="flex h-1/2 place-self-end"
                  />
                  <PulsingCircle
                    duration={pulseDuration * 0.75}
                    className="flex h-1/2"
                  />
                </Flex>
                <MainLayout>{children}</MainLayout>
              </Flex>
            </Theme>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
