---
title: DatePicker
path: component/date-picker
group: Data Entry
---

## DatePicker

DateTime pickers, provides basic time choosing functionality.

### API

| 参数         | 说明                                           | 类型                            | 默认值                                  | 是否必须 |
| ------------ | ---------------------------------------------- | ------------------------------- | --------------------------------------- | -------- |
| value        | Selected value                                 | -                               | -                                       | Yes      |
| onChange     | Callback when value change                     | -                               | -                                       | Yes      |
| valueType    | Set `onChange`'s value type                    | string `string | number | date` | 'string'                                | No       |
| format       | Format string date                             | string                          | Different pickers have different values | No       |
| disabledDate | Callback to check if specific time is disabled | (date: date)=>{}                | noop                                    | No       |
| min          | The minimium selectable date                   | string `string | number | date` | -                                       | No       |
| max          | The maximum selectable date                    | string `string | number | date` | -                                       | No       |
| disabled     | Disable picker                                 | boolean                         | false                                   | No       |
| canClear     | Can use clear the selected value               | boolean                         | true                                    | No       |
| openPanel    | Is picker visible                              | boolean                         | false                                   | No       |
| onOpen       | Callback when picker is opened                 | func                            | noop                                    | No       |
| onClose      | Callback when picker is closed                 | func                            | noop                                    | No       |
| width        | width                                          | string                          | number                                  | No       |
| className    | Cusotm class name                              | string                          | ''                                      | No       |

**注意：**

- value 和 onChange 必须同时提供
