import React from "react";
import { Modal, Backdrop, Fade } from "@mui/material";

/**
 *
 * @param {{
 *  open?: boolean,
 *  children?: React.ReactNode | JSX.Element,
 *  handleClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void,
 *  container?: React.ReactInstance | (() => React.ReactInstance)
 * }} props
 * @returns
 */

interface GenericModalProps {
  open?: boolean;
  children?: React.ReactNode | React.ReactElement | JSX.Element;
  handleClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  container?: React.ReactInstance | (() => React.ReactInstance);
}

export default function GenericModal({
  open,
  children,
  handleClose,
  container,
}: GenericModalProps) {
  return (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 200 }}
      container={container}
      id="searchClick"
    >
      <Fade in={open} style={{ maxHeight: "90vh", overflow: "auto" }}>
        {children}
      </Fade>
    </Modal>
  );
}
