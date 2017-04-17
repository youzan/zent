import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import navConfig from './nav.config.js';
import routes from './router.config';
import packageJson from '../../packages/zent/package.json';

import '../assets/docs.css';
import '../assets/react-docs.css';

const global = {
  version: packageJson.version
};
window._global = global;

Vue.use(VueRouter);

let routesConfig = routes(navConfig, true);
routesConfig.push({
  path: '*',
  redirect: '/component'
});

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routesConfig
});

router.beforeEach((route, redirect, next) => {
  if (route.path !== '/') {
    window.scrollTo(0, 0);
  }
  document.title = route.meta.title || document.title;
  next();
});

new Vue({ // eslint-disable-line
  render: h => h(App),
  router
}).$mount('#app-container');
