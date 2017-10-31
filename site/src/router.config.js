// import { prefix } from './constants';

const registerRoute = (navData, oreo = '') => {
  let route = [];

  if (!navData) return route;

  function addRoute(page) {
    const { path, source, title } = page;
    route.push({
      path: `${oreo}/${path}`,
      source,
      title
    });
  }

  navData.forEach(nav => {
    if (nav.groups) {
      nav.groups.forEach(group => {
        group.list.forEach(subNav => {
          addRoute(subNav);
        });
      });
    } else if (nav.children) {
      nav.children.forEach(subNav => {
        addRoute(subNav);
      });
    } else {
      addRoute(nav);
    }
  });

  return route;
};

const registerFooter = routeData => {
  const footerData = {};

  routeData.forEach(route => {
    footerData[route.path] = { pathname: route.path, title: route.title };
  });

  routeData.forEach((route, index) => {
    footerData[route.path].prev =
      index === 0 ? null : footerData[routeData[index - 1].path];
    footerData[route.path].next =
      index === routeData.length - 1
        ? null
        : footerData[routeData[index + 1].path];
  });

  return footerData;
};

export { registerRoute, registerFooter };
