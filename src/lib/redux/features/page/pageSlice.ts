import { createSlice } from "@reduxjs/toolkit";
import { PageState } from "../../types";

const initialState: PageState = {
  page: {
    path: "",
    title: "",
    isBeta: false,
  },
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    updatePagePath: (state, action) => {
      state.page.path = action.payload.action;
    },
    updatePathTitle: (state, action) => {
      state.page.title = action.payload.title;
    },
    updateBadgeStatus: (state, action) => {
      state.page.isBeta = action.payload.isBeta;
    },
  },
});

export const { updatePagePath, updatePathTitle, updateBadgeStatus } =
  pageSlice.actions;

export default pageSlice;
