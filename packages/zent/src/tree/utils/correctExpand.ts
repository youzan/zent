import { TreeRootIdArray, ITreeData, ITreeRootInfoMap } from './common';

export interface ICurrentParams {
  tree: ITreeData[];
  expandNode: TreeRootIdArray;
}

export interface INextParams {
  expandNode: TreeRootIdArray;
  rootInfoMap: ITreeRootInfoMap;
}

// 纠正 ExpandNode (防止loadMore 之后，之前打开的expand记录丢失)
export default function filterExpandNode(
  current: ICurrentParams,
  next: INextParams
): TreeRootIdArray {
  const { expandNode: cExpandNode } = current;
  const { rootInfoMap, expandNode: nExpandNode } = next;

  cExpandNode.forEach(rootId => {
    if (nExpandNode.indexOf(rootId) === -1 && rootInfoMap[rootId]) {
      nExpandNode.push(rootId);
    }
  });

  return nExpandNode;
}
