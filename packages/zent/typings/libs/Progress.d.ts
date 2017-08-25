/// <reference types="react" />

declare module 'zent/lib/progress' {
  interface IProgressProps {
    className?: string
    prefix?: string
    type?: 'ling'|'circle'
    percent?: number
    showInfo?: boolean
    status?: string
    format?: Function
    strokeWidth?: number
    width?: number
    style?: React.CSSProperties
  }

  export default class Progress extends React.Component<IProgressProps, any> {}
}
