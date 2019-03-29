#!/usr/bin/env node

/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

function main() {
  const args = process.argv;
  const componentName = args[2];

  if (componentName === undefined) {
    console.error('Component name is required');
    process.exit(1);
  }

  addFiles(componentName);
  exec(path.resolve(__dirname, './cruiser.sh'));
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

function sortByModulePath(lines) {
  lines.sort((a, b) => {
    const modPathRegexp = /'.+'/;
    const modA = modPathRegexp.exec(a)[0];
    const modB = modPathRegexp.exec(b)[0];

    return modA.localeCompare(modB);
  });

  return lines;
}

// ts
function insertTs(name) {
  const tsIndexPath = path.resolve(__dirname, '../src/index.ts');
  const tsIndexFile = fs.readFileSync(tsIndexPath, { encoding: 'utf-8' });

  const moduleExports = tsIndexFile.trim().split('\n');
  moduleExports.push(`export * from './${name}';`);
  sortByModulePath(moduleExports);

  fs.writeFileSync(tsIndexPath, `${moduleExports.join('\n')}\n`);
}

// style
function insertCss(name) {
  const cssIndexPath = path.resolve(__dirname, '../assets/index.scss');
  const cssIndexFile = fs.readFileSync(cssIndexPath, { encoding: 'utf-8' });
  const cssImportStr = `@import './${name}';`;

  const cssIndexFileArr = cssIndexFile.trim().split('\n');
  cssIndexFileArr.push(cssImportStr);

  // Make sure base comes first
  const base = cssIndexFileArr.splice(0, 1);
  sortByModulePath(cssIndexFileArr);
  cssIndexFileArr.unshift(base);

  fs.writeFileSync(cssIndexPath, `${cssIndexFileArr.join('\n')}\n`);
}

// js/css 加到index文件导出
function addFilesToIndex(name) {
  insertCss(name);
  insertTs(name);
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
    `${componentDir}/index.ts`,
    `import ${upperComponentName} from './${upperComponentName}';\n\nexport * from './${upperComponentName}';\n`
  );

  fs.writeFileSync(
    `${componentDir}/README_en-US.md`,
    `---
title: ${upperComponentName}
path: component/${name}
group: FIXME group name here
---

## ${upperComponentName}

Describe ${upperComponentName}.

### API

| Property     |  Description  | Type     |  Required  |   Default  | Alternative   |
| ------------ | -------------- | -------- | ---------- | ---------- | ------------- |
| className    | Custom class name  | string     |  No        |  |  |`
  );

  fs.writeFileSync(
    `${componentDir}/README_zh-CN.md`,
    `---
title: ${upperComponentName}
subtitle: FIXME 中文名
path: component/${name}
group: FIXME 中文分组名
---

## ${upperComponentName}

简单描述 ${upperComponentName} 组件。

### API

| 参数        |   说明       | 类型     | 是否必须    | 默认值      | 备选值     |
| ------------| ----------- | -------- | ---------- | ---------- | ---------- |
| className   | 额外类名     | string   |  否         |           |            |
`
  );
  fs.writeFileSync(`${componentDir}/${upperComponentName}.tsx`, '');
  fs.writeFileSync(`${assetsDir}/${name}.scss`, '');

  addFilesToIndex(name);
}
