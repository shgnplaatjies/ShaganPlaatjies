import { Box, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import "../public/styles/globals.css";
import MainLayout from "./components/layout/Main/layout";
import { CONTACT_INFO } from "./lib/constants";
import { ChakraPetch, FixedSys, SpaceMono } from "./lib/fonts";
import { ThemeProvider } from "./lib/theme-context";

const title = "Shagan Plaatjies";
const description = "My slice of the silicone sea, welcome to my portfolio!";

export const metadata: Metadata = {
  metadataBase: new URL(CONTACT_INFO.website),
  title,
  description,
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title,
    description,
    url: CONTACT_INFO.website,
    siteName: title,
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${SpaceMono.variable} ${FixedSys.variable} ${ChakraPetch.variable} bg-gray-1 dark:bg-gray-1`}
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
        <body className="flex flex-col h-dvh w-dvh overflow-hidden text-gray-12" suppressHydrationWarning>
          <ThemeProvider>
            <Theme appearance="dark" radius="small" panelBackground="translucent" accentColor="cyan">
              <Box className="flex flex-col h-full w-full bg-transparent">
                <MainLayout>{children}</MainLayout>
              </Box>
            </Theme>
          </ThemeProvider>
        </body>
      </html>
  );
}
