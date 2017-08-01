## DatePicker 时间选择

时间选择组件, 提供基础的时间、日期筛选功能.

## 使用指南

- 包含三个组件：`DatePicker` 、`MonthPicker` 和 `RangePicker`。
- `DatePicker` 和 `RangePicker` 可以通过 `showTime` 属性来支持时间的选择。
- 通过 `format` 属性自定义日期字符串的格式，`format` 的详细说明见页面最后的表格。

## 代码演示

:::demo 基础的日期、月份、时间段选择

```jsx
import { DatePicker, MonthPicker, DateRangePicker } from 'zent'

class Demo extends Component{
  state = {
		dateValue: new Date()
  }

  onChangeDate = (val) => {
    this.setState({
      dateValue: val
    })
  }

  onChangeMonth = (val) => {
    this.setState({
      monthValue: val
    })
  }

  onChangeRange = (val) => {
    this.setState({
      rangeValue: val
    })
  }

	onChangeRangeSplit = (val) => {
		this.setState({
			rangeValue: val
		})
	}

	onOpen = (type) => {
		console.log('open',type);
	}

	onClose = (type) => {
		console.log('close', type)
	}

  render(){
    const { dateValue, monthValue, rangeValue } = this.state;

    return (
      <div>
        <DatePicker
          className="zent-picker-demo"
          value={dateValue}
          max="2020-01-01"
          onChange={this.onChangeDate}
        />
        <br />
        <MonthPicker
          className="zent-picker-demo"
          value={monthValue}
          onChange={this.onChangeMonth}
        />
        <br />
        <DateRangePicker
          className="zent-picker-demo"
          value={rangeValue}
          onChange={this.onChangeRange}
          />
				<br/>
				<DateRangePicker
					type="split"
					value={rangeValue}
					onChange={this.onChangeRangeSplit}
					onOpen={this.onOpen}
					onClose={this.onClose}
				/>
      </div>
    )
  }
}

ReactDOM.render(
  <Demo />,
  mountNode
)
```
:::

:::demo 使用 `format` 属性来设置日期的显示格式

```jsx
import { DatePicker, MonthPicker, DateRangePicker } from 'zent'

class Demo extends Component{
  state = {

  }
  
  onChangeDate = (val) => {
    this.setState({
      dateValue: val
    })
  }

  onChangeMonth = (val) => {
    this.setState({
      monthValue: val
    })
  }

  onChangeRange = (val) => {
    this.setState({
      rangeValue: val
    })
  }

	onChangeRangeSplit = (val) => {
		this.setState({
			rangeValue: val
		})
	}

  render() {
    const { dateValue, monthValue, rangeValue } = this.state;
    return (
      <div>
        <DatePicker
          className="zent-picker-demo"
          format="YYYY/MM/DD"
          value={dateValue}
          onChange={this.onChangeDate}
        />
        <br />
        <MonthPicker
          className="zent-picker-demo"
          format="YYYY年MM月"
          value={monthValue}
          onChange={this.onChangeMonth}
        />
        <br />
        <DateRangePicker
          className="zent-picker-demo"
          format="YYYY-MM-DD"
          value={rangeValue}
          onChange={this.onChangeRange}
          />
				<br />
				<DateRangePicker
				 className="zent-picker-demo"
					type="split"
					format="YYYY-MM-DD"
					value={rangeValue}
					onChange={this.onChangeRangeSplit}
				/>
        </div>
    )
  }
}

ReactDOM.render(
  <Demo />,
  mountNode
)
```
:::

:::demo 传入 `showTime` 同时选择时间和日期

```jsx
import { DatePicker, MonthPicker, DateRangePicker } from 'zent'

class Demo extends Component{
  state = {

  }

  onChangeDate = (val) => {
    this.setState({
      dateValue: val
    })
  }

  onChangeRange = (val) => {
    this.setState({
      rangeValue: val
    })
  }

	onChangeRangeSplit = (val) => {
    this.setState({
      rangeValue: val
    })
  }

  render(){
    const { dateValue, rangeValue } = this.state;
    return (
      <div>
        <DatePicker
          className="zent-picker-demo"
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={dateValue}
          onChange={this.onChangeDate}
        />
        <br />
        <DateRangePicker
          className="zent-picker-demo"
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={rangeValue}
          onChange={this.onChangeRange}
          />
				<br />
				<DateRangePicker
					className="zent-picker-demo"
					type="split"
					showTime
					format="YYYY-MM-DD HH:mm:ss"
					value={rangeValue}
					onChange={this.onChangeRangeSplit}
				/>
      </div>
    )
  }
}
ReactDOM.render(
  <Demo />,
  mountNode
)
```
:::

