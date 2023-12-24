import { CapabilitiesRegistry } from "@/utils/capabilitiesRegistry";
import {
  CONFIGURATION,
  CONNECTION,
  DASHBOARD,
  DESIGN,
  FILTER,
  LIFECYCLE,
  PERFORMANCE,
  PROFILES,
  SERVICE_MESH,
} from "./constant";
import { ConfigurationIcon, FilterIcon } from "@layer5/sistent-svg";

export const getNavigatorComponents = (
  /** @type {CapabilitiesRegistry} */ capabilityRegistryObj: CapabilitiesRegistry,
) => [
  {
    id: DASHBOARD,
    // icon: <DashboardIcon style={drawerIconsStyle} />,
    // hovericon: <DashboardIcon style={drawerIconsStyle} />,
    href: "/",
    title: "Dashboard",
    show: capabilityRegistryObj.isNavigatorComponentEnabled([DASHBOARD]),
    link: true,
    submenu: true,
  },
  {
    id: LIFECYCLE,
    // icon: <LifecycleIcon style={drawerIconsStyle} />,
    // hovericon: <LifecycleHover style={drawerIconsStyle} />,
    title: "Lifecycle",
    link: true,
    href: "/management/connections",
    show: capabilityRegistryObj.isNavigatorComponentEnabled([LIFECYCLE]),
    submenu: true,
    children: [
      {
        id: CONNECTION,
        href: "/management/connections",
        title: "Connections",
        show: capabilityRegistryObj.isNavigatorComponentEnabled([
          LIFECYCLE,
          CONNECTION,
        ]),
        link: true,
      },
      {
        id: SERVICE_MESH,
        href: "/management",
        title: "Service Mesh",
        link: true,
        // icon: <ServiceMeshIcon style={{ ...drawerIconsStyle }} />,
        show: true,
      },
    ],
  },
  {
    id: CONFIGURATION,
    icon: <ConfigurationIcon {...drawerIconsStyle} />,
    // hovericon: <ConfigurationHover style={drawerIconsStyle} />,
    href: "/configuration/designs",
    title: "Configuration",
    show: capabilityRegistryObj.isNavigatorComponentEnabled([CONFIGURATION]),
    link: true,
    submenu: true,
    children: [
      {
        id: FILTER,
        icon: <FilterIcon style={{ ...drawerIconsStyle }} />,
        href: "/configuration/filters",
        title: "Filters",
        show: capabilityRegistryObj.isNavigatorComponentEnabled([
          CONFIGURATION,
          FILTER,
        ]),
        link: true,
        isBeta: true,
      },
      {
        id: DESIGN,
        // icon: <PatternIcon style={{ ...drawerIconsStyle }} />,
        href: "/configuration/designs",
        title: "Designs",
        show: capabilityRegistryObj.isNavigatorComponentEnabled([
          CONFIGURATION,
          DESIGN,
        ]),
        link: true,
        isBeta: true,
      },
    ],
  },
  {
    id: PERFORMANCE,
    // icon: <PerformanceIcon style={{ transform: 'scale(1.3)', ...drawerIconsStyle }} />,
    // hovericon: <PerformanceHover style={drawerIconsStyle} />,
    href: "/performance",
    title: "Performance",
    show: capabilityRegistryObj.isNavigatorComponentEnabled([PERFORMANCE]),
    link: true,
    submenu: true,
    children: [
      {
        id: PROFILES,
        // icon: <FontAwesomeIcon icon={faDigitalTachograph} style={{ fontSize: 24 }} />,
        href: "/performance/profiles",
        title: "Profiles",
        show: capabilityRegistryObj.isNavigatorComponentEnabled([
          PERFORMANCE,
          PROFILES,
        ]),
        link: true,
      },
    ],
  },
  {
    id: "Extensions",
    // icon: <ExtensionIcon style={drawerIconsStyle} />,
    // hovericon: <ExtensionIcon style={drawerIconsStyle} />,
    title: "Extensions",
    show: capabilityRegistryObj.isNavigatorComponentEnabled(["Extensions"]),
    width: 12,
    link: true,
    href: "/extensions",
    submenu: false,
  },
];
