const path = require('path');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: 'none',
  entry: path.resolve(__dirname, './es/index.sandbox.js'),
  output: {
    filename: 'zent.sandbox.js',
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
};

module.exports = config;
