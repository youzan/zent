---
order: 3
zh-CN:
	title: 传入 showTime 同时选择时间和日期
en-US:
	title: Set showTime to true to allow time selection
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

  onChangeRange = (val) => {
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
					min={new Date()}
          value={dateValue}
          onChange={this.onChangeDate}
        />
        <br />
        <DateRangePicker
					className="zent-picker-demo"
					showTime
					min={new Date()}
					format="YYYY-MM-DD HH:mm:ss"
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
