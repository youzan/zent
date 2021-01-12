---
order: 3
zh-CN:
	title: 禁用部分日期，可以通过传入 disabledDate 函数来实现
en-US:
	title: Disabled date can be controlled by disabledDate callback
---

```jsx
import { DatePicker, WeekPicker, CombinedDateRangePicker } from 'zent';

class Demo extends Component {
	state = {};

	onChangeDate = val => {
		this.setState({
			dateValue: val,
		});
	};

	onChangeDate2 = val => {
		console.log('onChangeDate2', val);
		this.setState({
			dateValue2: val,
		});
	};

	onChangeRange = val => {
		this.setState({
			rangeValue: val,
		});
	};

	onChangeCombinedDate = val => {
		this.setState({
			combinedValue: val,
		});
	};

	onDisabledRange = (val, type) =>
		type === 'start' ? val.getDate() === 15 : false;

	onDisabledCombinedDate = val => val.getDate() < 9;

	render() {
		const { dateValue, dateValue2, rangeValue, combinedValue } = this.state;
		return (
			<div>
				<DatePicker
					value={dateValue}
					className="zent-datepicker-demo"
					onChange={this.onChangeDate}
					disabledDate={date => date.getDay() === 1}
				/>
				<br />
				<DatePicker
					value={dateValue2}
					className="zent-datepicker-demo"
					onChange={this.onChangeDate2}
					disabledDate={{ min: '2020-6-15' }}
				/>
				<br />
				<DateRangePicker
					className="zent-datepicker-demo"
					value={rangeValue}
					onChange={this.onChangeRange}
					disabledDate={this.onDisabledRange}
				/>
				<br />
				<CombinedDateRangePicker
					className="zent-datepicker-demo"
					value={combinedValue}
					onChange={this.onChangeCombinedDate}
					disabledDate={this.onDisabledCombinedDate}
				/>
			</div>
		);
	}
}
ReactDOM.render(<Demo />, mountNode);
```
