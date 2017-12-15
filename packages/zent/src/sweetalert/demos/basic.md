---
order: 1
zh-CN:
	title: 基础用法
	text1: 这个是具体内容
	button: 消息对话框
en-US:
	title: Basic Usage
	text1: Here comes the main content
	button: Message Dialog
---

```js
import { Sweetalert, Button } from 'zent';

const showAlertInfo = () => {
	Sweetalert.alert({
		content: '{i18n.text1}'
	});
}

ReactDOM.render(
	<Button onClick={showAlertInfo}>{i18n.button}</Button>,
	mountNode
);
```
