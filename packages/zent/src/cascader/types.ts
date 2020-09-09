import * as React from 'react';

export interface ICascaderBaseProps {
  options: IPublicCascaderItem[];
  changeOnSelect?: boolean;
  placeholder?: string;
  className?: string;
  popupClassName?: string;
  renderValue?: (selectedOptions: IPublicCascaderItem[]) => React.ReactNode;
  disabled?: boolean;
  clearable?: boolean;
}

export type CascaderValue = string | number;

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
  item: ICascaderItem,
  level: number,
  closePopup: () => void
) => void;

export type CascaderMenuClickHandler = (
  item: ICascaderItem,
  level: number,
  closePopup: () => void
) => void;

export type CascaderMenuHoverHandler = (
  item: ICascaderItem,
  level: number
) => void;

export type CascaderSearchClickHandler = (
  items: ICascaderItem[],
  closePopup: () => void
) => void;

export enum CascaderChangeAction {
  Clear = 'clear',
  Change = 'change',
}

export interface ICascaderChangeMeta {
  action: CascaderChangeAction;
}

export enum CascaderLoadAction {
  LoadChildren = 'loadChildren',
  Scroll = 'scroll',
}

export interface ICascaderLoadMeta {
  action: CascaderLoadAction;
}
