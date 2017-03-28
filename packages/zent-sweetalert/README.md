## Sweetalert

快速唤起 Dialog 组件

### 使用指南

-  组件不提供个性化选项，如有需要请使用 Dialog 组件。


### 代码演示

:::demo 基础用法
```js
import { Sweetalert, Button } from 'zent';

const showAlertInfo = () => {
	Sweetalert.alert({
		content: '这个是具体内容',
		title: '这是一个消息标题'
	});
}

ReactDOM.render(
	<Button onClick={showAlertInfo}>消息对话框</Button>,
	mountNode
);
```
:::


:::demo 含有确认按钮与取消按钮的 SweetAlert
```js
import { Sweetalert, Button } from 'zent';

const onConfirm = () => {
	console.log('我真的知道了');
}

const onCancel = () => {
	console.log('我真的取消了');
}

const showAlertConfirm = () => {
	Sweetalert.confirm({
		content: <p>这个是内容</p>,
		onConfirm: onConfirm,
		onCancel: onCancel,
	});
}

ReactDOM.render(
	<Button onClick={showAlertConfirm}>确认对话框</Button>,
	mountNode
);
```
:::


:::demo 通过代码自动关闭对话框
```js
import { Sweetalert, Button } from 'zent';

const autoCloseConfirm = () => {
	const close = Sweetalert.confirm({
		content: <p>一秒后自动关闭</p>
	});

	setTimeout(close, 1000);
}

ReactDOM.render(
	<Button onClick={autoCloseConfirm}>自动关闭对话框</Button>,
	mountNode
);
```
:::


:::demo 可以自动关闭的对话框（Promise）点击确认按钮，按钮会变成loading状态，三秒后关闭
```js
import { Sweetalert, Button } from 'zent';

const promiseConfirm = () => {
	Sweetalert.confirm({
		content: '点击确认按钮，按钮会变成loading状态，三秒后关闭',
		title: 'onConfirm返回Promise',
		onConfirm: () => new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, 3000);
		})
	});
}

ReactDOM.render(
	<Button onClick={promiseConfirm}>自动关闭对话框(Promise)</Button>,
	mountNode
);
```
:::


:::demo 含有图标的 SweetAlert
```js
import { Sweetalert, Button } from 'zent';

const showAlertInfo = () => {
	Sweetalert.alert({
		type: 'info',
		content: '这个是具体内容',
		title: '这是一个消息标题'
	});
}

ReactDOM.render(
	<Button onClick={showAlertInfo}>含有图标消息对话框</Button>,
	mountNode
);
```
:::



### API

#### alert

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
| --- | ---- | --- | --- | --- |
| content     | 弹窗中的内容                              | node   |    -      |                                               |
| type        | 弹窗的类型, 设置会在title左边显示一个小图标, 不传不会显示图标 | string |    -    | `'info'`, `'success'`, `'error'`, `'warning'` |
| title       | 弹窗的标题                               | node   | `''`     |                                               |
| onConfirm   | 确认操作回调函数                            | func   | `noop`   |                                               |
| confirmText | 确认按钮文案                              | string | `'取消'`   |                                               |
| className   | 额外的className                        | string | `''`     |                                               |
| prefix      | 默认className的前缀                      | string | `'zent'`|     |

#### confirm

| 参数          | 说明                                      | 类型     | 默认值      | 备选值                                           |
| ----------- | --------------------------------------- | ------ | -------- | --------------------------------------------- |
| content     | 弹窗中的内容                              | node   |    -    |                                               |
| type        | 弹窗的类型, 设置会在title左边显示一个小图标, 不传不会显示图标 | string |   -   | `'info'`, `'success'`, `'error'`, `'warning'` |
| title       | 弹窗的标题                               | node   | `''`     |                                               |
| onCancel    | 取消操作回调函数                            | func   | `noop`   |                                               |
| onConfirm   | 确认操作回调函数                            | func   | `noop`   |                                               |
| cancelText  | 取消按钮文案                              | string | `'取消'`   |                                               |
| confirmText | 确认按钮文案                              | string | `'确认'`   |                                               |
| className   | 额外的className                        | string | `''`     |                                               |
| prefix      | 默认className的前缀                      | string | `'zent'` |                                               |


-  `Sweetalert.alert` 和 `Sweetalert.confirm` 的返回值是可以用来手动关闭对话框的函数。
-  如果 `onConfirm` 的返回值是 `Promise`, 对应的按钮会在 `Promise` pending 时保持在 loading 状态。

