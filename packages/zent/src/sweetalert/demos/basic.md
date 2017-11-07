---
order: 1
zh-CN:
	title: 基础用法
	text1: 这个是具体内容
	text2: 这是一个消息标题
	button: 消息对话框
	confirm: 我知道了
en-US:
	title: Basic Usage
	text1: Here comes the main content
	text2: This is a title
	button: Message Dialog
	confirm: Get it.
---

```js
import { Sweetalert, Button } from 'zent';

const showAlertInfo = () => {
	Sweetalert.alert({
		content: '{i18n.text1}',
		title: '{i18n.text2}',
		confirmText: '{i18n.confirm}'
	});
}

ReactDOM.render(
	<Button onClick={showAlertInfo}>{i18n.button}</Button>,
	mountNode
);
```
