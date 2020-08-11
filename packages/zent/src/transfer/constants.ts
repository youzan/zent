import { ListPropsType, PassDownGridPropsType } from './types';

export enum Direction {
  Left = 'left',
  Right = 'right',
}
export const PassDownGridProps: Array<PassDownGridPropsType> = [
  'rowKey',
  'scroll',
  'emptyLabel',
  'onRowClick',
  'sortBy',
  'sortType',
  'defaultSortType',
  'bordered',
  'ellipsis',
  'components',
  'rowProps',
  'autoStick',
  'autoStickOffsetTop',
  'disableHoverHighlight',
  'onChange',
  'loading',
  'className',
  'rowClassName',
];

export const ListProps: Array<ListPropsType> = [
  'selection',
  ...PassDownGridProps,
];
