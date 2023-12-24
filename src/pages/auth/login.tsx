import { fetchSessionData } from "@/lib/redux/features/session/sessionSlice";
import { useAppSelector, useAppDispatch } from "@/lib/redux/legacyStore/hooks";
import { selectCountdown } from "@/lib/redux/selectors";
import {
  DialogContentText,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@layer5/sistent-components";
import { styled } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const SessionExpired = styled(DialogContentText)(() => ({
  minWidth: 400,
  overflowWrap: "anywhere",
  textAlign: "center",
  padding: 5,
  margin: 2,
  display: "flex",
  flexDirection: "column",
  height: "7rem",
  justifyContent: "space-evenly",
}));

export default function UnauthenticationSession() {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const countdown = useAppSelector(selectCountdown);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    void dispatch(fetchSessionData());
  }, [dispatch]);

  React.useEffect(() => {
    if (countdown === 0) {
      handleClose();
      router.push("/user/login");
    }
  }, [countdown]);

  React.useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          textAlign: "center",
          minWidth: 400,
          padding: "10px",
          color: "#ebf1f5",
          backgroundColor: "#F0A303",
        }}
      >
        <span></span>
        Session Expired
      </DialogTitle>
      <DialogContent>
        <SessionExpired id="alert-dialog-description">
          <Typography variant="body1">Your session has expired</Typography>
          <Typography>
            You will be redirected to login in {countdown}
          </Typography>
        </SessionExpired>
      </DialogContent>
    </Dialog>
  );
}
