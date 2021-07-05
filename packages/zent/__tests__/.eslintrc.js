const path = require('path');

module.exports = {
  root: true,
  extends: ['../../../eslintrc.react.js.base.js'],
  env: {
    jest: true,
    browser: true,
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  parserOptions: {
    babelOptions: {
      root: path.resolve(__dirname, '..'),
    },
  },
};
