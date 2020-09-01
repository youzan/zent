import * as React from 'react';

import { II18nLocaleCascader } from '../i18n';

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
  onChange: (
    value: CascaderValue[] | Array<CascaderValue[]>,
    selectedOptions: Item[] | Array<Item[]>,
    meta: ICascaderChangeMeta
  ) => void;
  loadOptions?: (
    selectedOptions: Item[] | null,
    meta: ICascaderLoadMeta
  ) => Promise<void | boolean>;
  multiple?: boolean;
  expandTrigger?: 'click' | 'hover';
  scrollable?: boolean;
  searchable?: boolean;
  async?: boolean;
  asyncFilter?: (keyword: string) => Promise<Array<Item[]>>;
  filter?: (keyword: string, items: Item[]) => boolean;
  highlight?: (keyword: string, items: Item[]) => React.ReactNode;
  limit?: number | false;
}

export interface ITabsCascaderProps<Item = ICascaderItem>
  extends ICascaderBaseProps {
  value?: CascaderValue[];
  onChange: (
    value: CascaderValue[],
    selectedOptions: Item[],
    meta: ICascaderChangeMeta
  ) => void;
  loadOptions?: (
    selectedOptions: Item[],
    meta: { action: CascaderLoadAction.LoadChildren }
  ) => Promise<void>;
  title?: string[];
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
  closePopup: () => void,
  trigger?: 'click' | 'hover'
) => void;

export type CascaderSearchClickHandler<Item = ICascaderItem> = (
  items: Item[],
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

export type CascaderScrollHandler<Item = ICascaderItem> = (
  parent: Item | null,
  level: number
) => Promise<void>;

export interface ICascaderBaseTriggerProps {
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
  clearable?: boolean;
  visible: boolean;
  onClear: () => void;
  selectedPaths?: Array<ICascaderItem[]>;
  keyword?: string;
  onKeywordChange?: (keyword: string) => void;
  // 为触发 Popover.Trigger 的 click 事件
  onClick?: (...args: any[]) => void;
  children?: React.ReactNode;
  placeholder?: string;
  searchable?: boolean;
  renderValue: (selectedPath: ICascaderItem[]) => React.ReactNode;
  i18n: II18nLocaleCascader;
  showLabels?: boolean;
  hasValue: boolean;
}
