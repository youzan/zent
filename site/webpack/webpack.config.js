const webpack = require('webpack');
const Fiber = require('fibers');
const sass = require('sass');
const os = require('os');
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
          {
            loader: 'thread-loader',
            // loaders with equal options will share worker pools
            options: {
              // the number of spawned workers, defaults to (number of cpus - 1) or
              // fallback to 1 when require('os').cpus() is undefined
              workers: os.cpus() - 1,

              // number of jobs a worker processes in parallel
              // defaults to 20
              workerParallelJobs: 10,

              // additional node.js arguments
              workerNodeArgs: ['--max-old-space-size=1024'],

              // Allow to respawn a dead worker pool
              // respawning slows down the entire compilation
              // and should be set to false for development
              poolRespawn: !DEV,

              // timeout for killing the worker processes when idle
              // defaults to 500 (ms)
              // can be set to Infinity for watching builds to keep workers alive
              poolTimeout: DEV ? Infinity : 500,

              // number of jobs the poll distributes to the workers
              // defaults to 200
              // decrease of less efficient but more fair distribution
              poolParallelJobs: 50,

              // name of the pool
              // can be used to create different pools with elsewise identical options
              name: 'md-pool',
            },
          },
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
