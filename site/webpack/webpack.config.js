const webpack = require('webpack');
const sass = require('sass');
const os = require('os');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const tsCompilerConstantsPlugin =
  require('../../packages/zent/plugins/ts-plugin-constants').default;
const tsVersionAttributePlugin =
  require('../../packages/zent/plugins/ts-plugin-version-attribute').default;
const constants = require('../src/constants');

const DEV = process.env.NODE_ENV !== 'production';

const babelPlugins = DEV ? [require.resolve('react-refresh/babel')] : [];

module.exports = {
  mode: process.env.NODE_ENV,

  cache: DEV
    ? {
        type: 'filesystem',
        store: 'pack',
      }
    : false,

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-[contenthash].js',
    publicPath: constants.prefix,
  },

  stats: 'summary',

  performance: {
    hints: false,
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.md'],
    alias: Object.assign({
      zent$: path.resolve(__dirname, '../zent'),
      'zent/es': path.resolve(__dirname, '../../packages/zent/src'),
      'zent/theme-css-vars.json': path.resolve(
        __dirname,
        '../../packages/zent/theme-css-vars.json'
      ),
    }),
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
              postcssOptions: {
                config: path.resolve(__dirname, '../postcss.config.js'),
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: DEV,
              implementation: sass,
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
              plugins: babelPlugins,
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
          {
            loader: 'babel-loader',
            options: {
              compact: false,
              // tell babel-loader to use this config
              configFile: path.resolve(
                __dirname,
                '../../packages/zent/.babelrc.js'
              ),
              plugins: babelPlugins,
            },
          },
          {
            loader: 'react-markdown-doc-loader',
            options: {
              jsTemplate: path.resolve(__dirname, '../react-template.jstpl'),
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
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(
                __dirname,
                DEV ? '../tsconfig.json' : '../tsconfig-prod.json'
              ),
              getCustomTransformers: program => ({
                before: [
                  tsCompilerConstantsPlugin(program),
                  tsVersionAttributePlugin(program),
                  // eslint-disable-next-line global-require
                ].concat(DEV ? [require('react-refresh-typescript')()] : []),
              }),
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

    new FaviconsWebpackPlugin({
      logo: './assets/zanui-logo.png',
      cache: true,
      prefix: 'favico/[contenthash:16]/',
      inject: true,

      // https://github.com/itgalaxy/favicons
      favicons: {
        appName: 'Zent',
        appDescription:
          'A collection of essential UI components written with React',
        // https://github.com/jantimon/favicons-webpack-plugin#advanced-usage
        // Set to null to disable automatically retrieving metadata from package.json
        developerName: null,
        developerURL: null,
        version: null,

        background: '#fff',

        icons: {
          favicons: true,

          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          firefox: false,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false,
        },
      },
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

  node: false,
};
