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

// 使用 `closeDialog` 关闭需要传入 `dialogId`
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

// 使用 `openDialog` 返回的 `close` 函数关闭
let close;
const open2 = () => {
	close = openDialog({
		title: '{i18n.title1}',
		children: <div>Hello World</div>,
		footer: <Button onClick={() => close()}>{i18n.close}</Button>,
		onClose() {
			console.log('outer dialog closed');
		},
	});
}

ReactDOM.render(
  <>
		<Button type="primary" onClick={open}>
			{i18n.open}
		</Button>
		<Button type="primary" onClick={open2}>
			{i18n.open}2
		</Button>
	</>,
	mountNode
);
```
