---
title: DateRangeQuickPicker
path: component/component/date-range-quick-picker
group: 数据
---

## DateRangeQuickPicker

简单的时间范围选择组件, 提供前 7 天和前 30 天的快速选项.

### 使用场景

快速选择日期区间

### API

| 参数                       | 说明                           | 类型                         | 默认值                                                         | 备选值                           |
| -------------------------- | ------------------------------ | ---------------------------- | -------------------------------------------------------------- | -------------------------------- |
| onChange                   | 时间变更回调函数               | `(value, chosenDay) => void` |                                                                |                                  |
| value                      | 起始、结束时间                 | array                        | `[]`                                                           |                                  |
| preset                     | 自定义快捷选项                 | array                        | `[{text: '最近7天', value: 7}, {text: '最近30天', value: 30}]` |                                  |
| defaultSelectedPresetIndex | 默认选中的 preset 元素数组下标 | `number`                     |                                                                |                                  |
| valueType                  | 设置 onChange 的返回值         | `string`                     | `''`                                                           | `'date'`, `'number'`, `'string'` |
| format                     | 返回日期字符串格式             | `string`                     | `'YYYY-MM-DD'` 或 `'YYYY-MM-DD HH:mm:ss'`                      |                                  |
| chosenDays                 | 选择天数                       | `number` \| `array`          |                                                                |                                  |
| min                        | 可选日期的最小值               | `string` \| `Date`           | `''`                                                           |                                  |
| max                        | 可选日期的最大值               | `string` \| `Date`           | `''`                                                           |                                  |
| className                  | 自定义类名                     | `string`                     | `''`                                                           |                                  |
