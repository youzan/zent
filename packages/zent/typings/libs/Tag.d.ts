/// <reference types="react" />

declare module 'zent/lib/tag' {
  interface ITagProps {
    color?: string
    outline?: boolean
    rounded?: boolean
    borderColor?: string
    bgColor?: string
    fontColor?: string
    closable?: boolean
    onClose?: Function
    children?: React.ReactChild
    style?: React.CSSProperties
    className?: string
    prefix?: string
  }

  export default class Tag extends React.Component<ITagProps, any> {}
}
