const { resolve } = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const vendorEntry = require('./vendor-entry');
const base = require('./webpack.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const happyThreadPool = require('./happypack-thread-pool');

const prefix = 'https://b.yzcdn.cn/zanui/zent/';

module.exports = Object.assign({}, base, {
  entry: {
    docs: './src/index.js',
    vendor: vendorEntry
  },

  output: Object.assign({}, base.output, {
    publicPath: prefix
  }),

  module: Object.assign({}, base.module, {
    rules: base.module.rules.concat({
      test: /\.p?css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'happypack/loader?id=styles'
      })
    })
  }),

  // module: Object.assign({}, base.module, {
  //   rules: base.module.rules.concat(getRules(babelLoader), [
  //     {
  //       test: /\.p?css$/,
  //       use: ExtractTextPlugin.extract({
  //         fallback: 'style-loader',
  //         use: ['css-loader', 'postcss-loader']
  //       })
  //     }
  //   ])
  // }),

  plugins: base.plugins.concat([
    new FaviconsWebpackPlugin({
      // Your source logo
      logo: './assets/ZanUIlogo256x256.png',
      // The prefix for all image files (might be a folder or a name)
      prefix: 'favico-[hash]-',
      // Emit all stats of the generated icons
      // emitStats: false,
      // The name of the json containing all favicon information
      // statsFilename: 'iconstats-[hash].json',
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: false,
      // Inject the html into the html-webpack-plugin
      inject: true,
      // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
      background: '#fff',
      // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
      title: 'Zent',

      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),

    new HappyPack({
      id: 'styles',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        'postcss-loader'
      ]
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
    }),

    new ExtractTextPlugin({
      filename: '[name]-[contenthash].css',
      allChunks: true
    })
  ]),
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    publicPath: prefix
  }
});