:::demo 通过设置 `valueType` 来指定返回值的类型，默认为 `string`，支持 `string`/`date`/`number`，默认和传入的 `value` 类型一致。

```jsx
import { DatePicker, MonthPicker, DateRangePicker } from 'zent'

class Demo extends Component{
  state = {

  }
  
  onChangeDate = (val) => {
    console.log(val)
    this.setState({
      dateValue: val
    })
  }

  onChangeRange = (val) => {
    console.log(val)
    this.setState({
      rangeValue: val
    })
  }

  render() {
    const { dateValue, rangeValue } = this.state;
    return (
       <div>
        <p className="demo-subtitle">返回时间戳</p>
        <DatePicker
          className="zent-picker-demo"
          valueType="number"
          value={dateValue}
          onChange={this.onChangeDate}
        />
        <br />
        <p className="demo-subtitle">返回 date 对象 </p>
        <DateRangePicker
          className="zent-picker-demo"
          valueType="date"
          value={rangeValue}
          onChange={this.onChangeRange}
          />
      </div>
    )
  }
}

ReactDOM.render(
  <Demo />,
  mountNode
)
```
:::

:::demo 传入 `disabled` 使输入框处于 disabled 状态

```jsx
import { DatePicker, MonthPicker, DateRangePicker } from 'zent'

ReactDOM.render(
  <div>
    <DatePicker
      className="zent-picker-demo"
      value="2017-01-01"
      disabled
    />
    <br />
    <MonthPicker
      className="zent-picker-demo"
      disabled
    />
    <br />
    <DateRangePicker
      className="zent-picker-demo"
      disabled
      />
   </div>
   , mountNode
)
```
:::

:::demo 禁用部分日期，可以通过传入 `disabledDate` 函数来实现，返回 `ture` 表示禁用。另外，DatePicker 支持传入 `min/max` 属性来实现简单禁用逻辑。

```jsx
import { DatePicker, MonthPicker, DateRangePicker } from 'zent'
const now = new Date();
const oneDay = 24 * 60 * 60 * 1000;

class Demo extends Component{
  state = {

  }

  onChangeDate = (val) => {
    this.setState({
      dateValue: val
    })
  }

  onChangeRange = (val) => {
    this.setState({
      rangeValue: val
    })
  }

  disabledDate(val) {
    return val.getDate() < 15
  }

  disabledRangeDate(val){
    return (val.getMonth()%2 ===0)
  }

  disabledRangeTime(type) {
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

  render(){
    const { dateValue, rangeValue } = this.state;
    return (
      <div>
				<DatePicker
					className="zent-picker-demo"
					max={now + 7 * oneDay}
					min={now - 7 * oneDay}
					/>
				<br />
        <DatePicker
          className="zent-picker-demo"
          disabledDate={this.disabledDate}
          value={dateValue}
          onChange={this.onChangeDate}
        />
        <br />
        <DateRangePicker
          className="zent-picker-demo"
          disabledDate={this.disabledRangeDate}
          value={rangeValue}
          onChange={this.onChangeRange}
          />
        <br />
        <DateRangePicker
          className="zent-picker-demo"
          showTime
					format="YYYY-MM-DD HH:mm:ss"
          disabledDate={this.disabledRangeDate}
          disabledTime={this.disabledRangeTime}
          value={rangeValue}
          onChange={this.onChangeRange}
          />
      </div>
    )
  }
}

ReactDOM.render(
    <Demo />
   , mountNode
)
```
:::

:::demo 通过 `defaultValue` 来控制面板弹出是默认显示的日期。

```jsx
import { DatePicker, MonthPicker, DateRangePicker } from 'zent'

class Demo extends Component{
  state = {

  }

  onChangeDate = (val) => {
    this.setState({
      dateValue: val
    })
  }

  onChangeMonth = (val) => {
    this.setState({
      monthValue: val
    })
  }

  onChangeRange = (val) => {
    this.setState({
      rangeValue: val
    })
  }

  render(){
    const { dateValue, monthValue, rangeValue, max } = this.state;
    return (
      <div>
        <DatePicker
          className="zent-picker-demo"
          value={dateValue}
          defaultValue="1990-01-01"
          onChange={this.onChangeDate}
        />
        <br />
        <MonthPicker
          className="zent-picker-demo"
          value={monthValue}
          defaultValue="2010-07"
          onChange={this.onChangeMonth}
        />
        <br />
        <DateRangePicker
          className="zent-picker-demo"
          value={rangeValue}
          defaultValue={["2016-01-01", "2017-01-01"]}
          onChange={this.onChangeRange}
          />
      </div>
    )
  }
}

ReactDOM.render(
  <Demo />,
  mountNode
)
```
:::
## API

