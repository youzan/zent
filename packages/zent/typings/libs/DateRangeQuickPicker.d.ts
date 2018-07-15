/// <reference types="react" />

declare module 'zent/lib/date-range-quick-picker' {

  interface IDateRangeQuickPickerPreset {
    text: string
    value: number
  }

  interface IDateRangeQuickPickerProps {
    prefix?: string
    className?: string
    onChange: Function
    value?: Array<number|string>
    valueType?: 'string' | 'number'
    format?: string
    chooseDays?: number
    preset?: Array<IDateRangeQuickPickerPreset>
    min?: string|number|Date
    max?: string|number|Date
  }

  export default class DateRangeQuickPicker extends React.Component<IDateRangeQuickPickerProps, any> {}
}
