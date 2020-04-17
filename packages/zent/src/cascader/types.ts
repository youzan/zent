import * as React from 'react';
import Popover from '../popover';

export interface ICascaderBaseProps<
  Item extends ICascaderItem = ICascaderItem
> {
  options: Item[];
  changeOnSelect?: boolean;
  placeholder?: string;
  className?: string;
  popupClassName?: string;
  displayRender?: (selectedOptions: Item[]) => React.ReactNode;
  disabled?: boolean;
  clearable?: boolean;
}

export interface IMenuCascaderProps<Item extends ICascaderItem = ICascaderItem>
  extends ICascaderBaseProps {
  value?: ICascaderValue[] | Array<ICascaderValue[]>;
  onChange?: (
    value: ICascaderValue[] | Array<ICascaderValue[]>,
    selectedOptions: Item[] | Array<Item[]>,
    meta: ICascaderChangeMeta
  ) => void;
  loadOptions?: (
    selectedOptions: Item[] | null,
    meta: ICascaderLoadMeta
  ) => Promise<Item[] | void | boolean>;
  multiple: boolean;
  expandTrigger: 'click' | 'hover';
  scrollable: boolean;
  searchable: boolean;
  async: boolean;
  filter: (keyword: string, options: Array<Item[]>) => ICascaderSearchItem[];
  limit: number | false;
}

export interface ITabsCascaderProps<Item extends ICascaderItem = ICascaderItem>
  extends ICascaderBaseProps {
  value?: ICascaderValue[];
  onChange?: (
    value: ICascaderValue[],
    selectedOptions: Item[],
    meta: ICascaderChangeMeta
  ) => void;
  loadOptions?: (
    selectedOptions: Item[],
    meta: { action: 'next' }
  ) => Promise<void>;
  title: string[];
}

export interface ICascaderSearchItem {
  items: ICascaderItem[];
  display: React.ReactNode;
}

export type ICascaderValue = string | number;

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

export type ICascaderHandler<Item extends ICascaderItem = ICascaderItem> = (
  item: Item,
  stage: number,
  popover: Popover,
  trigger?: 'click' | 'hover'
) => void;

export type ICascaderSearchClickHandler<
  Item extends ICascaderItem = ICascaderItem
> = (items: Item[], popover: Popover) => void;

export interface ICascaderChangeMeta {
  action?: 'clear' | 'change';
}

export interface ICascaderLoadMeta {
  action: 'next' | 'scroll' | 'search';
  keyword?: string;
}

export type ICascaderScrollHandler<
  Item extends ICascaderItem = ICascaderItem
> = (
  closeLoading: () => void,
  parent: Item | null,
  stage: number
) => Promise<unknown>;
