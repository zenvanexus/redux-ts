import {
  AnyAction,
  Reducer,
  UnknownAction,
  combineReducers,
} from "@reduxjs/toolkit";
import themeSlice from "./features/theme/themeSlice";
import { RootAppState } from "./types";
import navSlice from "./features/navigator/navSlice";
import usersSlice from "./features/user/userSlice";
import providerSlice from "./features/provider/providerSlice";
import sessionSlice from "./features/session/sessionSlice";
import progressSlice from "./features/progress/progressSlice";
import pageSlice from "./features/page/pageSlice";
import k8sConfigSlice from "./features/config/k8sConfig.slice";
import { api } from "./rtk-query";

export const rootReducer: Reducer<RootAppState> = (
  state: RootAppState | undefined,
  action: AnyAction | UnknownAction,
) => {
  const reducers: Reducer<RootAppState> = combineReducers({
    [themeSlice.name]: themeSlice.reducer,
    [navSlice.name]: navSlice.reducer,
    [usersSlice.name]: usersSlice.reducer,
    [providerSlice.name]: providerSlice.reducer,
    [sessionSlice.name]: sessionSlice.reducer,
    [progressSlice.name]: progressSlice.reducer,
    [pageSlice.name]: pageSlice.reducer,
    [k8sConfigSlice.name]: k8sConfigSlice.reducer,
    [api.reducerPath]: api.reducer,
  });
  if (action.type === "HYDRATE") {
    return reducers(
      {
        ...state,
        ...action.payload,
      },
      action,
    );
  }
  return reducers(state, action);
};
