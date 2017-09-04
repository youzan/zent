/// <reference types="react" />

declare module 'zent/lib/cascader' {
  interface ICascaderProps {
    value?: Array<any>
    options?: Array<any>
    title?: Array<any>
    onChange?: Function
    loadMore?: () => Promise<any>
    changeOnSelect?: boolean
    placeholder?: string
    prefix?: string
    className?: string
    popClassName?: string
  }

  export default class Cascader extends React.Component<ICascaderProps, any> {}
}
