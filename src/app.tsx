import React, { useEffect, useState, startTransition } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';
import { routesList } from './routes/routes';
import { fetchPageData } from "./shared/utils";
import { getGenericReqFromLocation } from "./shared/utils-client";

function App({ pageData: staticPageData }: AppProps) {
  const [pageData, setPageData] = useState(staticPageData || null);
  const location = useLocation();

  useEffect(() => {
    const abortController = new AbortController();

    if (staticPageData === undefined) {
      async function loadData() {
        const req = getGenericReqFromLocation(window.location);
        const pageData = await fetchPageData(req, abortController);
        startTransition(() => setPageData(pageData));
      }
      startTransition(() => setPageData(null));
      loadData();
    } else {
      startTransition(() => setPageData(staticPageData || null));
    }

    return () => {
      abortController.abort();
    };
  }, [staticPageData, location.pathname]);

  return (
    <ErrorBoundary fallback={<span>Error!</span>}>
      <Routes>
        {routesList.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component pageData={route.dataSource ? pageData : undefined} />}
          />
        ))}
      </Routes>
    </ErrorBoundary>
  );
}

export default App;

interface AppProps {
  pageData?: any;
}
