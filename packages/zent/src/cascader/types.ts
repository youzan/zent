export interface ICascaderBaseProps {
  options: IPublicCascaderItem[];
  placeholder?: string;
  className?: string;
  popupClassName?: string;
  disabled?: boolean;
  clearable?: boolean;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;

  /**
   * Customize rendering of select value
   */
  renderValue?: (selectedOptions: ICascaderItem[]) => React.ReactNode;

  /**
   * Customize rendering of item
   */
  renderItemContent?: (node: ICascaderItem) => React.ReactNode;

  /**
   * Customize tooltip for item.
   *
   * Return `undefined` to disabled tooltip
   */
  getItemTooltip?: (node: ICascaderItem) => string | undefined;

  /**
   * Customize rendering of item list
   */
  renderList?: (
    nodes: ICascaderItem[],
    renderItem: (node: ICascaderItem) => React.ReactNode
  ) => React.ReactNode;
}

export type CascaderValue = string | number;

export type CascaderItemSelectionState = 'on' | 'off' | 'partial';

/**
 * 外部节点数据结构
 */
export interface IPublicCascaderItem {
  value: CascaderValue;
  label: string;
  children?: IPublicCascaderItem[];
  disabled?: boolean;

  // 下一级展开时加载
  loadChildrenOnExpand?: boolean;

  // 滚动到底部时加载
  loadChildrenOnScroll?: boolean;

  // custom properties
  [key: string]: unknown;
}

export interface ICascaderItem extends IPublicCascaderItem {
  children: ICascaderItem[];
  parent: ICascaderItem | null;
}

export type CascaderTabsClickHandler = (
  node: ICascaderItem,
  closePopup: () => void
) => void;

export type CascaderMenuClickHandler = (
  node: ICascaderItem,
  closePopup: () => void
) => void;

export type CascaderMenuHoverHandler = (node: ICascaderItem) => void;

export type CascaderSearchClickHandler = (
  path: ICascaderItem[],
  closePopup: () => void
) => void;

export enum CascaderChangeAction {
  Clear = 'clear',
  Change = 'change',
}

export interface ICascaderChangeMeta {
  action: CascaderChangeAction;
}

export interface ICascaderMultipleChangeMeta extends ICascaderChangeMeta {
  simplify(options: Array<ICascaderItem[]>): Array<ICascaderItem[]>;
}

export enum CascaderLoadAction {
  LoadChildren = 'loadChildren',
  Scroll = 'scroll',
}

export interface ICascaderLoadMeta {
  action: CascaderLoadAction;
}
