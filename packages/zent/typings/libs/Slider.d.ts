/// <reference types="react" />

declare module 'zent/lib/slider' {
  interface ISliderProps {
    value: [number, number]
    onChange?: (value: number) => void
    range?: boolean
    min?: number
    max?: number
    step?: number
    withInput?: boolean
    dots?: boolean
    marks?: Object
    disabled?: boolean
    className?: string
    prefix?: string
  }

  export default class Slider extends React.Component<ISliderProps, any> { }
}
