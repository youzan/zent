---
order: 4
zh-CN:
	title: Loading 模式
	content: 消息加载中...
en-US:
  title: Loading Mode
	content: Loading message...
---

```jsx
import { Alert, BlockLoading } from 'zent';

ReactDOM.render(
	<div className="zent-alert-example">
		<Alert type="info" loading>
			{i18n.content}
		</Alert>
		<BlockLoading>
			<Alert type="info" loading>
				{i18n.content}
			</Alert>
		</BlockLoading>
	</div>,
	mountNode
);
```
