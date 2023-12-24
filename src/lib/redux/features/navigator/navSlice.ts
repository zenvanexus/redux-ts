import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavigatorState } from "../../types";

const initialState = {
  isOpen: false,
} as NavigatorState;

const navSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { toggleDrawer, setDrawerOpen } = navSlice.actions;

export default navSlice;
