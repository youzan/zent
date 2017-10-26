const getJSONMock = require('./json-mock');
const isFunction = require('lodash/isFunction');

module.exports = function addRoute(router, method, url, mockFile) {
  router[method](url, (req, res, next) => {
    getJSONMock(isFunction(mockFile) ? mockFile(req) : mockFile)
      .then(mock => res.json(mock))
      .catch(next);
  });
};
