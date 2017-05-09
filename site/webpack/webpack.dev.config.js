var base = require('./webpack.config');

module.exports = Object.assign({}, base, {
  output: Object.assign(base.output, {
    publicPath: '/'
  }),

  devtool: 'inline-cheap-source-map'
});
