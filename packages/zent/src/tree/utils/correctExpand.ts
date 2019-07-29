import { RootIdArray, ITreeData, IRootInfoMap } from './common';

export interface ICurrentParams {
  tree: ITreeData[];
  expandNode: RootIdArray;
}

export interface INextParams {
  expandNode: RootIdArray;
  rootInfoMap: IRootInfoMap;
}

// 纠正 ExpandNode (防止loadMore 之后，之前打开的expand记录丢失)
export default function filterExpandNode(
  current: ICurrentParams,
  next: INextParams
): RootIdArray {
  const { expandNode: cExpandNode } = current;
  const { rootInfoMap, expandNode: nExpandNode } = next;

  cExpandNode.forEach(rootId => {
    if (nExpandNode.indexOf(rootId) === -1 && rootInfoMap[rootId]) {
      nExpandNode.push(rootId);
    }
  });

  return nExpandNode;
}
