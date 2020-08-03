import { GridPropsType } from './types';

export enum Direction {
  Left = 'left',
  Right = 'right',
}

export const GridProps: Array<GridPropsType> = [
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
