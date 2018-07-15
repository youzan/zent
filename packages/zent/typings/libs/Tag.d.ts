/// <reference types="react" />

declare module 'zent/lib/tag' {
  interface ITagProps {
    color?: string
    outline?: boolean
    rounded?: boolean
    closable?: boolean
    onClose?: Function
    visible?: boolean
    onVisibleChange?: Function
    borderColor?: string
    bgColor?: string
    fontColor?: string
    style?: React.CSSProperties
    className?: string
    prefix?: string
  }

  export default class Tag extends React.Component<ITagProps, any> {}
}
