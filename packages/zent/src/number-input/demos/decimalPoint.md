---
order: 2
zh-CN:
	title: 指定小数点精度
en-US:
	title: specify the decimal point precision
---

```jsx
import { NumberInput } from 'zent';

ReactDOM.render(
	<div>
		<NumberInput value={2} decimal={2} placeholder="请输入数字"/>
		<NumberInput value={2} showStepper decimal={2} placeholder="请输入数字"/>
	</div>
	, mountNode
);
```
