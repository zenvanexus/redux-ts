import { Action, ThunkAction } from "@reduxjs/toolkit";
import { newStore } from "./newStore";

export interface K8sConfigState {
  k8sConfig: string[];
}

export interface PageState {
  page: { path: string; title: string; isBeta: boolean };
}

export interface ProgressState {
  showProgress: boolean;
}

export interface ThemeState {
  darkTheme: boolean;
}

export interface NavigatorState {
  isOpen: boolean;
}

export interface UserState {
  user: {} | null;
  loading?: boolean;
  error?: string;
}

export interface ProvidersState {
  providers: Record<string, any> | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedProvider: string;
}

export interface SessionState {
  countdown: number;
  sessionData: string | null;
}

export type RootAppState = {
  theme: ThemeState;
  drawer: NavigatorState;
  user: UserState;
  providers: ProvidersState;
  session: SessionState;
  progress: ProgressState;
  page: PageState;
  k8sConfig: K8sConfigState;
};

export type NewAppStore = ReturnType<typeof newStore>;
export type NewAppState = ReturnType<NewAppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  NewAppState,
  unknown,
  Action
>;
