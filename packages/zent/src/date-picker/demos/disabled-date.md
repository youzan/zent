---
order: 3
zh-CN:
	title: 禁用部分日期，可以通过传入 disabledDate 函数来实现
en-US:
	title: Disabled date can be controlled by disabledDate callback
---

```jsx
import { DatePicker, WeekPicker } from 'zent';

class Demo extends Component {
	state = {
		dateValue: '2020-06-10 14:00:05',
		weekValue: ['2020-06-08'],
	};

	onChangeDate = val => {
		this.setState({
			dateValue: val,
		});
	};

	onChangeWeek = val => {
		this.setState({
			rangeValue: val,
		});
	};

	render() {
		const { dateValue, weekValue } = this.state;
		return (
			<div>
				<DatePicker
					value={dateValue}
					className="zent-datepicker-demo"
					onChange={this.onChangeDate}
					disabledDate={date => date.getDay() === 1}
				/>
				<br />
				<WeekPicker
					className="zent-datepicker-demo"
					value={weekValue}
					onChange={this.onChangeWeek}
					disabledDate={date => date.getDay() === 1}
				/>
			</div>
		);
	}
}
ReactDOM.render(<Demo />, mountNode);
```
