---
order: 2
zh-CN:
	title: 使用 openDialog 打开对话框
	title1: 使用 openDialog 直接打开对话框
	close: 关闭
	open: 打开
en-US:
	title: Set up with openDialog
	title1: Open the dialog through openDialog
	close: Close
	open: Open
---

```js
import { Dialog, Button } from 'zent';

const { openDialog, closeDialog } = Dialog;
const id = 'my_dialog';

const open = () => {
	openDialog({
		dialogId: id, // id is used to close the dialog
		title: '{i18n.title1}',
		children: <div>Hello World</div>,
		footer: <Button onClick={() => closeDialog(id)}>{i18n.close}</Button>,
		onClose() {
			console.log('outer dialog closed');
		},
	});
};

ReactDOM.render(<Button type="primary" onClick={open}>{i18n.open}</Button>, mountNode);
```
