/* eslint-disable */

var path = require('path');
var fs = require('fs');
var colors = require('colors');
var trimStart = require('lodash/trimStart');

module.exports = function ResolveZentModulePlugin() {
  var packagesDir = path.resolve(__dirname, '../../src');
  var packages = fs
    .readdirSync(packagesDir)
    .filter(p => fs.statSync(path.join(packagesDir, p)).isDirectory());
  var packageLocations = packages.map(p => path.join(packagesDir, p));

  function resolveToRelativePath(source, filename) {
    var filedir = path.dirname(filename);
    var pkgIndex = packages.findIndex(
      p => p === source || source.startsWith(p + '/')
    );

    if (pkgIndex !== -1) {
      var pkg = packages[pkgIndex];
      var location = packageLocations[pkgIndex];
      var relativeLocation = path.relative(filedir, location);

      if (pkg !== source) {
        relativeLocation = path.join(relativeLocation, trimStart(source, pkg));
      }

      // ensure the output is a relative path
      if (relativeLocation === source) {
        relativeLocation = `./${relativeLocation}`;
      }

      console.log(colors.gray(`Resolved: ${source} => ${relativeLocation}`));

      return relativeLocation;
    }

    return source;
  }

  return {
    manipulateOptions: function(babelOpts) {
      var previousResolver = babelOpts.resolveModuleSource;
      var hasPreviousResolver = typeof previousResolver === 'function';

      babelOpts.resolveModuleSource = function(source, filename) {
        var resolvedFromPrevious = hasPreviousResolver
          ? previousResolver.apply(null, arguments)
          : source;

        return resolveToRelativePath(resolvedFromPrevious, filename);
      };
    }
  };
};
