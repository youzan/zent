/// <reference types="react" />

declare module 'zent/lib/input' {
  interface IInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    className?: string
    prefix?: string
    width?: number | string
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

    // textarea
    maxLength?: number
    showCount?: boolean
    autoSize?: boolean
  }

  export default class Input extends React.Component<IInputProps, any> {
    focus(): void
    select(selectionStart?: number, selectionEnd?: number): void
  }
}
