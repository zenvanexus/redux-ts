/**
 * A function to be used by the requests sent for the
 * operations based on multi-context support
 *
 * @param {string} url The request URL
 * @param {Array.<string>} ctx The context Array
 * @returns {string} The final query-parametrised URL
 */
export function ctxUrl(url: string, ctx: Array<string>) {
  if (ctx?.length) {
    const contextQuery = ctx.map((context) => `contexts=${context}`).join("&");
    return `${url}?${contextQuery}`;
  }
  return url;
}

/**
 * The function takes in all the context and returns
 *  their respective cluster IDs associated to them
 *
 * @param {Array.<string>} selectedContexts
 * @param {Array.<string>} k8sconfig
 * @returns
 */
export const getK8sClusterIdsFromCtxId = (
  selectedContexts: Array<string>,
  k8sconfig: Array<string>,
) => {
  if (selectedContexts.length === 0) {
    return [];
  }

  if (selectedContexts.includes("all")) {
    return k8sconfig.map((cfg) => cfg?.kubernetes_server_id);
  }
  const clusterIds = [];
  selectedContexts.forEach((context) => {
    const clusterId = k8sconfig.find((cfg) => cfg.id === context)
      ?.kubernetes_server_id;
    if (clusterId) {
      clusterIds.push(clusterId);
    }
  });

  return clusterIds;
};

/**
 *
 * @param {Array.<string>} selectedK8sContexts
 * @param {Array.<string>} k8sConfig
 * @returns {string} The context ID
 */
export function getFirstCtxIdFromSelectedCtxIds(
  selectedK8sContexts: Array<string>,
  k8sConfig: Array<string>,
) {
  if (!selectedK8sContexts?.length) {
    return "";
  }

  if (selectedK8sContexts?.includes("all")) {
    return k8sConfig[0]?.id;
  }

  return selectedK8sContexts[0];
}

/**
 * Get the k8sConfigIds of K8sconfig
 * @param {Array.<Object>} k8sConfig
 * @returns
 */
export function getK8sConfigIdsFromK8sConfig(k8sConfig: Array<object>) {
  if (!k8sConfig || !k8sConfig.length) {
    return [];
  }

  return k8sConfig.map((cfg) => cfg.id);
}

export const getK8sClusterNamesFromCtxId = (
  selectedContexts: Array<string>,
  k8sconfig: Array<string>,
) => {
  if (selectedContexts.length === 0) {
    return [];
  }

  if (selectedContexts.includes("all")) {
    return ["all"];
  }

  const clusterNames = [];

  selectedContexts.forEach((context) => {
    const name = k8sconfig.find((cfg) => cfg.id === context)?.name;
    if (name) {
      clusterNames.push(name);
    }
  });

  return clusterNames;
};

/**
 *
 * @param {string} clusterId Kubernetes Cluster ID
 * @param {Array<Object>} k8sConfig Kubernetes config
 * @returns {string} Kubernetes cluster name
 */
export function getClusterNameFromClusterId(
  clusterId: string,
  k8sConfig: Array<object>,
) {
  const cluster = k8sConfig.find(
    (cfg) => cfg.kubernetes_server_id === clusterId,
  );
  if (!cluster) {
    return "";
  }
  return cluster.name;
}

/**
 *
 * @param {string} connectionId Kubernetes Connection ID
 * @param {Array<Object>} k8sConfig Kubernetes config
 * @returns {string} Kubernetes cluster name
 */
export function getClusterNameFromConnectionId(
  connectionId: string,
  k8sConfig: Array<object>,
) {
  const cluster = k8sConfig.find((cfg) => cfg.connection_id === connectionId);
  if (!cluster) {
    return "";
  }
  return cluster.name;
}

/**
 *
 * @param {string} clusterId Kubernetes Cluster ID
 * @param {Array<Object>} k8sConfig Kubernetes config
 * @returns {string} Kubernetes connection ID
 */
export function getConnectionIdFromClusterId(
  clusterId: string,
  k8sConfig: Array<object>,
) {
  const cluster = k8sConfig.find(
    (cfg) => cfg.kubernetes_server_id === clusterId,
  );
  if (!cluster) {
    return "";
  }
  return cluster.connection_id;
}

/**
 *
 * @param {string} ctxId Kubernetes context ID
 * @param {Array<Object>} k8sConfig Kubernetes config
 * @returns {string} Kubernetes cluster name
 */
export function getClusterNameFromCtxId(
  ctxId: string,
  k8sConfig: Array<object>,
) {
  const cluster = k8sConfig.find((cfg) => cfg.id === ctxId);
  if (!cluster) {
    return "";
  }
  return cluster.name;
}
