const merge = require('webpack-merge');
const webpack = require('webpack');

const base = require('./webpack.config');

module.exports = merge.smart(base, {
  entry: {
    docs: [
      'webpack-dev-server/client?http://localhost:4396',
      'webpack/hot/only-dev-server',
      './src/index.js',
    ],
  },

  devtool: 'inline-cheap-module-source-map',

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
});
