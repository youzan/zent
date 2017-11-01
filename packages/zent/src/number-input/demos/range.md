---
order: 3
zh-CN:
	title: 控制可输入的数字范围
en-US:
	title: enter numbers in a range
---

```jsx
import { NumberInput } from 'zent';

ReactDOM.render(
	<div>
		<NumberInput value={3} min={-2} max={6} decimal={2} placeholder="请输入数字"/>
		<NumberInput value={3} showStepper min={2} max={6} decimal={2} placeholder="请输入数字"/>
	</div>
	, mountNode
);
```
