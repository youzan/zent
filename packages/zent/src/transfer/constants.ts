export enum Direction {
  Left = 'left',
  Right = 'right',
}

// 透传到Grid组件的prop类型
export const PassDownGridProps = [
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
] as const;

export const ListProps = ['selection', ...PassDownGridProps] as const;

export type PassDownGridPropsType = typeof PassDownGridProps[number];

export type ListPropsType = typeof ListProps[number];
