import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import navConfig from '../nav.config.js';
import routes from './router.config';
import SideNav from './components/side-nav';
import DemoBlock from './components/demo-block';
import FooterNav from './components/footer-nav';
import PageHeader from './components/page-header';
import PageFooter from './components/page-footer';

Vue.use(VueRouter);
Vue.component('side-nav', SideNav);
Vue.component('demo-block', DemoBlock);
Vue.component('footer-nav', FooterNav);
Vue.component('page-header', PageHeader);
Vue.component('page-footer', PageFooter);

let routesConfig = routes(navConfig, true);

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

router.afterEach((route) => {
  if (route.path !== '/') {
    // const sideNavBox = document.querySelector('.side-nav');
    // const pageContentBox = document.querySelector('.page-content');
    // pageContentBox.style.height = Math.max(sideNavBox && sideNavBox.clientHeight, pageContentBox && pageContentBox.clientHeight) + 'px';
  }
});

new Vue({ // eslint-disable-line
  render: h => h(App),
  router
}).$mount('#app-container');
