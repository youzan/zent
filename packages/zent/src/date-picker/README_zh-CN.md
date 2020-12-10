---
title: DatePicker
subtitle: 日期时间选择
path: component/date-picker
group: 数据
---

## DatePicker

时间选择组件, 提供基础的时间、日期、日期时间筛选功能。

### 使用指南

- 包含以下组件：`DatePicker`、`WeekPicker`、`MonthPicker`、`QuarterPicker`、`YearPicker`、`DateRangePicker`、`CombinedDateRangePicker`、`TimePicker`、`TimeRangePicker` 和 `CombinedTimeRangePicker`。
- `DatePicker` 、`CombinedDateRangePicker` 和 `DateRangePicker` 可以通过 `showTime` 属性来支持时间的选择。

### API

#### 共用的日期组件 API

| 参数         | 说明                                                                  | 类型                                      | 默认值                   | 是否必须 |
| ------------ | --------------------------------------------------------------------- | ----------------------------------------- | ------------------------ | -------- |
| value        | 选择的日期                                                            | -                                         | -                        | 是       |
| onChange     | 选择日期回调函数                                                      | -                                         | -                        | 是       |
| valueType    | onChange 返回日期的类型，可选值：`'string'` \| `'number'` \| `'date'` | `string`                                  | `'string'`               | 否       |
| format       | 设置字符串日期的格式                                                  | `string`                                  | 不同组件默认值不同，下详 | 否       |
| disabledDate | 不可选择的日期                                                        | `(date: Date) => {}` \| `IDisableDateMap` | -                        | 否       |
| defaultDate  | 默认面板日期                                                          | `string` \| `Date` \| `number`            | `new Date()`             | 否       |
| disabled     | 禁用状态                                                              | `boolean`                                 | `false`                  | 否       |
| canClear     | 日期是否可清除                                                        | `boolean`                                 | `true`                   | 否       |
| openPanel    | 控制面板是否打开                                                      | `boolean`                                 | `false`                  | 否       |
| onOpen       | 面板打开的回调                                                        | `function`                                | -                        | 否       |
| onClose      | 面板关闭的回调                                                        | `function`                                | -                        | 否       |
| width        | 组件 input 的 宽度                                                    | `string` \| `number`                      | -                        | 否       |
| className    | 自定义样式类                                                          | `string`                                  | `''`                     | 否       |

```ts
interface IDisableDateMap {
	min?: string | Date | number; // 最小可选日期
	max?: string | Date | number; // 最大可选日期
}
```

**注意：**

- `value` 和 `onChange` 必须同时提供

### DatePicker 其他 API

| 参数         | 说明                 | 类型                                     | 默认值         | 是否必须 |
| ------------ | -------------------- | ---------------------------------------- | -------------- | -------- |
| value        | 选择的日期           | `string` \| `Date` \| `number`           | -              | 是       |
| onChange     | 选择日期回调函数     | `(date: string | Date | number) => {}` | -              | 是       |
| placeholder  | 输入框提示文字       | `string`                                 | `'请选择日期'` | 否       |
| format       | 设置字符串日期的格式 | `string`                                 | `'YYYY-MM-DD'` | 否       |
| hideFooter   | 隐藏面板底部         | `boolean`                                | `false`        | 否       |
| showTime     | 是否支持时间选择功能 | `boolean` \| `object`                    | `false`        | 否       |
| disabledTime | 时间禁用判断         | `(date?: Date) => IDisabledTimeOption`   | -              | 否       |

**注意：**

- `showTime` 为对象时，表示支持时间选择，具体属性可参考 `TimePicker`，包括 `format`、`hourStep`、`minuteStep`、`secondStep`，其中 `defaultTime` 类型定义为 `string | (date: Date) => string`
- `disabledTime` 在 `showTime` 开启时生效，可参考 `TimePicker` 的 `IDisabledTimeOption`
- `showTime` 时 `format` 值应为`'YYYY-MM-DD HH:mm:ss'`，使用时注意 `format` 参数

### WeekPicker 其他 API

| 参数         | 说明                 | 类型                                            | 默认值                   | 是否必须 |
| ------------ | -------------------- | ----------------------------------------------- | ------------------------ | -------- |
| value        | 选择的日期           | `Array<string | Date | number>`               | -                        | 是       |
| onChange     | 选择日期回调函数     | `(date: Array<string | Date | number>) => {}` | -                        | 是       |
| placeholder  | 输入框提示文字       | `string`                                        | `'请选择自然周'`         | 否       |
| weekStartsOn | 一周的开始           | `WeekStartsOnMap`                               | `WeekStartsOnMap.Monday` | 否       |
| format       | 设置字符串日期的格式 | `string`                                        | `'YYYY-MM-DD'`           | 否       |
| hideFooter   | 隐藏面板底部         | `boolean`                                       | `false`                  | 否       |

**注意：**

- `WeekPicker` 的 `value` 和 `onChange` 回调日期均为数组
- `WeekStartsOnMap` 枚举： `'Sunday'`、`'Monday'`、`'Tuesday'`、`'Wednesday'`、`'Thursday'`、`'Friday'`、`'Saturday'`

### YearPicker / MonthPicker 其他 API

