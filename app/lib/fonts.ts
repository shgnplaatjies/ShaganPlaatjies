import { Fira_Code, Ubuntu_Mono } from "next/font/google";

export const UbuntuMono = Ubuntu_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ubuntu-mono",
});

export const FiraCode = Fira_Code({ subsets: ["latin"] });
