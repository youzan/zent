---
title: DatePicker
path: component/date-picker
group: Data Entry
---

## DatePicker

DateTime pickers, provides basic time choosing functionality.

## Guides

- Included pickers：`DatePicker`、`WeekPicker`、`MonthPicker`、`QuarterPicker`、`YearPicker`、`DateRangePicker`、`CombinedDateRangePicker`、`TimePicker`、`TimeRangePicker` and `CombinedTimeRangePicker`.
- `DatePicker` 、`CombinedDateRangePicker` and `DateRangePicker` can use `showTime` to allow time selection.

### Common API

| Property     | Description                                                               | Type                                      | Default                                 | Required |
| ------------ | ------------------------------------------------------------------------- | ----------------------------------------- | --------------------------------------- | -------- |
| value        | Selected date                                                             | -                                         | -                                       | Yes      |
| onChange     | Callback when the selected time is changing                               | -                                         | -                                       | Yes      |
| valueType    | Set `onChange`'s value type, options:`'string'` \| `'number'` \| `'date'` | `string`                                  | `'string'`                              | No       |
| format       | Format string date                                                        | `string`                                  | Different pickers have different values | No       |
| disabledDate | Specify the date that cannot be selected                                  | `(date: Date) => {}` \| `IDisableDateMap` | -                                       | No       |
| defaultDate  | Default date value                                                        | `string` \| `Date` \| `number`            | `new Date()`                            | No       |
| disabled     | Determine whether the DatePicker is disabled                              | `boolean`                                 | `false`                                 | No       |
| canClear     | Whether the date can be cleared                                           | `boolean`                                 | `true`                                  | No       |
| openPanel    | The open state of picker                                                  | `boolean`                                 | `false`                                 | No       |
| onOpen       | Callback when the popup is popped up                                      | `function`                                | -                                       | No       |
| onClose      | Callback when the popup is closed                                         | `function`                                | -                                       | No       |
| width        | To set the width of input                                                 | `string` \| `number`                      | -                                       | No       |
| className    | Cusotm className                                                          | `string`                                  | `''`                                    | No       |

```ts
interface IDisableDateMap {
	min?: string | Date | number; // The minimium selectable date
	max?: string | Date | number; // The maximum selectable date
}
```

### DatePicker API

| Property     | Description                                 | Type                                     | Default                  | Required |
| ------------ | ------------------------------------------- | ---------------------------------------- | ------------------------ | -------- |
| value        | Selected date                               | `string` \| `Date` \| `number`           | -                        | Yes      |
| onChange     | Callback when the selected date is changing | `(date: string | Date | number) => {}` | -                        | Yes      |
| placeholder  | The placeholder of date input               | `string`                                 | `'Please select a date'` | No       |
| format       | To set the date format                      | `string`                                 | `'YYYY-MM-DD'`           | No       |
| hideFooter   | Whether to show footer                      | `boolean`                                | `false`                  | No       |
| showTime     | To provide an additional time selection     | `boolean` \| `object`                    | `false`                  | No       |
| disabledTime | To specify the time that cannot be selected | `(date?: Date) => IDisabledTimeOption`   | -                        | No       |

**Additional**

- When return value of `showTime` is an object, to provide an additional time selection, there are some properties within this object: `format`、`hourStep`、`minuteStep`、`secondStep`, but redefines the type of `defaultTime` to be `string | (date: Date) => string`
- `disabledTime` only works with `showTime`, see the details in `TimePicker`
- `format` should be `'YYYY-MM-DD HH:mm:ss'` when `showTime` is `true`

### WeekPicker API

| Property     | Description                                 | Type                                            | Default                  | Required |
| ------------ | ------------------------------------------- | ----------------------------------------------- | ------------------------ | -------- |
| value        | Selected date                               | `Array<string | Date | number>`               | -                        | Yes      |
| onChange     | Callback when the selected date is changing | `(date: Array<string | Date | number>) => {}` | -                        | Yes      |
| placeholder  | The placeholder of date input               | `string`                                        | `'Please select a week'` | No       |
| weekStartsOn | To set the start day of a week              | `WeekStartsOnMap`                               | `WeekStartsOnMap.Monday` | No       |
| format       | To set the date format                      | `string`                                        | `'YYYY-MM-DD'`           | No       |
| hideFooter   | Whether to show footer                      | `boolean`                                       | `false`                  | No       |

**Additional**

- `value` is a range of dates in `WeekPicker`
- `weekStartsOnMap`: `Monday`、`Tuesday`、`Wednesday`、`Thursday`、`Friday`、`Saturday`、`Sunday`

### YearPicker / MonthPicker API

| Property    | Description                                 | Type                                     | Default                                               | Required |
| ----------- | ------------------------------------------- | ---------------------------------------- | ----------------------------------------------------- | -------- |
| value       | Selected date                               | `string` \| `Date` \| `number`           | -                                                     | Yes      |
| onChange    | Callback when the selected date is changing | `(date: string | Date | number) => {}` | -                                                     | Yes      |
| placeholder | The placeholder of date input               | string                                   | `'Please select a year'` \| `'Please select a month'` | No       |
| format      | To set the date format                      | string                                   | `'YYYY'` \| `'YYYY-MM'`                               | No       |

