---
order: 6
zh-CN:
	title: 支持设置 Dialog 中的 button 类型
	content: 确认删除吗？
	title1: 请确认
	confirm: 删除
	cancel: 取消
	button: 删除
en-US:
	title: The type of button in Dialog is settable.
	content: Confirm to delete?
	title1: Confirm
	confirm: Delete
	cancel: Cancel
	button: Remove
---

```js
import { Sweetalert, Button } from 'zent';

class Wrapper extends React.Component {
	showAlertConfirm = () => {
		Sweetalert.confirm({
			confirmType: 'danger',
			confirmText: '{i18n.confirm}',
			cancelText: '{i18n.cancel}',
			content: '{i18n.content}',
			title: '{i18n.title1}',
			parentComponent: this
		});
	}

	render() {
		return <Button onClick={this.showAlertConfirm} type="danger">{i18n.button}</Button>;
	}
}

ReactDOM.render(
	<Wrapper />,
	mountNode
);
```
