import React from "react";
import { useSnackbar } from "notistack";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppDispatch, useAppSelector } from "@/lib/redux/legacyStore/hooks";
import { selectShowProgress } from "@/lib/redux/selectors";

export function MesheryProgressBar() {
  const dispatch = useAppDispatch();
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const showProgress = useAppSelector(selectShowProgress);

  const keyRef = React.useRef<string | number | null>(null);

  React.useEffect(() => {
    if (showProgress) {
      keyRef.current = enqueueSnackbar(
        <div style={{ width: 250 }}>
          <LinearProgress />
        </div>,
        { variant: "default", persist: true },
      );
    } else if (keyRef.current) {
      closeSnackbar(keyRef.current);
      keyRef.current = null;
    }

    return () => {
      if (keyRef.current) {
        closeSnackbar(keyRef.current);
      }
    };
  }, [showProgress, enqueueSnackbar, closeSnackbar]);

  return null;
}

export default MesheryProgressBar;
