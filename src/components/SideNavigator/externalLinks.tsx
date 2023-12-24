const ExternalLinkIcon = (
  <FontAwesomeIcon
    style={externalLinkIconStyle}
    icon={faExternalLinkAlt}
    transform="shrink-7"
  />
);

export const externlinks = [
  {
    id: "doc",
    href: "https://docs.meshery.io",
    title: "Documentation",
    icon: <DocumentIcon style={drawerIconsStyle} />,
    external_icon: ExternalLinkIcon,
  },
  {
    id: "community",
    href: "https://slack.meshery.io",
    title: "Community",
    icon: (
      <SlackIcon
        style={{
          ...drawerIconsStyle,
          height: "1.5rem",
          width: "1.5rem",
          marginTop: "",
        }}
      />
    ),
    external_icon: ExternalLinkIcon,
  },
  {
    id: "forum",
    href: "http://discuss.meshery.io",
    title: "Discussion Forum",
    icon: <ChatIcon style={drawerIconsStyle} />,
    external_icon: ExternalLinkIcon,
  },
  {
    id: "issues",
    href: "https://github.com/meshery/meshery/issues/new/choose",
    title: "Issues",
    icon: <GithubIcon style={drawerIconsStyle} />,
    external_icon: ExternalLinkIcon,
  },
];
