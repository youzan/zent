var base = require('./webpack.config');

module.exports = Object.assign({}, base, {
  output: Object.assign(base.output, {
    publicPath: '/'
  }),

  devtool: 'source-map'
});
