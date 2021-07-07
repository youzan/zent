/**
 * 原则：
 * - 不要 extends 三方包的规则列表
 * - 不使用 plugin 内置的 recommended 配置
 * - 所有规则在此文件中维护
 */
const path = require('path');

module.exports = {
  root: true,
  ignorePatterns: ['**/?eslintrc*.js'],
  extends: ['prettier'],
  parser: '@babel/eslint-parser',
  plugins: ['import', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  env: {
    es2021: true,
  },
  rules: {
    'constructor-super': 'error',
    'for-direction': 'error',
    'getter-return': 'error',
    'no-async-promise-executor': 'error',
    'no-case-declarations': 'error',
    'no-class-assign': 'error',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': 'error',
    'no-const-assign': 'error',
    'no-constant-condition': 'error',
    'no-control-regex': 'error',
    'no-delete-var': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-else-if': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty': 'error',
    'no-empty-character-class': 'error',
    'no-empty-pattern': 'error',
    'no-ex-assign': 'error',
    'no-extra-semi': 'error',
    'no-fallthrough': 'error',
    'no-func-assign': 'error',
    'no-global-assign': 'error',
    'no-import-assign': 'error',
    'no-inner-declarations': 'error',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'error',
    'no-misleading-character-class': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-new-symbol': 'error',
    'no-obj-calls': 'error',
    'no-octal': 'error',
    'no-prototype-builtins': 'error',
    'no-regex-spaces': 'error',
    'no-self-assign': 'error',
    'no-setter-return': 'error',
    'no-shadow-restricted-names': 'error',
    'no-sparse-arrays': 'error',
    'no-this-before-super': 'error',
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error',
    'no-unsafe-negation': 'error',
    'no-useless-catch': 'error',
    'no-useless-escape': 'error',
    'no-with': 'error',
    'require-yield': 'error',
    'valid-typeof': 'error',

    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-var': 'error',
    'no-undef': 'error',
    'no-nested-ternary': 'error',
    'no-use-before-define': [
      'error',
      { functions: false, classes: false, variables: true },
    ],
    camelcase: 'error',
    curly: ['error', 'multi-line'],
    'default-case': 'error',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'id-blacklist': ['error', 'any', 'string', 'boolean', 'Undefined', 'Null'],
    'id-match': 'error',
    'new-parens': 'error',
    'no-caller': 'error',
    'no-debugger': 'error',
    'no-new-wrappers': 'error',
    'no-redeclare': ['error', { builtinGlobals: false }],
    'no-return-await': 'error',
    'no-throw-literal': 'error',
    'no-unsafe-finally': 'error',
    'no-unused-labels': 'error',
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'object-shorthand': 'error',
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    radix: 'error',
    'use-isnan': 'error',

    'import/export': 'error',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-deprecated': 'error',
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-absolute-path': 'error',

    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['**/*.jsx', '**/*.tsx'],
      settings: {
        react: {
          pragma: 'React', // Pragma to use, default to "React"
          version: 'detect', // React version. "detect" automatically picks the version you have installed.
        },
      },
      plugins: ['react', 'react-hooks'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'react/no-deprecated': 'error',
        'react/no-string-refs': 'error',
        'react/no-unsafe': 'error',
        'react/display-name': 'error',
        'react/jsx-key': 'error',
        'react/jsx-no-comment-textnodes': 'error',
        'react/jsx-no-duplicate-props': 'error',
        'react/jsx-no-target-blank': 'error',
        'react/jsx-no-undef': 'error',
        'react/jsx-uses-vars': 'error',
        'react/no-children-prop': 'error',
        'react/no-danger-with-children': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-is-mounted': 'error',
        'react/no-unescaped-entities': 'error',
        'react/no-unknown-property': 'error',
        'react/require-render-return': 'error',

        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:import/typescript'],
      rules: {
        'constructor-super': 'off', // ts(2335) & ts(2377)
        'getter-return': 'off', // ts(2378)
        'no-const-assign': 'off', // ts(2588)
        'no-dupe-args': 'off', // ts(2300)
        'no-dupe-class-members': 'off', // ts(2393) & ts(2300)
        'no-dupe-keys': 'off', // ts(1117)
        'no-func-assign': 'off', // ts(2539)
        'no-import-assign': 'off', // ts(2539) & ts(2540)
        'no-new-symbol': 'off', // ts(2588)
        'no-obj-calls': 'off', // ts(2349)
        'no-redeclare': 'off', // ts(2451)
        'no-setter-return': 'off', // ts(2408)
        'no-this-before-super': 'off', // ts(2376)
        'no-undef': 'off', // ts(2304)
        'no-unreachable': 'off', // ts(7027)
        'no-unsafe-negation': 'off', // ts(2365) & ts(2360) & ts(2358)
        'no-var': 'error', // ts transpiles let/const to var, so no need for vars any more
        'prefer-const': 'error', // ts provides better types with const
        'prefer-rest-params': 'error', // ts provides better types with rest args over arguments
        'prefer-spread': 'error', // ts transpiles spread to apply, so no need for manual apply
        'valid-typeof': 'off', // ts(2367)

        // recommend: rules does not require type checking
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/ban-types': 'error',
        'no-array-constructor': 'off',
        '@typescript-eslint/no-array-constructor': 'error',
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-extra-non-null-assertion': 'error',
        'no-extra-semi': 'off',
        '@typescript-eslint/no-extra-semi': 'error',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/triple-slash-reference': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: true,
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],

        // recommend: rules require type checking
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        'no-implied-eval': 'off',
        '@typescript-eslint/no-implied-eval': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/prefer-regexp-exec': 'error',
        'require-await': 'off',
        '@typescript-eslint/require-await': 'error',

        // others
        '@typescript-eslint/no-dupe-class-members': ['error'],
        '@typescript-eslint/no-redeclare': ['error', { builtinGlobals: false }],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'error',
          { functions: false, classes: false, variables: true },
        ],

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
        '@typescript-eslint/semi': ['error', 'always'],

        'import/no-commonjs': 'error',
      },
    },
    {
      files: ['**/*.spec.js', '**/*.spec.jsx'],
      env: {
        jest: true,
      },
    },

    // packages/babel-plugin-zent
    {
      files: [
        'packages/babel-plugin-zent/src/*.js',
        'packages/babel-plugin-zent/__tests__/*.js',
      ],
      parserOptions: {
        babelOptions: {
          root: path.resolve(__dirname, 'packages/babel-plugin-zent'),
        },
      },
    },
    {
      files: ['packages/babel-plugin-zent/__tests__/*.spec.js'],
      env: {
        node: true,
      },
      rules: {
        'no-console': 'off',
      },
    },

    // packages/zent
    {
      files: ['packages/zent/__tests__/**/*'],
      // resolving TypeScript source files
      extends: ['plugin:import/typescript'],
      parserOptions: {
        babelOptions: {
          root: path.resolve(__dirname, 'packages/zent'),
        },
      },
      env: {
        browser: true,
        node: true,
      },
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['packages/zent/src/**/*.ts', 'packages/zent/src/**/*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: path.resolve(__dirname, 'packages/zent'),
      },
      env: {
        browser: true,
      },
      plugins: ['ban'],
      rules: {
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
      },
    },

    // site
    {
      files: ['site/src/**/*.ts', 'site/src/**/*.tsx'],
      env: {
        browser: true,
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: path.resolve(__dirname, 'site'),
      },
    },

    // dev scripts
    {
      files: [
        'packages/zent/plugins/*',
        'packages/zent/scripts/**/*',
        'site/webpack/*.js',
        'site/scripts/*.js',
      ],
      env: {
        node: true,
      },
      parserOptions: {
        // no need for babel config file
        requireConfigFile: false,
      },
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['packages/zent/plugins/*'],
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: path.resolve(__dirname, 'packages/zent/plugins'),
      },
    },
    {
      files: ['packages/zent/scripts/cruiser/*.ts'],
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: path.resolve(
          __dirname,
          'packages/zent/scripts/cruiser'
        ),
      },
    },
  ],
};
