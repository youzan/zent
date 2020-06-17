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

	disabledTimes = { disabledHours: () => [2] };
	render() {
		const { timeValue, dateValue } = this.state;
		return (
			<div>
				<TimePicker
					className="zent-date-picker-demo"
					value={timeValue}
					onChange={this.onChangeTime}
					disabledTimes={this.disabledTimes}
				/>
				<br />
				<DatePicker
					className="zent-date-picker-demo"
					value={dateValue}
					onChange={this.onChangeRange}
					showTime
					format="YYYY-MM-DD HH:mm:ss"
					disabledTimes={this.disabledTimes}
				/>
			</div>
		);
	}
}
ReactDOM.render(<Demo />, mountNode);
```
