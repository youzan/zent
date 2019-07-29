type TArray<T> = T[];
export type RootIdArray = TArray<string | number>;

// 默认节点渲染key
export const DEFAULT_REANDER_KEY: IRenderKey = {
  id: 'id',
  title: 'title',
  children: 'children',
  parentId: 'parentId',
};

export interface IRenderKey {
  id: string;
  title: string;
  children: string;
  parentId: string;
}

export interface ITreeData {
  // [DEFAULT_REANDER_KEY[id]]?: string | number;
  // [DEFAULT_REANDER_KEY[parendId]]?: string | number;
  // [DEFAULT_REANDER_KEY[title]]?: React.ReactNode;
  // [DEFAULT_REANDER_KEY[children]]?: ITreeData[];
  expand?: boolean;
  isLeaf?: boolean;
  [key: string]: any;
}

export interface IRootInfoMap {
  [key: string]: {
    id: string | number;
    parentId?: string | number;
    root: ITreeData;
    isExpand: boolean;
    isParent: boolean;
    son: RootIdArray;
    includes: RootIdArray;
    // 节点的选择联动集合 { nodeId: id[] }
    // id[]: [nodeId, nodeId.children[1]Id, nodeId.children[2]Id, .... nodeId.children[1][...].childrenn[N]Id]
    // 可以根据当前node的id, 查找它将会影响的子孙节点
  };
}
