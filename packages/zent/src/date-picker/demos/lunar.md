---
order: 10
zh-CN:
	title: 农历日期选择
en-US: 
	title: Lunar date picker
---

```jsx
import { DatePicker } from 'zent';
import { useState } from 'react';

import { Lunar } from 'lunar-typescript';

class LunarDatePickerDemo extends Component {
	state = {};

	lunarValueFormatter = date => {
		const d = Lunar.fromDate(date);
		return d.toString();
	};

	handleDateChange = val => {
		this.setState({
			date: val,
		});
	};

	render() {
		const { date } = this.state;
		return (
			<DatePicker
				showLunarDate
				lunarValueFormatter={this.lunarValueFormatter}
				value={date}
				onChange={this.handleDateChange}
			/>
		);
	}
}

ReactDOM.render(<LunarDatePickerDemo />, mountNode);
```

<style>

</style>
