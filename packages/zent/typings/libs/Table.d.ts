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

    export interface IColumn<T = any> extends Partial<IPartialColumn<T>> {
      title: string
    }

    export interface IChangeConfig {
      sortBy: string
      sortType: 'asc' | 'desc'
      current: number
      pageSize: number
    }

    export interface IPageInfo {
      current: number
      totalItem: number
      pageSize: number
      maxPageToShow: number
    }

    export interface ISingleSelection<TKey = any> {
      selectedRowKeys: TKey[]
      isSingleSelection: true
      needCrossPage: boolean
      onSelect(selectedkeys: TKey, selectedRows: any[], currentRow: number): void
    }

    export interface IMultipleSelection<TKey = any> {
      selectedRowKeys: TKey[]
      isSingleSelection: false
      needCrossPage: boolean
      onSelect(selectedkeys: TKey[], selectedRows: any[], currentRow: number): void
    }

    export type ISelection<TKey = any> = ISingleSelection<TKey> | IMultipleSelection<TKey>;

    export interface IRowConf {
      canSelect: boolean
      rowClass: string
    }

    export interface IExpandation<T = any> {
      isExpanded: (record: any, index: number) => boolean
      expandRender: (data: T) => React.ReactNode
    }

    export interface IProps<T = any, TKey = string> {
      columns: Table.IColumn<T>[]
      datasets: T[]
      rowKey?: string
      sortBy?: string
      sortType?: 'desc' | 'asc'
      onChange?: (conf: Table.IChangeConfig) => void
      emptyLabel?: string
      selection?: Partial<Table.ISelection<TKey>>
      loading?: boolean
      getRowConf?: (data: T, index: number) => Partial<Table.IRowConf>
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
