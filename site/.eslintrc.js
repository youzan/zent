module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: ['../eslintrc.react.js.base.js'],
  ignorePatterns: ['node_modules/', 'dist/'],
  parserOptions: {
    babelOptions: {
      root: __dirname,
    },
  },
  // overrides: [{ files: 'src/*.tsx?' }],
};
