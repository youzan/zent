var webpack = require('webpack');
var base = require('./webpack.config');

module.exports = Object.assign({}, base, {
  plugins: base.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),

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
