---
order: 7
zh-CN:
	title: 通过 defaultValue 来控制面板弹出时默认显示的日期。
en-US:
	title: Setting default value.
---

```jsx
import {
	DatePicker,
	MonthPicker,
	DateRangePicker,
	CombinedDateRangePicker,
	TimePicker,
} from 'zent';

class Demo extends Component {
	state = {};

	onChangeDate = val => {
		this.setState({
			dateValue: val,
		});
	};

	onChangeMonth = val => {
		this.setState({
			monthValue: val,
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

	onChangeTime = val => {
		this.setState({
			timeValue: val,
		});
	};
	render() {
		const {
			dateValue,
			monthValue,
			rangeValue,
			combinedValue,
			timeValue,
		} = this.state;
		return (
			<div>
				<DatePicker
					className="zent-datepicker-demo"
					value={dateValue}
					defaultDate="2008-08-08"
					onChange={this.onChangeDate}
				/>
				<br />
				<MonthPicker
					className="zent-datepicker-demo"
					value={monthValue}
					defaultDate="2010-07"
					onChange={this.onChangeMonth}
				/>
				<br />
				<DateRangePicker
					className="zent-datepicker-demo"
					value={rangeValue}
					defaultDate={['2016-01-01', '2017-01-01']}
					onChange={this.onChangeRange}
				/>
				<br />
				<CombinedDateRangePicker
					className="zent-datepicker-demo"
					value={combinedValue}
					defaultDate={['2018-01-01', '2018-02-01']}
					onChange={this.onChangeCombinedDate}
				/>
				<br />
				<TimePicker
					className="zent-datepicker-demo"
					value={timeValue}
					defaultTime="12:12:13"
					onChange={this.onChangeTime}
				/>
			</div>
		);
	}
}

ReactDOM.render(<Demo />, mountNode);
```
