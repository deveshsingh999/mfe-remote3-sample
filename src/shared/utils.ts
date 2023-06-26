import { matchPath } from "react-router-dom";
import { routesList } from "../routes/routes";
import { GenericRequest } from "../model/common.model";

const basename = process.env.MFE_NAME ? `/${process.env.MFE_NAME}` : '';

export const fetchPageData = async (req: GenericRequest, abortController?: AbortController) => {
  const activeRoute = findActiveRoute(req.path);
  if (!activeRoute) return null;
  if (!activeRoute.dataSource) return null;

  const reqPath = req.path.substring(basename.length) || '/';  
  const match = matchPath(activeRoute.path, reqPath);
  const entries = Object.entries(match!.params);

  let dataSource = activeRoute.dataSource;
  if (entries.length > 0) {
    if (entries.length > 1) {
      console.warn('NOTE: Currently routes are able to handle just one param!');      
    }
    const pair = entries[0];
    dataSource = dataSource.replace(`\$${pair[0]}`, `${pair[1]}`);
  }

  let pageData = null;
  try {
    const options = abortController ? { signal: abortController.signal } : {};
    const resp = await fetch(dataSource, options);
    pageData = await resp.json();
  } catch(e: any) {
    if (!(e as any).message.includes('aborted')) {
      console.error('[ERROR:getPageData]', e);
    }
  }

  return pageData;
};

function findActiveRoute(pathname: string) {
  if (basename && !pathname.startsWith(basename)) {
    console.warn('Unexpected route:', pathname);
    return null;
  }

  const reqPath = pathname.substring(basename.length) || '/';  
  const activeRoute = routesList.find(route => {
    return matchPath(route.path, reqPath);
  });

  return activeRoute || null;
};
