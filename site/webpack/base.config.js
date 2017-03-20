var path = require('path');
var zanDocLoader = require.resolve('../zandoc-loader');
var zanDocReactLoader = require.resolve('../zandoc-react-loader');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
      require.resolve('babel-plugin-transform-class-properties'),
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
          {
            loader: require.resolve('zandoc-react-loader'),
            options: {
              jsTemplate: path.resolve('./theme/template.js')
            }
          },
          require.resolve('zandoc-loader')
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: require.resolve("style-loader"),
          use: require.resolve("css-loader")
        })
      }
    ]
  },
  resolve: {
    alias: {
      zent: path.resolve(__dirname, '../../packages/zent')
    }
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true,
    })
  ]
};
