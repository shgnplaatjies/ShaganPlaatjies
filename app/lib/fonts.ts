import { Chakra_Petch, Space_Mono } from "next/font/google";
import localFont from "next/font/local";

export const FixedSys = localFont({
  src: "./fonts/FixedSys.ttf",
  display: "swap",
  variable: "--font-fixed-sys",
});

export const SpaceMono = Space_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
});

export const ChakraPetch = Chakra_Petch({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-chakra-petch",
});
