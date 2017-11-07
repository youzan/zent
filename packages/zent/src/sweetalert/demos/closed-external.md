---
order: 3
zh-CN:
	title: 自动关闭
	button: 自动关闭对话框
	close: 一秒后自动关闭
	confirm: 确认
	cancel: 取消
en-US:
	title: Self-closing
	button: self-closing dialog
	close: Close automatically after one second
	confirm: Confirm
	cancel: Cancel
---

```js
import { Sweetalert, Button } from 'zent';

const autoCloseConfirm = () => {
	const close = Sweetalert.confirm({
		content: <p>{i18n.close}</p>,
		confirmText: '{i18n.confirm}',
		cancelText: '{i18n.cancel}'
	});

	setTimeout(close, 1000);
}

ReactDOM.render(
	<Button onClick={autoCloseConfirm}>{i18n.button}</Button>,
	mountNode
);
```
