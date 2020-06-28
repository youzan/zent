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
	state = {
		dateValue: '2020-06-10',
		dateValue2: '2020-06-12',
		weekValue: ['2020-06-08'],
		combinedValue: ['2020-06-10', '2020-06-15'],
	};

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

	onChangeWeek = val => {
		this.setState({
			rangeValue: val,
		});
	};

	onChangeCombinedDate = val => {
		this.setState({
			combinedValue: val,
		});
	};

	onDisabledWeek = val => {
		return val.getDate() === 15;
	};

	onDisabledCombinedDate = val => {
		return val.getDate() < 9;
	};

	render() {
		const { dateValue, dateValue2, weekValue, combinedValue } = this.state;
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
					onChange={this.onChangeDate}
					disabledDate={{ max: '2020-6-15' }}
				/>
				<br />
				<WeekPicker
					className="zent-datepicker-demo"
					value={weekValue}
					onChange={this.onChangeWeek}
					disabledDate={this.onDisabledWeek}
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
