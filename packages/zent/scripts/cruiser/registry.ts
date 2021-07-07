import * as fs from 'fs';
import * as path from 'path';
import chalk = require('chalk');
import * as ts from 'typescript';
import { resolve } from './resolver';

export const DEFAULT_EXPORT = 'default';

export type ValueExport = string;
export interface IRegistry {
  [key: string]: { exports: Set<ValueExport>; dependencies: Set<string> };
}

interface ISourceFile extends ts.SourceFile {
  imports?: ts.StringLiteral[];
}

const hasOwn = Object.prototype.hasOwnProperty;

/**
 * Parse value exports in a file.
 * Only function, class, variable and re-exports are counted.
 */
function parseValueExports(
  filename: string,
  registry: IRegistry
): Set<ValueExport> {
  if (!path.isAbsolute(filename)) {
    filename = path.resolve(filename);
  }
  const cwd = path.dirname(filename);

  // Query from registry
  const cached = registry[filename];
  if (cached) {
    return cached.exports;
  }

  // console.log(filename);

  // const source = fs.readFileSync(filename, { encoding: 'utf-8' });
  // const sourceFile = ts.createSourceFile(
  //   filename,
  //   source,
  //   ts.ScriptTarget.Latest,
  //   true,
  //   getScriptKind(filename)
  // );
  const sourceFile = createSourceFile(filename);

  const exportedLocalVariables = getModuleLocalExportedValueNames(sourceFile!);

  const localValueVariables = getModuleValueNames(
    sourceFile!,
    cwd,
    registry,
    exportedLocalVariables
  );

  // log([...localValueVariables]);

  const exportedVariables = getModuleValueExportNames(
    sourceFile!,
    cwd,
    registry,
    localValueVariables
  );

  // Save to registry
  const moduleDependencies = getModuleRelativeImports(sourceFile?.imports, cwd);
  registry[filename] = {
    exports: exportedVariables,
    dependencies: moduleDependencies,
  };

  return exportedVariables;
}

/**
 * Get all exported local value names
 * 1. export { a, b }
 * 2. export default c
 *
 * Excludes export ... from './x'
 */
function getModuleLocalExportedValueNames(
  sourceFile: ISourceFile
): Set<ValueExport> {
  const exportedVariables = new Set<ValueExport>();
  sourceFile.statements.forEach(stmt => {
    if (ts.isExportDeclaration(stmt)) {
      const { exportClause, moduleSpecifier } = stmt;

      // Ignore exports from other modules
      if (moduleSpecifier) {
        return;
      }

      if (exportClause && ts.isNamedExports(exportClause)) {
        // export { A, B }
        const names = getBindingNames(exportClause);
        for (const { propertyName } of names) {
          exportedVariables.add(propertyName);
        }
      }
    } else if (ts.isExportAssignment(stmt)) {
      // Ignore export =
      if (!stmt.isExportEquals) {
        // export default c
        const { expression } = stmt;
        if (ts.isIdentifier(expression)) {
          exportedVariables.add(expression.text);
        }
      }
    }
  });

  return exportedVariables;
}

/**
 * Get all value names in module
 * 1. local variables,
 * 2. functions,
 * 3. classes,
 * 4. imports of 1,2,3
 */
