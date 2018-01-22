---
order: 7,
zh-CN:
	title: 通过 defaultValue 来控制面板弹出时默认显示的日期。
en-US:
	title: Setting default value.
---

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
