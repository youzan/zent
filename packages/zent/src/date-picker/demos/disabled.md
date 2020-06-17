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
		<DatePicker className="zent-date-picker-demo" value="2020-01-01" disabled />
		<br />
		<CombinedDateRangePicker className="zent-date-picker-demo" disabled />
		<br />
		<DateRangePicker width={120} className="zent-date-picker-demo" disabled />
	</div>,
	mountNode
);
```
