## DatePicker 时间选择

时间选择组件, 提供基础的时间、日期筛选功能.

## 使用指南

当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

## 代码演示

:::demo 基础的日期、月份、时间段选择
```
import { DatePicker, MonthPicker, DateRangePicker } from 'zent'

class Demo extends Component {
  state = {
    logs: []
  }

  onChange = (val) => {
    const logs = this.state.logs.slice();
    logs.push(`你选择了：${val}`)

    this.setState({
      logs
    })
  }

  renderLogs = () => {
    const { logs } = this.state;
    console.log(logs);
    return logs.map((item, i)=>{
      return <p className="zent-picker-logs" key={i}>{item}</p>
    })
  }

  render(){
    return(
      <div>
        <DatePicker
          className="zent-picker-demo"
          onChange={this.onChange}
        />
        <br />
        <MonthPicker
          className="zent-picker-demo"
          onChange={this.onChange}
        />
        <br />
        <DateRangePicker
          className="zent-picker-demo"
          onChange={this.onChange}
          />
        <br />
        {this.renderLogs()}
      </div>
    )
  }
}

ReactDOM.render(
  <Demo/>
)
```
:::

:::demo 使用 `format` 属性来设置日期的显示格式

```
import { DatePicker, MonthPicker, DateRangePicker } from 'zent'

class Demo extends Component {
  state = {
    logs: []
  }

  onChange = (val) => {
    const logs = this.state.logs.slice();
    logs.push(`你选择了：${val}`)

    this.setState({
      logs
    })
  }

  renderLogs = () => {
    const { logs } = this.state;
    return logs.map((item, i)=>{
      return <p className="zent-picker-logs" key={i}>{item}</p>
    })
  }

  render(){
    return(
      <div>
        <DatePicker
          className="zent-picker-demo"
          format="YYYY/MM/DD"
          onChange={this.onChange}
        />
        <br />
        <MonthPicker
          className="zent-picker-demo"
          format="YYYY年MM月"
          onChange={this.onChange}
        />
        <br />
        <DateRangePicker
          className="zent-picker-demo"
          format="YYYY-MM-DD"
          onChange={this.onChange}
          />
        <br />
        {this.renderLogs()}
      </div>
    )
  }
}

ReactDOM.render(
  <Demo/>
)
```
:::

:::demo 选择时间和日期
```
import { DatePicker, MonthPicker, DateRangePicker } from 'zent'

class Demo extends Component {
  state = {
    logs: []
  }

  onChange = (val) => {
    const logs = this.state.logs.slice();
    logs.push(`你选择了：${val}`)

    this.setState({
      logs
    })
  }

  renderLogs = () => {
    const { logs } = this.state;
    return logs.map((item, i)=>{
      return <p className="zent-picker-logs" key={i}>{item}</p>
    })
  }

  render(){
    return(
      <div>
        <DatePicker
          className="zent-picker-demo"
          showTime
          onChange={this.onChange}
        />
        <br />
        <DateRangePicker
          className="zent-picker-demo"
          showTime
          onChange={this.onChange}
          />
          <br />
        {this.renderLogs()}
      </div>
    )
  }
}

ReactDOM.render(
  <Demo/>
)
```
:::

:::demo 禁用部分日期，可以通过传入 `disabledDate` 函数来实现，返回 `ture` 表示禁用。另外，DatePicker 支持传入 `min/max` 属性来实现简单禁用逻辑。
```
import { DatePicker, MonthPicker, DateRangePicker } from 'zent'

function disabledDate(val) {
  return val.getDate()%2 === 0
}

function disabledRangeDate(val, type){
  return (val.getMonth()%2 ===0)
}

function disabledRangeTime(type) {
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

class Demo extends Component {
  state = {
    logs: []
  }

  onChange = (val) => {
    const logs = this.state.logs.slice();
    logs.push(`你选择了：${val}`)

    this.setState({
      logs
    })
  }

  renderLogs = () => {
    const { logs } = this.state;
    return logs.map((item, i)=>{
      return <p className="zent-picker-logs" key={i}>{item}</p>
    })
  }

  render(){
    return(
      <div>
        <DatePicker
          className="zent-picker-demo"
          disabledDate={disabledDate}
          onChange={this.onChange}
        />
        <br />
        <DateRangePicker
          className="zent-picker-demo"
          disabledDate={disabledRangeDate}
          onChange={this.onChange}
          />
        <br />
        <DateRangePicker
          className="zent-picker-demo"
          showTime
          disabledDate={disabledRangeDate}
          disabledTime={disabledRangeTime}
          onChange={this.onChange}
          />
      <br />
        {this.renderLogs()}
      </div>
    )
  }
}

ReactDOM.render(
  <Demo/>
)
```
:::

## API

### 共用的 API
以下的属性是 DatePicker、MonthPicker、DateRangePicker 共用的。

| 参数           | 说明                       | 类型             | 默认值             | 是否必须 |
| ------------ | ------------------------ | -------------- | --------------- | ---- |
| className    | 额外的 css 类                | string         | `''`            | 否    |
| prefix       | 自定义前缀                    | string         | `'zent'`        | 否    |
| confirmText  | 确认按钮文字                    | string         | '确认'        | 否    |
| value        | 默认选择日期                   | string/Date    | ``    | 否    |
| format       | 返回日期字符串格式                | string         | `'YYYY-MM-DD'`  | 否    |
| disabled     | 是否处于 disabled 状态          | bool         | `false`         | 否    |
| placeholder  | 提示文案                   | string    | `请选择日期`   | 否    |
| onChange     | 确认日期回调函数，受控组件，value 和 onChange 必须同时提供  | func   | `noop`   | 是    |


### DateTimePicker

| 参数           | 说明                       | 类型             | 默认值             | 是否必须 |
| ------------ | ------------------------ | -------------- | --------------- | ---- |
| max        | 可选日期的最大值                   | string/Date    | ``    | 否    |
| min        | 可选日期的最小值                   | string/Date    | ``   | 否    |
| showTime     | 是否显示时间筛选 | bool   | `false` | 否    |
| disabledTime | 时间禁用函数 | func | `noop` | 否    |
| disabledDate | 判断日期是否可选函数  | func     | `noop`  | 否    |

** 注意：**
- `disabledDate` 函数调用时会传入一个 date 对象作为参数，用户可以自定义这个 date 是否处于禁用区间，
返回 true/false，需要特殊的禁用规则时可以通过这个函数来实现，一般情况下使用 `max` 和 `min` 就可以满足需求。
- `max/min` 和 `disabledDate` 会存在冲突，同时存在的时候以 `disabledDate` 的返回值为准。
- `disabledTime` 函数应该返回一个对象，对象中包含 `disabledHour`,`disabledMinute`,`disabledSecond` 三个函数。
- `format` 只需要传日期部分，时间部分当 `showTime` 为 `true` 时会自动拼接， 同 RangePicker。

更详细用法请看示例。

### MonthPicker

| 参数           | 说明         | 类型     | 默认值          | 是否必须 |
| ------------ | ---------- | ------ | ------------ | ---- |
| format       | 返回月份字符串格式  | string | `'YYYY-MM'` | 否    |
| placeholder  | 提示文案          | string  | `请选择月份`   | 否    |

### RangePicker

| 参数           | 说明         | 类型     | 默认值            | 是否必须 |
| ------------ | ---------- | ------ | -------------- | ---- |
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

<style>
  .zent-picker-demo{
    margin-bottom: 10px;
    margin-right: 10px;
  }
  .zent-picker-logs{
    padding-left: 10px;
    font-size: 12px;
    color: #666;
  }
</style>