import dataFetch from "@/utils/dataFetch";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateK8SConfig } from "./k8sConfig.slice";
import { NOTIFICATION_EVENT_TYPES } from "@/utils/constants/notification";

export const pingKubernetes = createAsyncThunk(
  "kubernetes/ping",
  async (connectionId: string, { dispatch }) => {
    try {
      const res = await dataFetch(
        `/api/system/kubernetes/ping?connection_id=${connectionId}`,
        {
          credentials: "include",
        },
      );

      // Dispatch the result to update the state
      dispatch(updateK8SConfig({ k8sConfig: res }));
    } catch (error) {
      console.error("Error pinging Kubernetes:", error);
    }
  },
);

export const deleteKubernetesConfig = createAsyncThunk(
  "kubernetes/deleteConfig",
  async (connectionId: string, { dispatch }) => {
    try {
      const res = await dataFetch(
        `/api/system/kubernetes/contexts/${connectionId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      // Dispatch the result to update the state
      dispatch(updateK8SConfig({ k8sConfig: res }));
    } catch (error) {
      console.error("Error deleting Kubernetes config:", error);
    }
  },
);

interface FetchContextsArgs {
  updateProgress: Function;
  k8sfile: string;
}

export const fetchContexts = createAsyncThunk(
  "kubernetes/fetchContexts",
  async ({ updateProgress, k8sfile }: FetchContextsArgs) => {
    try {
      const formData = new FormData();
      formData.append("k8sfile", k8sfile);

      updateProgress({ showProgress: true });

      const result = await dataFetch("/api/system/kubernetes/contexts", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      updateProgress({ showProgress: false });

      if (typeof result !== "undefined") {
        let ctName = "";
        result.forEach(({ contextName, currentContext }) => {
          if (currentContext) {
            ctName = contextName;
          }
        });

        return { result, currentContextName: ctName };
      }

      throw new Error("Unexpected result from server");
    } catch (error) {
      console.error("Error fetching Kubernetes contexts:", error);
      throw error; // Propagate the error so it can be handled by the rejected action
    }
  },
);

interface SubmitConfigArgs {
  notify: Function;
  updateProgress: Function;
  contextName: string;
  k8sfile: string;
}

export const submitConfig = createAsyncThunk(
  "kubernetes/submitConfig",
  async ({
    notify,
    updateProgress,
    contextName,
    k8sfile,
  }: SubmitConfigArgs) => {
    try {
      const inClusterConfigForm = false;
      const formData = new FormData();
      formData.append("inClusterConfig", inClusterConfigForm ? "on" : "");

      if (!inClusterConfigForm) {
        formData.append("contextName", contextName);
        formData.append("k8sfile", k8sfile);
      }

      updateProgress({ showProgress: true });

      const result = await dataFetch("/api/system/kubernetes", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      updateProgress({ showProgress: false });

      if (typeof result !== "undefined") {
        notify({
          message: "Kubernetes config was validated!",
          event_type: NOTIFICATION_EVENT_TYPES.SUCCESS,
        });

        // Dispatch the result to update the state
        return updateK8SConfig({
          k8sConfig: {
            inClusterConfig: inClusterConfigForm,
            k8sfile,
            contextName: result.contextName,
            clusterConfigured: true,
            configuredServer: result.configuredServer,
          },
        });
      }

      throw new Error("Unexpected result from server");
    } catch (error) {
      console.error("Error submitting Kubernetes config:", error);
      throw error; // Propagate the error so it can be handled by the rejected action
    }
  },
);
