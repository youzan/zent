---
order: 6
zh-CN:
	title: "禁用部分日期，可以通过传入 disabledDate 函数来实现，返回 true 表示禁用。另外，DatePicker 支持传入 min/max 属性来实现简单禁用逻辑。"
en-US:
	title: "Disabled date can be controlled by disabledDate callback, return true to disable the specific date. You can use min/max to achieve simple disable logic."
---

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
					max={now.getTime() + 7 * oneDay}
					min={now.getTime() - 7 * oneDay}
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
