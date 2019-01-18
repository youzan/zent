/* eslint-disable global-require */

const { join } = require('path');

function getBabelLoaderOptions(options = {}) {
  const dev = options.dev || false;

  return {
    cacheDirectory: dev,
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
          demo: 'Demo',
        },
      },
    },
    require.resolve('markdown-doc-loader'),
  ];
}

module.exports = {
  getBabelLoaderOptions,
  getMarkdownLoaders,
};
