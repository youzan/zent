/// <reference types="react" />

declare module 'zent/lib/checkbox' {
  interface ICheckBoxProps {
    checked?: boolean
    value?: any
    disabled?: boolean
    indeterminate?: boolean
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    className?: string
    prefix?: string
  }

  interface ICheckBoxGroupProps {
    value: Array<any>
    isValueEqual?: (value1: any, value2: any) => boolean
    disabled?: boolean
    onChange?: (values: Array<any>) => void
    className?: string
    prefix?: string
  }

  class CheckBox extends React.Component<ICheckBoxProps, any> { }

  module CheckBox {
    class Group extends React.Component<ICheckBoxGroupProps, any> { }
  }

  export default CheckBox
}
