---
order: 1
zh-CN:
	title: 基础的日期、自然周、月份、时间段选择
en-US:
	title: Basic usage of DatePicker, WeekPicker, MonthPicker and RangePicker
---

```jsx
import { DatePicker, MonthPicker, QuarterPicker, DateRangePicker, WeekPicker, YearPicker } from 'zent'

class Demo extends Component{
  state = {

	};

	onChangeQuarter = (val) => {
		console.log(val)
		this.setState({
			quarterValue: val
		})
	}

  onChangeDate = (val) => {
    this.setState({
      dateValue: val
    })
  }

	onChangeWeek = (val) => {
		this.setState({
			weekValue: val
		})
	}

  onChangeMonth = (val) => {
		console.log(val)
    this.setState({
      monthValue: val
    })
  }

  onChangeRange = (val) => {
    this.setState({
      rangeValue: val
    })
  }

	onChangeYear = (val) => {
		this.setState({
			yearValue: val
		})
	}

  render(){
    const { dateValue, monthValue, rangeValue, weekValue, yearValue, quarterValue } = this.state;
		const now = new Date();

    return (
			<div>
        <DatePicker
					className="zent-picker-demo"
					value={dateValue}
					max="2020-01-01"
          onChange={this.onChangeDate}
        />
				<br />
				<WeekPicker
					startDay={1}
					popPosition="right"
					className="zent-picker-demo"
					value={weekValue}
					onChange={this.onChangeWeek}
				/>
        <br />
        <MonthPicker
          className="zent-picker-demo"
          value={monthValue}
					max={now}
          onChange={this.onChangeMonth}
        />
        <br />
        <DateRangePicker
          className="zent-picker-demo"
          value={rangeValue}
          onChange={this.onChangeRange}
          />
				<br/>
				<YearPicker
					className="zent-picker-demo"
					value={yearValue}
					max={2020}
					onChange={this.onChangeYear}
				/>
				<br />
				<QuarterPicker
					valueType="date"
					max={new Date()}
					value={quarterValue}
					onChange={this.onChangeQuarter}
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
