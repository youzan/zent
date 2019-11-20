/* eslint-disable global-require */

module.exports = {
  plugins: [
    require('autoprefixer')(),
    require('../packages/zent/plugins/postcss-plugin-constants')(),
    require('../packages/zent/plugins/postcss-plugin-version-attribute')(),
  ],
};
