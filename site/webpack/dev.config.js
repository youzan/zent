var baseConfig = require('./base.config');

var DEV_SERVER = 'http://127.0.0.1:9001';

var devConfig = Object.assign({}, baseConfig, {
  devtool: 'source-map',
  watch: true,
  devServer: {
    port: 9001
  }
});

devConfig.entry.unshift(`webpack-dev-server/client?${DEV_SERVER}`);

module.exports = devConfig;
