---
order: 1
zh-CN:
	title: 基础的日期、自然周、月份、时间段选择
en-US:
	title: Basic usage of DatePicker, WeekPicker, MonthPicker and RangePicker
---

```jsx
import {
	DatePicker,
	DateRangePicker,
	WeekPicker,
	MonthPicker,
	YearPicker,
	TimePicker,
	CombinedDateRangePicker,
	QuarterPicker,
} from 'zent';

class DatePickerBasic extends Component {
	state = {
		dateValue: '2020-05-11',
		rangeValue: ['2020-05-10', '2020-05-12'],
		timeValue: '04:50:15',
		combinedValue: ['2020-05-10', '2020-05-12'],
		weekValue: ['2020-05-11'],
		quarterValue: '2020-01-11',
	};

	onChangeDate = val => {
		console.log('demo onChangeDate', val);
		this.setState({
			dateValue: val,
		});
	};
	onChangeRange = val => {
		console.log('demo onChangeRange', val);
		this.setState({
			rangeValue: val,
		});
	};
	onChangeTime = val => {
		console.log('demo onChangeTime', val);
		this.setState({
			timeValue: val,
		});
	};

	onChangeCombinedDate = val => {
		console.log('demo onChangeCombinedDate', val);
		this.setState({
			combinedValue: val,
		});
	};
	onChangeWeek = val => {
		console.log('demo onChangeWeek', val);
		this.setState({
			weekValue: val,
		});
	};
	onChangeMonth = val => {
		console.log('demo onChangeMonth', val);
		this.setState({
			monthValue: val,
		});
	};
	onChangeQuarter = val => {
		console.log('demo onChangeQuarter', val);
		this.setState({
			quarterValue: val,
		});
	};
	onChangeYear = val => {
		console.log('demo onChangeYear', val);
		this.setState({
			yearValue: val,
		});
	};
	disabledTimes = { disabledHours: () => [2] };
	render() {
		const {
			dateValue,
			rangeValue,
			timeValue,
			combinedValue,
			weekValue,
			monthValue,
			quarterValue,
			yearValue,
		} = this.state;
		return (
			<div className="zent-date-picker-example">
				<DatePicker
					value={dateValue}
					className="zent-date-picker-demo"
					onChange={this.onChangeDate}
					// disabledDate={{ min: '2020-5-10', max: '2020-6-10' }}
				/>
				<br />
				<DateRangePicker
					className="zent-date-picker-demo"
					value={rangeValue}
					onChange={this.onChangeRange}
				/>
				<br />
				<TimePicker
					className="zent-date-picker-demo"
					value={timeValue}
					onChange={this.onChangeTime}
					canClear={false}
					disabledTimes={this.disabledTimes}
				/>
				<br />
				<CombinedDateRangePicker
					className="zent-date-picker-demo"
					value={combinedValue}
					onChange={this.onChangeCombinedDate}
				/>
				<br />
				<WeekPicker
					className="zent-date-picker-demo"
					value={weekValue}
					onChange={this.onChangeWeek}
				/>
				<br />
				<MonthPicker
					className="zent-date-picker-demo"
					value={monthValue}
					onChange={this.onChangeMonth}
				/>
				<br />
				<QuarterPicker
					className="zent-date-picker-demo"
					value={quarterValue}
					onChange={this.onChangeQuarter}
				/>
				<br />
				<YearPicker
					className="zent-date-picker-demo"
					value={yearValue}
					onChange={this.onChangeYear}
				/>
			</div>
		);
	}
}
ReactDOM.render(<DatePickerBasic />, mountNode);
```

<style>
	.zent-date-picker-demo{
		margin-bottom: 10px;
	}
</style>
