import { Button } from "@layer5/sistent-components";
import React from "react";

function Troubleshoot() {
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleOpen}
      >
        Troubleshooting Guide
      </Button>
    </>
  );
}
