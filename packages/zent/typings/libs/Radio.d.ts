/// <reference types="react" />

declare module 'zent/lib/radio' {

  namespace RadioGroup {

    export interface IProps {
      value: any
      disabled?: boolean
      readOnly?: boolean
      onChange: React.ChangeEventHandler<HTMLInputElement>
      isValueEqual?: (value1: any, value2: any) => boolean
      className?: string
      prefix?: string
    }

  }

  namespace Radio {

    import Group = RadioGroup;

    export interface IProps {
      value: any
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

  class Radio extends React.Component<Radio.IProps, any> { }

  class RadioGroup extends React.Component<RadioGroup.IProps, any> { }

  export default Radio;
}
