---
title: DatePicker
subtitle: 时间选择-新
path: component/date-picker
group: 数据
---

## DatePicker

时间选择组件, 提供基础的时间、日期、日期时间筛选功能。

### API

#### 共用的日期组件 API

| 参数         | 说明                       | 类型                            | 默认值                   | 是否必须 |
| ------------ | -------------------------- | ------------------------------- | ------------------------ | -------- |
| value        | 选择的日期                 | -                               | -                        | 是       |
| onChange     | 选择日期回调函数           | -                               | -                        | 是       |
| valueType    | onChange 返回日期的类型    | string `string | number | date` | 'string'                 | 否       |
| format       | 返回的日期为字符串时的格式 | string                          | 不同组件默认值不同，下详 | 否       |
| disabledDate | 不可选日期回调             | date: date)=>{} \| {min,max}    | noop                     | 否       |
|              | min 最小可选日期           | string `string | number | date` | -                        | 否       |
|              | max 最大可选日期           | string`string | number | date`  | -                        | 否       |
| defaultDate  | 默认面板日期               | `string | number | date`        | `new Date()`             | 否       |
| disabled     | 组件禁用状态               | boolean                         | false                    | 否       |
| canClear     | 日期是否可清除             | boolean                         | true                     | 否       |
| openPanel    | 控制面板是否打开           | boolean                         | false                    | 否       |
| onOpen       | 面板打开回调               | func                            | noop                     | 否       |
| onClose      | 面板关闭回调               | func                            | noop                     | 否       |
| width        | 组件整体 width             | string                          | number                   | 否       |
| className    | 额外的 css 类              | string                          | ''                       | 否       |

**注意：**

- value 和 onChange 必须同时提供

### DatePicker 其他 API

| 参数         | 说明                       | 类型                                                      | 默认值       | 是否必须 |
| ------------ | -------------------------- | --------------------------------------------------------- | ------------ | -------- |
| value        | 选择的日期                 | `string | number | date`                                  | -            | 是       |
| onChange     | 选择日期回调函数           | (date: `string | number | date`)=>{}                      | -            | 是       |
| placeholder  | placeholder                | string                                                    | '请选择日期' | 否       |
| format       | 返回的日期为字符串时的格式 | string                                                    | `YYYY-MM-DD` | 否       |
| showTime     | 是否支持时间选择           | boolean \| {}                                             | false        | 否       |
| disabledTime | 时间禁用判断               | () => { disabledHours, disabledMinutes, disabledSeconds } | noop         | 否       |
| hideFooter   | 隐藏面板底部               | boolean                                                   | false        | 否       |

**注意：**

- showTime 为对象时，表示支持时间选择，具体属性可参考 TimePicker，包括 format、defaultValue、hourStep、minuteStep、secondStep
- disabledTime 在 showTime 开启时生效，较区别与 TimePicker 的 disabledTime,增加可选参数--选中日期
  ```
  {
    disabledHours:(date?:Date) => number[],
    disabledMinutes:(hour: number, date?:Date) => number[],
    disabledSeconds:(hour: number, minute: number, date?:Date) => number[]
  }
  ```
- showTime 时 format 值应为'YYYY-MM-DD HH:mm:ss'，使用时注意 format 参数

### WeekPicker 其他 API

| 参数         | 说明                       | 类型                                        | 默认值         | 是否必须 |
| ------------ | -------------------------- | ------------------------------------------- | -------------- | -------- |
| value        | 选择的日期                 | Array<string \| number \| date>             | -              | 是       |
| onChange     | 选择日期回调函数           | (date: Array<string \| number \| date>)=>{} | -              | 是       |
| placeholder  | placeholder                | string                                      | '请选择自然周' | 否       |
| weekStartsOn | 一周的开始                 | WeekStartsOnMap                             | 'Monday'       | 否       |
| format       | 返回的日期为字符串时的格式 | string                                      | `YYYY-MM-DD`   | 否       |
| hideFooter   | 隐藏面板底部               | boolean                                     | false          | 否       |

