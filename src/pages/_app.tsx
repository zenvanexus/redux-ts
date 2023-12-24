// import { useAppDispatch, useAppSelector } from "@/lib/redux/legacyStore/hooks";
import RootLayout from "@/components/RootLayout";
import AppThemeProvider from "@/lib/providers/AppThemeProvider";
import { legacyWrapper } from "@/lib/redux/legacyStore/legacy.store";
import { newStore } from "@/lib/redux/newStore";
import { createRelayEnvironment } from "@/lib/relay/RelayEnvironment";
import type { AppProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { RelayEnvironmentProvider } from "react-relay";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Typography } from "@layer5/sistent-components";
import { FavoriteIcon } from "@layer5/sistent-svg";
import { useTheme } from "@mui/material";
import { EmotionCache } from "@emotion/cache";

function MainContent({ children }: { children: React.ReactNode }) {
  return <div style={{ flex: 1, padding: "48px 36px 24px" }}>{children}</div>;
}

function MuiDateTimePickerWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      {children}
    </LocalizationProvider>
  );
}

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function MainFooter({ capabilitiesRegistry, handleL5CommunityClick }) {
  const theme = useTheme();

  return (
    <footer
      className={
        capabilitiesRegistry?.restrictedAccess?.isMesheryUiRestricted
          ? "playgroundFooter"
          : theme.palette.mode === "dark"
            ? "footerDark"
            : "footer"
      }
    >
      <Typography
        variant="body2"
        align="center"
        color="textSecondary"
        component="p"
        style={
          capabilitiesRegistry?.restrictedAccess?.isMesheryUiRestricted
            ? { color: "#000" }
            : {}
        }
      >
        <span onClick={handleL5CommunityClick} className="footerText">
          {capabilitiesRegistry?.restrictedAccess?.isMesheryUiRestricted ? (
            "ACCESS LIMITED IN MESHERY PLAYGROUND. DEPLOY MESHERY TO ACCESS ALL FEATURES."
          ) : (
            <>
              {" "}
              Built with{" "}
              <FavoriteIcon
                style={{
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.focused.main
                      : "#00b39f",
                }}
                className="footerIcon"
              />{" "}
              by the Layer5 Community
            </>
          )}
        </span>
      </Typography>
    </footer>
  );
}

function PlaygroundMeshDeploy() {}

interface K8sContextResult {
  k8sContext: {
    contexts: string[];
  };
}

interface MesheryAppProps extends AppProps {
  emotionCache?: EmotionCache;
  children: React.ReactNode;
}

export default function App({
  Component,
  pageProps,
  ...rest
}: MesheryAppProps) {
  const { store, props } = legacyWrapper.useWrappedStore(rest);

  // Log the state changes
  console.log("Legacy state after dispatch:", store.getState());

  // Relay Framework
  const relayEnvironment = createRelayEnvironment();

  // const dispatch = useAppDispatch();

  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <ErrorBoundary>
        <Provider store={store}>
          <Provider store={newStore()}>
            <AppThemeProvider>
              <RootLayout>
                <Component {...props.pageProps} />
              </RootLayout>
            </AppThemeProvider>
          </Provider>
        </Provider>
      </ErrorBoundary>
    </RelayEnvironmentProvider>
  );
}
