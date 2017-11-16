---
order: 2
zh-CN:
	title: 带有确认和取消按钮
	message1: 我真的知道了
	message2: 我真的取消了
	content: 这个是内容
	button: 消息对话框
	confirm: 确定
	cancel: 取消
en-US:
	title: With Confirm and Cancel Button
	message1: I know.
	message2: Canceled.
	content: This is content.
	button: Message Dialog
	confirm: Confirm
	cancel: Cancel
---

```js
import { Sweetalert, Button, Notify } from 'zent';

const onConfirm = () => {
	Notify.success('{i18n.message1}');
}

const onCancel = () => {
	Notify.error('{i18n.message2}');
}

const showAlertConfirm = () => {
	Sweetalert.confirm({
		content: <p>{i18n.content}</p>,
		onConfirm: onConfirm,
		onCancel: onCancel,
		confirmText: '{i18n.confirm}',
		cancelText: '{i18n.cancel}'
	});
}

ReactDOM.render(
	<Button onClick={showAlertConfirm}>{i18n.button}</Button>,
	mountNode
);
```
