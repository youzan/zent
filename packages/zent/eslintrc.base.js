module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'ban', 'prettier'],
  extends: ['prettier/@typescript-eslint', 'plugin:import/typescript'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I'],
      },
      {
        selector: 'class',
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'no-public',
      },
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
        argsIgnorePattern: '^_',
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
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-new-wrappers': 'error',
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    'no-return-await': 'error',
    'no-throw-literal': 'error',
    'no-unsafe-finally': 'error',
    'no-unused-labels': 'error',
    'no-nested-ternary': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    radix: 'error',
    'use-isnan': 'error',
    'prettier/prettier': 'error',
  },
};