**注意：**

- WeekPicker 的 value 和 onChange 回调日期均为数组
- WeekStartsOnMap 枚举： 'Sunday'、'Monday'、'Tuesday'、'Wednesday'、'Thursday'、'Friday'、'Saturday'

### YearPicker/MonthPicker 其他 API

| 参数        | 说明                       | 类型                                 | 默认值                  | 是否必须 |
| ----------- | -------------------------- | ------------------------------------ | ----------------------- | -------- |
| value       | 选择的日期                 | string \| number \| date             | -                       | 是       |
| onChange    | 选择日期回调函数           | (date: string \| number \| date)=>{} | -                       | 是       |
| placeholder | placeholder                | string                               | '请选择年份/请选择月份' | 否       |
| format      | 返回的日期为字符串时的格式 | string                               | `YYYY` \| `YYYY-MM`     | 否       |

**注意：**

- YearPicker/MonthPicker 的 value 和 onChange 回调日期均为单个日期

### QuarterPicker 其他 API

| 参数        | 说明                       | 类型                                        | 默认值       | 是否必须 |
| ----------- | -------------------------- | ------------------------------------------- | ------------ | -------- |
| value       | 选择的日期                 | Array<string \| number \| date>             | -            | 是       |
| onChange    | 选择日期回调函数           | (date: Array<string \| number \| date>)=>{} | -            | 是       |
| placeholder | placeholder                | string                                      | '请选择季度' | 否       |
| format      | 返回的日期为字符串时的格式 | string                                      | `YYYY-MM`    | 否       |

**注意：**

- QuarterPicker 的 value 和 onChange 回调日期均为数组

### TimePicker API

| 参数         | 说明                                                                 | 类型                                                     | 默认值       | 是否必须 |
| ------------ | -------------------------------------------------------------------- | -------------------------------------------------------- | ------------ | -------- |
| value        | 时间                                                                 | string                                                   | -            | 是       |
| onChange     | 选择时间回调函数                                                     | (date: string )=>{}                                      | -            | 是       |
| defaultValue | 默认时间                                                             | string                                                   | -            | 否       |
| placeholder  | placeholder                                                          | string                                                   | '请选择时间' | 否       |
| format       | 返回的时间的格式 （决定面板展示的列）                                | string                                                   | `HH:mm:ss`   | 否       |
| disabledTime | 时间禁用判断（返回{disabledHours, disabledMinutes,disabledSeconds}） | () => {disabledHours, disabledMinutes, disabledSeconds } | noop         | 否       |
|              | disabledHours                                                        | () => number[]                                           | 否           |
|              | disabledMinutes（选中的小时）                                        | (hour: number) => number[];                              | 否           |
|              | disabledSeconds（选中的小时、分钟）                                  | (hour: number, minute: number) => number[];              | noop         | 否       |
| hourStep     | 小时列间隔                                                           | number                                                   | 1            | 否       |
| minuteStep   | 分钟列间隔                                                           | number                                                   | 1            | 否       |
| secondStep   | 秒列间隔                                                             | number                                                   | 1            | 否       |

### DateRangePicker/CombinedDateRangePicker API （基于 DatePicker）

| 参数        | 说明             | 类型                                        | 默认值                  | 是否必须 |
| ----------- | ---------------- | ------------------------------------------- | ----------------------- | -------- |
| value       | 选择的日期       | Array<string \| number \| date>             | -                       | 是       |
| onChange    | 选择日期回调函数 | (date: Array<string \| number \| date>)=>{} | -                       | 是       |
| placeholder | placeholder      | string[]                                    | ['开始日期','结束日期'] | 否       |
| defaultDate | 默认面板日期     | string[]                                    | -                       | 否       |

**注意：**

- showTime 为对象时，defaultValue 为数组，表示默认开始时间和默认结束时间（不填为['00:00:00','23:59:59']）
