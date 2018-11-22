const webpack = require('webpack');
const HappyPack = require('happypack');
const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const createAlias = require('../../packages/zent/createAlias');
const happyThreadPool = require('./happypack-thread-pool');

const {
  getBabelLoaderOptions,
  getMarkdownLoaders,
} = require('./loader.config');

const DEV = process.env.NODE_ENV !== 'production';

const PREFIX = DEV ? '/' : '/zent/';

const babelLoader = {
  loader: 'babel-loader',
  options: getBabelLoaderOptions({ dev: DEV }),
};

module.exports = {
  mode: process.env.NODE_ENV,

  output: {
    path: join(__dirname, '../dist'),
    filename: '[name]-[hash].js',
    publicPath: PREFIX,
  },

  resolve: {
    extensions: ['.js', '.pcss', '.md'],
    alias: Object.assign(
      {
        zent$: join(__dirname, '../zent'),
      },
      createAlias(resolve(__dirname, '../../packages/zent/src'))
    ),
  },

  module: {
    rules: [
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        use: 'url-loader',
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.p?css$/,
        use: [
          DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'happypack/loader?id=styles',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!transliteration\/)/,
        use: 'happypack/loader?id=js',
      },
      {
        test: /\.md$/,
        use: 'happypack/loader?id=md',
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunks: ['vendor', 'docs'],
      inject: 'body',
    }),

    new HtmlWebpackPlugin({
      template: 'src/404.html',
      filename: '404.html',
      chunks: [],
      inject: false,
    }),

    new MiniCssExtractPlugin({
      filename: DEV ? '[name].css' : '[name]-[contenthash].css',
      chunkFilename: DEV ? '[id].css' : '[id].[contenthash].css',
    }),

    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: [babelLoader],
    }),

    new HappyPack({
      id: 'md',
      threadPool: happyThreadPool,
      loaders: getMarkdownLoaders(babelLoader),
    }),

    new HappyPack({
      id: 'styles',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: DEV,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: DEV,
          },
        },
      ],
    }),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },

  node: {
    fs: 'empty',
    net: 'empty',
  },
};
