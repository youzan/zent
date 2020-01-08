import Popover from '../popover';

export type CascaderValue = string | number;

export interface ICascaderItem {
  id: string | number;
  title: string;
  children?: ICascaderItem[];
  isLeaf?: boolean;
}

export type CascaderHandler<Item extends ICascaderItem = ICascaderItem> = (
  item: Item,
  stage: number,
  popover: Popover,
  trigger?: 'click' | 'hover'
) => void;
