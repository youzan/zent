/// <reference types="react" />

declare module 'zent/lib/radio' {

  namespace RadioGroup {

    export interface IProps<T = any> {
      value: T
      disabled?: boolean
      readOnly?: boolean
      onChange: React.ChangeEventHandler<HTMLInputElement>
      isValueEqual?: (value1: T, value2: T) => boolean
      className?: string
      prefix?: string
    }

  }

  namespace Radio {

    import Group = RadioGroup;

    export interface IProps<T = any> {
      value: T
      disabled?: boolean
      readOnly?: boolean
      width?: number | string
      className?: string
      prefix?: string
    }

    export {
      Group
    }

  }

  class Radio<T = any> extends React.Component<Radio.IProps<T>, any> { }

  class RadioGroup<T = any> extends React.Component<RadioGroup.IProps<T>, any> { }

  export default Radio;
}
