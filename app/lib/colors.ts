export const PrimaryColor = "#42984d";

export const PrimaryRadixColor = "grass";

export const LightPrimaryColors = {
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

export const DarkPrimaryColors = {
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

export const DarkModeColors = {
  primary: DarkPrimaryColors,
  gray: DarkGrayColors,
  background: DarkBackgroundColor,
};

export const LightModeColors = {
  primary: LightPrimaryColors,
  gray: LightGrayColors,
  background: LightBackgroundColor,
};

export const DarkModeTailwindColors = {
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

export const DarkGrayTailwindColors = {
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

export const LightModeTailwindColors = {
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

export const LightGrayTailwindColors = {
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
