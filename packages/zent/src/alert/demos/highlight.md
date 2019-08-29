---
order: 4
zh-CN:
	title: 高亮文字
	content: 内容正在处理
	progress: 13/25
	usage: 使用 Alert.highlightClassName 来添加对应的高亮颜色
en-US:
  title: Highlight Text
	content: Content is being processed
	progress: 13/25
	usage: Use Alert.highlightClassName to add highlight color
---

```jsx
import { Alert } from 'zent';

const { highlightClassName } = Alert;

ReactDOM.render(
	<div className="zent-alert-example">
		<Alert type="info" loading>
			{i18n.content} (<span className={highlightClassName}>{i18n.progress}</span>)
		</Alert>
		<p>{i18n.usage}</p>
	</div>,
	mountNode
);
```
