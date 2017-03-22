var webpack = require('webpack');
var path = require('path');
var postcssPlugins = require('./postcss.config');

var babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: [
      require.resolve('babel-preset-react'),
      require.resolve('babel-preset-es2015'),
    ],
    plugins: [
      require.resolve('babel-plugin-transform-class-properties'),
      require.resolve('babel-plugin-transform-runtime'),
    ]
  }
};
var postcssLoader = {
  loader: require.resolve('postcss-loader'),
  options: {
    plugins: postcssPlugins
  }
};

module.exports = {
  entry: {
    docs: './src/index.js',
    vendor: [
      'react',
      'react-dom',
      'zent'
    ]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: 'dist/',
    filename: '[name].js'
  },
  resolve: {
    modules: [
      path.join(__dirname, '../node_modules'),
      'node_modules'
    ],
    extensions: ['.js', '.vue', '.pcss', '.md'],
    alias: {
      vue$: 'vue/dist/vue.runtime.common.js',
      components: path.join(__dirname, '../src/components'),
      zent: path.join(__dirname, '../../packages/zent')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: require.resolve('vue-loader'),
            options: {
              postcss: postcssPlugins,
              loaders: {
                js: babelLoader
              }
            }
          }
        ]
      },
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
              jsTemplate: path.resolve(__dirname, '../react-template.js')
            }
          },
          require.resolve('zandoc-loader')
        ]
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          postcssLoader
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        use: require.resolve('url-loader')
      }
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    })
  ]
};
