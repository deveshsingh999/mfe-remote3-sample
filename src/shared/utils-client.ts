import { GenericRequest } from "../model/common.model";

export const getGenericReqFromLocation = (location: Location): GenericRequest => {
  // const routeData = findRouteData(location.pathname);
  // if (!routeData) return null;

  const { pathname, search } = location;
  const url = pathname + search;

  // const query = parseQueryString(search);
  // const route = { path: routeData.path };

  // const match = matchPath(pathname, routeData.path) || { params: {} };
  // const params = { ...match.params };

  // return { url, path: pathname, route, query, params };
  return { url, path: pathname };
};
