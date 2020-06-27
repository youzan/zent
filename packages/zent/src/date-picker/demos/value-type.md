---
order: 5
zh-CN:
	title: 通过设置 valueType 来指定返回值的类型，默认为 string，支持 string | date | number
en-US:
	title: valueType defaults to string, but can be date or number, defaults to the type value
---

```jsx
import { DatePicker, WeekPicker } from 'zent';

class Demo extends Component {
	state = {
		dateValue: '2020-06-10',
		dateValue1: '2020-06-10',
		dateValue2: '2020-06-10',
	};

	onChangeDate = val => {
		console.log('valueType is `string`', val);
		this.setState({
			dateValue: val,
		});
	};

	onChangeDate1 = val => {
		console.log('valueType is `number`', val);
		this.setState({
			dateValue1: val,
		});
	};
	onChangeDate2 = val => {
		console.log('valueType is `date`', val);
		this.setState({
			dateValue2: val,
		});
	};

	handleSubmit(event) {
		console.log('A name was submitted: ', event, dateValue);
		event.preventDefault();
	}

	render() {
		const { dateValue, dateValue1, dateValue2 } = this.state;
		return (
			<div>
				<div className="zent-datepicker-demo">string:</div>
				<DatePicker
					value={dateValue}
					className="zent-datepicker-demo"
					onChange={this.onChangeDate}
				/>
				<br />
				<div className="zent-datepicker-demo">number:</div>
				<DatePicker
					value={dateValue1}
					className="zent-datepicker-demo"
					onChange={this.onChangeDate1}
					valueType="number"
				/>
				<br />
				<div className="zent-datepicker-demo">date:</div>
				<DatePicker
					value={dateValue2}
					className="zent-datepicker-demo"
					onChange={this.onChangeDate2}
					valueType="date"
				/>
				<br />
			</div>
		);
	}
}
ReactDOM.render(<Demo />, mountNode);
```
