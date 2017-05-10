const MODULE_NAME = 'zent';

// Errors:
// import 'zent';
// import * as Zent from 'zent';
// import Zent from 'zent';
// require('zent');
//
//
// Ingore:
// import Button from 'zent/button';
// import Button from 'zent-button';
// require('zent-button')
module.exports = function(babel) {
  const { types: t } = babel;

  return {
    visitor: {
      CallExpression(path) {
        const { node } = path;

        // no require('zent') calls
        if (
          t.isIdentifier(node.callee, { name: 'require' }) &&
          node.arguments &&
          node.arguments.length === 1
        ) {
          const source = node.arguments[0];
          if (t.isStringLiteral(source, { value: MODULE_NAME })) {
            throw path.buildCodeFrameError(
              `require('${MODULE_NAME}') is not allowed, use import { ... } from '${MODULE_NAME}'`
            );
          }
        }
      },

      ImportDeclaration(path, state) {
        const { node } = path;

        if (t.isStringLiteral(node.source, { value: MODULE_NAME })) {
          const { specifiers } = node;
          const specifierCount = specifiers.length;

          // no import 'zent';
          if (specifierCount === 0) {
            throw path.buildCodeFrameError(
              `Side-effect only import is allowed in ${MODULE_NAME}.'`
            );
          }

          const replacement = specifiers.reduce((r, sp) => {
            // no import * as Zent from 'zent'
            if (t.isImportNamespaceSpecifier(sp)) {
              throw path.buildCodeFrameError(
                `Namespace import is not allowd in ${MODULE_NAME}, pick the components you need.`
              );
            }

            // no import Zent from 'zent'
            if (t.isImportDefaultSpecifier(sp)) {
              throw path.buildCodeFrameError(
                `There is no default export in ${MODULE_NAME}.`
              );
            }

            if (t.isImportSpecifier(sp)) {
              return r.concat(buildImportReplacement(sp, t, state));
            }

            throw path.buildCodeFrameError('Unexpected import type');
          }, []);

          path.replaceWithMultiple(replacement);
        }
      }
    }
  };
};

function buildImportReplacement(specifier, types, state) {
  initModuleMapppingAsNecessary(state);

  // import {Button as _Button} from 'zent'
  // imported name is Button, but local name is _Button
  const importedName = specifier.imported.name;
  const localName = specifier.local.name;
  const replacement = [];
  const { opts: options, data } = state;

  if (data.MODULE_MAPPING.hasOwnProperty(importedName)) {
    const rule = data.MODULE_MAPPING[importedName];

    // js
    replacement.push(
      types.importDeclaration(
        [types.importDefaultSpecifier(types.identifier(localName))],
        types.stringLiteral(rule.js)
      )
    );

    // css
    if (options.automaticStyleImport) {
      rule.css.forEach(path => {
        if (data.CSS_IMPORT_MAPPING[path] === 0) {
          replacement.push(
            types.importDeclaration([], types.stringLiteral(path))
          );
          data.CSS_IMPORT_MAPPING[path] += 1;
        }
      });
    }
  }

  return replacement;
}

function initModuleMapppingAsNecessary(state) {
  const { opts: options } = state;

  if (!state.data) {
    state.data = {};
  }

  const data = state.data;
  if (!data.MODULE_MAPPING) {
    const moduleMappingFile =
      options.moduleMappingFile || 'zent/lib/module-mapping.json';

    // eslint-disable-next-line
    data.MODULE_MAPPING = require(moduleMappingFile);

    if (options.automaticStyleImport) {
      data.CSS_IMPORT_MAPPING = Object.keys(
        data.MODULE_MAPPING
      ).reduce((mapping, key) => {
        data.MODULE_MAPPING[key].css.forEach(path => {
          mapping[path] = 0;
        });
        return mapping;
      }, {});
    }
  }
}
