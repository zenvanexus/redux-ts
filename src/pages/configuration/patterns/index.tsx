import { updatePageTitle } from "@/lib/redux/legacyStore/action.creators";
import { useAppDispatch } from "@/lib/redux/legacyStore/hooks";
import { getPath } from "@/utils/getPath";
import React from "react";

export default function PatternsPage() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const currentPath = getPath();
    const newTitle = "Patterns";

    dispatch(updatePageTitle(currentPath, newTitle));

    document.title = `${newTitle} | Meshery`;
  });

  return (
    <React.Fragment>
      <div>Patterns</div>
    </React.Fragment>
  );
}
