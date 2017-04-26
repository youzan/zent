#!/usr/bin/env node

/* eslint-disable */

var fs = require('fs');
var path = require('path');

// 为src目录下的所有子目录创建alias
function createMapper() {
  var packagesDir = path.resolve(__dirname, '../src');
  var packages = fs.readdirSync(packagesDir);

  return packages
    .filter(p => fs.statSync(path.join(packagesDir, p)).isDirectory())
    .reduce((alias, p) => {
      var regexp = `^${p}(.*)$`;
      var actual = `<rootDir>/src/${p}$1`;

      alias[regexp] = actual;
      return alias;
    }, {});
}

var jestConfig = require('../jest.config.json');
jestConfig.moduleNameMapper = createMapper();

fs.writeFileSync(require.resolve('../jest.config.json'), JSON.stringify(jestConfig, null, '  '));
