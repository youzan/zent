#!/usr/bin/env node

/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function main() {
  const args = process.argv;
  const componentName = args[2];

  if (componentName === undefined) {
    console.error('Component name is required');
    process.exit(1);
  }

  addFiles(componentName);
}

main();

function firstAlphabetUpper(str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}

function getComponentName(name) {
  let componentName;
  if (name.includes('-')) {
    componentName = name
      .split('-')
      .map(item => {
        return firstAlphabetUpper(item);
      })
      .join('');
  } else {
    componentName = firstAlphabetUpper(name);
  }
  return componentName;
}

function compareFunction(a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase());
}

function pushAndSort(arr, item) {
  arr.push(item);
  arr.sort(compareFunction);
  return arr;
}

// 插入js
function insertJs(name) {
  const upperComponentName = getComponentName(name);

  const jsIndexPath = path.resolve(__dirname, '../src/index.js');
  const jsIndexFile = fs.readFileSync(jsIndexPath, { encoding: 'utf-8' });
  const jsImportStr = `import ${upperComponentName} from '${name}'`;

  // 分割成上下两部分
  const jsIndexFileArr = jsIndexFile.split(';\n\n');

  // 分别拆分
  const jsIndexFilePart1Arr = jsIndexFileArr[0].split(';\n');
  const jsIndexFilePart2Arr = jsIndexFileArr[1]
    .substring(9, jsIndexFileArr[1].length - 4)
    .split(',\n');

  const jsIndexFilePart1Str = pushAndSort(
    jsIndexFilePart1Arr,
    jsImportStr
  ).join(';\n');
  const jsIndexFilePart2Str = pushAndSort(
    jsIndexFilePart2Arr,
    `  ${upperComponentName}`
  ).join(',\n');

  const finalStr = `${jsIndexFilePart1Str};\n\nexport {\n${jsIndexFilePart2Str}\n};\n`;
  fs.writeFileSync(jsIndexPath, finalStr);
}

// 插入css
function insertCss(name) {
  const cssIndexPath = path.resolve(__dirname, '../assets/index.pcss');
  const cssIndexFile = fs.readFileSync(cssIndexPath, { encoding: 'utf-8' });
  const cssImportStr = `@import './${name}.pcss'`;

  const cssIndexFileArr = cssIndexFile.split(';\n');
  // 去掉最后一个空串
  if (cssIndexFileArr[cssIndexFileArr.length - 1] === '') {
    cssIndexFileArr.pop();
  }

  const finalStr = `${pushAndSort(cssIndexFileArr, cssImportStr).join(
    ';\n'
  )};\n`;
  fs.writeFileSync(cssIndexPath, finalStr);
}

// js/css 加到index文件导出
function addFilesToIndex(name) {
  insertCss(name);
  insertJs(name);
}

// 创建组件文件夹以及js/css文件
function addFiles(name) {
  const packagesDir = path.resolve(__dirname, '../src');
  const assetsDir = path.resolve(__dirname, '../assets');
  const componentDir = `${packagesDir}/${name}`;
  const upperComponentName = getComponentName(name);

  console.log(`Adding new component：${upperComponentName}`);

  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir);
  } else {
    console.log(
      `${upperComponentName} already exists, please choose another name.`
    );
    process.exit(2);
  }

  fs.writeFileSync(
    `${componentDir}/index.js`,
    `export default from './${upperComponentName}.js';`
  );
  fs.writeFileSync(`${componentDir}/README.md`, `## ${upperComponentName}`);
  fs.writeFileSync(`${componentDir}/${upperComponentName}.js`, '');
  fs.writeFileSync(`${assetsDir}/${name}.pcss`, '');

  addFilesToIndex(name);
}
