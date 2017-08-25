/// <reference types="react" />

declare module 'zent/lib/radio' {
  interface IRadioProps {
    value: any
    className?: string
    prefix?: string
  }

  export class Radio extends React.Component<IRadioProps, any> { }

  export namespace Radio {
    interface IGroupProps {
      value: any
      onChange: React.ChangeEventHandler<HTMLInputElement>
      isValueEqual?: (value1: any, value2: any) => boolean
      className?: string
      prefix?: string
    }

    class Group extends React.Component<IGroupProps, any> { }
  }
}
