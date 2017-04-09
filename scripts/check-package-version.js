/* eslint-disable */

/**
 * Usage: node ./scripts/check-package-version.js [--fix]
 */

var fs = require('fs');
var path = require('path');

var packageDirctory = path.join(__dirname, '../packages');

var hasError = false;

var autofix = process.argv[2] === '--fix';

function logError(str) {
  console.error('\x1b[31m%s\x1b[0m', str);
  hasError = true;
}

function checkVersion(json, dependencyName, latestVersions, fix) {
  var dependencies = json[dependencyName] || {};
  var name = json.name;
  var fileHasError = false;

  Object.keys(dependencies)
    .filter(function (d) {
      return /^zent-.+$/.test(d);
    })
    .forEach(function(d) {
      var ver = dependencies[d];
      var latestVer = latestVersions[d];

      if (!/^[\d\.]+$/.test(ver)) {
        logError(name + ' ' + dependencyName + ' should be locked: ' + d + ': ' + ver + '. The latest version is ' + latestVer);

        if (fix) {
          dependencies[d] = latestVer;
        }
        fileHasError = true;
      } else if (ver !== latestVer) {
        logError(name + ' ' + dependencyName + ' not up to date: ' + d + ' is ' + ver + ' but the latest version is ' + latestVer);

        if (fix) {
          dependencies[d] = latestVer;
        }
        fileHasError = true;
      }
    });

  return fileHasError;
}

fs.readdir(packageDirctory, function(err, files) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }

  var packageJSONPaths = {};
  var packageJSONList = files.map(function (f) {
    var filePath = path.join(packageDirctory, f, 'package.json');
    var json = require(filePath);
    packageJSONPaths[json.name] = filePath;
    return json;
  });

  var packageVersionMap = packageJSONList.reduce(function (m, json) {
    m[json.name] = json.version;
    return m;
  }, {});

  Object.keys(packageVersionMap).forEach(function (p) {
    console.log(p + ': ' + packageVersionMap[p]);
  });

  console.log();

  packageJSONList.forEach(function (json) {
    var depHasError = checkVersion(json, 'dependencies', packageVersionMap, autofix);
    var devDepHasError = checkVersion(json, 'devDependencies', packageVersionMap, autofix);

    if ((depHasError || devDepHasError) && autofix) {
      fs.writeFileSync(packageJSONPaths[json.name], JSON.stringify(json, null, '  ') + '\n', { encoding: 'utf-8' });
    }
  });

  process.exit(hasError ? -1 : 0);
});
