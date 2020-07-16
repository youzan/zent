const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, '../src/index.ts');
const targetFile = path.join(__dirname, '../src/index.sandbox.ts');

const source = fs.readFileSync(sourceFile, 'utf-8');

const ast = ts.createSourceFile(
  'index.ts',
  source,
  ts.ScriptTarget.Latest,
  true
);

const excludeComponentRegexps = [/\btable\b/];

/**
 * @type {Array<import('typescript').ExportDeclaration>}
 */
const sandboxExportDeclarations = [];

ast.forEachChild(node => {
  if (!ts.isExportDeclaration(node)) {
    return;
  }

  const moduleSpecifier = node.moduleSpecifier;
  if (!ts.isStringLiteral(moduleSpecifier)) {
    return;
  }

  const modulePath = moduleSpecifier.text;

  if (excludeComponentRegexps.some(reg => reg.test(modulePath))) {
    return;
  }

  // console.log('push node', node.getFullText())
  sandboxExportDeclarations.push(node);
});

fs.writeFileSync(
  targetFile,
  `${sandboxExportDeclarations.map(decl => decl.getText()).join('\n')}\n`,
  'utf-8'
);
