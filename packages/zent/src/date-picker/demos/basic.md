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
		timeValue: '14:50:30',
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
	disabledDate = { min: '2020-2-10', max: '2020-6-20' };
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
			<div className="zent-datepicker-example">
				<DatePicker
					value={dateValue}
					className="zent-datepicker-demo"
					onChange={this.onChangeDate}
				/>
				<br />
				<WeekPicker
					className="zent-datepicker-demo"
					value={weekValue}
					onChange={this.onChangeWeek}
				/>
				<br />
				<MonthPicker
					className="zent-datepicker-demo"
					value={monthValue}
					onChange={this.onChangeMonth}
				/>
				<br />
				<QuarterPicker
					className="zent-datepicker-demo"
					value={quarterValue}
					onChange={this.onChangeQuarter}
				/>
				<br />
				<YearPicker
					className="zent-datepicker-demo"
					value={yearValue}
					onChange={this.onChangeYear}
				/>
				<br />
				<TimePicker
					className="zent-datepicker-demo"
					value={timeValue}
					secondStep={15}
					onChange={this.onChangeTime}
					disabledDate={this.disabledDate}
				/>
				<br />
				<DatePicker
					value={dateValue}
					className="zent-datepicker-demo"
					onChange={this.onChangeDate}
				/>
				<br />
				<DateRangePicker
					className="zent-datepicker-demo"
					value={rangeValue}
					onChange={this.onChangeRange}
					disabledDate={val => val.getDate() > 15}
				/>
				<br />
				<CombinedDateRangePicker
					className="zent-datepicker-demo"
					value={combinedValue}
					onChange={this.onChangeCombinedDate}
				/>
			</div>
		);
	}
}
ReactDOM.render(<DatePickerBasic />, mountNode);
```

<style>
	.zent-datepicker-demo{
		margin-bottom: 10px;
	}
</style>
