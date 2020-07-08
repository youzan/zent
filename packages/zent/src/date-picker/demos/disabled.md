---
order: 6
zh-CN:
	title: 传入 disabled 使输入框处于禁用状态
en-US:
	title: Disabled input
---

```jsx
import { DatePicker, CombinedDateRangePicker, DateRangePicker } from 'zent';

ReactDOM.render(
	<div>
		<DatePicker className="zent-datepicker-demo" value="2020-01-01" disabled />
		<br />
		<TimePicker className="zent-datepicker-demo" value="06:06:06" disabled />
		<br />
		<CombinedDateRangePicker className="zent-datepicker-demo" disabled />
		<br />
		<DateRangePicker className="zent-datepicker-demo" disabled />
	</div>,
	mountNode
);
```
