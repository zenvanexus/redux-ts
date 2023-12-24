import { Paper } from "@layer5/sistent-components";
import Modal from "@mui/material/Modal";

function TroubleshootModal({
  open,
  setOpen,
  viewDataErrorMessage,
  viewHeaderErrorMessage,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper></Paper>
    </Modal>
  );
}
