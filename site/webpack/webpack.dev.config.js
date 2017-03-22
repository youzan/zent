var base = require('./webpack.config');

module.exports = Object.assign({}, base, {
  devtool: 'source-map'
});
