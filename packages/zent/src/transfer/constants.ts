import { ListPropsType } from './types';

export enum Direction {
  Left = 'left',
  Right = 'right',
}

export const GridProps: Array<ListPropsType> = [
  'rowKey',
  'onChange',
  'scroll',
  'sortBy',
  'sortType',
  'defaultSortType',
  'emptyLabel',
  'bordered',
  'onRowClick',
  'ellipsis',
  'components',
  'rowProps',
  'autoStick',
  'autoStickOffsetTop',
  'disableHoverHighlight',
];
