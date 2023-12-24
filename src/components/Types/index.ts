import { AppBarProps as MuiAppBarProps } from "@mui/material";
import React from "react";

export type AppBarProps = {
  open?: boolean;
} & MuiAppBarProps;

export type ChildrenProps = {
  children?: React.ReactNode;
};
