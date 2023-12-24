// import { useAppSelector } from "./legacyStore/hooks";
import { RootAppState } from "./types";

export const isDrawerOpenSelector = (state: RootAppState) =>
  state.drawer.isOpen;

export const selectProviders = (state: RootAppState) =>
  state.providers.providers;

export const selectCountdown = (state: RootAppState) => state.session.countdown;

// export const isDrawerCollapsed = useAppSelector((state) => state.isDrawerCollapsed);
// export const k8sConfig = useAppSelector((state) => state.k8sConfig);

export const selectShowProgress = (state: RootAppState) =>
  state.progress.showProgress;
