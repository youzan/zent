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

const LunarDatePicker = () => {
	const [date, setDate] = useState(new Date());

	const handleDateChange = val => {
		setDate(val);
	};

	return (
		<DatePicker
			showLunarDate
			value={date}
			onChange={handleDateChange}
		/>
	);
};

ReactDOM.render(<LunarDatePicker />, mountNode);
```

<style>

</style>
