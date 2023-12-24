import { PaletteMode, createTheme } from "@mui/material";
import { darkModePalette, lightModePalette } from "./palette";
import { components } from "./components";
import { typography } from "./typography";

export const drawerWidth = 240;

export const createCustomTheme = (paletteType: PaletteMode) => {
  const commonPalette = {
    palette: {
      paletteType,
      ...(paletteType === "light" ? lightModePalette : darkModePalette),
    },
  };

  const palette =
    paletteType === "dark"
      ? {
          mode: "dark",
          ...commonPalette,
          text: {
            main: "#FFFFFF",
          },
        }
      : {
          mode: "light",
          ...commonPalette,
        };

  const theme = createTheme({
    palette,
    components,
    typography: typography(paletteType),
    breakpoints: {},
  });

  return theme;
};

/*
import { ThemeOptions, createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import QanelasSoftFont from "./fonts";
import { PaletteMode } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    appbar: {
      background: string;
    };
  }

  interface ThemeOptions {
    appbar?: {
      background?: string;
    };
  }
}

type CustomThemeOptions = ThemeOptions & {
  palette: {
    mode?: PaletteMode;
    typography: {
      fontFamily: string;
      body1: {
        fontFamily: string;
      };
      body2: {
        fontFamily: string;
      };
    };
  };
};

const createCustomTheme = (paletteType: PaletteMode) => {
  const commonPalette = {
    primary: {
      main: blueGrey[600],
    },
    secondary: {
      main: "#EE5351",
    },
    typography: {
      fontFamily: QanelasSoftFont.style.fontFamily,
      body1: { fontFamily: QanelasSoftFont.style.fontFamily },
      body2: { fontFamily: QanelasSoftFont.style.fontFamily },
    },
    appbar: {
      background: "#396679",
    },
  };

  const palette =
    paletteType === "dark"
      ? {
          mode: "dark",
          ...commonPalette,
          secondary: {
            ...commonPalette.secondary,
          },
          typography: {
            ...commonPalette.typography,
            h5: {
              color: "#FFFFFF",
            },
            h6: {
              color: "#FFFFFF",
            },
            p: {
              color: "#FFFFFF",
            },
          },
          text: {
            main: "#FFFFFF",
          },
          appbar: {
            background: "#202020",
          },
        }
      : {
          mode: "light",
          ...commonPalette,
          secondary: {
            ...commonPalette.secondary,
          },
        };

  const theme = createTheme({
    palette,
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            elevation: 2,
            background: "#396679",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          root: {
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              background: "#263238",
            },
          },
        },
      },
    },
  }) as unknown as CustomThemeOptions;

  return theme;
};

const darkTheme = createCustomTheme("dark");
const lightTheme = createCustomTheme("light");

export { darkTheme, lightTheme };
*/

export const notificationColors = {
  error: "#F91313",
  warning: "#F0A303",
  success: "#206D24",
  info: "#2196F3",
  darkRed: "#B32700",
  lightwarning: "#E75225",
};

export const darkNotificationColors = {
  error: "#F91313",
  warning: "#F0D053",
  success: "#78C57C",
  info: "#5FD4FF",
};

/*
export const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerCollapsed: {
    [theme.breakpoints.up("sm")]: { width: theme.spacing(8.4) + 1 },
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
  },
  appContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  mainContent: {
    flex: 1,
    padding: "48px 36px 24px",
  },
  footer: {
    backgroundColor: "#fff",
    padding: theme.spacing(2),
  },
  footerDark: {
    backgroundColor: "#202020",
    padding: theme.spacing(2),
  },
  footerText: {
    cursor: "pointer",
    display: "inline",
    verticalAlign: "middle",
  },
  footerIcon: {
    display: "inline",
    verticalAlign: "bottom",
  },
  icon: { fontSize: 20 },
  notifSuccess: {
    backgroundColor: "rgb(248, 252, 248) !important",
    color: `${notificationColors.success} !important`,
    pointerEvents: "auto !important",
  },
  notifInfo: {
    backgroundColor: "rgb(248, 252, 248) !important",
    color: `${notificationColors.info} !important`,
    pointerEvents: "auto !important",
  },
  notifWarn: {
    backgroundColor: "#fff !important",
    color: `${notificationColors.warning} !important`,
    pointerEvents: "auto !important",
  },
  notifError: {
    backgroundColor: "rgb(248, 252, 248) !important",
    color: `${notificationColors.error} !important`,
    pointerEvents: "auto !important",
  },
  darknotifSuccess: {
    backgroundColor: "#323232 !important",
    color: `${darkNotificationColors.success} !important`,
    pointerEvents: "auto !important",
  },
  darknotifInfo: {
    backgroundColor: "#323232 !important",
    color: `${darkNotificationColors.info} !important`,
    pointerEvents: "auto !important",
  },
  darknotifWarn: {
    backgroundColor: "#323232 !important",
    color: `${darkNotificationColors.warning} !important`,
    pointerEvents: "auto !important",
  },
  darknotifError: {
    backgroundColor: "#323232 !important",
    color: `${darkNotificationColors.error} !important`,
    pointerEvents: "auto !important",
  },
  playgroundFooter: {
    backgroundColor: notificationColors.warning,
    padding: theme.spacing(2),
  },
}));
*/
