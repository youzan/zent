/// <reference types="react" />

declare module 'zent/lib/cascader' {
  interface ICascaderProps {
    type?: 'tabs' | 'menu'
    value?: Array<any>
    options?: Array<any>
    title?: Array<any>
    onChange?: (value: Array<any>) => any
    loadMore?: () => Promise<any>
    changeOnSelect?: boolean
    placeholder?: string
    prefix?: string
    className?: string
    popClassName?: string
    displayText?: (value: Array<any>) => React.ReactNode
  }

  export default class Cascader extends React.Component<ICascaderProps, any> {}
}
