---
order: 1
zh-CN:
	title: 基础用法
	text1: 这个是具体内容
	button: 消息对话框
en-US:
	title: Basic Usage
	text1: Here comes the main content
	button: Message Dialog
---

```js
import { Sweetalert, Button } from 'zent';

class Wrapper extends React.Component {
	showAlertInfo = () => {
		Sweetalert.alert({
			content: '{i18n.text1}',
			parentComponent: this
		});
	}

	render() {
		return <Button onClick={this.showAlertInfo}>{i18n.button}</Button>;
	}
}

ReactDOM.render(
	<Wrapper />,
	mountNode
);
```
