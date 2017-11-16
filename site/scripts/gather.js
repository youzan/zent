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

const LIST_STATICS = require('../src/nav.static');
const SRC = resolve(process.cwd(), '../packages/zent/src');
const NAMES = {
  'zh-CN': 'README_zh-CN.md',
  'en-US': 'README_en-US.md'
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

function gather() {
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

  // 将组件分组排序
  sortComponentGroups(LIST_STATICS);

  writeFileSync(
    resolve(__dirname, '../src/nav.js'),
    `
import DocLoadable from './components/Loadable';

export default ${JSON.stringify(LIST_STATICS, null, 2)};`.replace(
      /\"source\": \"(DocLoadable\(\{.+\}\))\"/g,
      `"source": $1`
    ),
    'utf8'
  );
}

const COMPONENT_GROUP_ORDER = {
  'zh-CN': {
    基础: 1,
    导航: 2,
    数据: 3,
    展示: 4,
    反馈: 5,
    业务组件: 6
  },
  'en-US': {
    Basics: 1,
    Navigation: 2,
    'Data Entry': 3,
    'Data Display': 4,
    Feedback: 5,
    'Domain-specific': 6
  }
};

function sortComponentGroups(config) {
  Object.keys(NAMES).forEach(i18n => {
    const componentGroups = config[i18n][1].groups;
    componentGroups.sort((a, b) => {
      const orderDefinition = COMPONENT_GROUP_ORDER[i18n];
      return orderDefinition[a.groupName] - orderDefinition[b.groupName];
    });
  });
}

gather();
