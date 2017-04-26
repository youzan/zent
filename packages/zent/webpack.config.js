/* eslint-disable no-var, prefer-template */

var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

// 为src目录下的所有子目录创建alias
// e.g. zent-button => './src/button'
function createAlias() {
  var packagesDir = path.resolve(__dirname, './src');
  var packages = fs.readdirSync(packagesDir);

  return packages
    .filter(p => fs.statSync(path.join(packagesDir, p)).isDirectory())
    .reduce((alias, p) => {
      alias[p] = path.join(packagesDir, p);
      return alias;
    }, {});
}

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'zent-umd.js',
    library: 'zent',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },

  externals: [
    {
      react: {
        amd: 'react',
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react'
      },
      'react-dom': {
        amd: 'react-dom',
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom'
      }
    }
  ],

  resolve: {
    alias: createAlias()
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production' // use 'development' unless process.env.NODE_ENV is defined
    })
  ]
};
