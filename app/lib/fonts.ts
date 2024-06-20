import { Fira_Code, Ubuntu_Mono } from "next/font/google";
import localFont from "next/font/local";

export const UbuntuMono = Ubuntu_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ubuntu-mono",
});

export const FiraCode = Fira_Code({ subsets: ["latin"], display: "swap" });

export const FixedSys = localFont({
  src: "./fonts/FixedSys.ttf",
  display: "swap",
});
