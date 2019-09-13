import pathToRegexp from 'path-to-regexp';
import { IRouteMap, IRoutes } from '@/types/index';

/**
 * @description default first one
 * @param route
 * @param keys menu key
 */
const matchSelectedSidebar = (route: IRoutes, key = '/'): string => {
  if (route.routes && route.routes.length > 0) {
    const list = route.routes;
    key = list[0].path;
    matchSelectedSidebar(list[0], key);
  }
  return key;
};

/**
 * @description Expand by selectedKey
 * @param selectedKey
 * @returns
 */
export const matchOpenKeys = (selectedKey: string): string[] => {
  const selectedKeys = selectedKey.split('/');

  const openKeys: string[] = [];

  selectedKeys.forEach((item: string, index: number) => {
    const level = selectedKeys.slice(0, index + 1).join('/');
    openKeys.push(level);
  });
  return openKeys;
};

/**
 * @description match routes
 * @param pathname
 * @param breadcrumbMap
 * @returns
 */
export const matchParamsPath = (
  pathname: string,
  routeMap: IRouteMap
): IRoutes => {
  const pathKey: string | undefined = Object.keys(routeMap).find(key =>
    pathToRegexp(key).test(pathname)
  );
  return routeMap[`${pathKey}`];
};

export const getMenuSelectedAndOpenKeys = (
  extractFilterRoutes: IRoutes[],
  breadcrumbMap: IRouteMap
) => {
  const pathname = location.pathname;
  let selectedKey: string = '';
  let openKeys: string[] = [];
  if (pathname === '/') {
    selectedKey = extractFilterRoutes[0].path;
  } else {
    const selectedRoute = matchParamsPath(pathname, breadcrumbMap);
    if (selectedRoute) {
      selectedKey = selectedRoute.path;
    } else {
      selectedKey = '/404';
    }
  }
  openKeys = matchOpenKeys(selectedKey);
  return { selectedKey, openKeys };
};

/**
 * @description
 * @param routeList route config
 * @param all all routes
 * @param filter filter routes
 */
interface IExtractRouteReturn {
  all: IRoutes[];
  filter: IRoutes[];
}
export const extractRoute = (
  routeList: IRoutes[],
  all: IRoutes[],
  filter: IRoutes[]
): IExtractRouteReturn => {
  routeList.forEach(
    (route: IRoutes, index: number): void | IExtractRouteReturn => {
      if (route.routes && route.routes.length > 0) {
        all.push({
          ...route
        });
        return extractRoute(route.routes, all, filter);
      } else {
        all.push({
          ...route
        });
        filter.push({
          ...route
        });
      }
    }
  );
  return { all, filter };
};
