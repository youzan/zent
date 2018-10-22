/// <reference types="react" />

declare module 'zent/lib/grid' {
  interface IGridColumn {
    title: React.ReactNode
    name?: string
    width?: number | string
    bodyRender?: ((data: any, pos: number, name: string) => React.ReactNode) | React.ReactNode
    className?: string
    needSort?: boolean
    colSpan?: number
    fixed?: 'left' | 'right' | true
    onCellClick?: (data: any, event: React.MouseEvent<HTMLTableDataCellElement>) => any
    textAign?: 'left' | 'right' | 'center'
    nowrap?: boolean
    defaultText?: React.ReactNode
  }

  interface IGridOnChangeConfig {
    current: number
    sortBy: string
    sortType: 'asc' | 'desc' | ''
    pageSize: number
  }

  interface IGridProps {
    columns: Array<IGridColumn>
    datasets: Array<Object>
    rowKey?: string
    onChange?: (conf: IGridOnChangeConfig) => any
    scroll?: {
      x?: number,
      y?: number
    }
    sortBy?: string
    sortType?: 'desc' | 'asc'
    emptyLabel?: string
    selection?: {
      selectedRowKeys?: Array<any>,
      onSelect?: (selectedkeys: Array<any>, selectedRows: Array<any>, currentRow: any) => any,
      getCheckboxProps?: (data: object) => { disabled?: boolean }
    }
    expandation?: {
      isExpanded?: (record: any, index: number) => boolean,
      expandRender?: (data: any) => React.ReactNode
    }
    loading?: boolean
    className?: string
    rowClassName?: string | ((data: object, rowIndex: number) => string)
    prefix?: string
    pageInfo?: {
      current?: number
      totalItem?: number
      pageSize?: number
    }
    onRowClick?: (data: any, index: number, event: React.MouseEvent<HTMLTableRowElement>) => any
    ellipsis?: boolean
    onExpand?: (data: {expanded: boolean, data: any, event: React.MouseEvent<HTMLTableRowElement>, index: number}) => any
    components?: {
      row?: React.ReactNode
    },
    rowProps?: (data: any, index: number) => any
  }

  export default class Grid extends React.Component<IGridProps, any> { }
}

