import { useAppDispatch, useAppSelector } from "@/lib/redux/legacyStore/hooks";
import { isDrawerOpenSelector } from "@/lib/redux/selectors";
import {
  setDrawerOpen,
  toggleDrawer,
} from "@/lib/redux/features/navigator/navSlice";
import { ListItemText, styled } from "@mui/material";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
} from "@layer5/sistent-components";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { drawerWidth } from "@/styles/theme";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const NavigatorDrawer = styled(Drawer)<{ open?: boolean }>(
  ({ theme, open }) => ({
    position: "absolute",
    flexShrink: 0,
    whiteSpace: "nowrap",
    height: "40px",
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      background: "#263238",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: open
          ? theme.transitions.duration.leavingScreen
          : theme.transitions.duration.enteringScreen,
      }),
      overflowX: "hidden",
      width: drawerWidth,
      [theme.breakpoints.up("sm")]: {
        width: open ? drawerWidth : `${theme.spacing(9) + 1}px`,
      },
    },
  }),
);

function Menu() {
  const menuItems = [
    { id: 1, title: "Home", url: "/" },
    { id: 1, title: "About", url: "/about" },
    { id: 1, title: "Contact", url: "/contact" },
  ];

  return (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.id}>
          <Link href={item.url}>
            <ListItemText primary={item.title} />
          </Link>
        </ListItem>
      ))}
    </List>
  );
}

export default function SideNavigator({ ...props }) {
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
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      onClose={handleToggleDrawer}
      {...props}
    >
      <DrawerHeader>
        <IconButton onClick={handleToggleDrawer}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Menu />
      {props.children}
    </Drawer>
  );
}
