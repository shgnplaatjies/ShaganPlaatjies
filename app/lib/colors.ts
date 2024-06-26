export const RadixBaseColorValues = {
  gray: "var(--gray-9)",
  gold: "var(--gold-9)",
  bronze: "var(--bronze-9)",
  brown: "var(--brown-9)",
  yellow: "var(--yellow-9)",
  amber: "var(--amber-9)",
  orange: "var(--orange-9)",
  tomato: "var(--tomato-9)",
  red: "var(--red-9)",
  ruby: "var(--ruby-9)",
  crimson: "var(--crimson-9)",
  pink: "var(--pink-9)",
  plum: "var(--plum-9)",
  purple: "var(--purple-9)",
  violet: "var(--violet-9)",
  iris: "var(--iris-9)",
  indigo: "var(--indigo-9)",
  blue: "var(--blue-9)",
  cyan: "var(--cyan-9)",
  teal: "var(--teal-9)",
  jade: "var(--jade-9)",
  green: "var(--green-9)",
  grass: "var(--grass-9)",
  lime: "var(--lime-9)",
  mint: "var(--mint-9)",
  sky: "var(--sky-9)",
};

export const ShadowShadeValues = {
  1: "var(--shadow-1)",
  2: "var(--shadow-2)",
  3: "var(--shadow-3)",
  4: "var(--shadow-4)",
  5: "var(--shadow-5)",
  6: "var(--shadow-6)",
};

export const AccentColorValues = {
  1: "var(--accent-1)",
  2: "var(--accent-2)",
  3: "var(--accent-3)",
  4: "var(--accent-4)",
  5: "var(--accent-5)",
  6: "var(--accent-6)",
  7: "var(--accent-7)",
  8: "var(--accent-8)",
  9: "var(--accent-9)",
  10: "var(--accent-10)",
  11: "var(--accent-11)",
  12: "var(--accent-12)",
};

export const LightColorValues = {
  1: "#ECF0EC",
  2: "#E6EBE6",
  3: "#D8E6D9",
  4: "#C8DFCA",
  5: "#B6D6B8",
  6: "#9FCAA3",
  7: "#80BA87",
  8: "#52A55F",
  9: "#3E9B4F",
  10: "#2F8E43",
  11: "#0F6C29",
  12: "#213C24",
};

export const LightGrayColors = {
  1: "#EDEFEE",
  2: "#E8EAE9",
  3: "#DEE0DF",
  4: "#D5D7D6",
  5: "#CCCFCE",
  6: "#C4C7C5",
  7: "#B8BBB9",
  8: "#A4A8A6",
  9: "#747A77",
  10: "#6A706D",
  11: "#4E5351",
  12: "#1C201E",
};

export const LightBackgroundColor = "#E9F6E9";

export const DarkColorValues = {
  1: "#1B211B",
  2: "#1F251F",
  3: "#243526",
  4: "#26432A",
  5: "#2D5031",
  6: "#345D3A",
  7: "#3C6C42",
  8: "#437D4B",
  9: "#3E9B4F",
  10: "#2F8E43",
  11: "#74D081",
  12: "#BDF0C2",
};

export const DarkGrayColors = {
  1: "#1F1F1F",
  2: "#262626",
  3: "#2E2F2F",
  4: "#343535",
  5: "#3A3B3B",
  6: "#424343",
  7: "#4E504F",
  8: "#646765",
  9: "#717472",
  10: "#7D807E",
  11: "#B3B7B5",
  12: "#EAEFED",
};

export const DarkBackgroundColor = "#1A211E";

// Above this line is cosmetic, below is functional

export const RadixBaseColors = {
  color: RadixBaseColorValues,
};

export const ShadowShades = {
  shadow: ShadowShadeValues,
};

export const AccentColors = {
  accent: AccentColorValues,
};

export const DarkModeColors = {
  primary: DarkColorValues,
  gray: DarkGrayColors,
  background: DarkBackgroundColor,
};

