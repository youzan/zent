import Vue from 'vue';
import React from 'react';
import ReactDom from 'react-dom';

import { prefix } from './constants';

const registerRoute = (navConfig, isReact) => {
  let route = [];
  let navs = navConfig['zh-CN'];
  navs.forEach(nav => {
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
    const componentName = 'demo-page-' + page.path.replace('/', '-');
    let filePath;
    if (page.filePath) {
      filePath = page.filePath;
    } else {
      let fileName = page.path + (isReact ? '.js' : '.md');
      filePath = './examples' + fileName;
    }

    if (isReact) {
      route.push({
        path: `/${page.path}`,
        component: Vue.component(componentName, {
          render(createElement) {
            return createElement('div', {
              class: {
                'react-doc-page-content': true
              }
            });
          },
          mounted() {
            ReactDom.render(React.createElement(page.component), this.$el);
          },
          beforeDestroy() {
            ReactDom.unmountComponentAtNode(this.$el);
          }
        })
      });
    }
  }

  return route;
};

export default registerRoute;
