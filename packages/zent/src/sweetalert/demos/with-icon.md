---
order: 5
zh-CN:
	title: 标题旁带有 icon 的 Dialog
	content: 这个是具体内容
	title1: 这是一个消息标题
	button: 含有图标消息对话框
	confirm: 我知道了
en-US:
	title: Dialog with icon next to the title.
	content: Here comes the main content.
	title1: This is a Dialog title.
	button: Dialog with icon
	confirm: Get it.
---

```js
import { Sweetalert, Button } from 'zent';

const showAlertInfo = () => {
	Sweetalert.alert({
		type: 'info',
		content: '{i18n.content}',
		title: '{i18n.title1}',
		confirmText: '{i18n.confirm}'
	});
}

ReactDOM.render(
	<Button onClick={showAlertInfo}>{i18n.button}</Button>,
	mountNode
);
```
