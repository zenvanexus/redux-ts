import { updatePageTitle } from "@/lib/redux/legacyStore/action.creators";
import { useAppDispatch } from "@/lib/redux/legacyStore/hooks";
import { getPath } from "@/utils/getPath";
import React from "react";

export default function DesignConfiguratorPage() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const currentPath = getPath();
    const newTitle = "Configure Design";

    dispatch(updatePageTitle(currentPath, newTitle));

    document.title = `${newTitle} | Meshery`;
  });

  return (
    <React.Fragment>
      <div>Configure Design</div>
    </React.Fragment>
  );
}