function getModuleValueNames(
  sourceFile: ISourceFile,
  cwd: string,
  registry: IRegistry,
  exportedLocalVariables: Set<ValueExport>
): Set<ValueExport> {
  const localValueVariables = new Set<ValueExport>();
  sourceFile.statements.forEach(stmt => {
    if (ts.isVariableStatement(stmt)) {
      // const a = 1;
      const declarations = stmt.declarationList.declarations;
      getVariableNames(declarations, localValueVariables);
    } else if (ts.isFunctionDeclaration(stmt) || ts.isClassDeclaration(stmt)) {
      // function fn() {}
      // class Klass {}
      const { name } = stmt;

      // functions can be anonymous
      if (name && ts.isIdentifier(name)) {
        localValueVariables.add(name.text);
      }
    } else if (
      ts.isImportDeclaration(stmt) &&
      isRelativeImportExportDeclaration(stmt)
    ) {
      const { importClause } = stmt;
      let shouldParseModule = false;

      const names = importClause?.namedBindings
        ? getBindingNames(importClause.namedBindings)
        : new Set([
            { name: importClause?.name?.text, propertyName: DEFAULT_EXPORT },
          ]);
      for (const { name } of names) {
        if (exportedLocalVariables.has(name!)) {
          shouldParseModule = true;
        }
      }

      if (shouldParseModule) {
        const dependentModulePath = convertRelativeModulePathToAbsolute(
          getModuleName(stmt),
          cwd
        );
        const dependentModuleExports = parseValueExports(
          dependentModulePath,
          registry
        );

        if (importClause?.namedBindings) {
          // import { A } from './x'
          // import { C as CC } from './c'
          for (const { name, propertyName } of names) {
            if (dependentModuleExports.has(propertyName)) {
              localValueVariables.add(name!);
            } else {
              console.warn(
                chalk.yellow(
                  `Named import '${propertyName}' not found in module ${dependentModulePath}`
                )
              );
            }
          }
        } else {
          // import B from './B'
          if (
            isModuleHasDefaultExport(dependentModuleExports) &&
            importClause?.name?.text
          ) {
            localValueVariables.add(importClause?.name?.text);
          }
        }
      }
    }
  });

  return localValueVariables;
}

/**
 * Get all exported values in module
 * 1. variables
 * 2. functions
 * 3. classes
 * 4. re-exports of 1,2,3 from other modules
 */
function getModuleValueExportNames(
  sourceFile: ISourceFile,
  cwd: string,
  registry: IRegistry,
  localValueVariables: Set<ValueExport>
): Set<ValueExport> {
  const exportedVariables = new Set<ValueExport>();
  sourceFile.statements.forEach(stmt => {
    if (ts.isVariableStatement(stmt)) {
      // export const A = 1
      if (isNodeExported(stmt as unknown as ts.Declaration)) {
        const vars = getVariableNames(stmt.declarationList.declarations);
        for (const v of vars) {
          if (localValueVariables.has(v)) {
            addToExports(exportedVariables, v);
          }
        }
      }
    } else if (ts.isFunctionDeclaration(stmt) || ts.isClassDeclaration(stmt)) {
      if (isExportDefaultNode(stmt)) {
        // export default function fn() {}
        // export default class Klass {}
        addToExports(exportedVariables, DEFAULT_EXPORT);
      } else {
        // export function fn() {}
        // export class Klass {}
        if (isNodeExported(stmt)) {
          const exportedVar = (ts.getNameOfDeclaration(stmt) as ts.Identifier)
            .text;
          if (localValueVariables.has(exportedVar)) {
            addToExports(exportedVariables, exportedVar);
          }
        }
      }
    } else if (ts.isExportDeclaration(stmt)) {
      const { exportClause, moduleSpecifier } = stmt;

      // Ignore export { A, B } from 'foobar'
      if (moduleSpecifier && !isRelativeImportExportDeclaration(stmt)) {
        return;
      }

      let dependentModuleExports = new Set<string>();
      let dependentModulePath;
      // Parse dependency if we are re-exporting from relative module
      if (moduleSpecifier && isRelativeImportExportDeclaration(stmt)) {
        const importedModulePath = getModuleName(stmt);
        dependentModulePath = convertRelativeModulePathToAbsolute(
          importedModulePath,
          cwd
        );
        dependentModuleExports = parseValueExports(
          dependentModulePath,
          registry
        );
      }

      if (exportClause && ts.isNamedExports(exportClause)) {
        // export { A, B } from './x'
        // export { A, B }
        // FIXME: export { default as Foobar }  from './x'
        const variableWhitelist = stmt.moduleSpecifier
          ? dependentModuleExports
          : localValueVariables;
        const names = getBindingNames(exportClause);

        for (const { name, propertyName } of names) {
          if (variableWhitelist?.has(propertyName)) {
            addToExports(exportedVariables, name);
          } else if (stmt.moduleSpecifier) {
            console.warn(
              chalk.yellow(
                `Named export '${propertyName}' not found in module ${dependentModulePath}\nYou can safely ignore this warning if it is an exported type`
              )
            );
          }
        }
      } else if (!exportClause) {
        // export * from './a'
        for (const i of dependentModuleExports) {
          // Don't re-export default export
          if (i !== DEFAULT_EXPORT) {
            addToExports(exportedVariables, i);
          }
        }
      }
    } else if (ts.isExportAssignment(stmt)) {
      // Ignore export =
      if (!stmt.isExportEquals) {
        // export default
        addToExports(exportedVariables, DEFAULT_EXPORT);
      }
    }
  });

  return exportedVariables;
}