export const LightModeColors = {
  primary: LightColorValues,
  gray: LightGrayColors,
  background: LightBackgroundColor,
};

export const RadixBaseColorTailwindUtils = { ...RadixBaseColors.color };

export const ShadowShadeTailwindUtils = {
  "theme-inset": ShadowShadeValues[1],
  "theme-classic-1": ShadowShadeValues[2],
  "theme-classic-2": ShadowShadeValues[3],
  "theme-sm-1": ShadowShadeValues[4],
  "theme-sm-2": ShadowShadeValues[5],
  "theme-large": ShadowShadeValues[6],
};

export const AccentTailwindUtils = {
  bg: {
    1: AccentColors.accent[1],
    2: AccentColors.accent[1],
  },
  interactive: {
    1: AccentColors.accent[3],
    2: AccentColors.accent[4],
    3: AccentColors.accent[5],
  },
  border: {
    1: AccentColors.accent[6],
    2: AccentColors.accent[7],
    3: AccentColors.accent[8],
  },
  solid: {
    1: AccentColors.accent[9],
    2: AccentColors.accent[10],
  },
  text: {
    1: AccentColors.accent[11],
    2: AccentColors.accent[12],
  },
};

export const DarkModeTailwindUtils = {
  bg: {
    1: DarkModeColors.background,
    2: DarkModeColors.primary[1],
    3: DarkModeColors.primary[2],
  },
  interactive: {
    1: DarkModeColors.primary[3],
    2: DarkModeColors.primary[4],
    3: DarkModeColors.primary[5],
  },
  border: {
    1: DarkModeColors.primary[6],
    2: DarkModeColors.primary[7],
    3: DarkModeColors.primary[8],
  },
  solid: {
    1: DarkModeColors.primary[9],
    2: DarkModeColors.primary[10],
  },
  text: {
    1: DarkModeColors.primary[11],
    2: DarkModeColors.primary[12],
  },
};

export const DarkGrayTailwindUtils = {
  bg: {
    2: DarkModeColors.gray[1],
    3: DarkModeColors.gray[2],
  },
  interactive: {
    1: DarkModeColors.gray[3],
    2: DarkModeColors.gray[4],
    3: DarkModeColors.gray[5],
  },
  border: {
    1: DarkModeColors.gray[6],
    2: DarkModeColors.gray[7],
    3: DarkModeColors.gray[8],
  },
  solid: {
    1: DarkModeColors.gray[9],
    2: DarkModeColors.gray[10],
  },
  text: {
    1: DarkModeColors.gray[11],
    2: DarkModeColors.gray[12],
  },
};

export const LightModeTailwindUtils = {
  bg: {
    1: LightModeColors.background,
    2: LightModeColors.primary[1],
    3: LightModeColors.primary[2],
  },
  interactive: {
    1: LightModeColors.primary[3],
    2: LightModeColors.primary[4],
    3: LightModeColors.primary[5],
  },
  border: {
    1: LightModeColors.primary[6],
    2: LightModeColors.primary[7],
    3: LightModeColors.primary[8],
  },
  solid: {
    1: LightModeColors.primary[9],
    2: LightModeColors.primary[10],
  },
  text: {
    1: LightModeColors.primary[11],
    2: LightModeColors.primary[12],
  },
};

export const LightGrayTailwindUtils = {
  bg: {
    2: LightModeColors.gray[1],
    3: LightModeColors.gray[2],
  },
  interactive: {
    1: LightModeColors.gray[3],
    2: LightModeColors.gray[4],
    3: LightModeColors.gray[5],
  },
  border: {
    1: LightModeColors.gray[6],
    2: LightModeColors.gray[7],
    3: LightModeColors.gray[8],
  },
  solid: {
    1: LightModeColors.gray[9],
    2: LightModeColors.gray[10],
  },
  text: {
    1: LightModeColors.gray[11],
    2: LightModeColors.gray[12],
  },
};
