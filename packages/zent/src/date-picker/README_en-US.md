---
title: DatePicker
path: component/date-picker
group: Data Entry
---

## DatePicker

DateTime pickers, provides basic time choosing functionality.

## Guides

- Included pickers：`DatePicker`、`WeekPicker`、`MonthPicker`、`QuarterPicker`、`YearPicker`、`DateRangePicker`、`CombinedDateRangePicker`、`TimePicker` and `CombinedTimeRangePicker`.
- `DatePicker` 、`CombinedDateRangePicker` and `DateRangePicker` can use `showTime` to allow time selection.

### Common API

| Property     | Description                                  | Type                                   | Default                                 | Required |
| ------------ | -------------------------------------------- | -------------------------------------- | --------------------------------------- | -------- |
| value        | Selected date                                | -                                      | -                                       | Yes      |
| onChange     | Callback when the selected time is changing  | -                                      | -                                       | Yes      |
| valueType    | Set `onChange`'s value type                  | string: `'string' | 'number' | 'date'` | `'string'`                              | No       |
| format       | Format string date                           | string                                 | Different pickers have different values | No       |
| disabledDate | Specify the date that cannot be selected     | (date: Date) => {} \| {min, max}       | -                                       | No       |
|              | min: The minimium selectable date            | string(string \| number \| date)       | -                                       | No       |
|              | max: The maximum selectable date             | string(string \| number \| date)       | -                                       | No       |
| defaultDate  | Default date value                           | string \| number \| date               |                                         | No       |
| disabled     | Determine whether the DatePicker is disabled | boolean                                | false                                   | No       |
| canClear     | Whether the date can be cleared              | boolean                                | true                                    | No       |
| openPanel    | The open state of picker                     | boolean                                | false                                   | No       |
| onOpen       | Callback when the popup is popped up         | func                                   | noop                                    | No       |
| onClose      | Callback when the popup is closed            | func                                   | noop                                    | No       |
| width        | To set the width of input                    | string                                 | number                                  | No       |
| className    | Cusotm className                             | string                                 | ''                                      | No       |

### DatePicker API

| Property     | Description                                 | Type                                                                 | Default                | Required |
| ------------ | ------------------------------------------- | -------------------------------------------------------------------- | ---------------------- | -------- |
| value        | Selected date                               | string \| number \| date                                             | -                      | Yes      |
| onChange     | Callback when the selected date is changing | (date: string \| number \| date) => {}                               | -                      | Yes      |
| placeholder  | The placeholder of date input               | string                                                               | `Please select a date` | No       |
| format       | To set the date format                      | string                                                               | `YYYY-MM-DD`           | No       |
| hideFooter   | Whether to show footer                      | boolean                                                              | false                  | No       |
| showTime     | To provide an additional time selection     | boolean \| {}                                                        | false                  | No       |
| disabledTime | To specify the time that cannot be selected | (date?: Date) => { disabledHours, disabledMinutes, disabledSeconds } | noop                   | No       |

**Additional**

- When return value of `showTime` is an object, to provide an additional time selection , there are some properties within this object: format、defaultTime、hourStep、minuteStep、secondStep
- `disabledTime` only works with `showTime`
- `format` should be `YYYY-MM-DD HH:mm:ss` when `showTime` is `true`

### WeekPicker API

| Property     | Description                                 | Type                                          | Default                | Required |
| ------------ | ------------------------------------------- | --------------------------------------------- | ---------------------- | -------- |
| value        | Selected date                               | Array<string \| number \| date>               | -                      | Yes      |
| onChange     | Callback when the selected date is changing | (date: Array<string \| number \| date>) => {} | -                      | Yes      |
| placeholder  | The placeholder of date input               | string                                        | `Please select a week` | No       |
| weekStartsOn | To set the start day of a week              | WeekStartsOnMap                               | WeekStartsOnMap.Monday | No       |
| format       | To set the date format                      | string                                        | `YYYY-MM-DD`           | No       |
| hideFooter   | Whether to show footer                      | boolean                                       | false                  | No       |

**Additional**

- `value` is a range of dates in WeekPicker
- `weekStartsOnMap`: `Monday`、`Tuesday`、`Wednesday`、`Thursday`、`Friday`、`Saturday`、`Sunday`

