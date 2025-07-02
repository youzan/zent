import { PaginationPageSizeOption } from '../pagination/components/PageSizeChanger';

export type GridPaginationType = 'default' | 'lite' | 'mini';

export type GridScrollPosition = 'both' | 'left' | 'right' | 'middle';

export type GridTextAlign = 'left' | 'right' | 'center';

export type GridSortType = 'desc' | 'asc' | '';

export type GridFixedType = 'left' | 'right' | true;
export type IGridInnerFixedType = Exclude<GridFixedType, true>;

export type GridRowClassNameType<Data = any> =
  | string
  | ((data: Data, rowIndex: number) => string);

export interface IGridScrollDelta {
  x?: number;
  y?: number;
}

export interface IGridPageInfo {
  current?: number;
  total?: number;
  pageSize?: number;
  pageSizeOptions?: PaginationPageSizeOption[];
}

export type IGridColumnBodyRenderFunc<Data> = (
  data: Data,
  pos: IGridCellPos,
  name?: string
) => React.ReactNode;

export interface IGridColumn<Data = any> {
  title: React.ReactNode;
  name?: string;
  width?: React.CSSProperties['width'];
  bodyRender?: IGridColumnBodyRenderFunc<Data> | React.ReactNode;
  className?: string;
  needSort?: boolean;
  rowSpan?: number;
  colSpan?: number;
  fixed?: GridFixedType;
  onCellClick?: (
    data: Data,
    event: React.MouseEvent<HTMLTableDataCellElement>
  ) => any;
  textAlign?: GridTextAlign;
  /**
   * @deprecated
   * use `noWrap`
   */
  nowrap?: boolean;
  noWrap?: boolean;
  defaultText?: React.ReactNode;
  isValueEmpty?: (value: any) => boolean;
  children?: Array<IGridColumn<Data>>;
}

export type GridColumnContextType = Partial<IGridColumn>;

export interface IGridOnChangeConfig {
  current?: number;
  pageSize?: number;
  sortBy?: string;
  sortType?: GridSortType;
}

export interface IGridSelectionProps {
  indeterminate?: boolean;
  disabled: boolean;
  reason: React.ReactNode;
}

export interface IGridSelection<Data = any, Key = string> {
  isSingleSelection?: boolean;
  selectedRowKeys?: Key[];
  onSelect?: (
    selectedkeys: Key[],
    selectedRows: Data[],
    changeRow: Data | Data[]
  ) => any;
  getSelectionProps?: (data: Data) => Partial<IGridSelectionProps>;
  // @deprecated use getSelectionProps
  getCheckboxProps?: (data: Data) => Partial<IGridSelectionProps>;
}

export interface IGridExpandation<Data = any> {
  isExpanded?: (data: Data, index: number) => boolean;
  isExpandable?: (data: Data, index: number) => boolean;
  expandRender?: (data: Data) => React.ReactNode;
}

export type IGridRowClickHandler<Data = any> = (
  data: Data,
  index: number,
  event: React.MouseEvent<HTMLTableRowElement>
) => any;

export type IGridOnExpandHandler<Data = any> = (data: {
  expanded: boolean;
  data: Data;
  event: React.MouseEvent<HTMLSpanElement>;
  index: number;
}) => any;

export interface IGridCellPos {
  row: number;
  column: number;
  fixed?: IGridInnerFixedType;
}

export type IGridBatchRender = (
  data: any,
  position?: 'header' | 'foot'
) => React.ReactNode;
