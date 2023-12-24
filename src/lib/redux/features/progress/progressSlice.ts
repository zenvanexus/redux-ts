import { createSlice } from "@reduxjs/toolkit";
import { ProgressState } from "../../types";

const initialState: ProgressState = {
  showProgress: false,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    updateProgress: (state, action) => {
      state.showProgress = action.payload.showProgress;
    },
  },
});

export const { updateProgress } = progressSlice.actions;

export default progressSlice;
