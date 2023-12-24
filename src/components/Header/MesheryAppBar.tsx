import { styled } from "@mui/material/styles";
import { AppBarProps } from "../Types";
import { AppBar as MuiAppBar } from "@layer5/sistent-components";

export const MesheryAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: "#396679",
  shadowColor: "#808080",
  zIndex: theme.zIndex.drawer + 1,
  ...(open
    ? {
        [theme.breakpoints.between(635, 732)]: {
          padding: theme.spacing(0.75, 1.4),
        },
        [theme.breakpoints.between(600, 635)]: {
          padding: theme.spacing(0.4, 1.4),
        },
      }
    : {}),
  transition: theme.transitions.create("padding", {
    easing: theme.transitions.easing.sharp,
    duration: open
      ? theme.transitions.duration.leavingScreen
      : theme.transitions.duration.enteringScreen,
  }),
}));
