---
order: 8
zh-CN:
	title: onOpen、onClose回调，openPanel面板收展受控
en-US:
	title: Callback of onOpen、onClose, openPanel to control the panel's visible
---

```jsx
import {} from 'zent';

class DatePickerBasic extends Component {
	state = {
		dateValue: '2020-05-11',
		dateValue2: '2020-05-11',
		openPanel: true,
	};

	onChangeDate = val => {
		console.log('demo onChangeDate1', val);
		this.setState({
			dateValue: val,
			openPanel: false,
		});
	};
	onChangeDate2 = val => {
		console.log('demo onChangeDate2', val);
	};

	render() {
		const {
			dateValue,
			dateValue2,

			openPanel,
		} = this.state;
		return (
			<div className="zent-datepicker-example">
				<DatePicker
					value={dateValue}
					className="zent-datepicker-demo"
					onChange={this.onChangeDate}
					openPanel={openPanel}
					onOpen={() => {
						console.log('open');
					}}
					onClose={() => {
						console.log('close');
					}}
				/>
				<br />
				<DatePicker
					className="zent-datepicker-demo"
					value={dateValue2}
					onChange={this.onChangeDate2}
					openPanel={false}
				/>
				<br />
				<CombinedDateRangePicker
					className="zent-datepicker-demo"
					onOpen={() => {
						console.log('open');
					}}
					onClose={() => {
						console.log('close');
					}}
				/>
			</div>
		);
	}
}
ReactDOM.render(<DatePickerBasic />, mountNode);
```
