const webpack = require('webpack');
const base = require('./webpack.config');
const { babelLoader, postcssLoader, scssLoader, getRules } = require('./loader.config');

babelLoader.options.plugins = [require.resolve('react-hot-loader/babel')]

module.exports = Object.assign({}, base, {
  entry: {
    docs: ['react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:4396', 'webpack/hot/only-dev-server', './src/index.js'],
    vendor: ['react', 'react-dom', 'classnames']
  },

  output: Object.assign({}, base.output, {
    publicPath: '/'
  }),

  module: Object.assign({}, base.module, {
    rules: base.module.rules.concat(getRules(babelLoader), [
      {
        test: /\.p?css$/,
        use: ['style-loader?sourceMap', 'css-loader?sourceMap', postcssLoader]
      },
      {
        test: /\.scss$/,
        use: ['style-loader?sourceMap', 'css-loader?sourceMap', scssLoader]
      },
    ])
  }),

  devtool: 'inline-cheap-source-map',

  plugins: base.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin(),
  ])
});
