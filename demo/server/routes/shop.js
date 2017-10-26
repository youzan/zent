const router = require('express').Router();
const addRoute = require('./add-route');

addRoute(
  router,
  'get',
  '/paper/list.json',
  req => `/shop/list${req.query.page}.json`
);
addRoute(router, 'get', '/paper/detail.json', '/shop/paper-detail.json');
addRoute(router, 'post', '/paper/delete.json', '/shop/paper-delete.json');
addRoute(router, 'post', '/paper/copy.json', '/shop/paper-copy.json');
addRoute(
  router,
  'post',
  '/paper/sethomepage.json',
  '/shop/paper-sethomepage.json'
);

addRoute(
  router,
  'get',
  '/paper/upload/media/medialist.json',
  '/shop/paper-upload-medialist.json'
);
addRoute(
  router,
  'get',
  '/paper/upload/category/categorylist.json',
  '/shop/paper-upload-categorylist.json'
);
addRoute(
  router,
  'post',
  '/paper/upload/dock/fetch.json',
  '/shop/paper-upload-fetch.json'
);
addRoute(
  router,
  'post',
  '/paper/upload/dock/token.json',
  '/shop/paper-upload-token.json'
);
addRoute(
  router,
  'post',
  '/paper/upload/upload.json',
  '/shop/paper-upload.json'
);

addRoute(
  router,
  'get',
  '/paper/showcase/goods/shortList.json',
  '/shop/paper-showcase-goodslist.json'
);
addRoute(
  router,
  'get',
  '/paper/showcase/tag/shortList.json',
  '/shop/paper-showcase-taglist.json'
);
addRoute(
  router,
  'get',
  '/paper/showcase/shop/url.json',
  '/shop/paper-showcase-url.json'
);

module.exports = router;
