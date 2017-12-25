---
order: 5
zh-CN:
	title: 标题旁带有 icon 的 Dialog
	content: 这个是具体内容
	title1: 这是一个消息标题
	button: 含有图标消息对话框
en-US:
	title: Dialog with icon next to the title.
	content: Here comes the main content.
	title1: This is a Dialog title.
	button: Dialog with icon
---

```js
import { Sweetalert, Button } from 'zent';

class Wrapper extends React.Component {
	showAlertInfo = () => {
		Sweetalert.alert({
			type: 'info',
			content: '{i18n.content}',
			title: '{i18n.title1}',
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
