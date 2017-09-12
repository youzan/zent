/// <reference types="react" />

declare module 'zent/lib/table' {
  interface ITableColumn {
    title: string
    name: string
    width?: number
    textAign?: 'left' | 'right' | 'center'
    isMoney?: boolean
    bodyRender?: (data: any) => React.ReactNode
  }

  interface ITableProps {
    columns: Array<ITableColumn>
    datasets: Array<Object>
    rowKey?: string
    sortBy?: string
    sortType?: 'desc' | 'asc'
    onChange?: (conf: any) => void
    emptyLabel?: string
    selection?: { selectedRowKeys?: Array<string>, onSelect?: (selectedkeys: string, selectedRows: Array<any>, currentRow: number) => void }
    loading?: boolean
    getRowConf?: (data: Object, index: number) => { canSelect: boolean, rowClass: string }
    expandation?: { isExpanded?: boolean, expandRender?: (data: any) => React.ReactNode }
    autoStick?: boolean
    autoScroll?: boolean
    className?: string
    prefix?: string
  }

  export default class Table extends React.Component<ITableProps, any> { }
}