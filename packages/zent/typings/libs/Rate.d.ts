/// <reference types="react" />

declare module 'zent/lib/rate' {
  interface IRateProps {
    disabled?: boolean,
    value?: number,
    count?: number,
    allowHalf?: boolean,
    allowClear?: boolean,
    style?: React.CSSProperties,
    prefix?: string,
    onChange?: (value: number) => void,
    className?: string,
    character?: React.ReactNode
  }

  export default class Rate extends React.Component<IRateProps, any> {}
}
