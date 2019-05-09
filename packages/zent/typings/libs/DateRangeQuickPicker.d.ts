/// <reference types="react" />

declare module 'zent/lib/date-range-quick-picker' {

  type DateRangeQuickPickerValue = number | string | Date

  type DateRangeQuickPickerPresetValue = number | [DateRangeQuickPickerValue, DateRangeQuickPickerValue]

  interface IDateRangeQuickPickerPreset {
    text: string
    value: DateRangeQuickPickerPresetValue
  }

  interface IDateRangeQuickPickerProps {
    prefix?: string
    className?: string
    onChange: (value: [DateRangeQuickPickerValue, DateRangeQuickPickerValue], choosePresetValue?: number) => void
    value?: Array<DateRangeQuickPickerValue>
    valueType?: 'date' | 'string' | 'number'
    format?: string
    chooseDays?: DateRangeQuickPickerPresetValue
    preset?: Array<IDateRangeQuickPickerPreset>
    min?: string|number|Date
    max?: string|number|Date
  }

  export default class DateRangeQuickPicker extends React.Component<IDateRangeQuickPickerProps, any> {}
}
