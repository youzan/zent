---
order: 4
zh-CN:
	title: 回调返回 Promise
	button: 自动关闭对话框(Promise)
	content: 点击确定后三秒自动关闭
	title1: onConfirm返回Promise
en-US:
	title: callback returns Promise
	button: Self-closing with Promise
	content: Click confirm, close automatically after 3 seconds
	title1: onConfirm returns Promise
---

```js
import { Sweetalert, Button } from 'zent';

class Wrapper extends React.Component {
	promiseConfirm = () => {
		Sweetalert.confirm({
			content: '{i18n.content}',
			title: '{i18n.title1}',
			onConfirm: () => new Promise((resolve) => {
				setTimeout(() => {
					resolve();
				}, 3000);
			}),
			parentComponent: this
		});
	}

	render() {
		return <Button onClick={this.promiseConfirm}>{i18n.button}</Button>;
	}
}

ReactDOM.render(
	<Wrapper />,
	mountNode
);
```
