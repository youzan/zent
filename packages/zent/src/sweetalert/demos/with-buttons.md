---
order: 2
zh-CN:
	title: 带有确认和取消按钮
	message1: 我真的知道了
	message2: 我真的取消了
	content: 这个是内容
	button: 消息对话框
en-US:
	title: With Confirm and Cancel Button
	message1: I know.
	message2: Canceled.
	content: This is content.
	button: Message Dialog
---

```js
import { Sweetalert, Button, Notify } from 'zent';

class Wrapper extends React.Component {
	onConfirm = () => {
		Notify.success('{i18n.message1}');
	}

	onCancel = () => {
		Notify.error('{i18n.message2}');
	}

	showAlertConfirm = () => {
		Sweetalert.confirm({
			content: <p>{i18n.content}</p>,
			onConfirm: this.onConfirm,
			onCancel: this.onCancel,
			parentComponent: this
		});
	}

	render() {
		return <Button onClick={this.showAlertConfirm}>{i18n.button}</Button>;
	}
}

ReactDOM.render(
	<Wrapper />,
	mountNode
);
```
