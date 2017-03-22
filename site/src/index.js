import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import navConfig from '../nav.config.js';
import routes from './router.config';
import SideNav from './components/side-nav';
import DemoBlock from './components/demo-block';
import FooterNav from './components/footer-nav';

Vue.use(VueRouter);
Vue.component('side-nav', SideNav);
Vue.component('demo-block', DemoBlock);
Vue.component('footer-nav', FooterNav);

let routesConfig = routes(navConfig, true);

const router = new VueRouter({
  mode: 'hash',
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
  if (route.page !== '/') {
    // const sideNavHeight = document.querySelector('.side-nav').clientHeight;
    // const pageContentBox = document.querySelector('.page-content');
    // const pageContentHeight = pageContentBox.clientHeight;
    // pageContentBox.style.height = Math.max(sideNavHeight, pageContentHeight) + 'px';
  }
});

new Vue({ // eslint-disable-line
  render: h => h(App),
  router
}).$mount('#app-container');
