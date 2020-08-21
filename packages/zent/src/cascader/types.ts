import * as React from 'react';
import Popover from '../popover';

export interface ICascaderBaseProps<Item = ICascaderItem> {
  options: Item[];
  changeOnSelect?: boolean;
  placeholder?: string;
  className?: string;
  popupClassName?: string;
  renderValue?: (selectedOptions: Item[]) => React.ReactNode;
  disabled?: boolean;
  clearable?: boolean;
}

export interface IMenuCascaderProps<Item = ICascaderItem>
  extends ICascaderBaseProps {
  value?: CascaderValue[] | Array<CascaderValue[]>;
  onChange?: (
    value: CascaderValue[] | Array<CascaderValue[]>,
    selectedOptions: Item[] | Array<Item[]>,
    meta: ICascaderChangeMeta
  ) => void;
  loadOptions?: (
    selectedOptions: Item[] | null,
    meta: ICascaderLoadMeta
  ) => Promise<ICascaderSearchItem[] | void | boolean>;
  multiple?: boolean;
  expandTrigger?: 'click' | 'hover';
  scrollable?: boolean;
  searchable?: boolean;
  async?: boolean;
  filter?: (keyword: string, options: Array<Item[]>) => ICascaderSearchItem[];
  limit?: number | false;
}

export interface ITabsCascaderProps<Item = ICascaderItem>
  extends ICascaderBaseProps {
  value?: CascaderValue[];
  onChange?: (
    value: CascaderValue[],
    selectedOptions: Item[],
    meta: ICascaderChangeMeta
  ) => void;
  loadOptions?: (
    selectedOptions: Item[],
    meta: { action: CascaderLoadAction.Next }
  ) => Promise<void>;
  title?: string[];
}

export interface ICascaderSearchItem {
  items: ICascaderItem[];
  display: React.ReactNode;
}

export type CascaderValue = string | number;

export interface ICascaderItem {
  value: string | number;
  label: string;
  children?: ICascaderItem[];
  disabled?: boolean;
  loading?: boolean;
  hasMore?: boolean;
  isLeaf?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  parent?: ICascaderItem | null;
}

export type CascaderHandler<Item = ICascaderItem> = (
  item: Item,
  level: number,
  popover: Popover,
  trigger?: 'click' | 'hover'
) => void;

export type CascaderSearchClickHandler<Item = ICascaderItem> = (
  items: Item[],
  popover: Popover
) => void;

export enum CascaderChangeAction {
  Clear = 'clear',
  Change = 'change',
}

export interface ICascaderChangeMeta {
  action: CascaderChangeAction;
}

export enum CascaderLoadAction {
  Next = 'next',
  Scroll = 'scroll',
  Search = 'search',
}

export interface ICascaderLoadMeta {
  action: CascaderLoadAction;
  keyword?: string;
}

export type CascaderScrollHandler<Item = ICascaderItem> = (
  closeLoading: () => void,
  parent: Item | null,
  level: number
) => Promise<void>;
