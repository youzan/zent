var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var postcssPlugins = require('./postcss.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// 为src目录下的所有子目录创建alias
function createAlias() {
  var packagesDir = path.resolve(__dirname, '../../packages/zent/src');
  var packages = fs.readdirSync(packagesDir);

  return packages
    .filter(p => fs.statSync(path.join(packagesDir, p)).isDirectory())
    .reduce((alias, p) => {
      alias[p] = path.join(packagesDir, p);
      return alias;
    }, {});
}

// NOTE: .babelrc inside packages/zent will affect the behavior of babel loader
var babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: [
      require.resolve('babel-preset-react'),
      require.resolve('babel-preset-es2015'),
      require.resolve('babel-preset-stage-1')
    ],
    plugins: [
      require.resolve('babel-plugin-add-module-exports'),
      require.resolve('babel-plugin-transform-runtime')
    ]
  }
};
var postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: postcssPlugins
  }
};

var scssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: [
      require('postcss-easy-import')({
        extensions: ['.scss', '.css']
      }),
      require('precss'),
      require('autoprefixer')
    ],
    parser: require('postcss-scss')
  }
};

module.exports = {
  entry: {
    docs: './src/index.js',
    vendor: ['react', 'react-dom', 'zent', 'classnames']
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name]-[hash].js'
  },
  resolve: {
    modules: [path.join(__dirname, '../node_modules'), 'node_modules'],
    extensions: ['.js', '.vue', '.pcss', '.md'],
    alias: Object.assign({
      vue$: 'vue/dist/vue.runtime.common.js',
      components: path.join(__dirname, '../src/components'),
      zent$: path.join(__dirname, '../zent')
    }, createAlias())
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
            loader: require.resolve('react-markdown-doc-loader'),
            options: {
              jsTemplate: path.join(__dirname, '../react-template.js'),
              renderers: {
                markdown: 'Markdown',
                style: 'Style',
                demo: 'Demo'
              }
            }
          },
          require.resolve('markdown-doc-loader')
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', scssLoader]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', postcssLoader]
        })
      },
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
    }),

    new ExtractTextPlugin({
      filename: '[name]-[contenthash].css',
      allChunks: true
    })
  ]
};
