/// <reference types="react" />

declare module 'zent/lib/table' {
  interface ITableColumn {
    title: string
    name: string
    width?: number
    isMoney?: boolean
    needSort?: boolean
    bodyRender?: (data: any) => React.ReactNode
    textAign?: 'left' | 'right' | 'center'
  }

  type TableChangeConfig = {
    sortBy: string
    sortType: 'asc' | 'desc'
    current: number
    pageSize: number
  }

  interface ITableProps {
    columns: Array<ITableColumn>
    datasets: Array<Object>
    rowKey?: string
    sortBy?: string
    sortType?: 'desc' | 'asc'
    onChange?: (conf: TableChangeConfig) => void
    emptyLabel?: string
    selection?: {
      selectedRowKeys?: Array<string>
      isSingleSelection?: boolean
      needCrossPage?: boolean
      onSelect?: (selectedkeys: string, selectedRows: Array<any>, currentRow: number) => void
    }
    loading?: boolean
    getRowConf?: (data: Object, index: number) => { canSelect: boolean, rowClass: string }
    expandation?: {
      isExpanded?: (record: any, index: number) => boolean
      expandRender?: (data: any) => React.ReactNode
    }
    batchComponents?: Array<any>
    batchComponentsAutoFixed?: boolean
    autoStick?: boolean
    autoScroll?: boolean
    className?: string
    prefix?: string
    pageInfo?: {
      current?: number
      totalItem?: number
      pageSize?: number
      maxPageToShow?: number
    }
  }

  export default class Table extends React.Component<ITableProps, any> { }
}
