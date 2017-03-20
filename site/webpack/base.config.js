var path = require('path');
var zanDocLoader = require.resolve('../zandoc-loader');
var zanDocReactLoader = require.resolve('../zandoc-react-loader');

var babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: [
      require.resolve('babel-preset-react'),
      [require.resolve('babel-preset-env'), {
        targets: {
          browsers: ['last 3 versions', 'safari >= 7', 'ie >= 9']
        }
      }]
    ],
    plugins: [
      [require.resolve('babel-plugin-transform-runtime'), {
        helpers: true, // defaults to true
        polyfill: true, // defaults to true
        regenerator: false, // defaults to true
      }]
    ]
  }
};

module.exports = {
  entry: [
    './theme/app.js',
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/dist/',
    path: path.resolve(__dirname, '../dist')
  },
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: babelLoader
      },
      {
        test: /\.md$/,
        use: [
          babelLoader,
          zanDocReactLoader,
          zanDocLoader
        ]
      }
    ]
  },
  resolve: {
    alias: {
      zent: path.resolve(__dirname, '../../packages/zent')
    }
  }
};
