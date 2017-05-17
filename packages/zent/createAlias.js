const fs = require('fs');
const path = require('path');

// 为src目录下的所有子目录创建alias
module.exports = function createAlias(packagesDir) {
  const packages = fs.readdirSync(packagesDir);

  return packages
    .filter(p => fs.statSync(path.join(packagesDir, p)).isDirectory())
    .reduce((alias, p) => {
      alias[p] = path.join(packagesDir, p);
      return alias;
    }, {});
};
