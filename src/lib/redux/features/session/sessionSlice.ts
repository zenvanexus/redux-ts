import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SessionState } from "../../types";

const initialState: SessionState = {
  countdown: 3,
  sessionData: null,
};

export const fetchSessionData = createAsyncThunk(
  "session/fetchSessionData",
  async (_, { getState }) => {
    // Access the session data from the Redux store state
    const { session } = getState() as { session: SessionState };

    // If the session data is already available in the Redux store, return it
    if (session.sessionData) {
      return session.sessionData;
    }

    // If the session data is not available, you might need to handle it differently
    // For example, you can throw an error or return a default value

    // Throw an error if session data is not available
    throw new Error("Session data not available");
  },
);

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSessionData.fulfilled, (state, action) => {
      state.sessionData = action.payload;
    });
  },
});

export default sessionSlice;
