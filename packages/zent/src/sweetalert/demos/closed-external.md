---
order: 3
zh-CN:
	title: 自动关闭
	button: 自动关闭对话框
	close: 一秒后自动关闭
en-US:
	title: Self-closing
	button: Self-closing dialog
	close: Close automatically after one second
---

```js
import { Sweetalert, Button } from 'zent';

class Wrapper extends React.Component {
	autoCloseConfirm = () => {
		const close = Sweetalert.confirm({
			content: <p>{i18n.close}</p>,
			parentComponent: this
		});

		setTimeout(close, 1000);
	}

	render() {
		return <Button onClick={this.autoCloseConfirm}>{i18n.button}</Button>;
	}
}

ReactDOM.render(
	<Wrapper />,
	mountNode
);
```
