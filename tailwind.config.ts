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
        gray: {
          1: 'var(--gray-1)',
          2: 'var(--gray-2)',
          3: 'var(--gray-3)',
          4: 'var(--gray-4)',
          5: 'var(--gray-5)',
          6: 'var(--gray-6)',
          7: 'var(--gray-7)',
          8: 'var(--gray-8)',
          9: 'var(--gray-9)',
          10: 'var(--gray-10)',
          11: 'var(--gray-11)',
          12: 'var(--gray-12)',
          'border-1': 'var(--gray-4)',
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
