import { ClerkProvider } from "@clerk/nextjs";
import { Box, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import "../public/styles/globals.css";
import MainLayout from "./components/layout/Main/layout";
import { ChakraPetch, FixedSys, SpaceMono } from "./lib/fonts";
import { ThemeProvider } from "./lib/theme-context";

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
        className={`${SpaceMono.variable} ${FixedSys.variable} ${ChakraPetch.variable} bg-black`}
      >
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const theme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const isDark = theme === 'dark' || (!theme && prefersDark);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  }
                })();
              `,
            }}
          />
        </head>
        <body className="flex flex-col h-dvh w-dvh overflow-hidden text-black dark:text-white">
          <ThemeProvider>
            <Theme appearance="dark" radius="small" panelBackground="translucent">
              <Box className="flex flex-col h-full w-full bg-transparent">
                <MainLayout>{children}</MainLayout>
              </Box>
            </Theme>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
