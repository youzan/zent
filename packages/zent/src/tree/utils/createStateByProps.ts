import assign from 'lodash-es/assign';

import {
  ITreeData,
  ITreeRenderKey,
  DEFAULT_REANDER_KEY,
  TreeRootIdArray,
  ITreeRootInfoMap,
} from './common';
import getJudgeInfo from './getJudgeInfo';
import correctMark from './correctMark';

export interface ICreateStateByPropsParams {
  data: ITreeData[];
  dataType?: 'tree' | 'plain'; // 数据类型
  renderKey?: Partial<ITreeRenderKey>;
  checkable?: boolean; // 是否为checkbox模式
  expandAll?: boolean; // 是否展开全部节点
  checkedKeys?: TreeRootIdArray; // 默认选中节点
  disabledCheckedKeys?: TreeRootIdArray; // 默认选中节点
  loadMore?: (data: ITreeData) => Promise<any>;
  isRoot?: (data: ITreeData) => boolean;
}

export interface ICreateStateByPropsReturn {
  tree: ITreeData[];
  renderKey: ITreeRenderKey;
  rootInfoMap: ITreeRootInfoMap;
  expandNode: TreeRootIdArray;
  checkedNode: TreeRootIdArray;
  disabledNode: TreeRootIdArray;
}

/**
 * 根据props生成初始 state
 */
export default function createStateByProps({
  data,
  isRoot,
  renderKey: propsRenderKey,
  dataType,
  expandAll,
  loadMore,
  checkable,
  disabledCheckedKeys = [],
  checkedKeys = [],
}: ICreateStateByPropsParams): ICreateStateByPropsReturn {
  const renderKey = assign({}, DEFAULT_REANDER_KEY, propsRenderKey);
  const { children, parentId, id } = renderKey;

  /**
   * step 1
   * 将 dataType === 'plain' 的数据格式化成父子嵌套格式
   */
  let roots: ITreeData[] = [];
  if (dataType === 'plain') {
    // 记录每个节点map表， { id: node }
    const map: { [key: string]: ITreeData } = {};
    const orderRecord: string[] = [];

    data.forEach((node, index) => {
      if (!node.isLeaf) {
        node[children] = [];
      }

      map[node[id]] = node;
      orderRecord[index] = node[id];
    });

    orderRecord.forEach(key => {
      const node = map[key];

      const isRootNode =
        (isRoot && isRoot(node)) ||
        node[parentId] === 0 ||
        node[parentId] === undefined ||
        node[parentId] === '0';

      if (isRootNode) {
        roots.push(node);
      } else if (map[node[parentId]]) {
        // 防止只删除父节点没有子节点的情况
        map[node[parentId]][children].push(node);
      }
    });
  } else if (dataType === 'tree') {
    roots = data;
  }

  /**
   * step 2
   * 收集必要的判断集合
   */
  const { rootInfoMap, expandNode } = getJudgeInfo({
    expandAll,
    checkable,
    loadMore,
    tree: roots,
    renderKey,
  });

  /**
   * step 3
   * 获取checkbox相关的两个集合 [选中][禁用]
   */
  const disabledNode = checkable
    ? correctMark(disabledCheckedKeys, rootInfoMap)
    : disabledCheckedKeys;
  const checkedNode = checkable
    ? correctMark(checkedKeys, rootInfoMap, disabledNode, true)
    : checkedKeys;

  return {
    tree: roots,
    renderKey,
    rootInfoMap,
    expandNode,
    checkedNode,
    disabledNode,
  };
}
