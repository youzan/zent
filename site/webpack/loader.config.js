/* eslint-disable global-require */

const { join } = require('path');
const postcssPlugins = require('./postcss.config');

function getBabelLoader(options = {}) {
  const dev = options.dev || false;

  return {
    loader: 'babel-loader',
    options: {
      presets: [
        require.resolve('babel-preset-react'),
        [require.resolve('babel-preset-es2015'), { modules: false }],
        require.resolve('babel-preset-stage-1')
      ],
      plugins: dev ? [require.resolve('react-hot-loader/babel')] : []
    }
  };
}

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: postcssPlugins
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
    parser: require('postcss-scss')
  }
};

const getRules = babelLoader => [
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
  }
];

module.exports = {
  getBabelLoader,
  postcssLoader,
  scssLoader,
  getRules
};
