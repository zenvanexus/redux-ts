import { promisifiedDataFetch } from "@/utils/dataFetch";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { K8sConfigState } from "../../types";
import { deleteKubernetesConfig } from "./k8sConfig.thunk";

interface ExtraArgument {
  successCallback: (data: any) => void;
  errorCallback: (error: any) => void;
}

export const loadActiveK8sContexts = createAsyncThunk(
  "kubernetes/loadActiveContexts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await promisifiedDataFetch("/api/system/sync");

      if (res?.k8sConfig) {
        return res.k8sConfig;
      } else {
        throw new Error("No Kubernetes configurations found");
      }
    } catch (error) {
      console.error("An error occurred while loading k8sconfig", error);
      return rejectWithValue(error?.message);
    }
  },
);

/*
export const deleteKubernetesConfig = createAsyncThunk(
  "kubernetes/deleteConfig",
  async ({ id }: { id: string }, thunkAPI) => {
    const { successCallback, errorCallback } = thunkAPI.extra as ExtraArgument;

    await dataFetch(
      `/api/system/kubernetes/contexts/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
      successCallback,
      errorCallback,
    );
  },
);
*/

const initialState: K8sConfigState = {
  k8sConfig: [],
};

const k8sConfigSlice = createSlice({
  name: "k8sConfig",
  initialState,
  reducers: {
    updateK8SConfig: (state, action) => {
      return action.payload.k8sConfig;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadActiveK8sContexts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(deleteKubernetesConfig.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const { updateK8SConfig } = k8sConfigSlice.actions;
export default k8sConfigSlice;
