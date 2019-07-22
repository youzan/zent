const webpack = require('webpack');
const Fiber = require('fibers');
const sass = require('sass');
const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const createAlias = require('../../packages/zent/createAlias');
const constants = require('../src/constants');

const DEV = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: process.env.NODE_ENV,

  output: {
    path: join(__dirname, '../dist'),
    filename: '[name]-[hash].js',
    publicPath: constants.prefix,
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.pcss', '.md'],
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
        test: /\.s?css$/,
        use: [
          DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'cache-loader',
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
          {
            loader: 'sass-loader',
            options: {
              sourceMap: DEV,
              implementation: sass,
              fiber: Fiber,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.md$/,
        use: [
          'cache-loader',
          'babel-loader',
          {
            loader: 'react-markdown-doc-loader',
            options: {
              jsTemplate: join(__dirname, '../react-template.jstpl'),
              renderers: {
                markdown: 'Markdown',
                style: 'Style',
                demo: 'Demo',
              },
            },
          },
          'markdown-doc-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useCache: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      VERSION: 'release',
    }),

    new ProgressBarPlugin(),

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
