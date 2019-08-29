---
order: 7
zh-CN:
	title: Outline 模式
	content: outline 模式公告内容
	button: 按钮
en-US:
	title: Outline Mode
	content: Outline mode Alert content
	button: Button
---

```jsx
import { Alert, Button } from 'zent';

ReactDOM.render(
	<div className="zent-alert-example">
		<Alert
			type="info"
			outline
			title="{i18n.title}"
			description="{i18n.content}"
		/>
		<Alert
			type="success"
			outline
			title="{i18n.title}"
			description="{i18n.content}"
		/>
		<Alert
			type="warning"
			outline
			title="{i18n.title}"
			description="{i18n.content}"
		/>
		<Alert
			type="error"
			outline
			title="{i18n.title}"
			description="{i18n.content}"
		/>
	</div>,
	mountNode
);
```
