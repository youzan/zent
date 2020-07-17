---
order: 4
zh-CN:
	title: 禁用部分时间，可以通过传入 disabledTime 函数来实现
en-US:
	title: Set showTime to true to allow time selection
---

```jsx
import {
	TimePicker,
	DatePicker,
	DateRangePicker,
	CombinedTimeRangePicker,
	CombinedDateRangePicker,
} from 'zent';

class Demo extends Component {
	state = {
		// timeValue: '00:30:00',
		// dateValue: '2020-06-10 14:00:05',
		// rangeValue: [],
		// combinedValue: ['2020-06-10 07:00:05', '2020-06-10 14:00:05'],
	};

	onChangeTime = val => {
		console.log('demo onChangeTime', val);
		this.setState({
			timeValue: val,
		});
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
	onChangeCombinedTime = val => {
		console.log('demo onChangeCombinedTime', val);
		this.setState({
			combinedTimeValue: val,
		});
	};
	onChangeCombinedDate = val => {
		console.log('demo onChangeCombinedDate', val);
		this.setState({
			combinedValue: val,
		});
	};

	disabledTimes1 = () => ({
		disabledHours: () => [2],
	});

	disabledTimes2 = date => ({
		disabledHours: () => {
			return date && date.getDate() === 15 ? [3, 4, 5] : [2];
		},
		disabledMinutes: hour => (hour === 12 ? [10, 20, 30, 40, 50] : []),
		disabledSeconds: () => [1, 2, 3, 4],
	});

	disabledTimes3 = (date, type) => {
		return type === 'start'
			? {
					disabledHours: () => [3, 4, 5],
					disabledMinutes: () => [],
					disabledSeconds: () => [],
			  }
			: {};
	};

	disabledTimes4 = (date, type) => {
		return {
			disabledHours: () => [3, 4, 5],
			disabledMinutes: () => [],
			disabledSeconds: () => [],
		};
	};

	render() {
		const {
			timeValue,
			dateValue,
			rangeValue,
			combinedValue,
			combinedTimeValue,
		} = this.state;
		return (
			<div>
				<TimePicker
					className="zent-datepicker-demo"
					value={timeValue}
					onChange={this.onChangeTime}
					disabledTime={this.disabledTimes1}
				/>
				<br />
				<DatePicker
					className="zent-datepicker-demo"
					showTime
					format="YYYY-MM-DD HH:mm:ss"
					value={dateValue}
					onChange={this.onChangeDate}
					disabledTime={this.disabledTimes2}
				/>
				<br />
				<DateRangePicker
					className="zent-datepicker-demo"
					showTime={{ format: 'HH:mm', defaultTime: ['00:00', '23:59'] }}
					format="YYYY-MM-DD HH:mm"
					value={rangeValue}
					onChange={this.onChangeRange}
					disabledTime={this.disabledTimes3}
				/>
				<br />
				<CombinedTimeRangePicker
					className="zent-datepicker-demo"
					value={combinedTimeValue}
					onChange={this.onChangeCombinedTime}
					disabledTime={this.disabledTimes3}
				/>
				<br />
				<CombinedDateRangePicker
					className="zent-datepicker-demo"
					value={combinedValue}
					onChange={this.onChangeCombinedDate}
					showTime
					format="YYYY-MM-DD HH:mm:ss"
					disabledTime={this.disabledTimes4}
				/>
			</div>
		);
	}
}
ReactDOM.render(<Demo />, mountNode);
```
