import { Chakra_Petch, Space_Mono } from "next/font/google";
import localFont from "next/font/local";

export const FixedSys = localFont({
  src: "./fonts/FixedSys.ttf",
  display: "swap",
});

export const SpaceMono = Space_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const ChakraPetch = Chakra_Petch({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});
