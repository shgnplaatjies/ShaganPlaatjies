import type { Config } from "tailwindcss";
import {
  DarkGrayTailwindColors,
  DarkModeTailwindColors,
} from "./app/lib/colors";
import themeConfig from "./tailwind.theme.config";

const config: Config = {
  ...themeConfig,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@radix-ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: { ...DarkModeTailwindColors.bg },
          interactive: { ...DarkModeTailwindColors.interactive },
          border: { ...DarkModeTailwindColors.border },
          solid: { ...DarkModeTailwindColors.solid },
          text: { ...DarkModeTailwindColors.text },
        },
        gray: {
          bg: { ...DarkGrayTailwindColors.bg },
          interactive: { ...DarkGrayTailwindColors.interactive },
          border: { ...DarkGrayTailwindColors.border },
          solid: { ...DarkGrayTailwindColors.solid },
          text: { ...DarkGrayTailwindColors.text },
        },
      },
    },
  },
  plugins: [],
};
export default config;
