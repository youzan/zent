---
title: DatePicker
subtitle: 时间选择-新
path: component/date-picker
group: 数据
---

## DatePicker

时间选择组件, 提供基础的时间、日期、日期时间筛选功能。

### API

| 参数         | 说明                       | 类型                            | 默认值                   | 是否必须 |
| ------------ | -------------------------- | ------------------------------- | ------------------------ | -------- |
| value        | 选择的日期                 | -                               | -                        | 是       |
| onChange     | 选择日期回调函数           | -                               | -                        | 是       |
| valueType    | onChange 返回日期的类型    | string `string | number | date` | 'string'                 | 否       |
| format       | 返回的日期为字符串时的格式 | string                          | 不同组件默认值不同，下详 | 否       |
| disabledDate | 不可选日期回调             | (date: date)=>{}                | noop                     | 否       |
| min          | 最小可选日期               | string `string | number | date` | -                        | 否       |
| max          | 最大可选日期               | string`string | number | date`  | -                        | 否       |
| disabled     | 组件禁用状态               | boolean                         | false                    | 否       |
| canClear     | 日期是否可清除             | boolean                         | true                     | 否       |
| openPanel    | 控制面板是否打开           | boolean                         | false                    | 否       |
| onOpen       | 面板打开回调               | func                            | noop                     | 否       |
| onClose      | 面板关闭回调               | func                            | noop                     | 否       |
| width        | 组件整体 width             | string                          | number                   | 否       |
| className    | 额外的 css 类              | string                          | ''                       | 否       |

**注意：**

- value 和 onChange 必须同时提供
