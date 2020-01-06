module.exports = {
  env: {
    node: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  extends: ['../../eslintrc.base.js'],
  rules: {
    'import/no-commonjs': 'off',
  },
};
