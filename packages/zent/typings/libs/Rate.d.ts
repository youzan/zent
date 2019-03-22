/// <reference types="react" />

declare module 'zent/lib/rate' {
  interface IRateProps {
    onChange?: (value: number) => void
    value?: number
    allowClear?: boolean
    allowHalf?: boolean
    character?: React.ReactNode
    className?: string
    count?: number
    disabled?: boolean
    style?: React.CSSProperties
    prefix?: string
  }

  export default class Rate extends React.Component<IRateProps, any> {}
}
