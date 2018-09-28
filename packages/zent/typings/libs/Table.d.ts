/// <reference types="react" />

declare module 'zent/lib/table' {

  namespace Table {

    interface IPartialColumn<T = any> {
      name: string
      width: number | string
      isMoney: boolean
      needSort: boolean
      bodyRender: (data: T) => React.ReactNode
      textAign: 'left' | 'right' | 'center'
    }

    interface IColumn<T = any> extends Partial<IPartialColumn<T>> {
      title: string
    }

    interface IChangeConfig {
      sortBy: string
      sortType: 'asc' | 'desc'
      current: number
      pageSize: number
    }

    interface IPageInfo {
      current: number
      totalItem: number
      pageSize: number
      maxPageToShow: number
    }

    interface ISingleSelection<TKey = any> {
      selectedRowKeys: TKey[]
      isSingleSelection: true
      needCrossPage: boolean
      onSelect(selectedkeys: TKey, selectedRows: any[], currentRow: number): void
    }

    interface IMultipleSelection<TKey = any> {
      selectedRowKeys: TKey[]
      isSingleSelection: false
      needCrossPage: boolean
      onSelect(selectedkeys: TKey[], selectedRows: any[], currentRow: number): void
    }

    type ISelection<TKey = any> = ISingleSelection<TKey> | IMultipleSelection<TKey>;

    interface IRowConf {
      canSelect: boolean
      rowClass: string
    }

    interface IExpandation<T = any> {
      isExpanded: (record: any, index: number) => boolean
      expandRender: (data: T) => React.ReactNode
    }

    interface IProps<T = any, TKey = string> {
      columns: Table.IColumn<T>[]
      datasets: T[]
      rowKey?: string
      sortBy?: string
      sortType?: 'desc' | 'asc'
      onChange?: (conf: Table.IChangeConfig) => void
      emptyLabel?: string
      selection?: Partial<Table.ISelection<TKey>>
      loading?: boolean
      getRowConf?: (data: T, index: number) => Table.IRowConf
      expandation?: Partial<Table.IExpandation<T>>
      batchComponents?: any[]
      batchComponentsAutoFixed?: boolean
      autoStick?: boolean
      autoScroll?: boolean
      className?: string
      prefix?: string
      pageInfo?: Partial<Table.IPageInfo>
    }

  }

  class Table<T = any, TKey = string> extends React.Component<Table.IProps<T, TKey>, any> { }

  export default Table;
}
