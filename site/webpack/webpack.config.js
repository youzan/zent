const webpack = require('webpack');
const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const createAlias = require('../../packages/zent/createAlias');

module.exports = {
  output: {
    path: join(__dirname, '../dist'),
    filename: '[name]-[hash].js'
  },

  resolve: {
    extensions: ['.js', '.pcss', '.md'],
    mainFields: ['jsnext:main','main'],
    alias: Object.assign(
      {
        components: join(__dirname, '../src/components'),
        zent$: join(__dirname, '../zent'),
        'react': 'react/dist/react.js',
        'react-dom': 'react-dom/dist/react-dom.js'
      },
      createAlias(resolve(__dirname, '../../packages/zent/src'))
    ),
    // modules: [resolve(__dirname, '../node_modules'), resolve(__dirname, '../../node_modules')]
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
    })
  ],

  node: {
    fs: 'empty',
    net: 'empty',
  }
};
