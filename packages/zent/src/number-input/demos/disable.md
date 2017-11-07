---
order: 4
zh-CN:
	title: disable状态
	placehoder: 请输入数字

en-US:
	title: Disable status
	placehoder: please enter number

---

```jsx
import { NumberInput } from 'zent';

ReactDOM.render(
	<div>
		<NumberInput value={3} disabled placeholder="{i18n.placehoder}"/>
		<NumberInput value={3} disabled showStepper placeholder="{i18n.placehoder}"/>
	</div>
	, mountNode
);
```
