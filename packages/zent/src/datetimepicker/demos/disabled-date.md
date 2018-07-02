---
order: 6
zh-CN:
	title: "禁用部分日期，可以通过传入 disabledDate 函数来实现，返回 true 表示禁用。另外，DatePicker 支持传入 min/max 属性来实现简单禁用逻辑。"
en-US:
	title: "Disabled date can be controlled by disabledDate callback, return true to disable the specific date. You can use min/max to achieve simple disable logic."
---

```jsx
import { DatePicker, MonthPicker, DateRangePicker, WeekPicker } from 'zent';

const now = new Date();
const oneDay = 24 * 60 * 60 * 1000;

class Demo extends Component {
	state = {};

	onChangeDate = val => {
		this.setState({
			dateValue: val,
		});
	};

	onChangeRange = val => {
		this.setState({
			rangeValue: val,
		});
	};

	onChangeWeek = val => {
		this.setState({
			weekValue: val,
		});
	};

	disabledDate(val) {
		return val.getDate() < 15;
	}

	disabledRangeDate(val) {
		return val.getMonth() % 2 === 0;
	}

	disabledWeek(val) {
		const today = new Date();
		const start = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate() - 2);
		const end = new Date(today.getFullYear(), today.getMonth() + 1, 3, 23, 59, 59, 999);
		return val < start || val > end;
	}

	disabledRangeTime(type) {
		const disabledHour = val => {
			return type === 'start' ? val < 12 : val > 12;
		};
		const disabledMinute = val => {
			return type === 'start' ? val > 30 : val > 30;
		};
		const disabledSecond = val => {
			return type === 'start' ? val < 20 : val > 40;
		};
		return {
			disabledHour,
			disabledMinute,
			disabledSecond,
		};
	}

	render() {
		const { dateValue, rangeValue, weekValue } = this.state;
		return (
			<div>
				<DatePicker
					className="zent-picker-demo"
					max={now.getTime() + 7 * oneDay}
					min={now.getTime() - 7 * oneDay}
				/>
				<br />
				<DatePicker
					className="zent-picker-demo"
					disabledDate={this.disabledDate}
					value={dateValue}
					onChange={this.onChangeDate}
				/>
				<br />
				<DateRangePicker
					className="zent-picker-demo"
					disabledDate={this.disabledRangeDate}
					value={rangeValue}
					onChange={this.onChangeRange}
				/>
				<br />
				<DateRangePicker
					className="zent-picker-demo"
					showTime
					format="YYYY-MM-DD HH:mm:ss"
					disabledDate={this.disabledRangeDate}
					disabledTime={this.disabledRangeTime}
					value={rangeValue}
					onChange={this.onChangeRange}
				/>
				<br />
				<WeekPicker
					startDay={1}
					popPosition="right"
					className="zent-picker-demo"
					value={weekValue}
					onChange={this.onChangeWeek}
					disabledDate={this.disabledWeek}
				/>
			</div>
		);
	}
}

ReactDOM.render(<Demo />, mountNode);
```
