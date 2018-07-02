/// <reference types="react" />

declare module 'zent/lib/cascader' {
  interface ICascaderProps {
    type?: 'tabs' | 'menu'
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
    displayText?: Function
  }

  export default class Cascader extends React.Component<ICascaderProps, any> {}
}
