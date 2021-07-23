import * as path from 'path';
import * as camelCase from 'camelcase';
import {
  DEFAULT_EXPORT,
  getModuleRegistry,
  IRegistry,
  ValueExport,
} from './registry';

// const { log } = require('./json');

export interface IExportedName {
  exportName: string;
  isDefaultExport: boolean;
  modulePath: string;
  moduleName: string;
  relativeJavaScriptPath: string;
  dependencyModuleNames: Set<string>;
}

const MODULE_INDEX_REGEXP = /\/index\.(.+)$/;

/**
 * Get all exported names from root module
 */
export function getExportedNames(rootModule: string): IExportedName[] {
  const rootDir = path.dirname(rootModule);
  const registry = getModuleRegistry(rootModule);
  const rootExports = getRootExports(rootModule, registry);
  const rootExportNames = rootExports.map(exp => {
    const modulePath = resolveExportToModule(exp, registry, rootModule);
    const moduleName = resolveModule(modulePath, rootDir);
    const relativeJavaScriptPath = resolveModuleToRelativeJavaScriptPath(
      modulePath,
      rootDir
    );
    const dependencyModuleNames = getModuleDependencies(
      modulePath,
      rootDir,
      registry
    );
    const isDefaultExport = isNameModuleDefaultExport(
      exp,
      modulePath,
      moduleName,
      registry
    );

    return {
      exportName: exp,
      isDefaultExport,
      modulePath,
      moduleName,
      relativeJavaScriptPath,
      dependencyModuleNames,
    };
  });

  // log(rootExportNames);

  return rootExportNames;
}

/**
 * Get root module exports
 */
function getRootExports(rootModule: string, registry: IRegistry): string[] {
  return [...registry[rootModule].exports];
}

/**
 * Resolve an exported name to a module
 */
function resolveExportToModule(
  exportName: ValueExport,
  registry: IRegistry,
  rootModule: string
): string {
  if (exportName === 'default') {
    return '';
  }

  const candidates = [];

  for (const mod of registry[rootModule].dependencies) {
    const moduleExports = registry[mod].exports;
    for (const exp of moduleExports) {
      if (exp === exportName) {
        candidates.push(mod);
      }
    }

    if (isLonelyDefaultExport(moduleExports)) {
      const possibleModuleNames = guessModuleName(mod);
      if (possibleModuleNames.some(m => m === exportName)) {
        candidates.push(mod);
      }
    }
  }

  // log({ name: exportName, candidates });

  switch (candidates.length) {
    case 0:
      throw new Error(`Can not resolve ${exportName}`);
    case 1:
      return candidates[0];
    case 2: {
      const indexModule = findModuleIndex(candidates);
      if (indexModule) {
        return indexModule;
      }
    }
    /* otherwise, fall through */
    default:
      throw new Error(
        `Ambiguous module found when resolving ${exportName}\n${JSON.stringify(
          candidates
        )}`
      );
  }
}

/**
 * Resolve a module path to module name
 */
function resolveModule(modulePath: string, rootDir: string): string {
  let relativeModulePath = getRelativeModulePath(modulePath, rootDir);
  if (relativeModulePath && relativeModulePath[0] === path.sep) {
    relativeModulePath = relativeModulePath.substring(1);
  }

  return relativeModulePath.split(path.sep)[0];
}

/**
 * Resolve a module path to relative javascript path.
 *
 * Useful when constructing imports.
 */
function resolveModuleToRelativeJavaScriptPath(
  modulePath: string,
  rootDir: string
): string {
  const relativeModulePath = getRelativeModulePath(modulePath, rootDir);

  return relativeModulePath.replace(/\.(js|jsx|ts|tsx)$/, '.js');
}

/**
 * Resolve module path relative to rootDir
 */
function getRelativeModulePath(modulePath: string, rootDir: string): string {
  if (!modulePath.startsWith(rootDir)) {
    throw new Error(`Can not resolve module ${modulePath}`);
  }

  return modulePath.replace(rootDir, '');
}

/**
 * Get dependent module names for module path
 */
function getModuleDependencies(
  modulePath: string,
  rootDir: string,
  registry: IRegistry
): Set<string> {
  const dependencies = new Set(registry[modulePath].dependencies);
  let prevSize = 0;

  while (prevSize < dependencies.size) {
    prevSize = dependencies.size;

    for (const dep of dependencies) {
      for (const i of registry[dep].dependencies) {
        if (!dependencies.has(i)) {
          dependencies.add(i);
        }
      }
    }
  }

  const depModuleNames = new Set<string>();
  for (const mod of dependencies) {
    depModuleNames.add(resolveModule(mod, rootDir));
  }

  // Exclude self
  const moduleName = resolveModule(modulePath, rootDir);
  if (depModuleNames.has(moduleName)) {
    depModuleNames.delete(moduleName);
  }

  return depModuleNames;
}

/**
 * Filter index.(js|jsx|ts|tsx) modules
 */
function findModuleIndex(modules: string[]): string | undefined {
  return modules.find(m => MODULE_INDEX_REGEXP.test(m));
}

/**
 * Check if only default export exists
 */
function isLonelyDefaultExport(moduleExports: Set<ValueExport>): boolean {
  return moduleExports.size === 1 && moduleExports.has('default');
}

/**
 * Remove index.(js|jsx|ts|tsx) from module path
 */
function stripIndexSuffix(mod: string): string {
  return mod.replace(MODULE_INDEX_REGEXP, '');
}

/**
 * Remove file extention from module path
 */
function stripSuffix(mod: string): string {
  return mod.replace(/\.(js|jsx|ts|tsx)$/, '');
}

/**
 * Guess module name base on module path
 */
function guessModuleName(mod: string): string[] {
  if (MODULE_INDEX_REGEXP.test(mod)) {
    mod = stripIndexSuffix(mod);
    const basename = path.basename(mod);
    const name = camelCase(basename);
    const capName = camelCase(name, { pascalCase: true });
    return [name, capName];
  }

  mod = stripSuffix(mod);
  const basename = path.basename(mod);

  return [basename];
}

/**
 * Guess if a exported name is default export
 */
function isNameModuleDefaultExport(
  exportName: string,
  modulePath: string,
  moduleName: string,
  registry: IRegistry
): boolean {
  const exports = registry[modulePath].exports;
  const hasDefault = exports.has(DEFAULT_EXPORT);

  /*
    "exportName": "WeekPicker",
    "modulePath": "zent/src/datetimepicker/WeekPicker.tsx",
   */
  const modulePathWithoutExtension = stripSuffix(modulePath);
  if (modulePathWithoutExtension.endsWith(exportName)) {
    return hasDefault;
  }

  /*
    "exportName": "Sortable",
    "modulePath": "zent/packages/zent/src/sortable/index.ts",
    "moduleName": "sortable",

    "exportName": "ColorPicker",
    "modulePath": "zent/packages/zent/src/colorpicker/index.ts",
    "moduleName": "colorpicker",

    "exportName": "SplitButton",
    "modulePath": "zent/packages/zent/src/split-button/index.ts",
    "moduleName": "split-button",
  */
  if (MODULE_INDEX_REGEXP.test(modulePath)) {
    if (
      camelCase(moduleName) === exportName ||
      camelCase(moduleName, { pascalCase: true }) === exportName ||
      moduleName.toLowerCase() === exportName.toLowerCase()
    ) {
      return hasDefault;
    }
  }

  /*
    "exportName": "Option",
    "modulePath": "zent/packages/zent/src/select/index.ts",
    "moduleName": "select",
  */
  return false;
}
