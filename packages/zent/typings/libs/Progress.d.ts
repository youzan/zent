/// <reference types="react" />

declare module 'zent/lib/progress' {
  interface IProgressProps {
    className?: string
    prefix?: string
    type?: 'ling'|'circle'
    percent?: number
    showInfo?: boolean
    status?: 'success' | 'exception'
    format?: (precent: number) => React.ReactNode
    strokeWidth?: number
    width?: number
    bgColor?: string
    normalColor?: string
    successColor?: string
    exceptionColor?: string
    style?: React.CSSProperties
  }

  export default class Progress extends React.Component<IProgressProps, any> {}
}