/**
 * Get all declared variable names
 */
function getVariableNames(
  declarations: ts.NodeArray<ts.VariableDeclaration>,
  variables = new Set<ValueExport>()
): Set<ValueExport> {
  declarations.forEach(decl => {
    if (ts.isVariableDeclaration(decl)) {
      const name = ts.getNameOfDeclaration(decl);
      if (name && ts.isIdentifier(name)) {
        variables.add(name.text);
      } else if (
        name &&
        (ts.isArrayBindingPattern(name) || ts.isObjectBindingPattern(name))
      ) {
        name.elements.forEach(elem => {
          const elementName = ts.getNameOfDeclaration(elem) as ts.Identifier;
          variables.add(elementName.text);
        });
      }
    }
  });

  return variables;
}

/**
 * Get export/import names
 */
function getBindingNames(
  bindings: ts.NamedImportsOrExports | ts.NamespaceImport
): Set<{ name: string; propertyName: ValueExport }> {
  const names = new Set<{ name: string; propertyName: ValueExport }>();

  if (ts.isNamespaceImport(bindings)) {
    const { name } = bindings;
    names.add({
      name: name.text,
      propertyName: DEFAULT_EXPORT,
    });
  } else {
    const { elements } = bindings;

    elements.forEach(b => {
      const { propertyName } = b;
      const localName = (ts.getNameOfDeclaration(b) as ts.Identifier).text;
      const nameFromModule = propertyName ? propertyName.text : localName;
      names.add({
        name: localName,
        propertyName: nameFromModule,
      });
    });
  }

  // const { elements, name } = bindings;

  // if (name && ts.isIdentifier(name)) {
  //   names.add({
  //     name: name.text,
  //     propertyName: DEFAULT_EXPORT,
  //   });
  // } else if (elements) {
  //   elements.forEach(b => {
  //     const { propertyName } = b;
  //     const localName = ts.getNameOfDeclaration(b).text;
  //     const nameFromModule = propertyName ? propertyName.text : localName;
  //     names.add({
  //       name: localName,
  //       propertyName: nameFromModule,
  //     });
  //   });
  // }

  return names;
}

/**
 * Parse a module
 */
function createSourceFile(filename: string): ISourceFile | undefined {
  /** ts.CompilerHost */
  const compilerHost: ts.CompilerHost = {
    fileExists: () => true,
    getCanonicalFileName: (filename: string) => filename,
    getCurrentDirectory: () => '',
    getDefaultLibFileName: () => 'lib.d.ts',
    getNewLine: () => '\n',
    getSourceFile: () => {
      const code = fs.readFileSync(filename, { encoding: 'utf-8' });
      return ts.createSourceFile(
        filename,
        code,
        ts.ScriptTarget.Latest,
        true,
        getScriptKind(filename)
      );
    },
    readFile: () => undefined,
    useCaseSensitiveFileNames: () => true,
    writeFile: () => null,
  };

  const program = ts.createProgram(
    [filename],
    {
      allowJs: true,
      noResolve: true,
      target: ts.ScriptTarget.Latest,
      experimentalDecorators: true,
      experimentalAsyncFunctions: true,
      jsx: ts.JsxEmit.Preserve,
    },
    compilerHost
  );

  return program.getSourceFile(filename);
}

