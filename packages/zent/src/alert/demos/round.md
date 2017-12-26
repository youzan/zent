---
order: 5
zh-CN:
	title: 支持圆角样式
	content: 这个公告是有圆角的。
en-US:
	title: Supports rounded border
	content: This Alert has rounded border.
---

```jsx
import { Alert } from 'zent';

ReactDOM.render(
	<Alert type="warning" rounded>{i18n.content}</Alert>
	, mountNode
)
```
