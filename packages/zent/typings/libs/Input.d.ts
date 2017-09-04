/// <reference types="react" />

declare module 'zent/lib/input' {
  interface IInputProps {
    className?: string
    prefix?: string
    type?: 'text' | 'number' | 'password' | 'textarea'
    defaultValue?: string
    value?: string
    readOnly?: boolean
    disabled?: boolean
    placeholder?: string
    addonBefore?: React.ReactNode
    addonAfter?: React.ReactNode
    autoFocus?: boolean
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>
  }

  export default class Input extends React.Component<IInputProps, any> {
    focus()
  }
}
