---
order: 6
zh-CN:
	title: 额外内容
	content: 额外内容会放置在 Alert 组件右侧
	button: 按钮
	link: 文字链接
en-US:
	title: Close Button And Callback
	content: Extra content will place on the right of Alert
	button: Button
	link: Text Link
---

```jsx
import { Alert, Button } from 'zent';

ReactDOM.render(
	<div className="zent-alert-example">
		<Alert
			type="info"
			extraContent={<Button type="primary">{i18n.button}</Button>}
		>
			{i18n.content}
		</Alert>
		<Alert type="info" extraContent={<a href="javascript:;">{i18n.link}</a>}>
			{i18n.content}
		</Alert>
	</div>,
	mountNode
);
```