/**
 * Check if stmt is a relative import
 */
function isRelativeImportExportDeclaration(
  stmt: ts.ImportDeclaration | ts.ExportDeclaration
): boolean {
  const moduleName = getModuleName(stmt);

  return !!(moduleName && moduleName.startsWith('.'));
}

/**
 * Check if a node is exported.
 * export = foobar is considered as false
 */
function isNodeExported(node: ts.Declaration): number {
  const flagToTest = ts.ModifierFlags.ExportDefault;
  const flag = ts.getCombinedModifierFlags(node);

  return flag & flagToTest;
}

/**
 * Check if a node is export default
 */
function isExportDefaultNode(node: ts.Declaration): boolean {
  const flag = ts.getCombinedModifierFlags(node);

  return flag === ts.ModifierFlags.ExportDefault;
}

/**
 * Get module name from import declaration
 */
function getModuleName(
  stmt: ts.ImportDeclaration | ts.ExportDeclaration
): string {
  return (stmt.moduleSpecifier as ts.StringLiteral).text;
}

/**
 * Convert relative module path to absolute
 */
function convertRelativeModulePathToAbsolute(
  moduleName: string,
  cwd: string
): string {
  return resolve({
    cwd,
    moduleName,
    mainFiles: ['index'],
    extensions: ['ts', 'tsx', 'js', 'jsx'],
  });
}

/**
 * Check if a module has default export
 * @param {Set.<ValueExport>} valueExports
 * @return {boolean}
 */
function isModuleHasDefaultExport(valueExports: Set<ValueExport>): boolean {
  for (const exp of valueExports) {
    if (exp === DEFAULT_EXPORT) {
      return true;
    }
  }

  return false;
}

/**
 * Guess script kind base on filename
 */
function getScriptKind(filename: string): ts.ScriptKind {
  if (filename.endsWith('.jsx')) {
    return ts.ScriptKind.JSX;
  } else if (filename.endsWith('.tsx')) {
    return ts.ScriptKind.TSX;
  } else if (filename.endsWith('.ts')) {
    return ts.ScriptKind.TS;
  } else if (filename.endsWith('.js')) {
    return ts.ScriptKind.JS;
  }

  return ts.ScriptKind.TS;
}

/**
 * Add element to exports, warn if already there
 */
function addToExports(
  set: Set<ValueExport>,
  elem: ValueExport
): Set<ValueExport> {
  if (set.has(elem)) {
    console.error(chalk.red(`Duplicate exports found ${elem}`));
  } else {
    set.add(elem);
  }

  return set;
}

/**
 * Get all relative imports for module
 */
function getModuleRelativeImports(
  imports: ts.StringLiteral[] | undefined,
  cwd: string
): Set<string> {
  const importFiles = new Set<string>();

  if (imports) {
    imports.forEach(imp => {
      const moduleName = imp.text;
      if (moduleName && moduleName.startsWith('.')) {
        importFiles.add(convertRelativeModulePathToAbsolute(moduleName, cwd));
      }
    });
  }

  return importFiles;
}

/**
 * Construct a module registry for root module
 */
export function getModuleRegistry(rootModule: string): IRegistry {
  const registry: IRegistry = {};

  parseValueExports(rootModule, registry);

  const getRegistrySize = () => Object.keys(registry).length;
  let prevModuleCount = 0;
  while (getRegistrySize() > prevModuleCount) {
    prevModuleCount = getRegistrySize();

    for (const key in registry) {
      if (hasOwn.call(registry, key)) {
        const mod = registry[key];
        mod.dependencies.forEach(
          dep => registry[dep] || parseValueExports(dep, registry)
        );
      }
    }
  }

  return registry;
}
