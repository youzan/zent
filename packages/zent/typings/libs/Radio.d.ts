/// <reference types="react" />

declare module 'zent/lib/radio' {
  interface IRadioProps {
    value: any
    disabled?: boolean
    readOnly?: boolean
    width?: number | string
    className?: string
    prefix?: string
  }

  class Radio extends React.Component<IRadioProps, any> { }

  namespace Radio {
    interface IGroupProps {
      value: any
      disabled?: boolean
      readOnly?: boolean
      onChange: React.ChangeEventHandler<HTMLInputElement>
      isValueEqual?: (value1: any, value2: any) => boolean
      className?: string
      prefix?: string
    }

    class Group extends React.Component<IGroupProps, any> { }
  }

  export default Radio
}
