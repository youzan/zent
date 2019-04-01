import Popover from '../popover';

export type CascaderValue = string | number;

export interface ICascaderItem {
  id: string | number;
  title: string;
  children?: ICascaderItem[];
  isLeaf?: boolean;
}

export type CascaderHandler = (
  item: ICascaderItem,
  stage: number,
  popover: Popover,
  trigger?: 'click' | 'hover'
) => void;
