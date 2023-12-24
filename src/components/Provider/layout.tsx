import { Paper } from "@layer5/sistent-components";
import React from "react";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <Paper
        elevation={2}
        sx={{ padding: "170px 0px", minWidth: "90%", textAlign: "center" }}
      >
        {children}
      </Paper>
    </React.Fragment>
  );
}
