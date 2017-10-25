#!/usr/bin/env node

/* eslint-disable */

const fs = require('fs');
const path = require('path');

function main() {
  const args = process.argv;
  const componentName = args[2];

  if (componentName === undefined) {
    console.log('请输入需要新建的组件名！');
    return false;
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

// 插入js
function insertJs(name) {
  const upperComponentName = getComponentName(name);
  const upperComponentNameFirstAlphabet = upperComponentName[0];

  const jsIndexPath = path.resolve(__dirname, '../src/index.js');
  const jsIndexFile = fs.readFileSync(jsIndexPath, { encoding: 'utf-8' });
  const jsImportStr = `import ${upperComponentName} from '${name}'`;

  // 分割成上下两部分
  const jsIndexFileArr = jsIndexFile.split(/\r?\n\r?\n/);
  const jsIndexFilePart1Arr = jsIndexFileArr[0].split(';\n');
  const jsIndexFilePart2Arr = jsIndexFileArr[1].substring(
    9,
    jsIndexFileArr[1].length - 4
  );

  console.log(jsIndexFilePart2Arr);

  const alphabetArr = jsIndexFilePart1Arr.map(item => {
    return item.substr(7, 1).toUpperCase();
  });

  alphabetArr.push(upperComponentNameFirstAlphabet);
  alphabetArr.sort();

  const position = alphabetArr.indexOf(upperComponentNameFirstAlphabet);
  jsIndexFilePart1Arr.splice(position, 0, jsImportStr);
  // jsIndexFileArrPart2.splice(position, 0, cssImportStr);

  fs.writeFileSync(jsIndexPath, jsIndexFilePart1Arr.join(';\n'));
}

// 插入css
function insertCss(name) {
  const cssIndexPath = path.resolve(__dirname, '../assets/index.pcss');
  const cssIndexFile = fs.readFileSync(cssIndexPath, { encoding: 'utf-8' });
  const cssImportStr = `@import './${name}.pcss'`;

  const cssIndexFileArr = cssIndexFile.split(';\n');
  const alphabetArr = cssIndexFileArr.map(item => {
    return item.substr(11, 1);
  });

  // 去掉最后一个空串
  if (alphabetArr[alphabetArr.length - 1] === '') {
    alphabetArr.pop();
  }

  alphabetArr.push(name[0]);
  alphabetArr.sort();

  const position = alphabetArr.indexOf(name[0]);
  cssIndexFileArr.splice(position, 0, cssImportStr);

  fs.writeFileSync(cssIndexPath, cssIndexFileArr.join(';\n'));
}

// js/css 加到index文件导出
function addFilesToIndex(name) {
  // insertCss(name);
  insertJs(name);
}

// 创建组件文件夹以及js/css文件
function addFiles(name) {
  const packagesDir = path.resolve(__dirname, '../src');
  const assetsDir = path.resolve(__dirname, '../assets');
  const componentDir = `${packagesDir}/${name}`;
  const upperComponentName = getComponentName(name);

  console.log(`开始新建组件：${upperComponentName}.`);

  // if (!fs.existsSync(componentDir)) {
  //   fs.mkdirSync(componentDir);
  // }

  // fs.writeFileSync(
  //   `${componentDir}/index.js`,
  //   `export default from './${upperComponentName}.js';`
  // );
  // fs.writeFileSync(`${componentDir}/README.md`, `## ${upperComponentName}`);
  // fs.writeFileSync(`${componentDir}/${upperComponentName}.js`, '');
  // fs.writeFileSync(`${assetsDir}/${name}.pcss`, '');

  addFilesToIndex(name);
}
