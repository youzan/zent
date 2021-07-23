const { merge } = require('webpack-merge');

const base = require('./webpack.config');

module.exports = merge(base, {
  entry: {
    docs: './src/index.tsx',
  },
});
