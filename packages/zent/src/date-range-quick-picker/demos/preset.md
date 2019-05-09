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
						text: '{i18n.cycle}',
						value: ['2019-01-01', '2019-01-02']
					}, {
						text: '{i18n.month}',
						value: ['2019-01-01', '2019-01-31']
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
