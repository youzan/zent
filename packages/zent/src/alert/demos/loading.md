---
order: 3
zh-CN:
	title: Loading 模式
	content: 消息加载中...
en-US:
  title: Loading Mode
	content: Loading message...
---

```jsx
import { Alert } from 'zent';

ReactDOM.render(
	<div className="zent-alert-example">
		<Alert type="info" loading>
			{i18n.content}
		</Alert>
	</div>,
	mountNode
);
```
