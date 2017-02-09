# @youzan/zent-datetimepicker

zent-datetimepicker, React 时间选择组件，目前提供最简单的 Date 筛选功能。

[![version][version-image]][download-url]
[![download][download-image]][download-url]

[version-image]: http://npm.qima-inc.com/badge/v/@youzan/zent-datetimepicker.svg?style=flat-square
[download-image]: http://npm.qima-inc.com/badge/d/@youzan/zent-datetimepicker.svg?style=flat-square
[download-url]: http://npm.qima-inc.com/package/@youzan/zent-datetimepicker

## Scene

日期选择和时间选择

## API

### TimePicker

| 参数 | 说明 | 类型 | 默认值 | 备选值 | 是否必须 |
|------|------|------|--------|--------|-------|
| className | 额外的 css 类 | string | '' | '' | 否 |
| prefix | 自定义前缀 | string | 'zent' | '' | 否 |
| disabledTime | 判断日期是否可选函数 | func | noop | null | 否 |
| onChange | 确认日期回调函数 | func | noop | null | 是 | 
| format | 返回日期字符串格式 | string | 'HH:MM:ss' | '' | 否 |

### MonthPicker

| 参数 | 说明 | 类型 | 默认值 | 备选值 | 是否必须 |
|------|------|------|--------|--------|-------|
| className | 额外的 css 类 | string | '' | '' | 否 |
| prefix | 自定义前缀 | string | 'zent' | '' | 否 |
| disabledTime | 判断日期是否可选函数 | func | noop | null | 否 |
| onChange | 确认日期回调函数 | func | noop | null | 是 | 
| format | 返回日期字符串格式 | string | 'HH:MM:ss' | '' | 否 |

### DateTimePicker

| 参数 | 说明 | 类型 | 默认值 | 备选值 | 是否必须 |
|------|------|------|--------|--------|-------|
| className | 额外的 css 类 | string | '' | '' | 否 |
| prefix | 自定义前缀 | string | 'zent' | '' | 否 |
| value | 默认选择日期 | string/Date  | new Date() | '' | 否 |
| disabledDate | 判断日期是否可选函数 | func | noop | null | 否 |
| onChange | 确认日期回调函数 | func | noop | null | 是 | 
| format | 返回日期字符串格式 | string | 'yyyy-mm-dd' | '' | 否 |
| showTime | 是否显示时间筛选以及 TimePicker 配置 | boolean/object | TimePicker 默认配置 | '' | 否 |
| disabled | 是否处于disabled 状态 | boolean | false | '' | 否 |

### RangePicker

| 参数 | 说明 | 类型 | 默认值 | 备选值 | 是否必须 |
|------|------|------|--------|--------|-------|
| className | 额外的 css 类 | string | '' | '' | 否 |
| prefix | 自定义前缀 | string | 'zent' | '' | 否 |
| value | 默认选择日期 | array  | [] | '' | 否 |
| disabledDate | 判断日期是否可选函数 | func | noop | null | 否 |
| onChange | 确认日期回调函数 | func | noop | null | 是 | 
| format | 返回日期字符串格式 | string | 'yyyy-mm-dd' | '' | 否 |