---
order: 4
zh-CN:
	title: 回调返回 Promise
	button: 自动关闭对话框(Promise)
	content: 三秒后自动关闭
	title1: onConfirm返回Promise
en-US:
	title: callback returns Promise
	button: self-closing with Promise
	content: Close automatically after 3 seconds
	title1: onConfirm returns Promise
---

```js
import { Sweetalert, Button } from 'zent';

const promiseConfirm = () => {
	Sweetalert.confirm({
		content: '{i18n.content}',
		title: '{i18n.title1}',
		onConfirm: () => new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, 3000);
		})
	});
}

ReactDOM.render(
	<Button onClick={promiseConfirm}>{i18n.button}</Button>,
	mountNode
);
```
