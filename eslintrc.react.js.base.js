module.exports = {
  extends: ['airbnb', 'prettier'],
  parser: '@babel/eslint-parser',
  plugins: ['lean-imports', 'prettier', 'react-hooks'],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'one-var': 0,
    'no-var': 2,
    'max-len': 0,
    'no-tabs': 0,
    'comma-dangle': 0,
    'func-names': 0,
    'prefer-const': 0,
    'arrow-body-style': 0,
    'operator-assignment': 0,
    'prefer-destructuring': 0,
    'prefer-promise-reject-errors': 0,
    'react/prefer-stateless-function': 0,
    'react/sort-comp': 0,
    'react/no-multi-comp': 0,
    'react/prop-types': 0,
    'react/prefer-es6-class': 0,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-no-bind': 0,
    'react/require-default-props': 0,
    'react/jsx-filename-extension': 0,
    'react/no-unused-prop-types': 0,
    'react/no-find-dom-node': 0,
    'react/no-array-index-key': 0,
    'react/forbid-prop-types': 0,
    'react/no-render-return-value': 0,
    'react/no-string-refs': 0,
    'react/destructuring-assignment': 0,
    'react/button-has-type': 0,
    'react/no-access-state-in-setstate': 0,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/no-deprecated': 'off',
    'no-param-reassign': 0,
    'no-return-assign': 0,
    'no-underscore-dangle': [
      1,
      {
        allowAfterThis: true,
      },
    ],
    'consistent-return': 0,
    'no-unused-expressions': 0,
    'prefer-template': 1,
    'no-nested-ternary': 'error',
    'no-plusplus': 0,
    'no-multi-assign': 0,
    'no-useless-escape': 0,
    'no-use-before-define': [
      2,
      { functions: false, classes: false, variables: true },
    ],
    'no-prototype-builtins': 0,
    camelcase: [
      1,
      {
        properties: 'never',
      },
    ],
    'consistent-this': 0,
    'class-methods-use-this': 0,
    'max-classes-per-file': 'off',
    'prefer-object-spread': 'off',
    'lean-imports/import': [2, ['lodash']],
    eqeqeq: 1,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/no-noninteractive-tabindex': 0,
    'jsx-a11y/interactive-supports-focus': 0,
    'jsx-a11y/mouse-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
};
