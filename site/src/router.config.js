import Vue from 'vue';
import React from 'react';
import ReactDom from 'react-dom';

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
    const componentName = 'demo-page-' + page.path.slice(1);
    let filePath;
    if (page.filePath) {
      filePath = page.filePath;
    } else {
      let fileName = page.path + (isReact ? '.js' : '.md');
      filePath = './examples' + fileName;
    }

    if (isReact) {
      route.push({
        path: '/component' + page.path,
        component: Vue.component(componentName, {
          render(createElement) {
            return createElement('div');
          },
          mounted() {
            page.filePath().then((res) => {
              ReactDom.render(
                React.createElement(res),
                this.$el
              );
            });
          }
        })
      });
    } else {
      route.push({
        path: '/component' + page.path,
        component: function(resolve) {
          require([`${filePath}`], resolve);
        }
      });
    }
  }

  // console.log(route);

  return route;
};

export default registerRoute;
