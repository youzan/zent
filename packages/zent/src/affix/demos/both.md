---
order: 4
zh-CN:
	title: 同时设置 offsetTop 和 offsetBottom
en-US:
	title: Set offsetTop and offsetBottom
---

```jsx
import { Affix, Alert } from 'zent';

ReactDOM.render(
	<div className="affix-demo-both">
		<Affix offsetBottom={150} offsetTop={50}>
			<Alert type="warning">
				<p>{i18n.title}</p>
			</Alert>
		</Affix>
	</div>,
	mountNode
);
```
