---
order: 7
zh-CN:
	title: 关闭时的回调
	content: 这个公告关闭时有回调函数。
	msg: 公告关闭了
en-US:
	title: Close callback
	content: This Alert has a close callback.
	msg: Aler closed
---

```jsx
import { Alert, Sweetalert } from 'zent';

ReactDOM.render(
	<Alert 
		type="info" 
		closable
		onClose={() => Sweetalert.alert({ content: '{i18n.msg}' })}
	>
		{i18n.content}
	</Alert>
	, mountNode
)
```
