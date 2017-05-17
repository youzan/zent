const easyImport = require('postcss-easy-import');
const autoPrefixer = require('autoprefixer');
const precss = require('precss');
const cssnano = require('cssnano');

module.exports = [
  easyImport({
    prefix: '_',
    extensions: ['pcss', 'css']
  }),
  autoPrefixer,
  precss,
  cssnano({ safe: true })
];
