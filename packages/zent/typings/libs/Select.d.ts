/// <reference types="react" />

declare module 'zent/lib/select' {
  namespace Select {
    export interface ITrigger {
      selectedItems?: Array<any>
      extraFilter?: boolean
      open?: boolean
    }

    export interface IProps {
      data: Array<any>
      value?: any
      index?: any
      disabled?: boolean
      placeholder?: string
      searchPlaceholder?: string
      emptyText?: string
      trigger?: React.Component<ITrigger, any>
      optionText?: string
      optionValue?: string
      onChange?: (event: { target: { type: any, value: any }, preventDefault: () => void, stopPropagation: () => void }, value: any) => void
      onDelete?: (date: any) => void
      filter?: (item: any, keyword?: string) => boolean
      maxToShow?: number
      onAsyncFilter?: (keyword: string, callback: (data: any) => void) => void
      onEmptySelected?: (event: React.SyntheticEvent<HTMLSpanElement>, value: any) => void
      onOpen?: () => void
      className?: string
      popupClassName?: string
      autoWidth?: boolean
      resetOption?: boolean
      resetText?: string
      width?: number | string
      prefix?: string
    }
  }

  class Select extends React.Component<Select.IProps, any> { }

  export default Select;
}
