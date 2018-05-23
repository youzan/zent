---
order: 2
zh-CN:
	title: 数组
	link: array
en-US:
	title: Use Array
	link: array
---

```jsx
import { Timeline } from 'zent';

const timeline = [
	'hello',
	'world',
	{
		label: 'blue',
		dotColor: '#5197FF',
	},
	{
		label: 'red',
		lineColor: '#E70000',
	},
	{
		label: 'color',
		color: '#E70000',
	},
];

ReactDOM.render(
	<div>
		<Timeline type="horizontal" timeline={timeline} />
	</div>,
	mountNode
);
```
