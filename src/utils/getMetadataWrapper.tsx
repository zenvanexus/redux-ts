import { updatePagePath } from "@/lib/redux/features/page/pageSlice";
import { useAppDispatch } from "@/lib/redux/legacyStore/hooks";
import Head from "next/head";
import React from "react";

/**
 * Extract title from page location
 * @param {*} path
 * @returns
 */
const extractTitleFromPath = (path) => {
  const pageTitle = path.replace("/", "");
  return pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
};

/**
 * HOC component to wrap different pages that needs a title and path
 * to be returned in console.log
 * @param {*} GetMetadataWrapper
 * @returns
 */
const withMetadata = (GetMetadataWrapper) => {
  const WithMetadata = (props) => {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
      console.log(`path: ${getPath()}`);
      dispatch(updatePagePath(getPath()));
    }, [dispatch]);

    const getPath = () => {
      let path = typeof window !== "undefined" ? window.location.pathname : "";
      if (path.lastIndexOf("/") > 0) {
        path = path.substring(0, path.lastIndexOf("/"));
      }
      path += typeof window !== "undefined" ? window.location.search : "";
      return path;
    };

    const pageTitle = extractTitleFromPath(getPath());

    return (
      <React.Fragment>
        <Head>
          <title>{pageTitle ? `${pageTitle} | Meshery` : "Meshery"}</title>
        </Head>
        <GetMetadataWrapper
          getPath={getPath}
          pageTitle={pageTitle}
          {...props}
        />
      </React.Fragment>
    );
  };

  return WithMetadata;
};

export default withMetadata;
