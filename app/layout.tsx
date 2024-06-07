import { ClerkProvider } from "@clerk/nextjs";
import { Flex, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Poppins } from "next/font/google";
import MainLayout from "./components/layout/Main/layout";
import "./styles/globals.css";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

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
        <body className={poppins.className}>
          <ThemeProvider attribute="media">
            <Theme
              appearance="dark"
              accentColor="green"
              radius="small"
              panelBackground="translucent"
            >
              <Flex direction="column" height="100vh" width="100vw">
                <MainLayout>{children}</MainLayout>
              </Flex>
            </Theme>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
