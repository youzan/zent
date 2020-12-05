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
import { isSameDay, addDays } from 'date-fns';

const initArray = targetNum => {
	return Array.from({ length: targetNum }, (_, index) => index);
};

const initRemainArray = (targetNum, total) => {
	return Array.from({ length: total - targetNum }, (_, index) => total - index);
};
class Demo extends Component {
	state = {};

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

	disabledTimes2 = date => {
		const min = new Date();
		const hour = min.getHours();
		const minute = min.getMinutes();
		const second = min.getSeconds();
		const isSame = isSameDay(date, min);
		return isSame
			? {
					disabledHours: () => initArray(hour, 23),
					disabledMinutes: hourValue =>
						hourValue === hour ? initArray(minute, 59) : [],
					disabledSeconds: (hourValue, minuteValue) =>
						hourValue === hour && minuteValue === minute
							? initArray(second, 59)
							: [],
			  }
			: {};
	};

	disabledTimes3 = (date, type) => {
		return type === 'start'
			? {
					disabledHours: () => [3, 4, 5],
					disabledMinutes: () => [],
					disabledSeconds: () => [],
			  }
			: {};
	};

	disabledEndTimes = date => {
		const max = addDays(new Date(), 4);
		const hour = max.getHours();
		const minute = max.getMinutes();
		const second = max.getSeconds();
		const isSame = isSameDay(date, max);
		return isSame
			? {
					disabledHours: () => initRemainArray(hour, 23),
					disabledMinutes: hourValue =>
						hourValue === hour ? initRemainArray(minute, 59) : [],
					disabledSeconds: (hourValue, minuteValue) =>
						hourValue === hour && minuteValue === minute
							? initRemainArray(second, 59)
							: [],
			  }
			: {};
	};

	disabledTimes4 = (date, type) => {
		return type === 'start'
			? this.disabledTimes2(date)
			: this.disabledEndTimes(date);
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
					disabledDate={{ min: new Date() }}
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
					disabledDate={{ min: new Date(), max: addDays(new Date(), 4) }}
					format="YYYY-MM-DD HH:mm:ss"
					disabledTime={this.disabledTimes4}
				/>
			</div>
		);
	}
}
ReactDOM.render(<Demo />, mountNode);
```
