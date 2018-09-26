/// <reference types="react" />

declare module 'zent/lib/table' {

  namespace Table {

    interface IColumn {
      title: string
      name?: string
      width?: number | string
      isMoney?: boolean
      needSort?: boolean
      bodyRender?: (data: any) => React.ReactNode
      textAign?: 'left' | 'right' | 'center'
    }

    interface IChangeConfig {
      sortBy: string
      sortType: 'asc' | 'desc'
      current: number
      pageSize: number
    }

    interface IPageInfo {
      current?: number
      totalItem?: number
      pageSize?: number
      maxPageToShow?: number
    }

    interface ISelection {
      selectedRowKeys?: string[]
      isSingleSelection?: boolean
      needCrossPage?: boolean
      onSelect?: (selectedkeys: any[], selectedRows: any[], currentRow: number) => void
    }

    interface IRowConf {
      canSelect: boolean
      rowClass: string
    }

    interface IExpandation {
      isExpanded?: (record: any, index: number) => boolean
      expandRender?: (data: any) => React.ReactNode
    }

  }

  interface ITableProps {
    columns: Table.IColumn[]
    datasets: any[]
    rowKey?: string
    sortBy?: string
    sortType?: 'desc' | 'asc'
    onChange?: (conf: Table.IChangeConfig) => void
    emptyLabel?: string
    selection?: Table.ISelection
    loading?: boolean
    getRowConf?: (data: any, index: number) => Table.IRowConf
    expandation?: Table.IExpandation
    batchComponents?: any[]
    batchComponentsAutoFixed?: boolean
    autoStick?: boolean
    autoScroll?: boolean
    className?: string
    prefix?: string
    pageInfo?: Table.IPageInfo
  }

  class Table extends React.Component<ITableProps, any> { }

  export default Table;
}
