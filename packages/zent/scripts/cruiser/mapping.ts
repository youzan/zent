import * as path from 'path';
import * as fs from 'fs';
import { IExportedName } from './analyzer';

export interface IModule {
  js: string;
  style: string[];
  isDefaultExport: boolean;
}

export interface IModuleMapping {
  [key: string]: IModule;
}

type Edge = [string, string];

type Graph = Edge[];

const hasOwn = Object.prototype.hasOwnProperty;

/**
 * Generate a module mapping
 */
export function getModuleMapping(
  exportedNames: IExportedName[],
  styleRootDir: string
): IModuleMapping {
  const graph = createDependencyGraph(exportedNames);
  const sortedModuleNames = tsort(graph);

  // log(sortedModuleNames);

  const sortModule = (a: string, b: string) => {
    return sortedModuleNames.indexOf(a) - sortedModuleNames.indexOf(b);
  };

  const mapping = exportedNames.reduce((mapping, exportEntry) => {
    const {
      relativeJavaScriptPath,
      exportName,
      isDefaultExport,
      moduleName,
      dependencyModuleNames,
    } = exportEntry;
    const styleDependencies = [
      'base',
      ...dependencyModuleNames,
      moduleName,
    ].filter(m => isModuleHasStyle(m, styleRootDir));
    styleDependencies.sort(sortModule);

    mapping[exportName] = {
      js: relativeJavaScriptPath,
      isDefaultExport,
      style: styleDependencies,
    };

    return mapping;
  }, {} as IModuleMapping);

  // log(mapping);

  return mapping;
}

/**
 * Check if module has style
 */
function isModuleHasStyle(moduleName: string, styleRootDir: string): boolean {
  if (hasOwn.call(isModuleHasStyle.CACHE, moduleName)) {
    return isModuleHasStyle.CACHE[moduleName];
  }

  const styleFilename = path.join(styleRootDir, `${moduleName}.scss`);
  const exists =
    fs.existsSync(styleFilename) && fs.statSync(styleFilename).isFile();

  isModuleHasStyle.CACHE[moduleName] = exists;

  return exists;
}
isModuleHasStyle.CACHE = {} as Record<string, boolean>;

/**
 * Create a dependency graph
 */
function createDependencyGraph(exportedNames: IExportedName[]): Graph {
  /**
   * Is two edges are the same
   * @param {Edge} a
   * @param {Edge} b
   * @return {boolean}
   */
  function isSameEdge(a: Edge, b: Edge) {
    return a[0] === b[0] && a[1] === b[1];
  }

  return exportedNames.reduce(
    (graph, { dependencyModuleNames, moduleName }) => {
      ['base', ...dependencyModuleNames].forEach(dep => {
        const edge: Edge = [dep, moduleName];
        if (!graph.find(i => isSameEdge(edge, i))) {
          graph.push(edge);
        }
      });

      return graph;
    },
    [] as Edge[]
  );
}

/**
 * Topological sort
 * https://gist.github.com/shinout/1232505
 */
function tsort(edges: Graph): string[] {
  class Node {
    afters: string[];

    constructor(public id: string) {
      this.afters = [];
    }
  }

  const nodes: Record<string, Node> = {}; // hash: stringified id of the node => { id: id, afters: list of ids }
  const sorted: string[] = []; // sorted list of IDs ( returned value )
  const visited: Record<string, boolean> = {}; // hash: id of already visited node => true

  // 1. build data structures
  edges.forEach(v => {
    const from = v[0];
    const to = v[1];
    if (!nodes[from]) nodes[from] = new Node(from);
    if (!nodes[to]) nodes[to] = new Node(to);
    nodes[from].afters.push(to);
  });

  // 2. topological sort
  Object.keys(nodes).forEach(function visit(
    idstr,
    ancestors: number | string[]
  ) {
    const node = nodes[idstr];
    const id = node.id;

    // if already exists, do nothing
    if (visited[idstr]) return;

    if (typeof ancestors === 'number') {
      ancestors = [];
    }

    ancestors.push(id);

    visited[idstr] = true;

    node.afters.forEach(afterID => {
      const ances = ancestors as string[];

      if (ances.indexOf(afterID) >= 0) {
        // if already in ancestors, a closed chain exists.
        throw new Error('closed chain : ' + afterID + ' is in ' + id);
      }

      visit(
        afterID.toString(),
        ances.map(v => v)
      ); // recursive call
    });

    sorted.unshift(id);
  });

  return sorted;
}
