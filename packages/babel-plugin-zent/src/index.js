const moduleName = 'zent';
let moduleMapping = {};

function replaceRules(name) {
  if (moduleMapping.hasOwnProperty(name)) {
    return moduleMapping[name].js;
  }
  return name;
}

function isEmpty(obj) {
  if (Object.keys(obj).length === 0) {
    return true;
  }
  return false;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// import below is not allowed
// "Error: require('zent') is not allowed, use ES6 import instead." + "\n" +
// "Error: namespace import is not allowed for zent, specify the components you need." + "\n" +
// "Error: zent-button is no longer maintained, use `import { Button } from 'zent'` instead." + "\n" +
// "Error: zent/button is no longer supported, use `import { Button } from 'zent'` instead." + "\n" +
function log(value, path) {
  const reg1 = /^zent$/gi;
  const reg2 = /zent-/gi;
  const reg3 = /^zent\/(?!lib\/)/gi;
  const reg4 = /^requirezent$/gi;
  const reg5 = /^requirezent\/(?!lib\/)/gi;

  // Error
  if (reg1.test(value)) {
    throw path.buildCodeFrameError(
      `\nError: namespace import is not allowed for zent, specify the components you need.\n`
    );
  } else if (reg2.test(value)) {
    let idx = value.indexOf('-');
    let name = value.substr(idx + 1);
    let newName = capitalizeFirstLetter(name);
    throw path.buildCodeFrameError(
      `\nError: ${value} is no longer maintained, use " import { ${newName} } from 'zent' " instead.\n`
    );
  } else if (reg3.test(value)) {
    let idx = value.indexOf('/');
    let name = value.substr(idx + 1);
    let newName = capitalizeFirstLetter(name);
    throw path.buildCodeFrameError(
      `\nError: ${value} is no longer supported, use " import { ${newName} } from 'zent' " instead.\n`
    );
  } else if (reg4.test(value)) {
    throw path.buildCodeFrameError(
      `\nError: require('zent') is not allowed, use ES6 import instead.\n`
    );
  } else if (reg5.test(value)) {
    let idx = value.indexOf('require');
    let name = value.substr(idx + 7);
    throw path.buildCodeFrameError(
      `\nError: require('${name}') is not allowed, use ES6 import instead.\n`
    );
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
            log(`require${args[0].value}`, path);
          } else if (reg.test(args[0].value)) {
            log(`require${args[0].value}`, path);
          }
        }
      },
      ImportDeclaration(path, state) {
        const opts = state.opts;
        if (isEmpty(moduleMapping) && opts.moduleMappingFile.length > 0) {
          // eslint-disable-next-line import/no-dynamic-require
          moduleMapping = require(state.opts.moduleMappingFile); // eslint-disable-line global-require
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
