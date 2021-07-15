import { IPublicCascaderItem, ICascaderItem, CascaderValue } from './types';
import { isPathEqual } from './path-fns';
import { getNodeDepth } from './node-fns';

interface IBuildStackFrame<T> {
  node: T;
  children?: IPublicCascaderItem[];
}

interface IInsertStackFrame<T> {
  parent: T | null;
  children: T[];
  node?: IPublicCascaderItem;
}

interface IReduceNodeDfsFrame {
  node: ICascaderItem;
  phase: 'recurse' | 'visit';
}

export function clone<T extends IPublicCascaderItem>(
  from: IPublicCascaderItem[],
  cloneNode: (node: IPublicCascaderItem, parent: T) => T
): T[] {
  const stack: IBuildStackFrame<T>[] = from.map(n => ({
    node: cloneNode(n, null),
    children: n.children,
  }));
  const trees = stack.map(n => n.node);

  while (stack.length > 0) {
    const state = stack.pop();
    if (!state) {
      continue;
    }

    const { node, children } = state;
    children?.forEach(n => {
      const m = cloneNode(n, node);
      stack.push({ node: m, children: n.children });
      node.children.push(m);
    });
  }

  return trees;
}

export function insertPath<T extends IPublicCascaderItem>(
  trees: T[],
  path: IPublicCascaderItem[],
  createNode: (node: IPublicCascaderItem, parent: T | null) => T
): T[] {
  path = path.slice();
  const stack: IInsertStackFrame<T>[] = [
    {
      parent: null,
      children: trees,
      node: path.shift(),
    },
  ];

  while (stack.length > 0) {
    const frame = stack.pop();
    if (!frame) {
      continue;
    }

    const { children, node } = frame;

    // done
    if (!node) {
      break;
    }

    const nval = node.value;
    let matchedNode = children.find(n => n.value === nval);
    if (!matchedNode) {
      matchedNode = createNode(node, frame.parent);
      children.push(matchedNode);
    }

    stack.push({
      parent: matchedNode,
      children: matchedNode.children as T[],
      node: path.shift(),
    });
  }

  return trees;
}

/**
 * A forsest
 */
export class Forest {
  private trees: ICascaderItem[];

  constructor(from: IPublicCascaderItem[]) {
    this.trees = this.build(from);
  }

  private build(from: IPublicCascaderItem[]) {
    return clone(from, createNode);
  }

  /**
   * Like Array.prototype.reduce but works on tree paths.
   */
  reducePath<T>(
    callback: (
      accumulator: T,
      path: ICascaderItem[],
      terminate: () => void
    ) => T,
    initialValue: T
  ): T {
    const stack = reverse(this.trees);
    const path = [];
    let acc = initialValue;
    let earlyExit = false;
    const terminate = () => {
      earlyExit = true;
    };

    while (stack.length > 0) {
      const node = stack.pop();
      if (!node) {
        continue;
      }

      const depth = getNodeDepth(node);
      while (depth <= path.length) {
        path.pop();
      }

      path.push(node);
      if (node.children.length > 0) {
        reversePush(stack, node.children);
      } else {
        acc = callback(acc, path.slice(), terminate);
        if (earlyExit) {
          break;
        }
      }
    }

    return acc;
  }

  /**
   * Like Array.prototype.reduce but work on tree nodes.
   *
   * Nodes are reduced in pre-order.
   */
  reduceNode<T>(
    callback: (accumulator: T, node: ICascaderItem, terminate: () => void) => T,
    initialValue: T
  ): T {
    const stack = reverse(this.trees);
    let acc = initialValue;
    let earlyExit = false;
    const terminate = () => {
      earlyExit = true;
    };

    while (stack.length > 0) {
      const node = stack.pop();
      if (!node) {
        continue;
      }

      acc = callback(acc, node, terminate);
      if (earlyExit) {
        break;
      }

      if (node.children.length > 0) {
        reversePush(stack, node.children);
      }
    }

    return acc;
  }

  /**
   * Same as reduceNode, but in post-order
   */
  reduceNodeDfs<T>(
    callback: (accumulator: T, node: ICascaderItem, terminate: () => void) => T,
    initialValue: T
  ): T {
    const stack: IReduceNodeDfsFrame[] = this.trees.map(n => ({
      node: n,
      phase: 'recurse',
    }));
    let acc = initialValue;
    let earlyExit = false;
    const terminate = () => {
      earlyExit = true;
    };

    while (stack.length > 0) {
      const frame = stack.pop();
      if (!frame) {
        continue;
      }

      const { node, phase } = frame;
      if (phase === 'recurse') {
        stack.push({
          node,
          phase: 'visit',
        });

        node.children.forEach(node => {
          stack.push({
            node,
            phase: 'recurse',
          });
        });
      } else if (phase === 'visit') {
        acc = callback(acc, node, terminate);
        if (earlyExit) {
          break;
        }
      }
    }

    return acc;
  }

  /**
   * Sort paths using orders in `this.trees`.
   *
   * Does not mutate `paths`.
   */
  sort(paths: Array<ICascaderItem[]>): Array<ICascaderItem[]> {
    return this.reducePath((acc, path) => {
      if (paths.some(x => isPathEqual(x, path))) {
        acc.push(path);
      }

      return acc;
    }, [] as ICascaderItem[][]);
  }

  clone(): Forest {
    return new Forest(this.trees);
  }

  /**
   * Insert a path into tree.
   *
   * Modifies tree in place.
   */
  insertPath(path: IPublicCascaderItem[]): this {
    insertPath(this.trees, path, createNode);
    return this;
  }

  getTrees(): ICascaderItem[] {
    return this.trees;
  }

  /**
   * Find first matching path with values
   */
  getPathByValue(values: CascaderValue[]): ICascaderItem[] {
    return this.reducePath<ICascaderItem[]>((found, path, terminate) => {
      if (values.length > path.length || values.length === 0) {
        return found;
      }

      const size = values.length;
      let i: number;
      for (i = 0; i < size; i++) {
        if (path[i].value !== values[i]) {
          return found;
        }
      }

      terminate();
      return i === path.length ? path : path.slice(0, size);
    }, []);
  }

  /**
   * Returns all paths from root to leaf that contains `startNode`
   *
   * An optional `predicate` function can be used to filter results,
   * return `true` to keep it, `false` to drop it.
   */
  getPaths(
    startNode: ICascaderItem,
    predicate?: (path: ICascaderItem[]) => boolean
  ) {
    const depth = getNodeDepth(startNode);
    const idx = depth - 1;
    const { value } = startNode;

    return this.reducePath((acc, path) => {
      // Paths may have different lengths
      if (
        path.length > idx &&
        path[idx].value === value &&
        (!predicate || predicate(path))
      ) {
        acc.push(path);
      }

      return acc;
    }, []);
  }
}

function reverse<T>(arr: T[]): T[] {
  const ret = arr.slice();
  ret.reverse();
  return ret;
}

function reversePush<T>(arr: T[], from: T[]): T[] {
  for (let i = from.length - 1; i >= 0; i--) {
    arr.push(from[i]);
  }

  return arr;
}

function createNode(
  node: IPublicCascaderItem,
  parent: ICascaderItem | null
): ICascaderItem {
  return {
    ...node,
    parent,
    children: [],
  };
}
