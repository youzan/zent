/// <reference types="react" />

declare module 'zent/lib/pagination' {
  interface IPaginationProps {
    current: number
    totalItem: number
    pageSize?: number
    onPageSizeChange?: (number) => any
    maxPageToShow?: number
    onChange?: (value: number) => void
    className?: string
    prefix?: string
  }

  export default class Pagination extends React.Component<IPaginationProps, any> { }
}
