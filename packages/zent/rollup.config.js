import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import ReactIs from 'react-is';
import scheduler from 'scheduler';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: './es/index.js',
  output: {
    file: 'umd/zent.umd.js',
    format: 'umd',
    name: 'zent',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  external: ['react', 'react-dom'],

  plugins: [
    resolve(),
    commonjs({
      include: /node_modules/,
      namedExports: {
        'react-is': Object.keys(ReactIs),
        scheduler: Object.keys(scheduler),
      },
    }),
  ],
};

export default config;
