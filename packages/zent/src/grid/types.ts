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
  id?: string;
  key?: string;
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
  nowrap?: boolean;
  defaultText?: React.ReactNode;
  children?: Array<IGridColumn<Data>>;
  accessor?: string;
  sortDescFirst?: boolean;
  columns?: Data[];
}

export interface IGridOnChangeConfig {
  current?: number;
  pageSize?: number;
  sortBy?: string;
  sortType?: GridSortType;
}

export type IGridChangeHandler = (conf: IGridOnChangeConfig) => void;

export interface IGridSelection<Data = any> {
  type: 'checkbox' | 'radio';
  needCrossPage: boolean;
  selectedRowKeys?: string[];
  onSelect?: (
    selectedkeys: string[],
    selectedRows: Data[],
    changeRow: Data | Data[]
  ) => any;
  getCheckboxProps?: (
    data: Data
  ) => { disabled?: boolean; reason?: React.ReactNode };
}

export interface IGridExpandation<Data = any> {
  isExpanded?: (data: Data, index: number) => boolean;
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

export type IGridBatchRender = (data: any) => React.ReactNode;

export interface IGridProps<Data = any> {
  columns?: IGridColumn[];
  children?: React.ReactNode;
  datasets: Data[];
  rowKey?: string;
  onChange?: (conf: IGridOnChangeConfig) => any;
  scroll?: IGridScrollDelta;
  sortBy?: string;
  sortType?: GridSortType;
  defaultSortType?: GridSortType;
  emptyLabel?: React.ReactNode;
  selection?: IGridSelection<Data>;
  expandation?: IGridExpandation<Data>;
  loading?: boolean;
  bordered?: boolean;
  className?: string;
  rowClassName?: GridRowClassNameType<Data>;
  pageInfo?: IGridPageInfo;
  paginationType?: GridPaginationType;
  onRowClick?: IGridRowClickHandler<Data>;
  ellipsis?: boolean;
  onExpand?: IGridOnExpandHandler<Data>;
  components?: {
    row?: React.ComponentType;
  };
  rowProps?: (data: Data, index: number) => any;
  batchRender?: IGridBatchRender;
  stickyBatch?: boolean;
  autoStick?: boolean;
  autoStickOffsetTop?: number;
  disableHoverHighlight?: boolean; // scroll时hover每次都会重绘，提供属性去禁用，这时hover就没有样式了
}

export interface IGridFixedPosition {
  fixed?: GridFixedType;
  left?: number;
  right?: number;
  isLastLeftFixedColumn?: boolean;
  isFirstRightFixedColumn?: boolean;
}
