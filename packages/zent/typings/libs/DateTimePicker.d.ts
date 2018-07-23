/// <reference types="react" />

type FormattableDateValue = string | number | Date
type RangeType = 'START' | 'END'

interface IDisabledTime {
  disabledHour: (val: number) => boolean
  disabledMinute: (val: number) => boolean
  disabledSecond: (val: number) => boolean
}

interface IDateCommonProps {
  prefix?: string,
  name?: string,
  className?: string,
  placeholder?: string,
  confirmText?: string,
  width?: string | number,
  format?: string,
  openPanel?: boolean,
  defaultTime?: string,
  // onChange 返回值类型, date | number | string， 默认 string
  valueType?: 'date' | 'number' | 'string',
  popPosition?: 'left' | 'right',
  // min 和 max 可以传入和 format 一致的字符串或者 Date 实例
  min?: FormattableDateValue,
  max?: FormattableDateValue,
  disabledDate?: (val: Date) => boolean,
  onChange?: (val: FormattableDateValue) => void,
  onClick?: (val: FormattableDateValue, type?: RangeType) => void,
  onOpen?: (type?: RangeType) => void,
  onClose?: (type?: RangeType) => void,
  canClear?: boolean
}

declare module 'zent/lib/datetimepicker/DatePicker' {
  interface IDatePickerProps extends IDateCommonProps {
    showTime?: boolean,
    disabledTime?: () => IDisabledTime,
    onBeforeConfirm?: () => boolean,
    onBeforeClear?: () => boolean,
  }

  export default class DatePicker extends React.Component<IDatePickerProps, any> {}
}

declare module 'zent/lib/datetimepicker/MonthPicker' {
  interface IMonthPickerProps extends IDateCommonProps {
    value?: string|Date,
    disabled?: boolean,
  }

  export default class MonthPicker extends React.Component<IMonthPickerProps, any> {}
}

declare module 'zent/lib/datetimepicker/DateRangePicker' {
  interface IDateRangePickerProps extends IDateCommonProps {
    showTime: boolean
    value?: Array<string|number|Date>,
    disabledTime?: (type: RangeType) => IDisabledTime,
  }

  export default class DateRangePicker extends React.Component<IDateRangePickerProps, any> {}
}

declare module 'zent/lib/datetimepicker/WeekPicker' {
  interface IWeekPickerProps extends IDateCommonProps {
    startDay?: number
  }

  export default class WeekPicker extends React.Component<IWeekPickerProps, any> {}
}

declare module 'zent/lib/datetimepicker/YearPicker' {
  interface IYearPickerProps extends IDateCommonProps {
    needConfirm?: boolean
  }

  export default class YearPicker extends React.Component<IYearPickerProps, any> {}
}

declare module 'zent/lib/datetimepicker/TimePicker' {
  interface ITimePickerProps extends IDateCommonProps {
    isFooterVisble?: boolean,
    showSecond?: boolean,
    hourStep?: number,
    minuteStep?: number,
    secondStep?: number,
    onBeforeConfirm?: () => boolean,
    onBeforeClear?: () => boolean,
  }

  export default class TimePicker extends React.Component<ITimePickerProps, any> {}
}

declare module 'zent/lib/datetimepicker/TimeRangePicker' {
  interface ITimeRangePickerProps extends IDateCommonProps {
    isFooterVisble?: boolean,
    showSecond?: boolean,
    hourStep?: number,
    minuteStep?: number,
    secondStep?: number,
  }

  export default class TimeRangePicker extends React.Component<ITimeRangePickerProps, any> {}
}

declare module 'zent/lib/datetimepicker/QuarterPicker' {
  interface IQuarterPickerProps extends IDateCommonProps {
  }

  export default class QuarterPicker extends React.Component<IQuarterPickerProps, any> {}
}
