export type GridScrollPosition = 'both' | 'left' | 'right' | 'middle';

export type GridTextAlign = 'left' | 'right' | 'center';

export type GridSortType = 'desc' | 'asc' | '';

export type GridFixedType = 'left' | 'right' | true;

export type GridRowClassNameType =
  | string
  | ((data: object, rowIndex: number) => string);

export interface IGridScrollDelta {
  x?: number;
  y?: number;
}

export interface IGridColumn {
  title: React.ReactNode;
  name?: string;
  width?: number | string;
  bodyRender?:
    | ((data: any, pos: number, name: string) => React.ReactNode)
    | React.ReactNode;
  className?: string;
  needSort?: boolean;
  rowSpan?: number;
  colSpan?: number;
  fixed?: GridFixedType;
  onCellClick?: (
    data: any,
    event: React.MouseEvent<HTMLTableDataCellElement>
  ) => any;
  textAign?: GridTextAlign;
  nowrap?: boolean;
  defaultText?: React.ReactNode;
  children?: IGridColumn[];
}

export interface IGridOnChangeConfig {
  current?: number;
  sortBy?: string;
  sortType?: GridSortType;
  pageSize?: number;
}
