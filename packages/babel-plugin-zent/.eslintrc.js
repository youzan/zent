/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = {
  root: true,
  extends: ['prettier'],
  parser: 'babel-eslint',
  ignorePatterns: ['node_modules/', 'coverage/', 'lib/'],
  plugins: ['prettier'],
  rules: {
    'no-cond-assign': 'off', // eslint:recommended
    'no-irregular-whitespace': 'error', // eslint:recommended
    'no-unexpected-multiline': 'error', // eslint:recommended
    'guard-for-in': 'error',
    'no-caller': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-invalid-this': 'error',
    'no-multi-str': 'error',
    'no-new-wrappers': 'error',
    'no-throw-literal': 'error', // eslint:recommended
    'no-with': 'error',
    'prefer-promise-reject-errors': 'error',
    'no-unused-vars': ['error', { args: 'none' }], // eslint:recommended
    'array-bracket-newline': 'off', // eslint:recommended
    'array-element-newline': 'off', // eslint:recommended
    camelcase: ['error', { properties: 'never' }],
    'new-cap': 'error',
    'no-array-constructor': 'error',
    'no-new-object': 'error',
    'no-tabs': 'error',
    'one-var': [
      'error',
      {
        var: 'never',
        let: 'never',
        const: 'never',
      },
    ],
    'spaced-comment': ['error', 'always'],
    'constructor-super': 'error', // eslint:recommended
    'no-new-symbol': 'error', // eslint:recommended
    'no-this-before-super': 'error', // eslint:recommended
    'no-var': 'error',
    'prefer-const': ['error', { destructuring: 'all' }],
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prettier/prettier': 'error',
  },
};
