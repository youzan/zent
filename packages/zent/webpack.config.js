const path = require('path');
const webpack = require('webpack');
const createAlias = require('./createAlias');

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
    alias: createAlias(path.resolve(__dirname, './src'))
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production' // use 'development' unless process.env.NODE_ENV is defined
    })
  ]
};
