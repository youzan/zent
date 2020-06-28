---
order: 4
zh-CN:
	title: 禁用部分时间，可以通过传入 disabledTime 函数来实现
en-US:
	title: Set showTime to true to allow time selection
---

```jsx
import { DatePicker, MonthPicker, DateRangePicker } from 'zent';

class Demo extends Component {
	state = {
		timeValue: '00:30:00',
		dateValue: '2020-06-10 14:00:05',
	};

	onChangeTime = val => {
		console.log('demo onChangeTime', val);
		this.setState({
			timeValue: val,
		});
	};
	onChangeDate = val => {
		this.setState({
			dateValue: val,
		});
	};

	disabledTimes1 = { disabledHours: () => [2] };
	disabledTimes2 = {
		disabledHours: date => {
			return date && date.getDate() === 15 ? [3, 4, 5] : [2];
		},
		disabledMinutes: (hour, date) => (hour === 12 ? [10, 20, 30, 40, 50] : []),
		disabledSeconds: () => [1, 2, 3, 4],
	};

	render() {
		const { timeValue, dateValue } = this.state;
		return (
			<div>
				<TimePicker
					className="zent-datepicker-demo"
					value={timeValue}
					onChange={this.onChangeTime}
					disabledTimes={this.disabledTimes1}
				/>
				<br />
				<DatePicker
					className="zent-datepicker-demo"
					value={dateValue}
					onChange={this.onChangeRange}
					showTime
					format="YYYY-MM-DD HH:mm:ss"
					disabledTimes={this.disabledTimes2}
				/>
			</div>
		);
	}
}
ReactDOM.render(<Demo />, mountNode);
```
