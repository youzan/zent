---
title: DatePicker
subtitle: 时间选择
path: component/datepicker
group: 数据
---

## DatePicker 时间选择

时间选择组件, 提供基础的时间、日期筛选功能.

### 使用指南

- 包含以下组件：`DatePicker`、`QuarterPicker`、`MonthPicker`、`WeekPicker`、`DateRangePicker`、`TimePicker`、`TimeRangePicker`。
- `DatePicker` 和 `DateRangePicker` 可以通过 `showTime` 属性来支持时间的选择。
- 通过 `format` 属性自定义日期字符串的格式，`format` 的详细说明见页面最后的表格。

### API

#### 共同的 API
| 参数           | 说明                       | 类型             | 默认值             | 是否必须 |
| ------------ | ------------------------ | -------------- | --------------- | ---- |
| onChange    | 选择日期回调函数，受控组件，value 和 onChange 必须同时提供  | func | `noop`   | 是    |
| value        | 默认选择日期                   | string \| Date    |     | 是    |
| defaultValue | 默认面板显示日期               | string \| Date    |     | 否    |
| onClick      | 用户点击选择日期的回调 | func |   |   否 |
| openPanel    | 面板是否打开 | boolean | false  |   否 |
| onOpen       | 面板弹出的回调 | func |   |   否 |
| onClose      | 面板关闭的回调 | func |   |   否 |
| disabled     | 是否处于 disabled 状态 | bool         | `false`         | 否    |
| format       | 返回日期字符串格式      | string         |  不同的picker默认值不同，下详  | 否    |
| placeholder  | 提示文案               | string    | 不同的picker默认值不同，下详   | 否    |
| className    | 额外的 css 类          | string         |             | 否    |
| width    | 宽度         | string \|  number         |             | 否    |
| prefix       | 自定义前缀       			 | string         | `'zent'`        | 否    |
| confirmText  | 确定按钮文字            | string         | '确定'        | 否    |
| popPosition  | pop 弹出层 align 方向   | oneOf(['left', 'right'])  | 'left'    | 否    |
| onBeforeClear   | 用户点击清除icon前的回调函数，返回 true 表示可以清除，false 表示不能清除 | func         |    | 否    |
| canClear  | 用户是否可以清除选中的值   | bool  | true    | 否   |


#### DatePicker

| 参数           | 说明                       | 类型             | 默认值             | 是否必须 |
| ------------ | ------------------------ | -------------- | --------------- | ---- |
| showTime     | 是否显示时间筛选 | bool   | `false` | 否    |
| disabledTime | 时间禁用函数 | func | `noop` | 否    |
| disabledDate | 判断日期是否可选函数  | func     | `noop`  | 否    |
| format       | 返回日期字符串格式                | string         | `YYYY-MM-DD`  | 否    |
| min        | 可选日期的最小值                   | string/Date    |     | 否    |
| max        | 可选日期的最大值                   | string/Date    |     | 否    |
| valueType | 设置 onChange 的返回值，可选值为 `string`/`number`/`date`  | string     | '' | 否    |
| name  		| input 的 name 属性            | string    |   | 否    |
| placeholder  | 提示文案                   | string    | `请选择日期`   | 否    |
| defaultTime   | 自定义时间的默认值              | string/Date         | `'00:00:00'`   | 否    |
| onBeforeConfirm   | 用户点击确认前的回调函数，返回 true 表示可以确认，false 表示不能确认 | func         |    | 否    |

**注意：**
- `disabledDate` 函数调用时会传入一个 date 对象作为参数，用户可以自定义这个 date 是否处于禁用区间，返回 true/false，需要特殊的禁用规则时可以通过这个函数来实现，一般情况下使用 `max` 和 `min` 就可以满足需求。
- `max/min` 和 `disabledDate` 会存在冲突，同时存在的时候以 `disabledDate` 的返回值为准，大于**等于** min 小于 max 可选。
- `disabledTime` 函数应该返回一个对象，对象中包含 `disabledHour`,`disabledMinute`,`disabledSecond` 三个函数。
- `format` 只需要传日期部分，时间部分当 `showTime` 为 `true` 时会自动拼接， 同 `RangePicker`。

更详细用法请看示例。


#### WeekPicker

| 参数           | 说明                       | 类型             | 默认值             | 是否必须 |
| ------------ | ------------------------ | -------------- | --------------- | ---- |
| startDay | 一周的开始日期  | number     | 1 | 否    |
| disabledDate | 判断日期是否可选函数  | func     | `noop`  | 否    |
| format       | 返回日期字符串格式                | string         | `YYYY-MM-DD`  | 否    |
| min        | 可选日期的最小值                   | string/Date    |     | 否    |
| max        | 可选日期的最大值                   | string/Date    |     | 否    |
| valueType | 设置 onChange 的返回值，可选值为 `string`/`number`/`date`  | string     | '' | 否    |
| name  		| input 的 name 属性            | string    |   | 否    |
| placeholder  | 提示文案                   | string    | `请选择周`   | 否    |

#### MonthPicker

