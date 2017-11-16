const webpack = require('webpack');
const HappyPack = require('happypack');
const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const createAlias = require('../../packages/zent/createAlias');
const happyThreadPool = require('./happypack-thread-pool');

const {
  getBabelLoaderOptions,
  getMarkdownLoaders
} = require('./loader.config');

const babelLoader = {
  loader: 'babel-loader',
  options: getBabelLoaderOptions({ dev: true })
};

module.exports = {
  output: {
    path: join(__dirname, '../dist'),
    filename: '[name]-[hash].js'
  },

  resolve: {
    extensions: ['.js', '.pcss', '.md'],
    mainFields: ['jsnext:main', 'main'],
    alias: Object.assign(
      {
        // components: join(__dirname, '../src/components'),
        zent$: join(__dirname, '../zent')
      },
      createAlias(resolve(__dirname, '../../packages/zent/src'))
    )
  },

  module: {
    rules: [
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        use: 'url-loader'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!transliteration\/)/,
        use: 'happypack/loader?id=js'
      },
      {
        test: /\.md$/,
        use: 'happypack/loader?id=md'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunks: ['vendor', 'docs', 'markdown'],
      inject: 'body'
    }),

    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: [babelLoader]
    }),

    new HappyPack({
      id: 'md',
      threadPool: happyThreadPool,
      loaders: getMarkdownLoaders(babelLoader)
    })
  ],

  node: {
    fs: 'empty',
    net: 'empty'
  }
};
