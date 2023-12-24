import { TypographyOptions } from "@mui/material/styles/createTypography";
import QanelasSoftFont from "./fonts";
import { PaletteMode } from "@mui/material";

export const typography = (paletteType: PaletteMode): TypographyOptions => {
  return {
    fontFamily: QanelasSoftFont.style.fontFamily,
    body1: { fontFamily: QanelasSoftFont.style.fontFamily },
    body2: { fontFamily: QanelasSoftFont.style.fontFamily },
    h5: {
      color: paletteType === "light" ? "#000000" : "#FFFFFF",
    },
    h6: {
      color: paletteType === "light" ? "#000000" : "#FFFFFF",
    },
  };
};
