---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic usage
---

```jsx
import { NumberInput } from 'zent';

ReactDOM.render(
	<div>
		<NumberInput value={2} placeholder="请输入数字"/>
		<NumberInput value={2} showStepper placeholder="请输入数字"/>
	</div>
	, mountNode
);

```
