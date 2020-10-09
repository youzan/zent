---
order: 2
zh-CN:
	title: 传入 showTime 同时选择时间和日期
en-US:
	title: Set showTime to true to allow time selection
---

```jsx
import { DatePicker, DateRangePicker, CombinedDateRangePicker } from 'zent';

class Demo extends Component {
	state = {};

	onChangeDate = val => {
		console.log('demo onChange', val);
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

	onChangeCombinedDate = val => {
		console.log('demo onChangeCombinedDate', val);
		this.setState({
			combinedValue: val,
		});
	};
	render() {
		const { dateValue, rangeValue, combinedValue } = this.state;
		return (
			<div>
				<DatePicker
					className="zent-datepicker-demo"
					showTime
					format="YYYY-MM-DD HH:mm:ss"
					value={dateValue}
					onChange={this.onChangeDate}
				/>
				<br />
				<DateRangePicker
					className="zent-datepicker-demo"
					showTime={{ format: 'HH:mm', defaultTime: ['00:00', '23:59'] }}
					format="YYYY-MM-DD HH:mm"
					value={rangeValue}
					onChange={this.onChangeRange}
				/>
				<br />
				<CombinedDateRangePicker
					className="zent-datepicker-demo"
					value={combinedValue}
					showTime={{
						format: 'HH:mm:ss',
						defaultTime: ['12:00:00', '23:59:59'],
					}}
					format="YYYY-MM-DD HH:mm:ss"
					onChange={this.onChangeCombinedDate}
				/>
			</div>
		);
	}
}
ReactDOM.render(<Demo />, mountNode);
```
