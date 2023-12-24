import React from "react";
import Header from "./Header";
import SideNavigator from "./SideNavigator";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <Header />
      <SideNavigator />
      {children}
    </React.Fragment>
  );
}
