import { IGridProps } from '../grid';

export enum Direction {
  left = 'left',
  right = 'right',
}

export const pickGridProps: Array<keyof IGridProps> = [
  'onChange',
  'scroll',
  'sortBy',
  'sortType',
  'defaultSortType',
  'emptyLabel',
  'expandation',
  'loading',
  'ellipsis',
  'onExpand',
  'components',
  'rowProps',
  'batchRender',
  'stickyBatch',
  'autoStick',
  'autoStickOffsetTop',
  'disableHoverHighlight',
];
