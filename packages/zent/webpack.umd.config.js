const path = require('path');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: 'none',
  entry: path.resolve(__dirname, './es/index.umd.js'),
  output: {
    filename: 'zent.umd.js',
    path: path.resolve(__dirname, './umd'),
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
