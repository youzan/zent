import { Forest } from './forest';
import { getNodeKey } from './node-fns';
import { CascaderItemSelectionState, ICascaderItem } from './types';

/**
 * 合并子路径全选的路径
 *
 * 假设 B2 下只有两个节点 C1 和 C2
 * [A1, B2, C1], [A1, B2, C2] => [A1, B2]
 */
export function simplify(
  paths: Array<ICascaderItem[]>,
  selectionMap: Map<string, CascaderItemSelectionState>
): Array<ICascaderItem[]> {
  const forest = new Forest([]);
  paths.forEach(p => forest.insertPath(p));

  forest.reduceNode((_, node) => {
    const k = getNodeKey(node);
    const state = selectionMap.get(k);
    if (state === 'on') {
      node.children = [];
    }

    return _;
  }, null);

  const simplified = forest.reducePath((all, path) => {
    all.push(path);
    return all;
  }, [] as Array<ICascaderItem[]>);

  return simplified;
}
