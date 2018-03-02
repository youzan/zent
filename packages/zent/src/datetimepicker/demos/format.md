---
order: 2
zh-CN:
	title: 使用 format 属性来设置日期的显示格式
en-US:
	title: Use format prop to control date formating
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
          format="YYYY/MM"
          value={monthValue}
          onChange={this.onChangeMonth}
        />
        <br />
				<DateRangePicker
				 	className="zent-picker-demo"
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
