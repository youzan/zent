---
title: DateRangeQuickPicker
path: component/component/date-range-quick-picker
group: 数据
---

## DateRangeQuickPicker

简单的时间范围选择组件, 提供前7天和前30天的快速选项.

### 使用场景

列表页 filter 区域快速选择日期使用

### API

| 参数            | 说明               | 类型             | 默认值      | 备选值     |
|------          |------              |------            |--------    |--------   |
| prefix         | 自定义前缀           | string          | `'zent'`    |           |
| className      | 自定义类名          | string            |   `''`      |              |
| preset         | 自定义快捷选项      | array             | `[{text: '最近7天', value: 7}, {text: '最近30天', value: 30}]`    |           |
| onChange       | 时间变更回调函数  | func             |         |              |
| value          | 起始、结束时间       | array           |   `[]`        |             |
| valueType | 设置 onChange 的返回值  | string     | `''` | `'string'`, `'number'` |
| format         | 返回日期字符串格式   |  string          |   `'YYYY-MM-DD'` 或 `'YYYY-MM-DD HH:mm:ss'`   |           |
| chooseDays     | 选择天数           |  number          |               |         |
| min            | 可选日期的最小值    | string/instanceOf(Date)  | `''`  |    |
| max            | 可选日期的最大值    | string/instanceOf(Date)  | `''`  |    |
