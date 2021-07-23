import { IFooterNavItem, INav, INavItem } from './types';

const registerRoute = (navData: INav[], oreo = '') => {
  const route: INavItem[] = [];

  if (!navData) return route;

  function addRoute(page: INavItem) {
    const { path, source, title } = page;
    route.push({
      path: `${oreo}/${path}`,
      source,
      title,
    });
  }

  navData.forEach(nav => {
    if (nav.groups) {
      nav.groups.forEach(group => {
        group.list.forEach(subNav => {
          addRoute(subNav);
        });
      });
    }
  });

  return route;
};

const registerFooter = (routeData: INavItem[]) => {
  const footerData: Record<string, IFooterNavItem> = {};

  routeData.forEach(route => {
    footerData[route.path!] = {
      pathname: route.path!,
      title: route.title,
      prev: null,
      next: null,
    };
  });

  routeData.forEach((route, index) => {
    footerData[route.path!].prev =
      index === 0 ? null : footerData[routeData[index - 1].path!];
    footerData[route.path!].next =
      index === routeData.length - 1
        ? null
        : footerData[routeData[index + 1].path!];
  });

  return footerData;
};

export { registerRoute, registerFooter };
