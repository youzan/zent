const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: 'none',
  entry: path.resolve(__dirname, './es/index.sandbox.js'),
  output: {
    filename: isProd ? 'zent.sandbox.min.js' : 'zent.sandbox.js',
    path: path.resolve(__dirname, './sandbox'),
    libraryTarget: 'umd',
    library: 'Zent',
    globalObject: 'this',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-is': 'ReactIs',
    scheduler: 'Scheduler',
  },
  optimization: {
    minimize: isProd,
  },
};

module.exports = config;
