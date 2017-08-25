/// <reference types="react" />

declare module 'zent/lib/select' {
  interface ISelectTrigger {
    selectedItems?: Array<any>
    extraFilter?: boolean
    open?: boolean
  }

  interface ISelectProps {
    data: Array<any>
    value?: any
    index?: any
    disabled?: boolean
    placeholder?: string
    searchPlaceholder?: string
    emptyText?: string
    trigger?: React.Component<ISelectTrigger, any>
    optionText?: string
    optionValue?: string
    onChange?: (event: { target: { type: any, value: any }, preventDefault: () => void, stopPropagation: () => void }, value: any) => void
    onDelete?: (date: any) => void
    filter?: (item: any) => boolean
    onAsyncFilter?: (keyword: string, callback: (data: any) => void) => void
    onEmptySelected?: (event: React.SyntheticEvent<HTMLSpanElement>, value: any) => void
    onOpen?: () => void
    className?: string
    prefix?: string
  }

  export default class Select extends React.Component<ISelectProps, any> { }
}
