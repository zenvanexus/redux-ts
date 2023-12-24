export interface PageState {
  path: string;
  title: string;
  isBeta: boolean;
}

export interface AppState {
  page: PageState;
}
