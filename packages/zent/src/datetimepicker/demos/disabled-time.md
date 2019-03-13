---
order: 7
zh-CN:
	title: "禁用部分时间，可以通过传入 disabledTime 函数来实现，返回 true 表示禁用。"
en-US:
	title: "Disabled date can be controlled by disabledTime callback, return true to disable the specific date. You can use min/max to achieve simple disable logic."
---

```jsx
import { TimePicker, TimeRangePicker } from 'zent';

const now = new Date();
const oneDay = 24 * 60 * 60 * 1000;

class Demo extends Component {
	state = {};

	onChange = (val) => {
		this.setState({
			value: val
		});
	}

	onRangeChange = (val) => {
		this.setState({
			rangeValue: val
		})
	}

	disabledTime() {
		const disabledHour = val => val % 2 === 0;
		const disabledMinute = val => val > 30;
		const disabledSecond = val => val % 30 === 0;

		return {
			disabledHour,
			disabledMinute,
			disabledSecond,
		};
	}

	disabledRangeTime(type) {
		const disabledHour = val => {
			return type === 'start' ? val > 12 : val < 12;
		};
		const disabledMinute = val => {
			return type === 'start' ? val > 30 : val < 30;
		};
		const disabledSecond = val => {
			return type === 'start' ? val > 40 : val < 40;
		};
		return {
			disabledHour,
			disabledMinute,
			disabledSecond,
		};
	}

	render() {
		const { value, rangeValue } = this.state;
		return (
			<div>
				<TimePicker
					className="zent-picker-demo"
					value={value}
					showSecond
					disabledTime={this.disabledTime}
					onChange={this.onChange}
				/>
				<br />
				<TimeRangePicker
					className="zent-picker-demo"
					value={rangeValue}
					showSecond
					onChange={this.onRangeChange}
					disabledTime={this.disabledRangeTime}
				/>
			</div>
		);
	}
}

ReactDOM.render(<Demo />, mountNode);
```
