---
order: 1
zh-CN:
	title: 日期，时间段选择支持农历
en-US: 
	title: Date and time period selection support lunar calendar
---

```jsx
import { LunarDatePicker } from 'zent';
import { useState } from 'react';
import { addMonths, addDays } from 'date-fns';

const now = new Date();
const Demo = () => {
	return (
		<div>
			<LunarDatePicker />
		</div>
	);
};

ReactDOM.render(<Demo />, mountNode);
```

<style>

</style>
