---
order: 1
zh-CN:
	title: 基础用法
	today: 今
	yesterday: 昨
	seven: 近7天
	thirty: 近30天
en-US:
	title: Basic Usage
	today: Today
	yesterday: Yesterday
	seven: 7 days
	thirty: 30 days
---

```js
import { DateRangeQuickPicker } from 'zent';

class Simple extends Component {
	state = {};

	handleChange = (value, chosenDays) => {
		this.setState({
			value,
			chosenDays,
		});
	};

	handleChange1 = (value, chosenDays) => {
		this.setState({
			value1: value,
			chosenDays1: chosenDays,
		});
	};

	render() {
		const { value, chosenDays, value1, chosenDays1 } = this.state;

		return (
			<div>
				<DateRangeQuickPicker
					onChange={this.handleChange}
					value={value}
					format="YYYY-MM-DD HH:mm:ss"
					valueType="number"
					chosenDays={chosenDays}
				/>
				<br />
				<DateRangeQuickPicker
					onChange={this.handleChange1}
					value={value1}
					format="YYYY-MM-DD HH:mm:ss"
					chosenDays={chosenDays1}
					preset={[
						{
							text: '{i18n.today}',
							value: 0,
						},
						{
							text: '{i18n.yesterday}',
							value: 1,
						},
						{
							text: '{i18n.seven}',
							value: 7,
						},
						{
							text: '{i18n.thirty}',
							value: 30,
						},
					]}
				/>
			</div>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```
