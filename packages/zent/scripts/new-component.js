#!/usr/bin/env node

/* eslint-disable */

const fs = require('fs');
const path = require('path');

function main() {
  const args = process.argv;
  const componentName = args[2];

  console.log(componentName);

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

// 进入src里面创建文件夹以及文件
function addFiles(name) {
  const packagesDir = path.resolve(__dirname, '../src');
  const assetsDir = path.resolve(__dirname, '../assets');
  const componentDir = `${packagesDir}/${name}`;
  const upperComponentName = getComponentName(name);

  console.log(componentDir);
  console.log(upperComponentName);

  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir);
  }

  fs.writeFileSync(
    `${componentDir}/index.js`,
    `export default from './${upperComponentName}.js';`
  );
  fs.writeFileSync(`${componentDir}/README.md`, `## ${upperComponentName}`);
  fs.writeFileSync(`${componentDir}/${upperComponentName}.js`, '');
  fs.writeFileSync(`${assetsDir}/${name}.pcss`, '');
}
