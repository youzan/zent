var _ = require('lodash');
var types = require('babel-types');

// 合并属于同一个文件的imports
function concatSpecifiers(group) {
  return group.reduce(function (acc, g) {
    if (g.specifiers.length === 0) {
      acc.none = true;
      return acc;
    }

    return g.specifiers.reduce(function(imports, s) {
      var importedName, localName;

      if (types.isImportDefaultSpecifier(s)) {
        localName = s.local.name;
        if (imports.default.indexOf(localName) === -1) {
          imports.default.push(localName);
        }
      } else if (types.isImportSpecifier(s)) {
        importedName = s.imported.name;
        localName = s.local.name;

        if (!imports.named[importedName]) {
          imports.named[importedName] = [];
        }
        var existingLocalNames = imports.named[importedName];

        if (existingLocalNames.indexOf(localName) === -1) {
          existingLocalNames.push(localName);
        }
      } else if (types.isImportNamespaceSpecifier(s)) {
        localName = s.local.name;
        if (imports.namespace.indexOf(localName) === -1) {
          imports.namespace.push(localName);
        }
      }

      return imports;
    }, acc);
  }, {
    default: [],
    named: {},
    namespace: [],
    none: false
  });
}

function declareVariable(id, init) {
  return types.variableDeclaration(
    'const',
    [
      types.variableDeclarator(types.identifier(id), types.identifier(init))
    ]
  );
}

function createImportDefaultSpecifier(id) {
  return types.importDefaultSpecifier(types.identifier(id));
}

function createImportNamespaceSpecifier(id) {
  return types.importNamespaceSpecifier(types.identifier(id));
}

function createImportSpecifier(local, imported) {
  return types.importSpecifier(
    types.identifier(local),
    types.identifier(imported)
  );
}

function generateCode(source, specifiers) {
  var specifiersAst = [];
  var fixes = [];

  function addSpecifiers(sps, create, imported) {
    var i;
    if (sps.length > 0) {
      specifiersAst.push(create(sps[0], imported));
    }
    for (i = 1; i < sps.length; i++) {
      fixes.push(declareVariable(sps[i], sps[0]));
    }
  }

  addSpecifiers(specifiers.default, createImportDefaultSpecifier);
  addSpecifiers(specifiers.namespace, createImportNamespaceSpecifier);
  _.forEach(specifiers.named, function (locals, imported) {
    addSpecifiers(locals, createImportSpecifier, imported);
  });

  return {
    import: types.importDeclaration(specifiersAst, types.stringLiteral(source)),
    fixes: fixes
  };
}

module.exports = function uniqImports(imports) {
  var sourceGroups = _.groupBy(imports, function (s) {
    return s.source.value;
  });

  return _.reduce(sourceGroups, function(acc, group, source) {
    var specifiers = concatSpecifiers(group);
    var code = generateCode(source, specifiers);

    acc.imports.push(code.import);
    acc.fixes = acc.fixes.concat(code.fixes);
    return acc;
  }, { imports: [], fixes: [] });
}
