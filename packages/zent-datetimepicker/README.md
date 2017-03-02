# zent-datetimepicker

[![npm version](https://img.shields.io/npm/v/zent-datetimepicker.svg?style=flat)](https://www.npmjs.com/package/zent-datetimepicker) [![downloads](https://img.shields.io/npm/dt/zent-datetimepicker.svg)](https://www.npmjs.com/package/zent-datetimepicker)

时间选择组件, 提供基础的时间、日期筛选功能.

## 使用场景

有时间、日期筛选需求的页面。

## API

### DateTimePicker

| 参数           | 说明                       | 类型             | 默认值             | 是否必须 |
| ------------ | ------------------------ | -------------- | --------------- | ---- |
| className    | 额外的 css 类                | string         | `''`            | 否    |
| prefix       | 自定义前缀                    | string         | `'zent'`        | 否    |
| value        | 默认选择日期                   | string/Date    | `new Date()`    | 否    |
| max        | 可选日期的最大值                   | string/Date    | ``    | 否    |
| min        | 可选日期的最小值                   | string/Date    | ``   | 否    |
| format       | 返回日期字符串格式                | string         | `'yyyy-mm-dd'`  | 否    |
| disabled     | 是否处于disabled 状态          | boolean        | `false`         | 否    |
| placeholder  | 提示文案                   | string    | `请选择日期`   | 否    |
| showTime     | 是否显示时间筛选 | boolean  | `false` | 否    |
| disabledTime | 时间禁用函数，范围boolean是否禁用 | func | `noop` | 否    |
| disabledDate | 判断日期是否可选函数               | func           | `noop`          | 否    |
| onChange     | 确认日期回调函数                 | func           | `noop`          | 是    |

** 注意：**
- disabledDate 函数调用时会传入一个 date 对象作为参数，用户可以自定义这个 date 是否处于禁用区间，
返回 true/false，需要特殊的禁用规则时可以通过这个函数来实现，一般情况下使用 max 和 min 就可以满足需求。
- max/min 和 disabledDate 会存在冲突，同时存在的时候以 disabledDate 的返回值为准。
- disabledTime 函数应该返回一个对象，对象中包含`disabledHour`,`disabledMinute`,`disabledSecond` 三个函数。
```
isDisabledTime = () => {
  const disabledHour = (val) => {
    return val < 12;
  };
  const disabledMinute = (val) => {
    return val > 30;
  };
  const disabledSecond = (val) => {
    return val < 20;
  };
  return {
    disabledHour,
    disabledMinute,
    disabledSecond
  };
}
```

更详细用法请看示例。


### MonthPicker

| 参数           | 说明         | 类型     | 默认值          | 是否必须 |
| ------------ | ---------- | ------ | ------------ | ---- |
| className    | 额外的 css 类  | string | `''`         | 否    |
| prefix       | 自定义前缀      | string | `'zent'`     | 否    |
| value        | 选中的月份     | string/Date    | `new Date()`    | 否    |
| format       | 返回月份字符串格式  | string | `'yyyy-mm'` | 否    |
| disabled     | 是否处于disabled 状态          | boolean        | `false`         | 否    |
| placeholder  | 提示文案          | string  | `请选择月份`   | 否    |
| onChange     | 确认日期回调函数   | func   | `noop`       | 是    |

<!--### TimePicker

| 参数           | 说明         | 类型     | 默认值          | 是否必须 |
| ------------ | ---------- | ------ | ------------ | ---- |
| className    | 额外的 css 类  | string | `''`         | 否    |
| prefix       | 自定义前缀      | string | `'zent'`     | 否    |
| disabledTime | 判断日期是否可选函数 | func   | `noop`       | 否    |
| onChange     | 确认日期回调函数   | func   | `noop`       | 是    |
| format       | 返回日期字符串格式  | string | `'HH:MM:ss'` | 否    |-->

### RangePicker

| 参数           | 说明         | 类型     | 默认值            | 是否必须 |
| ------------ | ---------- | ------ | -------------- | ---- |
| className    | 额外的 css 类  | string | `''`           | 否    |
| prefix       | 自定义前缀      | string | `'zent'`       | 否    |
| value        | 默认选择日期     | array  | `[]`           | 否    |
| format       | 返回日期字符串格式  | string | `'yyyy-mm-dd'` | 否    |
| placeholder  | 提示文案          | string    | `开始日期~结束日期`   | 否    |
| disabledDate | 判断日期是否可选函数 | func   | `noop`         | 否    |
| showTime     | 是否显示时间筛选 | boolean| `false` | 否    |
| onChange     | 确认日期回调函数   | func   | `noop`         | 是    |

**注意：**

- `disabledTime` 和 DatePicker 的类似，区别在于被调用时会传入一个 `type` 参数，值为 `start/end`，参照上面的 disabledTime 函数， RangePicker 的版本如下：
```
isDisabledRangeTime(type) {
    const disabledHour = (val) => {
      return type === 'start' ? val < 12 : val > 12;
    };
    const disabledMinute = (val) => {
      return type === 'start' ? val > 30 : val > 30;
    };
    const disabledSecond = (val) => {
      return type === 'start' ? val < 20 : val > 40;
    };
    return {
      disabledHour,
      disabledMinute,
      disabledSecond
    };
  }
  ```