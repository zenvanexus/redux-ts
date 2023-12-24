import { updatePageTitle } from "@/lib/redux/legacyStore/action.creators";
import { useAppDispatch } from "@/lib/redux/legacyStore/hooks";
import { getPath } from "@/utils/getPath";
import React from "react";

export default function Index() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const currentPath = getPath();
    const newTitle = "Dashboard";

    dispatch(updatePageTitle(currentPath, newTitle));

    document.title = `${newTitle} | Meshery`;
  });

  return (
    <React.Fragment>
      <div>Home</div>
    </React.Fragment>
  );
}
