/* eslint-disable global-require */

module.exports = {
  plugins: [
    require('postcss-easy-import')({
      prefix: '_',
      extensions: ['pcss', 'css']
    }),
    require('autoprefixer'),
    require('precss'),
    require('cssnano')({ safe: true })
  ]
};
