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
import { DateRangeQuickPicker, Notify } from 'zent';

class Simple extends Component {
	state = {
	};

	handleChange = (value, chooseDays) => {
		Notify.success(JSON.stringify({ value, chooseDays }));
		this.setState({
			value,
			chooseDays
		});
	};

	handleChange1 = (value, chooseDays) => {
		Notify.success(JSON.stringify({ value, chooseDays }));
		this.setState({
			value1: value,
			chooseDays1: chooseDays
		});
	}

  render() {
    const { value, chooseDays, value1, chooseDays1 } = this.state;

    return (
			<div>
				<DateRangeQuickPicker
					onChange={this.handleChange}
					value={value}
					format="YYYY-MM-DD HH:mm:ss"
					valueType="number"
					chooseDays={chooseDays}
				/>
				<br />
				<DateRangeQuickPicker
					onChange={this.handleChange1}
					value={value1}
					format="YYYY-MM-DD HH:mm:ss"
					chooseDays={chooseDays1}
					preset={[{
						text: '{i18n.today}',
						value: 0
					}, {
						text: '{i18n.yesterday}',
						value: 1
					}, {
						text: '{i18n.seven}',
						value: 7
					}, {
						text: '{i18n.thirty}',
						value: 30
					}]}
				/>
			</div>
    );
  }
}

ReactDOM.render(
	<Simple />
	, mountNode
);
```
