import { ICascaderItem } from './types';

/**
 * 查找树中某个节点的子节点
 */
export function getNodeChildren(
  options: ICascaderItem[] | null | undefined,
  value: unknown
): ICascaderItem[] | null {
  if (options && options.length > 0) {
    const currOptions = options.find(it => it.value === value);
    if (currOptions && Array.isArray(currOptions.children)) {
      return currOptions.children;
    }
  }

  return null;
}

export function isPathEqual(x: ICascaderItem[], y: ICascaderItem[]): boolean {
  if (x.length !== y.length) {
    return false;
  }

  for (let i = 0; i < x.length; i++) {
    if (x[i].value !== y[i].value) {
      return false;
    }
  }

  return true;
}

export function union(
  x: Array<ICascaderItem[]>,
  y: Array<ICascaderItem[]>
): Array<ICascaderItem[]> {
  return y.reduce(
    (acc, path) => {
      const match = acc.some(i => isPathEqual(i, path));
      if (!match) {
        acc.push(path);
      }

      return acc;
    },
    [...x]
  );
}

export function difference(
  x: Array<ICascaderItem[]>,
  y: Array<ICascaderItem[]>
): Array<ICascaderItem[]> {
  return x.filter(i => y.every(j => !isPathEqual(i, j)));
}

export function getNodeKey(node: ICascaderItem): string {
  const values = [];
  while (node) {
    values.unshift(node.value);
    node = node.parent;
  }
  return values.map((s, i) => `${i}$${s}`).join('@');
}

export function getPathToNode(node: ICascaderItem): ICascaderItem[] {
  let parent = node;
  const path = [];

  while (parent) {
    path.push(parent);
    parent = parent.parent;
  }

  return path;
}

/**
 * 获取级联项的文本
 */
export const getOptionsLabel = (items: ICascaderItem[]): string =>
  items.map(it => it.label).join(' / ');

/**
 * 获取级联项的值
 */
export const getOptionsValue = (items: ICascaderItem[]): string =>
  items.map(it => it.value).join('-');
