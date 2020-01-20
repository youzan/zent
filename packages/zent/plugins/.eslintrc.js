module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  extends: ['../eslintrc.base.js'],
  ignorePatterns: ['*.js'],
  rules: {
    'no-console': 'off',
    'import/no-commonjs': 'off',
  },
};
