const webpack = require('webpack');
const HappyPack = require('happypack');
const vendorEntry = require('./vendor-entry');
const base = require('./webpack.config');
const happyThreadPool = require('./happypack-thread-pool');

module.exports = Object.assign({}, base, {
  entry: {
    docs: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:4396',
      'webpack/hot/only-dev-server',
      './src/index.js'
    ],
    vendor: vendorEntry
  },

  output: Object.assign({}, base.output, {
    publicPath: '/'
  }),

  module: Object.assign({}, base.module, {
    rules: base.module.rules.concat({
      test: /\.p?css$/,
      use: 'happypack/loader?id=styles'
    })
  }),

  devtool: 'inline-cheap-source-map',

  plugins: base.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin(),

    new HappyPack({
      id: 'styles',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'style-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 0,
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    })
  ])
});
