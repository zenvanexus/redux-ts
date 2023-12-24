import {
  Store,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";
import { reducer } from "./reducers";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import { Context, createWrapper } from "next-redux-wrapper";
import { AppState } from "./state.types";

export const makeLegacyStore = (context: Context) =>
  createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof makeLegacyStore.getState>;
export type AppDispatch = typeof makeLegacyStore.dispatch;

export const legacyWrapper = createWrapper<Store<AppState>>(makeLegacyStore, {
  debug: true,
});
