---
order: 4
zh-CN:
	title: 开关loading
en-US:
	title: Switch with loading
---

```jsx
import { Switch } from 'zent';

ReactDOM.render(
	<div>
		<Switch checked loading />
		&nbsp;&nbsp;
		<Switch loading />
		&nbsp;&nbsp;
		<Switch checked size="small" loading />
		&nbsp;&nbsp;
		<Switch size="small" loading />
	</div>
	, mountNode
);

```
