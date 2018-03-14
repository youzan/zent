/* eslint-disable global-require */

const PRODUCTION = process.env.NODE_ENV === 'production';

const config = {
  plugins: [
    require('postcss-easy-import')({
      prefix: '_',
      extensions: ['pcss', 'css'],
    }),
    require('autoprefixer')(),
    require('precss')(),
  ],
};

if (PRODUCTION) {
  config.plugins.push(require('cssnano')({ preset: 'default' }));
} else {
  // reduces calc(10px * 2) to 20px
  config.plugins.push(require('postcss-calc')());
}

module.exports = config;
