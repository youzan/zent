/// <reference types="react" />

declare module 'zent/lib/search-input' {
  interface ISearchInputProps {
    className?: string
    prefix?: string
    defaultValue?: string
    value?: string
    readOnly?: boolean
    disabled?: boolean
    placeholder?: string
    addonBefore?: React.ReactNode
    addonAfter?: React.ReactNode
    autoFocus?: boolean
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onPressEnter?: React.KeyboardEvent<HTMLInputElement>
  }

  export default class SearchInput extends React.Component<ISearchInputProps, any> {}
}
