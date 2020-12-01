module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  ignorePatterns: ['coverage/', 'es/', 'node_modules/', '*.js'],
  extends: ['plugin:react/recommended', './eslintrc.base.js'],
  plugins: ['react-hooks'],
  settings: {
    react: {
      pragma: 'React', // Pragma to use, default to "React"
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
  },
  rules: {
    'react/prop-types': 'off',
    'react/no-find-dom-node': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
