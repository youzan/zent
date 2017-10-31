const webpack = require('webpack');
const HappyPack = require('happypack');

const vendorEntry = require('./vendor-entry');
const base = require('./webpack.config');
const { getBabelLoader, getRules } = require('./loader.config');

const babelLoader = getBabelLoader({ dev: true });
const happyThreadPool = HappyPack.ThreadPool({ size: 8 });

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
    rules: base.module.rules.concat([
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=js'
      },
      {
        test: /\.md$/,
        use: 'happypack/loader?id=md'
      }
    ], [
      {
        test: /\.p?css$/,
        use: 'happypack/loader?id=styles'
      }
    ])
  }),

  devtool: 'inline-cheap-source-map',

  plugins: base.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin(),

    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: [getRules(babelLoader)[0].use]
    }),

    new HappyPack({
      id: 'md',
      threadPool: happyThreadPool,
      loaders: getRules(babelLoader)[1].use
    }),

    new HappyPack({
      id: 'styles',
      threadPool: happyThreadPool,
      loaders: [{
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
      }]
    })
  ])
});
