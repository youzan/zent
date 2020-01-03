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
    '@typescript-eslint/ban-ts-ignore': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/class-name-casing': 'error',
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'no-public',
      },
    ],
    '@typescript-eslint/interface-name-prefix': [
      'error',
      { prefixWithI: 'always' },
    ],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/triple-slash-reference': 'error',
    '@typescript-eslint/no-unused-vars': [
      'off',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    'ban/ban': [
      'error',
      {
        name: 'Array',
        message: 'tsstyle#array-constructor',
      },
      {
        name: ['*', 'innerText'],
        message: 'Use .textContent instead. tsstyle#browser-oddities',
      },
      {
        name: ['document', 'createElement'],
        message: 'Use utils/dom/createElement',
      },
      {
        name: ['*', 'addEventListener'],
        message:
          'Use { addEventListener, useEventHandler, EventHandler } from utils/dom/event-handler',
      },
      {
        name: ['*', 'removeEventListener'],
        message:
          'Use return value of { addEventListener } from utils/dom/event-handler',
      },
    ],
    camelcase: 'error',
    'comma-dangle': ['error', 'always-multiline'],
    curly: ['error', 'multi-line'],
    'default-case': 'error',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'id-blacklist': ['error', 'any', 'string', 'boolean', 'Undefined', 'Null'],
    'id-match': 'error',
    'import/no-deprecated': 'error',
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-absolute-path': 'error',
    'import/no-commonjs': 'error',
    'new-parens': 'error',
    'no-caller': 'error',
    'no-debugger': 'error',
    'no-new-wrappers': 'error',
    'no-redeclare': 'error',
    'no-return-await': 'error',
    'no-throw-literal': 'error',
    'no-unsafe-finally': 'error',
    'no-unused-labels': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    radix: 'error',
    'react/prop-types': 'off',
    'react/no-find-dom-node': 'off',
    'use-isnan': 'error',
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
};
