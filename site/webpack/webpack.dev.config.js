const { resolve } = require('path');
const webpack = require('webpack');
const base = require('./webpack.config');
const postcssPlugins = require('./postcss.config');

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: postcssPlugins,
    sourceMap: true
  }
};

const scssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: [
      require('postcss-easy-import')({
        extensions: ['.scss', '.css']
      }),
      require('precss'),
      require('autoprefixer')
    ],
    parser: require('postcss-scss'),
    sourceMap: true
  }
};

module.exports = Object.assign({}, base, {
  entry: {
    docs: ['react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:4396', 'webpack/hot/only-dev-server', './src/index.js'],
    vendor: ['react', 'react-dom', 'classnames']
  },

  output: Object.assign({}, base.output, {
    publicPath: '/'
  }),

  module: Object.assign({}, base.module, {
    rules: base.module.rules.concat([
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
