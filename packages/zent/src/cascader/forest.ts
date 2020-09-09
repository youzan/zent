import { IPublicCascaderItem, ICascaderItem, CascaderValue } from './types';
import { isPathEqual } from './utils';

interface IBuildStackFrame {
  node: ICascaderItem;
  children?: IPublicCascaderItem[];
}

interface IInsertStackFrame {
  parent: ICascaderItem | null;
  children: ICascaderItem[];
  node?: IPublicCascaderItem;
}

interface IReduceNodeDfsFrame {
  node: ICascaderItem;
  phase: 'recurse' | 'visit';
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
    const stack: IBuildStackFrame[] = from.map(n => ({
      node: createNode(n, null),
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
        const m = createNode(n, node);
        stack.push({ node: m, children: n.children });
        node.children.push(m);
      });
    }

    return trees;
  }

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

      const depth = getDepth(node);
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
   * Sort paths using orders in `this.trees`
   */
  sort(paths: Array<ICascaderItem[]>): Array<ICascaderItem[]> {
    return this.reducePath((acc, path) => {
      if (paths.some(x => isPathEqual(x, path))) {
        acc.push(path);
      }

      return acc;
    }, []);
  }

  clone(): Forest {
    return new Forest(this.trees);
  }

  insertPath(path: IPublicCascaderItem[]): this {
    const stack: IInsertStackFrame[] = [
      {
        parent: null,
        children: this.trees,
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
        children: matchedNode.children,
        node: path.shift(),
      });
    }

    return this;
  }

  // merge(other: IPublicCascaderItem[]): Forest {
  //   const otherForest = new Forest(other);

  //   return otherForest.reducePath((clone, path) => {
  //     clone.insertPath(path);
  //     return clone;
  //   }, this.clone());
  // }

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
      return i === size ? path : path.slice(0, size);
    }, []);
  }

  getPaths(startNode: ICascaderItem) {
    const depth = getDepth(startNode);
    const idx = depth - 1;
    const { value } = startNode;

    return this.reducePath((acc, path) => {
      if (path[idx].value === value) {
        acc.push(path);
      }

      return acc;
    }, []);
  }
}

function getDepth(node: ICascaderItem): number {
  let depth = 1;
  let { parent } = node;

  while (parent) {
    parent = parent.parent;
    depth++;
  }
  return depth;
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
  item: IPublicCascaderItem,
  parent: ICascaderItem | null
): ICascaderItem {
  return {
    ...item,
    parent,
    children: [],
  };
}
