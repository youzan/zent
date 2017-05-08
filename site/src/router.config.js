import React from 'react';
import {prefix} from './constants';

const registerRoute = (navData) => {
  let route = [];
  navData.forEach(nav => {
    if (nav.groups) {
      nav.groups.forEach(group => {
        group.list.forEach(nav => {
          addRoute(nav);
        });
      });
    } else if (nav.children) {
      nav.children.forEach(nav => {
        addRoute(nav);
      });
    } else {
      addRoute(nav);
    }
  });

  function addRoute(page) {
    route.push({
      path: `/${page.path}`,
      component: page.component,
      title: page.title
    });
  }
  return route;
};

export default registerRoute;
