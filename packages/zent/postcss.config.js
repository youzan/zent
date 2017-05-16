/* eslint-disable global-require */

module.exports = {
  // required to handle inline comments
  parser: require('postcss-scss'),

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
