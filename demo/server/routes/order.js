const router = require('express').Router();
const addRoute = require('./add-route');

addRoute(router, 'get', '/list.json', req => `/order/list${req.query.p}.json`);

module.exports = router;
