// Errors:
// import 'zent';
// import * as Zent from 'zent';
// import Zent from 'zent';
// require('zent');
//
//
// Ignore:
// import Button from 'zent/button';
// import Button from 'zent-button';
// require('zent-button')
export default function babelPluginZent(babel) {
  const { types: t } = babel;

  return {
    visitor: {
      CallExpression(path, state) {
        const { node } = path;
        const libName = getLibraryName(state);

        // no require('zent') calls
        if (
          t.isIdentifier(node.callee, { name: 'require' }) &&
          node.arguments &&
          node.arguments.length === 1
        ) {
          const source = node.arguments[0];
          if (t.isStringLiteral(source, { value: libName })) {
            throw path.buildCodeFrameError(
              `require('${libName}') is not allowed, use import { ... } from '${libName}'`
            );
          }
        }
      },

      ImportDeclaration(path, state) {
        const { node } = path;
        const libName = getLibraryName(state);

        if (t.isStringLiteral(node.source, { value: libName })) {
          const { specifiers } = node;
          const specifierCount = specifiers.length;

          // no import 'zent';
          if (specifierCount === 0) {
            throw path.buildCodeFrameError(
              `Side-effect only import is not allowed in ${libName}.'`
            );
          }

          const replacement = specifiers.reduce((r, sp) => {
            // no import * as Zent from 'zent'
            if (t.isImportNamespaceSpecifier(sp)) {
              throw path.buildCodeFrameError(
                `Namespace import is not allowed in ${libName}, pick the components you need.`
              );
            }

            // no import Zent from 'zent'
            if (t.isImportDefaultSpecifier(sp)) {
              throw path.buildCodeFrameError(
                `There is no default export in ${libName}.`
              );
            }

            if (t.isImportSpecifier(sp)) {
              r = r.concat(buildImportReplacement(sp, t, state, path));
            }

            return r;
          }, []);

          const { opts: options } = state;
          if (options.noModuleRewrite) {
            path.insertAfter(replacement);
          } else {
            path.replaceWithMultiple(replacement);
          }
        }
      },
    },
  };
}

function buildImportReplacement(specifier, types, state, originalPath) {
  initModuleMappingAsNecessary(state, originalPath);

  // import {Button as _Button} from 'zent'
  // imported name is Button, but local name is _Button
  const importedName = specifier.imported.name;
  const localName = specifier.local.name;
  const replacement = [];
  const { opts: options, data } = state;

  if (data.MODULE_MAPPING.hasOwnProperty(importedName)) {
    const { noModuleRewrite, automaticStyleImport, useRawStyle } = options;
    const rule = data.MODULE_MAPPING[importedName];

    // js
    if (!noModuleRewrite) {
      replacement.push(
        types.importDeclaration(
          buildImportSpecifier(
            types,
            rule.isDefaultExport,
            importedName,
            localName
          ),
          types.stringLiteral(getJavaScriptPath(rule.js))
        )
      );
    }

    // style
    if (automaticStyleImport) {
      if (!rule.style) {
        throw originalPath.buildCodeFrameError(
          'Please upgrade zent to >= zent@7.0.0'
        );
      }

      rule.style.forEach(path => {
        if (data.STYLE_IMPORT_MAPPING[path] === undefined) {
          replacement.push(
            types.importDeclaration(
              [],
              types.stringLiteral(getStylePath(path, useRawStyle))
            )
          );
          data.STYLE_IMPORT_MAPPING[path] = true;
        }
      });
    }
  } else {
    throw originalPath.buildCodeFrameError(
      `No export named '${importedName}' found in zent.`
    );
  }

  return replacement;
}

function buildImportSpecifier(types, isDefaultExport, importedName, localName) {
  if (isDefaultExport) {
    return [types.importDefaultSpecifier(types.identifier(localName))];
  }

  return [
    types.importSpecifier(
      types.identifier(localName),
      types.identifier(importedName)
    ),
  ];
}

function initModuleMappingAsNecessary(state, path) {
  const { opts: options } = state;

  if (!state.data) {
    state.data = {};
  }

  const data = state.data;
  if (!data.MODULE_MAPPING) {
    // options.moduleMappingFile is for internal use
    const moduleMappingFile =
      options.moduleMappingFile || getModuleMappingFile(getLibraryName(state));

    try {
      // eslint-disable-next-line
      data.MODULE_MAPPING = require(moduleMappingFile);
    } catch (ex) {
      throw path.buildCodeFrameError(ex);
    }

    // STYLE_IMPORT_MAPPING 是 css 和 style 公用的，因为两者只可能使用一种
    if (options.automaticStyleImport) {
      data.STYLE_IMPORT_MAPPING = {};
    }
  }
}

function getJavaScriptPath(relativePath) {
  const parentDir = 'es';
  return `zent/${parentDir}${relativePath}`;
}

function getStylePath(component, useRaw) {
  let suffix, parentDir;
  if (useRaw) {
    suffix = '.scss';
    parentDir = 'assets';
  } else {
    suffix = '.css';
    parentDir = 'css';
  }
  return `zent/${parentDir}/${component}${suffix}`;
}

function getLibraryName(state) {
  const { opts: options } = state;
  return options.libraryName || 'zent';
}

function getModuleMappingFile(libName) {
  return `${libName}/dependency-graph.json`;
}
