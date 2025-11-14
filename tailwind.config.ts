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
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@radix-ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    ...themeConfig.theme,
    extend: {
      ...(themeConfig.theme?.extend || {}),
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
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
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
      backgroundColor: {
        white: '#ffffff',
        black: '#000000',
      },
      textColor: {
        white: '#ffffff',
        black: '#000000',
      },
      borderColor: {
        white: '#ffffff',
        black: '#000000',
      },
      boxShadow: {
        ...ShadowShadeTailwindUtils,
      },
    },
  },
  plugins: [],
};
export default config;