| 参数        | 说明                 | 类型                                     | 默认值                           | 是否必须 |
| ----------- | -------------------- | ---------------------------------------- | -------------------------------- | -------- |
| value       | 选择的日期           | `string` \| `Date` \| `number`           | -                                | 是       |
| onChange    | 选择日期回调函数     | `(date: string | Date | number) => {}` | -                                | 是       |
| placeholder | 输入框提示文字       | `string`                                 | `'请选择年份'` \| `'请选择月份'` | 否       |
| format      | 设置字符串日期的格式 | `string`                                 | `'YYYY'` \| `'YYYY-MM'`          | 否       |

**注意：**

- `YearPicker` / `MonthPicker` 的 `value` 和 `onChange` 回调日期均为单个日期

### QuarterPicker 其他 API

| 参数        | 说明                 | 类型                                            | 默认值         | 是否必须 |
| ----------- | -------------------- | ----------------------------------------------- | -------------- | -------- |
| value       | 选择的日期           | `Array<string | Date | number>`               | -              | 是       |
| onChange    | 选择日期回调函数     | `(date: Array<string | Date | number>) => {}` | -              | 是       |
| placeholder | 输入框提示文字       | `string`                                        | `'请选择季度'` | 否       |
| format      | 设置字符串日期的格式 | `string`                                        | `'YYYY-MM'`    | 否       |

**注意：**

- `QuarterPicker` 的 `value` 和 `onChange` 回调日期均为数组

### TimePicker API

| 参数         | 说明                                  | 类型                        | 默认值         | 是否必须 |
| ------------ | ------------------------------------- | --------------------------- | -------------- | -------- |
| value        | 时间                                  | `string`                    | -              | 是       |
| onChange     | 选择时间回调函数                      | `(date: string ) => {}`     | -              | 是       |
| defaultTime  | 默认时间                              | `string`                    | -              | 否       |
| placeholder  | 输入框提示文字                        | `string`                    | `'请选择时间'` | 否       |
| format       | 返回的时间的格式 （决定面板展示的列） | `string`                    | `'HH:mm:ss'`   | 否       |
| disabledTime | 时间禁用判断                          | `() => IDisabledTimeOption` | -              | 否       |
| hourStep     | 小时选项间隔                          | `number`                    | `1`            | 否       |
| minuteStep   | 分钟选项间隔                          | `number`                    | `1`            | 否       |
| secondStep   | 秒选项间隔                            | `number`                    | `1`            | 否       |

```ts
interface IDisabledTimeOption {
	disabledHours?: () => number[];
	disabledMinutes: (hour: number) => number[];;
	disabledSeconds?: (hour: number, minute: number) => number[];;
}
```

### DateRangePicker / CombinedDateRangePicker API （基于 DatePicker）

| 参数        | 说明             | 类型                                            | 默认值                    | 是否必须 |
| ----------- | ---------------- | ----------------------------------------------- | ------------------------- | -------- |
| value       | 选择的日期       | `Array<string | Date | number>`               | -                         | 是       |
| onChange    | 选择日期回调函数 | `(date: Array<string | Date | number>) => {}` | -                         | 是       |
| placeholder | 输入框提示文字   | `[string, string]`                              | `['开始日期','结束日期']` | 否       |
| defaultDate | 默认面板日期     | `[string, string]`                              | -                         | 否       |
| dateSpan    | 日期跨度         | `number`                                      | -                         | 否       |

**注意：**

- `showTime` 为对象时，`defaultTime` 类型为 `[string | (date: Date) => string, string | (date: Date) => string]`，表示默认开始时间和默认结束时间（不填为['00:00:00','23:59:59']）
- `disabledDate`、`disabledTime` 回调方法的第二个参数均为`type?: 'start' | 'end'`
- `dateSpan` 仅 `DateRangePicker` 和 `CombinedDateRangePicker` 组件可用

### TimeRangePicker / CombinedTimeRangePicker API （基于 TimePicker）

| 参数        | 说明             | 类型                              | 默认值                     | 是否必须 |
| ----------- | ---------------- | --------------------------------- | -------------------------- | -------- |
| value       | 时间             | `[string, string]`                | -                          | 是       |
| onChange    | 选择时间回调函数 | `(date: [string, string] ) => {}` | -                          | 是       |
| defaultTime | 默认时间         | `[string, string]`                | -                          | 否       |
| placeholder | 输入框提示文字   | `[string, string]`                | `['开始时间', '结束时间']` | 否       |

**注意：**

- `disabledTime` 回调方法的第二个参数均为`type?: 'start' | 'end'`

### 工具函数
- 提供时间禁用的处理方法：`disabledTimeWithRange`、`getDisabledDateAndTimeWithRangeProps` 等，需要从 `zent/es/date-picker/disabledHelpers` 引入。

#### 格式化字符表

|           | 字符 | 输出                              |
| --------- | ---- | --------------------------------- |
| **Year**  | YY   | 70 71 ... 29 30                   |
|           | YYYY | 1970 1971 ... 2029 2030           |
| **Month** | M    | 1 2 ... 11 1                      |
|           | MM   | 01 02 ... 11 12                   |
|           | MMM  | 1 月, 2 月 ... 11 月, 12 月       |
|           | MMMM | 一月, 二月 ... 十一月, 十二月     |
| **Date**  | D    | 1 2 ... 30 31                     |
|           | DD   | 01 02 ... 30 31                   |
|           | d    | 0 1 ... 5 6                       |
|           | ddd  | 周日, 周一 ... 周五, 周六         |
|           | dddd | 星期日, 星期一 ... 星期五, 星期六 |
