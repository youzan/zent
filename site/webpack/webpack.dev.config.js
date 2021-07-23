const { merge } = require('webpack-merge');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const base = require('./webpack.config');

module.exports = merge(base, {
  entry: {
    docs: [
      'webpack-dev-server/client?http://localhost:4396',
      'webpack/hot/only-dev-server',
      './src/index.tsx',
    ],
  },

  devtool: 'inline-cheap-module-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
});