**Additional**

- `value` is a single date in `YearPicker` / `MonthPicker`

### QuarterPicker API

| Property    | Description                                 | Type                                            | Default                     | Required |
| ----------- | ------------------------------------------- | ----------------------------------------------- | --------------------------- | -------- |
| value       | Selected date                               | `Array<string | Date | number>`               | -                           | Yes      |
| onChange    | Callback when the selected date is changing | `(date: Array<string | Date | number>) => {}` | -                           | Yes      |
| placeholder | The placeholder of date input               | `string`                                        | `'Please select a quarter'` | No       |
| format      | To set the date format                      | `string`                                        | `'YYYY-MM'`                 | No       |

**Additional**

- `value` is a single date in `QuarterPicker`

### TimePicker API

| Property     | Description                                 | Type                        | Default                  | Required |
| ------------ | ------------------------------------------- | --------------------------- | ------------------------ | -------- |
| value        | Selected time                               | `string`                    | -                        | Yes      |
| onChange     | Callback when the selected time is changing | `(date: string ) => {}`     | -                        | Yes      |
| defaultTime  | To set default time                         | `string`                    | -                        | No       |
| placeholder  | The placeholder of time input               | `string`                    | `'Please select a time'` | No       |
| format       | To set the time format                      | `string`                    | `'HH:mm:ss'`             | No       |
| disabledTime | To specify the time that cannot be selected | `() => IDisabledTimeOption` | -                        | No       |
| hourStep     | Interval between hours in picker            | `number`                    | `1`                      | No       |
| minuteStep   | Interval between minutes in picker          | `number`                    | `1`                      | No       |
| secondStep   | Interval between seconds in picker          | `number`                    | `1`                      | No       |

```ts
interface IDisabledTimeOption {
	disabledHours?: () => number[];
	disabledMinutes: (hour: number) => number[];;
	disabledSeconds?: (hour: number, minute: number) => number[];;
}
```

### DateRangePicker / CombinedDateRangePicker （Base on DatePicker）

| Property    | Description                                       | Type                                            | Default                     | Required |
| ----------- | ------------------------------------------------- | ----------------------------------------------- | --------------------------- | -------- |
| value       | Selected date range                               | `Array<string | Date | number>`               | -                           | Yes      |
| onChange    | Callback when the selected date range is changing | `(date: Array<string | Date | number>) => {}` | -                           | Yes      |
| placeholder | The placeholder of dates input                    | `[string, string]`                              | `['Start date','End date']` | No       |
| defaultDate | Default date range                                | `[string, string]`                              | -                           | No       |
| dateSpan    | Quick set the time span                           | `number`                                      | -                           | No       |

**Additional**

- When return value of `showTime` is an object, `defaultTime` should be `[string | (date: Date) => string, string | (date: Date) => string]`. (default: ['00:00:00','23:59:59'])
- `disabledDate(val, type)` or `disabledTime(val, type)`, the `type` is `'start' | 'end'`
- Only supports `dateSpan` for `DateRangePicker` and `CombinedDateRangePicker`.

### TimeRangePicker / CombinedTimeRangePicker API （Base on TimePicker）

| Property    | Description                                 | Type                              | Default                     | Required |
| ----------- | ------------------------------------------- | --------------------------------- | --------------------------- | -------- |
| value       | Selected time                               | `[string, string]`                | -                           | Yes      |
| onChange    | Callback when the selected time is changing | `(date: [string, string] ) => {}` | -                           | Yes      |
| defaultTime | To set default time                         | `[string, string]`                | -                           | No       |
| placeholder | The placeholder of time input               | `[string, string]`                | `['Start time','End time']` | No       |

**Additional**

- `disabledTime(val, type)`, the `type` is `'start' | 'end'`

### Functions
- Provide some useful functions: e.g. `disabledTimeWithRange`、`getDisabledDateAndTimeWithRangeProps`, that can use in your `disabledTime` handlers. You need to manually import them from `zent/es/date-picker/disabledHelpers`. 

### Format string

|           | Format character | Output                                   |
| --------- | ---------------- | ---------------------------------------- |
| **Year**  | YY               | 70 71 ... 29 30                          |
|           | YYYY             | 1970 1971 ... 2029 2030                  |
| **Month** | M                | 1 2 ... 11 1                             |
|           | MM               | 01 02 ... 11 12                          |
|           | MMM              | Jan, Feb ... Nov, Dec                    |
|           | MMMM             | January, February ... November, December |
| **Date**  | D                | 1 2 ... 30 31                            |
|           | DD               | 01 02 ... 30 31                          |
|           | d                | 0 1 ... 5 6                              |
|           | ddd              | Sun, Mon ... Fri, Sat                    |
|           | dddd             | Sunday, Monday ... Friday, Saturday      |
