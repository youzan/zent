/// <reference types="react" />

declare module 'zent/lib/number-input' {
  interface INumberInputProps {
    value?: number | string
    onChange?: (e: INumberInputChangeEvent) => any
    onBlur?: (e: INumberInputChangeEvent) => any
    showStepper?: boolean
    showCounter?: boolean
    decimal?: number
    min?: number
    max?: number
    placeholder?: string
    disabled?: boolean
    className?: string
    width?: number | string
    prefix?: string
    addonBefore?: string
    [name:string]: any;
  }

  interface INumberInputTarget extends INumberInputProps {
    type: 'number'
    value: number
  }

  interface INumberInputChangeEvent {
    target: INumberInputTarget
    preventDefault: () => void
    stopPropagation: () => void
  }

  export default class NumberInput extends React.Component<INumberInputProps, any> {}
}
