---
title: DatePicker
path: component/datepicker
group: Data Entry
---

## DatePicker

Time pickers, provides basic time choosing functionality.

## Guides

- Included pickers：`DatePicker`, `YearPicker`, `QuarterPicker`, `MonthPicker`, `WeekPicker`, `DateRangePicker`, `TimePicker` and `TimeRangePicker`.
- `DatePicker` and `DateRangePicker` can use `showTime` to allow time selection.
- Date formats can be customized using `format`, you can find formating details at the end of this page.

## API

### Common API

| Property     | Description              | Type      | Default       | Required |
| ------------ | ------------------------ | -------------- | --------------- | ---- |
| onChange     | Callback when value changes  | func   | `noop`   |  Yes    |
| value        | Selected value             | string \| Date    |     | Yes   |
| defaultValue | Default value              | string \| Date    |     | No   |
| onClick      | Callback when click on a value | func |   |   No|
| openPanel    | Is picker visible | boolean | false  |   No|
| onOpen       | Callback when picker is opened | func |   |   No|
| onClose      | Callback when picker is closed | func |   |   No|
| disabled     | Disable picker | bool         | `false`         | No   |
| format       | Date format string   | string  |  Different pickers have different values  | No   |
| placeholder  | Placeholder text   | string  | Differenet pickers have different values   | No   |
| className    | Cusotm class name    | string         |             | No   |
| width    | width         | string \|  number         |             | No    |
| prefix       | Custom prefix  	 | string         | `'zent'`        | No   |
| confirmText  | Confirm button text     | string         | `'Confirm'`        | No   |
| popPosition  | Popup align position   | oneOf(['left', 'right'])  | 'left'    | No   |
| canClear  | can use clear the selected value   | bool  | true    | No   |
| onBeforeClear   | Clear callback, return `true` to allow, `false` to abort | func  |    | No    |

### DatePicker

| Property      | Description         | Type      | Default      | Required |
| ------------ | ------------------------ | -------------- | --------------- | ---- |
| showTime     | Show or hide time selection | bool   | `false` | No    |
| disabledTime | Callback to check if specific time is disabled | func | `noop` | No    |
| disabledDate | Callback to check if specific date is disabled  | func     | `noop`  | No    |
| format       | Date formating string        | string         | `YYYY-MM-DD`  | No    |
| min        | The minimium selectable date           | string/Date    |     | No    |
| max        | The maximum selectable date      | string/Date    |     | No    |
| valueType | Set `onChange`'s value type, one of `string`/`number`/`date` | string  | '' | No    |
| name  		| Name attribute of the input node   | string    |   | No    |
| placeholder  | Placeholder text            | string    | `Please select a date`   | No    |
| defaultTime   | Default time value        | string         | `'00:00:00'`   | No    |
| onBeforeConfirm   | Confirm callback, return `true` to allow, `false` to abort | func   |    | No    |

- `disabledDate` will be passed a date object as argument, return true if the date should be disabled. Using `max` and `min` can cover most use cases.
- If both `min`/`max` and `disabledDate` are present, `disabledDate` takes precedence.
- Return value of `disabledDate` is an object, there are three functions within this object: `disabledHour`, `disabledMinute` and `disabledSecond`.
- Only date format is allowed in `format`, time format will be appended when `showTime` is `true`.

### WeekPicker

| Property      | Description             | Type    | Default    | Required |
| ------------ | ------------------------ | -------------- | --------------- | ---- |
| startDay | Start day of a week  | number     | 1 | No    |
| disabledDate | Callback to check if date is disabled  | func     | `noop`  | No    |
| format       | Date format string        | string         | `YYYY-MM-DD`  | No    |
| min        | Minimum selectable date           | string/Date    |     | No    |
| max        | Maximum seletable date            | string/Date    |     | No    |
| valueType | Value type in `onChange`, one of `string` \| `number` \| `date`  | string     | '' | No    |
| name  		| Name attribute of input node     | string    |   | No    |
| placeholder  | Placeholder text              | string    | `Please select a week`   | No    |

### MonthPicker

| Property     | Description         | Type       | Default    | Required |
| ------------ | ------------------------ | -------------- | --------------- | ---- |
| value        | Selected month    | string/Date    | `new Date()`    | No    |
| format       | Format string  | string | `'YYYY-MM'` | No    |
| disabled     | Is disabled         | bool      | `false`   | No    |
| name 				 | Name attribute of input node   | string    |   | No    |
| placeholder  | Placeholder text     | string  | `Please select the month`   | No    |

