/// <reference types="react" />

declare module 'zent/lib/cascader' {

  namespace Cascader {

    export interface IItem<T = any> {
      id: T;
      title: any;
    }

    export interface IOption<T = any> extends IItem<T> {
      children?: IOption<T>[]
    }

    export interface ILoadMoreResolvedItem<T = any> extends IItem<T> {
      isLeaf: boolean
    }

    export interface IProps<T = any> {
      type?: 'tabs' | 'menu'
      value?: Array<T>
      options?: Array<IOption<T>>
      title?: Array<React.ReactNode>
      onChange?: (value: Array<IItem>) => any
      loadMore?: () => Promise<ILoadMoreResolvedItem<T>>
      changeOnSelect?: boolean
      placeholder?: string
      prefix?: string
      className?: string
      popClassName?: string
      displayText?: (value: Array<IItem>) => React.ReactNode
      expandTrigger?: 'click' | 'hover'
    }

  }

  class Cascader<T = any> extends React.Component<Cascader.IProps<T>, any> { }

  export default Cascader;
}
