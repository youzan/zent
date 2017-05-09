const webpack = require('webpack');
const { join, resolve } = require('path');
const fs = require('fs');
const postcssPlugins = require('./postcss.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 为src目录下的所有子目录创建alias
function createAlias() {
  var packagesDir = resolve(__dirname, '../../packages/zent/src');
  var packages = fs.readdirSync(packagesDir);

  return packages
    .filter(p => fs.statSync(join(packagesDir, p)).isDirectory())
    .reduce((alias, p) => {
      alias[p] = join(packagesDir, p);
      return alias;
    }, {});
}

// NOTE: .babelrc inside packages/zent will affect the behavior of babel loader
const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: [
      require.resolve('babel-preset-react'),
      [
        require.resolve('babel-preset-es2015'),
        {modules: false}],
      require.resolve('babel-preset-stage-1'),
    ],
    plugins: [
      require.resolve('react-hot-loader/babel'),
    ],
  }
};
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

module.exports = {
  entry: {
    docs: ['react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server', './src/index.js'],
    vendor: ['react', 'react-dom', 'classnames']
  },
  output: {
    path: join(__dirname, '../dist'),
    filename: '[name]-[hash].js',
  },
  resolve: {
    modules: [join(__dirname, '../node_modules'), 'node_modules'],
    extensions: ['.js', '.pcss', '.md'],
    alias: Object.assign({
      components: join(__dirname, '../src/components'),
      zent$: join(__dirname, '../zent')
    }, createAlias())
  },
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
            loader: require.resolve('react-markdown-doc-loader'),
            options: {
              jsTemplate: join(__dirname, '../react-template.js'),
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
      },
      {
        test: /\.p?css$/,
        use: ['style-loader?sourceMap', 'css-loader?sourceMap', postcssLoader]
      },
      {
        test: /\.scss$/,
        use: ['style-loader?sourceMap', 'css-loader?sourceMap', scssLoader]
      },
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

    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin(),
  ],

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/',
    inline: true,
    historyApiFallback: true
  }
};
