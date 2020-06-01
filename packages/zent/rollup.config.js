import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

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
      'react-is': 'ReactIs',
      scheduler: 'Scheduler',
    },
  },
  external: ['react', 'react-dom', 'react-is', 'scheduler'],

  plugins: [
    resolve(),
    commonjs({
      include: [/node_modules/, /\/input\/TextArea/],
      extensions: ['.js', '.ts', '.tsx'],
      transformMixedEsModules: true,
    }),
  ],
};

export default config;