### RangePicker

| Property     | Description     | Type    | Default   | Required |
| ------------ | ---------- | ------ | -------------- | ---- |
| showTime     | Show time selection | bool   | `false` | No    |
| value        | Selected value   | array  | `[]`           | No    |
| format       | Format string | string | `'YYYY-MM-DD'` | No    |
| disabledDate | Callback to check date is selectable | func   | `noop`   | No    |
| disabledTime | Callback to check time is selectable | func | `noop` | No    |
| min          | Minimum selectable date  | string/instanceOf(Date)  | ``   | No    |
| max          | Maximum selectable date  | string/instanceOf(Date)  | ``    | No    |
| valueType | Value type of `onChange`, one of `string`/`number`/`date`  | `string`     | '' | No    |
| placeholder  | Placeholder text     | arrayOf(string)    | `['start-date','end-date']`   | No    |
| defaultTime   | Default time value     | arrayOf(string/Date)    | `['00:00:00', '00:00:00']`   | No    |


- When `showTime` is `true`, the `min` and `max` string must have time part, e.g. `2017-01-01 11:11:11`.
- `disabledTime` has an additional argument `type` like in `DatePicker`, its value is `start` or `end`.
- `onClick(val, type)`, the `type` is the same as `disabledTime`.

### TimePicker

| Property      | Description         | Type      | Default      | Required |
| ------------ | ------------------------ | -------------- | --------------- | ---- |
| showSecond       | Whether to show second selector to not.          | boolean         | false  | No    |
| format       | Time formatting string        | string         | `HH:mm:ss`  | No    |
| min        | The minimum selectable time           | string/Date    |     | No    |
| max        | The maximum selectable time      | string/Date    |     | No    |
| valueType | Set `onChange`'s value type, one of `string`/`number`/`date` | string  | '' | No    |
| hourStep        | The hour step of the hours displayed.           | number    | 1    | No    |
| minuteStep        | The minute step of the minutes displayed.           | number    | 1    | No    |
| secondStep        | The second step of the seconds displayed.           | number    | 1    | No    |
| name  		| Name attribute of the input node   | string    |   | No    |
| placeholder  | Placeholder text            | string    | `Please select a date`   | No    |
| onBeforeConfirm   | Confirm callback, return `true` to allow, `false` to abort | func   |    | No    |

- If `format` is not changed, the actual format used will be `HH:mm` when `showSecond` is false. Otherwise, the user defined format will be used.

### TimeRangePicker

| Property      | Description         | Type      | Default      | Required |
| ------------ | ------------------------ | -------------- | --------------- | ---- |
| showSecond       | Whether to show second selector to not.          | boolean         | false  | No    |
| format       | Time formatting string        | string         | `HH:mm:ss`  | No    |
| value        | Selected value   | array  | `[]`           | No    |
| min        | The minimum selectable time           | string/Date    |     | No    |
| max        | The maximum selectable time      | string/Date    |     | No    |
| valueType | Set `onChange`'s value type, one of `string`/`number`/`date` | string  | '' | No    |
| hourStep        | The hour step of the hours displayed.           | number    | 1    | No    |
| minuteStep        | The minute step of the minutes displayed.           | number    | 1    | No    |
| secondStep        | The second step of the seconds displayed.           | number    | 1    | No    |

- If `format` is not changed, the actual format used will be 'HH:mm' when `showSecond` is false. Otherwise, the user defined format will be used.

### Format string

|          | Format character | Output |
| -------- | -------- | -------- |
| **Year**  | YY    | 70 71 ... 29 30 |
|           | YYYY  | 1970 1971 ... 2029 2030 |
| **Month** | M     | 1 2 ... 11 1 |
|           | MM    | 01 02 ... 11 12 |
|           | MMM   | Jan, Feb ... Nov, Dec |
|           | MMMM  | January, February ... November, December |
| **Date**  | D     | 1 2 ... 30 31 |
|           | DD    | 01 02 ... 30 31 |
|           | d     | 0 1 ... 5 6 |
|           | ddd   | Sun, Mon ... Fri, Sat |
|           | dddd  | Sunday, Monday ... Friday, Saturday |

<style>
	.zent-picker-demo{
		margin-bottom: 10px;
		margin-right: 10px;
	}
	.demo-subtitle{
		margin-bottom: 5px;
		font-size: 12px;
		color: #666;
	}
</style>
