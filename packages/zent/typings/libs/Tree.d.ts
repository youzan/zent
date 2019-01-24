/// <reference types="react" />

declare module 'zent/lib/tree' {
  interface ITreeData {
    id: number | string;
    title: number | string;
    children?: Array<ITreeData>;
    parendId?: string | number;
    expand?: boolean;
    isLeaf?: boolean;
  }

  interface ITreeOperation {
    name: string;
    icon?: string | React.ReactNode;
    action: (data: ITreeData) => void;
    shouldRender?: (data: ITreeData) => boolean;
  }

  interface ITreeProps {
    useNew?: boolean;
    dataType?: 'tree' | 'plain';
    data: Array<ITreeData>;
    renderKey?: {
      id?: string;
      title?: string;
      children?: string;
      parentId?: string;
    };
    render?: (data: ITreeData) => React.ReactNode;
    operations?: Array<ITreeOperation>;
    foldable?: boolean;
    onCheck?: (data: Array<number | string>) => void;
    checkable?: boolean;
    controlled?: boolean;
    defaultCheckedKeys?: Array<number | string>;
    disabledCheckedKeys?: Array<number | string>;
    size?: 'medium' | 'small' | 'large';
    commonStyle?: React.CSSProperties;
    expandAll?: boolean;
    onExpand?: (data: ITreeData, config: { isExpanded: boolean }) => void;
    autoExpandOnSelect?: boolean;
    onSelect?: (data: ITreeData, target: HTMLSpanElement) => void;
    isRoot?: (data: ITreeData) => boolean;
    loadMore?: (data: ITreeData) => Promise<any>;
  }

  export default class Tree extends React.Component<ITreeProps, any> {}
}
