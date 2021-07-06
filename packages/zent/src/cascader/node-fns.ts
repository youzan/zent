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

/**
 * 节点在树中的唯一 key
 */
export function getNodeKey(node: ICascaderItem): string {
  let n: ICascaderItem | null = node;
  const values = [];

  while (n) {
    values.unshift(n.value);
    n = n.parent;
  }
  return values.map((s, i) => `${i}$${s}`).join('@');
}

/**
 * Returns node depth, root node has depth 1.
 */
export function getNodeDepth(node: ICascaderItem): number {
  let depth = 1;
  let { parent } = node;

  while (parent) {
    parent = parent.parent;
    depth++;
  }
  return depth;
}
