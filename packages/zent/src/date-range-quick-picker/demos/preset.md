---
order: 1
zh-CN:
	title: 快速选择时间范围
	cycle: 上一周期
	month: 一月
en-US:
	title: Quickly choose a time range
	cycle: Previous cycle
	month: January
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

	handleChange2 = (value, chosenDays) => {
		this.setState({
			value2: value,
			chosenDays2: chosenDays,
		});
	};

	render() {
		const {
			value,
			chosenDays,
			value1,
			chosenDays1,
			value2,
			chosenDays2,
		} = this.state;

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
							text: '{i18n.cycle}',
							value: ['2019-01-01', '2019-01-02'],
						},
						{
							text: '{i18n.month}',
							value: ['2019-01-01', '2019-01-31'],
						},
					]}
				/>
				<br />
				<DateRangeQuickPicker
					onChange={this.handleChange2}
					value={value2}
					format="YYYY-MM-DD HH:mm:ss"
					valueType="number"
					chosenDays={chosenDays2}
					defaultSelectedPresetIndex={1}
				/>
			</div>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```
