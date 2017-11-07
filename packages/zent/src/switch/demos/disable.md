---
order: 2
zh-CN:
	title: 失效状态
en-US:
	title: disabled
---

```jsx
import { Switch } from 'zent';

ReactDOM.render(
	<div>
		<Switch checked disabled />
		&nbsp;&nbsp;
		<Switch checked={false} disabled />
	</div>
	, mountNode
);

```
