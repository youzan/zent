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
    modules: [join(__dirname, '../node_modules'), 'node_modules'],
    extensions: ['.js', '.pcss', '.md'],
    alias: Object.assign(
      {
        components: join(__dirname, '../src/components'),
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
      chunks: ['vendor', 'docs'],
      inject: 'body'
    })
  ]
};
