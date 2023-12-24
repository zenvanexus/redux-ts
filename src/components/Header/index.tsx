import { Toolbar, IconButton } from "@layer5/sistent-components";
import { Menu } from "@mui/icons-material";
import ModeToggleButton from "../ModeToggleButton";
import { MesheryAppBar } from "./MesheryAppBar";
import { useAppDispatch, useAppSelector } from "@/lib/redux/legacyStore/hooks";
import { isDrawerOpenSelector } from "@/lib/redux/selectors";
import {
  setDrawerOpen,
  toggleDrawer,
} from "@/lib/redux/features/navigator/navSlice";
import { styled } from "@mui/material";

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 59,
  padding: theme.spacing(2.4),
  paddingLeft: 34,
  paddingRight: 34,
  boxShadow: `3px 0px 4px ${theme.palette.secondary.light}`,
  transition: theme.transitions.create(["min-height", "padding"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

export default function Header({ ...props }) {
  const open = useAppSelector(isDrawerOpenSelector);
  const dispatch = useAppDispatch();

  const handleToggleDrawer = () => {
    if (open) {
      dispatch(setDrawerOpen(!open));
    } else {
      dispatch(toggleDrawer());
    }
  };

  return (
    <MesheryAppBar component={"nav"} open={open} position="fixed" {...props}>
      <CustomToolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleToggleDrawer}
          edge="start"
          sx={{
            mr: 2,
            ...(open && {
              display: "none",
            }),
            transition: "none",
          }}
        >
          <Menu />
        </IconButton>
        <ModeToggleButton />
      </CustomToolbar>
    </MesheryAppBar>
  );
}
