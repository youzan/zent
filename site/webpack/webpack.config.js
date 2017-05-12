const webpack = require('webpack');
const { join, resolve } = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 为src目录下的所有子目录创建alias
function createAlias() {
  const packagesDir = resolve(__dirname, '../../packages/zent/src');
  const packages = fs.readdirSync(packagesDir);

  return packages
    .filter(p => fs.statSync(join(packagesDir, p)).isDirectory())
    .reduce((alias, p) => {
      alias[p] = join(packagesDir, p);
      return alias;
    }, {});
}

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
      createAlias()
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
