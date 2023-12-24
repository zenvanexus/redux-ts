import { CheckCircle, Warning, Info, Error } from "@mui/icons-material";
import { SnackbarProvider } from "notistack";

export function SnackbarProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      iconVariant={{
        success: <CheckCircle style={{ marginRight: "0.5rem" }} />,
        error: <Error style={{ marginRight: "0.5rem" }} />,
        warning: <Warning style={{ marginRight: "0.5rem" }} />,
        info: <Info style={{ marginRight: "0.5rem" }} />,
      }}
      classes={{
        variantSuccess:
          this.state.theme === "dark"
            ? classes.darknotifSuccess
            : classes.notifSuccess,
        variantError:
          this.state.theme === "dark"
            ? classes.darknotifError
            : classes.notifError,
        variantWarning:
          this.state.theme === "dark"
            ? classes.darknotifWarn
            : classes.notifWarn,
        variantInfo:
          this.state.theme === "dark"
            ? classes.darknotifInfo
            : classes.notifInfo,
      }}
      maxSnack={10}
    >
      {children}
    </SnackbarProvider>
  );
}

export default SnackbarProviderWrapper;
