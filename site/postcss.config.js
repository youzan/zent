/* eslint-disable global-require */

module.exports = {
  plugins: [
    require('../packages/zent/plugins/postcss-plugin-constants')(),
    require('../packages/zent/plugins/postcss-plugin-version-attribute')(),
    require('autoprefixer')(),
  ],
};
