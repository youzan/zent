/* eslint-disable global-require */

// const PRODUCTION = process.env.NODE_ENV === 'production';

const config = {
  plugins: [
    require('postcss-easy-import')({
      prefix: '_',
      extensions: ['pcss', 'css'],

      // site 目录下也用了这份配置，默认是 cwd，这里强制改成 packages/zent 所在目录
      // 作为副作用，如果 site 下依赖了第三方的样式，这里可能需要配置一下 path
      // https://github.com/postcss/postcss-import#path
      root: __dirname,
      path: ['./node_modules']
    }),
    require('autoprefixer')(),
    require('precss')()
  ]
};

// FIXME: cssnano does not support postcss 6
// if (PRODUCTION) {
//   config.plugins.push(require('cssnano')({ safe: true }));
// }

module.exports = config;
