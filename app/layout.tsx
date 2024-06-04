import { ClerkProvider } from "@clerk/nextjs";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
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
          <Theme>{children}</Theme>
        </body>
      </html>
    </ClerkProvider>
  );
}
