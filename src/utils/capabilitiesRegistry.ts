import _ from "lodash";

export class CapabilitiesRegistry {
  capabilitiesRegistry;
  isPlaygroundEnv = false;

  constructor(capabilitiesRegistry: {
    extensions: any;
    restrictedAccess?: any;
  }) {
    this.capabilitiesRegistry = capabilitiesRegistry;
    this.isPlaygroundEnv =
      capabilitiesRegistry?.restrictedAccess?.isMesheryUiRestricted || false;
  }

  isComponentEnabled(walkerArray: any[]) {
    if (!this.isPlaygroundEnv) {
      return true;
    }

    const searchResult = _.get(this.capabilitiesRegistry, walkerArray, false);
    return _.isObject(searchResult) && !_.isEmpty(searchResult);
  }

  isNavigatorComponentEnabled(navigatorWalker: string[]) {
    if (!this.isPlaygroundEnv) {
      return true;
    }

    const walkerArray = [
      "restrictedAccess",
      "allowedComponents",
      "navigator",
      ...navigatorWalker,
    ];
    return this.isComponentEnabled(walkerArray);
  }

  isHeaderComponentEnabled(headerWalker: any) {
    if (!this.isPlaygroundEnv) {
      return true;
    }

    const walkerArray = [
      "restrictedAccess",
      "allowedComponents",
      "header",
      ...headerWalker,
    ];
    return this.isComponentEnabled(walkerArray);
  }

  isExtensionComponentEnabled(walkerArray: any) {
    if (!this.isPlaygroundEnv) {
      return true;
    }

    if (!this.capabilitiesRegistry.extensions?.navigator) {
      return false;
    }

    const navigatorObj =
      this.capabilitiesRegistry.extensions.navigator[0]?.allowedTo;
    return this.isComponentEnabled([...walkerArray, navigatorObj]);
  }
}
