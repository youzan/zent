---
order: 3
zh-CN:
	title: 设置距离底部值：`offsetBottom`
	text: 设置距离底部值
en-US:
	title: Using offsetBottom to set offset from viewport's bottom
	text: set offset bottom
---

```jsx
import { Affix, Alert } from 'zent';

ReactDOM.render(
	<div className="affix-demo-bottom">
		<Affix offsetBottom={60}>
			<Alert type="warning">
				<p>{i18n.text}</p>
			</Alert>
		</Affix>
	</div>,
	mountNode
);
```
