/* eslint-disable */
const { resolve, relative } = require('path');

// fs.exists is deprecated, but sync version is still available in Node v8.8.1, so I use it.
const {
  readdirSync,
  statSync,
  existsSync,
  readFileSync,
  writeFileSync
} = require('fs');

const {
  __,
  concat,
  curry,
  filter,
  find,
  forEach,
  map,
  merge,
  omit,
  pipe,
  prop,
  propEq
} = require('ramda');
const fm = require('front-matter');
const colors = require('colors');

const LIST_STATICS = require('../src/nav.static');
const SRC = resolve(process.cwd(), '../packages/zent/src');
const NAMES = {
  'zh-CN': 'README_zh-CN.md',
  'en-US': 'README_en-US.md'
};

const list = {};

const beautyConsole = (color, ...args) => {
  args.forEach(arg => {
    console.log(`
==============================
${colors[color](JSON.stringify(arg, null, 2))}
==============================
`);
  });
};

const isDir = path => {
  try {
    readdirSync(path);
  } catch (e) {
    return false;
  }
  return true;
};

const readFileToString = curry(readFileSync)(__, 'utf8');

module.exports = () => {
  beautyConsole('red', '重新生成前端路由文件');

  Object.keys(NAMES).forEach(i18n => {
    const list = LIST_STATICS[i18n][1].groups;
    const groups = [];
    pipe(
      readdirSync,
      map(pipe(concat('/'), concat(SRC))),
      filter(isDir),
      map(pipe(concat(__, '/'), concat(__, NAMES[i18n]))),
      filter(existsSync),
      map(str =>
        pipe(
          readFileToString,
          fm,
          prop('attributes'),
          merge({
            source: `DocLoadable({ loader: () => import('${relative(
              resolve(process.cwd(), './src'),
              str
            )}') })`
          })
        )(str)
      ),
      forEach(component => {
        if (groups.indexOf(component.group) < 0) {
          groups.push(component.group);
          list.push({
            groupName: component.group,
            list: [omit(['group'], component)]
          });
        } else {
          list
            .find(propEq('groupName', component.group))
            .list.push(omit(['group'], component));
        }
      })
    )(SRC);
  });

  writeFileSync(
    `${resolve(process.cwd(), './src')}/nav.js`,
    `
import DocLoadable from './components/Loadable';

export default ${JSON.stringify(LIST_STATICS, null, 2)};`
      .replace(/"source": "DocLoadable/g, `"source": DocLoadable`)
      .replace(/\.md'\) \}\)"/g, `.md') })`),
    'utf8'
  );

  beautyConsole('green', 'zent/site/src/nav.js, 生成成功');
};
