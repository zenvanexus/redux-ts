import Provider from "@/components/Provider";
import { updatePageTitle } from "@/lib/redux/legacyStore/action.creators";
import { useAppDispatch } from "@/lib/redux/legacyStore/hooks";
import { getPath } from "@/utils/getPath";
import React from "react";

export default function ProviderPage() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const currentPath = getPath();
    const newTitle = "Provider";

    dispatch(updatePageTitle(currentPath, newTitle));

    document.title = `${newTitle} | Meshery`;
  });

  return (
    <React.Fragment>
      <Provider />
    </React.Fragment>
  );
}
