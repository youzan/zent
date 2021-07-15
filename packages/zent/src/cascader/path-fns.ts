import { ICascaderItem } from './types';

/**
 * 判断树的两个路径是否相同
 */
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

/**
 * 合并树的路径
 */
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

/**
 * 两个树路径集合的差集
 */
export function difference(
  x: Array<ICascaderItem[]>,
  y: Array<ICascaderItem[]>
): Array<ICascaderItem[]> {
  return x.filter(i => y.every(j => !isPathEqual(i, j)));
}

/**
 * 从根节点到 `node` 的路径
 */
export function getPathToNode(node: ICascaderItem): ICascaderItem[] {
  let parent: ICascaderItem | null = node;
  const path: ICascaderItem[] = [];

  while (parent) {
    path.unshift(parent);
    parent = parent.parent;
  }

  return path;
}

/**
 * 获取路径的 label 描述
 */
export const getPathLabel = (path: ICascaderItem[]): string =>
  path.map(it => it.label).join(' / ');

/**
 * 获取路径的 value 描述
 */
export const getPathValue = (path: ICascaderItem[]): string =>
  path.map(it => it.value).join('-');
