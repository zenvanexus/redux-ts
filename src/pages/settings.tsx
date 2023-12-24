import { updatePageTitle } from "@/lib/redux/legacyStore/action.creators";
import { useAppDispatch } from "@/lib/redux/legacyStore/hooks";
import { getPath } from "@/utils/getPath";
import React from "react";

export default function SettingsPage() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const currentPath = getPath();
    const newTitle = "Settings";

    dispatch(updatePageTitle(currentPath, newTitle));

    document.title = `${newTitle} | Meshery`;
  });

  return (
    <React.Fragment>
      <div>Settings</div>
    </React.Fragment>
  );
}
