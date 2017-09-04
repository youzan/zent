/// <reference types="react" />

declare module 'zent/lib/number-input' {
  interface INumberInputProps {
    value?: number
    onChange?: (e: INumberInputChangeEvent) => any
    showStepper?: boolean
    decimal?: number
    min?: number
    max?: number
    placeholder?: string
    disabled?: boolean
    className?: string
    prefix?: string
  }

  interface INumberInputTarget extends INumberInputProps {
    type: 'number'
    value: number
  }

  interface INumberInputChangeEvent {
    target: INumberInputTarget
    preventDefault: Function
    stopPropagation: Function
  }

  export default class NumberInput extends React.Component<INumberInputProps, any> {}
}
