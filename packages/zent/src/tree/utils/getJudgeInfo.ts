import {
  DEFAULT_REANDER_KEY,
  TreeRootIdArray,
  ITreeData,
  ITreeRenderKey,
  ITreeRootInfoMap,
} from './common';

// getJudgeInfo
export interface IJudgeInfoParams {
  expandAll?: boolean;
  checkable?: boolean;
  loadMore?: (data: ITreeData) => Promise<any>;
  tree: ITreeData[];
  renderKey?: ITreeRenderKey;
}

export interface IJudgeInfoReturn {
  expandNode: TreeRootIdArray;
  rootInfoMap: ITreeRootInfoMap;
}

/**
 * 获取必要的判断数据
 *
 * @param param
 * @returns {object}         rootInfoMap
 * @returns {boolean}        rootInfoMap.isExpand
 * @returns {boolean}        rootInfoMap.isParent
 * @returns {number|string}  rootInfoMap.id
 * @returns {number|string}  rootInfoMap.parentId
 * @returns {object}         rootInfoMap.root
 * @returns {array}  JudgeInfo.includes  节点的选择联动集合 { nodeId: id[] }
 *                   id[]: [nodeId, nodeId.children[1]Id, nodeId.children[2]Id, .... nodeId.children[1][...].childrenn[N]Id]
 *                   可以根据当前node的id, 查找它将会影响的子孙节点
 */
export default function getJudgeInfo({
  expandAll,
  loadMore,
  tree,
  renderKey = DEFAULT_REANDER_KEY,
}: IJudgeInfoParams): IJudgeInfoReturn {
  const expandNode: TreeRootIdArray = [];
  const rootInfoMap: ITreeRootInfoMap = {};
  const { children, id } = renderKey;

  function collector({
    nodeTree,
    parentId,
  }: {
    nodeTree: ITreeData[];
    parentId?: string | number;
  }) {
    nodeTree.forEach(item => {
      const nodeId = item[id];

      // 初始化
      rootInfoMap[nodeId] = {
        id: nodeId,
        parentId,
        root: item,
        isExpand: false,
        isParent: false,
        son: (item[children] || []).map((t: ITreeData) => t[id]),
        includes: [nodeId],
      };

      // 是否为父节点
      const isParentNode = !!(
        !item.isLeaf &&
        (loadMore || (item[children] && item[children].length > 0))
      );
      rootInfoMap[nodeId].isParent = isParentNode;

      // 收集expand节点
      if (isParentNode && (expandAll || !!item.expand)) {
        expandNode.push(nodeId);
      }

      if (item[children]) {
        collector({
          nodeTree: item[children],
          parentId: nodeId,
        });
      }

      // 收集当前节点能够影响的所有节点(self + children)
      if (parentId !== undefined && rootInfoMap[parentId]) {
        rootInfoMap[parentId].includes = rootInfoMap[parentId].includes.concat(
          rootInfoMap[nodeId].includes
        );
      }
    });
  }

  collector({
    nodeTree: tree,
    parentId: undefined,
  });

  return {
    rootInfoMap: rootInfoMap as ITreeRootInfoMap,
    expandNode,
  };
}
