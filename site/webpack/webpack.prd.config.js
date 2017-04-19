var webpack = require('webpack');
var base = require('./webpack.config');

module.exports = Object.assign({}, base, {
  output: Object.assign(base.output, {
    publicPath: './'
  }),

  plugins: base.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
});
