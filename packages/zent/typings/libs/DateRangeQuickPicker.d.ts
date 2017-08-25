/// <reference types="react" />

declare module 'zent/lib/date-range-quick-picker' {
  interface IDateRangeQuickPickerProps {
    prefix?: string
    className?: string
    onChange: Function
    value?: Array<any>
    format?: string
    chooseDays?: number
    preset?: Array<any>
    min?: string|number|Date
    max?: string|number|Date
  }

  export default class DateRangeQuickPicker extends React.Component<IDateRangeQuickPickerProps, any> {}
}
