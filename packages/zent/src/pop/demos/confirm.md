---
order: 4
zh-CN:
	title: Confirm 形式的气泡提示
	content: Pop关闭了
	popContent: 提示内容
	btnText: 打开气泡
en-US:
	title: Confirm Pop
	content: Pop Closed
	popContent: Pop content
	btnText: Open
---

```jsx
import { Pop, Sweetalert, Button } from 'zent';

ReactDOM.render(
	<Pop
		trigger="click"
		content="{i18n.popContent}"
		onConfirm={() => Sweetalert.alert({ content: '{i18n.content}' })}
	>
		<Button type="primary">{i18n.btnText}</Button>
	</Pop>
	, mountNode
);
```
