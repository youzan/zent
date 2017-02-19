<p>
	<a href="https://github.com/youzan/">
		<img alt="有赞logo" width="36px" src="https://img.yzcdn.cn/public_files/2017/02/09/e84aa8cbbf7852688c86218c1f3bbf17.png" alt="youzan" />
	</a>
</p>

# zent-datetimepicker

[![npm version](https://img.shields.io/npm/v/zent-datetimepicker.svg?style=flat)](https://www.npmjs.com/package/zent-datetimepicker) [![downloads](https://img.shields.io/npm/dt/zent-datetimepicker.svg)](https://www.npmjs.com/package/zent-datetimepicker)

时间选择组件, 提供基础的 Date 筛选功能.

## 使用场景

页面需要提供日期选择或者时间选择功能

## API

### TimePicker

| 参数           | 说明         | 类型     | 默认值          | 是否必须 |
| ------------ | ---------- | ------ | ------------ | ---- |
| className    | 额外的 css 类  | string | `''`         | 否    |
| prefix       | 自定义前缀      | string | `'zent'`     | 否    |
| disabledTime | 判断日期是否可选函数 | func   | `noop`       | 否    |
| onChange     | 确认日期回调函数   | func   | `noop`       | 是    |
| format       | 返回日期字符串格式  | string | `'HH:MM:ss'` | 否    |

### MonthPicker

| 参数           | 说明         | 类型     | 默认值          | 是否必须 |
| ------------ | ---------- | ------ | ------------ | ---- |
| className    | 额外的 css 类  | string | `''`         | 否    |
| prefix       | 自定义前缀      | string | `'zent'`     | 否    |
| disabledTime | 判断日期是否可选函数 | func   | `noop`       | 否    |
| onChange     | 确认日期回调函数   | func   | `noop`       | 是    |
| format       | 返回日期字符串格式  | string | `'HH:MM:ss'` | 否    |

### DateTimePicker

| 参数           | 说明                       | 类型             | 默认值             | 是否必须 |
| ------------ | ------------------------ | -------------- | --------------- | ---- |
| className    | 额外的 css 类                | string         | `''`            | 否    |
| prefix       | 自定义前缀                    | string         | `'zent'`        | 否    |
| value        | 默认选择日期                   | string/Date    | `new Date()`    | 否    |
| disabledDate | 判断日期是否可选函数               | func           | `noop`          | 否    |
| onChange     | 确认日期回调函数                 | func           | `noop`          | 是    |
| format       | 返回日期字符串格式                | string         | `'yyyy-mm-dd'`  | 否    |
| showTime     | 是否显示时间筛选以及 TimePicker 配置 | boolean/object | TimePicker 默认配置 | 否    |
| disabled     | 是否处于disabled 状态          | boolean        | `false`         | 否    |

### RangePicker

| 参数           | 说明         | 类型     | 默认值            | 是否必须 |
| ------------ | ---------- | ------ | -------------- | ---- |
| className    | 额外的 css 类  | string | `''`           | 否    |
| prefix       | 自定义前缀      | string | `'zent'`       | 否    |
| value        | 默认选择日期     | array  | `[]`           | 否    |
| disabledDate | 判断日期是否可选函数 | func   | `noop`         | 否    |
| onChange     | 确认日期回调函数   | func   | `noop`         | 是    |
| format       | 返回日期字符串格式  | string | `'yyyy-mm-dd'` | 否    |
