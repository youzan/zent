/* eslint-disable global-require */

const PRODUCTION = process.env.NODE_ENV === 'production';

const config = {
  plugins: [
    require('postcss-easy-import')({
      prefix: '_',
      extensions: ['pcss', 'css']
    }),
    require('autoprefixer'),
    require('precss')
  ]
};

if (PRODUCTION) {
  config.plugins.push(require('cssnano')({ safe: true }));
}

module.exports = config;
