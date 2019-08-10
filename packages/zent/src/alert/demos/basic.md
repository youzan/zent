---
order: 1
zh-CN:
	title: 基础用法
	content: 通知提示文案
	link: 文字链接
en-US:
	title: Basic Usage
	content: Info Alert Text
	link: Text Link
---

```jsx
import { Alert } from 'zent';

ReactDOM.render(
	<Alert>
		<span>{i18n.content}</span>
		<a href="javascript:;" className="zent-alert-demo-text">
			{i18n.link}
		</a>
	</Alert>,
	mountNode
);
```

<style>
.zent-alert-demo-text {
	margin-left: 8px;
}
</style>