| 参数           | 说明                       | 类型             | 默认值             | 是否必须 |
| ------------ | ------------------------ | -------------- | --------------- | ---- |
| value        | 选中的月份     | string/Date    | `new Date()`    | 否    |
| format       | 返回月份字符串格式  | string | `'YYYY-MM'` | 否    |
| disabled     | 是否处于disabled 状态          | bool      | `false`   | 否    |
| name 				 | input 的 name 属性            | string    |   | 否    |
| placeholder  | 提示文案          | string  | `请选择月份`   | 否    |


#### RangePicker

| 参数           | 说明         | 类型     | 默认值            | 是否必须 |
| ------------ | ---------- | ------ | -------------- | ---- |
| showTime     | 是否显示时间筛选 | bool   | `false` | 否    |
| value        | 默认选择日期     | array  | `[]`           | 否    |
| format       | 返回日期字符串格式  | string | `'YYYY-MM-DD'` | 否    |
| disabledDate | 判断日期是否可选函数 | func   | `noop`   | 否    |
| disabledTime | 时间禁用函数 | func | `noop` | 否    |
| min          | 可选日期的最小值   | string/Date  | ``   | 否    |
| max          | 可选日期的最大值  | string/Date  | ``    | 否    |
| valueType | 设置 onChange 的返回值，可选值为 `string`/`number`/`date`  | `string`     | '' | 否    |
| placeholder  | 提示文案          | arrayOf(string)    | `['开始日期','结束日期']`   | 否    |
| defaultTime   | 自定义时间的默认值         | arrayOf(string/Date)    | `['00:00:00', '00:00:00']`   | 否    |


**注意：**
- `showTime` 的时候，传入的 `min` 或 `max` 如果为字符串，必须有 time 部分，即 `2017-01-01 11:11:11` 种格式。
- `disabledTime` 和 `DatePicker` 的类似，区别在于被调用时会传入一个 `type` 参数，值为 `start/end`，参照上面的 `disabledTime` 函数。
- `onClick` 调用时会传入被点击的日期值和点击的类型（start/end) 作为参数，即 `onClick(val, type)`。

### TimePicker

| Property      | Description         | Type      | Default      | Required |
| ------------ | ------------------------ | -------------- | --------------- | ---- |
| showSecond       | 是否显示秒的选择          | boolean         | false  | No    |
| format       | 输入和返回值格式        | string         | `HH:mm:ss`  | No    |
| min        | 可选时间的最小值           | string/Date    |     | No    |
| max        | 可选时间的最大值      | string/Date    |     | No    |
| valueType | 设置 onChange 的返回值，可选值为 `string`/`number`/`date` | string  | '' | No    |
| hourStep        | 显示的小时步长           | number    | 1    | No    |
| minuteStep        | 显示的分钟步长           | number    | 1    | No    |
| secondStep        | 显示的秒步长           | number    | 1    | No    |
| name  		| input 的 name 属性   | string    |   | No    |
| placeholder  | 提示文案            | string    | `请选择时间`   | No    |
| onBeforeConfirm   | 用户点击确认前的回调函数，返回 true 表示可以确认，false 表示不能确认 | func   |    | No    |

- 如果用户没有更改 `format` , 实际使用的格式会根据 `showSecond` 改变，当 `showSecond` 是 false 时，实际使用 `HH:mm`. 如果传入了不同的 `format`，那么以用户传入的为准.

### TimeRangePicker

| Property      | Description         | Type      | Default      | Required |
| ------------ | ------------------------ | -------------- | --------------- | ---- |
| showSecond       | 是否显示秒的选择          | boolean         | false  | No    |
| format       | 输入和返回值格式        | string         | `HH:mm:ss`  | No    |
| value        | 已选中的时间范围   | array  | `[]`           | No    |
| min        | 可选时间的最小值           | string/Date    |     | No    |
| max        | 可选时间的最大值      | string/Date    |     | No    |
| valueType | 设置 onChange 的返回值，可选值为 `string`/`number`/`date` | string  | '' | No    |
| hourStep        | 显示的小时步长           | number    | 1    | No    |
| minuteStep        | 显示的分钟步长          | number    | 1    | No    |
| secondStep        | 显示的秒步长           | number    | 1    | No    |

- 如果用户没有更改 `format` , 实际使用的格式会根据 `showSecond` 改变，当 `showSecond` 是 false 时，实际使用 `HH:mm`. 如果传入了不同的 `format`，那么以用户传入的为准.

#### 格式化字符表

|   | 字符 | 输出 |
| -------- | -------- | -------- |
| **Year**  | YY    | 70 71 ... 29 30 |
|           | YYYY  | 1970 1971 ... 2029 2030 |
| **Month** | M     | 1 2 ... 11 1 |
|           | MM    | 01 02 ... 11 12 |
|           | MMM   | 1月, 2月 ... 11月, 12月 |
|           | MMMM  | 一月, 二月 ... 十一月, 十二月 |
| **Date**  | D     | 1 2 ... 30 31 |
|           | DD    | 01 02 ... 30 31 |
|           | d     | 0 1 ... 5 6 |
|           | ddd   | 周日, 周一 ... 周五, 周六 |
|           | dddd  | 星期日, 星期一 ... 星期五, 星期六 |

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
