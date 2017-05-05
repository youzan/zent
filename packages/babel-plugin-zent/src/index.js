import isEmpty from 'lodash/isEmpty';
import flatten from 'lodash/flatten';
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';
import sortedIndexOf from 'lodash/sortedIndexOf';

const moduleName = 'zent';
let moduleMapping = {};
let requireWhitelist = [];

function replaceRules(name) {
  if (moduleMapping.hasOwnProperty(name)) {
    return moduleMapping[name].js;
  }
  return name;
}

function initModuleMapping(options) {
  const moduleMappingFile =
    options.moduleMappingFile || 'zent/lib/module-mapping.json';

  // eslint-disable-next-line
  moduleMapping = require(moduleMappingFile);
  requireWhitelist = sortBy(
    uniq(
      flatten(
        Object.keys(moduleMapping).map(k => {
          const v = moduleMapping[k];
          return [].concat(v.js, v.css);
        })
      )
    )
  );
}

function isRequireInWhitelist(path) {
  return sortedIndexOf(requireWhitelist, path) !== -1;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// "Error: require('zent') is not allowed, use ES6 import instead." + "\n" +
// "Error: namespace import is not allowed for zent, specify the components you need." + "\n" +
// "Error: zent-button is no longer maintained, use `import { Button } from 'zent'` instead." + "\n" +
// "Error: zent/button is no longer supported, use `import { Button } from 'zent'` instead." + "\n" +
function log(value, path, isRequire) {
  const regexpZent = /^zent$/gi;
  const regexpSubPackage = /zent-/gi;
  const regexpSubDir = /^zent\/(?!lib\/)/gi;

  if (isRequire) {
    if (regexpZent.test(value)) {
      throw path.buildCodeFrameError(
        `\nError: require('zent') is not allowed, use ES6 import instead.\n`
      );
    } else if (!isRequireInWhitelist(value)) {
      throw path.buildCodeFrameError(
        `\nError: require('${value}') incorrect require from zent.\n`
      );
    }
  } else {
    // eslint-disable-next-line
    if (regexpZent.test(value)) {
      throw path.buildCodeFrameError(
        `\nError: namespace import is not allowed for Zent, pick the components you need.\n`
      );
    } else if (regexpSubPackage.test(value)) {
      let idx = value.indexOf('-');
      let name = value.substr(idx + 1);
      let newName = capitalizeFirstLetter(name);
      throw path.buildCodeFrameError(
        `\nError: ${value} is no longer maintained, use " import { ${newName} } from 'zent' " instead.\n`
      );
    } else if (regexpSubDir.test(value)) {
      let idx = value.indexOf('/');
      let name = value.substr(idx + 1);
      let newName = capitalizeFirstLetter(name);
      throw path.buildCodeFrameError(
        `\nError: ${value} is no longer supported, use " import { ${newName} } from 'zent' " instead.\n`
      );
    }
  }
}

module.exports = function(babel) {
  const { types } = babel;
  return {
    visitor: {
      CallExpression(path) {
        const node = path.node;
        const callee = node.callee;
        const arg = node.arguments[0];
        if (callee.type !== 'Identifier' || callee.name !== 'require' || !arg) {
          return;
        }

        const args = node.arguments || [];
        if (
          callee.name === 'require' &&
          args.length === 1 &&
          types.isStringLiteral(args[0])
        ) {
          const reg = /(^zent\/)/gi;
          if (args[0].value === moduleName) {
            log(`${args[0].value}`, path, true);
          } else if (reg.test(args[0].value)) {
            log(`${args[0].value}`, path, true);
          }
        }
      },

      ImportDeclaration(path, state) {
        if (isEmpty(moduleMapping)) {
          initModuleMapping(state.opts);
        }

        const source = path.node.source;
        const fullImports = path.node.specifiers.filter(specifier => {
          return specifier.type !== 'ImportSpecifier';
        });
        const importSpecifiers = path.node.specifiers.filter(specifier => {
          return specifier.type === 'ImportSpecifier';
        });
        if (fullImports.length > 0) {
          if (importSpecifiers.length === 0) {
            const reg = /(^zent$|^zent-|^zent\/)/gi;
            if (reg.test(source.value)) {
              log(source.value, path);
            }
          }
        }

        const newImportDeclarations = [];
        if (importSpecifiers.length > 0 && source.value === moduleName) {
          importSpecifiers.forEach(importSpecifier => {
            const importedName = importSpecifier.imported.name;

            if (moduleMapping.hasOwnProperty(importedName)) {
              const newImportedName = replaceRules(importedName);
              const newImportDeclaration = types.importDeclaration(
                [types.importDefaultSpecifier(types.identifier(importedName))],
                types.stringLiteral(newImportedName)
              );
              newImportDeclarations.push(newImportDeclaration);
            }
          });
        }

        if (newImportDeclarations.length > 0) {
          path.replaceWithMultiple(newImportDeclarations);
        }
      }
    }
  };
};