### YearPicker/MonthPicker API

| Property    | Description                                 | Type                                   | Default                        | Required |
| ----------- | ------------------------------------------- | -------------------------------------- | ------------------------------ | -------- |
| value       | Selected date                               | string \| number \| date               | -                              | Yes      |
| onChange    | Callback when the selected date is changing | (date: string \| number \| date) => {} | -                              | Yes      |
| placeholder | The placeholder of date input               | string                                 | `Please select a year / month` | No       |
| format      | To set the date format                      | string                                 | `YYYY` \| `YYYY-MM`            | No       |

**Additional**

- `value` is a single date in YearPicker/MonthPicker

### QuarterPicker 其他 API

| Property    | Description                                 | Type                                          | Default                   | Required |
| ----------- | ------------------------------------------- | --------------------------------------------- | ------------------------- | -------- |
| value       | Selected date                               | Array<string \| number \| date>               | -                         | Yes      |
| onChange    | Callback when the selected date is changing | (date: Array<string \| number \| date>) => {} | -                         | Yes      |
| placeholder | The placeholder of date input               | string                                        | `Please select a quarter` | No       |
| format      | To set the date format                      | string                                        | `YYYY-MM`                 | No       |

**Additional**

- `value` is a single date in QuarterPicker

### TimePicker API

| Property     | Description                                                    | Type                                                     | Default                | Required |
| ------------ | -------------------------------------------------------------- | -------------------------------------------------------- | ---------------------- | -------- |
| value        | Selected time                                                  | string                                                   | -                      | Yes      |
| onChange     | Callback when the selected time is changing                    | (date: string ) => {}                                    | -                      | Yes      |
| defaultTime  | To set default time                                            | string                                                   | -                      | No       |
| placeholder  | The placeholder of time input                                  | string                                                   | `Please select a time` | No       |
| format       | To set the time format                                         | string                                                   | `HH:mm:ss`             | No       |
| disabledTime | To specify the time that cannot be selected                    | () => {disabledHours, disabledMinutes, disabledSeconds } | noop                   | No       |
|              | disabledHours: To specify the hours that cannot be selected    | () => number[]                                           | No                     |
|              | disabledMinutes:To specify the minutes that cannot be selected | (hour: number) => number[];                              | No                     |
|              | disabledSeconds:To specify the seconds that cannot be selected | (hour: number, minute: number) => number[];              | noop                   | No       |
| hourStep     | Interval between hours in picker                               | number                                                   | 1                      | No       |
| minuteStep   | Interval between minutes in picker                             | number                                                   | 1                      | No       |
| secondStep   | Interval between seconds in picker                             | number                                                   | 1                      | No       |

### DateRangePicker/CombinedDateRangePicker （Base on DatePicker）

| Property    | Description                                       | Type                                          | Default                     | Required |
| ----------- | ------------------------------------------------- | --------------------------------------------- | --------------------------- | -------- |
| value       | Selected date range                               | Array<string \| number \| date>               | -                           | Yes      |
| onChange    | Callback when the selected date range is changing | (date: Array<string \| number \| date>) => {} | -                           | Yes      |
| placeholder | The placeholder of dates input                    | [string, string]                              | `['Start date','End date']` | No       |
| defaultDate | Default date range                                | [string, string]                              | -                           | No       |

**Additional**

- When return value of `showTime` is an object, `defaultTime` should be a range of datetimes. (default: ['00:00:00','23:59:59'])
- `disabledDate(val, type)` or `disabledTime(val, type)`, the `type` is `'start' | 'end'`

### CombinedTimeRangePicker API （Base on TimePicker）

| Property    | Description                                 | Type                            | Default                     | Required |
| ----------- | ------------------------------------------- | ------------------------------- | --------------------------- | -------- |
| value       | Selected time                               | [string, string]                | -                           | Yes      |
| onChange    | Callback when the selected time is changing | (date: [string, string] ) => {} | -                           | Yes      |
| defaultTime | To set default time                         | [string, string]                | -                           | No       |
| placeholder | The placeholder of time input               | [string, string]                | `['Start time','End time']` | No       |

**注意：**

- `disabledTime(val, type)`, the `type` is `'start' | 'end'`
