const path = require('path');
const fs = require('fs');
const util = require('util');
const glob = util.promisify(require('glob'));
const fm = require('front-matter');
const LIST_STATICS = require('../src/nav.static');

const DST = path.resolve(__dirname, '../src');

const COMPONENT_GROUP_PRIORITY = {
  'zh-CN': {
    基础: 1,
    导航: 2,
    数据: 3,
    展示: 4,
    反馈: 5,
    业务组件: 6,
  },
  'en-US': {
    Basics: 1,
    Navigation: 2,
    'Data Entry': 3,
    'Data Display': 4,
    Feedback: 5,
    'Domain-specific': 6,
  },
};

async function gather() {
  const readmes = await glob('*/README_@(zh-CN|en-US).md', {
    cwd: path.resolve(__dirname, '../../packages/zent/src'),
    absolute: true,
    nosort: true,
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const locale of ['zh-CN', 'en-US']) {
    const filename = `README_${locale}.md`;
    const localeReadmes = readmes.filter(f => f.endsWith(filename));

    // eslint-disable-next-line no-await-in-loop
    const readmeContents = await Promise.all(
      localeReadmes.map(f =>
        fs.promises
          .readFile(f, { encoding: 'utf-8' })
          .then(content => ({ content, path: f }))
      )
    );

    // retrieve front matter from each readme
    const groups = readmeContents.reduce((acc, file) => {
      const {
        // scatter is only used in markdown file compilation
        attributes: { group, scatter, ...meta },
      } = fm(file.content);
      let matchedGroup = acc.find(grp => grp.groupName === group);
      if (!matchedGroup) {
        matchedGroup = {
          groupName: group,
          list: [],
        };
        acc.push(matchedGroup);
      }

      matchedGroup.list.push({ ...meta, source: getLoadable(file.path) });
      return acc;
    }, []);

    // sort groups by priority
    groups.sort((a, b) => {
      const priorities = COMPONENT_GROUP_PRIORITY[locale];
      return priorities[a.groupName] - priorities[b.groupName];
    });
    // sort components inside groups
    groups.forEach(grp => {
      grp.list.sort((a, b) => compareString(a.title, b.title));
    });

    LIST_STATICS[locale][1].groups = groups;
  }

  await fs.promises.writeFile(path.join(DST, 'nav.ts'), generateConfig(), {
    encoding: 'utf-8',
  });
}

function getLoadable(filepath) {
  const relativePath = path.relative(DST, filepath);
  return `DocLoadable({ loader: () => import('${relativePath}') })`;
}

function generateConfig() {
  const src = JSON.stringify(LIST_STATICS, null, 2)
    // trim quotes to convert string to code
    .replace(/"source": "(DocLoadable\({.+}\))"/g, `"source": $1`);

  return `/* eslint-disable */
import DocLoadable from './components/Loadable';
import { INavLocaleData } from './types';

const nav: INavLocaleData = ${src};
export default nav;
`;
}

function compareString(a, b) {
  if (a < b) {
    return -1;
  }
  if (a === b) {
    return 0;
  }
  return 1;
}

gather();
