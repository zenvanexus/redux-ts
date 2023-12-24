import { Dispatch } from "redux";
import { actionTypes } from "./action.types";

interface UpdatePageAction {
  type: typeof actionTypes.UPDATE_PAGE;
  payload: {
    path: string;
  };
}

interface UpdateTitleAction {
  type: typeof actionTypes.UPDATE_TITLE;
  payload: {
    title: string;
  };
}

export const updatePagePath =
  (path: string) => (dispatch: Dispatch<UpdatePageAction>) => {
    // Log the path value
    console.log("Path:", path);

    // Dispatch the action
    dispatch({
      type: actionTypes.UPDATE_PAGE,
      payload: { path },
    });
  };

export const updatePageTitle =
  (path: string, title: string) => (dispatch: Dispatch<UpdateTitleAction>) => {
    // Log the path value
    console.log("Path:", path);
    console.log("Title:", title);

    // Dispatch the action
    dispatch({
      type: actionTypes.UPDATE_PAGE,
      payload: { path, title },
    });

    dispatch({
      type: actionTypes.UPDATE_TITLE,
      payload: { title },
    });
  };

export const updatebetabadge =
  ({ isBeta }) =>
  (dispatch) => {
    return dispatch({ type: actionTypes.UPDATE_BETA_BADGE, isBeta });
  };

export const updateUser =
  ({ user }) =>
  (dispatch) => {
    return dispatch({ type: actionTypes.UPDATE_USER, user });
  };

export const updateK8SConfig =
  ({ k8sConfig }) =>
  (dispatch) => {
    return dispatch({ type: actionTypes.UPDATE_CLUSTER_CONFIG, k8sConfig });
  };

export const setK8sContexts =
  ({ selectedK8sContexts }) =>
  (dispatch) => {
    return dispatch({ type: actionTypes.SET_K8S_CONTEXT, selectedK8sContexts });
  };

export const updateLoadTestData =
  ({ loadTest }) =>
  (dispatch) => {
    return dispatch({ type: actionTypes.UPDATE_LOAD_TEST_DATA, loadTest });
  };

export const updateLoadTestPref =
  ({ loadTestPref }) =>
  (dispatch) => {
    return dispatch({ type: actionTypes.UPDATE_LOAD_GEN_CONFIG, loadTestPref });
  };
export const updateAnonymousUsageStats =
  ({ anonymousUsageStats }) =>
  (dispatch) => {
    return dispatch({
      type: actionTypes.UPDATE_ANONYMOUS_USAGE_STATS,
      anonymousUsageStats,
    });
  };
export const updateAnonymousPerformanceResults =
  ({ anonymousPerfResults }) =>
  (dispatch) => {
    return dispatch({
      type: actionTypes.UPDATE_ANONYMOUS_PERFORMANCE_RESULTS,
      anonymousPerfResults,
    });
  };

export const updateAdaptersInfo =
  ({ meshAdapters }) =>
  (dispatch) => {
    return dispatch({ type: actionTypes.UPDATE_ADAPTERS_INFO, meshAdapters });
  };

export const updateResultsSelection =
  ({ page, results }) =>
  (dispatch) => {
    return dispatch({
      type: actionTypes.UPDATE_RESULTS_SELECTION,
      page,
      results,
    });
  };

export const clearResultsSelection = () => (dispatch) => {
  return dispatch({ type: actionTypes.CLEAR_RESULTS_SELECTION });
};
export const updateGrafanaConfig =
  ({ grafana }) =>
  (dispatch) => {
    return dispatch({ type: actionTypes.UPDATE_GRAFANA_CONFIG, grafana });
  };

export const updatePrometheusConfig =
  ({ prometheus }) =>
  (dispatch) => {
    return dispatch({ type: actionTypes.UPDATE_PROMETHEUS_CONFIG, prometheus });
  };

export const updateStaticPrometheusBoardConfig =
  ({ staticPrometheusBoardConfig }) =>
  (dispatch) => {
    return dispatch({
      type: actionTypes.UPDATE_STATIC_BOARD_CONFIG,
      staticPrometheusBoardConfig,
    });
  };

export const toggleDrawer =
  ({ isDrawerCollapsed }) =>
  (dispatch) => {
    return dispatch({ type: actionTypes.TOOGLE_DRAWER, isDrawerCollapsed });
  };

export const setAdapter =
  ({ selectedAdapter }) =>
  (dispatch) => {
    return dispatch({ type: actionTypes.SET_ADAPTER, selectedAdapter });
  };

export const toggleCatalogContent =
  ({ catalogVisibility }) =>
  (dispatch) => {
    return dispatch({
      type: actionTypes.SET_CATALOG_CONTENT,
      catalogVisibility,
    });
  };

export const setOperatorSubscription =
  ({ operatorState }) =>
  (dispatch) => {
    return dispatch({
      type: actionTypes.SET_OPERATOR_SUBSCRIPTION,
      operatorState,
    });
  };

export const setMeshsyncSubscription =
  ({ meshSyncState }) =>
  (dispatch) => {
    return dispatch({
      type: actionTypes.SET_MESHSYNC_SUBSCRIPTION,
      meshSyncState,
    });
  };

export const updateExtensionType =
  ({ extensionType }) =>
  (dispatch) => {
    return dispatch({ type: actionTypes.UPDATE_EXTENSION_TYPE, extensionType });
  };

export const updateCapabilities =
  ({ capabilitiesRegistry }) =>
  (dispatch) => {
    return dispatch({
      type: actionTypes.UPDATE_CAPABILITY_REGISTRY,
      capabilitiesRegistry,
    });
  };

export const updateTelemetryUrls =
  ({ telemetryURLs }) =>
  (dispatch) => {
    return dispatch({ type: actionTypes.UPDATE_TELEMETRY_URLS, telemetryURLs });
  };

export const openEventInNotificationCenter =
  ({ eventId }) =>
  (dispatch) => {
    return dispatch({
      type: actionTypes.OPEN_EVENT_IN_NOTIFICATION_CENTER,
      eventId,
    });
  };

export const setConnectionMetadata =
  ({ connectionMetadataState }) =>
  (dispatch) => {
    return dispatch({
      type: actionTypes.SET_CONNECTION_METADATA,
      connectionMetadataState,
    });
  };
