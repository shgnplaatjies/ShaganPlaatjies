import type { Config } from "tailwindcss";

const generateScale = (name: string) => {
  let scale = Array.from({ length: 12 }, (_, i) => {
    let id = i + 1;
    return [
      [id, `var(--${name}${id})`],
      [`a${id}`, `var(--${name}A${id})`],
    ];
  }).flat();

  return Object.fromEntries(scale);
};

const themeConfig: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        gray: generateScale("slate"),
        accent: generateScale("cyan"),
      },
    },
  },
};

export default themeConfig;
