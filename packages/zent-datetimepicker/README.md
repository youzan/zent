# zent-datetimepicker

[![npm version](https://img.shields.io/npm/v/zent-datetimepicker.svg?style=flat)](https://www.npmjs.com/package/zent-datetimepicker) [![downloads](https://img.shields.io/npm/dt/zent-datetimepicker.svg)](https://www.npmjs.com/package/zent-datetimepicker)

时间选择组件, 提供基础的时间、日期筛选功能.

## API

### DateTimePicker

| 参数           | 说明                       | 类型             | 默认值             | 是否必须 |
| ------------ | ------------------------ | -------------- | --------------- | ---- |
| className    | 额外的 css 类                | string         | `''`            | 否    |
| prefix       | 自定义前缀                    | string         | `'zent'`        | 否    |
| confirmText  | 确认按钮文字                    | string         | '确认'        | 否    |
| value        | 默认选择日期                   | string/Date    | `new Date()`    | 否    |
| max        | 可选日期的最大值                   | string/Date    | ``    | 否    |
| min        | 可选日期的最小值                   | string/Date    | ``   | 否    |
| format       | 返回日期字符串格式                | string         | `'YYYY-MM-DD'`  | 否    |
| disabled     | 是否处于 disabled 状态          | bool         | `false`         | 否    |
| placeholder  | 提示文案                   | string    | `请选择日期`   | 否    |
| showTime     | 是否显示时间筛选 | bool   | `false` | 否    |
| disabledTime | 时间禁用函数 | func | `noop` | 否    |
| disabledDate | 判断日期是否可选函数  | func     | `noop`  | 否    |
| onChange     | 确认日期回调函数，受控组件，value 和 onChange 必须同时提供  | func   | `noop`   | 是    |

** 注意：**
- `disabledDate` 函数调用时会传入一个 date 对象作为参数，用户可以自定义这个 date 是否处于禁用区间，
返回 true/false，需要特殊的禁用规则时可以通过这个函数来实现，一般情况下使用 `max` 和 `min` 就可以满足需求。
- `max/min` 和 `disabledDate` 会存在冲突，同时存在的时候以 `disabledDate` 的返回值为准。
- `disabledTime` 函数应该返回一个对象，对象中包含 `disabledHour`,`disabledMinute`,`disabledSecond` 三个函数。
- `format` 只需要传日期部分，时间部分当 `showTime` 为 `true` 时会自动拼接， 同 RangePicker。

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
| confirmText  | 确认按钮文字     | string         | '确认'        | 否    |
| value        | 选中的月份     | string/Date    | `new Date()`    | 否    |
| format       | 返回月份字符串格式  | string | `'YYYY-MM'` | 否    |
| disabled     | 是否处于disabled 状态          | bool      | `false`   | 否    |
| placeholder  | 提示文案          | string  | `请选择月份`   | 否    |
| onChange     | 确认日期回调函数   | func   | `noop`       | 是    |

### RangePicker

| 参数           | 说明         | 类型     | 默认值            | 是否必须 |
| ------------ | ---------- | ------ | -------------- | ---- |
| className    | 额外的 css 类  | string | `''`           | 否    |
| prefix       | 自定义前缀      | string | `'zent'`       | 否    |
| confirmText  | 确认按钮文字     | string  | '确认'        | 否    |
| value        | 默认选择日期     | array  | `[]`           | 否    |
| max          | 可选日期的最大值  | string/instanceOf(Date)  | ``    | 否    |
| min          | 可选日期的最小值   | string/instanceOf(Date)  | ``   | 否    |
| format       | 返回日期字符串格式  | string | `'YYYY-MM-DD'` | 否    |
| placeholder  | 提示文案          | string    | `['开始日期','结束日期']`   | 否    |
| disabledDate | 判断日期是否可选函数 | func   | `noop`   | 否    |
| disabledTime | 时间禁用函数 | func | `noop` | 否    |
| showTime     | 是否显示时间筛选 | bool | `false` | 否    |
| onChange     | 确认日期回调函数   | func   | `noop`   | 是    |

**注意：**

- `showTime` 的时候，传入的 `min` 或 `max` 如果为字符串，必须有 time 部分，即 `2017-01-01 11:11:11` 种格式。
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

### Formatting Tokens
<table class="table table-striped table-bordered">
  <tbody>
    <tr>
      <th></th>
      <th>Token</th>
      <th>Output</th>
    </tr>
    <tr>
      <td><b>Month</b></td>
      <td>M</td>
      <td>1 2 ... 11 12</td>
    </tr>
    <tr>
      <td></td>
      <td>MM</td>
      <td>01 02 ... 11 12</td>
    </tr>
    <tr>
      <td></td>
      <td>MMM</td>
      <td>Jan Feb ... Nov Dec</td>
    </tr>
    <tr>
      <td></td>
      <td>MMMM</td>
      <td>January February ... November December</td>
    </tr>
    <tr>
      <td><b>Day of Month</b></td>
      <td>D</td>
      <td>1 2 ... 30 31</td>
    </tr>
    <tr>
      <td></td>
      <td>Do</td>
      <td>1st 2nd ... 30th 31st</td>
    </tr>
    <tr>
      <td></td>
      <td>DD</td>
      <td>01 02 ... 30 31</td>
    </tr>
    <tr>
      <td><b>Day of Week</b></td>
      <td>d</td>
      <td>0 1 ... 5 6</td>
    </tr>
    <tr>
      <td></td>
      <td>ddd</td>
      <td>Sun Mon ... Fri Sat</td>
    </tr>
    <tr>
      <td></td>
      <td>dddd</td>
      <td>Sunday Monday ... Friday Saturday</td>
    </tr>
    <tr>
      <td><b>Year</b></td>
      <td>YY</td>
      <td>70 71 ... 29 30</td>
    </tr>
    <tr>
      <td></td>
      <td>YYYY</td>
      <td>1970 1971 ... 2029 2030</td>
    </tr>
    <tr>
      <td><b>AM/PM</b></td>
      <td>A</td>
      <td>AM PM</td>
    </tr>
    <tr>
      <td></td>
      <td>a</td>
      <td>am pm</td>
    </tr>
    <tr>
      <td><b>Hour</b></td>
      <td>H</td>
      <td>0 1 ... 22 23</td>
    </tr>
    <tr>
      <td></td>
      <td>HH</td>
      <td>00 01 ... 22 23</td>
    </tr>
    <tr>
      <td></td>
      <td>h</td>
      <td>1 2 ... 11 12</td>
    </tr>
    <tr>
      <td></td>
      <td>hh</td>
      <td>01 02 ... 11 12</td>
    </tr>
    <tr>
      <td><b>Minute</b></td>
      <td>m</td>
      <td>0 1 ... 58 59</td>
    </tr>
    <tr>
      <td></td>
      <td>mm</td>
      <td>00 01 ... 58 59</td>
    </tr>
    <tr>
      <td><b>Second</b></td>
      <td>s</td>
      <td>0 1 ... 58 59</td>
    </tr>
    <tr>
      <td></td>
      <td>ss</td>
      <td>00 01 ... 58 59</td>
    </tr>
    <tr>
      <td><b>Fractional Second</b></td>
      <td>S</td>
      <td>0 1 ... 8 9</td>
    </tr>
    <tr>
      <td></td>
      <td>SS</td>
      <td>0 1 ... 98 99</td>
    </tr>
    <tr>
      <td></td>
      <td>SSS</td>
      <td>0 1 ... 998 999</td>
    </tr>
    <tr>
      <td><b>Timezone</b></td>
      <td>ZZ</td>
      <td>
        -0700 -0600 ... +0600 +0700
      </td>
    </tr>
  </tbody>
</table>