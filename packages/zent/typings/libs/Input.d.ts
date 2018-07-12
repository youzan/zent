/// <reference types="react" />

declare module 'zent/lib/input' {
  interface IInputProps {
    className?: string
    prefix?: string
    width?: number
    type?: 'text' | 'number' | 'password' | 'textarea'
    defaultValue?: string
    value?: string
    readOnly?: boolean
    disabled?: boolean
    placeholder?: string
    showClear?: boolean
    addonBefore?: React.ReactNode
    addonAfter?: React.ReactNode
    autoFocus?: boolean
    autoSelect?: boolean
    initSelectionStart?: number
    initSelectionEnd?: number
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>
  }

  export default class Input extends React.Component<IInputProps, any> {
    focus()
    select(selectionStart?: number, selectionEnd?: number)
  }
}
