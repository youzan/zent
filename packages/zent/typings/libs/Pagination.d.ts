/// <reference types="react" />

declare module 'zent/lib/pagination' {

  namespace Pagination {

    export interface IProps {
      current: number
      totalItem: number
      pageSize?: number
      onPageSizeChange?: (pageSize: number) => any
      maxPageToShow?: number
      onChange?: (value: number) => void
      className?: string
      prefix?: string
    }

  }

  class Pagination extends React.Component<Pagination.IProps, any> { }

  export default Pagination;
}
