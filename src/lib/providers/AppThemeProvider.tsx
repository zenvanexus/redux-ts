/*
import createEmotionCache from "@/utils/createEmotionCache";
import { CacheProvider, EmotionCache, ThemeProvider } from "@emotion/react";
import { CssBaseline, Theme } from "@mui/material";
import Head from "next/head";
import React from "react";
import { useAppSelector } from "../redux/legacyStore/hooks";
import { createCustomTheme } from "@/styles/theme";

const clientSideEmotionCache = createEmotionCache();

type AppThemeProviderProps = {
  emotionCache?: EmotionCache;
  children: React.ReactNode;
};

export default function AppThemeProvider({
  emotionCache = clientSideEmotionCache,
  children,
}: AppThemeProviderProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  const mode = useAppSelector((state) =>
    state.theme.darkTheme ? "dark" : "light",
  );

  const theme = React.useMemo<Theme>(() => createCustomTheme(mode), [mode]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
*/

import createEmotionCache from "@/utils/createEmotionCache";
import { EmotionCache } from "@emotion/cache";
import { SistentThemeProvider } from "@layer5/sistent-components";
import React from "react";
import { useAppSelector } from "../redux/legacyStore/hooks";

const clientSideEmotionCache = createEmotionCache();

type AppThemeProviderProps = {
  emotionCache?: EmotionCache;
  children: React.ReactNode;
};

export default function AppThemeProvider({
  children,
  emotionCache = clientSideEmotionCache,
}: AppThemeProviderProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  const mode = useAppSelector((state) =>
    state.theme.darkTheme ? "dark" : "light",
  );

  return (
    <SistentThemeProvider emotionCache={emotionCache} initialMode={mode}>
      {children}
    </SistentThemeProvider>
  );
}
