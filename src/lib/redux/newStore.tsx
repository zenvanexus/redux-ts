import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { rootReducer } from "./root.reducer";
import { NewAppStore } from "./types";

export const newStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
  });

  return store;
};

export const newStoreWrapper = createWrapper<NewAppStore>(newStore, {
  debug: true,
});
