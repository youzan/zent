---
order: 1
zh-CN:
	title: 基础的日期、自然周、月份、时间段选择
en-US:
	title: Basic usage of DatePicker, WeekPicker, MonthPicker and RangePicker
---

```jsx
import { DatePicker, MonthPicker, SeasonPicker, DateRangePicker, WeekPicker, YearPicker } from 'zent'

class Demo extends Component{
  state = {

	};

	onChangeSeason = (val) => {
		console.log(val)
		this.setState({
			seasonValue: val
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

	onChangeYear = (val) => {
		this.setState({
			yearValue: val
		})
	}

  render(){
    const { dateValue, monthValue, rangeValue, weekValue, yearValue, seasonValue } = this.state;
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
				<DateRangePicker
					className="zent-picker-demo"
					type="split"
					value={rangeValue}
					onChange={this.onChangeRangeSplit}
				/>
				<br/>
				<YearPicker
					className="zent-picker-demo"
					value={yearValue}
					max={2020}
					onChange={this.onChangeYear}
				/>
				<br />
				<SeasonPicker
					value={seasonValue}
					onChange={this.onChangeSeason}
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
