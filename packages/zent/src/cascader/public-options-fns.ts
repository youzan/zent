/**
 * Public helpers for manipulating cascader options
 */

import { clone as _clone, insertPath as _insertPath } from './forest';
import { IPublicCascaderItem } from './types';

/**
 * Shallow clone `options`, does not deep clone properties in each node.
 * @param options options to clone
 */
export function clone(options: IPublicCascaderItem[]): IPublicCascaderItem[] {
  return _clone(options, createNode);
}

/**
 * Insert `path` into `options`. __Mutates__ `options`.
 * @param options options for inserting
 * @param path path to insert
 */
export function insertPath(
  options: IPublicCascaderItem[],
  path: IPublicCascaderItem[]
) {
  return _insertPath(options, path, createNode);
}

/**
 * Return the target `node` following `path` in `options`.
 * @param options options to search for node
 * @param path path to target node
 */
export function getNode(
  options: IPublicCascaderItem[],
  path: IPublicCascaderItem[]
): IPublicCascaderItem | null {
  let node: IPublicCascaderItem = null;
  let children = options;

  for (let i = 0; i < path.length; i++) {
    const { value } = path[i];
    node = children.find(x => x.value === value);
    if (!node) {
      return null;
    }
    children = node.children;
  }

  return node;
}

function createNode(node: IPublicCascaderItem) {
  return { ...node, children: [] };
}
