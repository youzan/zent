/// <reference types="react" />

declare module 'zent/lib/grid' {

  namespace Grid {

    interface IPartialColumn<T = any> {
      title: React.ReactNode
      name: string
      width: number | string
      bodyRender: ((data: T, pos: number, name: string) => React.ReactNode) | React.ReactNode
      className: string
      needSort: boolean
      colSpan: number
      fixed: 'left' | 'right' | true
      onCellClick: (data: T, event: React.MouseEvent<HTMLTableDataCellElement>) => any
      textAign: 'left' | 'right' | 'center'
      nowrap: boolean
      defaultText: React.ReactNode
    }

    export interface IColumn<T = any> extends Partial<IPartialColumn<T>> {
      title: React.ReactNode
    }

    export interface IChangeConfig {
      current: number
      sortBy: string
      sortType: 'asc' | 'desc' | ''
      pageSize: number
    }

    export interface IPageInfo {
      current: number
      totalItem: number
      pageSize: number
    }

    export interface IScroll {
      x: number
      y: number
    }

    export interface ISelection<TKey = any, T = any> {
      selectedRowKeys?: TKey[],
      onSelect?: (selectedkeys: TKey[], selectedRows: T[], currentRow: T) => any,
      getCheckboxProps?: (data: object) => { disabled?: boolean }
    }

    export interface IExpandation<T = any> {
      isExpanded?: (record: T, index: number) => boolean,
      expandRender?: (data: T) => React.ReactNode
    }

    export interface IOnExpandData<T = any> {
      expanded: boolean
      data: T
      event: React.MouseEvent<HTMLTableRowElement>
      index: number
    }

    export interface IProps<T = any, TKey = string> {
      columns: Grid.IColumn<T>[]
      datasets: T[]
      rowKey?: string
      onChange?: (conf: Grid.IChangeConfig) => void
      scroll?: Partial<Grid.IScroll>
      sortBy?: string
      sortType?: 'desc' | 'asc'
      emptyLabel?: string
      selection?: Partial<Grid.ISelection<TKey, T>>
      expandation?: Grid.IExpandation<T>
      loading?: boolean
      className?: string
      rowClassName?: string | ((data: T, rowIndex: number) => string)
      prefix?: string
      pageInfo?: Partial<Grid.IPageInfo>;
      onRowClick?: (data: T, index: number, event: React.MouseEvent<HTMLTableRowElement>) => any
      ellipsis?: boolean
      onExpand?: (data: IOnExpandData<T>) => any
      components?: {
        row?: React.ReactNode
      },
      rowProps?: (data: T, index: number) => any
    }
  }

  class Grid<T = any, TKey = string> extends React.Component<Grid.IProps<T, TKey>, any> { }

  export default Grid;
}
