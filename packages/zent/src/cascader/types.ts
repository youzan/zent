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
  isLeaf?: boolean;
  hasMore?: boolean;

  // custom properties
  [key: string]: unknown;
}

// todo: remove this
export interface ICascaderItem extends IPublicCascaderItem {
  children?: ICascaderItem[];
  loading?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  parent?: ICascaderItem | null;
}

export type CascaderTabsClickHandler = (
  item: ICascaderItem,
  level: number,
  closePopup: () => void
) => void;

export type CascaderHandler = (
  item: ICascaderItem,
  level: number,
  closePopup: () => void,
  trigger?: 'click' | 'hover'
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

export type CascaderScrollHandler = (
  parent: ICascaderItem | null,
  level: number
) => Promise<void>;
