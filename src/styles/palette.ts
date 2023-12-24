import { PaletteOptions } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { BLACK, WHITE } from "./colors";

export const CHARCOAL = "#607d8b";
export const KEPPEL = "#00b39f";

declare module "@mui/material/styles" {
  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }
  interface Palette {
    neutral?: Palette["primary"];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
  interface Palette {
    focused: Palette["primary"];
  }

  interface PaletteOptions {
    focused?: PaletteOptions["primary"];
  }
}

export const lightModePalette: PaletteOptions = {
  primary: {
    main: blueGrey[600],
    light: blueGrey[400],
    dark: blueGrey[700],
  },
  secondary: {
    main: KEPPEL,
  },
  common: {
    black: BLACK,
    white: WHITE,
  },
  neutral: {},
  focused: {
    main: KEPPEL,
  },
};

export const darkModePalette: PaletteOptions = {
  primary: {
    main: KEPPEL,
  },
  secondary: {
    main: blueGrey[600],
    light: blueGrey[400],
    dark: blueGrey[700],
  },
  neutral: {},
  focused: {
    main: KEPPEL,
  },
  text: {
    primary: "",
    secondary: "",
    disabled: "",
  },
};
