/// <reference types="react" />

declare module 'zent/lib/datetimepicker/DatePicker' {
  interface IDatePickerProps {
    prefix?: string
    name?: string
    className?: string
    placeholder?: string
    confirmText?: string
    format?: string
    defaultTime?: string

    // onChange 返回值类型, date | number | string， 默认 string
    valueType?: 'date'|'number'|'string'
    // min 和 max 可以传入和 format 一致的字符串或者 Date 实例
    min?: string|number|Date
    max?: string|number|Date
    disabledDate?: Function
    onChange?: Function
    onClick?: Function
    onOpen?: Function
    onClose?: Function
  }

  export default class DatePicker extends React.Component<IDatePickerProps, any> {}
}

declare module 'zent/lib/datetimepicker/MonthPicker' {
  interface IMonthPickerProps {
    prefix?: string
    name?: string
    className?: string
    placeholder?: string
    confirmText?: string
    format?: string
    onChange?: Function
    onClick?: Function
    onOpen?: Function
    onClose?: Function
  }

  export default class MonthPicker extends React.Component<IMonthPickerProps, any> {}
}

declare module 'zent/lib/datetimepicker/DateRangePicker' {
  interface IDateRangePickerProps {
    type?: 'combine'|'split'
    className?: string
    prefix?: string
    placeholder?: string[]
    confirmText?: string
    valueType: 'date'|'number'|'string'
    format?: string
    defaultTime?: string
    showTime: boolean
    disabledDate?: Function
    onChange?: Function
    onClick?: Function
    onOpen?: Function
    onClose?: Function
  }

  export default class DateRangePicker extends React.Component<IDateRangePickerProps, any> {}
}
