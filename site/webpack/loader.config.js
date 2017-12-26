/* eslint-disable global-require */

const { join } = require('path');

function getBabelLoaderOptions(options = {}) {
  const dev = options.dev || false;
  const plugins = [require.resolve('babel-plugin-syntax-dynamic-import')];
  if (dev) {
    plugins.unshift(
      require.resolve('react-loadable/babel'),
      require.resolve('react-hot-loader/babel')
    );
  }

  return {
    presets: [
      require.resolve('babel-preset-react'),
      [require.resolve('babel-preset-es2015'), { modules: false }],
      require.resolve('babel-preset-stage-1')
    ],
    plugins,
    cacheDirectory: dev
  };
}

function getMarkdownLoaders(babelLoader) {
  return [
    babelLoader,
    {
      loader: require.resolve('react-markdown-doc-loader'),
      options: {
        jsTemplate: join(__dirname, '../react-template.jstpl'),
        renderers: {
          markdown: 'Markdown',
          style: 'Style',
          demo: 'Demo'
        }
      }
    },
    require.resolve('markdown-doc-loader')
  ];
}

module.exports = {
  getBabelLoaderOptions,
  getMarkdownLoaders
};
