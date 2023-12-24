import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../types";

const initialState = {
  user: {},
  loading: false,
  error: "",
} as UserState;

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUser: (state) => {
      state.loading = true;
      state.error = "";
    },
    updateUserSucess: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.loading = false;
      state.error = "";
    },
    updateUserFailure: (state, action: PayloadAction<UserState>) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const { updateUser, updateUserSucess, updateUserFailure } =
  usersSlice.actions;

export default usersSlice;
