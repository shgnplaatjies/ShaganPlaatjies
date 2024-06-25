import type { Config } from "tailwindcss";
import {
  AccentTailwindUtils,
  DarkGrayTailwindUtils,
  DarkModeTailwindUtils,
  RadixBaseColorTailwindUtils,
  ShadowShadeTailwindUtils,
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
          bg: { ...DarkModeTailwindUtils.bg },
          interactive: { ...DarkModeTailwindUtils.interactive },
          border: { ...DarkModeTailwindUtils.border },
          solid: { ...DarkModeTailwindUtils.solid },
          text: { ...DarkModeTailwindUtils.text },
        },
        gray: {
          bg: { ...DarkGrayTailwindUtils.bg },
          interactive: { ...DarkGrayTailwindUtils.interactive },
          border: { ...DarkGrayTailwindUtils.border },
          solid: { ...DarkGrayTailwindUtils.solid },
          text: { ...DarkGrayTailwindUtils.text },
        },
        accent: {
          bg: { ...AccentTailwindUtils.bg },
          interactive: { ...AccentTailwindUtils.interactive },
          border: { ...AccentTailwindUtils.border },
          solid: { ...AccentTailwindUtils.solid },
          text: { ...AccentTailwindUtils.text },
        },
        radix: {
          base: {
            ...RadixBaseColorTailwindUtils,
          },
        },
      },
      boxShadow: {
        ...ShadowShadeTailwindUtils,
      },
    },
  },
  plugins: [],
};
export default config;