### 共同的 API
| 参数           | 说明                       | 类型             | 默认值             | 是否必须 |
| ------------ | ------------------------ | -------------- | --------------- | ---- |
| value        | 默认选择日期                   | string/Date    |     | 否    |
| defaultValue | 默认面板显示日期               | string/Date    |     | 否    |
| onChange     | 选择日期回调函数，受控组件，value 和 onChange 必须同时提供  | func   | `noop`   | 是    |
| onClick      | 用户点击选择日期的回调 | func |   |   否 |
| openPanel    | 面板是否打开 | boolean | false  |   否 |
| onOpen       | 面板弹出的回调 | func |   |   否 |
| onClose      | 面板关闭的回调 | func |   |   否 |
| disabled     | 是否处于 disabled 状态 | bool         | `false`         | 否    |
| format       | 返回日期字符串格式      | string         |  不同的picker默认值不同，下详  | 否    |
| placeholder  | 提示文案               | string    | 不同的picker默认值不同，下详   | 否    |
| className    | 额外的 css 类          | string         |             | 否    |
| prefix       | 自定义前缀       			 | string         | `'zent'`        | 否    |
| confirmText  | 确定按钮文字            | string         | '确定'        | 否    |


### DateTimePicker

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
| defaultTime   | 自定义时间的默认值              | string         | `'00:00:00'`   | 否    |


**注意：**
- `disabledDate` 函数调用时会传入一个 date 对象作为参数，用户可以自定义这个 date 是否处于禁用区间，返回 true/false，需要特殊的禁用规则时可以通过这个函数来实现，一般情况下使用 `max` 和 `min` 就可以满足需求。
- `max/min` 和 `disabledDate` 会存在冲突，同时存在的时候以 `disabledDate` 的返回值为准，大于**等于** min 小于 max 可选。
- `disabledTime` 函数应该返回一个对象，对象中包含 `disabledHour`,`disabledMinute`,`disabledSecond` 三个函数。
- `format` 只需要传日期部分，时间部分当 `showTime` 为 `true` 时会自动拼接， 同 `RangePicker`。

更详细用法请看示例。

### MonthPicker

| 参数           | 说明                       | 类型             | 默认值             | 是否必须 |
| ------------ | ------------------------ | -------------- | --------------- | ---- |
| value        | 选中的月份     | string/Date    | `new Date()`    | 否    |
| format       | 返回月份字符串格式  | string | `'YYYY-MM'` | 否    |
| disabled     | 是否处于disabled 状态          | bool      | `false`   | 否    |
| name 				 | input 的 name 属性            | string    |   | 否    |
| placeholder  | 提示文案          | string  | `请选择月份`   | 否    |


### RangePicker

| 参数           | 说明         | 类型     | 默认值            | 是否必须 |
| ------------ | ---------- | ------ | -------------- | ---- |
| type				 | 类型，`combine`/`split` | string | `combine` | 否 |
| showTime     | 是否显示时间筛选 | bool   | `false` | 否    |
| value        | 默认选择日期     | array  | `[]`           | 否    |
| format       | 返回日期字符串格式  | string | `'YYYY-MM-DD'` | 否    |
| disabledDate | 判断日期是否可选函数 | func   | `noop`   | 否    |
| disabledTime | 时间禁用函数 | func | `noop` | 否    |
| min          | 可选日期的最小值   | string/instanceOf(Date)  | ``   | 否    |
| max          | 可选日期的最大值  | string/instanceOf(Date)  | ``    | 否    |
| valueType | 设置 onChange 的返回值，可选值为 `string`/`number`/`date`  | string     | '' | 否    |
| placeholder  | 提示文案          | array    | `['开始日期','结束日期']`   | 否    |
| defaultTime   | 自定义时间的默认值              | string         | `'00:00:00'`   | 否    |


**注意：**
- `type` 为了和老代码兼容，默认是 `combine`，但是交互方面现在是推荐使用 `split`的。
- `showTime` 的时候，传入的 `min` 或 `max` 如果为字符串，必须有 time 部分，即 `2017-01-01 11:11:11` 种格式。
- `disabledTime` 和 `DatePicker` 的类似，区别在于被调用时会传入一个 `type` 参数，值为 `start/end`，参照上面的 `disabledTime` 函数。
- `onClick` 调用时会传入被点击的日期值和点击的类型（start/end) 作为参数，即 `onClick(val, type)`。


### 格式化字符表

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
