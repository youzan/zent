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
import {
	disabledTimeWithMax,
	disabledTimeWithRange,
	getDisabledDateAndTimeWithRangeProps,
} from 'zent/es/date-picker/disabledHelpers';
import { isSameDay, addDays, parse } from 'date-fns';

const initArray = targetNum => {
	return Array.from({ length: targetNum }, (_, index) => index);
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

	disabledTime1 = () => ({
		disabledHours: () => [2],
	});

	disabledTime2 = date => {
		const min = new Date();
		const hour = min.getHours();
		const minute = min.getMinutes();
		const second = min.getSeconds();
		const isSame = isSameDay(date, min);
		return isSame
			? {
					disabledHours: () => initArray(hour),
					disabledMinutes: hourValue =>
						hourValue === hour ? initArray(minute) : [],
					disabledSeconds: (hourValue, minuteValue) =>
						hourValue === hour && minuteValue === minute
							? initArray(second)
							: [],
			  }
			: {};
	};

	disabledTime3 = (date, type) => {
		return type === 'start'
			? {
					disabledHours: () => [3, 4, 5],
					disabledMinutes: () => [],
					disabledSeconds: () => [],
			  }
			: {};
	};

	disabledProps = getDisabledDateAndTimeWithRangeProps([new Date(), addDays(new Date(), 4)]);

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
					disabledTime={this.disabledTime1}
				/>
				<br />
				<DatePicker
					className="zent-datepicker-demo"
					showTime
					format="YYYY-MM-DD HH:mm:ss"
					value={dateValue}
					disabledDate={{ min: new Date() }}
					onChange={this.onChangeDate}
					disabledTime={this.disabledTime2}
				/>
				<br />
				<DateRangePicker
					className="zent-datepicker-demo"
					showTime={{ format: 'HH:mm', defaultTime: [
							date => (isSameDay(date, new Date()) ? '12:30' : '00:00'),
							'23:59',
						], }}
					format="YYYY-MM-DD HH:mm"
					value={rangeValue}
					onChange={this.onChangeRange}
					disabledTime={this.disabledTime3}
				/>
				<br />
				<CombinedTimeRangePicker
					className="zent-datepicker-demo"
					value={combinedTimeValue}
					onChange={this.onChangeCombinedTime}
					disabledTime={this.disabledTime3}
				/>
				<br />
				<CombinedDateRangePicker
					className="zent-datepicker-demo"
					value={combinedValue}
					onChange={this.onChangeCombinedDate}
					showTime={{
						defaultTime: [
							date => (isSameDay(date, new Date()) ? '12:30:00' : '00:00:00'),
							'23:59:59',
						],
					}}
					format="YYYY-MM-DD HH:mm:ss"
					{...this.disabledProps}
				/>
			</div>
		);
	}
}
ReactDOM.render(<Demo />, mountNode);
```
