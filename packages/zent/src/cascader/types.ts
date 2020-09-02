import * as React from 'react';

export interface ICascaderBaseProps {
  options: ICascaderItem[];
  changeOnSelect?: boolean;
  placeholder?: string;
  className?: string;
  popupClassName?: string;
  renderValue?: (selectedOptions: ICascaderItem[]) => React.ReactNode;
  disabled?: boolean;
  clearable?: boolean;
}

export type CascaderValue = string | number;

export interface ICascaderItem {
  value: string | number;
  label: string;

  // internal
  children?: ICascaderItem[];
  disabled?: boolean;
  loading?: boolean;
  hasMore?: boolean;
  isLeaf?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  parent?: ICascaderItem | null;

  // custom
  [key: string]: unknown;
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
