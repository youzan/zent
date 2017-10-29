const webpack = require('webpack');

const vendorEntry = require('./vendor-entry');
const base = require('./webpack.config');
const { getBabelLoader, getRules } = require('./loader.config');

const babelLoader = getBabelLoader({ dev: true });

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
    rules: base.module.rules.concat(getRules(babelLoader), [
      {
        test: /\.p?css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: true,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              // most of the options reads from projectRoot/postcss.config.js
              sourceMap: true
            }
          }
        ]
      }
    ])
  }),

  devtool: 'inline-cheap-source-map',

  plugins: base.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin()
  ])
});
