/// <reference types="react" />

declare module 'zent/lib/grid' {
  interface IGridColumn {
    title: string
    name?: string
    width?: number
    textAign?: 'left' | 'right' | 'center'
    bodyRender?: ((data: any, pos: number, name: string) => React.ReactNode) | React.ReactNode
    className?: string
    needSort?: boolean
    colSpan?: number
    fixed?: 'left' | 'right' | true
    onCellClick?: (data: any, event: React.MouseEvent<HTMLTableDataCellElement>) => null
    nowrap?: boolean
  }

  interface IGridProps {
    columns: Array<IGridColumn>
    datasets: Array<Object>
    rowKey?: string
    onChange?: (conf: any) => void
    scroll?: { x?: number, y?: number }
    sortBy?: string
    sortType?: 'desc' | 'asc'
    emptyLabel?: string
    selection?: { selectedRowKeys?: Array<string>, onSelect?: (selectedkeys: string, selectedRows: Array<any>, currentRow: number) => void, getCheckboxProps?: (data: object) => { disabled?: boolean }}
    loading?: boolean
    className?: string
    rowClassName?: string
    prefix?: string
    pageInfo?: {
      current: number
      totalItem: number
      pageSize?: number
      maxPageToShow?: number
      onChange?: (value: number) => void
      className?: string
      prefix?: string
    }
    onRowClick?: (data: any, index: number, event: React.MouseEvent<HTMLTableRowElement>) => null
    ellipsis?: boolean
  }

  export default class Grid extends React.Component<IGridProps, any> { }
}

