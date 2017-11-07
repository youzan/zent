---
order: 4
zh-CN:
	title: 回调返回 Promise
	button: 自动关闭对话框(Promise)
	content: 三秒后自动关闭
	title1: onConfirm返回Promise
	confirm: 确认
	cancel: 取消
en-US:
	title: callback returns Promise
	button: self-closing with Promise
	content: Close automatically after 3 seconds
	title1: onConfirm returns Promise
	confirm: Confirm
	cancel: Cancel
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
		}),
		confirmText: '{i18n.confirm}',
		cancelText: '{i18n.cancel}'
	});
}

ReactDOM.render(
	<Button onClick={promiseConfirm}>{i18n.button}</Button>,
	mountNode
);
```
